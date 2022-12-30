import { useMemo } from "react";
import { useMatchesData } from "~/core/hooks/use-matches-data";
import { isAdmin } from "~/modules/user/helpers";
import { RootData } from "~/root";

const useAppData = () => {
  const data = useMatchesData<RootData>("root");

  if (!data || !data.user)
    throw new Error(
      "Błąd w przetwarzaniu danych aplikacji, skontatkuj się z administratorem!"
    );

  return {
    user: data.user,
    userId: data.user!.id,
    isAdmin: isAdmin(data.user!.role),
  };
};

export default useAppData;
