import type { RootData } from "~/root";

import { useMatchesData } from "~/hooks/use-matches-data";
import { isAdmin } from "~/modules/user/helpers";

export const useAppData = () => {
  const data = useMatchesData<RootData>("root");

  if (!data || !data.user) {
    // eslint-disable-next-line no-console
    console.error({ data });
    throw new Error(
      "Błąd w przetwarzaniu danych aplikacji, skontatkuj się z administratorem!"
    );
  }

  return {
    user: data.user,
    userId: data.user!.id,
    isAdmin: isAdmin(data.user!.role),
  };
};
