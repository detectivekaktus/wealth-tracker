import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

/**
 * Priorities table. Meant to store priorities levels for goals
 * user can create.
 * 
 * Name is a displayed name of the priority ("Low", "Mid", "High")
 * Value is a numeric value of the priority (0, 1, 2)
 */
export const priorities = pgTable("priorities", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name", { length: 32 }).notNull().unique(),
  value: integer("value").notNull().unique()
})