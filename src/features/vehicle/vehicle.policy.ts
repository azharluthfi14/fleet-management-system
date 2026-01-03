import type { Role } from "@/constants";

export type VehicleAction = "view" | "create" | "update" | "delete";

const VEHICLE_POLICY: Record<VehicleAction, readonly Role[]> = {
  view: ["admin", "manager", "operator"],
  create: ["admin", "manager"],
  update: ["admin", "manager"],
  delete: ["admin"],
};

export function canPerformVehicleAction(
  userRoles: readonly Role[],
  action: VehicleAction
): boolean {
  return VEHICLE_POLICY[action].some((role) => userRoles.includes(role));
}
