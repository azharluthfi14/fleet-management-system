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

  list(userRoles: readonly Role[]) {
    if (!hasRole(userRoles, VEHICLE_PERMISSIONS.list)) {
      throw new Error("FORBIDDEN");
    }
    return this.repo.list();
  }

  get(id: string, userRoles: readonly Role[]) {
    if (!hasRole(userRoles, VEHICLE_PERMISSIONS.view)) {
      throw new Error("FORBIDDEN");
    }
    return this.repo.findById(id);
  }

  create(input: CreateVehicleInput, userRoles: readonly Role[]) {
    if (!hasRole(userRoles, VEHICLE_PERMISSIONS.create)) {
      throw new Error("FORBIDDEN");
    }
    return this.repo.create(input);
  }

  update(input: UpdateVehicleInput, userRoles: readonly Role[]) {
    if (!hasRole(userRoles, VEHICLE_PERMISSIONS.update)) {
      throw new Error("FORBIDDEN");
    }
    return this.repo.update(input);
  }

  delete(id: string, userRoles: readonly Role[]) {
    if (!hasRole(userRoles, VEHICLE_PERMISSIONS.delete)) {
      throw new Error("FORBIDDEN");
    }
    return this.repo.delete(id);
  }
}
