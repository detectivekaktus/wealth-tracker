import z from "zod";
import { SignupSchema } from "../backend/auth";

export const SignupFormSchema = SignupSchema.extend({
  confirmPassword: z.string().min(8),
}).refine((data) => data.password === data.confirmPassword, { error: "The passwords don't match." });