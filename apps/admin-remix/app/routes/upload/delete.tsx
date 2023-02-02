import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";

import { requireAuthSession } from "~/core/auth/guards";
import { commitAuthSession } from "~/core/auth/session.server";
import { getSupabaseAdmin } from "~/core/integrations/supabase/supabase";

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
