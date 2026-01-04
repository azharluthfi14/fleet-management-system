import { pgEnum } from "drizzle-orm/pg-core";

export const vehicleStatusEnum = pgEnum("vehicle_status", [
  "active",
  "maintenance",
  "inactive",
]);
