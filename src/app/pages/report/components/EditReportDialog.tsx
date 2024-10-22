import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useProfileStore } from "@/hooks/use-store";
import { useUpdateReportMutation } from "@/app/services/mutations/report.mutations";
import {
  UserReportModel,
  UpdateUserReportModel,
} from "@/app/models/report.models";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface EditReportDialogProps {
  isOpen: boolean;
  onClose: () => void;
  report: UserReportModel;
  onSuccess?: () => void;
}

export const EditReportDialog = ({
  isOpen,
  onClose,
  report,
  onSuccess,
}: EditReportDialogProps) => {
  const [message, setMessage] = useState(report.message || "");
  const [comments, setComments] = useState(report.comments || "");
  const [attachment, setAttachment] = useState<File | null>(null);
  const [status, setStatus] = useState(report.status || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { profile } = useProfileStore();
  const isReporter = profile?.id === report.reporterId;
  const requestType = isReporter ? "sent" : "received";
  const mutation = useUpdateReportMutation(requestType);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      setMessage(report.message || "");
      setComments(report.comments || "");
      setStatus(report.status || "");
      setAttachment(null);
    }
  }, [isOpen, report]);

  const handleSubmit = () => {
    setIsSubmitting(true);

    const updateData: UpdateUserReportModel = {
      message: isReporter ? message : undefined,
      comments: !isReporter ? comments : undefined,
      status: !isReporter ? status : undefined,
      attachment: isReporter ? attachment : null,
    };
    console.log(updateData);
    mutation
      .mutateAsync({ id: report.id, data: updateData })
      .then((result) => {
        toast({
          description: result.message,
        });
        setIsSubmitting(false);
        onSuccess?.();
        onClose();
      })
      .catch((err) => {
        toast({
          variant: "destructive",
          description: err,
        });
        setIsSubmitting(false);
      });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Report</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {isReporter ? (
            <>
              <Textarea
                placeholder="Edit your message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <Input
                type="file"
                accept="image/*,application/pdf"
                onChange={(e) => setAttachment(e.target.files?.[0] ?? null)}
              />
            </>
          ) : (
            <>
              <div>
                <label className="block mb-2">Status</label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Status</SelectLabel>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="InProgress">In Progress</SelectItem>
                      <SelectItem value="Resolved">Resolved</SelectItem>
                      <SelectItem value="Closed">Closed</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <Textarea
                placeholder="Edit comments"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
              />
            </>
          )}
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
