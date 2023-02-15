import type { Prisma } from "@prisma/client";

import { db } from "~/core/database";

export async function createProfile({
  organization,
  taxId,
  phone,
  userId,
  location,
}: Prisma.ProfileCreateArgs["data"]) {
  const data: Prisma.ProfileCreateArgs["data"] = {
    organization,
    taxId,
    phone,
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
