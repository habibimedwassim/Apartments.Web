import { EllipsisVertical, Calendar as CalendarIcon } from "lucide-react";
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
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { ApartmentRequestModel } from "@/app/models/apartment-request.models";
import { useNavigate } from "react-router-dom";
import {
  useApproveRejectRequestMutation,
  useScheduleMeetingMutation,
} from "@/app/services/mutations/apartment-request.mutations";
import { useToast } from "@/hooks/use-toast";
import {
  REQUEST_ACTIONS,
  REQUEST_STATUSES,
  REQUEST_TYPES,
} from "@/app/constants/request";

interface RequestTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function RequestTableRowActions<TData>({
  row,
}: RequestTableRowActionsProps<TData>) {
  const [openActionDialog, setOpenActionDialog] = useState(false);
  const [actionType, setActionType] = useState<string | null>(null);
  const [meetingDate, setMeetingDate] = useState<Date | undefined>(new Date());
  const { toast } = useToast();

  const requestRow = row.original as ApartmentRequestModel;
  const requestId = requestRow.id;
  const requestType = requestRow.requestType.toLowerCase();
  const requestStatus = requestRow.status;
  const navigate = useNavigate();

  const mutation = useApproveRejectRequestMutation(requestType);
  const scheduleMeetingMutation = useScheduleMeetingMutation();

  const getAvailableActions = () => {
    switch (requestType) {
      case REQUEST_TYPES.Rent:
        if (requestStatus === REQUEST_STATUSES.Pending) {
          return [REQUEST_ACTIONS.Reject, REQUEST_ACTIONS.ScheduleMeeting];
        }
        if (requestStatus === REQUEST_STATUSES.MeetingScheduled) {
          return [REQUEST_ACTIONS.Approve, REQUEST_ACTIONS.Reject];
        }
        break;
      case REQUEST_TYPES.Leave:
        if (requestStatus === REQUEST_STATUSES.Pending) {
          return [REQUEST_ACTIONS.Approve, REQUEST_ACTIONS.Reject];
        }
        break;
      case REQUEST_TYPES.Payment:
        if (requestStatus === REQUEST_STATUSES.Pending) {
          return [REQUEST_ACTIONS.Accept, REQUEST_ACTIONS.Late];
        }
        break;
      default:
        return [];
    }
    return [];
  };

  const availableActions = getAvailableActions();

  const handleAction = (type: string) => {
    setActionType(type);
    setOpenActionDialog(true);
  };

  const confirmAction = () => {
    if (!actionType) return;

    if (actionType === REQUEST_ACTIONS.ScheduleMeeting && meetingDate) {
      const formattedDate = format(meetingDate, "yyyy-MM-dd");
      scheduleMeetingMutation
        .mutateAsync({
          id: requestId,
          meetingDate: formattedDate,
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
            title: error,
          });
        })
        .finally(() => {
          setOpenActionDialog(false);
          setActionType(null);
          setMeetingDate(new Date());
        });
      return;
    }

    mutation
      .mutateAsync({
        id: requestId,
        action: actionType,
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
          title: error,
        });
      })
      .finally(() => {
        setOpenActionDialog(false);
        setActionType(null);
      });
  };

  const handleViewTenant = () => {
    const tenantId = row.getValue("tenantId") as number;
    navigate("/tenants/details", { state: { tenantId: tenantId } });
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

          {availableActions.map((action) => (
            <DropdownMenuItem key={action} onClick={() => handleAction(action)}>
              {action}
            </DropdownMenuItem>
          ))}

          <DropdownMenuItem onClick={handleViewTenant}>
            View Tenant
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={openActionDialog} onOpenChange={setOpenActionDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{`Confirm ${actionType}`}</AlertDialogTitle>
            <AlertDialogDescription>
              {actionType === REQUEST_ACTIONS.ScheduleMeeting ? (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="availableFrom"
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !meetingDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {meetingDate ? format(meetingDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={meetingDate}
                      onSelect={setMeetingDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              ) : (
                <p>Are you sure you want to {actionType} this request?</p>
              )}
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
