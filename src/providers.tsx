"use client";

import { cn, HeroUIProvider } from "@heroui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { ReactNode } from "react";
import { Toaster } from "sonner";

const queryClient = new QueryClient();

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <HeroUIProvider>{children}</HeroUIProvider>
      <ReactQueryDevtools initialIsOpen={false} />
      <Toaster
        position="top-right"
        toastOptions={{
          classNames: {
            error: cn(
              "bg-red-50! text-red-500! shadow-none! border border-red-100!"
            ),
            success: cn(
              "bg-emerald-50! text-emerald-500! shadow-none! border border-emerald-100!"
            ),
          },
        }}
      />
    </QueryClientProvider>
  );
}
