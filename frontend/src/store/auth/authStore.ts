import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { AuthStoreTypes } from "./types";
import { UserTypes } from "@/common/types/UserTypes";
import { jwtDecode } from "jwt-decode";
import Router from "next/router";

import axiosInstance from "@/api/axios";

export const useAuthStore = create<AuthStoreTypes>()(
  persist(
    (set, get) => ({
      token: null,
      refreshToken: null,
      user: null,
      isAuthenticated: false,
      setToken: (token: string, refreshToken: string) => {
        set({ token, refreshToken, isAuthenticated: true });
        get().fetchUser(token);
      },
      setUser: (user: UserTypes) => set({ user }),
      logout: () => {
        set({
          token: null,
          refreshToken: null,
          user: null,
          isAuthenticated: false,
        }),
          Router.push("/");
      },
      fetchUser: async (token: string) => {
        if (token) {
          try {
            const decodedToken: any = jwtDecode(token);
            const userId = decodedToken.userId;
            const response = await axiosInstance.get(
              `http://localhost:8080/api/users/${userId}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            if (response) {
              const userData: UserTypes = await response.data;
              set({ user: userData });
            } else {
              set({ isAuthenticated: false, user: null });
            }
          } catch (error) {
            set({ isAuthenticated: false, user: null });
          }
        }
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
