import { create } from "zustand";
import { persist } from "zustand/middleware";
import { LoginResponseModel } from "@/app/models/auth.models";
import { UserModel } from "@/app/models/user.models";
import { NotificationModel } from "@/app/models/notification.models";

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

interface NotificationState {
  notificationCounts: Record<string, number>; // Store counts for each type dynamically
  updateCount: (type: string, count: number) => void;
  incrementCount: (type: string) => void; // Add this helper function
  clearNotificationsByType: (type: string) => void;
}

export const useNotificationStore = create<NotificationState>()(
  persist(
    (set) => ({
      notificationCounts: {},

      updateCount: (type: string, count: number) =>
        set((state) => ({
          notificationCounts: {
            ...state.notificationCounts,
            [type]: count,
          },
        })),

      // Increment count for a specific type
      incrementCount: (type: string) =>
        set((state) => ({
          notificationCounts: {
            ...state.notificationCounts,
            [type]: (state.notificationCounts[type] || 0) + 1,
          },
        })),

      clearNotificationsByType: (type: string) =>
        set((state) => {
          const updatedCounts = { ...state.notificationCounts };
          delete updatedCounts[type];
          return {
            notificationCounts: updatedCounts,
          };
        }),
    }),
    {
      name: "notification-storage",
    }
  )
);
