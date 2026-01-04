import { index, pgTable } from "drizzle-orm/pg-core";

import { vehicleStatusEnum } from "./enum";

export const vehicles = pgTable(
  "vehicles",
  (table) => ({
    id: table.uuid("id").defaultRandom().primaryKey(),
    plateNumber: table.text("plate_number").notNull().unique(),
    name: table.text("name").notNull(),
    type: table.text("type").notNull(),
    brand: table.text("brand").notNull(),
    model: table.text("model").notNull(),
    year: table.integer("year").notNull(),
    status: vehicleStatusEnum("status").default("active").notNull(),
    odometer: table.integer("odometer"),
    createdAt: table
      .timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: table
      .timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  }),
  (table) => [index("vehicles_status_idx").on(table.status)]
);
