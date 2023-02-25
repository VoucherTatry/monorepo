import { z } from "zod";

import type { Profile } from "@prisma/client";

import { validateNIP } from "~/utils/validateNIP";

export const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export type ProfileSchemaFields = Omit<Profile, "userId" | "status">;
export const ProfileSchema = z.object({
  organization: z
    .string()
    .min(2, "Nazwa firmy jest polem wymaganym. Minimalna liczba znaków - 2."),

  taxId: z
    .string()
    .min(
      6,
      "Numer NIP jest polem wymaganym. Proszę podać prawidłowy numer nip składający się z 6 cyfr."
    )
    .refine(validateNIP, "Numer NIP nieprawidłowy."),

  phone: z
    .string()
    .min(6, "Numer telefonu jest polem wymaganym. Minimalna liczba cyfr - 6")
    .regex(
      phoneRegExp,
      "Podany numer telefonu jest nieprawidłowy. Proszę podać numer telefonu w odpowiednim formacie."
    ),

  locationId: z.string().nullable().default(null),
});
