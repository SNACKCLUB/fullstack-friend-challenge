import { useAuthStore } from "@/store/auth/authStore";
import useFriendStore from "@/store/friends/friendStore";
import { List, Typography } from "antd";
import { useEffect } from "react";

import styles from "../Friends/components/FriendList/friendList.module.scss";

import { IoPersonAdd } from "react-icons/io5";
import { IoMdRemoveCircle } from "react-icons/io";

export const Request = () => {
  const { friendships, fetchFriendships, updateFriendshipStatus } =
    useFriendStore((state) => state);
  const { user } = useAuthStore((state) => state);

  useEffect(() => {
    if (user) {
      fetchFriendships({ userId: user.id, status: "PENDING" });
    }
  }, [user]);

  return (
    <List
      size="large"
      header={
        <Typography.Title level={5} style={{ margin: 0 }}>
          Solicitações recebidas
        </Typography.Title>
      }
      bordered
      dataSource={friendships}
      renderItem={(item) => (
        <List.Item>
          <div className={styles.content}>
            <div className={styles.text}>
              <Typography.Text strong>Nome:</Typography.Text>
              <Typography.Text>{item?.friend?.name}</Typography.Text>
            </div>
            <div className={styles.text}>
              <Typography.Text strong>Email:</Typography.Text>
              <Typography.Text>{item?.friend?.email}</Typography.Text>
            </div>
            <div>
              <IoPersonAdd
                className="icon"
                style={{ color: "green" }}
                onClick={() =>
                  updateFriendshipStatus({
                    friendId: item.id,
                    status: "ACCEPTED",
                  })
                }
              />
              <IoMdRemoveCircle
                className="icon"
                style={{ color: "red" }}
                onClick={() =>
                  updateFriendshipStatus({
                    friendId: item.id,
                    status: "DECLINED",
                  })
                }
              />
            </div>
          </div>
        </List.Item>
      )}
    />
  );
};
