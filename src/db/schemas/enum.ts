import { pgEnum } from "drizzle-orm/pg-core";

export const vehicleStatusEnum = pgEnum("vehicle_status", [
  "active",
  "maintenance",
  "inactive",
]);

export const driverStatusEnum = pgEnum("driver_status", [
  "active",
  "inactive",
  "suspended",
]);

export const assignmentStatusEnum = pgEnum("assignment_status", [
  "assigned",
  "returned",
]);
