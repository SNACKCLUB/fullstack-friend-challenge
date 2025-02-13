import express from "express";
import routes from "./routes";
import dotenv from "dotenv";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import { connectRedis, clearRedisDB } from "./config/redis";
import { errorHandler } from "./middleware/errorHandler";

dotenv.config();

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: { origin: "*" },
});

const apiUrl = "http://localhost:8080";

app.use(cors());
app.use(express.json());
app.use("/api", routes);
app.use(errorHandler);

const users: Record<string, string> = {};

io.on("connection", (socket) => {
  console.log("New user connected:", socket.id);

  socket.on("register", (userId: string) => {
    users[userId] = socket.id;
    console.log(`User registred: ${userId} -> ${socket.id}`);
  });

  socket.on("disconnect", () => {
    const userId = Object.keys(users).find((key) => users[key] === socket.id);
    if (userId) {
      delete users[userId];
      console.log(`User disconected: ${userId}`);
    }
  });
});

export const sendNotification = (userId: string, notification: any) => {
  const socketId = users[userId];
  if (socketId) {
    io.to(socketId).emit("notification", notification);
    console.log(`Notificação enviada para ${userId}:`, notification);
  }
};

const startServer = async () => {
  await connectRedis();
  await clearRedisDB();

  server.listen(8080, () => {
    console.log(`Server is running at ${apiUrl}`);
  });
};

startServer();

export { io, users };
