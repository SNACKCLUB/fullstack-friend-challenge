import { Bell, Check, X } from "lucide-react";
import { Popover } from "../ui/popover";
import { Tooltip } from "../ui/tooltip";
import { UserItem } from "./user-item";
import { User } from "../contexts/user";

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
          <Tooltip title="Accept request">
            <button disabled={false}>
              <Check size={18} />
            </button>
          </Tooltip>
          <Tooltip title="Declined request">
            <button disabled={false}>
              <X size={18} />
            </button>
          </Tooltip>
        </UserItem>
      </div>
    </Popover>
  );
};
