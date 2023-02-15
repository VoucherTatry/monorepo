import type { Profile } from "@prisma/client";
import { z } from "zod";

export type ProfileSchemaFields = Omit<Profile, "userId" | "status">;
export const ProfileSchema = z.object({
  organization: z.string().min(2, "require-organization"),
  taxId: z.string().min(6, "require-taxId"),
  phone: z.string().min(2, "require-phone"),
  locationId: z.string().nullable().default(null),
});
