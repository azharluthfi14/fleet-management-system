import type { Role } from "@/constants";
import type { AuthUser } from "@/features/auth/types";

export interface SidebarMenu {
  id: string;
  label: string;
  href?: string;
  icon: React.ReactNode;
  roles?: Role[];
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
