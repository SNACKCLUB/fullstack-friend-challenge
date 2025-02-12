// index.ts
import express from "express";
import routes from "./routes";
import dotenv from "dotenv";
import cors from "cors";
import { connectRedis, clearRedisDB } from "./config/redis";
import { errorHandler } from "./middleware/errorHandler";

dotenv.config();

const app = express();
const apiUrl = "http://localhost:8080";

app.use(cors());
app.use(express.json());
app.use("/api", routes);
app.use(errorHandler);

const startServer = async () => {
  await connectRedis();

  await clearRedisDB();

  app.listen(8080, () => {
    console.log(`Server is running at ${apiUrl}`);
  });
};

startServer();
