import { cn } from "@heroui/react";
import type { ReactNode } from "react";

import { AppHeader } from "../ui";

export const ContentWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <main
      className={cn(
        "min-h-screen bg-slate-50 pt-16 transition-all duration-300 md:pt-0",
        "md:ml-64"
      )}
    >
      <AppHeader />
      <div className="space-y-6 overflow-y-auto p-4 md:p-6">{children}</div>
    </main>
  );
};
