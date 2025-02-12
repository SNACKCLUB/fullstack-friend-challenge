import useFriendStore from "@/store/friends/friendStore";
import styles from "./friendList.module.scss";
import { useAuthStore } from "@/store/auth/authStore";
import { useEffect } from "react";
import { List, Typography } from "antd";
import { MdOutlineDeleteSweep } from "react-icons/md";

export const FriendList = () => {
  const { friends, fetchFriends, removeFriend } = useFriendStore(
    (state) => state
  );
  const { user } = useAuthStore((state) => state);

  useEffect(() => {
    if (user) {
      fetchFriends({ userId: user.id, status: "ACCEPTED" });
    }
  }, [user]);

  const handleRemoveFriend = (friendId: string) => {
    if (user) {
      removeFriend({ userId: user.id, friendId });
    }
  };

  return (
    <List
      size="large"
      header={<div>Lista de amigos</div>}
      bordered
      dataSource={friends}
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
              onClick={() => handleRemoveFriend(item.friend.id)}
            />
          </div>
        </List.Item>
      )}
    />
  );
};
