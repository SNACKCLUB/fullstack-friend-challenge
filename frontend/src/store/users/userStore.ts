import { create } from "zustand";
import { createUser, getUsersByFilter } from "@/api/service/userService";
import { toast } from "react-toastify";
import { UserCreateTypes, UserStoreTypes } from "./types";
import { useAuthStore } from "../auth/authStore";

const useUserStore = create<UserStoreTypes>((set, get) => ({
  users: [],
  term: "",
  setTerm: (term: string) => set({ term }),
  fetchUsers: async () => {
    try {
      const term = get().term;
      const { user } = useAuthStore.getState();
      if (user && term !== "") {
        const users = await getUsersByFilter({ userId: user.id, term });
        set({ users });
      }
    } catch (error) {
      console.error("Failed to fetch friends:", error);
    }
  },
  createUser: async ({ email, password, name }: UserCreateTypes) => {
    try {
      await createUser({ email, password, name });
      toast.success("Usuário criado com sucesso!");
    } catch (error) {
      toast.error("Erro ao criar usuário");
    }
  },
}));

export default useUserStore;
