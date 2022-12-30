import { Location } from "@prisma/client";
import { z } from "zod";
import { ZodShape } from "~/core/utils/zod-types";

export type LocationSchemaFields = Omit<Location, "id">;
type LocationSchemaShape = ZodShape<LocationSchemaFields>;
export const LocationSchema = z.object<LocationSchemaShape>({
  address: z.string().min(5, "require-address"),
  city: z.string().min(2, "require-city"),
  lat: z.number(),
  lng: z.number(),
});