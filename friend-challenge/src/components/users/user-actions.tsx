import { Check, Handshake, Trash, UserIcon, X } from "lucide-react";
import { useContext } from "react";
import { User, UserContext } from "../contexts/user";
import { Tooltip } from "../ui/tooltip";

type UserActionsProps = {
  user: User;
  mode: string;
};

export const UserActions = ({ user, mode }: UserActionsProps) => {
  const { sendFriendRequest } = useContext(UserContext);

  return (
    <>
      {mode === "friend" && (
        <Tooltip title="Remove friend">
          <button disabled={false}>
            <Trash size={18} />
          </button>
        </Tooltip>
      )}

      {mode === "networking" &&
        (!user?.request_status || user?.request_status === "declined") && (
          <Tooltip title="Request friend">
            <button disabled={false} onClick={() => sendFriendRequest(user)}>
              <Handshake size={18} />
            </button>
          </Tooltip>
        )}

      {mode === "networking" && user?.request_status === "pending" && (
        <Tooltip title="Request status">
          <span className="text-sm">pending</span>
        </Tooltip>
      )}

      {mode === "networking" && user?.request_status === "accepted" && (
        <Tooltip title="Your friend">
          <button disabled={true}>
            <UserIcon size={18} />
          </button>
        </Tooltip>
      )}

      {mode === "friend-request" && (
        <Tooltip title="Request status">
          <span className="text-sm">{user?.request_status}</span>
        </Tooltip>
      )}

      {mode === "notification" && (
        <Tooltip title="Accept request">
          <button disabled={false}>
            <Check size={18} />
          </button>
        </Tooltip>
      )}

      {mode === "notification" && (
        <Tooltip title="Declined request">
          <button disabled={false}>
            <X size={18} />
          </button>
        </Tooltip>
      )}
    </>
  );
};
