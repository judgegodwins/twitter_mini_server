import { v2 as cloudinary } from "cloudinary";
import config from "./config";
import { createConnection } from "./database";
import { errorHandler, notFoundHandler } from "./middleware/handlers";
// import { createRedisConnection } from "./database/redis";

export default async () => {
  // const redisConnection = await createRedisConnection();
  const dbConnection = await createConnection();

  cloudinary.config({
    cloud_name: config.cloudinary.cloudName,
    api_key: config.cloudinary.apiKey,
    api_secret: config.cloudinary.apiSecret,
    secure: true
  });

  const app = (await import("./app")).default;
  const router = (await import("./router")).default;

  app.use(router);
  app.use(notFoundHandler);
  app.use(errorHandler);

  return {
    // redisConnection,
    dbConnection,
    app,
  };
};
