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
      .values(input)
      .returning({ id: vehicles.id });

    return row;
  }

  async update(input: UpdateVehicleInput): Promise<void> {
    const { id, ...data } = input;

    await db.update(vehicles).set(data).where(eq(vehicles.id, id));
  }

  async delete(id: string): Promise<void> {
    await db.delete(vehicles).where(eq(vehicles.id, id));
  }
}
