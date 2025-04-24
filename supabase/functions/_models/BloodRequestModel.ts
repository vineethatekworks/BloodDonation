
import { z } from "npm:zod@3.24.3";

export const BloodRequestSchema = z.object({
  requested_by: z
    .string()
    .min(1, "Requester ID is required"),

  blood_group_needed: z
    .string()
    .min(1, "Blood group is required")
    .regex(/^(A|B|AB|O)[+-]$/, "Invalid blood group format (e.g., A+, O-)"),

  location: z
    .string()
    .min(1, "Location is required"),

  urgency: z
    .string()
    .min(1, "Urgency level is required")
    .refine((val) =>
      ["low", "medium", "high", "critical"].includes(val.toLowerCase()), {
        message: "Urgency must be one of: low, medium, high, critical",
    }),

  description: z
    .string()
    .optional()
});

export type BloodRequest = z.infer<typeof BloodRequestSchema>;