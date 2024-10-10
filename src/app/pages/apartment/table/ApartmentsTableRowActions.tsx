import { EllipsisVertical } from "lucide-react";
import { Row } from "@tanstack/react-table";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { APARTMENT_STATUS } from "@/app/constants/status";
import { useNavigate } from "react-router-dom";
import { ApartmentModel } from "@/app/models/apartment.models";
import { archiveApartmentService } from "@/app/services/apartment.services";

interface ApartmentsTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function ApartmentsTableRowActions<TData>({
  row,
}: ApartmentsTableRowActionsProps<TData>) {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const apartmentRow = row.original as ApartmentModel;

  const apartmentId = apartmentRow.id;
  const status = apartmentRow.status;
  const isRestore = status === APARTMENT_STATUS.Archived;

  const navigate = useNavigate();
  const deleteMutation = archiveApartmentService(apartmentId, isRestore);

  const handleDelete = () => {
    if (status === APARTMENT_STATUS.Occupied) return;
    deleteMutation.mutate();
  };

  const handleEdit = (apartmentId: number) => {
    navigate("/apartments/edit", { state: { apartmentId } });
  };

  const isOccupied = status === APARTMENT_STATUS.Occupied;
  const isArchived = status === APARTMENT_STATUS.Archived;

  const canDelete = !isOccupied;
  const label = isArchived ? "Restore" : "Delete";
  const disable = !canDelete;

  return (
    <>
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
          <DropdownMenuItem onClick={() => handleEdit(apartmentId)}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={disable}
            onClick={() => setOpenDeleteDialog(true)}
          >
            {label}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm {label}</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to {label.toLowerCase()} this record?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpenDeleteDialog(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                handleDelete();
                setOpenDeleteDialog(false);
              }}
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
