import type { AuthUser } from "@/features/auth/types";

export interface SidebarMenu {
  id: string;
  label: string;
  href?: string;
  icon: React.ReactNode;
  roles?: string[];
  children?: SidebarMenu[];
  badge?: number;
}

export interface SidebarMenuItem {
  item: SidebarMenu;
  isActive: boolean;
}

export interface SidebarProps {
  user: AuthUser;
}
