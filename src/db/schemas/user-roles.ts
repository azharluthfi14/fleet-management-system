import { pgTable, primaryKey } from "drizzle-orm/pg-core";

import { roles } from "./roles";
import { users } from "./users";

export const userRoles = pgTable(
  "user_roles",
  (table) => ({
    userId: table
      .uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    roleId: table
      .uuid("role_id")
      .notNull()
      .references(() => roles.id, { onDelete: "cascade" }),
    createdAt: table
      .timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  }),
  (table) => [primaryKey({ columns: [table.userId, table.roleId] })]
);
