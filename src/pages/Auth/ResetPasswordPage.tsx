import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
import { resetPassword } from "@/http/api"; // Import the API call
import { LoadingButton } from "@/components/ui/button-loading";

const ResetPasswordPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const email = location.state?.email || ""; // Get the email passed from the previous page

  const mutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      navigate("/auth/login"); // Redirect to login page after successful password reset
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

  const handleResetPassword = () => {
    setError(null);
    if (!verificationCode) {
      setError("Verification code is required.");
      return;
    }
    if (!newPassword) {
      setError("New password is required.");
      return;
    }

    mutation.mutate({ email, verificationCode, newPassword });
  };

  return (
    <section className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Reset Password</CardTitle>
          <CardDescription>
            Enter the verification code and your new password.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              disabled // Disable the email input
              readOnly
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="verificationCode">Verification Code</Label>
            <Input
              id="verificationCode"
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          {error && <span className="text-red-500 text-sm">{error}</span>}
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <LoadingButton
            onClick={handleResetPassword}
            className="w-full"
            isLoading={mutation.isPending}
          >
            Reset Password
          </LoadingButton>
        </CardFooter>
      </Card>
    </section>
  );
};

export default ResetPasswordPage;
