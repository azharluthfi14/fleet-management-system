import {
  DollarSign,
  LayoutDashboard,
  MapPin,
  Truck,
  Users,
  Wrench,
} from "lucide-react";

import type { SidebarMenu } from "./types";

export const SIDEBAR_MENUS: SidebarMenu[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard className="size-5" />,
  },
  {
    id: "vehicles",
    label: "Vehicles",
    href: "/vehicles",
    roles: ["admin", "manager"],
    icon: <Truck className="size-5" />,
  },
  {
    id: "drivers",
    label: "Drivers",
    href: "/drivers",
    icon: <Users className="size-5" />,
    roles: ["admin"],
  },
  {
    id: "routes",
    label: "Trips & Routes",
    href: "/trips",
    icon: <MapPin className="size-5" />,
    roles: ["admin", "manager"],
  },
  {
    id: "maintenance",
    label: "Maintenance",
    href: "/maintenance",
    icon: <Wrench className="size-5" />,
    roles: ["admin", "manager"],
  },
  {
    id: "finance",
    label: "Finance & Costs",
    href: "/finance",
    icon: <DollarSign className="size-5" />,
    roles: ["admin", "manager"],
  },
];
