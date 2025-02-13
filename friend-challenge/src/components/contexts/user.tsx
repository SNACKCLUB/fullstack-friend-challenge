import { getMe } from "@/app/actions/auth/me";
import { createFriendRequest } from "@/app/actions/requests/request";
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

  return (
    <UserContext.Provider
      value={{ user, reloadList, sendFriendRequest, setReloadList }}
    >
      {children}
    </UserContext.Provider>
  );
}
