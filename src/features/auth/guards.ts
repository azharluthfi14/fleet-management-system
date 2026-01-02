import { redirect } from "next/navigation";

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
      throw new Error("FORBIDDEN");
    }

    return user;
  };
}
