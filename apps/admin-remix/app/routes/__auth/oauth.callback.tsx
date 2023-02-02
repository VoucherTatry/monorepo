import { useEffect, useMemo } from "react";

import { json, redirect } from "@remix-run/node";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { useActionData, useFetcher, useSearchParams } from "@remix-run/react";
import { parseFormAny } from "react-zorm";
import { Spinner } from "ui";
import { z } from "zod";

import { refreshAccessToken } from "~/core/auth/refresh-auth-session.server";
import { commitAuthSession, getAuthSession } from "~/core/auth/session.server";
import { getSupabaseClient } from "~/core/integrations/supabase/supabase";
import { tryCreateUser } from "~/modules/user/mutations";
import { getUserById } from "~/modules/user/queries";
import { assertIsPost, safeRedirect } from "~/utils/http.server";

// imagine a user go back after OAuth login success or type this URL
// we don't want him to fall in a black hole 👽
export const loader: LoaderFunction = async ({ request }) => {
  const authSession = await getAuthSession(request);

  if (authSession) return redirect("/");

  return json({});
};

interface ActionData {
  message?: string;
}

export const action: ActionFunction = async ({ request }) => {
  assertIsPost(request);

  const formData = await request.formData();
  const result = await z
    .object({
      refreshToken: z.string(),
      redirectTo: z.string().optional(),
    })
    .safeParseAsync(parseFormAny(formData));

  if (!result.success) {
    return json<ActionData>(
      {
        message: "invalid-request",
      },
      { status: 400 }
    );
  }

  const { redirectTo, refreshToken } = result.data;
  const safeRedirectTo = safeRedirect(redirectTo, "/");

  // We should not trust what is sent from the client
  // https://github.com/rphlmr/supa-fly-stack/issues/45
  const authSession = await refreshAccessToken(refreshToken);
  if (!authSession) {
    return json(
      {
        message: "invalid-refresh-token",
      },
      { status: 401 }
    );
  }

  // user have an account, skip creation part and just commit session
  const user = await getUserById(authSession.userId);
  if (user) {
    return redirect(safeRedirectTo, {
      headers: {
        "Set-Cookie": await commitAuthSession(request, {
          authSession: {
            ...authSession,
            userId: user.id,
            user,
          },
        }),
      },
    });
  }

  // first time sign in, let's create a brand-new User row in supabase
  const newUser = await tryCreateUser({
    email: authSession.email,
    userId: authSession.userId,
  });

  if (!newUser) {
    return json<ActionData>(
      {
        message: "create-user-error",
      },
      { status: 500 }
    );
  }

  return redirect(safeRedirectTo, {
    headers: {
      "Set-Cookie": await commitAuthSession(request, {
        authSession: {
          ...authSession,
          user: {
            ...newUser,
            profile: null,
          },
        },
      }),
    },
  });
};

export default function LoginCallback() {
  const error = useActionData<typeof action>();
  const fetcher = useFetcher();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? "/";
  const supabase = useMemo(() => getSupabaseClient(), []);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, supabaseSession) => {
      if (event === "SIGNED_IN") {
        // supabase sdk has ability to read url fragment that contains your token after third party provider redirects you here
        // this fragment url looks like https://.....#access_token=evxxxxxxxx&refresh_token=xxxxxx, and it's not readable server-side (Oauth security)
        // supabase auth listener gives us a user session, based on what it founds in this fragment url
        // we can't use it directly, client-side, because we can't access sessionStorage from here

        // we should not trust what's happen client side
        // so, we only pick the refresh token, and let's back-end getting user session from it
        const refreshToken = supabaseSession?.refresh_token;

        if (!refreshToken) return;

        const formData = new FormData();

        formData.append("refreshToken", refreshToken);
        formData.append("redirectTo", redirectTo);

        fetcher.submit(formData, { method: "post", replace: true });
      }
    });

    return () => {
      // prevent memory leak. Listener stays alive 👨‍🎤
      subscription.unsubscribe();
    };
  }, [fetcher, redirectTo, supabase.auth]);

  return error ? <div>{error.message}</div> : <Spinner size="lg" />;
}
