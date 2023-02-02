import type {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useSearchParams, useTransition } from "@remix-run/react";
import { parseFormAny } from "react-zorm";
import { Button, Input } from "ui";
import { z } from "zod";

import { sendMagicLink } from "~/core/auth/mutations";
import { createAuthSession, getAuthSession } from "~/core/auth/session.server";
import { mapAuthSession } from "~/core/auth/utils/map-auth-session";
import { AuthFormWrapper } from "~/core/components/layouts/auth-form-wrapper";
import { AuthWrapper } from "~/core/components/layouts/auth-wrapper";
import { assertIsPost } from "~/utils/http.server";

export enum MagicLinkSubmitErrorsEnum {
  TOO_MANY = "too-many-requests",
  GENERIC = "unable-to-send-magic-link",
}

const MagicLinkSchema = z.object({
  email: z
    .string()
    .email("Nieprawidłowy adres email")
    .transform((email) => email.toLowerCase()),
  redirectTo: z.string().optional(),
});

interface ActionData {
  error?: string;
}

export const action: ActionFunction = async ({ request }) => {
  assertIsPost(request);

  const formData = await request.formData();
  const result = await MagicLinkSchema.safeParseAsync(parseFormAny(formData));

  if (!result.success) {
    return json<ActionData>(
      {
        error: result.error.errors[0].message,
      },
      { status: 400 }
    );
  }

  const { data, error } = await sendMagicLink(result.data.email);

  if (error) {
    console.error(error);

    if ("status" in error && error["status"] === 429) {
      return json<ActionData>(
        {
          error: MagicLinkSubmitErrorsEnum.TOO_MANY,
        },
        { status: 429 }
      );
    }

    return json<ActionData>(
      {
        error: error.message,
      },
      { status: error.status }
    );
  }

  if (!data.session || !data.user) {
    return json<ActionData>(
      {
        error: "Can't find session nor user!",
      },
      { status: 400 }
    );
  }

  const authSession = mapAuthSession(data.session, data.user);

  return createAuthSession({
    request,
    authSession: authSession!,
    redirectTo: result.data.redirectTo ?? "/",
  });
};

export const loader: LoaderFunction = async ({ request }) => {
  const authSession = await getAuthSession(request);

  if (authSession) return redirect("/");

  return json({});
};

export const meta: MetaFunction = () => ({
  title: "Strona powitalna",
});

export default function LoginPage() {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? undefined;
  const transition = useTransition();
  const disabled =
    transition.state === "submitting" || transition.state === "loading";

  return (
    <AuthWrapper>
      <AuthFormWrapper
        title="Witaj na platformie VoucherTatry"
        subtitle="Podaj swój adres email aby założyć konto lub się zalogować. W obu wypadkach na Twój adres email zostanie wysłane jednorazowe hasło potrzebne w celu dalszej weryfikacji."
      >
        <div className="mx-auto w-full space-y-6">
          <Form
            method="post"
            className="space-y-6"
            replace
          >
            <Input
              type="email"
              required
              autoComplete="email"
              name="email"
              id="magic-link"
              disabled={disabled}
              inputOnly
            />
            {/* <div
            className={`mb-2 h-6 text-sm ${data?.error ? "text-red-500" : ""} ${
              isSuccessfull ? "text-green-600" : ""
            }`}
          >
            {!isSuccessfull
              ? getErrorMessage(data?.error)
              : "Sprawdź email! ✌️"}
          </div> */}
            <input
              type="hidden"
              name="redirectTo"
              value={redirectTo}
            />
            <Button
              type="submit"
              size="md"
              width="w-full"
              disabled={disabled}
            >
              Wyślij jednorazowe hasło
            </Button>
          </Form>
        </div>
      </AuthFormWrapper>
    </AuthWrapper>
  );
}
