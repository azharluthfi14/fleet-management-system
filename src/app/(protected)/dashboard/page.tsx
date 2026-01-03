import { requireAuth } from "@/features/auth/auth.guards";

import { ListStat } from "./components";

export default async function DashboardPage() {
  const user = await requireAuth();
  return (
    <div className="gap-y-4">
      <ListStat />
    </div>
  );
}
