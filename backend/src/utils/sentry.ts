import * as Sentry from "@sentry/node";

/**
 * Sentry Utility Functions
 *
 * Note: Sentry initialization happens in instrument.ts
 * These are helper functions for common Sentry operations
 */

/**
 * Capture exception with Sentry
 */
export function captureException(
  error: Error,
  context?: Record<string, any>
): void {
  Sentry.captureException(error, {
    extra: context,
  });
}

/**
 * Log error to Sentry
 */
export function logError(
  message: string,
  error?: Error,
  context?: Record<string, any>
): void {
  if (error) {
    Sentry.captureException(error, {
      extra: { message, ...context },
    });
  } else {
    Sentry.captureMessage(message, {
      level: "error",
      extra: context,
    });
  }
}

/**
 * Log message to Sentry
 */
export function logMessage(
  message: string,
  level: Sentry.SeverityLevel = "info",
  context?: Record<string, any>
): void {
  Sentry.captureMessage(message, {
    level,
    extra: context,
  });
}

/**
 * Set user context for Sentry
 */
export function setUser(user: {
  id: string;
  email?: string;
  username?: string;
}): void {
  Sentry.setUser(user);
}

/**
 * Clear user context
 */
export function clearUser(): void {
  Sentry.setUser(null);
}

/**
 * Add breadcrumb for debugging
 */
export function addBreadcrumb(
  message: string,
  data?: Record<string, any>
): void {
  Sentry.addBreadcrumb({
    message,
    data,
    level: "info",
  });
}

// Export Sentry for advanced usage
export { Sentry };
