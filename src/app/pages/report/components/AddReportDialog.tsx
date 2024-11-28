import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCreateReportMutation } from "@/app/services/mutations/report.mutations";
import { CreateUserReportModel } from "@/app/models/report.models";

interface AddReportDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const AddReportDialog = ({
  isOpen,
  onClose,
  onSuccess,
}: AddReportDialogProps) => {
  const [message, setMessage] = useState("");
  const [attachment, setAttachment] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const mutation = useCreateReportMutation();

  const handleSubmit = () => {
    if (!message.trim()) {
      alert("Message is required");
      return;
    }

    setIsSubmitting(true);
    const reportData: CreateUserReportModel = {
      message,
      targetRole: "Admin",
      apartmentId: null,
      attachment,
    };

    mutation.mutate(reportData, {
      onSuccess: () => {
        setMessage("");
        setAttachment(null);
        setIsSubmitting(false);
        onSuccess && onSuccess();
        onClose(); // Close the dialog on success
      },
      onError: () => {
        setIsSubmitting(false);
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Report</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            placeholder="Enter your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
          <Input
            type="file"
            accept="image/*,application/pdf"
            onChange={(e) => setAttachment(e.target.files?.[0] ?? null)}
          />
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
