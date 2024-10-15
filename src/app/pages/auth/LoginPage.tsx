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
import { Eye, EyeOff } from "lucide-react";
import { ModeToggle } from "@/components/common/mode-toggle";

import { LoadingButton } from "@/components/common/button-loading";
import { useToast } from "@/hooks/use-toast";
import { isValidEmail } from "@/lib/utils";
import { USER_ROLE } from "@/app/constants/user-role";
import { useLoginMutation } from "@/app/services/mutations/auth.mutations";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const loginMutation = useLoginMutation();

  const handleRoleRedirection = (role: string | null) => {
    if (role === USER_ROLE.ADMIN) {
      navigate("/admin");
    } else if (role === USER_ROLE.OWNER) {
      navigate("/");
    } else {
      toast({
        variant: "destructive",
        title: "Access denied",
        description:
          "This web application is not for tenants, use the mobile app instead.",
      });
    }
  };

  const handleLogin = () => {
    setError(null);

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!email || !password) {
      setError("Both email and password are required.");
      return;
    }

    loginMutation
      .mutateAsync({ email, password })
      .then((response) => {
        const role = response.role ?? null;
        handleRoleRedirection(role);

        setError(null);
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        toast({
          variant: "destructive",
          description: error,
        });
      });
  };

  return (
    <section className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl">Login</CardTitle>
            <ModeToggle />
          </div>
          <CardDescription>
            Enter your email below to login to your account.
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
          <div className="grid gap-2 relative">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
            onClick={handleLogin}
            className="w-full"
            isLoading={loginMutation.isPending}
          >
            Sign in
          </LoadingButton>
          <Button variant="link">
            <Link
              to="/auth/forgot-password"
              className="text-sm text-blue-500 hover:underline"
            >
              Forgot Password?
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
};

export default LoginPage;
