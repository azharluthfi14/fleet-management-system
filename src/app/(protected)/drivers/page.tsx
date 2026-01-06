import { requireAuth } from "@/features/auth";
import { createDriverAction, getListDriverAction } from "@/features/driver";

import { PanelHeaderTable } from "./components";

export default async function DriversPage() {
  const user = await requireAuth();

  const vehicle = await getListDriverAction();

  return (
    <div className="space-y-6">
      <PanelHeaderTable action={createDriverAction} />
    </div>
  );
}
