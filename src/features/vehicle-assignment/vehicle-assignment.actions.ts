"use server";

import { getAuthUser } from "../auth";
import { DrizzleVehicleAssignmentRepository } from "./vehicle-assignment.repository";
import { createAssignmentSchema } from "./vehicle-assignment.schema";
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

  const raw = Object.fromEntries(formData.entries());
  const parsed = createAssignmentSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  await vehicleAssignmentService.assign(parsed.data, user.roles);

  return { success: true };
}

export async function returnAssignment(assignmentId: string) {
  const user = await getAuthUser();

  if (!user) throw new Error("UNAUTHENTICATED");

  await vehicleAssignmentService.returnAssignment(assignmentId, user.roles);
}
