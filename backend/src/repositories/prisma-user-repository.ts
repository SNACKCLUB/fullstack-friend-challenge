import { Prisma } from "@prisma/client";
import { prisma } from "../prisma/index";

export const PrismaUserRepository = () => {
  const create = async (data: Prisma.UserCreateInput) => {
    const user = await prisma.user.create({ data });
    return user;
  };

  const update = async ({
    id,
    data,
  }: {
    id: Prisma.UserWhereUniqueInput["id"];
    data: Prisma.UserUpdateInput;
  }) => {
    const user = await prisma.user.update({ where: { id }, data });
    return user;
  };

  const get = async ({ id }: Prisma.UserWhereUniqueInput) => {
    const user = await prisma.user.findUnique({ where: { id } });
    return user;
  };

  const getUsersByFilter = async ({
    term,
    userId,
  }: {
    term: string;
    userId: Prisma.UserWhereUniqueInput["id"];
  }) => {
    const users = await prisma.user.findMany({
      where: {
        id: { not: userId },
        OR: [
          { name: { contains: term, mode: "insensitive" } },
          { email: { contains: term, mode: "insensitive" } },
        ],
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    return users;
  };

  const getByEmail = async (email: string) => {
    const user = await prisma.user.findUnique({ where: { email } });
    return user;
  };

  const deleteUser = async ({ id }: Prisma.UserWhereUniqueInput) => {
    const user = await prisma.user.delete({ where: { id } });
    return user;
  };

  return {
    create,
    get,
    getByEmail,
    getUsersByFilter,
    update,
    delete: deleteUser,
  };
};
