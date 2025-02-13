import { Prisma } from "@prisma/client";
import { PrismaUserRepository } from "../repositories/prisma-user-repository";
import { hash } from "bcryptjs";

const userRepository = PrismaUserRepository();

export const UserService = {
  async create(
    data: Omit<Prisma.UserCreateInput, "passwordHash"> & { password: string }
  ) {
    const { email, name, password } = data;

    const userWithSameEmail = await userRepository.getByEmail(email);

    if (userWithSameEmail) {
      throw new Error("E-mail already exists");
    }

    const passwordHash = await hash(password, 2);

    const user = await userRepository.create({
      email,
      name,
      passwordHash,
    });

    return user;
  },

  async get({ id }: Prisma.UserWhereUniqueInput) {
    const user = await userRepository.get({ id });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  },

  async getUsersByFilter({
    term,
    userId,
  }: {
    term: string;
    userId: Prisma.UserWhereUniqueInput["id"];
  }) {
    const users = await userRepository.getUsersByFilter({ term, userId });

    return users;
  },

  async update({
    id,
    data,
  }: {
    id: Prisma.UserWhereUniqueInput["id"];
    data: Prisma.UserUpdateInput;
  }) {
    if (data.passwordHash) {
      data.passwordHash = await hash(data.passwordHash as string, 2);
    }

    const updatedUser = await userRepository.update({ id, data });

    return updatedUser;
  },

  async delete({ id }: Prisma.UserWhereUniqueInput) {
    await userRepository.delete({ id });
  },
};
