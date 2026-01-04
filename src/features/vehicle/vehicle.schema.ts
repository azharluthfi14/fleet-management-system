import z from "zod";

export const vehicleStatusSchema = z.enum([
  "active",
  "maintenance",
  "inactive",
]);

export const createVehicleSchema = z.object({
  plateNumber: z.string().min(3, "Plate number is required").max(20),
  name: z.string().min(2, "Vehicle name is required"),
  type: z.string().min(2, "Vehicle type is required"),
  brand: z.string().min(2, "Brand is required"),
  model: z.string().min(1, "Model is required"),
  year: z.coerce.number().int().min(1980),
  status: vehicleStatusSchema.default("active"),
  odometer: z.coerce.number().int().min(0),
});

export const updateVehicleSchema = z.object({
  id: z.uuid(),
  plateNumber: z.string().min(3).max(20).optional(),
  name: z.string().min(2).optional(),
  type: z.string().min(2).optional(),
  brand: z.string().min(2).optional(),
  model: z.string().min(1).optional(),
  year: z.coerce.number().int().min(1990).optional(),
  odometer: z.coerce.number().int().nonnegative().optional(),
  status: vehicleStatusSchema.optional(),
});

export const vehicleIdSchema = z.object({
  id: z.uuid(),
});
