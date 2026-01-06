import z from "zod";

export const createAssignmentSchema = z.object({
  driverId: z.uuid(),
  vehicleId: z.uuid(),
});

export type CreateAssignmentInput = z.infer<typeof createAssignmentSchema>;
