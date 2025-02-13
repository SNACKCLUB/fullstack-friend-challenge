import { Router, Request, Response, NextFunction } from "express";
import { notificationController } from "../controllers/notification-controller";

const notificationRouter = Router();

notificationRouter.get(
  "/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    return notificationController.get(request, response, next);
  }
);

notificationRouter.get(
  "/all/:userId",
  async (request: Request, response: Response, next: NextFunction) => {
    return notificationController.getCountByUser(request, response, next);
  }
);

notificationRouter.put(
  "/clean/:userId",
  async (request: Request, response: Response, next: NextFunction) => {
    return notificationController.clean(request, response, next);
  }
);

notificationRouter.post(
  "/",
  async (request: Request, response: Response, next: NextFunction) => {
    return notificationController.create(request, response, next);
  }
);

notificationRouter.put(
  "/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    return notificationController.update(request, response, next);
  }
);

notificationRouter.delete(
  "/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    return notificationController.delete(request, response, next);
  }
);

export default notificationRouter;
