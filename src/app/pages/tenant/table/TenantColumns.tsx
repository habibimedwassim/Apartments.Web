import { TenantModel } from "@/app/models/user.models";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";

// tenantColumns.ts
export const tenantColumns: ColumnDef<TenantModel>[] = [
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
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const tenant = row.original;
      const navigate = useNavigate();

      return (
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            navigate("/tenants/details", { state: { tenantId: tenant.id } })
          }
        >
          View Details
        </Button>
      );
    },
  },
];
