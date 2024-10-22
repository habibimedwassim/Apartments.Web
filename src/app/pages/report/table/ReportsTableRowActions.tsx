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
import { useState } from "react";
import { UserReportModel } from "@/app/models/report.models";
import { EditReportDialog } from "../components/EditReportDialog";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ReportsTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function ReportsTableRowActions<TData>({
  row,
}: ReportsTableRowActionsProps<TData>) {
  const reportRow = row.original as UserReportModel;
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  const handleEditReport = () => {
    setIsEditDialogOpen(true);
  };

  const handleViewReport = () => {
    setIsViewDialogOpen(true);
  };

  const handleSuccess = () => {
    setIsEditDialogOpen(false);
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
          <DropdownMenuItem onClick={handleViewReport}>View</DropdownMenuItem>
          <DropdownMenuItem onClick={handleEditReport}>Edit</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* View Report Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Report Details</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 max-h-[80vh] overflow-auto">
            <div>
              <strong>Created Date:</strong>{" "}
              {new Date(reportRow.createdDate).toLocaleDateString()}
            </div>
            <div>
              <strong>Status:</strong> {reportRow.status}
            </div>
            <div
              className="mt-2 max-w-lg break-words whitespace-pre-wrap overflow-hidden"
              style={{ wordWrap: "break-word" }}
            >
              <strong>Message:</strong> {reportRow.message}
            </div>
            {reportRow.attachmentUrl && (
              <div>
                <strong>Attachment:</strong>{" "}
                <a
                  href={reportRow.attachmentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  View Attachment
                </a>
              </div>
            )}
            {reportRow.comments && (
              <div
                className="mt-2 max-w-lg break-words whitespace-pre-wrap overflow-hidden"
                style={{ wordWrap: "break-word" }}
              >
                <strong>Comments:</strong> {reportRow.comments}
              </div>
            )}
          </div>
          <DialogFooter className="mt-4">
            <Button onClick={() => setIsViewDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Report Dialog */}
      <EditReportDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        report={reportRow}
        onSuccess={handleSuccess}
      />
    </>
  );
}
