import { LayoutDashboard, Truck, Users } from "lucide-react";

import { ROLES } from "@/constants";

import type { SidebarMenu } from "./types";

export const SIDEBAR_MENUS: SidebarMenu[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    href: "/dashboard",
    roles: [ROLES.ADMIN, ROLES.OPS],
    icon: <LayoutDashboard className="size-5" />,
  },
  {
    id: "vehicles",
    label: "Vehicles",
    href: "/vehicles",
    roles: [ROLES.ADMIN, ROLES.OPS],
    icon: <Truck className="size-5" />,
  },
  {
    id: "drivers",
    label: "Drivers",
    href: "/drivers",
    icon: <Users className="size-5" />,
    roles: [ROLES.ADMIN, ROLES.OPS],
  },
];
