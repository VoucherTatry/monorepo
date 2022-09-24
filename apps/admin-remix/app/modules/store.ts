import create from "zustand";

import { isAdmin } from "./user/helpers";
import type { IUser } from "~/modules/user/queries";

export type StoreState = {
  user: IUser | null;
  setUser: (user: IUser) => void;
  isAdmin: () => boolean;
};

export const useUserStore = create<StoreState>((set, get) => ({
  user: null,
  setUser: (user: IUser) => set({ user }),
  isAdmin: () => isAdmin(get()?.user?.role),
}));
