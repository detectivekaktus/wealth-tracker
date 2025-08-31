import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

/**
 * Currencies table. Meant to be seed with currencies supported
 * by the application.
 * 
 * Code is a 3 characters long code for a currency (EUR, USD, BYN)
 * Symbol is a character symbol for a currency (€, $)
 * Name is a long name for a currency (United States Dollar)
 */
export const currencies = pgTable("currencies", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  code: varchar("code", { length: 4 }).notNull(),
  symbol: varchar("symbol", { length: 4 }).notNull(),
  name: varchar("name", { length: 64 }).notNull()
});