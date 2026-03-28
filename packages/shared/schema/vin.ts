import { z } from "zod";

export const vinSchema = z.object({
  vin: z
    .string()
    .length(17, "VIN must be exactly 17 characters long")
    .regex(/^[A-HJ-NPR-Z0-9]+$/, "VIN can only contain letters and digits"),
});
