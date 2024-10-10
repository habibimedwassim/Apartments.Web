import { ColumnDef } from "@tanstack/react-table";
import {
  ApartmentModel,
  ApartmentPhotoModel,
} from "@/app/models/apartment.models";
import { formatToLocalDateTime } from "@/lib/utils";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { apartmentStatuses } from "./ApartmentStatuses";
import { ApartmentsTableRowActions } from "@/app/pages/apartment/table/ApartmentsTableRowActions";

export const apartmentColumns: ColumnDef<ApartmentModel>[] = [
  {
    accessorKey: "apartmentPhotos",
    header: "Cover",
    cell: ({ row }) => {
      const photos = row.getValue("apartmentPhotos") as ApartmentPhotoModel[];

      return (
        <img
          alt="Apartment img"
          className="aspect-square rounded-md object-cover"
          height="64"
          src={photos.length > 0 ? photos[0].url : "/no-img.svg"}
          width="64"
          onError={(e) => {
            e.currentTarget.src = "/no-img.svg";
          }}
        />
      );
    },
    enableHiding: true,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
  },
  {
    accessorKey: "size",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Size" />
    ),
    cell: ({ row }) => {
      const rentAmount = parseInt(row.getValue("size"));
      return `S+${rentAmount}`;
    },
  },
  {
    accessorKey: "city",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="City" />
    ),
  },
  {
    accessorKey: "postalCode",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Postal Code" />
    ),
  },
  {
    accessorKey: "street",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Street" />
    ),
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
      const status = apartmentStatuses.find(
        (status) => status.value === row.getValue("status")
      );

      if (!status) {
        return null;
      }

      return (
        <div className="flex w-[100px] items-center">
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
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "availableFrom",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Available From" />
    ),
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
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return <ApartmentsTableRowActions row={row} />;
    },
  },
];
