import dotenv from "dotenv";
import path from "path";
import { EnvConfig } from "../types";

dotenv.config({ path: path.join(__dirname, "../../.env") });

const config: EnvConfig = {
  nodeEnv: process.env.NODE_ENV,
  port: parseInt(process.env.PORT || "8000", 10),
  mongodbUri: process.env.MONGODB_URI || "",
  jwt: {
    secret: process.env.JWT_SECRET || "secret",
    expiresIn: process.env.JWT_EXPIRES_IN,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
  },
  superadmin: {
    first_name: process.env.SUPERADMIN_FIRST_NAME,
    last_name: process.env.SUPERADMIN_LAST_NAME,
    email: process.env.SUPERADMIN_EMAIL,
    phone: process.env.SUPERADMIN_PHONE,
    password: process.env.SUPERADMIN_PASSWORD,
  },
  allowedOrigins: process.env.ALLOWED_ORIGINS?.split(",") || [],
  socketPort: parseInt(process.env.SOCKET_PORT || "8001", 10),
  sentry: {
    dsn: process.env.SENTRY_DSN || "",
    environment: process.env.NODE_ENV || "development",
    tracesSampleRate: parseFloat(
      process.env.SENTRY_TRACES_SAMPLE_RATE || "1.0"
    ),
  },
  frontend: {
    url: process.env.FRONTEND_URL || "http://localhost:3000",
  },
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || "",
    apiKey: process.env.CLOUDINARY_API_KEY || "",
    apiSecret: process.env.CLOUDINARY_API_SECRET || "",
  },
};

export default config;
