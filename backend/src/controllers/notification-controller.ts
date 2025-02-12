import { NextFunction, Request, Response } from "express";
import { NotificationService } from "../services/notification-service";
import { Prisma } from "@prisma/client";
import { UserService } from "../services/user-service";

export const notificationController = {
  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const data = request.body;

      await NotificationService.create(data);

      return response.status(201).send();
    } catch (error) {
      next(error);
    }
  },

  async get(request: Request, response: Response, next: NextFunction) {
    try {
      const { id } = request.params;

      const notification = await NotificationService.get({ id });

      return response.status(200).send(notification);
    } catch (error) {
      next(error);
    }
  },

  async getByUserAndStatus(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const { userId, status } = request.params;

      await UserService.get({ id: userId });

      const notifications = await NotificationService.getByUserAndStatus({
        userId,
        status: status as Prisma.EnumStatusNotificationFilter<"Notification">,
      });

      return response.status(200).send(notifications);
    } catch (error) {
      next(error);
    }
  },

  async update(request: Request, response: Response, next: NextFunction) {
    try {
      const { id } = request.params;

      await NotificationService.get({ id });

      await NotificationService.update({ id });

      return response.status(200).send();
    } catch (error) {
      next(error);
    }
  },

  async delete(request: Request, response: Response, next: NextFunction) {
    try {
      const { id } = request.params;

      await NotificationService.get({ id });

      await NotificationService.delete({ id });

      return response.status(204).send();
    } catch (error) {
      next(error);
    }
  },
};
