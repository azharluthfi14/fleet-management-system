"use server";

import { revalidatePath } from "next/cache";

import { getAuthUser } from "../auth/auth.server";
import { canPerformVehicleAction } from "./vehicle.policy";
import { DrizzleVehicleRepository } from "./vehicle.repository";
import { createVehicleSchema, updateVehicleSchema } from "./vehicle.schema";
import { VehicleService } from "./vehicle.service";

const vehicleService = new VehicleService({
  repo: new DrizzleVehicleRepository(),
});

export async function getListVehicleAction() {
  const user = await getAuthUser();
  if (!user) throw new Error("UNAUTHENTICATED");

  return vehicleService.list(user.roles);
}

export async function createVehicleAction(
  _prevState: unknown,
  formData: FormData
) {
  const user = await getAuthUser();

  if (!user) throw new Error("UNAUTHENTICATED");

  if (!canPerformVehicleAction(user.roles, "create")) {
    throw new Error("FORBIDDEN");
  }

  const raw = Object.fromEntries(formData.entries());
  const parsed = createVehicleSchema.safeParse(raw);

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }

  await vehicleService.create(parsed.data, user.roles);

  revalidatePath("/vehicles");

  return { success: true };
}

export async function getVehicleDetailAction(id: string) {
  const user = await getAuthUser();

  if (!user) throw new Error("UNAUTHENTICATED");

  return vehicleService.get(id, user.roles);
}

export async function editVehicleAction(
  _prevState: unknown,
  formData: FormData
) {
  const user = await getAuthUser();

  if (!user) throw new Error("UNAUTHENTICATED");

  if (!canPerformVehicleAction(user.roles, "update")) {
    throw new Error("FORBIDDEN");
  }

  const vehicleId = formData.get("vehicleId");
  if (typeof vehicleId !== "string") {
    throw new Error("INVALID_VEHICLE_ID");
  }

  const raw = Object.fromEntries(formData.entries());
  const parsed = updateVehicleSchema.safeParse(raw);

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }

  await vehicleService.update(vehicleId, parsed.data, user.roles);

  revalidatePath("/vehicles");

  return { success: true };
}

export async function deleteVehicle(_prevState: unknown, formData: FormData) {
  const user = await getAuthUser();

  if (!user) throw new Error("UNAUTHENTICATED");

  if (!canPerformVehicleAction(user.roles, "delete")) {
    throw new Error("FORBIDDEN");
  }
  const id = formData.get("id") as string;
  await vehicleService.delete(id, user.roles);

  revalidatePath("/vehicles");

  return { success: true };
}

export async function getListAvailableVehicle() {
  const user = await getAuthUser();

  if (!user) throw new Error("UNNAUTHENTICATED");

  return vehicleService.listAvaliable(user.roles);
}
