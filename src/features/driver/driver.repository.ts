import { eq } from "drizzle-orm";

import { db } from "@/db";
import { drivers } from "@/db/schemas";

import type {
  Driver,
  DriverRepository,
  InsertDriver,
  UpdateDriver,
} from "./driver.types";

export class DrizzleDriverRepository implements DriverRepository {
  async findAll(): Promise<Driver[]> {
    return db.select().from(drivers);
  }

  async findById(driverId: string): Promise<Driver | null> {
    const result = await db
      .select()
      .from(drivers)
      .where(eq(drivers.id, driverId))
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

  async delete(driverId: string): Promise<void> {
    await db.delete(drivers).where(eq(drivers.id, driverId));
  }
}
