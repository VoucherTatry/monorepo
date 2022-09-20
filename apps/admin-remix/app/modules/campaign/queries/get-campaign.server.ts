import { Campaign, Category, User } from "@prisma/client";
import { db } from "~/core/database";

export type UserCampaign = Campaign & {
  categories: Category[];
};

export async function getUserCampaignById({
  userId,
  id,
}: Pick<Campaign, "id"> & {
  userId: User["id"];
}): Promise<UserCampaign | null> {
  return db.campaign.findFirst({
    where: { id, userId },
    include: {
      categories: true,
    },
  });
}
