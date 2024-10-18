import { TransactionRequestModel } from "@/app/models/transaction.models";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";
import { transactionStatuses } from "./TransactionStatuses";
import { formatToLocalDateTime } from "@/lib/utils";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";

export const transactionColumns: ColumnDef<TransactionRequestModel>[] = [
  {
    accessorKey: "id",
    header: "id",
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
    accessorKey: "rentAmount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Rent Amount" />
    ),
    cell: ({ row }) => {
      const rentAmount = parseFloat(row.getValue("rentAmount"));
      return `${rentAmount.toFixed(2)} TND`;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = transactionStatuses.find(
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
    accessorKey: "dateFrom",
    header: "Date From",
    cell: ({ row }) => {
      const dateFrom = row.getValue("dateFrom") as string;
      return dateFrom ? formatToLocalDateTime(dateFrom) : "N/A";
    },
  },
  {
    accessorKey: "dateTo",
    header: "Date To",
    cell: ({ row }) => {
      const dateTo = row.getValue("dateTo") as string;
      return dateTo ? formatToLocalDateTime(dateTo) : "N/A";
    },
  },

  {
    accessorKey: "createdDate",
    header: "Created Date",
    cell: ({ row }) => {
      const createdDate = row.getValue("createdDate") as string;
      return formatToLocalDateTime(createdDate);
    },
  },
];
