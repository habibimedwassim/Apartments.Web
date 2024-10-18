import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
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
import { MailCheck, MailPlus, RefreshCcw } from "lucide-react";

type VerifyEmailFormValues = z.infer<typeof verificationSchema>;

export const AccountEmailPage = () => {
  const { toast } = useToast();
  const { handleLogout } = useLogout();
  const { profile, setProfile } = useProfileStore();
  const [newEmail, setNewEmail] = useState("");
  const [isVerifyLoading, setIsVerifyLoading] = useState(false);

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

  const handleEmailChange = () => {
    const data = { email: newEmail };
    updateEmailMutation
      .mutateAsync({ data })
      .then((result) => {
        updateTempEmail(newEmail);
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

  const handleVerifyEmail = (data: VerifyEmailFormValues) => {
    setIsVerifyLoading(true);
    const payload: VerifyNewEmailModel = {
      email: profile?.tempEmail || "",
      password: data.password,
      verificationCode: data.verificationCode,
    };
    verifyEmailMutation
      .mutateAsync({ data: payload })
      .then((result) => {
        toast({
          description: result.message,
        });
        handleLogout();
      })
      .catch((error) => {
        toast({
          variant: "destructive",
          description: error.message || "Verification failed",
        });
      })
      .finally(() => {
        setIsVerifyLoading(false);
      });
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex justify-between">
              <h2 className="text-lg font-semibold">Change Email</h2>
            </div>
          </CardTitle>
          <CardDescription>
            After verifying the new email you'll be logged out
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {/* New Email Input with Update Button */}
            <div className="flex items-center">
              <div className="w-4/5">
                <Input
                  id="newEmail"
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
                  className="h-8 gap-1 ml-2"
                  icon={<MailPlus className="h-3.5 w-3.5" />}
                >
                  Update Email
                </LoadingButton>
              </div>
            </div>

            {/* Temp Email, Resend Code, and Verify Button */}
            {profile?.tempEmail && (
              <div className="flex items-center gap-2">
                <div className="w-4/5 relative">
                  <Input
                    value={profile.tempEmail} // The disabled input displays tempEmail
                    disabled
                    className="w-full pr-24" // Add more padding to the right to make space for the button
                  />
                  {/* Resend Code Button inside the input */}
                  <LoadingButton
                    onClick={handleResendCode}
                    isLoading={resendCodeMutation.isPending}
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2" // Use translate to center vertically
                    icon={<RefreshCcw className="h-4 w-4" />}
                  >
                    Resend
                  </LoadingButton>
                </div>
                {/* Verify Button aligned next to the input */}
                <div className="w-1/5">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="default"
                        size="sm"
                        className="h-8 gap-1 ml-2"
                      >
                        <MailCheck className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                          Verify Email
                        </span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Password Confirmation</DialogTitle>
                        <DialogDescription>
                          Please enter the verification code and your password
                          to confirm the email change.
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
                            autoComplete="one-time-code"
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
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountEmailPage;
