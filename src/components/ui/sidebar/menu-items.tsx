"use client";

import { Button, cn, Link } from "@heroui/react";

import type { SidebarMenuItem } from "./types";

export const MenuItems = ({ isActive, item }: SidebarMenuItem) => {
  return (
    <Button
      size="md"
      as={Link}
      href={item?.href}
      radius="sm"
      color={isActive ? "primary" : "primary"}
      variant={isActive ? "solid" : "light"}
      className={cn(
        "flex w-full items-center shadow-none justify-start text-sm",
        isActive ? "text-white" : "text-gray-500"
      )}
    >
      {item.icon}
      {item.label}
    </Button>
  );
};
