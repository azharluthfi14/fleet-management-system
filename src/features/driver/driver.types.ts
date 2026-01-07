import type { InferInsertModel, InferSelectModel } from "drizzle-orm";

import type { drivers } from "@/db/schemas";

import type { DriverStatus } from "./driver.schema";

export type Driver = InferSelectModel<typeof drivers>;
export type InsertDriver = InferInsertModel<typeof drivers>;
export type UpdateDriver = Partial<InsertDriver>;

export type DriverServiceDeps = {
  repo: DriverRepository;
};

export type DriverWithAssignment = {
  id: string;
  fullName: string;
  phone: string | null;
  licenseNumber: string;
  licenseExpiry: string | null;
  status: DriverStatus;
  deletedAt: Date | null;
  assignment: {
    id: string;
    startAt: Date;
    vehicle: {
      id: string;
      plateNumber: string;
      name: string;
    };
  } | null;
};

export interface DriverRepository {
  findAll(): Promise<Driver[]>;
  findById(driverId: string): Promise<Driver | null>;
  findByLicenseNumber(licenseNumber: string): Promise<Driver | null>;
  create(input: InsertDriver): Promise<{ id: string }>;
  update(driverId: string, input: UpdateDriver): Promise<void>;
  softDelete(driverId: string): Promise<void>;
  isCurrentlyAssigned(driverId: string): Promise<boolean>;
  findByIdWithAssignments(
    driverId: string
  ): Promise<DriverWithAssignment | null>;
}
