import { TransactionModel } from "@/app/models/transaction.models";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";
import { transactionStatuses } from "./TransactionStatuses";
import { formatToLocalDateTime } from "@/lib/utils";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { ApartmentPreviewCard } from "../components/ApartmentPreviewCard";

// Function to render the apartment preview card

export const transactionColumns = (
  isTenantDetailsPage = false
): ColumnDef<TransactionModel>[] => [
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
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
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
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date From" />
    ),
    cell: ({ row }) => {
      const dateFrom = row.getValue("dateFrom") as string;
      return dateFrom ? formatToLocalDateTime(dateFrom) : "N/A";
    },
  },
  {
    accessorKey: "dateTo",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date To" />
    ),
    cell: ({ row }) => {
      const dateTo = row.getValue("dateTo") as string;
      if (dateTo && !dateTo.startsWith("--")) {
        return formatToLocalDateTime(dateTo);
      }
      return dateTo;
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
    accessorKey: "apartment",
    header: "Apartment",
    cell: ({ row }) => {
      const apartment = row.original.apartment;
      const apartmentId = apartment?.id;
      const navigate = useNavigate();

      // If on the tenant details page, show a popover with apartment preview
      if (isTenantDetailsPage) {
        return (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm">
                Details
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <ApartmentPreviewCard apartment={apartment} />
            </PopoverContent>
          </Popover>
        );
      }

      // On the transactions page, navigate to the apartment details page
      return (
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            navigate("/apartments/details", { state: { apartmentId } })
          }
          disabled={!apartmentId}
        >
          View Apartment
        </Button>
      );
    },
  },
];
