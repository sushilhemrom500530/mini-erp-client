import {
  LayoutDashboard,
  Ticket,
  CalendarDays,
  Heart,
  CreditCard,
  Bell,
  User,
  Settings,
  UserRound,
  ShieldAlert,
  Info,
  CircleQuestionMark,
  Users,
  ShieldCheck,
  BarChart3,
  ClipboardList,
  MessageSquareWarning,
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
  icon: React.ElementType;
  submenu?: SubmenuItem[];
}

export interface MenuGroup {
  menu: MenuItem[];
}

export interface MenuData {
  linkData: MenuGroup[];
}

// for orbit-export
export const exportMenuData: MenuData = {
  linkData: [
    {
      menu: [
        {
          label: "Dashboard",
          href: "/dashboard/orbit-export",
          icon: LayoutDashboard,
        },
        {
          label: "My Products",
          href: "/dashboard/orbit-export/my-products",
          icon: MdDashboardCustomize,
        },
        {
          label: "Inventory",
          href: "/dashboard/orbit-export/inventory",
          icon: TbCategory,
        },
        {
          label: "Export Journey",
          href: "/dashboard/orbit-export/export-journey",
          icon: Ticket,
        },

        {
          label: "Sales",
          href: "/dashboard/orbit-export/sales",
          icon: Users,
        },
        {
          label: "Message",
          href: "/dashboard/message",
          icon: ShieldCheck,
        },
        {
          label: "Notifications",
          href: "/dashboard/notifications",
          icon: Bell,
        },
        {
          label: "Contract &Compliance",
          href: "/dashboard/orbit-export/contract-compliance",
          icon: MessageSquareWarning,
        },
        {
          label: "My Account",
          href: "/dashboard/orbit-export/my-account",
          icon: UserRound,
        },
      ],
    },
  ],
};

// import orbit
export const importMenuData: MenuData = {
  linkData: [
    {
      menu: [
        {
          label: "Dashboard",
          href: "/dashboard/orbit-import",
          icon: LayoutDashboard,
        },
        {
          label: "My Requests",
          href: "/dashboard/orbit-import/my-request",
          icon: MdDashboardCustomize,
        },
        {
          label: "My Orders",
          href: "/dashboard/orbit-import/my-orders",
          icon: TbCategory,
        },
        // {
        //   label: "Business Analysis",
        //   href: "/dashboard/orbit-import/business-analysis",
        //   icon: TbReportAnalytics,
        // },
        {
          label: "Message",
          href: "/dashboard/messages",
          icon: ShieldCheck,
        },
        {
          label: "Notifications",
          href: "/dashboard/notifications",
          icon: Bell,
        },
        // {
        //   label: "Contract & Compliance",
        //   href: "/dashboard/orbit-import/contract-compliance",
        //   icon: MessageSquareWarning,
        // },
        {
          label: "My Account",
          href: "/dashboard/orbit-import/my-account",
          icon: UserRound,
        },
      ],
    },
  ],
};

// supplier
export const supplierMenuData: MenuData = {
  linkData: [
    {
      menu: [
        {
          label: "Home",
          href: "/dashboard/supplier",
          icon: LayoutDashboard,
        },
        {
          label: "Products",
          href: "/dashboard/supplier/products",
          icon: MdDashboardCustomize,
        },
        {
          label: "Orders",
          href: "/dashboard/supplier/orders",
          icon: TbCategory,
        },
        {
          label: "Messages",
          href: "/dashboard/messages",
          icon: ShieldCheck,
        },
        {
          label: "Notifications",
          href: "/dashboard/notifications",
          icon: Bell,
        },
        {
          label: "Reputation",
          href: "/dashboard/supplier/reputation",
          icon: MessageSquareWarning,
        },
        {
          label: "Contracts & Compliance",
          href: "/dashboard/supplier/contracts-compliance",
          icon: UserRound,
        },
        {
          label: "My Account",
          href: "/dashboard/supplier/my-account",
          icon: UserRound,
        },
      ],
    },
  ],
};

// logistics partner
export const logisticPartnerMenuData: MenuData = {
  linkData: [
    {
      menu: [
        {
          label: "Home",
          href: "/dashboard/logistics-partner",
          icon: LayoutDashboard,
        },
        {
          label: "Orders",
          href: "/dashboard/logistics-partner/orders",
          icon: Ticket,
        },
        {
          label: "Messages",
          href: "/dashboard/messages",
          icon: CalendarDays,
        },
        {
          label: "Notifications",
          href: "/dashboard/notifications",
          icon: Heart,
        },
        {
          label: "Contracts & Compliance",
          href: "/dashboard/logistics-partner/contracts-compliance",
          icon: CreditCard,
        },
        {
          label: "My Account",
          href: "/dashboard/logistics-partner/my-account",
          icon: Bell,
        },
        {
          label: "Profile",
          href: "/dashboard/logistics-partner/profile",
          icon: User,
        },
      ],
    },
  ],
};

export const navItems: MenuItem[] = [
  {
    label: "Events",
    href: "/events",
    icon: CalendarDays,
  },
  {
    label: "Sports",
    href: "/events?category=sports",
    icon: Ticket,
  },
  {
    label: "Music",
    href: "/events?category=music",
    icon: Heart,
  },
  {
    label: "Shows",
    href: "/events?category=shows",
    icon: Bell,
  },
];