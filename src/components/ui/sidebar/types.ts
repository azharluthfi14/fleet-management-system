import type { AuthUser } from "@/features/auth/types";
import type { Role } from "@/features/user";

export interface SidebarMenu {
  id: string;
  label: string;
  href?: string;
  icon: React.ReactNode;
  roles?: readonly Role[];
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
