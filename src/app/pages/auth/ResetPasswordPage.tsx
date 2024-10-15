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
import { LoadingButton } from "@/components/common/button-loading";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { EyeOff, Eye } from "lucide-react";
import { ModeToggle } from "@/components/common/mode-toggle";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS, REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import {
  useResendCodeMutation,
  useResetPasswordMutation,
} from "@/app/services/mutations/auth.mutations";

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

  const resetPasswordMutation = useResetPasswordMutation();
  const resendCodeMutation = useResendCodeMutation();

  const handleResetPassword = () => {
    setError(null);

    if (otp.length < 6) {
      setError("Verification code is required.");
      return;
    }
    if (!newPassword) {
      setError("New password is required.");
      return;
    }

    resetPasswordMutation
      .mutateAsync({ email, verificationCode: otp, newPassword })
      .then((result) => {
        toast({
          description: result.message,
        });
        setTimeout(() => navigate("/auth/login"), 2000);
      })
      .catch((err) => {
        toast({
          variant: "destructive",
          description: err,
        });
      });
  };

  const handleResendCode = () => {
    const type = "password";

    resendCodeMutation
      .mutateAsync({ data: { email }, type })
      .then((result) =>
        toast({
          description: result.message,
        })
      )
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
              maxLength={6}
              pattern={REGEXP_ONLY_DIGITS}
              value={otp}
              onChange={setOtp}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
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
