import { boolean, integer, pgTable, text, varchar } from "drizzle-orm/pg-core";

/**
 * Categories table. Meant to be seed to store predefined categories and
 * custom categories created by users.
 * 
 * To distinguish between categories there's isDefault column which indicates
 * if a category is predefined or not. It simplifies the process of seeding.
 */
export const categories = pgTable("categories", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name", { length: 64 }).notNull().unique(),
  description: varchar("description", { length: 1024 }),
  isIncome: boolean("income").notNull(),
  isDefault: boolean("default").notNull().default(false),
  iconUrl: text("icon_url").notNull()  
})