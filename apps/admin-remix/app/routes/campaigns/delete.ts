import type { ActionFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import invariant from "tiny-invariant";

import { requireAuthSession } from "~/core/auth/guards";
import { assertIsDelete } from "~/core/utils/http.server";
import { deleteCampaign } from "~/modules/campaign/mutations";

export const action: ActionFunction = async ({ request }) => {
  assertIsDelete(request);
  const authSession = await requireAuthSession(request);

  const formData = await request.formData();
  const campaignId = formData.get("campaignId");

  invariant(campaignId, "campaignId not provided!");
  invariant(typeof campaignId === "string", "campaignId not valid!");

  await deleteCampaign({ userId: authSession.userId, id: campaignId });

  return redirect("/campaigns");
};
