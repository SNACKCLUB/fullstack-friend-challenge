import { Router, Request, Response, NextFunction } from "express";
import { friendshipController } from "../controllers/friendship-controller";

const friendshipRouter = Router();

friendshipRouter.post(
  "/",
  async (request: Request, response: Response, next: NextFunction) => {
    return friendshipController.create(request, response, next);
  }
);

friendshipRouter.put(
  "/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    return friendshipController.update(request, response, next);
  }
);

friendshipRouter.get(
  "/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    return friendshipController.get(request, response, next);
  }
);

friendshipRouter.delete(
  "/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    return friendshipController.delete(request, response, next);
  }
);

friendshipRouter.post(
  "/remove",
  async (request: Request, response: Response, next: NextFunction) => {
    return friendshipController.removeFriend(request, response, next);
  }
);

friendshipRouter.get(
  "/:userId/friends",
  async (request: Request, response: Response, next: NextFunction) => {
    return friendshipController.getFriendships(request, response, next);
  }
);

export default friendshipRouter;
