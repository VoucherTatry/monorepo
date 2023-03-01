import { Role } from "@prisma/client";

import type { Campaign, User } from "@prisma/client";

import { db } from "~/database";

export async function deleteCampaign({
  id,
  userId,
}: Pick<Campaign, "id"> & { userId: User["id"] }) {
  return db.campaign.deleteMany({
    where: {
      id,
      user: {
        OR: {
          id: userId,
          NOT: {
            role: Role.CUSTOMER,
          },
        },
      },
    },
  });
}
