import { integer, numeric, pgTable, varchar } from "drizzle-orm/pg-core";
import { users } from "./users"
import { currencies } from "./currencies";
import { relations, sql } from "drizzle-orm";

/**
 * Storages table. Meant to store user savings.
 * 
 * UserId is a reference to a user inside Users table.
 * CurrencyId is a reference to a usable currency inside Currencies table.
 * Amount is a numeric type which can hold up to 9 digits total (7 before 
 * the decimal point and 2 after it). It's widely used for storing monetar
 * values. See https://www.postgresql.org/docs/current/datatype-numeric.html
 * and https://neon.com/postgresql/postgresql-tutorial/postgresql-numeric for more info
 */
export const storages = pgTable("storages", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  userId: integer("user_id").notNull().references(() => users.id),
  currencyId: integer("currency_id").notNull().references(() => currencies.id),
  // 9 digits total: 7 before the decimal point and 2 after
  amount: numeric("amount", { precision: 9, scale: 2 }).notNull().default(sql`0`),
  title: varchar("title", { length: 64 }).notNull(),
  description: varchar("description", { length: 512 })
});

export const storagesRelations = relations(storages, ({ one }) => ({
  user: one(users),
  currency: one(currencies)
}));