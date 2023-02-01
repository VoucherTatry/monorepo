import type { Prisma } from "@prisma/client";

import { db } from "~/core/database";

export async function createProfile({
  firstName,
  lastName,
  companyName,
  userId,
  location,
}: Prisma.ProfileCreateArgs["data"]) {
  const data: Prisma.ProfileCreateArgs["data"] = {
    firstName,
    lastName,
    companyName,
    location,
    user: {
      connect: {
        id: userId,
      },
    },
  };
  return db.profile.upsert({
    where: {
      userId,
    },
    create: data,
    update: data,
  });
}
