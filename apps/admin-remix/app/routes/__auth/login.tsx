import type {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import {
  Form,
  Link,
  useActionData,
  useSearchParams,
  useTransition,
} from "@remix-run/react";
import { useEffect, useRef } from "react";
import { getFormData, useFormInputProps } from "remix-params-helper";
import { Button, Divider, Input } from "ui";
import { z } from "zod";

import { signInWithEmail } from "~/core/auth/mutations";
import { createAuthSession, getAuthSession } from "~/core/auth/session.server";
import { ContinueWithEmailForm } from "~/core/components";
import { AuthFormWrapper } from "~/core/components/layouts/auth-form-wrapper";
import { assertIsPost } from "~/core/utils/http.server";

export const loader: LoaderFunction = async ({ request }) => {
  const authSession = await getAuthSession(request);

  if (authSession) return redirect("/");

  return json({});
};

const LoginFormSchema = z.object({
  email: z
    .string()
    .email("Nieprawidłowy adres email")
    .transform((email) => email.toLowerCase()),
  password: z
    .string()
    .min(8, "Hasło jest zbyt krótkie. Minimalna długość to 8 znaków"),
  redirectTo: z.string().optional(),
});

interface ActionData {
  errors?: {
    email?: string;
    password?: string;
  };
}

export const action: ActionFunction = async ({ request }) => {
  assertIsPost(request);

  const formValidation = await getFormData(request, LoginFormSchema);

  if (!formValidation.success) {
    return json<ActionData>(
      {
        errors: formValidation.errors,
      },
      { status: 400 }
    );
  }

  const { email, password, redirectTo = "/" } = formValidation.data;

  const authSession = await signInWithEmail(email, password);

  if (!authSession) {
    return json<ActionData>(
      { errors: { email: "invalid-email-password" } },
      { status: 400 }
    );
  }

  return createAuthSession({
    request,
    authSession,
    redirectTo,
  });
};

export const meta: MetaFunction = () => ({
  title: "Login",
});

export default function LoginPage() {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? undefined;
  const actionData = useActionData() as ActionData;
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const inputProps = useFormInputProps(LoginFormSchema);
  const transition = useTransition();
  const disabled =
    transition.state === "submitting" || transition.state === "loading";

  useEffect(() => {
    if (actionData?.errors?.email) {
      emailRef.current?.focus();
    } else if (actionData?.errors?.password) {
      passwordRef.current?.focus();
    }
  }, [actionData]);

  return (
    <AuthFormWrapper
      title="Zaloguj się"
      subtitle={
        <>
          Nie posiadasz jeszcze konta?{" "}
          <Link
            className="text-primary-500 hover:underline focus:text-primary-400"
            to="/join"
          >
            Zarejestruj się
          </Link>
        </>
      }
    >
      <div className="mx-auto w-full space-y-6">
        <Form
          method="post"
          className="space-y-6"
          replace
        >
          <div className="flex flex-col space-y-2">
            <Input
              label="Adres email"
              {...inputProps("email")}
              ref={emailRef}
              id="email"
              type="email"
              required
              autoComplete="email"
              aria-invalid={actionData?.errors?.email ? true : undefined}
              aria-describedby="email-error"
              disabled={disabled}
              error={actionData?.errors?.email}
            />

            <Input
              label="Hasło"
              {...inputProps("password")}
              type="password"
              id="password"
              ref={passwordRef}
              autoComplete="new-password"
              aria-invalid={actionData?.errors?.password ? true : undefined}
              aria-describedby="password-error"
              disabled={disabled}
              error={actionData?.errors?.password}
            />
          </div>

          <input
            type="hidden"
            name="redirectTo"
            value={redirectTo}
          />
          <Button
            width="w-full"
            type="submit"
            disabled={disabled}
          >
            Zaloguj się
          </Button>
        </Form>

        <Divider>Kontynuuj bez hasła</Divider>

        <ContinueWithEmailForm />
      </div>
    </AuthFormWrapper>
  );
}
