import { useAuthStore } from "@/hooks/use-store";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/auth/login");
  };

  return { handleLogout };
}
