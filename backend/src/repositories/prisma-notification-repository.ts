import { Prisma } from "@prisma/client";
import { prisma } from "../prisma/index";

export const PrismaNotificationRepository = () => {
  const create = async (data: Prisma.NotificationCreateInput) => {
    return await prisma.notification.create({ data });
  };

  const update = async ({ id }: Prisma.NotificationWhereUniqueInput) => {
    await prisma.notification.update({
      where: { id },
      data: { status: "READ" },
    });
  };

  const clean = async ({ userId }: Prisma.NotificationWhereInput) => {
    await prisma.notification.updateMany({
      where: { userId, status: "PENDING" },
      data: { status: "READ" },
    });
  };

  const get = async ({ id }: Prisma.NotificationWhereUniqueInput) => {
    const notification = await prisma.notification.findUnique({
      where: { id },
    });

    return notification;
  };

  const getCountByUser = async ({ userId }: Prisma.NotificationWhereInput) => {
    return await prisma.notification.count({
      where: { userId, status: "PENDING" },
    });
  };

  const deleteNotification = async ({
    id,
  }: Prisma.NotificationWhereUniqueInput) => {
    await prisma.notification.delete({ where: { id } });
  };

  return {
    create,
    get,
    getCountByUser,
    update,
    delete: deleteNotification,
    clean,
  };
};
