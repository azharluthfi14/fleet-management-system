import { requireAuth } from "@/features/auth";
import {
  createDriverAction,
  deleteDriverAction,
  editDriverAction,
  getListDriverAction,
} from "@/features/driver";
import { getListAvailableVehicle } from "@/features/vehicle";
import { createAssignmentAction } from "@/features/vehicle-assignment/vehicle-assignment.actions";

import { DriverTable, PanelHeaderTable } from "./components";

export default async function DriversPage() {
  const user = await requireAuth();
  const drivers = await getListDriverAction();
  const availabelVehicles = await getListAvailableVehicle();

  return (
    <div className="space-y-6">
      <PanelHeaderTable action={createDriverAction} />
      <DriverTable
        userRoles={user.roles}
        drivers={drivers}
        availabelVehicles={availabelVehicles}
        actionEdit={editDriverAction}
        actionDelete={deleteDriverAction}
        actionAssign={createAssignmentAction}
      />
    </div>
  );
}
