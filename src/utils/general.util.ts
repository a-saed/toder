/**
 * Determines the truthiness of a value based on its type and content.
 *
 * @param value - The value to evaluate for truthiness.
 * @returns `true` if the value is truthy, `false` otherwise.
 */

export const isTruthy = (value: any): boolean => {
  if (typeof value === "string") {
    return value.trim() !== "";
  } else if (Array.isArray(value)) {
    return value.length > 0;
  } else {
    return !!value;
  }
};

export function generateUniqueId() {
  const timestamp = Date.now().toString(36); // Convert timestamp to base36 string
  const randomString = Math.random().toString(36).substring(2, 10); // Generate a random string
  return timestamp + randomString;
}
