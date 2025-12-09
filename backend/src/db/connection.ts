import mongoose from "mongoose";
import config from "../config";
import { captureException, logMessage } from "../utils/sentry";

export const connectDatabase = async (): Promise<void> => {
  try {
    const options = {
      maxPoolSize: 10,
      minPoolSize: 2,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      maxIdleTimeMS: 30000,
      compressors: ["zlib" as const],
    };

    if (config.nodeEnv === "development") {
      mongoose.set(
        "debug",
        (collectionName: string, method: string, query: any) => {
          const start = Date.now();
          const duration = Date.now() - start;

          // Log slow queries (> 100ms)
          if (duration > 100) {
            console.warn(
              `Slow Query: ${collectionName}.${method} took ${duration}ms`
            );
          }
        }
      );
    }

    await mongoose.connect(config.mongodbUri, options);
    mongoose.connection.on("error", (error) => {
      console.error("MongoDB connection error:", error);
      captureException(error, { context: "mongodb_connection" });
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("MongoDB disconnected. Attempting to reconnect...");
      logMessage("MongoDB disconnected", "warning");
    });

    mongoose.connection.on("reconnected", () => {
      console.log("MongoDB reconnected");
      logMessage("MongoDB reconnected", "info");
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    captureException(error as Error, { context: "mongodb_startup" });
    process.exit(1);
  }
};

export const disconnectDatabase = async (): Promise<void> => {
  try {
    await mongoose.disconnect();
    console.log("MongoDB disconnected");
  } catch (error) {
    console.error("Error disconnecting from MongoDB:", error);
    captureException(error as Error, { context: "mongodb_disconnect" });
  }
};
