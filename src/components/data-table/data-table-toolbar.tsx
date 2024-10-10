import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options";

import { DataTableFacetedFilter } from "@/components/data-table/data-table-faceted-filter";
import { PlusCircle } from "lucide-react";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  newButtonLabel?: string;
  onNewButtonClick?: () => void;
  statuses?: {
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
}

export function DataTableToolbar<TData>({
  table,
  newButtonLabel,
  onNewButtonClick,
  statuses,
}: DataTableToolbarProps<TData>) {
  const isFiltered =
    table.getState().columnFilters.length > 0 ||
    !!table.getState().globalFilter;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          name="search"
          placeholder="Search across all columns..."
          value={table.getState().globalFilter ?? ""}
          onChange={(event) => table.setGlobalFilter(event.target.value)}
          className="h-8 w-[150px] lg:w-[250px]"
        />

        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses ?? []}
          />
        )}

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => {
              table.resetColumnFilters();
              table.setGlobalFilter("");
            }}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
      {newButtonLabel && onNewButtonClick && (
        <Button
          variant="outline"
          size="sm"
          className="h-8 gap-1 ml-2"
          onClick={onNewButtonClick}
        >
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            {newButtonLabel}
          </span>
        </Button>
      )}
    </div>
  );
}
