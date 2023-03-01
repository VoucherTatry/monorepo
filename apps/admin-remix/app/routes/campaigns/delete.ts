import { redirect } from "@remix-run/node";
import invariant from "tiny-invariant";

import { requireAuthSession } from "~/modules/auth";
import { deleteCampaign } from "~/modules/campaign/mutations";
import { assertIsDelete } from "~/utils/http.server";

import type { ActionFunction } from "@remix-run/node";

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
