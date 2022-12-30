import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { getFormData } from "remix-params-helper";
import { z } from "zod";

import { sendMagicLink } from "~/core/auth/mutations";
import { assertIsPost } from "~/core/utils/http.server";

export enum MagicLinkSubmitErrorsEnum {
  TOO_MANY = "too-many-requests",
  GENERIC = "unable-to-send-magic-link",
}

const MagicLinkSchema = z.object({
  email: z
    .string()
    .email("Nieprawidłowy adres email")
    .transform((email) => email.toLowerCase()),
});

interface ActionData {
  error?: string;
}

export const action: ActionFunction = async ({ request }) => {
  assertIsPost(request);

  const form = await getFormData(request, MagicLinkSchema);

  if (!form.success) {
    return json<ActionData>(
      {
        error: "Nieprawidłowy adres email",
      },
      { status: 400 }
    );
  }

  const { error } = await sendMagicLink(form.data.email);

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
        error: MagicLinkSubmitErrorsEnum.GENERIC,
      },
      { status: 500 }
    );
  }

  return json({});
};
