"use client";

import {
  Avatar,
  Button,
  cn,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import { ChevronsLeftRight, Truck } from "lucide-react";
import { usePathname } from "next/navigation";

import { LogoutButton } from "./logout";
import { SIDEBAR_MENUS } from "./menu";
import { MenuItems } from "./menu-items";
import type { SidebarProps } from "./types";

export const Sidebar = ({ user }: SidebarProps) => {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "w-64 fixed inset-y-0 left-0 z-40 flex flex-col justify-between border-r border-gray-200 bg-white"
      )}
    >
      <div className="h-16 p-4 flex items-center  border-b border-slate-100">
        <div className="size-8 bg-neutral-900 rounded-lg flex items-center justify-center text-white mr-3">
          <Truck size={18} />
        </div>
        <span className="font-bold text-lg text-slate-800 tracking-tight">
          FMS Command
        </span>
      </div>
      <nav className="flex-1 p-4 items-center justify-center space-y-2 overflow-y-auto py-4">
        {SIDEBAR_MENUS?.map((menu) => (
          <MenuItems
            key={menu.id}
            item={menu}
            isActive={menu?.href === pathname}
          />
        ))}
      </nav>

      <div className="space-y-4 p-4">
        <Dropdown radius="sm" placement="top" className="">
          <DropdownTrigger>
            <Button
              size="lg"
              radius="sm"
              variant="light"
              className="flex px-2 justify-start w-full"
            >
              <Avatar name={user.name} className="size-10" />
              <div className="flex flex-1 justify-between items-center">
                <div className="space-y-0.5 text-start">
                  <div className="font-medium text-sm">{user.name}</div>
                  <div className="text-neutral-600 text-xs">{user.email}</div>
                </div>
                <ChevronsLeftRight className="rotate-90 size-4 text-neutral-500" />
              </div>
            </Button>
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownItem
              className="flex items-center justify-center"
              variant="flat"
              color="danger"
              key={"logout"}
            >
              <LogoutButton />
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </aside>
  );
};
