import { Outlet } from "@remix-run/react";

import { WithSidebar } from "~/core/components/layouts/with-sidebar";

export default function CategoriesPage() {
  return (
    <WithSidebar>
      <Outlet />
    </WithSidebar>
  );
}
