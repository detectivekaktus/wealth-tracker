import { getSeedConnection } from ".";
import * as seeds from "./seeds";
import * as schema from "./schemas"
import { getTableName } from "drizzle-orm";

/**
 * Truncates the table, restarting its serial id from 1.
 * 
 * @param db PostgreSQL connection
 * @param table Table to reset
 */
async function resetTable(db, table) {
  await db.execute(`TRUNCATE TABLE ${getTableName(table)} RESTART IDENTITY CASCADE;`);
}

/**
 * Runs a corrisponding seed for tables specified in the array `seedables`.
 * 
 * The data inside the seedable tables is truncated
 * (https://www.postgresql.org/docs/current/sql-truncate.html) and then reinserted.
 * DO NOT seed tables that contain user-created data, as it will result in data loss.
 */
async function main() {
  const db = getSeedConnection();

  const seedables = [
    schema.categories,
    schema.currencies,
    schema.priorities
  ];

  for (const table of seedables) {
    await resetTable(db, table);
  }

  await seeds.categories(db);
  await seeds.currencies(db);
  await seeds.priorities(db);
}

main();