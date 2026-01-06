import type { InferInsertModel, InferSelectModel } from "drizzle-orm";

import type { drivers } from "@/db/schemas";

export type Driver = InferSelectModel<typeof drivers>;
export type InsertDriver = InferInsertModel<typeof drivers>;
export type UpdateDriver = Partial<InsertDriver>;

export type DriverServiceDeps = {
  repo: DriverRepository;
};

export interface DriverRepository {
  findAll(): Promise<Driver[]>;
  findById(driverId: string): Promise<Driver | null>;
  findByLicenseNumber(licenseNumber: string): Promise<Driver | null>;
  create(input: InsertDriver): Promise<{ id: string }>;
  update(driverId: string, input: UpdateDriver): Promise<void>;
  delete(driverId: string): Promise<void>;
}
