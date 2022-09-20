import { Category, User } from "@prisma/client";
import { db } from "~/core/database";

const CAMPAIGNS_SELECT = {
  id: true,
  title: true,
  startDate: true,
  endDate: true,
  categories: true,
};

export interface ICampaigns {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date | null;
  categories: Category[];
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
