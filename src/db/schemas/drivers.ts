import { index, pgTable, uniqueIndex } from "drizzle-orm/pg-core";

import { driverStatusEnum } from "./enum";
import { users } from "./users";

export const drivers = pgTable(
  "drivers",
  (table) => ({
    id: table.uuid("id").defaultRandom().primaryKey(),
    userId: table
      .uuid("user_id")
      .references(() => users.id, { onDelete: "set null" }),
    fullName: table.text("full_name").notNull(),
    phone: table.text("phone"),
    licenseNumber: table.text("license_number").notNull(),
    licenseExpiry: table.date("license_expiry"),
    status: driverStatusEnum("status").default("active").notNull(),
    createdAt: table
      .timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: table
      .timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .$onUpdate(() => new Date()),
    deletedAt: table.timestamp("deleted_at", { withTimezone: true }),
  }),
  (table) => [
    uniqueIndex("drivers_license_number_idx").on(table.licenseNumber),
    index("drivers_status_idx").on(table.status),
  ]
);
