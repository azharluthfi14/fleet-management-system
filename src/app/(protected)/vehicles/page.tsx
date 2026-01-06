import { requireAuth } from "@/features/auth";
import {
  createVehicleAction,
  deleteVehicle,
  editVehicleAction,
  getListVehicleAction,
} from "@/features/vehicle";

import { PanelHeaderTable, VehicleTable } from "./components";

export default async function VehiclesPage() {
  const user = await requireAuth();
  const vehicles = await getListVehicleAction();

  return (
    <div className="space-y-6">
      <PanelHeaderTable userRoles={user.roles} action={createVehicleAction} />
      <VehicleTable
        userRoles={user.roles}
        vehicles={vehicles}
        action={editVehicleAction}
        actionDelete={deleteVehicle}
      />
    </div>
  );
}
