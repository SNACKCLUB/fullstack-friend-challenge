import { Prisma } from "@prisma/client";
import { PrismaNotificationRepository } from "../repositories/prisma-notification-repository";
import { sendNotification } from "../index";

const notificationRepository = PrismaNotificationRepository();

export const NotificationService = {
  async create(data: Prisma.NotificationCreateInput) {
    const notification = await notificationRepository.create(data);

    sendNotification(notification.userId, notification);
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

  async clean({ userId }: Prisma.NotificationWhereInput) {
    await notificationRepository.clean({ userId });
  },

  async getCountByUser({ userId }: Prisma.NotificationWhereInput) {
    return await notificationRepository.getCountByUser({
      userId,
    });
  },

  async delete({ id }: Prisma.NotificationWhereUniqueInput) {
    await notificationRepository.delete({ id });
  },
};
