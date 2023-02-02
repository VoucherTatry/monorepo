import type { TypedResponse } from "@remix-run/node";
import { json as remixJson } from "@remix-run/node";
import { useLoaderData as useRemixLoaderData } from "@remix-run/react";
import { parse, stringify } from "superjson";

export const json = <Data>(
  obj: Data,
  init?: number | ResponseInit
): TypedResponse<string> => {
  const superJsonResult = stringify(obj);

  return remixJson(superJsonResult, init);
};

export const useLoaderData = <Data>() => {
  const loaderData = useRemixLoaderData();
  return parse<Data>(loaderData);
};
