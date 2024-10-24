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
import { TransactionTableRowActions } from "./TransactionTableRowActions";
import { ChevronDownCircle } from "lucide-react";
import UserButton from "@/components/common/button-user";

export const transactionColumns = (
  isTenantDetailsPage = false
): ColumnDef<TransactionModel>[] => {
  const columns: ColumnDef<TransactionModel>[] = [
    {
      accessorKey: "tenant",
      header: "Tenant",
      cell: ({ row }) => {
        const transaction = row.original as TransactionModel;
        const tenantId = transaction.tenant as number;

        const navigate = useNavigate();

        return (
          <UserButton
            avatar={transaction.avatar}
            onClick={() =>
              navigate("/tenants/details", { state: { userId: tenantId } })
            }
          />
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
        return dateFrom ? dateFrom : "N/A";
      },
    },
    {
      accessorKey: "dateTo",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Date To" />
      ),
      cell: ({ row }) => {
        const dateTo = row.getValue("dateTo") as string;
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
  ];
  if (!isTenantDetailsPage) {
    columns.push({
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => {
        return <TransactionTableRowActions row={row} />;
      },
    });
  } else {
    columns.push({
      accessorKey: "apartment",
      header: "Apartment",
      cell: ({ row }) => {
        const apartment = row.original.apartment;
        return (
          <Popover>
            <PopoverTrigger asChild>
              <Button size="sm">
                <ChevronDownCircle className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <ApartmentPreviewCard apartment={apartment} />
            </PopoverContent>
          </Popover>
        );
      },
    });

    columns.shift();
  }

  return columns;
};
