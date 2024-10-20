import { EllipsisVertical, Calendar as CalendarIcon } from "lucide-react";
import { Row } from "@tanstack/react-table";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LoadingButton } from "@/components/common/button-loading"; // Import the LoadingButton component
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
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
import {
  useArchiveApartmentMutation,
  useDeleteApartmentMutation,
  useDismissTenantMutation,
} from "@/app/services/mutations/apartment.mutations";
import { useToast } from "@/hooks/use-toast";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface ApartmentsTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function ApartmentsTableRowActions<TData>({
  row,
}: ApartmentsTableRowActionsProps<TData>) {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openPermanentDeleteDialog, setOpenPermanentDeleteDialog] =
    useState(false);
  const [openDismissDialog, setOpenDismissDialog] = useState(false);
  const [dismissReason, setDismissReason] = useState("");
  const [requestDate, setRequestDate] = useState<Date | undefined>(new Date());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [actionType, setActionType] = useState<string | null>(null);
  const { toast } = useToast();

  const apartmentRow = row.original as ApartmentModel;
  const apartmentId = apartmentRow.id;
  const status = apartmentRow.status;
  const navigate = useNavigate();

  const archiveMutation = useArchiveApartmentMutation(apartmentId);
  const deleteMutation = useDeleteApartmentMutation(apartmentId);
  const dismissTenantMutation = useDismissTenantMutation();

  // Determine available actions based on the apartment's status
  const getAvailableActions = () => {
    switch (status) {
      case ApartmentStatus.Available:
        return ["Details", "Edit", "Archive"];
      case ApartmentStatus.Occupied:
        return ["Details", "Edit", "Dismiss Tenant"];
      case ApartmentStatus.Archived:
        return ["Details", "Restore", "Delete Permanently"];
      default:
        return [];
    }
  };

  const availableActions = getAvailableActions();

  const handleAction = (type: string) => {
    setActionType(type);
    if (type === "Delete Permanently") {
      setOpenPermanentDeleteDialog(true);
    } else if (type === "Archive" || type === "Restore") {
      setOpenDeleteDialog(true);
    } else if (type === "Dismiss Tenant") {
      setOpenDismissDialog(true);
    }
  };

  const handleDelete = (permanent: boolean) => {
    setIsSubmitting(true);
    const mutation = permanent ? deleteMutation : archiveMutation;
    mutation
      .mutateAsync()
      .then((result) => {
        toast({
          variant: "default",
          title: result.message,
        });
        setOpenDeleteDialog(false);
        setOpenPermanentDeleteDialog(false);
      })
      .catch((error) => {
        toast({
          variant: "destructive",
          description: error.message,
        });
      })
      .finally(() => {
        setIsSubmitting(false);
        setActionType(null);
      });
  };

  const confirmDismiss = () => {
    if (!requestDate || !dismissReason) {
      toast({
        variant: "destructive",
        title: "Please provide a reason and date",
      });
      return;
    }

    setIsSubmitting(true);
    const formattedDate = format(requestDate, "yyyy-MM-dd");
    dismissTenantMutation
      .mutateAsync({
        id: apartmentId,
        data: {
          reason: dismissReason,
          requestDate: formattedDate,
        },
      })
      .then((result) => {
        toast({
          variant: "default",
          title: result.message,
        });
        setOpenDismissDialog(false); // Close the dialog after success
      })
      .catch((error) => {
        toast({
          variant: "destructive",
          title: error.message,
        });
      })
      .finally(() => {
        setIsSubmitting(false);
        setDismissReason("");
        setRequestDate(new Date());
      });
  };

  const handleDetails = () => {
    navigate("/apartments/details", { state: { apartmentId } });
  };

  const handleEdit = () => {
    navigate("/apartments/edit", { state: { apartmentId } });
  };

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

          {availableActions.includes("Details") && (
            <DropdownMenuItem onClick={handleDetails}>Details</DropdownMenuItem>
          )}
          {availableActions.includes("Edit") && (
            <DropdownMenuItem onClick={handleEdit}>Edit</DropdownMenuItem>
          )}
          {availableActions.includes("Archive") && (
            <DropdownMenuItem onClick={() => handleAction("Archive")}>
              Archive
            </DropdownMenuItem>
          )}
          {availableActions.includes("Restore") && (
            <DropdownMenuItem onClick={() => handleAction("Restore")}>
              Restore
            </DropdownMenuItem>
          )}
          {availableActions.includes("Delete Permanently") && (
            <DropdownMenuItem
              onClick={() => handleAction("Delete Permanently")}
            >
              Delete Permanently
            </DropdownMenuItem>
          )}
          {availableActions.includes("Dismiss Tenant") && (
            <DropdownMenuItem onClick={() => handleAction("Dismiss Tenant")}>
              Dismiss Tenant
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Dismiss Tenant Confirmation Dialog */}
      <AlertDialog open={openDismissDialog} onOpenChange={setOpenDismissDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Dismiss Tenant</AlertDialogTitle>
            <AlertDialogDescription>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Enter reason for dismissal"
                  value={dismissReason}
                  onChange={(e) => setDismissReason(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                />
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !requestDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {requestDate ? format(requestDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={requestDate}
                      onSelect={setRequestDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpenDismissDialog(false)}>
              Cancel
            </AlertDialogCancel>
            <LoadingButton
              isLoading={isSubmitting}
              onClick={confirmDismiss}
              loadingText="Dismissing..."
              disabled={isSubmitting}
            >
              Confirm
            </LoadingButton>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Archive/Restore Confirmation Dialog */}
      <AlertDialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{`Confirm ${actionType}`}</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to {actionType?.toLowerCase()} this
              apartment?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpenDeleteDialog(false)}>
              Cancel
            </AlertDialogCancel>
            <LoadingButton
              isLoading={isSubmitting}
              onClick={() => handleDelete(false)}
              loadingText="Processing..."
              disabled={isSubmitting}
            >
              Confirm
            </LoadingButton>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Permanently Confirmation Dialog */}
      <AlertDialog
        open={openPermanentDeleteDialog}
        onOpenChange={setOpenPermanentDeleteDialog}
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
              onClick={() => setOpenPermanentDeleteDialog(false)}
            >
              Cancel
            </AlertDialogCancel>
            <LoadingButton
              isLoading={isSubmitting}
              onClick={() => handleDelete(true)}
              loadingText="Deleting..."
              disabled={isSubmitting}
            >
              Confirm
            </LoadingButton>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
