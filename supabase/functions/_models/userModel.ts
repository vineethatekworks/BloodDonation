import { z } from "npm:zod@3.24.3";

export const UserSchema = z.object({
  full_name: z
    .string()
    .min(1, "Full name is required")
    .regex(/^[A-Za-z ]+$/, "Full name must contain only letters"),

  email: z
    .string()
    .email("Invalid email format")
    .refine((val) => val.endsWith("@gmail.com"), {
      message: "Email must end with @gmail.com",
    }),

  blood_group: z
    .string()
    .min(1, "Blood group is required")
    .regex(/^(A|B|AB|O)[+-]$/, "Invalid blood group format (e.g., A+, O-)"),

  contact: z
    .string()
    .min(10, "Contact number must be at least 10 digits")
    .regex(/^[0-9]{10,}$/, "Contact must be digits only"),

  location: z
    .string()
    .min(1, "Location is required"),

  role: z
    .array(z.string())
    .optional()
    .default(["donor"]),

  available_to_donate: z
    .boolean()
    .optional()
    .default(false),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must be less than 20 characters")
});

export type User = z.infer<typeof UserSchema>;
