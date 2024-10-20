import { useState } from "react";
import { EllipsisVertical } from "lucide-react";
import { Row } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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
import { TransactionModel } from "@/app/models/transaction.models";
import { TRANSACTION_STATUS } from "@/app/constants/transaction";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useUpdateTransactionStatusMutation } from "@/app/services/mutations/transaction.mutations";

interface TransactionsTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function TransactionTableRowActions<TData>({
  row,
}: TransactionsTableRowActionsProps<TData>) {
  const [openActionDialog, setOpenActionDialog] = useState(false);
  const [actionType, setActionType] = useState<string | null>(null);
  const { toast } = useToast();

  const transaction = row.original as TransactionModel;
  const transactionId = transaction.id;
  const currentStatus = transaction.status;
  const navigate = useNavigate();

  const updateStatusMutation = useUpdateTransactionStatusMutation();

  const statusToActionMap: Record<string, string> = {
    [TRANSACTION_STATUS.Paid]: "accept",
    [TRANSACTION_STATUS.Late]: "late",
    [TRANSACTION_STATUS.Pending]: "reset",
  };

  const getAvailableActions = () => {
    switch (currentStatus) {
      case TRANSACTION_STATUS.Pending:
        return [TRANSACTION_STATUS.Paid, TRANSACTION_STATUS.Late];
      case TRANSACTION_STATUS.Paid:
        return [TRANSACTION_STATUS.Pending, TRANSACTION_STATUS.Late];
      case TRANSACTION_STATUS.Late:
        return [TRANSACTION_STATUS.Pending, TRANSACTION_STATUS.Paid];
      default:
        return [];
    }
  };

  const availableActions = getAvailableActions();

  const handleAction = (type: string) => {
    setActionType(type);
    setOpenActionDialog(true);
  };

  const confirmAction = () => {
    if (!actionType) return;

    const mappedAction = statusToActionMap[actionType];

    updateStatusMutation
      .mutateAsync({
        id: transactionId,
        action: mappedAction,
      })
      .then((result) => {
        toast({
          variant: "default",
          title: result.message,
        });
      })
      .catch((error) => {
        toast({
          variant: "destructive",
          title: error || "An error occurred",
        });
      })
      .finally(() => {
        setOpenActionDialog(false);
        setActionType(null);
      });
  };

  const handleViewTenant = () => {
    const tenantId = transaction.tenant as number;
    navigate("/tenants/details", { state: { tenantId: tenantId } });
  };

  const handleViewApartment = () => {
    const apartmentId = transaction.apartment.id as number;
    navigate("/apartments/details", { state: { apartmentId: apartmentId } });
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
          <DropdownMenuSeparator />

          {availableActions.map((action) => (
            <DropdownMenuItem key={action} onClick={() => handleAction(action)}>
              {`Mark as ${action}`}
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleViewTenant}>
            View Tenant
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleViewApartment}>
            View Apartment
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={openActionDialog} onOpenChange={setOpenActionDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Action</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to change the transaction status to{" "}
              {actionType}?
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
