import useUserStore from "@/store/users/userStore";
import { Card, Input, List, Typography } from "antd";
import { IoPersonAdd } from "react-icons/io5";

import styles from "./addFriend.module.scss";
import { useEffect } from "react";
import useFriendStore from "@/store/friends/friendStore";

export const AddFriend = () => {
  const { users, setTerm, term, fetchUsers } = useUserStore();
  const { addFriendship } = useFriendStore();

  useEffect(() => {
    fetchUsers();
  }, [term]);

  return (
    <Card title="Adicionar amigos">
      <div className={styles.container}>
        <Input
          placeholder="Digite o nome ou e-mail do usuário"
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
                  <IoPersonAdd
                    onClick={() => addFriendship(item.id)}
                    className="icon"
                  />
                </div>
              </List.Item>
            )}
          />
        )}
      </div>
    </Card>
  );
};
