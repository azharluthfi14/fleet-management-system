import { redirect } from "next/navigation";
import type { ReactNode } from "react";

import { ContentWrapper } from "@/components/layout";
import { Sidebar } from "@/components/ui";
import { AuthProvider } from "@/features/auth/auth-provider";
import { getAuthUser } from "@/features/auth/server";

export default async function ProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getAuthUser();

  if (!user) redirect("/login");
  return (
    <AuthProvider user={user}>
      <div className="min-h-screen">
        <Sidebar user={user} />
        <ContentWrapper>{children}</ContentWrapper>
      </div>
    </AuthProvider>
  );
}
