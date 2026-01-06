import type { Role } from "@/constants";

import { hasRole } from "../auth";
import { DRIVER_PERMISSIONS } from "./driver.permissions";
import type {
  CreateDriverSchemaInput,
  UpdateDriverSchemaInput,
} from "./driver.schema";
import type { DriverRepository, DriverServiceDeps } from "./driver.types";

export class DriverService {
  private readonly repo: DriverRepository;

  constructor(deps: DriverServiceDeps) {
    this.repo = deps.repo;
  }

  async list(userRoles: readonly Role[]) {
    if (!hasRole(userRoles, DRIVER_PERMISSIONS.list)) {
      throw new Error("FORBIDDEN");
    }

    return this.repo.findAll();
  }

  async getById(id: string, userRoles: readonly Role[]) {
    if (!hasRole(userRoles, DRIVER_PERMISSIONS.view)) {
      throw new Error("FORBIDDEN");
    }

    return this.repo.findById(id);
  }

  async getByLicense(licenseNumber: string, userRoles: readonly Role[]) {
    if (!hasRole(userRoles, DRIVER_PERMISSIONS.view)) {
      throw new Error("FORBIDDEN");
    }

    return this.repo.findByLicenseNumber(licenseNumber);
  }

  async create(input: CreateDriverSchemaInput, userRoles: readonly Role[]) {
    if (!hasRole(userRoles, DRIVER_PERMISSIONS.create)) {
      throw new Error("FORBIDDEN");
    }
    return this.repo.create({
      ...input,
      licenseExpiry: input?.licenseExpiry
        ? input.licenseExpiry.toISOString().slice(0, 10)
        : undefined,
    });
  }

  async update(
    driverId: string,
    input: UpdateDriverSchemaInput,
    userRoles: readonly Role[]
  ) {
    if (!hasRole(userRoles, DRIVER_PERMISSIONS.update)) {
      throw new Error("FORBIDDEN");
    }

    return this.repo.update(driverId, {
      ...input,
      licenseExpiry: input.licenseExpiry
        ? input.licenseExpiry.toISOString().slice(0, 10)
        : undefined,
    });
  }

  async delete(driverId: string, userRoles: readonly Role[]) {
    if (!hasRole(userRoles, DRIVER_PERMISSIONS.delete)) {
      throw new Error("FORBIDDEN");
    }

    const driver = await this.repo.findById(driverId);
    if (!driverId || driver?.deletedAt) {
      throw new Error("DRIVER_NOT_FOUND");
    }

    const isAssigned = await this.repo.isCurrentlyAssigned(driverId);
    if (isAssigned) {
      throw new Error("DRIVER_STILL_ASSIGNED");
    }

    return this.repo.softDelete(driverId);
  }
}
