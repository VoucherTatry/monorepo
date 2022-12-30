import type { Prisma, Profile } from "@prisma/client";

import { db } from "~/core/database";

export async function createProfile({
  firstName,
  lastName,
  companyName,
  userId,
  location,
}: Prisma.ProfileCreateArgs["data"]) {
  return db.profile.create({
    data: {
      firstName,
      lastName,
      companyName,
      location,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
}
