import { Button, ButtonProps } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import React from "react";

interface LoadingButtonProps extends ButtonProps {
  isLoading: boolean;
  children: React.ReactNode;
  icon?: React.ReactNode;
  loadingText?: string;
}

export const LoadingButton = ({
  isLoading,
  children,
  icon,
  loadingText = "Loading...",
  ...props
}: LoadingButtonProps) => {
  return (
    <Button {...props} disabled={isLoading || props.disabled}>
      {isLoading ? (
        <>
          <LoaderCircle className="animate-spin" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            {loadingText}
          </span>
        </>
      ) : (
        <>
          {icon && <span>{icon}</span>}
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            {children}
          </span>
        </>
      )}
    </Button>
  );
};
