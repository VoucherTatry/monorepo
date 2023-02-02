import * as React from "react";

import type {
  // ActionFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import { redirect, json } from "@remix-run/node";
import { Form, Link, useSearchParams, useTransition } from "@remix-run/react";
// import { parseFormAny, useZorm } from "react-zorm";
// import { Button, Divider, Input } from "ui";
// import { z } from "zod";

import { createAuthSession, getAuthSession } from "~/core/auth/session.server";
import { ContinueWithEmailForm } from "~/core/components";
import { AuthFormWrapper } from "~/core/components/layouts/auth-form-wrapper";
// import { createUserAccount } from "~/modules/user/mutations";
// import { getUserByEmail } from "~/modules/user/queries";
// import { isFormProcessing } from "~/utils/form";
// import { assertIsPost } from "~/utils/http.server";

export const loader: LoaderFunction = async ({ request }) => {
  const authSession = await getAuthSession(request);

  if (authSession) return redirect("/");

  return json({});
};

// const JoinFormSchema = z.object({
//   email: z
//     .string()
//     .email("invalid-email")
//     .transform((email) => email.toLowerCase()),
//   password: z.string().min(8, "password-too-short"),
//   redirectTo: z.string().optional(),
// });

// export const action: ActionFunction = async ({ request }) => {
//   assertIsPost(request);

//   const formData = await request.formData();
//   const result = await JoinFormSchema.safeParseAsync(parseFormAny(formData));

//   if (!result.success) {
//     return json(
//       {
//         errors: result.error,
//       },
//       { status: 400 }
//     );
//   }

//   const { email, password, redirectTo } = result.data;
//   const existingUser = await getUserByEmail(email);

//   if (existingUser) {
//     return json({ errors: { email: "user-already-exist" } }, { status: 409 });
//   }

//   const authSession = await createUserAccount(email, password);

//   if (!authSession) {
//     return json(
//       { errors: { email: "unable-to-create-account" } },
//       { status: 400 }
//     );
//   }

//   return createAuthSession({
//     request,
//     authSession,
//     redirectTo: redirectTo ?? "/",
//   });
// };

export const meta: MetaFunction = () => ({
  title: "Zarejestruj się",
});

export default function Join() {
  // const zo = useZorm("NewUserForm", JoinFormSchema);
  // const [searchParams] = useSearchParams();
  // const redirectTo = searchParams.get("redirectTo") ?? undefined;
  // const transition = useTransition();
  // const disabled = isFormProcessing(transition.state);

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
        {/* <Form
          method="post"
          className="space-y-6"
          replace
          ref={zo.ref}
        >
          <div className="flex flex-col space-y-2">
            <Input
              required
              label="Email"
              name={zo.fields.email()}
              id={zo.fields.email()}
              type="email"
              autoComplete="email"
              disabled={disabled}
              error={zo.errors.email()?.message}
            />

            <Input
              required
              label="Hasło"
              id={zo.fields.password()}
              name={zo.fields.password()}
              type="password"
              autoComplete="new-password"
              disabled={disabled}
              error={zo.errors.password()?.message}
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

        <Divider>Kontynuuj bez hasła</Divider> */}

        <ContinueWithEmailForm shouldCreateUser={true} />
      </div>
    </AuthFormWrapper>
  );
}
