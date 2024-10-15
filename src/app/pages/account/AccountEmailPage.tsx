import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoadingButton } from "@/components/common/button-loading";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  useUpdateEmailMutation,
  useVerifyNewEmailMutation,
} from "@/app/services/mutations/user.mutations";
import { useResendCodeMutation } from "@/app/services/mutations/auth.mutations";
import { useProfileStore } from "@/hooks/use-store";
import { useLogout } from "@/hooks/use-logout";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { VerifyNewEmailModel } from "@/app/models/user.models";
import { verificationSchema } from "@/app/schemas/user.schemas";

type VerifyEmailFormValues = z.infer<typeof verificationSchema>;

export const AccountEmailPage = () => {
  const { toast } = useToast();
  const { handleLogout } = useLogout();
  const { profile, setProfile } = useProfileStore();
  const [newEmail, setNewEmail] = useState("");
  const [isVerifyLoading, setIsVerifyLoading] = useState(false); // Loading state for confirm button

  const updateEmailMutation = useUpdateEmailMutation();
  const resendCodeMutation = useResendCodeMutation();
  const verifyEmailMutation = useVerifyNewEmailMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyEmailFormValues>({
    resolver: zodResolver(verificationSchema),
  });

  const updateTempEmail = (newEmail: string) => {
    setProfile({
      ...profile,
      tempEmail: newEmail,
    });
  };

  // Handle email change
  const handleEmailChange = () => {
    const data = { email: newEmail };
    updateEmailMutation
      .mutateAsync({ data })
      .then((result) => {
        updateTempEmail(newEmail); // Set the new email as the temp email
        toast({
          description: result.message,
        });
      })
      .catch((error) => {
        toast({
          variant: "destructive",
          description: error,
        });
      });
  };

  // Handle resend code
  const handleResendCode = () => {
    const type = "newEmail";
    if (!profile?.tempEmail) return;
    resendCodeMutation
      .mutateAsync({ data: { email: profile.tempEmail }, type })
      .then((result) => {
        toast({
          description: result.message,
        });
      })
      .catch((error) => {
        toast({
          variant: "destructive",
          description: error,
        });
      });
  };

  // Handle verify email
  const handleVerifyEmail = (data: VerifyEmailFormValues) => {
    setIsVerifyLoading(true); // Start loading
    const payload: VerifyNewEmailModel = {
      email: profile?.tempEmail || "", // Use temp email from profile
      password: data.password,
      verificationCode: data.verificationCode,
    };
    verifyEmailMutation
      .mutateAsync({ data: payload })
      .then((result) => {
        toast({
          description: result.message,
        });
        handleLogout(); // Log out after successful verification
      })
      .catch((error) => {
        toast({
          variant: "destructive",
          description: error.message || "Verification failed",
        });
      })
      .finally(() => {
        setIsVerifyLoading(false); // Stop loading
      });
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Change Email</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {/* New Email Input with Update Button */}
            <div className="flex items-center">
              <div className="w-4/5">
                <Input
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="Enter new email"
                  className="w-full"
                />
              </div>
              <div className="ml-3 w-1/5">
                <LoadingButton
                  onClick={handleEmailChange}
                  isLoading={updateEmailMutation.isPending}
                  variant="default"
                  size="sm"
                  className="w-full"
                >
                  Update Email
                </LoadingButton>
              </div>
            </div>

            {/* Temp Email and Resend Code Button */}
            {profile?.tempEmail && (
              <div className="flex items-center">
                <div className="w-4/5">
                  <Input
                    value={profile.tempEmail} // The disabled input displays tempEmail
                    disabled
                    className="w-full"
                  />
                </div>
                <div className="ml-3 w-1/5">
                  <LoadingButton
                    onClick={handleResendCode}
                    isLoading={resendCodeMutation.isPending}
                    variant="default"
                    size="sm"
                    className="w-full"
                  >
                    Resend Code
                  </LoadingButton>
                </div>
              </div>
            )}

            {/* Dialog for Password and Verification Code */}
            {profile?.tempEmail && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="default" size="sm" className="w-full">
                    Verify
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Password Confirmation</DialogTitle>
                    <DialogDescription>
                      Please enter the verification code and your password to
                      confirm the email change.
                    </DialogDescription>
                  </DialogHeader>
                  <div>
                    <form
                      onSubmit={handleSubmit(handleVerifyEmail)}
                      className="space-y-4"
                    >
                      {/* Verification Code Field */}
                      <Input
                        {...register("verificationCode")}
                        placeholder="Enter verification code"
                      />
                      {errors.verificationCode && (
                        <p className="text-red-500 text-sm">
                          {errors.verificationCode?.message}
                        </p>
                      )}

                      {/* Password Field */}
                      <Input
                        {...register("password")}
                        type="password"
                        placeholder="Enter your password"
                      />
                      {errors.password && (
                        <p className="text-red-500 text-sm">
                          {errors.password?.message}
                        </p>
                      )}

                      <LoadingButton
                        type="submit"
                        variant="default"
                        size="sm"
                        isLoading={isVerifyLoading}
                        className="w-full"
                      >
                        Confirm
                      </LoadingButton>
                    </form>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountEmailPage;
