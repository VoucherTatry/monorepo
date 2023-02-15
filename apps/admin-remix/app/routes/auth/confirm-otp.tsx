import type { ActionArgs, LoaderFunction, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useSearchParams, useTransition } from "@remix-run/react";
import { parseFormAny, useZorm } from "react-zorm";
import { Button, Input } from "ui";
import { z } from "zod";

import { AuthFormWrapper } from "~/components/layouts/auth-form-wrapper";
import { otpSignIn } from "~/core/auth/mutations/otp-sign-in";
import {
  createAuthSession,
  getAuthSession,
  hasValidSessionOTPEmail,
} from "~/core/auth/session.server";
import { getGaurdedPath } from "~/utils/getGuardedPath";
import { assertIsPost } from "~/utils/http.server";

const ConfirmOTPSchema = z.object({
  token: z
    .string()
    .regex(/^\d+$/)
    .min(6, "token-too-short")
    .max(6, "token-too-long"),
  redirectTo: z.string().optional(),
});

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

  const authSession = await otpSignIn({ token: result.data.token, request });

  return createAuthSession({
    request,
    authSession: authSession,
    redirectTo: getGaurdedPath({
      path: result.data.redirectTo ?? "/",
      user: authSession.user,
    }),
  });
};

export const loader: LoaderFunction = async ({ request }) => {
  const authSession = await getAuthSession(request);
  if (authSession) return redirect("/");

  const hasSessionOTPEmail = hasValidSessionOTPEmail(request);
  if (!hasSessionOTPEmail) {
    throw redirect("..");
  }

  return null;
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
