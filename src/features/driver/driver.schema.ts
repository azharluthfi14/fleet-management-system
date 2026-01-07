import z from "zod";

export const driverStatusSchema = z.enum(["active", "inactive", "suspended"]);

export const createDriverSchema = z.object({
  fullName: z.string().min(3, "Minimum 3 characters long"),
  phone: z.string().optional(),
  licenseNumber: z.string(),
  licenseExpiry: z.coerce.date().optional(),
  status: driverStatusSchema.optional(),
});

export const assignVehicleSchema = z.object({
  vehicleId: z.uuid(),
  driverId: z.uuid(),
  startAt: z.coerce.date().optional(),
});

export const updateDriverSchema = createDriverSchema.partial();

export type CreateDriverSchemaInput = z.infer<typeof createDriverSchema>;
export type UpdateDriverSchemaInput = z.infer<typeof updateDriverSchema>;
export type DriverStatus = z.infer<typeof driverStatusSchema>;
export type AssignVehicleSchemaInput = z.infer<typeof assignVehicleSchema>;
