import type { Role } from "@/constants";

import type { VehicleAssignmentAction } from "./vehicle-assignment.types";

export const VEHICLE_ASSIGNMENT_POLICY: Record<
  VehicleAssignmentAction,
  readonly Role[]
> = {
  list: ["admin", "manager"],
  create: ["admin", "manager"],
  return: ["admin", "manager"],
};

export function canPerformVehicleAssignmentAction(
  userRoles: readonly Role[],
  action: VehicleAssignmentAction
): boolean {
  return VEHICLE_ASSIGNMENT_POLICY[action].some((role) =>
    userRoles.includes(role)
  );
}
