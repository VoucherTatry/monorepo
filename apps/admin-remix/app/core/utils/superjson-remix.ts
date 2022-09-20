import { json as remixJson, TypedResponse } from "@remix-run/node";
import { useLoaderData as useRemixLoaderData } from "@remix-run/react";
import { parse, stringify } from "superjson";
import { SuperJSONResult } from "superjson/dist/types";

export const json = <Data extends unknown>(
  obj: Data,
  init?: number | ResponseInit
): TypedResponse<Data> => {
  const superJsonResult = stringify(obj);
  return remixJson(superJsonResult, init);
};

export const useLoaderData = <Data>() => {
  const loaderData = useRemixLoaderData();
  return parse<Data>(loaderData);
};
