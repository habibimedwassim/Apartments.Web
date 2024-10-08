import { create } from "zustand";
import { persist } from "zustand/middleware";
import { LoginResponseModel } from "@/app/models/auth.models";

interface SidebarState {
  isOpen: boolean;
  setIsOpen: () => void;
}
export const useSidebarStore = create<SidebarState>()(
  persist(
    (set) => ({
      isOpen: false,

      setIsOpen: () => {
        set((state) => ({ isOpen: !state.isOpen }));
      },
    }),
    {
      name: "sidebar-storage",
    }
  )
);

interface AuthState {
  user: LoginResponseModel | null;
  isAuthenticated: boolean;
  token: string | null;
  role: string | null;
  login: (userData: LoginResponseModel) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      token: null,
      role: null,

      login: (userData: LoginResponseModel) => {
        set({
          user: userData,
          token: userData.accessToken,
          role: userData.role,
          isAuthenticated: true,
        });
      },

      logout: () => {
        set({ user: null, token: null, role: null, isAuthenticated: false });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
