import type { Category, User } from "@prisma/client";
import type { IUser } from "~/modules/user";

import { db } from "~/database";

const CAMPAIGNS_SELECT = {
  id: true,
  title: true,
  startDate: true,
  endDate: true,
  categories: true,
  user: {
    include: {
      profile: true,
    },
  },
};

export interface ICampaigns {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date | null;
  categories: Category[];
  user: IUser;
}

export async function getCampaignsByUserId({
  userId,
}: {
  userId: User["id"];
}): Promise<ICampaigns[]> {
  return db.campaign.findMany({
    where: { userId },
    select: CAMPAIGNS_SELECT,
    orderBy: { updatedAt: "desc" },
  });
}

export async function getAllCampaigns(): Promise<ICampaigns[]> {
  return db.campaign.findMany({
    select: CAMPAIGNS_SELECT,
    orderBy: { updatedAt: "desc" },
  });
}
