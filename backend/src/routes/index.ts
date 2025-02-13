import { Router } from "express";
import userRouter from "./user-router";
import authRouter from "./auth-router";
import notificationRouter from "./notification-router";
import friendshipRouter from "./friendship-router";

const routes = Router();

routes.use("/users", userRouter);
routes.use("/notifications", notificationRouter);
routes.use("/friendships", friendshipRouter);
routes.use("/auth", authRouter);

export default routes;
