import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/hooks/use-store";
import { useNavigate } from "react-router-dom";

export function LogoutButton() {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/auth/login");
  };

  return (
    <Button
      variant="ghost"
      className="flex items-center w-full"
      onClick={handleLogout}
    >
      <LogOut className="w-4 h-4 mr-3 text-muted-foreground" />
      Sign out
    </Button>
  );
}
