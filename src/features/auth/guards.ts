import { notFound, redirect } from "next/navigation";

import type { Role } from "../user";
import { getAuthUser } from "./server";

export async function requireAuth() {
  const user = await getAuthUser();

  if (!user) redirect("/login");
  return user;
}

export function requireRole(allowedRoles: string[]) {
  return async () => {
    const user = await requireAuth();

    const hasRole = user.roles.some((r) => allowedRoles.includes(r));

    if (!hasRole) {
      notFound();
    }

    return user;
  };
}

export function hasRole(userRoles: readonly Role[], allowed: readonly Role[]) {
  return allowed.some((role) => userRoles.includes(role));
}
