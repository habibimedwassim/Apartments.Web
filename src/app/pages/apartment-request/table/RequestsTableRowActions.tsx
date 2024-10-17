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
import { ApartmentRequestModel } from "@/app/models/apartment-request.models";
import { useNavigate } from "react-router-dom";
import { useApproveRejectRequestMutation } from "@/app/services/mutations/apartment-request.mutations";
import { useToast } from "@/hooks/use-toast";
import { REQUEST_ACTIONS } from "@/app/constants/request";

interface RequestTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function RequestTableRowActions<TData>({
  row,
}: RequestTableRowActionsProps<TData>) {
  const [openActionDialog, setOpenActionDialog] = useState(false);
  const [actionType, setActionType] = useState("");
  const { toast } = useToast();

  const requestRow = row.original as ApartmentRequestModel;
  const requestId = requestRow.id;
  const navigate = useNavigate();
  const mutation = useApproveRejectRequestMutation();

  // Logic to handle actions like Approve, Reject, etc.
  const handleAction = (type: string) => {
    setActionType(type);
    setOpenActionDialog(true);
  };

  const confirmAction = () => {
    if (actionType === REQUEST_ACTIONS.Approve) {
      mutation
        .mutateAsync({
          id: requestId,
          action: REQUEST_ACTIONS.Approve,
        })
        .then((result) => {
          toast({
            variant: "default",
            title: result.message,
          });
        });
    } else if (actionType === REQUEST_ACTIONS.Reject) {
      mutation
        .mutateAsync({ id: requestId, action: REQUEST_ACTIONS.Reject })
        .then((result) => {
          toast({
            variant: "default",
            title: result.message,
          });
        });
    }
    setOpenActionDialog(false);
  };

  // Navigate to view tenant details
  const handleViewTenant = (requestId: number) => {
    navigate(`/requests/tenant/${requestId}`); // Assuming you have a route for tenant details
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

          <DropdownMenuItem
            onClick={() => handleAction(REQUEST_ACTIONS.Approve)}
          >
            Approve
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleAction(REQUEST_ACTIONS.Reject)}
          >
            Reject
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleViewTenant(requestId)}>
            View Tenant
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Confirmation Dialog */}
      <AlertDialog open={openActionDialog} onOpenChange={setOpenActionDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{`Confirm ${actionType}`}</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to {actionType} this request?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpenActionDialog(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={confirmAction}>
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
