import { eq } from "drizzle-orm";

import { db } from "@/db";
import { vehicles } from "@/db/schemas";
import type {
  CreateVehicleInput,
  UpdateVehicleInput,
  Vehicle,
  VehicleRepository,
} from "@/features/vehicle";

export class DrizzleVehicleRepository implements VehicleRepository {
  async list(): Promise<Vehicle[]> {
    return db.select().from(vehicles);
  }

  async findById(id: string): Promise<Vehicle | null> {
    const result = await db
      .select()
      .from(vehicles)
      .where(eq(vehicles.id, id))
      .limit(1);

    return result[0] ?? null;
  }

  async create(input: CreateVehicleInput): Promise<{ id: string }> {
    const [row] = await db
      .insert(vehicles)
      .values({
        plateNumber: input.plateNumber,
        name: input.name,
        brand: input.brand,
        model: input.model,
        year: input.year,
        type: input.type,
        status: input.status ?? "active",
        odometer: input.odometer,
      })
      .returning({ id: vehicles.id });

    return row;
  }

  async update(vehicleId: string, input: UpdateVehicleInput): Promise<void> {
    await db
      .update(vehicles)
      .set(input)
      .where(eq(vehicles.id, vehicleId))
      .returning();
  }

  async delete(id: string): Promise<void> {
    await db.delete(vehicles).where(eq(vehicles.id, id));
  }
}
