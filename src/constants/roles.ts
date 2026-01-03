export const ROLES = ["admin", "manager", "operator"] as const;
export type Role = (typeof ROLES)[number];
