import { getMe } from "@/app/actions/auth/me";
import { removeFriend } from "@/app/actions/friend/removeFriend";
import { createFriendRequest } from "@/app/actions/requests/request";
import { updateRequest } from "@/app/actions/requests/updateRequest";
import { useToast } from "@/hooks/use-toast";
import { deleteSession } from "@/lib/session";
import { useRouter } from "next/navigation";
import { createContext, ReactNode, useEffect, useState } from "react";

export type User = {
  id: number;
  name: string;
  email: string;
  image: string;
  request_status?: string;
};

type UserContextData = {
  user: User | null;
  reloadList: boolean;
  setReloadList: (value: boolean) => void;
  sendFriendRequest: (user: User) => Promise<void>;
  removeFriendFromList: (user: User) => Promise<void>;
  acceptFriendRequest: (friend_request_id: string) => Promise<void>;
  declineFriendRequest: (friend_request_id: string) => Promise<void>;
};

type UserProviderData = {
  children: ReactNode;
};

export const UserContext = createContext({} as UserContextData);

export function UserProvider({ children }: UserProviderData) {
  const [user, setUser] = useState<User | null>(null);
  const [reloadList, setReloadList] = useState<boolean>(false);

  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const getAuthUser = async () => {
      try {
        const user: User = await getMe();
        setUser(user);
      } catch ({ response }: any) {
        toast({
          variant: "destructive",
          title: `Unauthorized access! Please login again.`,
        });

        if (response?.statusText) console.error(response?.statusText);

        deleteSession();
        router.replace("/login");
      }
    };

    getAuthUser();
  }, [toast, router]);

  const sendFriendRequest = async (user: User) => {
    if (user.request_status === "pending") {
      toast({
        variant: "destructive",
        title: `Request was already sent!`,
      });

      return;
    }

    try {
      user.request_status = "pending";
      await createFriendRequest(user.id);
      toast({
        title: `Request send successfully!`,
      });

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      user.request_status = "";
      toast({
        variant: "destructive",
        title: `Error to send a friend request!`,
      });
    }
  };

  const removeFriendFromList = async (user: User) => {
    try {
      await removeFriend(user.id);
      setReloadList(true);

      toast({
        title: `Friend removed successfully.`,
      });

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast({
        variant: "destructive",
        title: `Error to remove a friend!`,
      });
    }
  };

  const acceptFriendRequest = async (friend_request_id: string) => {
    try {
      await updateRequest({ id: friend_request_id, status: "accepted" });
      setReloadList(true);

      toast({
        title: `Friend request was accepted.`,
      });

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast({
        variant: "destructive",
        title: `Error when accept a friend request!`,
      });
    }
  };

  const declineFriendRequest = async (friend_request_id: string) => {
    try {
      await updateRequest({ id: friend_request_id, status: "declined" });
      setReloadList(true);

      toast({
        title: `Friend request was declined.`,
      });

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast({
        variant: "destructive",
        title: `Error when decline a friend request!`,
      });
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        reloadList,
        sendFriendRequest,
        removeFriendFromList,
        setReloadList,
        acceptFriendRequest,
        declineFriendRequest,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
