import { useAuthStore } from "@/store/auth/authStore";
import { AiOutlineLogout } from "react-icons/ai";
import { Badge, Typography } from "antd";
import { useRouter } from "next/router";
import { IoMdNotifications } from "react-icons/io";

import styles from "./header.module.scss";
import { useNotificationStore } from "@/store/notifications/notificationStore";

export const Header = () => {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const { count, clearNotifications } = useNotificationStore();

  const options = [
    {
      label: "Seus Amigos",
      path: "/friends",
    },
    {
      label: "Solictações",
      path: "/requests",
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {options.map((option) => (
          <div className={styles.option}>
            <Typography.Text
              onClick={() => router.push(option.path)}
              style={{ color: "white" }}
            >
              {option.label}
            </Typography.Text>
          </div>
        ))}
      </div>
      <div className={styles.content}>
        <Badge
          count={count}
          size="small"
          onClick={() => {
            router.push("/requests"), clearNotifications();
          }}
        >
          <IoMdNotifications color="white" className="icon" />
        </Badge>
        <Typography.Text style={{ color: "white" }}>
          Seja bem vindo, {user?.name}
        </Typography.Text>
        <AiOutlineLogout
          color="white"
          className="icon"
          onClick={() => logout()}
        />
      </div>
    </div>
  );
};
