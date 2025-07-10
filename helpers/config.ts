import dotenv from "dotenv";
import path from "path";
import fs from "fs";

const envFilePath = path.resolve(process.cwd(), ".env");
if (!fs.existsSync(envFilePath)) {
  throw new Error(
    `FATAL ERROR: .env file not found at ${envFilePath}. Please create one.`
  );
}

dotenv.config({ path: envFilePath });

/**
 * Retrieves an environment variable strictly.
 * @param key The key of the environment variable.
 * @returns The value of the environment variable.
 * @throws Error if the variable is not set in process.env (e.g., not in the .env file).
 */
function getEnv(key: string): string {
  const value = process.env[key];

  if (value === undefined) {
    throw new Error(
      `Environment variable '${key}' is not set in the .env file.`
    );
  }
  return value;
}

export const config = {
  qabuddyBaseUrl: getEnv("QABUDDY_BASE_URL"),
  qabuddyApiBaseUrl: getEnv("QABUDDY_API_BASE_URL"),
  qabuddyEmail: getEnv("QABUDDY_EMAIL"),
  qabuddyPassword: getEnv("QABUDDY_PASSWORD"),
  nodeEnv: process.env.NODE_ENV || "development",
};
