// src/services/auth-service.ts

import { PrismaUserRepository } from "../repositories/prisma-user-repository";
import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";

const userRepository = PrismaUserRepository();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "access_secret";
const REFRESH_TOKEN_SECRET =
  process.env.REFRESH_TOKEN_SECRET || "refresh_secret";

export const AuthService = {
  async login(email: string, password: string) {
    const user = await userRepository.getByEmail(email);

    if (!user) {
      throw new Error("User not found");
    }

    const passwordMatch = await compare(password, user.passwordHash);

    if (!passwordMatch) {
      throw new Error("Invalid credentials");
    }

    const accessToken = jwt.sign({ userId: user.id }, ACCESS_TOKEN_SECRET, {
      expiresIn: "15m",
    });

    const refreshToken = jwt.sign({ userId: user.id }, REFRESH_TOKEN_SECRET, {
      expiresIn: "7d",
    });

    return { accessToken, refreshToken };
  },

  async refreshToken(token: string) {
    try {
      const payload = jwt.verify(token, REFRESH_TOKEN_SECRET) as {
        userId: string;
      };

      const newAccessToken = jwt.sign(
        { userId: payload.userId },
        ACCESS_TOKEN_SECRET,
        {
          expiresIn: "15m",
        }
      );

      return { accessToken: newAccessToken };
    } catch (error) {
      console.error(error);
    }
  },
};
