import "dotenv/config"
import { defineConfig } from "drizzle-kit"

const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT } = process.env;
if (
  !POSTGRES_USER ||
  !POSTGRES_PASSWORD ||
  !POSTGRES_DB ||
  !POSTGRES_PORT
) {
  throw new Error("You must specify POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, and POSTGRES_PORT environment variables.");
}

const dbUrl = `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@localhost:${POSTGRES_PORT}/${POSTGRES_DB}`

export default defineConfig({
  dialect: "postgresql",
  out: "./db/migrations",
  schema: "./db/schemas/index.ts",
  strict: true,
  verbose: true,
  dbCredentials: {
    url: dbUrl
  }
});