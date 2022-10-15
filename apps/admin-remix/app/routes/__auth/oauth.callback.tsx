import { useEffect } from "react";

import { json, redirect } from "@remix-run/node";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { useActionData, useFetcher, useSearchParams } from "@remix-run/react";
import { getFormData } from "remix-params-helper";
import { z } from "zod";

import { commitAuthSession, getAuthSession } from "~/core/auth/session.server";
import { mapAuthSession } from "~/core/auth/utils/map-auth-session";
import { getSupabaseClient } from "~/core/integrations/supabase/supabase.client";
import { assertIsPost, safeRedirect } from "~/core/utils/http.server";
import { tryCreateUser } from "~/modules/user/mutations";
import { getUserById } from "~/modules/user/queries";

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

  const schema = z.object({
    access_token: z.string(),
    refresh_token: z.string(),
    userId: z.string(),
    email: z.string().email(),
    redirectTo: z.string().optional(),
    expiresIn: z.number(),
    expiresAt: z.number(),
  });

  const form = await getFormData(request, schema);

  if (!form.success) {
    return json<ActionData>(
      {
        message: "invalid-token",
      },
      { status: 400 }
    );
  }

  const { redirectTo, ...authSession } = form.data;
  const safeRedirectTo = safeRedirect(redirectTo, "/");

  const user = await getUserById(authSession.userId);

  // first time sign in, let's create a brand-new User row in supabase
  if (!user) {
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
  }

  return redirect(safeRedirectTo, {
    headers: {
      "Set-Cookie": await commitAuthSession(request, {
        authSession: {
          ...authSession,
          user,
        },
      }),
    },
  });
};

export default function LoginCallback() {
  const error = useActionData() as ActionData;
  const fetcher = useFetcher();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? "/";

  useEffect(() => {
    const supabase = getSupabaseClient();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, supabaseSession) => {
        if (event === "SIGNED_IN") {
          // supabase sdk has ability to read url fragment that contains your token after third party provider redirects you here
          // this fragment url looks like https://.....#access_token=evxxxxxxxx&refresh_token=xxxxxx, and it's not readable server-side (Oauth security)
          // supabase auth listener gives us a user session, based on what it founds in this fragment url
          // we can't use it directly, client-side, because we can't access sessionStorage from here
          // so, we map what we need, and let's back-end to the work
          const authSession = mapAuthSession(supabaseSession, null);

          if (!authSession) return;

          const formData = new FormData();

          for (const [key, value] of Object.entries(authSession)) {
            formData.append(key, value as string);
          }

          formData.append("redirectTo", redirectTo);

          fetcher.submit(formData, { method: "post", replace: true });
        }
      }
    );

    return () => {
      // prevent memory leak. Listener stays alive 👨‍🎤
      authListener?.subscription?.unsubscribe();
    };
  }, [fetcher, redirectTo]);

  return error ? <div>{error.message}</div> : null;
}
