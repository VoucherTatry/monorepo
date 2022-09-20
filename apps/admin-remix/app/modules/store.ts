import { Role } from "@prisma/client";
import create from "zustand";

import type { TUser } from "~/modules/user/queries";

export type StoreState = {
  user: TUser | null;
  setUser: (user: TUser) => void;
  isAdmin: () => boolean;
};

export const useUserStore = create<StoreState>((set, get) => ({
  user: null,
  setUser: (user: TUser) => set({ user }),
  isAdmin: () =>
    [Role.ADMIN, Role.SUPER_ADMIN].some((role) => role === get()?.user?.role),
}));
