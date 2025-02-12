import useUserStore from "@/store/users/userStore";
import { Input, List, Typography } from "antd";
import { IoPersonAdd } from "react-icons/io5";

import styles from "../FriendList/friendList.module.scss";
import { useEffect } from "react";
import useFriendStore from "@/store/friends/friendStore";

export const AddFriend = () => {
  const { users, setTerm, term, fetchUsers } = useUserStore();
  const { addFriend } = useFriendStore();

  useEffect(() => {
    fetchUsers();
  }, [term]);

  return (
    <>
      <Typography.Text strong>Buscar novos amigos:</Typography.Text>

      <Input
        placeholder="Informe o nome ou email"
        onChange={(event) => setTerm(event.target.value)}
        value={term}
      />

      {users.length > 0 && (
        <List
          size="large"
          header={<div>Usuarios encontrados</div>}
          bordered
          dataSource={users}
          renderItem={(item) => (
            <List.Item>
              <div className={styles.content}>
                <div className={styles.text}>
                  <Typography.Text strong>Nome:</Typography.Text>
                  <Typography.Text>{item.name}</Typography.Text>
                </div>
                <div className={styles.text}>
                  <Typography.Text strong>Email:</Typography.Text>
                  <Typography.Text>{item.email}</Typography.Text>
                </div>
                <IoPersonAdd onClick={() => addFriend(item.id)} />
              </div>
            </List.Item>
          )}
        />
      )}
    </>
  );
};
