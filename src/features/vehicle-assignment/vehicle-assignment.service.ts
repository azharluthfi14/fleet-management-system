import type { Role } from "@/constants";

import { canPerformVehicleAssignmentAction } from "./vehicle-assignment.policy";
import type { CreateAssignmentInput } from "./vehicle-assignment.schema";
import type {
  VehicleAssignmentRepository,
  VehicleAssignmentServiceDeps,
} from "./vehicle-assignment.types";

export class VehicleAssignmentService {
  private readonly repo: VehicleAssignmentRepository;
  constructor(deps: VehicleAssignmentServiceDeps) {
    this.repo = deps.repo;
  }

  async list(userRoles: readonly Role[]) {
    if (!canPerformVehicleAssignmentAction(userRoles, "list")) {
      throw new Error("FORBIDDEN");
    }

    return this.repo.findAll();
  }

  async assign(input: CreateAssignmentInput, userRoles: readonly Role[]) {
    if (!canPerformVehicleAssignmentAction(userRoles, "create")) {
      throw new Error("FORBIDDEN");
    }

    const existingDriverAssignment = await this.repo.findActiveByDriverId(
      input.driverId
    );
    if (existingDriverAssignment) {
      throw new Error("DRIVER_ALREADY_ASSIGNED");
    }

    const existingVehicleAssignment = await this.repo.findActiveByVehicleId(
      input.vehicleId
    );
    if (existingVehicleAssignment) {
      throw new Error("VEHICLE_ALREADY_ASSIGNED");
    }

    return this.repo.create({
      driverId: input.driverId,
      vehicleId: input.vehicleId,
      status: "assigned",
      startAt: new Date(),
    });
  }

  async returnAssignment(assignmentId: string, userRoles: readonly Role[]) {
    if (!canPerformVehicleAssignmentAction(userRoles, "return")) {
      throw new Error("FORBIDDEN");
    }

    const assignment = await this.repo.findById(assignmentId);
    if (!assignment || assignment.endAt) {
      throw new Error("ASSIGNMENT_NOT_ACTIVE");
    }

    await this.repo.returnAssignment(assignmentId);
  }
}
