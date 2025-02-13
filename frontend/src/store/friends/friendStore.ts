import { create } from "zustand";
import {
  addFriend,
  getFriends,
  removeFriend,
  updateFriendshipStatus,
} from "@/api/service/friendService";
import { toast } from "react-toastify";
import {
  FriendRelationTypes,
  FriendStatusTypes,
  FriendStoreTypes,
} from "./types";
import { useAuthStore } from "../auth/authStore";

const useFriendStore = create<FriendStoreTypes>((set) => ({
  friendships: [],
  fetchFriendships: async ({ userId, status }: FriendRelationTypes) => {
    try {
      const friends = await getFriends({ userId, status });
      set({ friendships: friends });
    } catch (error) {
      console.error("Failed to fetch friends:", error);
    }
  },
  updateFriendship: async (status: FriendStatusTypes) => {
    const { user } = useAuthStore.getState();
    if (user) {
      const updatedFriend = await getFriends({
        userId: user.id,
        status,
      });
      set({ friendships: updatedFriend });
    }
  },
  removeFriendship: async (friendshipId: string) => {
    try {
      const { user } = useAuthStore.getState();
      if (user) {
        await removeFriend(friendshipId);
        await useFriendStore.getState().updateFriendship("ACCEPTED");
        toast.success("Amigo removido com sucesso");
      }
    } catch (error) {
      toast.error("Erro ao remover amigo");
    }
  },
  addFriendship: async (friendId: FriendRelationTypes["friendId"]) => {
    try {
      const { user } = useAuthStore.getState();

      if (user) {
        await addFriend({ userId: user.id, friendId });
        await useFriendStore.getState().updateFriendship("ACCEPTED");
        toast.success("Amigo adicionado com sucesso");
      }
    } catch (error) {
      toast.error("Erro ao adicionar amigo");
    }
  },
  updateFriendshipStatus: async ({ friendId, status }: FriendRelationTypes) => {
    try {
      const { user } = useAuthStore.getState();

      if (user) {
        await updateFriendshipStatus({ friendId, status });
        toast.success(`Amigo ${status} com sucesso`);
        await useFriendStore
          .getState()
          .fetchFriendships({ userId: user.id, status: "PENDING" });
      }
    } catch (error) {
      toast.error("Erro ao atualizar status do amigo");
    }
  },
}));

export default useFriendStore;
