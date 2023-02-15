import { redirect } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";

import { assertAuthSession } from "~/core/auth/guards/assert-auth-session.server";
import {
  commitAuthSession,
  destroyAuthSession,
} from "~/core/auth/session.server";
import { mapAuthSession } from "~/core/auth/utils/map-auth-session";
import { getUserById } from "~/modules/user/queries";
import { ProfileStatus } from "@prisma/client";
import { getCurrentPath } from "~/utils/http.server";
import { getGaurdedPath } from "~/utils/getGuardedPath";

export const loader: LoaderFunction = async ({ request }) => {
  const authSession = await assertAuthSession(request);

  const user = await getUserById(authSession.userId);

  if (!user) {
    destroyAuthSession(request);
    return redirect("/");
  }

  const redirectPath = getGaurdedPath({ path: "/", user });

  const updatedSession = mapAuthSession(authSession, user);
  return commitAuthSession(request, { authSession: updatedSession });

  return null;
};

export default function ReviewPending() {
  return (
    <div className="prose flex flex-col space-y-4">
      <h2>Weryfikacja konta w trakcie</h2>
      <p>Weryfikacja w trakcie, proszę spróbować później</p>
    </div>
  );
}
