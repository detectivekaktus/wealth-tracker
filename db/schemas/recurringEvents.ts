import { boolean, integer, numeric, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { users } from "./users";
import { currencies } from "./currencies";
import { categories } from "./categories";
import { storages } from "./storages";
import { relations } from "drizzle-orm";

/**
 * RecurringEvents table. Meant for storing transactions that repeat.
 * 
 * lastUpdate indicates the date and time when the last update fired.
 * nextUpdate however indicates the next date and time when the update will fire.
 * increment is used to calculate the nextUpdate. Increment is an integer value
 * that stores the interval of time in seconds. For example, for an event that occurs
 * once a week the increment value will be 604800 seconds.
 */
export const recurringEvents = pgTable("recurringEvents", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: integer().notNull().references(() => users.id),
  amount: numeric("amount", { precision: 9, scale: 2 }).notNull(),
  isIncome: boolean("income").notNull(),
  currencyId: integer("currency_id").notNull().references(() => currencies.id),
  categoryId: integer("category_id").notNull().references(() => categories.id),
  storageId: integer("storage_id").notNull().references(() => storages.id),
  lastUpdate: timestamp("last_update").notNull().defaultNow(),
  increment: integer("increment").notNull(),
  nextUpdate: timestamp("next_update").notNull(),
  title: varchar("title", { length: 64 }).notNull(),
  description: varchar("description", { length: 1024 }),
  iconUrl: text().notNull()
});

export const recurringEventsRelations = relations(recurringEvents, ({ one }) => ({
  user: one(users, {
    fields: [recurringEvents.userId],
    references: [users.id]
  }),
  currency: one(currencies, {
    fields: [recurringEvents.currencyId],
    references: [currencies.id]
  }),
  category: one(categories, {
    fields: [recurringEvents.categoryId],
    references: [categories.id]
  }),
  storage: one(storages, {
    fields: [recurringEvents.storageId],
    references: [storages.id]
  })
}));