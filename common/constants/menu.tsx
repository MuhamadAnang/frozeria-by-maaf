"use client";

import {
  LayoutDashboard,
  Package,
  Tag,
  HelpCircle,
} from "lucide-react";
import { Route as RouteNext } from "next";

export type MenuItem = {
  label: string;
  href?: RouteNext;
  icon?: React.ReactNode;
};

export type MenuWithChildren = MenuItem & {
  children?: MenuItem[];
};

export type MenuGroup = {
  label: string;
  items: MenuWithChildren[];
};

export const MENU_GROUPS: MenuGroup[] = [
  {
    label: "General",
    items: [
      {
        label: "Dashboard",
        href: "/dashboard",
        icon: <LayoutDashboard />,
      },
    ],
  },
  {
    label: "Inventory",
    items: [
      { label: "Barang", href: "/items", icon: <Package /> },
      { label: "Kategori", href: "/categories", icon: <Tag /> },
    ],
  },
  {
    label: "Bantuan",
    items: [
      { label: "Panduan", href: "/help", icon: <HelpCircle /> },
    ],
  },
];