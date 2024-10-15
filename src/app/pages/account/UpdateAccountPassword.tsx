import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { changePasswordSchema } from "@/app/schemas/user.schemas";
import { useUpdatePasswordMutation } from "@/app/services/mutations/user.mutations";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { LoadingButton } from "@/components/common/button-loading";
import { Edit, Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ChangePasswordModel } from "@/app/models/user.models";
import { useLogout } from "@/hooks/use-logout";

const UpdateAccountPassword = () => {
  const { toast } = useToast();
  const updateMutation = useUpdatePasswordMutation();
  const { handleLogout } = useLogout();

  const form = useForm({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  // Add states to toggle password visibility
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [_, setIsFormValid] = useState(false);

  // Enable the button only when form is valid and new passwords match
  useEffect(() => {
    const { newPassword, confirmPassword } = form.watch();
    if (form.formState.isValid && newPassword === confirmPassword) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [form.watch(), form.formState.isValid]);

  const onSubmit = (data: ChangePasswordModel) => {
    updateMutation
      .mutateAsync({ data })
      .then(() => {
        toast({
          title: "Password updated successfully",
        });
        form.reset();
        handleLogout();
      })
      .catch((err) => {
        toast({
          variant: "destructive",
          description: err.message || "An error occurred",
        });
      });
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex justify-between">
              <LoadingButton
                type="submit"
                form="account-details-form"
                variant="outline"
                size="sm"
                isLoading={updateMutation.isPending}
                loadingText="Saving..."
                disabled={updateMutation.isPending || !form.formState.isDirty}
                icon={<Edit className="h-3.5 w-3.5" />}
                className="h-8 gap-1 ml-2"
              >
                Save Changes
              </LoadingButton>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              id="update-password-form"
            >
              <div className="grid grid-cols-1 gap-4">
                {/* Current Password */}
                <FormField
                  control={form.control}
                  name="currentPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Password</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input
                            type={showCurrentPassword ? "text" : "password"}
                            placeholder="Enter current password"
                            {...field}
                          />
                        </FormControl>
                        <button
                          type="button"
                          className="absolute inset-y-0 right-3 flex items-center"
                          onClick={() =>
                            setShowCurrentPassword(!showCurrentPassword)
                          }
                        >
                          {showCurrentPassword ? (
                            <EyeOff size={20} />
                          ) : (
                            <Eye size={20} />
                          )}
                        </button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* New Password */}
                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input
                            type={showNewPassword ? "text" : "password"}
                            placeholder="Enter new password"
                            {...field}
                          />
                        </FormControl>
                        <button
                          type="button"
                          className="absolute inset-y-0 right-3 flex items-center"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                          {showNewPassword ? (
                            <EyeOff size={20} />
                          ) : (
                            <Eye size={20} />
                          )}
                        </button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Confirm Password */}
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm new password"
                            {...field}
                          />
                        </FormControl>
                        <button
                          type="button"
                          className="absolute inset-y-0 right-3 flex items-center"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                        >
                          {showConfirmPassword ? (
                            <EyeOff size={20} />
                          ) : (
                            <Eye size={20} />
                          )}
                        </button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UpdateAccountPassword;
