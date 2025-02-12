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
  "/all/:userId/:status",
  async (request: Request, response: Response, next: NextFunction) => {
    return notificationController.getByUserAndStatus(request, response, next);
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
