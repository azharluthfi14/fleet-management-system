import { index, pgTable } from "drizzle-orm/pg-core";

import { users } from "./users";

export const sessions = pgTable(
  "sessions",
  (table) => ({
    id: table.uuid().defaultRandom().primaryKey(),
    userId: table
      .uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    expiresAt: table.timestamp("expires_at", { withTimezone: true }).notNull(),
    revokedAt: table.timestamp("revoked_at", { withTimezone: true }),
    userAgent: table.varchar("user_agent", { length: 255 }),
    ipAddress: table.varchar("ip_address", { length: 100 }),

    createdAt: table
      .timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  }),
  (table) => [
    index("sessions_user_id_idx").on(table.userId),
    index("sessions_expires_at_idx").on(table.expiresAt),
  ]
);
