import { pgTable, uniqueIndex } from "drizzle-orm/pg-core";

import { drivers } from "./drivers";
import { assignmentStatusEnum } from "./enum";
import { vehicles } from "./vehicles";

export const vehicleAssignments = pgTable(
  "vehicle_assignments",
  (table) => ({
    id: table.uuid("id").defaultRandom().primaryKey(),
    driverId: table
      .uuid("driver_id")
      .notNull()
      .references(() => drivers.id, { onDelete: "restrict" }),
    vehicleId: table
      .uuid("vehicle_id")
      .notNull()
      .references(() => vehicles.id, { onDelete: "restrict" }),
    startAt: table
      .timestamp("start_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    endAt: table.timestamp("end_at", { withTimezone: true }),
    status: assignmentStatusEnum("status").default("assigned").notNull(),
    createdAt: table
      .timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  }),
  (table) => [
    uniqueIndex("active_driver_assignment_idx").on(table.driverId),
    uniqueIndex("active_vehicle_assignment_idx").on(table.vehicleId),
  ]
);
