import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import mongoSanitize from "express-mongo-sanitize";
import config from "./config";
import routes from "./routes";
import {
  errorHandler,
  setupSentryErrorHandler,
} from "./middlewares/error.middleware";
import { ApiError } from "./utils/api-error";
import { setupSwagger } from "./swagger";
import {
  sanitizeInput,
  preventParameterPollution,
  setSecurityHeaders,
  validateContentType,
} from "./middlewares/security.middleware";
import mongoose from "mongoose";

const app: Application = express();

// Request logging middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();

  // Log when response finishes
  res.on('finish', () => {
    const duration = Date.now() - start;
    const timestamp = new Date().toISOString();
    const statusColor = res.statusCode >= 400 ? '\x1b[31m' : '\x1b[32m';
    const reset = '\x1b[0m';

    console.log(
      `[${timestamp}] ${req.method} ${req.originalUrl} ${statusColor}${res.statusCode}${reset} ${duration}ms`
    );
  });

  next();
});

// Security headers - Disable CSP for Swagger UI to work
app.use(
  helmet({
    contentSecurityPolicy: false, // Disable CSP to allow Swagger UI
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true,
    },
  })
);

app.use(
  compression({
    threshold: 1024,
    level: 6,
  }) as any
);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like Swagger UI, mobile apps, Postman)
      if (!origin) return callback(null, true);

      // Allow all origins in development
      if (config.nodeEnv === "development") {
        return callback(null, true);
      }

      // In production, allow configured origins + render.com domain
      const allowedOrigins = [
        ...config.allowedOrigins,
        "https://parklane-be.onrender.com", // Allow Swagger UI on Render
      ];

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(null, true); // Be permissive for now, log instead of blocking
        console.warn(`CORS: Allowed non-whitelisted origin: ${origin}`);
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    maxAge: 86400,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use(mongoSanitize());
app.use(sanitizeInput);
app.use(preventParameterPollution);

// Security headers
app.use(setSecurityHeaders);

app.use(validateContentType);


app.get("/health", (req: Request, res: Response) => {
  const healthcheck = {
    status: "success",
    message: "Server is running",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: config.nodeEnv,
    database:
      mongoose.connection.readyState === 1 ? "connected" : "disconnected",
  };
  res.status(200).json(healthcheck);
});

setupSwagger(app);

app.use(`/api`, routes);

app.use("*", (req: Request, res: Response, next: NextFunction) => {
  next(new ApiError(404, `Route ${req.originalUrl} not found`));
});

setupSentryErrorHandler(app);

app.use(errorHandler);

export default app;
