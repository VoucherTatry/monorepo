import { db } from "~/core/database";

export async function getCampaignCount() {
  return db.campaign.count();
}
