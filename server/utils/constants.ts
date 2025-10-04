import "dotenv/config";

export const SALT_ROUNDS = 6;

export const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);