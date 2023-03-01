import { redirect } from "@remix-run/node";

import type { ActionFunction, LoaderFunction } from "@remix-run/node";

import { destroyAuthSession } from "~/modules/auth/session.server";
import { assertIsPost } from "~/utils/http.server";

export const action: ActionFunction = async ({ request }) => {
  assertIsPost(request);

  return destroyAuthSession(request);
};

export const loader: LoaderFunction = async () => redirect("/");
