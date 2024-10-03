import { create } from "zustand";
import { persist } from "zustand/middleware";
import { LoginResponseModel } from "@/models/auth.models";

interface AuthState {
  user: LoginResponseModel | null;
  isAuthenticated: boolean;
  token: string | null;
  login: (userData: LoginResponseModel) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      token: null,

      login: (userData: LoginResponseModel) => {
        set({
          user: userData,
          token: userData.accessToken,
          isAuthenticated: true,
        });
      },

      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
