import { NextFunction, Request, Response } from "express";
import { FriendshipService } from "../services/friendship-service";
import { NotificationService } from "../services/notification-service";
import { Prisma } from "@prisma/client";

export const friendshipController = {
  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const data = request.body;

      const friendship = await FriendshipService.create(data);
      await NotificationService.create({
        user: { connect: { id: friendship.receiverId } },
        type: "INVITE",
        friendship: { connect: { id: friendship.id } },
      });

      return response.status(201).send(friendship);
    } catch (error) {
      next(error);
    }
  },

  async get(request: Request, response: Response, next: NextFunction) {
    try {
      const { id } = request.params;

      const friendship = await FriendshipService.get({ id });

      return response.status(200).send(friendship);
    } catch (error) {
      next(error);
    }
  },

  async update(request: Request, response: Response, next: NextFunction) {
    try {
      const { id } = request.params;
      const data = request.body;

      const friendship = await FriendshipService.update({ id, data });

      return response.status(200).send(friendship);
    } catch (error) {
      next(error);
    }
  },

  async delete(request: Request, response: Response, next: NextFunction) {
    try {
      const { id } = request.params;

      await FriendshipService.delete({ id });

      return response.status(204).send();
    } catch (error) {
      next(error);
    }
  },

  async getFriendships(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const { userId } = request.params;
      const { status } = request.query as {
        status: Prisma.EnumFriendshipStatusFilter<"Friendship">;
      };

      const friends = await FriendshipService.getFriends({
        id: userId,
        status,
      });

      return response.status(200).send(friends);
    } catch (error) {
      next(error);
    }
  },

  async removeFriend(request: Request, response: Response, next: NextFunction) {
    try {
      const { userId, friendId } = request.body;

      await FriendshipService.removeFriend({ userId, friendId });

      return response.status(204).send();
    } catch (error) {
      next(error);
    }
  },
};
