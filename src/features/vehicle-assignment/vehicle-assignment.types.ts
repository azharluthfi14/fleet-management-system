import type { InferInsertModel, InferSelectModel } from "drizzle-orm";

import type { vehicleAssignments } from "@/db/schemas";

export type VehicleAssignment = InferSelectModel<typeof vehicleAssignments>;
export type InsertVehicleAssignment = InferInsertModel<
  typeof vehicleAssignments
>;
export type UpdateVehicleAssignment = Partial<InsertVehicleAssignment>;

export interface VehicleAssignmentRepository {
  findActiveByDriverId(driverId: string): Promise<VehicleAssignment | null>;
  findActiveByVehicleId(vehicleId: string): Promise<VehicleAssignment | null>;
  findById(id: string): Promise<VehicleAssignment | null>;
  findAll(): Promise<VehicleAssignment[]>;
  create(input: InsertVehicleAssignment): Promise<{ id: string }>;
  returnAssignment(id: string): Promise<void>;
}

export type VehicleAssignmentServiceDeps = {
  repo: VehicleAssignmentRepository;
};

export type VehicleAssignmentAction = "list" | "create" | "return";
