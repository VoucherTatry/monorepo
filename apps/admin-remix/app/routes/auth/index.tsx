import type { ActionArgs, LoaderFunction, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import {
  Form,
  // useActionData,
  // useSearchParams,
  useTransition,
} from "@remix-run/react";
import { parseFormAny, useZorm } from "react-zorm";
import { Button, Input } from "ui";
import { z } from "zod";

import { AuthFormWrapper } from "~/components/layouts/auth-form-wrapper";
import { SESSION_KEY_OTP_EMAIL } from "~/core/auth/const";
import { sendMagicLink } from "~/core/auth/mutations";
import {
  commitSession,
  getAuthSession,
  getSession,
} from "~/core/auth/session.server";
import { assertIsPost } from "~/utils/http.server";

const SendOTPFormSchema = z.object({
  email: z
    .string()
    .email("Nieprawidłowy adres email")
    .transform((email) => email.toLowerCase()),
  token: z
    .string()
    .min(6, "token-too-short")
    .max(6, "token-too-long")
    .optional(),
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

type ActionResponse = ActionSuccess | ActionError;

export const action = async ({ request }: ActionArgs) => {
  assertIsPost(request);

  const formData = await request.formData();
  const result = await SendOTPFormSchema.safeParseAsync(parseFormAny(formData));

  if (!result.success) {
    return json<ActionResponse>(
      {
        error: result.error.errors[0].message,
        data: null,
      },
      { status: 400 }
    );
  }

  const { error } = await sendMagicLink(result.data.email);

  if (error) {
    console.error(error);

    if ("status" in error && error["status"] === 429) {
      return json<ActionResponse>(
        {
          error: "Mail został przed chwilą wysłany. Proszę spróbować później.",
          data: null,
        },
        { status: 429 }
      );
    }

    return json<ActionResponse>(
      {
        error: error.message,
        data: null,
      },
      { status: error.status }
    );
  }

  // return json<ActionResponse>(
  //   {
  //     error: null,
  //     data: {
  //       email: result.data.email,
  //     },
  //   },
  //   { status: 200 }
  // );

  const session = await getSession(request);
  session.set(SESSION_KEY_OTP_EMAIL, result.data.email);

  return redirect("./confirm-otp", {
    headers: {
      "Set-Cookie": await commitSession(session, { maxAge: 86400 }),
    },
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

export default function SendOTP() {
  // const actionData = useActionData<typeof action>();
  const zo = useZorm("SendOTPForm", SendOTPFormSchema);
  // const [searchParams] = useSearchParams();
  // const redirectTo = searchParams.get("redirectTo") ?? undefined;
  const transition = useTransition();
  // const otpRequestSuccess = !actionData?.error && !!actionData?.data?.email;
  const disabled =
    transition.state === "submitting" || transition.state === "loading";

  return (
    <AuthFormWrapper
      title="Witaj na platformie VoucherTatry"
      subtitle="Podaj swój adres email aby założyć konto lub się zalogować. W obu wypadkach na Twój adres email zostanie wysłane jednorazowe hasło potrzebne w celu dalszej weryfikacji."
    >
      <div className="mx-auto w-full space-y-6">
        <Form
          method="post"
          className="space-y-2"
          ref={zo.ref}
          // onSubmit={onSubmit}
          replace
        >
          <Input
            label="Adres e-mail"
            required
            type="email"
            autoComplete="email"
            id={zo.fields.email()}
            name={zo.fields.email()}
            error={zo.errors.email()?.message}
            disabled={disabled}
          />

          {/* <div
              className={`mb-2 h-6 text-sm ${
                actionData?.error ? "text-red-500" : ""
              } ${otpRequestSuccess ? "text-green-600" : ""}`}
            >
              {!otpRequestSuccess ? actionData?.error : "Sprawdź email! ✌️"}
            </div> */}

          {/* <input
              type="hidden"
              name="redirectTo"
              value={redirectTo}
            /> */}

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
  );
}
