import type { ActionArgs, LoaderFunction, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useSearchParams, useTransition } from "@remix-run/react";
import { parseFormAny, useZorm } from "react-zorm";
import { Button, Input } from "ui";
import { z } from "zod";

import { AuthFormWrapper } from "~/components/layouts/auth-form-wrapper";
import { SESSION_KEY_OTP_EMAIL } from "~/core/auth/const";
import { confirmEmailOtp } from "~/core/auth/mutations";
import {
  createAuthSession,
  getAuthSession,
  getSession,
} from "~/core/auth/session.server";
import { mapAuthSession } from "~/core/auth/utils/map-auth-session";
import { assertIsPost } from "~/utils/http.server";

const EmailSchema = z
  .string()
  .email("Nieprawidłowy adres email")
  .transform((email) => email.toLowerCase());

const ConfirmOTPSchema = z.object({
  token: z
    .string()
    .regex(/^\d+$/)
    .min(6, "token-too-short")
    .max(6, "token-too-long"),
  redirectTo: z.string().optional(),
});

async function hasValidSessionOTPEmail(request: Request) {
  const session = await getSession(request);
  const validateSessionOTPEmail = await EmailSchema.safeParseAsync(
    session.get(SESSION_KEY_OTP_EMAIL)
  );

  return validateSessionOTPEmail.success;
}

type ActionSuccess = {
  error: null;
  data: {
    email: string | null;
  } | null;
};

type ActionError = {
  data: null;
  error: string;
};

type ActionData = ActionSuccess | ActionError;

export const action = async ({ request }: ActionArgs) => {
  assertIsPost(request);

  const formData = await request.formData();
  const result = await ConfirmOTPSchema.safeParseAsync(parseFormAny(formData));

  if (!result.success) {
    return json<ActionData>(
      {
        error: result.error.errors[0].message,
        data: null,
      },
      { status: 400 }
    );
  }

  const session = await getSession(request);
  const email = session.get(SESSION_KEY_OTP_EMAIL) as string;
  session.unset(SESSION_KEY_OTP_EMAIL);

  const { data: authData, error: authError } = await confirmEmailOtp({
    email,
    token: result.data.token,
    type: "magiclink",
  });

  if (authError) {
    return json<ActionData>(
      {
        error: authError.message,
        data: null,
      },
      { status: 400 }
    );
  }

  const authSession = mapAuthSession(authData.session, authData.user);

  return createAuthSession({
    request,
    authSession: authSession!,
    redirectTo: result.data.redirectTo ?? "/",
  });
};

export const loader: LoaderFunction = async ({ request }) => {
  const authSession = await getAuthSession(request);

  if (authSession) return redirect("/");

  const hasSessionOTPEmail = hasValidSessionOTPEmail(request);

  if (!hasSessionOTPEmail) {
    throw redirect("..");
  }

  return json(null);
};

export const meta: MetaFunction = () => ({
  title: "Strona powitalna",
});

export default function LoginPage() {
  const zo = useZorm("OtpLinkAuth", ConfirmOTPSchema);
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? undefined;
  const transition = useTransition();
  const disabled =
    transition.state === "submitting" || transition.state === "loading";

  return (
    <AuthFormWrapper
      title="Dokończ logowanie"
      subtitle="Podaj jednorazowe hasło otrzymane w wiadomości email, aby zalogować się do swojego konta."
    >
      <div className="mx-auto w-full space-y-6">
        <Form
          method="post"
          className="space-y-2"
          ref={zo.ref}
          replace
        >
          <Input
            label="Jednorazowe hasło"
            required
            minLength={6}
            maxLength={6}
            type="number"
            inputMode="numeric"
            pattern="[0-9]*"
            autoComplete="one-time-code"
            id={zo.fields.token()}
            name={zo.fields.token()}
            error={zo.errors.token()?.message}
            disabled={disabled}
          />
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
            Zaloguj się
          </Button>
        </Form>
      </div>
    </AuthFormWrapper>
  );
}
