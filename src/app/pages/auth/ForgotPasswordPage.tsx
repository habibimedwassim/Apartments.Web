import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoadingButton } from "@/components/ui/button-loading";
import { useToast } from "@/hooks/use-toast";
import { isValidEmail, getInfoMessage } from "@/lib/utils";
import { ModeToggle } from "@/components/common/mode-toggle";
import { useForgotPasswordMutation } from "@/app/services/mutations/auth.mutations";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const forgotPasswordMutation = useForgotPasswordMutation();
  const handleForgotPassword = () => {
    setError(null);
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    forgotPasswordMutation
      .mutateAsync({ email })
      .then((message) => {
        const infoMessage = getInfoMessage(message);
        toast({
          title: "Email Sent",
          description: infoMessage,
        });
        navigate("/auth/reset-password", { state: { email } });
      })
      .catch((err) => {
        toast({
          variant: "destructive",
          description: err,
        });
      });
  };

  return (
    <section className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl">Forgot Password</CardTitle>
            <ModeToggle />
          </div>
          <CardDescription>
            Enter your email to receive a password reset code.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {error && <span className="text-red-500 text-sm">{error}</span>}
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <LoadingButton
            onClick={handleForgotPassword}
            className="w-full"
            isLoading={forgotPasswordMutation.isPending}
          >
            Send Reset Code
          </LoadingButton>
          <Button variant="link">
            <Link
              to="/auth/login"
              className="text-sm text-blue-500 hover:underline"
            >
              Back to Login
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
};

export default ForgotPasswordPage;
