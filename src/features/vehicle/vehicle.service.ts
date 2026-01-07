import type { Role } from "@/constants";
import { hasRole } from "@/features/auth";
import type {
  CreateVehicleInput,
  UpdateVehicleInput,
  VehicleRepository,
  VehicleServiceDeps,
} from "@/features/vehicle";
import { VEHICLE_PERMISSIONS } from "@/features/vehicle";

export class VehicleService {
  private readonly repo: VehicleRepository;
  constructor(deps: VehicleServiceDeps) {
    this.repo = deps.repo;
  }

  async list(userRoles: readonly Role[]) {
    if (!hasRole(userRoles, VEHICLE_PERMISSIONS.list)) {
      throw new Error("FORBIDDEN");
    }
    return this.repo.list();
  }

  async get(id: string, userRoles: readonly Role[]) {
    if (!hasRole(userRoles, VEHICLE_PERMISSIONS.view)) {
      throw new Error("FORBIDDEN");
    }
    return this.repo.findById(id);
  }

  async create(input: CreateVehicleInput, userRoles: readonly Role[]) {
    if (!hasRole(userRoles, VEHICLE_PERMISSIONS.create)) {
      throw new Error("FORBIDDEN");
    }
    return this.repo.create(input);
  }

  async update(
    vehicleId: string,
    input: UpdateVehicleInput,
    userRoles: readonly Role[]
  ) {
    if (!hasRole(userRoles, VEHICLE_PERMISSIONS.update)) {
      throw new Error("FORBIDDEN");
    }
    return this.repo.update(vehicleId, input);
  }

  async delete(id: string, userRoles: readonly Role[]) {
    if (!hasRole(userRoles, VEHICLE_PERMISSIONS.delete)) {
      throw new Error("FORBIDDEN");
    }
    return this.repo.delete(id);
  }

  async listAvaliable(userRoles: readonly Role[]) {
    if (!hasRole(userRoles, VEHICLE_PERMISSIONS.list)) {
      throw new Error("FORBIDDEN");
    }

    return this.repo.findAvailableVehicles();
  }
}
