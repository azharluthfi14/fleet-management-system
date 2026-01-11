import { requireAuth } from "@/features/auth";
import { getListDriverAction } from "@/features/driver";

import { DriverPageClient } from "./page-client";

export default async function DriversPage() {
  const user = await requireAuth();
  const drivers = await getListDriverAction();

  return (
    <div className="space-y-6">
      <DriverPageClient drivers={drivers} user={user} />
    </div>
  );
}
