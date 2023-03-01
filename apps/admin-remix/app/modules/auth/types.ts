import type { SupabaseAuthSession } from "~/integrations/supabase";
import type { IUser } from "~/modules/user";

export interface AuthSession extends Omit<SupabaseAuthSession, "user"> {
  access_token: string;
  refresh_token: string;
  expiresIn: number;
  expiresAt: number;
  userId: string;
  email: string;
  user: IUser;
}
