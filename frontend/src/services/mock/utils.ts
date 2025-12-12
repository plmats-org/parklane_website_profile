// Mock utility functions

/**
 * Simulates API delay for mock responses
 * @param ms - Delay in milliseconds (default: 1500)
 */
export const delay = (ms: number = 1500): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));
