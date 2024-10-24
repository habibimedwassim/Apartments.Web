import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { registerSchema } from "@/app/schemas/user.schemas";
import {
  useRegisterOwnerMutation,
  useRegisterAdminMutation,
} from "@/app/services/mutations/user.mutations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";

// Define the TypeScript type for the form values based on the Zod schema
type RegisterModel = z.infer<typeof registerSchema>;

const RegisterPage = () => {
  const { toast } = useToast();
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm<RegisterModel>({
    resolver: zodResolver(registerSchema),
  });
  const [role, setRole] = useState<"owner" | "admin">("owner");

  const registerOwnerMutation = useRegisterOwnerMutation();
  const registerAdminMutation = useRegisterAdminMutation();

  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const onSubmit = async (data: RegisterModel) => {
    try {
      if (role === "owner") {
        const result = await registerOwnerMutation.mutateAsync(data);
        toast({ title: result.message });
      } else {
        const result = await registerAdminMutation.mutateAsync(data);
        toast({ title: result.message });
      }
    } catch (error: any) {
      toast({ title: "Registration failed", description: error.message });
    }
  };

  return (
    <Card>
      <CardContent>
        <div className="p-4">
          <h2 className="text-2xl font-semibold mb-4">Register User</h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
            autoComplete="off"
          >
            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium mb-1">Role</label>
              <Select
                value={role}
                onValueChange={(value) => setRole(value as "owner" | "admin")}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="owner">Owner</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* CIN */}
            <div>
              <label className="block text-sm font-medium mb-1">CIN</label>
              <Input
                {...register("cin")}
                placeholder="Enter CIN"
                autoComplete="off"
              />
              {errors.cin && (
                <p className="text-red-500 text-sm">{errors.cin.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <Input
                {...register("email")}
                placeholder="Enter email"
                autoComplete="off"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  placeholder="Enter password"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* First Name */}
            <div>
              <label className="block text-sm font-medium mb-1">
                First Name
              </label>
              <Input
                {...register("firstName")}
                placeholder="Enter first name"
                autoComplete="off"
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Last Name
              </label>
              <Input
                {...register("lastName")}
                placeholder="Enter last name"
                autoComplete="off"
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm">
                  {errors.lastName.message}
                </p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Phone Number
              </label>
              <Input
                {...register("phoneNumber")}
                placeholder="Enter phone number"
                autoComplete="off"
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium mb-1">Gender</label>
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.gender && (
                <p className="text-red-500 text-sm">{errors.gender.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={
                registerOwnerMutation.isPending ||
                registerAdminMutation.isPending
              }
            >
              {registerOwnerMutation.isPending ||
              registerAdminMutation.isPending
                ? "Registering..."
                : "Register"}
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
};

export default RegisterPage;
