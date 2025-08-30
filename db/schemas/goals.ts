import { boolean, integer, numeric, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { users } from "./users" 
import { storages } from "./storages";
import { priorities } from "./priorities"
import { relations } from "drizzle-orm";

/**
 * Goals table. Meant to store financial goals of the users.
 * 
 * Amount is a numeric type which can hold up to 9 digits total (7 before 
 * the decimal point and 2 after it). It's widely used for storing monetar
 * values. See https://www.postgresql.org/docs/current/datatype-numeric.html
 * and https://neon.com/postgresql/postgresql-tutorial/postgresql-numeric for more info
 */
export const goals = pgTable("goals", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  userId: integer("user_id").notNull().references(() => users.id),
  amount: numeric("amount", { precision: 9, scale: 2 }).notNull(),
  done: boolean("done").default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  doneAt: timestamp("done_at"),
  storageId: integer("storage_id").notNull().references(() => storages.id),
  priorityId: integer("priority_id").notNull().references(() => priorities.id),
  title: varchar("title", { length: 64 }).notNull(),
  description: varchar("description", { length: 1024 }),
  iconUrl: text("icon_url").notNull()
});

export const goalsRelations = relations(goals, ({ one }) => ({
  user: one(users),
  storage: one(storages),
  priority: one(priorities)
}));