import type { ReactElement } from "react";
import { createContext, useContext, useState } from "react";

import { useFetcher } from "@remix-run/react";

import type { SupabaseClient } from "./types";
import type { RealtimeAuthSession } from "~/modules/auth/session.server";

import { getSupabaseClient } from "./supabase";
import { useInterval, useMatchesData } from "~/hooks";
import { isBrowser } from "~/utils/is-browser";

// Remix feature here, we can "watch" root loader data
function useOptionalRealtimeSession(): Partial<RealtimeAuthSession> {
  const data = useMatchesData<{ realtimeSession: RealtimeAuthSession }>("root");

  return data?.realtimeSession || {};
}

const SupabaseRealtimeContext = createContext<SupabaseClient | undefined>(
  undefined
);

// in root.tsx, wrap <Outlet /> with <SupabaseRealtimeProvider> to use realtime features
export const SupabaseRealtimeProvider = ({
  children,
}: {
  children: ReactElement;
}) => {
  // what root loader data returns
  const { access_token, expiresIn, expiresAt } = useOptionalRealtimeSession();
  const [currentExpiresAt, setCurrentExpiresAt] = useState<
    number | undefined
  >();
  const [supabaseRealtimeClient, setSupabaseRealtimeClient] = useState<
    SupabaseClient | undefined
  >(() => {
    // prevents server side initial state
    if (isBrowser) return getSupabaseClient(); // init a default client in browser. Needed for oauth callback
  });
  const refresh = useFetcher();

  // auto refresh session at expire time
  useInterval(() => {
    // refreshes only if expiresIn is defined
    // prevents refresh when user is not logged in
    if (expiresIn)
      refresh.submit(null, {
        method: "post",
        action: "/refresh-session",
      });
  }, expiresIn);

  // when client side
  // after root loader fetch, if user session is refresh, it's time to create a new supabase client
  if (isBrowser && expiresAt !== currentExpiresAt) {
    // recreate a supabase client to force provider's consumer to rerender
    const client = getSupabaseClient();

    // if user is authenticated, set credential
    if (access_token)
      client.auth.setSession({
        access_token: access_token,
        refresh_token: access_token,
      });

    // refresh provider's state
    setCurrentExpiresAt(expiresAt);
    setSupabaseRealtimeClient(client);
  }

  return (
    <SupabaseRealtimeContext.Provider value={supabaseRealtimeClient}>
      {children}
    </SupabaseRealtimeContext.Provider>
  );
};

export const useSupabaseRealtime = () => {
  const context = useContext(SupabaseRealtimeContext);

  if (isBrowser && context === undefined) {
    throw new Error(
      `useSupabaseRealtime must be used within a SupabaseClientProvider.`
    );
  }

  return context as SupabaseClient;
};
