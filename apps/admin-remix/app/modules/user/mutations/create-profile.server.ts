import { Profile } from "@prisma/client";
import { db } from "~/core/database";

export async function createProfile({
  firstName,
  lastName,
  companyName,
  userId,
}: Profile) {
  return db.profile.create({
    data: {
      firstName,
      lastName,
      companyName,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
}
