import { EllipsisVertical } from "lucide-react";
import { Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DataTableRowActionsProps<TData extends { id: number }> {
  row: Row<TData>;
}

export function DataTableRowActions<TData extends { id: number }>({
  row,
}: DataTableRowActionsProps<TData>) {
  const apartmentModel = row.original;
  const id = apartmentModel.id;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <EllipsisVertical className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => console.log(`Edit ${id}`)}>
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => console.log(`Delete ${id}`)}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
