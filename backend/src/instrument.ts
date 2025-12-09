import * as Sentry from "@sentry/node";
import config from "./config";

Sentry.init({
  dsn: config.sentry.dsn,
  environment: config.nodeEnv,
  sendDefaultPii: false,
  tracesSampleRate: config.nodeEnv === "production" ? 0.1 : 1.0,
  profilesSampleRate: config.nodeEnv === "production" ? 0.1 : 1.0,

  integrations: [
    Sentry.mongooseIntegration(),
    Sentry.captureConsoleIntegration({ levels: ["error"] }),
  ],
});

if (config.nodeEnv === "development") {
  console.log("+++ Sentry initialized successfully");
}
