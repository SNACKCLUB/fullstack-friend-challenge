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
  removeFriendship: async ({ friendId }: FriendRelationTypes) => {
    try {
      const { user } = useAuthStore.getState();
      if (user) {
        await removeFriend({ userId: user.id, friendId });
        await useFriendStore.getState().updateFriendship("ACCEPTED");
        toast.success("Friend deleted successfully");
      }
    } catch (error) {
      toast.error("Failed to delete friend");
    }
  },
  addFriendship: async (friendId: FriendRelationTypes["friendId"]) => {
    try {
      const { user } = useAuthStore.getState();

      if (user) {
        await addFriend({ userId: user.id, friendId });
        await useFriendStore.getState().updateFriendship("ACCEPTED");
        toast.success("Friend added successfully");
      }
    } catch (error) {
      toast.error("Failed to add friend");
    }
  },
  updateFriendshipStatus: async ({ friendId, status }: FriendRelationTypes) => {
    try {
      const { user } = useAuthStore.getState();

      if (user) {
        await updateFriendshipStatus({ friendId, status });
        toast.success(`Friend ${status} successfully`);
        await useFriendStore
          .getState()
          .fetchFriendships({ userId: user.id, status: "PENDING" });
      }
    } catch (error) {
      toast.error("Failed to update friend");
    }
  },
}));

export default useFriendStore;
