import { useMemo } from "react";

import { useMatches } from "@remix-run/react";
import { parse } from "superjson";

/**
 * This base hook is used in other hooks to quickly search for specific data
 * across all loader data using useMatches.
 * @param {string} id The route id
 * @returns {JSON|undefined} The router data or undefined if not found
 */
export function useMatchesData<T>(id: string): T | undefined {
  const matchingRoutes = useMatches();

  const route = useMemo(
    () => matchingRoutes.find((route) => route.id === id),
    [matchingRoutes, id]
  );

  if (route) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return parse<T>(route?.data as any) as T;
  }

  return undefined;
}
