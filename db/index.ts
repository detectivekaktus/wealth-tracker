import "dotenv/config"
import { drizzle } from "drizzle-orm/node-postgres";
import { dbUrl } from "../drizzle.config";

export const db = drizzle(dbUrl);