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
import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "@/http/api"; // Import the API call
import { LoadingButton } from "@/components/ui/button-loading";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Validation regular expressions
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const mutation = useMutation({
    mutationFn: forgotPassword,
    onSuccess: () => {
      navigate("/auth/reset-password", { state: { email } }); // Pass email to reset password page
    },
    onError: (error: any) => {
      let apiErrorMessage = "Something went wrong";

      apiErrorMessage =
        error.response?.data?.message ||
        error.response?.data?.Message ||
        apiErrorMessage;

      setError(apiErrorMessage);
    },
  });

  const handleForgotPassword = () => {
    setError(null);
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    mutation.mutate({ email });
  };

  return (
    <section className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Forgot Password</CardTitle>
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
            isLoading={mutation.isPending}
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
