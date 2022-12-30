import { Profile } from "@prisma/client";
import { z } from "zod";
import { ZodShape } from "~/core/utils/zod-types";

export type ProfileSchemaFields = Omit<Profile, "userId">;
type ProfileSchemaShape = ZodShape<ProfileSchemaFields>;
export const ProfileSchema = z.object<ProfileSchemaShape>({
  firstName: z.string().min(2, "require-firstName"),
  lastName: z.string().min(2, "require-lastName"),
  companyName: z.string().min(2, "require-companyName"),
  locationId: z.string().nullable().default(null),
});
