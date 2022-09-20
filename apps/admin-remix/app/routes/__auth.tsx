import { Outlet } from "@remix-run/react";

import { AuthWrapper } from "~/core/components/layouts/auth-wrapper";

export default function Auth() {
  return (
    <AuthWrapper>
      <Outlet />
    </AuthWrapper>
  );
}
