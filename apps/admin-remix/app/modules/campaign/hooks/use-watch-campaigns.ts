import { useEffect } from "react";

import { useSubmit } from "@remix-run/react";

import { useSupabaseRealtime } from "~/core/integrations/supabase/realtime-context";

export function useWatchCampaigns() {
  const supabase = useSupabaseRealtime();
  const submit = useSubmit();

  useEffect(() => {
    const subscription = supabase
      .from("Campaign")
      .on("INSERT", () => {
        submit(null, { replace: true });
      })
      .on("DELETE", () => {
        submit(null, { replace: true });
      })
      .subscribe();

    return () => {
      subscription?.unsubscribe();
    };
  }, [supabase, submit]);
}