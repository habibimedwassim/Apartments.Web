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
import {
  useChangeUserRoleMutation,
  useDisableUserMutation,
} from "@/app/services/mutations/user.mutations";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { UserModel } from "@/app/models/user.models";

interface UsersTableRowActionsProps<TData> {
  row: Row<TData>;
  pageType: "all" | "admins" | "owners" | "tenants";
}

export function UsersTableRowActions<TData>({
  row,
  pageType,
}: UsersTableRowActionsProps<TData>) {
  const [openDialog, setOpenDialog] = useState(false);
  const [actionType, setActionType] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<string>("Owner");
  const { toast } = useToast();
  const user = row.original as UserModel;
  const navigate = useNavigate();

  const changeRoleMutation = useChangeUserRoleMutation();
  const disableUserMutation = useDisableUserMutation();

  const handleAction = (type: string) => {
    setActionType(type);
    setOpenDialog(true);
  };

  const confirmAction = () => {
    if (actionType === "disable") {
      disableUserMutation.mutate(user.id, {
        onSuccess: (result) => {
          toast({ variant: "default", title: result.message });
        },
        onError: (error) => {
          toast({ variant: "destructive", title: error });
        },
      });
    } else if (actionType === "changeRole") {
      changeRoleMutation.mutate(
        { id: user.id, roleName: selectedRole },
        {
          onSuccess: (result) => {
            toast({ variant: "default", title: result.message });
          },
          onError: (error) => {
            toast({ variant: "destructive", title: error });
          },
        }
      );
    }
    setOpenDialog(false);
    setActionType(null);
  };

  const handleViewDetails = () => {
    switch (pageType) {
      case "owners":
        navigate("/admin/owners/details", { state: { userId: user.id } });
        break;
      case "tenants":
        navigate("/admin/tenants/details", { state: { userId: user.id } });
        break;
      case "admins":
        navigate("/admin/admins/details", { state: { userId: user.id } });
        break;
      default:
        navigate("/admin/users/details", { state: { userId: user.id } });
        break;
    }
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
          {["all", "admin"].includes(pageType) ? (
            <>
              <DropdownMenuItem onClick={() => handleAction("changeRole")}>
                Change Role
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </>
          ) : (
            <>
              <DropdownMenuItem onClick={handleViewDetails}>
                View Details
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </>
          )}
          <DropdownMenuItem onClick={() => handleAction("disable")}>
            Disable
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Confirmation Dialog */}
      <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Action</AlertDialogTitle>
            <AlertDialogDescription>
              {actionType === "disable"
                ? "Are you sure you want to disable this user?"
                : "Are you sure you want to change the user's role?"}
            </AlertDialogDescription>
          </AlertDialogHeader>
          {actionType === "changeRole" && (
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Owner">Owner</SelectItem>
                  <SelectItem value="Admin">Admin</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpenDialog(false)}>
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
