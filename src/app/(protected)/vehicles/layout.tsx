import type { ReactNode } from "react";

import { requireRole } from "@/features/auth/auth.guards";

interface VehiclesLayoutProps {
  children: ReactNode;
}

export default async function VehiclesLayout({
  children,
}: VehiclesLayoutProps) {
  await requireRole(["admin", "manager"])();
  return <>{children}</>;
}
