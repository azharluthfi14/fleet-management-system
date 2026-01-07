import { and, eq, isNull } from "drizzle-orm";

import { db } from "@/db";
import { vehicleAssignments } from "@/db/schemas";

import type {
  InsertVehicleAssignment,
  VehicleAssignment,
  VehicleAssignmentRepository,
} from "./vehicle-assignment.types";

export class DrizzleVehicleAssignmentRepository implements VehicleAssignmentRepository {
  async findAll(): Promise<VehicleAssignment[]> {
    return await db.select().from(vehicleAssignments);
  }

  async findById(id: string): Promise<VehicleAssignment | null> {
    const [row] = await db
      .select()
      .from(vehicleAssignments)
      .where(eq(vehicleAssignments.id, id))
      .limit(1);

    return row ?? null;
  }

  async findActiveByDriverId(
    driverId: string
  ): Promise<VehicleAssignment | null> {
    const [row] = await db
      .select()
      .from(vehicleAssignments)
      .where(
        and(
          eq(vehicleAssignments.driverId, driverId),
          eq(vehicleAssignments.status, "assigned"),
          isNull(vehicleAssignments.endAt)
        )
      )
      .limit(1);

    return row ?? null;
  }

  async findActiveByVehicleId(
    vehicleId: string
  ): Promise<VehicleAssignment | null> {
    const [row] = await db
      .select()
      .from(vehicleAssignments)
      .where(
        and(
          eq(vehicleAssignments.vehicleId, vehicleId),
          isNull(vehicleAssignments.endAt)
        )
      )
      .limit(1);

    return row ?? null;
  }

  async create(input: InsertVehicleAssignment): Promise<{ id: string }> {
    const [row] = await db
      .insert(vehicleAssignments)
      .values({
        driverId: input.driverId,
        vehicleId: input.vehicleId,
        status: "assigned",
        startAt: new Date(),
      })
      .returning({ id: vehicleAssignments.id });
    return row;
  }

  async returnAssignment(id: string): Promise<void> {
    await db
      .update(vehicleAssignments)
      .set({
        endAt: new Date(),
        status: "returned",
      })
      .where(eq(vehicleAssignments.id, id));
  }
}
