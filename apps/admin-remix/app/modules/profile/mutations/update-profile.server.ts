import type { Prisma } from "@prisma/client";

import { db } from "~/database";

export async function updateProfile({
  organization,
  taxId,
  phone,
  userId,
  location,
}: Prisma.ProfileUpdateArgs["data"]) {
  const data: Prisma.ProfileUpdateArgs["data"] = {
    organization,
    taxId,
    phone,
    location,
  };

  if (typeof userId !== "string") {
    userId = userId?.set;
  }

  return db.profile.update({
    where: { userId },
    data,
  });
}
