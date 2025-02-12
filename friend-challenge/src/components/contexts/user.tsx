import { getMe } from "@/app/actions/auth/me";
import { useToast } from "@/hooks/use-toast";
import { deleteSession } from "@/lib/session";
import { useRouter } from "next/navigation";
import { createContext, ReactNode, useEffect, useState } from "react";

type User = {
  name: string;
  email: string;
  image: string;
};

type UserContextData = {
  user: User | null;
};

type UserProviderData = {
  children: ReactNode;
};

export const UserContext = createContext({} as UserContextData);

export function UserProvider({ children }: UserProviderData) {
  const [user, setUser] = useState<User | null>(null);
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
          title: `Unauthorized access! ${response?.statusText}`,
        });
        deleteSession();
        router.push("/login");
      }
    };

    getAuthUser();
  }, [toast, router]);

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
}
