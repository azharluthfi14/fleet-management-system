import { requireAuth } from "@/features/auth/guards";

export default async function DashboardPage() {
  const user = await requireAuth();
  return <div>DashboardPage hello {user?.name}</div>;
}
