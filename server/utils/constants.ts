import "dotenv/config";

export const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);
export const REFRESH_SECRET = new TextEncoder().encode(process.env.REFRESH_SECRET);