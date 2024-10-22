import { REQUEST_TYPES } from "@/app/constants/request";
import { USER_ROLE } from "@/app/constants/user-role";
import { NotificationType } from "@/app/models/notification.models";
import { useAuthStore } from "@/hooks/use-store";
import {
  Settings,
  LayoutGrid,
  LucideIcon,
  HomeIcon,
  Banknote,
  DoorOpen,
  Users,
  House,
  NotebookText,
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active?: boolean;
  notificationCount?: number | undefined;
  type?: NotificationType;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon;
  submenus?: Submenu[];
  notificationCount: number | undefined;
  type?: NotificationType;
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

function safeSum(...values: Array<number | undefined>): number {
  return values.reduce((acc: number, val) => acc + (val || 0), 0);
}

function displayNotificationCount(count?: number): number | undefined {
  return count && count > 0 ? count : undefined;
}

export function getMenuList(
  pathname: string,
  notificationCounts: Record<string, number>
): Group[] {
  const role = useAuthStore().role;
  return role === USER_ROLE.ADMIN
    ? getAdminMenuList(pathname, notificationCounts)
    : getOwnerMenuList(pathname, notificationCounts);
}

function getAdminMenuList(
  pathname: string,
  notificationCounts: Record<string, number>
): Group[] {
  const usersCount = notificationCounts["Users"] || 0;
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/admin",
          label: "Dashboard",
          active: pathname === "/admin",
          icon: LayoutGrid,
          submenus: [],
          notificationCount: displayNotificationCount(0),
        },
      ],
    },
    {
      groupLabel: "Managment",
      menus: [
        {
          href: "",
          label: "Users",
          active: pathname.includes("/admin/users"),
          icon: HomeIcon,
          notificationCount: displayNotificationCount(usersCount),
          submenus: [
            {
              href: "/admin/users",
              label: "All Users",
              notificationCount: displayNotificationCount(usersCount),
            },
            {
              href: "/admin/users/new",
              label: "New User",
              notificationCount: 0,
            },
          ],
        },
      ],
    },
    {
      groupLabel: "Settings",
      menus: [
        {
          href: "/admin/account",
          label: "Account",
          active: pathname.includes("/account"),
          icon: Settings,
          notificationCount: displayNotificationCount(0),
        },
      ],
    },
  ];
}

function getOwnerMenuList(
  pathname: string,
  notificationCounts: Record<string, number>
): Group[] {
  const rentalRequestCount = notificationCounts[REQUEST_TYPES.Rent] || 0;
  const leaveRequestCount = notificationCounts[REQUEST_TYPES.Leave] || 0;
  const paymentRequestCount = notificationCounts[REQUEST_TYPES.Payment] || 0;
  const totalRequestCount = safeSum(
    rentalRequestCount,
    leaveRequestCount,
    paymentRequestCount
  );

  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/",
          label: "Dashboard",
          active: pathname === "/",
          icon: LayoutGrid,
          notificationCount: displayNotificationCount(0),
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Management",
      menus: [
        {
          href: "",
          label: "Apartments",
          active: pathname.includes("apartments"),
          icon: House,
          notificationCount: displayNotificationCount(0),
          submenus: [
            {
              href: "/apartments",
              label: "Apartments",
              notificationCount: displayNotificationCount(0),
            },
            {
              href: "/apartments/new",
              label: "New Apartment",
              notificationCount: displayNotificationCount(0),
            },
          ],
        },
        {
          href: "",
          label: "Requests",
          active: pathname.includes("requests"),
          icon: DoorOpen,
          notificationCount: displayNotificationCount(totalRequestCount),
          submenus: [
            {
              href: "/rental-requests",
              label: "Rental Requests",
              notificationCount: displayNotificationCount(rentalRequestCount),
              type: "rent",
            },
            {
              href: "/leave-requests",
              label: "Leave Requests",
              notificationCount: displayNotificationCount(leaveRequestCount),
              type: "leave",
            },
            {
              href: "/dismiss-requests",
              label: "Dismiss Requests",
              notificationCount: displayNotificationCount(0),
              type: "dismiss",
            },
          ],
        },
        {
          href: "/transactions",
          label: "Transactions",
          active: pathname.includes("transactions"),
          icon: Banknote,
          notificationCount: displayNotificationCount(paymentRequestCount),
          type: "payment",
        },
        {
          href: "/tenants",
          label: "Tenants",
          active: pathname.includes("tenants"),
          icon: Users,
          notificationCount: displayNotificationCount(0),
        },
      ],
    },
    {
      groupLabel: "Settings",
      menus: [
        {
          href: "",
          label: "Reports",
          active: pathname.includes("reports"),
          icon: NotebookText,
          notificationCount: displayNotificationCount(0),
          submenus: [
            {
              href: "/sent-reports",
              label: "Sent Reports",
              notificationCount: displayNotificationCount(0),
            },
            {
              href: "/received-reports",
              label: "Received Reports",
              notificationCount: displayNotificationCount(0),
            },
          ],
        },
        {
          href: "/account",
          label: "Account",
          active: pathname === "/account",
          icon: Settings,
          notificationCount: displayNotificationCount(0),
          submenus: [],
        },
      ],
    },
  ];
}
