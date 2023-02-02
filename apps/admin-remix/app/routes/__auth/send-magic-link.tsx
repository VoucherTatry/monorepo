import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { parseFormAny } from "react-zorm";
import { z } from "zod";

import { sendMagicLink } from "~/core/auth/mutations";
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
  shouldCreateUser: z.preprocess(
    (val) => Boolean(parseInt(z.string().parse(val), 10)),
    z.boolean()
  ),
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

  const { error } = await sendMagicLink(
    result.data.email,
    result.data.shouldCreateUser
  );

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

  return json({});
};
