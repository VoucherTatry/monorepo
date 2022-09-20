import { Outlet } from "@remix-run/react";

import { WithSidebar } from "~/core/components/layouts/with-sidebar";

export default function CampaignsPage() {
  return (
    <WithSidebar>
      <Outlet />
    </WithSidebar>
  );
}
