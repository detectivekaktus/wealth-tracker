import { integer, numeric, pgTable } from "drizzle-orm/pg-core";
import { users } from "./users"
import { categories } from "./categories"
import { relations, sql } from "drizzle-orm";
import { storages } from "./storages";

/**
 * Accounts table. Meant to store bookkeep financial records of users.
 * 
 * StorageId is used in income accounts (isIncome inside category specifies if the account
 * is meant for income). At the end of the month calculate the balance (saldo). If creditAmount
 * is greater than debitAmount, transfer the balance inside the storage. Otherwise substract
 * the balance from the storage.
 * 
 * Numeric is a numeric type which can hold up to 9 digits total (7 before 
 * the decimal point and 2 after it). It's widely used for storing monetar
 * values. See https://www.postgresql.org/docs/current/datatype-numeric.html
 * and https://neon.com/postgresql/postgresql-tutorial/postgresql-numeric for more info
 */
export const accounts = pgTable("accounts", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  userId: integer("user_id").notNull().references(() => users.id),
  categoryId: integer("category_id").notNull().references(() => categories.id),
  storageId: integer("storage_id").references(() => storages.id),
  creditAmount: numeric("credit_amount", { precision: 9, scale: 2 }).notNull().default(sql`0`),
  debitAmount: numeric("debit_amount", { precision: 9, scale: 2 }).notNull().default(sql`0`),
});

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users),
  category: one(categories),
  storage: one(storages)
}));