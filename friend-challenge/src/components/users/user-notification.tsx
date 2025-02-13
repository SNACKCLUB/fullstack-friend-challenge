import { Bell } from "lucide-react";
import { Popover } from "../ui/popover";
import { Tooltip } from "../ui/tooltip";
import { UserItem } from "./user-item";
import { User } from "../contexts/user";
import { UserActions } from "./user-actions";

type UserNotificationProps = {
  loading: boolean;
};

export const UserNotification = ({ loading }: UserNotificationProps) => {
  const user: User = {
    name: "test",
    email: "test@test.com",
    image: "https://i.pravatar.cc/300?u=5SUQzgoDW8",
  };
  return (
    <Popover
      trigger={
        <button disabled={loading}>
          <Tooltip title="Notifications">
            <Bell size={18} />
          </Tooltip>
        </button>
      }
    >
      <div>
        <UserItem
          user={user}
          showDetails={false}
          contentClassName="border-gray-900 py-2 max-w-full justify-center"
          buttonClassName="gap-1 [&>*]:bg-gray-900 flex-0"
        >
          <UserActions user={user} mode="notification" />
        </UserItem>
      </div>
    </Popover>
  );
};
