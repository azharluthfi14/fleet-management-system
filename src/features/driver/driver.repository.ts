import { and, eq, isNull } from "drizzle-orm";

import { db } from "@/db";
import { drivers, vehicleAssignments, vehicles } from "@/db/schemas";

import type {
  Driver,
  DriverRepository,
  DriverWithAssignment,
  InsertDriver,
  UpdateDriver,
} from "./driver.types";

export class DrizzleDriverRepository implements DriverRepository {
  async findAll(): Promise<Driver[]> {
    return db.select().from(drivers).where(isNull(drivers.deletedAt));
  }

  async findById(driverId: string): Promise<Driver | null> {
    const result = await db
      .select()
      .from(drivers)
      .where(and(eq(drivers.id, driverId), isNull(drivers.deletedAt)))
      .limit(1);

    return result[0] ?? null;
  }

  async findByLicenseNumber(licenseNumber: string): Promise<Driver | null> {
    const result = await db
      .select()
      .from(drivers)
      .where(eq(drivers.licenseNumber, licenseNumber))
      .limit(1);

    return result[0] ?? null;
  }

  async create(input: InsertDriver): Promise<{ id: string }> {
    const [row] = await db
      .insert(drivers)
      .values({
        fullName: input.fullName,
        licenseNumber: input.licenseNumber,
        licenseExpiry: input.licenseExpiry,
        phone: input.phone,
        status: input.status ?? "active",
        userId: input.userId,
      })
      .returning({ id: drivers.id });

    return row;
  }

  async update(driverId: string, input: UpdateDriver): Promise<void> {
    await db
      .update(drivers)
      .set(input)
      .where(eq(drivers.id, driverId))
      .returning();
  }

  async softDelete(driverId: string): Promise<void> {
    await db
      .update(drivers)
      .set({
        status: "inactive",
        deletedAt: new Date(),
      })
      .where(eq(drivers.id, driverId));
  }

  async isCurrentlyAssigned(driverId: string): Promise<boolean> {
    const result = await db
      .select({ id: vehicleAssignments.id })
      .from(vehicleAssignments)
      .where(
        and(
          eq(vehicleAssignments.driverId, driverId),
          eq(vehicleAssignments.status, "assigned"),
          isNull(vehicleAssignments.endAt)
        )
      )
      .limit(1);

    return result.length > 0;
  }

  async findByIdWithAssignments(
    driverId: string
  ): Promise<DriverWithAssignment | null> {
    const result = await db
      .select({
        driver: drivers,
        assignments: vehicleAssignments,
        vehicle: vehicles,
      })
      .from(drivers)
      .leftJoin(
        vehicleAssignments,
        and(
          eq(vehicleAssignments.driverId, drivers.id),
          eq(vehicleAssignments.status, "assigned")
        )
      )
      .leftJoin(vehicles, eq(vehicles.id, vehicleAssignments.vehicleId))
      .where(eq(drivers.id, driverId))
      .limit(1);

    const row = result[0];
    if (!row) return null;

    return {
      id: row.driver.id,
      fullName: row.driver.fullName,
      phone: row.driver.phone,
      licenseNumber: row.driver.licenseNumber,
      licenseExpiry: row.driver.licenseExpiry,
      status: row.driver.status,
      deletedAt: row.driver.deletedAt,
      assignment: row.assignments
        ? {
            id: row.assignments.id,
            startAt: row.assignments.startAt,
            vehicle: {
              id: row.vehicle!.id,
              plateNumber: row.vehicle!.plateNumber,
              name: row.vehicle!.name,
            },
          }
        : null,
    };
  }
}
