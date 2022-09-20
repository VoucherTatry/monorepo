import type { Campaign, Prisma, User } from "@prisma/client";

import type { Location } from "~/core/database";
import { db } from "~/core/database";

type CreateCampaignData = Pick<
  Campaign,
  "body" | "title" | "price" | "discount" | "startDate" | "endDate"
> & {
  userId: User["id"];
} & {
  location: Location;
};

export async function createCampaign({
  title,
  body,
  price,
  discount,
  startDate,
  endDate,
  location,
  userId,
}: CreateCampaignData) {
  return db.campaign.create({
    data: {
      title,
      body,
      discount,
      price,
      startDate,
      endDate,
      location,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
}
