import { Prisma } from "@prisma/client";
import { PrismaFriendshipRepository } from "../repositories/prisma-friend-request-repository";

const friendship = PrismaFriendshipRepository();

export const FriendshipService = {
  async create(data: Prisma.FriendshipCreateInput) {
    const newFriendship = await friendship.create(data);
    await friendship.invalidateFriendsCache(newFriendship.senderId);
    await friendship.invalidateFriendsCache(newFriendship.receiverId);
    return newFriendship;
  },

  async get({ id }: Prisma.FriendshipWhereUniqueInput) {
    const response = await friendship.get({ id });

    if (!response) {
      throw new Error("Friendship not found");
    }

    return response;
  },

  async update({
    id,
    data,
  }: {
    id: Prisma.FriendshipWhereUniqueInput["id"];
    data: Prisma.FriendshipUpdateInput;
  }) {
    const updatedFriendship = await friendship.update({ id, data });
    if (updatedFriendship.senderId)
      await friendship.invalidateFriendsCache(updatedFriendship.senderId);
    if (updatedFriendship.receiverId)
      await friendship.invalidateFriendsCache(updatedFriendship.receiverId);
    return updatedFriendship;
  },

  async delete({ id }: Prisma.FriendshipWhereUniqueInput) {
    const friendshipData = await friendship.get({ id });
    if (!friendshipData) {
      throw new Error("Friendship not found");
    }
    await friendship.delete({ id });
    if (friendshipData.senderId)
      await friendship.invalidateFriendsCache(friendshipData.senderId);
    if (friendshipData.receiverId)
      await friendship.invalidateFriendsCache(friendshipData.receiverId);
  },

  async getFriends({
    id,
    status,
  }: {
    id: Prisma.UserWhereUniqueInput["id"];
    status: Prisma.EnumFriendshipStatusFilter<"Friendship">;
  }) {
    return await friendship.getFriends({ id, status });
  },

  async removeFriend({
    userId,
    friendId,
  }: {
    userId: string;
    friendId: string;
  }) {
    const friendshipData = await friendship.findFriendshipByUserIds({
      userId,
      friendId,
    });

    if (!friendshipData) {
      throw new Error("Friendship not found");
    }

    await friendship.delete({ id: friendshipData.id });
    if (friendshipData.senderId)
      await friendship.invalidateFriendsCache(friendshipData.senderId);
    if (friendshipData.receiverId)
      await friendship.invalidateFriendsCache(friendshipData.receiverId);
  },
};
