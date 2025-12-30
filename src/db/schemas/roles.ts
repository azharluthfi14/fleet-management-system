import { pgTable } from "drizzle-orm/pg-core";

export const roles = pgTable("roles", (table) => ({
  id: table.uuid().defaultRandom().primaryKey(),
  name: table.varchar("name", { length: 100 }).notNull().unique(),
  createdAt: table
    .timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
}));
