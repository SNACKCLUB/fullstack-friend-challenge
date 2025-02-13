import { create } from "zustand";
import { io } from "socket.io-client";
import { toast } from "react-toastify";
import { NotificationStoreTypes, NotificationTypes } from "./types";
import {
  getNotificationCount,
  cleanNotifications,
  updateNotification,
} from "@/api/service/notificationService";
import { useAuthStore } from "../auth/authStore";

const socket = io("http://localhost:8080");

export const useNotificationStore = create<NotificationStoreTypes>((set) => ({
  notifications: [],
  count: 0,
  getNotificationsCount: async () => {
    const { user } = useAuthStore.getState();
    try {
      const { count } = await getNotificationCount({ userId: user.id });
      set({ count });
    } catch (error) {
      console.error("Error to request notifications:", error);
    }
  },
  clearNotifications: async () => {
    const { user } = useAuthStore.getState();
    try {
      await cleanNotifications({ userId: user.id });
      set({ notifications: [], count: 0 });
    } catch (error) {
      console.error("Error to clean notifications:", error);
    }
  },
  connectUser: (userId) => {
    socket.emit("register", userId);

    socket.on("notification", (notification: NotificationTypes) => {
      set((state) => ({
        notifications: [notification, ...state.notifications],
        count: state.count + 1,
      }));

      let message = `Nova notificação: Convite de amizade`;

      switch (notification.status) {
        case "ACCEPTED":
          message += " aceito.";
          break;
        case "DECLINED":
          message += " rejeitado.";
          break;
        default:
          message += ` recebido.`;
      }

      toast.info(message, {
        onClick: () => {
          updateNotification(notification.id);
        },
      });
    });
  },
}));
