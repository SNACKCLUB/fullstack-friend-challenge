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

  useEffect(() => {
    setUser({
      name: "João Augusto",
      email: "jhonaugustjunior@gmail.com",
      image: "",
    });
  }, []);

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
}
