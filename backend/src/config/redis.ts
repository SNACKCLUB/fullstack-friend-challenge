import { createClient } from "redis";

const redisClient = createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379",
});

redisClient.on("error", (err) => console.error("Redis Client Error", err));

const connectRedis = async () => {
  try {
    await redisClient.connect();
    console.log("Connected to Redis");
  } catch (error) {
    console.error("Redis connection error:", error);
    setTimeout(connectRedis, 5000);
  }
};

const clearRedisDB = async () => {
  try {
    await redisClient.flushDb();
    console.log("Redis DB cleared");
  } catch (error) {
    console.error("Error cleaning", error);
  }
};

export { redisClient, connectRedis, clearRedisDB };
