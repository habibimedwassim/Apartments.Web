import { ApartmentRequestModel } from "@/app/models/apartment-request.models";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";
import { requestStatuses } from "./RequestStatuses";
import { formatToLocalDateTime } from "@/lib/utils";
import { RequestTableRowActions } from "./RequestsTableRowActions";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";

export const requestColumns: ColumnDef<ApartmentRequestModel>[] = [
  {
    accessorKey: "tenantId",
    header: "Tenant",
    cell: ({ row }) => {
      const tenantId = row.getValue("tenantId") as number;
      const navigate = useNavigate();

      return (
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            navigate("/tenants/details", { state: { tenantId: tenantId } })
          }
        >
          View Tenant
        </Button>
      );
    },
  },
  {
    accessorKey: "apartmentId",
    header: "Apartment",
    cell: ({ row }) => {
      const apartmentId = row.getValue("apartmentId") as number;
      const navigate = useNavigate();

      return (
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            navigate("/apartments/details", { state: { apartmentId } })
          }
        >
          View Apartment
        </Button>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = requestStatuses.find(
        (status) => status.value === row.getValue("status")
      );

      if (!status) return null;

      return (
        <div className="flex items-center">
          {status.icon && (
            <status.icon
              className="mr-2 h-4 w-4 text-muted-foreground"
              color={status.color}
            />
          )}
          <span>{status.label}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "requestDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Request Date" />
    ),
    cell: ({ row }) => {
      const requestDate = row.getValue("requestDate") as string;
      return requestDate ? formatToLocalDateTime(requestDate) : "N/A";
    },
  },
  {
    accessorKey: "reason",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Reason" />
    ),
    cell: ({ row }) => {
      const reason = row.getValue("reason") as string | null;
      return reason && reason.trim() !== "" ? reason : "--";
    },
  },
  {
    accessorKey: "createdDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created Date" />
    ),
    cell: ({ row }) => {
      const createdDate = row.getValue("createdDate") as string;
      return formatToLocalDateTime(createdDate);
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return <RequestTableRowActions row={row} />;
    },
  },
];
