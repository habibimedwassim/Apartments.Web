import { ColumnDef } from "@tanstack/react-table";
import { UserModel } from "@/app/models/user.models";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { UsersTableRowActions } from "./UsersTableRowActions";
import UserButton from "@/components/common/button-user";
import { useNavigate } from "react-router-dom";

export const userColumns = (
  pageType: "all" | "admins" | "owners" | "tenants"
): ColumnDef<UserModel>[] => [
  {
    accessorKey: "avatar",
    header: "Avatar",
    cell: ({ row }) => {
      const user = row.original as UserModel;
      const navigate = useNavigate();
      const getPath = () => {
        switch (pageType) {
          case "owners":
            return "/admin/owners/details";
          case "tenants":
            return "/admin/tenants/details";
          case "admins":
            return "/admin/admins/details";
          default:
            return "/admin/users/details";
        }
      };
      const path = getPath();
      return (
        <UserButton
          avatar={user?.avatar}
          firstName={user.firstName}
          lastName={user.lastName}
          onClick={() =>
            pageType == "all"
              ? {}
              : navigate(path, { state: { userId: user.id } })
          }
        />
      );
    },
    enableHiding: true,
  },
  {
    accessorKey: "fullName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Full Name" />
    ),
    cell: ({ row }) => {
      const fullName = row.getValue("fullName") as string;
      return <div className="truncate max-w-sm">{fullName}</div>;
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => {
      const email = row.getValue("email") as string;
      return <div className="truncate max-w-sm">{email}</div>;
    },
  },
  {
    accessorKey: "phoneNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phone Number" />
    ),
    cell: ({ row }) => {
      const phoneNumber = row.getValue("phoneNumber") as string | null;
      return phoneNumber ? phoneNumber : "--";
    },
  },
  {
    accessorKey: "gender",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Gender" />
    ),
    cell: ({ row }) => {
      const gender = row.getValue("gender") as string | null;
      return gender ? gender : "--";
    },
  },
  {
    accessorKey: "dateOfBirth",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date of Birth" />
    ),
    cell: ({ row }) => {
      const dateOfBirth = row.getValue("dateOfBirth") as string | null;
      return dateOfBirth ? dateOfBirth : "--";
    },
    enableSorting: true,
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return <UsersTableRowActions row={row} pageType={pageType} />;
    },
  },
];
