import * as React from "react";

import type {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import { redirect, json } from "@remix-run/node";
import {
  Form,
  Link,
  useActionData,
  useSearchParams,
  useTransition,
} from "@remix-run/react";
import { getFormData, useFormInputProps } from "remix-params-helper";
import { z } from "zod";

import { createAuthSession, getAuthSession } from "~/core/auth/session.server";
import { ContinueWithEmailForm } from "~/core/components";
import { assertIsPost } from "~/core/utils/http.server";
import { createUserAccount } from "~/modules/user/mutations";
import { getUserByEmail } from "~/modules/user/queries";
import { AuthFormWrapper } from "~/core/components/layouts/auth-form-wrapper";
import { Button, Divider, Input } from "ui";

export const loader: LoaderFunction = async ({ request }) => {
  const authSession = await getAuthSession(request);

  if (authSession) return redirect("/campaigns");

  return json({});
};

const JoinFormSchema = z.object({
  email: z
    .string()
    .email("invalid-email")
    .transform((email) => email.toLowerCase()),
  password: z.string().min(8, "password-too-short"),
  redirectTo: z.string().optional(),
});

interface ActionData {
  errors: {
    email?: string;
    password?: string;
  };
}

export const action: ActionFunction = async ({ request }) => {
  assertIsPost(request);

  const formValidation = await getFormData(request, JoinFormSchema);

  if (!formValidation.success) {
    return json<ActionData>(
      {
        errors: formValidation.errors,
      },
      { status: 400 }
    );
  }

  const { email, password, redirectTo = "/" } = formValidation.data;

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return json<ActionData>(
      { errors: { email: "user-already-exist" } },
      { status: 400 }
    );
  }

  const authSession = await createUserAccount(email, password);

  if (!authSession) {
    return json<ActionData>(
      { errors: { email: "unable-to-create-account" } },
      { status: 500 }
    );
  }

  return createAuthSession({
    request,
    authSession,
    redirectTo,
  });
};

export const meta: MetaFunction = () => ({
  title: "Sign Up",
});

export default function Join() {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? undefined;
  const actionData = useActionData() as ActionData;
  const emailRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);
  const inputProps = useFormInputProps(JoinFormSchema);
  const transition = useTransition();
  const disabled =
    transition.state === "submitting" || transition.state === "loading";

  React.useEffect(() => {
    if (actionData?.errors?.email) {
      emailRef.current?.focus();
    } else if (actionData?.errors?.password) {
      passwordRef.current?.focus();
    }
  }, [actionData]);

  return (
    <AuthFormWrapper
      title="Zarejestruj się"
      subtitle={
        <>
          Posiadasz konto?{" "}
          <Link
            className="text-primary-500 hover:underline focus:text-primary-400"
            to="/login"
          >
            Zaloguj się
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
              {...inputProps("email")}
              required
              ref={emailRef}
              id="email"
              label="Email"
              name="email"
              type="email"
              autoComplete="email"
              disabled={disabled}
              error={actionData?.errors?.email}
              autoFocus={true}
            />

            <Input
              {...inputProps("password")}
              required
              ref={passwordRef}
              id="password"
              label="Hasło"
              name="password"
              type="password"
              autoComplete="new-password"
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
            Załóż konto
          </Button>
        </Form>

        <Divider>Kontynuuj bez hasła</Divider>

        <ContinueWithEmailForm />
      </div>
    </AuthFormWrapper>
  );
}
