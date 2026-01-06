import type { Role } from "@/constants";

export type DriverAction = "view" | "create" | "update" | "delete";

const DRIVER_POLICY: Record<DriverAction, readonly Role[]> = {
  view: ["admin", "manager", "operator"],
  create: ["admin", "manager"],
  update: ["admin", "manager"],
  delete: ["admin"],
};

export function canPerformDriverAction(
  userRoles: readonly Role[],
  action: DriverAction
): boolean {
  return DRIVER_POLICY[action].some((role) => userRoles.includes(role));
}
