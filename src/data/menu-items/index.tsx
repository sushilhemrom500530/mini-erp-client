import {
  LayoutDashboard,
  UserRound,
  Package,
  PackagePlus,
  ShoppingCart,
} from "lucide-react";
import { TbMatrix, TbBulb } from "react-icons/tb";
import { MdDashboardCustomize } from "react-icons/md";
import { TbCategory, TbReportAnalytics, TbDiscount } from "react-icons/tb";

export interface SubmenuItem {
  label: string;
  href: string;
  icon?: React.ElementType;
}

export interface MenuItem {
  label: string;
  href?: string;
  icon?: React.ElementType;
  submenu?: SubmenuItem[];
}

export interface MenuGroup {
  menu: MenuItem[];
}

export interface MenuData {
  linkData: MenuGroup[];
}

export const sidebarMenus = {
  admin: [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Products",
      href: "/dashboard/products",
      icon: Package,
    },
    {
      label: "Add Product",
      href: "/dashboard/products/add",
      icon: PackagePlus,
    },
    {
      label: "Create Sale",
      href: "/dashboard/sales/create",
      icon: ShoppingCart,
    },
    {
      label: "Profile",
      href: "/dashboard/profile",
      icon: UserRound,
    },
  ],

  manager: [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Products",
      href: "/dashboard/products",
      icon: Package,
    },
    {
      label: "Add Product",
      href: "/dashboard/products/add",
      icon: PackagePlus,
    },
    {
      label: "Create Sale",
      href: "/dashboard/sales/create",
      icon: ShoppingCart,
    },
    {
      label: "Profile",
      href: "/dashboard/profile",
      icon: UserRound,
    },
  ],

  employee: [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Products",
      href: "/dashboard/products",
      icon: Package,
    },
    {
      label: "Create Sale",
      href: "/dashboard/sales/create",
      icon: ShoppingCart,
    },
    {
      label: "Profile",
      href: "/dashboard/profile",
      icon: UserRound,
    },
  ],
};

export const navLinks: MenuItem[] = [
  {
    label: "Products",
    href: "/products",
  },
  {
    label: "Services",
    href: "/services",
  },
  {
    label: "About Us",
    href: "/about-us",
  },
  {
    label: "Contact Us",
    href: "/contact-us",
  },
];
