"use server";

import { getAuthUser } from "../auth";
import { canPerformDriverAction } from "./driver.policy";
import { DrizzleDriverRepository } from "./driver.repository";
import { createDriverSchema, updateDriverSchema } from "./driver.schema";
import { DriverService } from "./driver.service";

const driverService = new DriverService({
  repo: new DrizzleDriverRepository(),
});

export async function getListDriverAction() {
  const user = await getAuthUser();

  if (!user) throw new Error("UNAUTHENTICATED");

  if (!canPerformDriverAction(user.roles, "view")) {
    throw new Error("FORBIDDEN");
  }

  return driverService.list(user.roles);
}

export async function createDriverAction(
  _prevState: unknown,
  formData: FormData
) {
  const user = await getAuthUser();

  if (!user) throw new Error("UNAUTHENTICATED");

  if (!canPerformDriverAction(user.roles, "create")) {
    throw new Error("FORBIDDEN");
  }

  const raw = Object.fromEntries(formData.entries());
  const parsed = createDriverSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  await driverService.create(parsed.data, user.roles);
}

export async function getDriverDetailActionById(driverId: string) {
  const user = await getAuthUser();

  if (!user) {
    throw new Error("UNAUTHENTICATED");
  }

  if (!canPerformDriverAction(user.roles, "view")) {
    throw new Error("FORBIDDEN");
  }

  return driverService.getById(driverId, user.roles);
}

export async function editDriverAction(
  _prevState: unknown,
  formData: FormData
) {
  const user = await getAuthUser();

  if (!user) {
    throw new Error("UNAUTHENTICATED");
  }

  if (!canPerformDriverAction(user.roles, "update")) {
    throw new Error("FORBIDDEN");
  }

  const driverId = formData.get("driverId");
  if (typeof driverId !== "string") {
    throw new Error("INVALID_DRIVER_ID");
  }

  const raw = Object.fromEntries(formData.entries());
  const parsed = updateDriverSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  await driverService.update(driverId, parsed.data, user.roles);
}
