import { useAuthStore } from "@/store/auth/authStore";
import { useNotificationStore } from "@/store/notifications/notificationStore";
import { useEffect } from "react";

const NotificationListener = () => {
  const { user } = useAuthStore();
  const connectUser = useNotificationStore((state) => state.connectUser);

  useEffect(() => {
    if (user) {
      connectUser(user.id);
    }
  }, [user]);

  return null;
};

export default NotificationListener;
