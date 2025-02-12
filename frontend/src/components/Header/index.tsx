import { useAuthStore } from "@/store/auth/authStore";
import { AiOutlineLogout } from "react-icons/ai";
import styles from "./header.module.scss";
import { Typography } from "antd";
import { useRouter } from "next/router";

export const Header = () => {
  const router = useRouter();
  const { user, logout } = useAuthStore();

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
        <Typography.Text style={{ color: "white" }}>
          Seja bem vindo, {user?.name}
        </Typography.Text>
        <AiOutlineLogout
          color="white"
          style={{ cursor: "pointer " }}
          onClick={() => logout()}
        />
      </div>
    </div>
  );
};
