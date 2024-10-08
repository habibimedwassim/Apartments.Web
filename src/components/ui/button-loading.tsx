import { Button, ButtonProps } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";

interface LoadingButtonProps extends ButtonProps {
  isLoading: boolean;
  children: React.ReactNode;
}

export const LoadingButton = ({
  isLoading,
  children,
  ...props
}: LoadingButtonProps) => {
  return (
    <Button {...props} disabled={isLoading || props.disabled}>
      {isLoading && <LoaderCircle className="animate-spin" />}
      <span className="ml-2">{children}</span>
    </Button>
  );
};
