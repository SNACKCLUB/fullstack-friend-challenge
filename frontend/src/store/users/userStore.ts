import { create } from "zustand";
import { getUsersByFilter } from "@/api/service/userService";
import { toast } from "react-toastify";
import { UserStoreTypes } from "./types";
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
}));

export default useUserStore;
