import { create } from "zustand";
import { persist } from "zustand/middleware";
import { LoginResponseModel } from "@/app/models/auth.models";
import { UserModel } from "@/app/models/user.models";

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
  isAuthenticated: boolean;
  token: string | null;
  role: string | null;
  login: (userData: LoginResponseModel) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      token: null,
      role: null,

      login: (userData: LoginResponseModel) => {
        set({
          token: userData.accessToken,
          role: userData.role,
          isAuthenticated: true,
        });
      },

      logout: () => {
        set({ token: null, role: null, isAuthenticated: false });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);

interface ProfileState {
  profile: UserModel | null;
  setProfile: (profileData: UserModel) => void;
  clearProfile: () => void;
}

export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      profile: null,

      setProfile: (profileData: UserModel) => {
        set({ profile: profileData });
      },

      clearProfile: () => {
        set({ profile: null });
      },
    }),
    {
      name: "profile-storage",
    }
  )
);
