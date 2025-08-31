import { boolean, integer, pgTable, text, varchar } from "drizzle-orm/pg-core";

/**
 * Categories table. Meant to be seed to store predefined categories.
 */
export const categories = pgTable("categories", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name", { length: 64 }).notNull(),
  description: varchar("description", { length: 1024 }),
  isIncome: boolean("income").notNull(),
  iconUrl: text("icon_url").notNull()  
})