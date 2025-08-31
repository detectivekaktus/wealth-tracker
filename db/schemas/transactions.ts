import { boolean, integer, numeric, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { users } from "./users"
import { currencies } from "./currencies";
import { accounts } from "./accounts"
import { categories } from "./categories";
import { relations } from "drizzle-orm";

/**
 * Transactions table. Meant for storing user-generated transactions.
 * 
 * CategoryId isn't inherited from either accounts because there are different cases
 * when categoryId doesn't match between accounts. Think of an income vs spending.
 */
export const transactions = pgTable("transactions", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: integer("user_id").notNull().references(() => users.id),
  amount: numeric("amount", { precision: 9, scale: 2 }).notNull(),
  currencyId: integer("currency_id").notNull().references(() => currencies.id),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
  creditAccountId: integer("credit_account_id").references(() => accounts.id),
  debitAccountId: integer("debit_account_id").references(() => accounts.id),
  isIncome: boolean("income").notNull(),
  categoryId: integer("category_id").notNull().references(() => categories.id),
  title: varchar("title", { length: 64 }).notNull(),
  description: varchar("description", { length: 1024 }),
  iconUrl: text("icon_url").notNull()
});

export const transactionsRelations = relations(transactions, ({ one }) => ({
  user: one(users, {
    fields: [transactions.userId],
    references: [users.id]
  }),
  currency: one(currencies, {
    fields: [transactions.currencyId],
    references: [currencies.id]
  }),
  creditAccount: one(accounts, {
    fields: [transactions.creditAccountId],
    references: [accounts.id]
  }),
  debitAccount: one(accounts, {
    fields: [transactions.debitAccountId],
    references: [accounts.id]
  }),
  category: one(categories, {
    fields: [transactions.categoryId],
    references: [categories.id]
  })
}));