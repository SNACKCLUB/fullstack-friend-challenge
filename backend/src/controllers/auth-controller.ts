import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/auth-service";
import { z } from "zod";

const authBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const authController = {
  async login(request: Request, response: Response, next: NextFunction) {
    try {
      const { email, password } = authBodySchema.parse(request.body);

      const tokens = await AuthService.login(email, password);

      return response.status(200).json(tokens);
    } catch (error) {
      next(error);
    }
  },

  async refreshToken(request: Request, response: Response, next: NextFunction) {
    try {
      const { refreshToken } = request.body;

      if (!refreshToken) {
        return response
          .status(400)
          .json({ message: "Refresh token is required" });
      }

      const tokens = await AuthService.refreshToken(refreshToken);

      return response.status(200).json(tokens);
    } catch (error) {
      next(error);
    }
  },
};
