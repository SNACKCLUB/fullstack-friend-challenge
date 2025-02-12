import { Prisma } from "@prisma/client";
import { PrismaNotificationRepository } from "../repositories/prisma-notification-repository";

const notificationRepository = PrismaNotificationRepository();

export const NotificationService = {
  async create(data: Prisma.NotificationCreateInput) {
    await notificationRepository.create(data);
  },

  async get({ id }: Prisma.NotificationWhereUniqueInput) {
    const notification = await notificationRepository.get({ id });

    if (!notification) {
      return new Error("Notification not found");
    }

    return notification;
  },

  async update({ id }: Prisma.NotificationWhereUniqueInput) {
    await notificationRepository.update({ id });
  },

  async getByUserAndStatus({ userId, status }: Prisma.NotificationWhereInput) {
    const notifications = await notificationRepository.getByUserAndStatus({
      userId,
      status,
    });

    if (!notifications) {
      throw new Error("Notifications not found");
    }

    return notifications;
  },

  async delete({ id }: Prisma.NotificationWhereUniqueInput) {
    await notificationRepository.delete({ id });
  },
};
