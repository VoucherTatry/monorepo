import type { Prisma } from "@prisma/client";

import { db } from "~/core/database";

export async function createCampaign({
  title,
  body,
  price,
  discount,
  startDate,
  endDate,
  location,
  user,
}: Prisma.CampaignCreateArgs["data"]) {
  if (!location)
    throw new Error("Lokalizacja jest wymagana do utworzenia oferty!");

  return db.campaign.create({
    data: {
      title,
      body,
      discount,
      price,
      startDate,
      endDate,
      location,
      user,
    },
  });
}
