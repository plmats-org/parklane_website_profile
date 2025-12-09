import { Model } from "mongoose";

/**
 * Generates a unique reference number for a document
 * Format: {prefix}{timestamp}{random} (e.g., P02HK8UW)
 *
 * @param model - Mongoose model to check uniqueness against
 * @param prefix - Prefix for the reference (e.g., "P" for Payment)
 * @param fieldName - Name of the field to check uniqueness (e.g., "ref")
 * @param length - Total length of the reference (default: 8)
 * @param maxAttempts - Maximum attempts to generate unique reference (default: 50)
 * @returns The generated unique reference number
 */
export const generateReferenceNumber = async <T>(
  model: Model<T>,
  prefix: string,
  fieldName: string = "ref",
  length: number = 8,
  maxAttempts: number = 50
): Promise<string> => {
  let isUnique = false;
  let attempts = 0;
  let referenceNumber = "";

  while (!isUnique && attempts < maxAttempts) {
    // Generate timestamp part (base36, uppercase)
    const timestamp = Date.now().toString(36).toUpperCase();
    const truncatedTimestamp = timestamp.slice(-4); // Last 4 chars

    // Generate random part (base36, uppercase)
    const randomLength = length - prefix.length - 4; // Remaining length after prefix and timestamp
    const randomPart = Math.random()
      .toString(36)
      .substring(2, 2 + randomLength)
      .toUpperCase()
      .padEnd(randomLength, "0"); // Pad with zeros if needed

    referenceNumber = `${prefix}${truncatedTimestamp}${randomPart}`;

    // Check if reference already exists
    const existingRecord = await model.findOne({
      [fieldName]: referenceNumber,
    } as any);

    if (!existingRecord) {
      isUnique = true;
    } else {
      attempts++;
      // Add small delay to ensure different timestamp on retry
      await new Promise((resolve) => setTimeout(resolve, 1));
    }
  }

  if (!isUnique) {
    throw new Error(
      `Failed to generate a unique ${fieldName} after ${maxAttempts} attempts`
    );
  }

  return referenceNumber;
};
