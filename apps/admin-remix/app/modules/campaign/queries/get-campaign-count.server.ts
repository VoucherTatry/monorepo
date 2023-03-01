import { db } from "~/database";

export async function getCampaignCount() {
  return db.campaign.count();
}
