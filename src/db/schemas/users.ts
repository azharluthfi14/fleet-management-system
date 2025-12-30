import { index, pgTable } from "drizzle-orm/pg-core";

export const users = pgTable(
  "users",
  (table) => ({
    id: table.uuid().defaultRandom().primaryKey(),
    email: table.varchar("email", { length: 255 }).notNull().unique(),
    passwordHash: table.varchar("password_hash", { length: 255 }).notNull(),
    name: table.varchar("name", { length: 255 }).notNull(),
    isActive: table.boolean("is_active").default(true).notNull(),
    createdAt: table
      .timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: table
      .timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  }),
  (table) => [index("users_email_idx").on(table.email)]
);
