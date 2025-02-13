import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { UserService } from "../services/user-service";

const registerBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});

export const userController = {
  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const { email, name, password } = registerBodySchema.parse(request.body);

      const user = await UserService.create({ email, name, password });

      return response.status(201).send(user);
    } catch (error) {
      next(error);
    }
  },

  async get(request: Request, response: Response, next: NextFunction) {
    try {
      const { id } = request.params;

      const user = await UserService.get({ id });

      return response.status(200).send(user);
    } catch (error) {
      next(error);
    }
  },

  async getUsersByFilter(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const { userId } = request.params;
      const { term } = request.query;

      const termString = typeof term === "string" ? term : "";

      const users = await UserService.getUsersByFilter({
        term: termString,
        userId,
      });

      return response.status(200).send(users);
    } catch (error) {
      next(error);
    }
  },

  async update(request: Request, response: Response, next: NextFunction) {
    try {
      const { id } = request.params;

      const updateBodySchema = z.object({
        name: z.string().optional(),
        email: z.string().email().optional(),
        password_hash: z.string().min(6).optional(),
      });

      const data = updateBodySchema.parse(request.body);

      await UserService.get({ id });

      const userUpdated = await UserService.update({ id, data });

      return response.status(200).send(userUpdated);
    } catch (error) {
      next(error);
    }
  },

  async delete(request: Request, response: Response, next: NextFunction) {
    try {
      const { id } = request.params;

      await UserService.get({ id });
      await UserService.delete({ id });

      return response.status(204).send();
    } catch (error) {
      next(error);
    }
  },
};
