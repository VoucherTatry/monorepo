import { json } from "@remix-run/node";

import { SESSION_KEY_OTP_EMAIL } from "~/modules/auth/const";
import { mapAuthSession } from "~/modules/auth/mappers";
import { confirmEmailOtp } from "~/modules/auth/mutations/otp.server";
import { getSession } from "~/modules/auth/session.server";

export async function otpSignIn({
  token,
  request,
}: {
  token: string;
  request: Request;
}) {
  const session = await getSession(request);
  const email = session.get(SESSION_KEY_OTP_EMAIL) as string;
  session.unset(SESSION_KEY_OTP_EMAIL);

  const { data: authData, error: authError } = await confirmEmailOtp({
    email,
    token,
    type: "magiclink",
  });

  if (authError) {
    throw json(
      {
        error: authError.message,
        data: null,
      },
      { status: 400 }
    );
  }

  const authSession = await mapAuthSession(authData.session);

  if (!authSession) {
    throw json(
      {
        error: "Could not create session from given data!",
        data: null,
      },
      { status: 400 }
    );
  }

  return authSession;
}
