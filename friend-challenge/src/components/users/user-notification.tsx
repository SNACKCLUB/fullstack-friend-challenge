import { Bell } from "lucide-react";
import { Popover } from "../ui/popover";
import { Tooltip } from "../ui/tooltip";
import { UserItem } from "./user-item";
import { User, UserContext } from "../contexts/user";
import { UserActions } from "./user-actions";
import { useCallback, useContext, useEffect, useState } from "react";
import { getRequests } from "@/app/actions/requests/getRequests";
import { cn } from "@/lib/utils";

type UserNotificationProps = {
  loading: boolean;
};

type FriendRequest = {
  id: string;
  user_id: number;
};

export const UserNotification = ({ loading }: UserNotificationProps) => {
  const [users, setUsers] = useState<User[]>([]);
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([]);
  const { reloadList, setReloadList } = useContext(UserContext);

  const loadRequests = useCallback(async () => {
    const data = await getRequests();

    const users = data.map((request: any) => {
      return request.user;
    });

    setUsers(users);
    setFriendRequests(data);
    setReloadList(false);
  }, [setReloadList]);

  useEffect(() => {
    loadRequests();
  }, [loadRequests]);

  useEffect(() => {
    if (reloadList) loadRequests();
  }, [reloadList, loadRequests]);

  return (
    <Popover
      trigger={
        <button
          disabled={loading}
          className={cn(
            users.length > 0 && "relative before:absolute before:size-[10px]",
            users.length > 0 &&
              "before:bg-red-400 before:rounded-full before:top-0 before:right-0"
          )}
        >
          <Tooltip title="Notifications">
            <Bell size={18} />
          </Tooltip>
        </button>
      }
    >
      <div className="flex flex-col gap-4">
        <div>
          <span className="text-sm">Your notifications: {users.length}</span>
        </div>

        <div className="flex flex-col gap-2">
          {users.map((user, index) => {
            return (
              <UserItem
                key={user.email}
                user={user}
                showDetails={false}
                contentClassName="border-gray-900 py-2 max-w-full justify-center"
                buttonClassName="gap-1 [&>*]:bg-gray-900 flex-0"
              >
                <UserActions
                  user={user}
                  mode="notification"
                  friend_request_id={friendRequests[index].id}
                />
              </UserItem>
            );
          })}
        </div>
      </div>
    </Popover>
  );
};
