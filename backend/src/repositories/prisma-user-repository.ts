import { Prisma } from "@prisma/client";
import { prisma } from "../prisma/index";

export const PrismaUserRepository = () => {
  const create = async (data: Prisma.UserCreateInput) => {
    return await prisma.user.create({ data });
  };

  const update = async ({
    id,
    data,
  }: {
    id: Prisma.UserWhereUniqueInput["id"];
    data: Prisma.UserUpdateInput;
  }) => {
    return await prisma.user.update({ where: { id }, data });
  };

  const get = async ({ id }: Prisma.UserWhereUniqueInput) => {
    return await prisma.user.findUnique({ where: { id } });
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
    return await prisma.user.findUnique({ where: { email } });
  };

  const deleteUser = async ({ id }: Prisma.UserWhereUniqueInput) => {
    return await prisma.user.delete({ where: { id } });
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
