import useFriendStore from "@/store/friends/friendStore";
import styles from "./friendList.module.scss";
import { useAuthStore } from "@/store/auth/authStore";
import { useEffect } from "react";
import { List, Typography } from "antd";
import { MdOutlineDeleteSweep } from "react-icons/md";

export const FriendList = () => {
  const { friendships, fetchFriendships, removeFriendship } = useFriendStore(
    (state) => state
  );
  const { user } = useAuthStore((state) => state);

  useEffect(() => {
    if (user) {
      fetchFriendships({ userId: user.id, status: "ACCEPTED" });
    }
  }, [user]);

  const handleRemoveFriendship = (friendshipId: string) => {
    if (user) {
      removeFriendship(friendshipId);
    }
  };

  return (
    <List
      size="large"
      header={
        <Typography.Title level={5} style={{ margin: 0 }}>
          Seus amigos
        </Typography.Title>
      }
      bordered
      dataSource={friendships}
      renderItem={(item) => (
        <List.Item>
          <div className={styles.content}>
            <div className={styles.text}>
              <Typography.Text strong>Nome:</Typography.Text>
              <Typography.Text>{item.friend.name}</Typography.Text>
            </div>
            <div className={styles.text}>
              <Typography.Text strong>Email:</Typography.Text>
              <Typography.Text>{item.friend.email}</Typography.Text>
            </div>
            <MdOutlineDeleteSweep
              className="icon"
              onClick={() => handleRemoveFriendship(item.id)}
            />
          </div>
        </List.Item>
      )}
    />
  );
};
