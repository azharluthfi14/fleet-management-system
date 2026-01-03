import { notFound, redirect } from "next/navigation";

import type { Role } from "@/constants";

import { getAuthUser } from "./auth.server";

export async function requireAuth() {
  const user = await getAuthUser();

  if (!user) redirect("/login");
  return user;
}

export function requireRole(allowedRoles: readonly Role[]) {
  return async () => {
    const user = await requireAuth();

    if (!hasRole(user?.roles, allowedRoles)) {
      notFound();
    }

    return user;
  };
}

export function hasRole(userRoles: readonly Role[], allowed: readonly Role[]) {
  return allowed.some((role) => userRoles.includes(role));
}
