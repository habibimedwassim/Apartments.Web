import { ColumnDef } from "@tanstack/react-table";
import { ChangeLog } from "@/app/models/changelog.models";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";

export const changeLogColumns: ColumnDef<ChangeLog>[] = [
  {
    accessorKey: "entityType",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Entity Type" />
    ),
    cell: ({ row }) => {
      const entityType = row.getValue("entityType") as string;
      return <div className="truncate max-w-sm">{entityType}</div>;
    },
  },
  {
    accessorKey: "propertyName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Property Name" />
    ),
    cell: ({ row }) => {
      const propertyName = row.getValue("propertyName") as string;
      return <div className="truncate max-w-sm">{propertyName}</div>;
    },
  },
  {
    accessorKey: "propertyId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Property ID" />
    ),
    cell: ({ row }) => {
      const propertyId = row.getValue("propertyId") as string;
      return <div className="truncate max-w-sm">{propertyId}</div>;
    },
  },
  {
    accessorKey: "oldValue",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Old Value" />
    ),
    cell: ({ row }) => {
      const oldValue = row.getValue("oldValue") as string | null;
      return oldValue ? oldValue : "--";
    },
  },
  {
    accessorKey: "newValue",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="New Value" />
    ),
    cell: ({ row }) => {
      const newValue = row.getValue("newValue") as string | null;
      return newValue ? newValue : "--";
    },
  },
  {
    accessorKey: "changedAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Changed At" />
    ),
    cell: ({ row }) => {
      const changedAt = row.getValue("changedAt") as string;
      return new Date(changedAt).toLocaleDateString();
    },
    enableSorting: true,
  },
  {
    accessorKey: "changedBy",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Changed By" />
    ),
    cell: ({ row }) => {
      const changedBy = row.getValue("changedBy") as string;
      return <div className="truncate max-w-sm">{changedBy}</div>;
    },
  },
];
