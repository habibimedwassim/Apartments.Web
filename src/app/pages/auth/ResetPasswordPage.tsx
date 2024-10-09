import { useEffect, useState } from "react";
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
import { resetPassword, resendVerificationCode } from "@/app/api/auth.api";
import { LoadingButton } from "@/components/ui/button-loading";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { EyeOff, Eye } from "lucide-react";
import { getErrorMessage } from "@/lib/utils";
import { EmailModel, ResetPasswordModel } from "@/app/models/auth.models";
import { ModeToggle } from "@/components/common/mode-toggle";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";

const ResetPasswordPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const email = location.state?.email || "";
  const { toast } = useToast();

  useEffect(() => {
    if (!email) {
      navigate("/auth/forgot-password");
    }
  }, [email, navigate]);

  const resetPasswordMutation = useMutation({
    mutationFn: (data: ResetPasswordModel) => resetPassword(data),
    onSuccess: () => {
      toast({
        title: "Password Reset Successful",
        description: "Your password has been reset successfully.",
      });
      setTimeout(() => navigate("/auth/login"), 2000);
    },
    onError: (error) => {
      const apiErrorMessage = getErrorMessage(error);
      toast({
        variant: "destructive",
        description: apiErrorMessage,
      });
    },
  });

  const resendCodeMutation = useMutation({
    mutationFn: (data: EmailModel) => resendVerificationCode(data),
    onSuccess: () => {
      toast({
        title: "Verification Code Sent",
        description: "A new verification code has been sent to your email.",
      });
    },
    onError: (error) => {
      const apiErrorMessage = getErrorMessage(error);
      toast({
        variant: "destructive",
        description: apiErrorMessage,
      });
    },
  });

  const handleResetPassword = () => {
    setError(null);

    if (otp.length < 4) {
      setError("Verification code is required.");
      return;
    }
    if (!newPassword) {
      setError("New password is required.");
      return;
    }

    resetPasswordMutation.mutate({ email, verificationCode: otp, newPassword });
  };

  const handleResendCode = () => {
    resendCodeMutation.mutate({ email });
  };

  return (
    <section className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl">Reset Password</CardTitle>
            <ModeToggle />
          </div>
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
            <InputOTP
              maxLength={4}
              pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
              value={otp}
              onChange={setOtp}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
              </InputOTPGroup>
            </InputOTP>
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
            isLoading={resetPasswordMutation.isPending}
          >
            Reset Password
          </LoadingButton>
          <LoadingButton
            onClick={handleResendCode}
            className="w-full"
            isLoading={resendCodeMutation.isPending}
            variant="outline"
          >
            Resend
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
