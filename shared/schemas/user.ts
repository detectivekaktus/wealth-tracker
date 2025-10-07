import z from "zod";

export const UserSchema = z.object({
  id: z.number().gt(0, "Invalid id"),
  name: z.string().min(4, "Username is too short").max(32, "Username is too long"),
  displayName: z.string().min(4, "Display name is too short").max(32, "Display name is too long"),
  email: z.email("Invalid email address"),
  emailVerified: z.boolean(),
  currencyId: z.number().gt(0)
});
export type User = z.infer<typeof UserSchema>;