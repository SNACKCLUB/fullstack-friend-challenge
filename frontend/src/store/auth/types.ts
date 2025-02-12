import { UserTypes } from "@/common/types/UserTypes";

type AuthStoreTypes = {
  token: string | null;
  refreshToken: string | null;
  user: UserTypes | null;
  isAuthenticated: boolean;
  setToken: (token: string, refreshToken: string) => void;
  setUser: (user: UserTypes) => void;
  logout: () => void;
  fetchUser: (token: string) => void;
};

type TokenTypes = {
  data: {
    accessToken: string;
    refreshToken: string;
  };
};

export type { AuthStoreTypes, TokenTypes };
