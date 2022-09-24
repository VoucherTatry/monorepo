import type { Campaign, Category } from "@prisma/client";

import { db } from "~/core/database";
import { isAdmin } from "~/modules/user/helpers";
import type { IUser } from "~/modules/user/queries";

export type UserCampaign = Campaign & {
  categories: Category[];
  user: IUser;
};

const CAMPAIGN_INCLUDE_FIELDS = {
  categories: true,
  user: {
    include: {
      profile: true,
    },
  },
};

export async function getCampaignById({
  user,
  id,
}: Pick<Campaign, "id"> & {
  user: IUser | null;
}): Promise<UserCampaign | null> {
  if (!user) return null;

  if (isAdmin(user.role)) {
    return db.campaign.findUnique({
      where: { id },
      include: CAMPAIGN_INCLUDE_FIELDS,
    });
  }

  return db.campaign.findFirst({
    where: { id, userId: user.id },
    include: CAMPAIGN_INCLUDE_FIELDS,
  });
}
