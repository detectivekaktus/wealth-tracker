import "dotenv/config"
import { drizzle } from "drizzle-orm/node-postgres";
import { dbUrl } from "../drizzle.config";
import { Pool } from "pg";

export function getSeedConnection() {
  return drizzle(new Pool({
    connectionString: dbUrl,
    max: 1 // it should not allow any parallel insertions when seeding
  }));
}

export const db = drizzle(dbUrl);