import type { Profile, User } from "@prisma/client";

export interface IUser extends User {
  profile: Profile | null;
}
