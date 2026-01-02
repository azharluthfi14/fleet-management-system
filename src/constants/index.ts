export const ROLES = {
  admin: "Admin",
  manager: "Manager",
  operator: "Operator",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];
