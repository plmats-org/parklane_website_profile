import "module-alias/register";
import "./instrument";
import * as Sentry from "@sentry/node";
import app from "./app";
import config from "./config";
import { connectDatabase } from "./db";
import { createServer } from "http";

const httpServer = createServer(app);

const startServer = async () => {
  try {
    await connectDatabase();
    console.log("+++ MongoDB connected successfully");

    const PORT = config.port || 8000;

    httpServer.listen(PORT, () => {
      console.log(`+++ Server running on port ${PORT}`);
      console.log(`+++ API Documentation: http://localhost:${PORT}/api-docs`);
      console.log(`+++ Environment: ${config.nodeEnv}`);
    });
  } catch (error) {
    console.error("--- Failed to start server:", error);
    Sentry.captureException(error, {
      tags: { context: "server_startup" },
    });
    process.exit(1);
  }
};

process.on("unhandledRejection", (reason: any) => {
  console.error("Unhandled Rejection:", reason);
  Sentry.captureException(new Error(reason), {
    tags: { type: "unhandledRejection" },
  });
  process.exit(1);
});

process.on("uncaughtException", (error: Error) => {
  console.error("Uncaught Exception:", error);
  Sentry.captureException(error, {
    tags: { type: "uncaughtException" },
  });
  process.exit(1);
});

startServer();
