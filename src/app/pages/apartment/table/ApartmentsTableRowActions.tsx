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
import { ApartmentStatus } from "@/app/models/apartment.models";
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
  const [deletePermanentlyDialog, setDeletePermanentlyDialog] = useState(false);

  const apartmentRow = row.original as ApartmentModel;
  const apartmentId = apartmentRow.id;
  const status = apartmentRow.status;

  const navigate = useNavigate();
  const deleteMutation = archiveApartmentService(
    apartmentId,
    status === ApartmentStatus.Archived
  );

  // Logic to handle delete/archive/restore
  const handleDelete = () => {
    deleteMutation.mutate();
  };

  // Logic to handle edit
  const handleEdit = (apartmentId: number) => {
    navigate("/apartments/edit", { state: { apartmentId } });
  };

  // Status-based logic
  const isAvailable = status === ApartmentStatus.Available;
  const isOccupied = status === ApartmentStatus.Occupied;
  const isArchived = status === ApartmentStatus.Archived;

  // Set labels and disable status based on apartment status
  const actionLabel = isArchived
    ? "Restore"
    : isAvailable
    ? "Archive"
    : "Delete";
  const canDelete = !isOccupied;

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

          {/* Edit option */}
          <DropdownMenuItem onClick={() => handleEdit(apartmentId)}>
            Edit
          </DropdownMenuItem>

          {/* Archive/Restore/Delete option */}
          <DropdownMenuItem
            disabled={!canDelete}
            onClick={() => setOpenDeleteDialog(true)}
          >
            {actionLabel}
          </DropdownMenuItem>

          {/* If apartment is archived, allow permanent deletion */}
          {isArchived && (
            <DropdownMenuItem
              onClick={() => {
                setDeletePermanentlyDialog(true);
              }}
            >
              Delete Permanently
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Archive/Restore Confirmation Dialog */}
      <AlertDialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{`Confirm ${actionLabel}`}</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to {actionLabel.toLowerCase()} this
              apartment?
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

      {/* Delete Permanently Confirmation Dialog */}
      <AlertDialog
        open={deletePermanentlyDialog}
        onOpenChange={setDeletePermanentlyDialog}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Permanently</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this apartment permanently? This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => setDeletePermanentlyDialog(false)}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                handleDelete();
                setDeletePermanentlyDialog(false);
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
