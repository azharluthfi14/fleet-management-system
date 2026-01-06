import { and, eq, isNull } from "drizzle-orm";

import { db } from "@/db";
import { drivers, vehicleAssignments } from "@/db/schemas";

import type {
  Driver,
  DriverRepository,
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
}
