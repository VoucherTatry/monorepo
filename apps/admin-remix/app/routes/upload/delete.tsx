import { json } from "@remix-run/node";

import type { ActionFunction } from "@remix-run/node";

import { getSupabaseAdmin } from "~/integrations/supabase/supabase";
import { requireAuthSession } from "~/modules/auth";
import { commitAuthSession } from "~/modules/auth/session.server";

export const action: ActionFunction = async ({ request }) => {
  const authSession = await requireAuthSession(request);

  const { data: files } = await getSupabaseAdmin()
    .storage.from("public")
    .list(authSession.userId);

  const userFiles =
    files?.map((file) => `${authSession.userId}/${file.name}`) ?? [];

  const { data, error } = await getSupabaseAdmin()
    .storage.from("public")
    .remove(userFiles);

  if (!data || error)
    return json("Unable to delete file", {
      status: 500,
      headers: {
        "Set-Cookie": await commitAuthSession(request, { authSession }),
      },
    });

  return json(
    { success: true },
    {
      headers: {
        "Set-Cookie": await commitAuthSession(request, { authSession }),
      },
    }
  );
};
