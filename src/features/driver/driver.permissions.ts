import type { Role } from "@/constants";

export const DRIVER_PERMISSIONS = {
  list: ["admin", "manager", "operator"] as Role[],
  view: ["admin", "manager", "operator"] as Role[],
  create: ["admin", "manager"] as Role[],
  update: ["admin", "manager"] as Role[],
  delete: ["admin"] as Role[],
};
