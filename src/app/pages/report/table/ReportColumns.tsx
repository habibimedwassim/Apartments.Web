import { ColumnDef } from "@tanstack/react-table";
import { UserReportModel } from "@/app/models/report.models";
import { formatToLocalDateTime } from "@/lib/utils";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { reportStatuses } from "@/app/pages/report/table/ReportStatuses";
import { ReportsTableRowActions } from "./ReportsTableRowActions";
import { useNavigate } from "react-router-dom";
import UserButton from "@/components/common/button-user";

// Function to return the columns with dynamic configuration
export const reportColumns = (
  isSentReportsPage = true
): ColumnDef<UserReportModel>[] => {
  const columns: ColumnDef<UserReportModel>[] = [
    {
      accessorKey: "message",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Message" />
      ),
      cell: ({ row }) => {
        const message = row.getValue("message") as string;
        return <div className="truncate max-w-sm">{message}</div>;
      },
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => {
        const status = reportStatuses.find(
          (status) => status.value === row.getValue("status")
        );

        if (!status) {
          return null;
        }

        const Icon = status.icon;

        return (
          <div className="flex items-center">
            <Icon className="mr-2 h-4 w-4" color={status.color} />
            <span>{status.label}</span>
          </div>
        );
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },

    {
      accessorKey: "resolvedDate",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Resolved Date" />
      ),
      cell: ({ row }) => {
        const resolvedDate = row.getValue("resolvedDate") as string | null;
        return resolvedDate ? formatToLocalDateTime(resolvedDate) : "--";
      },
      enableSorting: true,
    },
    {
      accessorKey: "comments",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Comments" />
      ),
      cell: ({ row }) => {
        const comments = row.getValue("comments") as string | null;
        return comments ? comments : "--";
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
      enableSorting: true,
    },
  ];

  // Conditionally add the "Reporter" column if it's a received reports page
  if (!isSentReportsPage) {
    columns.unshift({
      accessorKey: "reporterId",
      header: "Reporter",
      cell: ({ row }) => {
        const report = row.original as UserReportModel;
        const reporterId = report.reporterId as number;

        const navigate = useNavigate();

        return (
          <UserButton
            avatar={report.reporterAvatar}
            onClick={() =>
              navigate("/tenants/details", { state: { tenantId: reporterId } })
            }
          />
        );
      },
    });
  }

  // Add the "Actions" column at the end for all pages
  columns.push({
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return <ReportsTableRowActions row={row} />;
    },
  });

  return columns;
};
