import { ApartmentRequestModel } from "@/app/models/apartment-request.models";
import { ColumnDef } from "@tanstack/react-table";
import { formatToLocalDateTime } from "@/lib/utils";
import { RequestTableRowActions } from "./RequestsTableRowActions";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { useNavigate } from "react-router-dom";
import UserButton from "@/components/common/button-user";

export const createRequestColumns = (
  statuses: {
    value: string;
    label: string;
    icon?: React.ComponentType<any>;
    color?: string;
  }[],
  hideReason: boolean = false
): ColumnDef<ApartmentRequestModel>[] => {
  const columns: ColumnDef<ApartmentRequestModel>[] = [
    {
      accessorKey: "tenant",
      header: "Tenant",
      cell: ({ row }) => {
        const tenant = row.original;
        const navigate = useNavigate();
        const tenantId = tenant.tenantId as number;

        return (
          <UserButton
            avatar={tenant?.avatar}
            onClick={() =>
              navigate("/tenants/details", { state: { userId: tenantId } })
            }
          />
        );
      },
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => {
        const statusValue = row.getValue("status") as string;
        const status = statuses.find((s) => s.value === statusValue);

        if (!status) return <span>Unknown</span>;

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
        return requestDate ? requestDate : "--";
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

  if (hideReason == false) {
    columns.splice(2, 0, {
      accessorKey: "reason",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Reason" />
      ),
      cell: ({ row }) => {
        const reason = row.getValue("reason") as string | null;
        return reason && reason.trim() !== "" ? reason : "--";
      },
    });
  }

  return columns;
};
