import { Prisma } from "@prisma/client";
import { prisma } from "../prisma/index";
import { redisClient } from "../config/redis";

export const PrismaFriendshipRepository = () => {
  const create = async (data: Prisma.FriendshipCreateInput) => {
    return await prisma.friendship.create({ data });
  };

  const update = async ({
    id,
    data,
  }: {
    id: Prisma.FriendshipWhereUniqueInput["id"];
    data: Prisma.FriendshipUpdateInput;
  }) => {
    return await prisma.friendship.update({ where: { id }, data });
  };

  const get = async ({ id }: Prisma.UserWhereUniqueInput) => {
    return await prisma.friendship.findUnique({ where: { id } });
  };

  const deleteFriendship = async ({
    id,
  }: Prisma.FriendshipWhereUniqueInput) => {
    return await prisma.friendship.delete({ where: { id } });
  };

  const getFriends = async ({
    id,
    status,
  }: {
    id: Prisma.UserWhereUniqueInput["id"];
    status: Prisma.EnumFriendshipStatusFilter<"Friendship">;
  }) => {
    const cacheKey = `friends:${id}:${status}`;

    try {
      const cachedFriends = await redisClient.get(cacheKey);
      if (cachedFriends) return JSON.parse(cachedFriends);
    } catch (cacheError) {
      console.error("Cache error:", cacheError);
    }

    const friendships = await prisma.friendship.findMany({
      where: {
        status,
        OR: [{ senderId: id }, { receiverId: id }],
      },
      include: {
        sender: { select: { id: true, name: true, email: true } },
        receiver: { select: { id: true, name: true, email: true } },
      },
    });

    const formattedData = friendships.map((friendship) => {
      const friend =
        friendship.sender.id === id ? friendship.receiver : friendship.sender;

      return {
        id: friendship.id,
        senderId: friendship.senderId,
        receiverId: friendship.receiverId,
        status: friendship.status,
        createdAt: friendship.createdAt,
        updatedAt: friendship.updatedAt,
        friend,
      };
    });

    try {
      await redisClient.setEx(cacheKey, 3600, JSON.stringify(formattedData));
    } catch (cacheError) {
      console.error("Cache set error:", cacheError);
    }

    return formattedData;
  };

  const invalidateFriendsCache = async (userId: string) => {
    const statuses = ["PENDING", "ACCEPTED", "DECLINED"];

    try {
      for (const status of statuses) {
        const cacheKey = `friends:${userId}:${status}`;
        await redisClient.del(cacheKey);
      }
    } catch (error) {
      console.error("Cache invalidation error:", error);
    }
  };

  const findFriendshipByUserIds = async ({
    userId,
    friendId,
  }: {
    userId: string;
    friendId: string;
  }) => {
    return await prisma.friendship.findFirst({
      where: {
        OR: [
          { senderId: userId, receiverId: friendId },
          { senderId: friendId, receiverId: userId },
        ],
      },
    });
  };

  return {
    create,
    get,
    update,
    delete: deleteFriendship,
    getFriends,
    invalidateFriendsCache,
    findFriendshipByUserIds,
  };
};
