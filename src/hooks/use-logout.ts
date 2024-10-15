import { useAuthStore, useProfileStore } from "@/hooks/use-store";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const logout = useAuthStore((state) => state.logout);
  const clearProfile = useProfileStore((state) => state.clearProfile);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    clearProfile();
    navigate("/auth/login");
  };

  return { handleLogout };
}
