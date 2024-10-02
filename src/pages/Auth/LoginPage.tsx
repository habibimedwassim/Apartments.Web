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
import { Eye, EyeOff, SunMoon } from "lucide-react"; // Importing icons from lucide-react
import { ModeToggle } from "@/components/mode-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/http/api";
import { LoadingButton } from "@/components/ui/button-loading";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Validation regular expressions
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (response: any) => {
      console.log(response.data);

      if (response.data.role === "Admin") {
        navigate("/admin/home");
      } else if (response.data.role === "Owner") {
        navigate("/owner/home");
      } else {
        setError(
          "Access denied: This web application is not for tenants, use the mobile app instead."
        );
      }
    },
    onError: (error: any) => {
      let apiErrorMessage = "Login failed";

      apiErrorMessage = error.response?.data?.message || apiErrorMessage;

      console.log(apiErrorMessage);
      setError(apiErrorMessage);
    },
  });

  const handleLogin = async () => {
    setError(null);
    // Perform email and password validation
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!email) {
      setError("Email is required");
      return;
    }
    if (!password) {
      setError("Password is required");
      return;
    }

    mutation.mutate({ email, password });
  };

  return (
    <section className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl">Login</CardTitle>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full"
                >
                  <SunMoon className="h-5 w-5" />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <ModeToggle useDropdown={false} />
              </DropdownMenuContent>
            </DropdownMenu>
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
          {error && <p className="text-red-500">{error}</p>}
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <LoadingButton
            onClick={handleLogin}
            className="w-full"
            isLoading={mutation.isPending}
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
