import { create } from "zustand";
import { persist } from "zustand/middleware";
import { LoginResponseModel } from "@/app/models/auth.models";
import { UserModel } from "@/app/models/user.models";
import {
  NotificationModel,
  NotificationType,
} from "@/app/models/notification.models";

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
  notifications: NotificationModel[];
  unreadCounts: Record<NotificationType, number>;
  fetchUnreadNotifications: (data: NotificationModel[]) => void;
  markAsRead: (type: NotificationType) => void;
  addNotification: (notification: NotificationModel) => void;
}

export const useNotificationStore = create<NotificationState>()(
  persist(
    (set) => ({
      notifications: [],
      unreadCounts: {
        rent: 0,
        leave: 0,
        payment: 0,
        dismiss: 0,
      },
      fetchUnreadNotifications: (data: NotificationModel[]) => {
        const unreadCounts = data.reduce(
          (acc: Record<NotificationType, number>, notification) => {
            if (!notification.isRead) {
              acc[notification.type] = (acc[notification.type] || 0) + 1;
            }
            return acc;
          },
          { rent: 0, leave: 0, payment: 0, dismiss: 0 }
        );
        set({ notifications: data, unreadCounts });
      },
      markAsRead: (type: NotificationType) => {
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.type === type ? { ...n, isRead: true } : n
          ),
          unreadCounts: {
            ...state.unreadCounts,
            [type]: 0,
          },
        }));
      },
      addNotification: (notification: NotificationModel) => {
        set((state) => ({
          notifications: [notification, ...state.notifications],
          unreadCounts: {
            ...state.unreadCounts,
            [notification.type]:
              state.unreadCounts[notification.type] +
              (notification.isRead ? 0 : 1),
          },
        }));
      },
    }),
    {
      name: "notification-storage",
    }
  )
);
