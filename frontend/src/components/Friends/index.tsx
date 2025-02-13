import { AddFriend } from "./components/AddFriend";
import { FriendList } from "./components/FriendList";

import styles from "./friends.module.scss";

export const Friends = () => {
  return (
    <div className={styles.container}>
      <AddFriend />
      <FriendList />
    </div>
  );
};
