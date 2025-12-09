export * from "./user.types";
export * from "./auth.types";
export * from "./response.types";

// Environment types
export interface EnvConfig {
  nodeEnv?: string;
  port: number;
  mongodbUri: string;
  jwt: {
    secret: string;
    expiresIn?: string;
    refreshSecret?: string;
    refreshExpiresIn?: string;
  };
  superadmin: {
    first_name?: string;
    last_name?: string;
    email?: string;
    phone?: string;
    password?: string;
  };
  allowedOrigins: string[];
  socketPort: number;
  sentry: {
    dsn: string;
    environment: string;
    tracesSampleRate: number;
  };
  frontend: {
    url: string;
  };
}
