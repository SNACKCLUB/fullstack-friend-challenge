import { Router, Request, Response, NextFunction } from "express";
import { authController } from "../controllers/auth-controller";

const authRouter = Router();

authRouter.post(
  "/",
  (request: Request, response: Response, next: NextFunction) => {
    authController.login(request, response, next);
  }
);

authRouter.post(
  "/refresh-token",
  (request: Request, response: Response, next: NextFunction) => {
    authController.refreshToken(request, response, next);
  }
);

export default authRouter;
