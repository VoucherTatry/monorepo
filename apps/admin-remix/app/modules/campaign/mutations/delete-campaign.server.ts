import { Campaign, Role, User } from "@prisma/client";
import { db } from "~/core/database";

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
