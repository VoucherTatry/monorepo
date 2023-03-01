import type { Prisma } from "@prisma/client";

import { db } from "~/database";

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

  const profile = db.profile.create({
    data,
  });

  return profile;
}
