import { requireAuth } from "@/features/auth";
import {
  createDriverAction,
  deleteDriverAction,
  editDriverAction,
  getListDriverAction,
} from "@/features/driver";

import { DriverTable, PanelHeaderTable } from "./components";

export default async function DriversPage() {
  const user = await requireAuth();
  const drivers = await getListDriverAction();

  return (
    <div className="space-y-6">
      <PanelHeaderTable action={createDriverAction} />
      <DriverTable
        userRoles={user.roles}
        drivers={drivers}
        actionEdit={editDriverAction}
        actionDelete={deleteDriverAction}
      />
    </div>
  );
}
