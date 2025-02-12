import { Router, Request, Response, NextFunction } from "express";
import { userController } from "../controllers/user-controller";

const userRouter = Router();

userRouter.post(
  "/",
  async (request: Request, response: Response, next: NextFunction) => {
    return userController.create(request, response, next);
  }
);

userRouter.put(
  "/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    return userController.update(request, response, next);
  }
);

userRouter.get(
  "/getByFilter/:userId",
  async (request: Request, response: Response, next: NextFunction) => {
    return userController.getUsersByFilter(request, response, next);
  }
);

userRouter.get(
  "/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    return userController.get(request, response, next);
  }
);

userRouter.delete(
  "/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    return userController.delete(request, response, next);
  }
);

export default userRouter;
