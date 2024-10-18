import { TenantModel } from "@/app/models/user.models";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";

// tenantColumns.ts
export const tenantColumns: ColumnDef<TenantModel>[] = [
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
    cell: ({ row }) => {
      const phoneNumber = row.getValue("phoneNumber");
      return phoneNumber || "N/A";
    },
  },
  {
    accessorKey: "gender",
    header: "Gender",
    cell: ({ row }) => {
      const gender = row.getValue("gender");
      return gender || "N/A";
    },
  },
  {
    accessorKey: "dateOfBirth",
    header: "Date of Birth",
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
