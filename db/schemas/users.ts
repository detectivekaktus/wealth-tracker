import { boolean, integer, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { currencies } from "./currencies";
import { relations } from "drizzle-orm";
import { accounts } from "./accounts";
import { goals } from "./goals";
import { storages } from "./storages";
import { transactions } from "./transactions";
import { recurringEvents } from "./recurringEvents"
import { categories } from "./categories";


/**
 * Users table. Meant to store user data.
 * 
 * EmailVerified will be used later on for verifying the user account.
 * Currency is a reference to a Currency table.
 */
export const users = pgTable("users", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  emailVerified: boolean("email_verified").default(false),
  password: text("password").notNull(),
  name: varchar("name", { length: 32 }).notNull(),
  currencyId: integer("preferred_currency").notNull().references(() => currencies.id)
});

export const usersRelations = relations(users, ({ one, many }) => ({
  // Each user has one currency preference.
  // For self references see https://orm.drizzle.team/docs/relations#one-to-one
  preferredCurrency: one(currencies, {
    fields: [users.currencyId],
    references: [currencies.id]
  }),
  
  accounts: many(accounts),
  goals: many(goals),
  storages: many(storages),
  transactions: many(transactions),
  events: many(recurringEvents),
  categories: many(categories)
}));