import { TenantModel } from "@/app/models/user.models";
import UserButton from "@/components/common/button-user";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { ColumnDef } from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";

export const tenantColumns: ColumnDef<TenantModel>[] = [
  {
    accessorKey: "tenant",
    header: "Tenant",
    cell: ({ row }) => {
      const tenant = row.original;
      const navigate = useNavigate();

      return (
        <UserButton
          avatar={tenant?.avatar}
          firstName={tenant.firstName}
          lastName={tenant.lastName}
          onClick={() =>
            navigate("/tenants/details", { state: { userId: tenant.id } })
          }
        />
      );
    },
  },
  {
    accessorKey: "firstName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="First Name" />
    ),
  },
  {
    accessorKey: "lastName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Name" />
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },
  {
    accessorKey: "phoneNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phone Number" />
    ),
    cell: ({ row }) => {
      const phoneNumber = row.getValue("phoneNumber");
      return phoneNumber || "N/A";
    },
  },
  {
    accessorKey: "gender",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Gender" />
    ),
    cell: ({ row }) => {
      const gender = row.getValue("gender");
      return gender || "N/A";
    },
  },
  {
    accessorKey: "dateOfBirth",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date of Birth" />
    ),
    cell: ({ row }) => {
      const dateOfBirth = row.getValue("dateOfBirth");
      return dateOfBirth || "N/A";
    },
  },
];
