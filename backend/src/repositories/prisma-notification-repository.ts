import { Prisma } from "@prisma/client";
import { prisma } from "../prisma/index";

export const PrismaNotificationRepository = () => {
  const create = async (data: Prisma.NotificationCreateInput) => {
    await prisma.notification.create({ data });
  };

  const update = async ({ id }: Prisma.NotificationWhereUniqueInput) => {
    await prisma.notification.update({
      where: { id },
      data: { status: "READ" },
    });
  };

  const get = async ({ id }: Prisma.NotificationWhereUniqueInput) => {
    const notification = await prisma.notification.findUnique({
      where: { id },
    });

    return notification;
  };

  const getByUserAndStatus = async ({
    userId,
    status,
  }: Prisma.NotificationWhereInput) => {
    const notifications = await prisma.notification.findMany({
      where: { userId, status },
    });
    return notifications;
  };

  const deleteNotification = async ({
    id,
  }: Prisma.NotificationWhereUniqueInput) => {
    await prisma.notification.delete({ where: { id } });
  };

  return {
    create,
    get,
    getByUserAndStatus,
    update,
    delete: deleteNotification,
  };
};
