"use server";

import { getAuthUser } from "../auth";
import { DrizzleVehicleAssignmentRepository } from "./vehicle-assignment.repository";
import { VehicleAssignmentService } from "./vehicle-assignment.service";

const vehicleAssignmentService = new VehicleAssignmentService({
  repo: new DrizzleVehicleAssignmentRepository(),
});

export async function createAssignmentAction(
  _prevState: unknown,
  formData: FormData
) {
  const user = await getAuthUser();

  if (!user) throw new Error("UNAUTHENTICATED");
}
