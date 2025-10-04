import z from "zod";

export const UserSchema = z.object({
  id: z.number().gt(0),
  name: z.string().min(4).max(32),
  displayName: z.string().min(4).max(32),
  email: z.email(),
  currencyId: z.number().gt(0)
})
export type User = z.infer<typeof UserSchema>;