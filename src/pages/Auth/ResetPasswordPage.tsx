import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
import { resetPassword } from "@/http/api";
import { LoadingButton } from "@/components/ui/button-loading";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { EyeOff, Eye } from "lucide-react";

const ResetPasswordPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const email = location.state?.email || "";
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      toast({
        title: "Password Reset Successful",
        description: "Your password has been reset successfully.",
      });

      // Redirect to login page after a short delay
      setTimeout(() => navigate("/auth/login"), 2000);
    },
    onError: (error: any) => {
      let apiErrorMessage = "Something went wrong";

      apiErrorMessage =
        error.response?.data?.message ||
        error.response?.data?.Message ||
        apiErrorMessage;

      toast({
        variant: "destructive",
        description: apiErrorMessage,
      });
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
            <Input id="email" type="email" value={email} disabled readOnly />
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

          <div className="grid gap-2 relative">
            <Label htmlFor="newPassword">New Password</Label>
            <div className="relative">
              <Input
                id="newPassword"
                type={showPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="pr-10"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
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

export default ResetPasswordPage;
