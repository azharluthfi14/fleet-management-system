import { pgTable } from "drizzle-orm/pg-core";

export const vehicles = pgTable("vehicles", (table) => ({
  id: table.uuid("id").defaultRandom().primaryKey(),
  plateNumber: table.uuid("plate_number").notNull().unique(),
  name: table.text("name").notNull(),
  type: table.text("type").notNull(),
  capacity: table.text("capacity"),
  isActive: table.boolean("is_active").default(true).notNull(),
  createdAt: table.timestamp("created_at").defaultNow().notNull(),
  updatedAt: table.timestamp("updated_at").defaultNow().notNull(),
}));
