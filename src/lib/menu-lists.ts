import { USER_ROLE } from "@/app/constants/user-role";
import { useAuthStore, useNotificationStore } from "@/hooks/use-store"; // Import notification store
import {
  Settings,
  LayoutGrid,
  LucideIcon,
  HomeIcon,
  Banknote,
  DoorOpen,
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active?: boolean;
  notificationCount?: number | undefined; // Notification count for submenu
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon;
  submenus?: Submenu[];
  notificationCount: number | undefined; // Notification count for parent menu
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

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
          notificationCount: 0, // Placeholder for future use
        },
      ],
    },
    {
      groupLabel: "Contents",
      menus: [
        {
          href: "",
          label: "Users",
          active: pathname.includes("/admin/users"),
          icon: HomeIcon,
          notificationCount: usersCount > 0 ? usersCount : undefined,
          submenus: [
            {
              href: "/admin/users",
              label: "All Users",
              notificationCount: usersCount > 0 ? usersCount : undefined,
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
          notificationCount: 0,
        },
      ],
    },
  ];
}

function getOwnerMenuList(
  pathname: string,
  notificationCounts: Record<string, number>
): Group[] {
  const rentalRequestCount = notificationCounts["RentRequest"] || 0;
  const leaveRequestCount = notificationCounts["LeaveRequest"] || 0;
  const paymentRequestCount = notificationCounts["PaymentRequest"] || 0;
  const totalRequestCount =
    rentalRequestCount + leaveRequestCount + paymentRequestCount;

  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/",
          label: "Dashboard",
          active: pathname === "/",
          icon: LayoutGrid,
          notificationCount: 0, // No notifications for Dashboard
          submenus: [],
        },
        {
          href: "",
          label: "Requests",
          active: pathname.includes("requests"),
          icon: DoorOpen,
          notificationCount: totalRequestCount, // Sum of rental + leave requests
          submenus: [
            {
              href: "/rental-requests",
              label: "Rental Requests",
              notificationCount: rentalRequestCount, // Dynamic rental request count
            },
            {
              href: "/leave-requests",
              label: "Leave Requests",
              notificationCount:
                leaveRequestCount > 0 ? leaveRequestCount : undefined, // Dynamic leave request count
            },
          ],
        },
        {
          href: "/transactions",
          label: "Transactions",
          active: pathname.includes("/Transactions"),
          icon: Banknote,
          notificationCount:
            paymentRequestCount > 0 ? paymentRequestCount : undefined, // Dynamic payment request count
        },
      ],
    },
  ];
}
