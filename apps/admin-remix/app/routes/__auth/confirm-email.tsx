import { json } from "@remix-run/node";
import type { ActionFunction } from "@remix-run/node";
import { Form, useTransition } from "@remix-run/react";
import { parseFormAny, useZorm } from "react-zorm";
import { Button, Input } from "ui";
import { z } from "zod";

import { confirmEmailOtp } from "~/core/auth/mutations";
import { createAuthSession } from "~/core/auth/session.server";
import { mapAuthSession } from "~/core/auth/utils/map-auth-session";
import { AuthFormWrapper } from "~/core/components/layouts/auth-form-wrapper";
import { getUserById } from "~/modules/user/queries";
import { isFormProcessing } from "~/utils/form";
import { assertIsPost } from "~/utils/http.server";

const OtpFormSchema = z.object({
  token: z.string().min(6, "token-too-short").max(6, "token-too-long"),
});

export const action: ActionFunction = async ({ request }) => {
  assertIsPost(request);

  const formData = await request.formData();
  const result = await OtpFormSchema.safeParseAsync(parseFormAny(formData));

  if (!result.success) {
    return json({ errors: result.error }, { status: 400 });
  }

  const { token } = result.data;
  const { data, error } = await confirmEmailOtp({
    email: "sebcia7+123@gmail.com",
    token,
    type: "magiclink",
  });

  if (error) {
    return json({ errors: error }, { status: error.status ?? 400 });
  }

  if (!data.session || !data.user) {
    return json({ errors: { otp: "no-session-created" } }, { status: 401 });
  }

  const user = await getUserById(data.user.id);

  if (!user) {
    return json({ errors: { otp: "cannot find user" } }, { status: 400 });
  }

  return createAuthSession({
    request,
    authSession: mapAuthSession(data.session, user)!,
    redirectTo: "/",
  });
};

export default function Index() {
  const zo = useZorm("ConfirmEmailForm", OtpFormSchema);
  const transition = useTransition();
  const disabled = isFormProcessing(transition.state);

  return (
    <AuthFormWrapper
      title="Potwierdź adres email"
      subtitle="Podaj kod otrzymany mailowo, aby potwierdzić konto."
    >
      <div className="mx-auto w-full space-y-6">
        <Form
          method="post"
          ref={zo.ref}
          replace
        >
          <Input
            label="Jednorazowy kod weryfikacyjny"
            type="text"
            name={zo.fields.token()}
            id={zo.fields.token()}
            error={zo.errors.token()?.message}
            autoComplete="off"
          />

          <Button
            width="w-full"
            disabled={disabled}
            type="submit"
          >
            Potwierdź email
          </Button>
        </Form>
      </div>
    </AuthFormWrapper>
  );
}
