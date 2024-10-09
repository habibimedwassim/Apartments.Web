import { USER_ROLE } from "@/app/constants/user-role";
import { useAuthStore } from "@/hooks/use-store";
import {
  Users,
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
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon;
  submenus?: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  const role = useAuthStore((state) => state.role);
  return role === USER_ROLE.ADMIN
    ? getAdminMenuList(pathname)
    : getOwnerMenuList(pathname);
}

export function getAdminMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/",
          label: "Dashboard",
          active: pathname === "/admin",
          icon: LayoutGrid,
          submenus: [],
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
          submenus: [
            {
              href: "/admin/users",
              label: "All Users",
            },
            {
              href: "/admin/users/new",
              label: "New User",
            },
          ],
        },
      ],
    },
    {
      groupLabel: "Settings",
      menus: [
        {
          href: "/account",
          label: "Account",
          active: pathname.includes("/account"),
          icon: Settings,
        },
      ],
    },
  ];
}

export function getOwnerMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/",
          label: "Dashboard",
          active: pathname === "/",
          icon: LayoutGrid,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Contents",
      menus: [
        {
          href: "",
          label: "Apartments",
          active: pathname.includes("/apartments"),
          icon: HomeIcon,
          submenus: [
            {
              href: "/apartments",
              label: "All Apartments",
            },
            {
              href: "/apartments/new",
              label: "New Apartment",
            },
          ],
        },
        {
          href: "/requests",
          label: "Rental Requests",
          active: pathname.includes("/requests"),
          icon: DoorOpen,
        },
        {
          href: "/payments",
          label: "Payments",
          active: pathname.includes("/requests"),
          icon: Banknote,
        },
      ],
    },
    {
      groupLabel: "Settings",
      menus: [
        {
          href: "/users",
          label: "Users",
          active: pathname.includes("/users"),
          icon: Users,
        },
        {
          href: "/account",
          label: "Account",
          active: pathname.includes("/account"),
          icon: Settings,
        },
      ],
    },
  ];
}
