import { FriendApiTypes, FriendRelationTypes } from "@/store/friends/types";
import axiosInstance from "../axios";

const getFriends = async ({
  userId,
  status,
}: FriendRelationTypes): Promise<FriendApiTypes[]> => {
  try {
    const response = await axiosInstance.get<FriendApiTypes[]>(
      `friendships/${userId}/friends`,
      {
        params: {
          status,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

const removeFriend = async ({
  userId,
  friendId,
}: FriendRelationTypes): Promise<void> => {
  try {
    await axiosInstance.post(`friendships/remove`, {
      userId,
      friendId,
    });
  } catch (error: any) {
    throw new Error(error);
  }
};

const addFriend = async ({
  userId,
  friendId,
}: FriendRelationTypes): Promise<void> => {
  try {
    await axiosInstance.post(`friendships/`, {
      senderId: userId,
      receiverId: friendId,
    });
  } catch (error: any) {
    throw new Error(error);
  }
};

const updateFriendshipStatus = async ({
  friendId,
  status,
}: FriendRelationTypes) => {
  try {
    await axiosInstance.put(`friendships/${friendId}`, {
      status,
    });
  } catch (error: any) {
    throw new Error(error);
  }
};

export { getFriends, removeFriend, addFriend, updateFriendshipStatus };
