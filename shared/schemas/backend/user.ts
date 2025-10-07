import z from "zod";
import { emptyStringToUndefined } from "../utils";

export const PatchUserSchema = z.object({
  name: z.preprocess(emptyStringToUndefined, z.string().min(4, "Username is too short").max(32, "Username is too long").optional()),
  displayName: z.preprocess(emptyStringToUndefined, z.string().min(4, "Display name is too short").max(32, "Display name is too long").optional()),
  email: z.preprocess(emptyStringToUndefined, z.email("Invalid email address").optional()),
  currencyId: z.number().gt(0, "Invalid currency id").optional(),
  password: z.preprocess(emptyStringToUndefined, z.string().min(8, "Password is too short").optional())
})
.refine((data) => !!data.name || !!data.displayName || !!data.email || !!data.currencyId || !!data.password,
{ error: "Must've included at least one field." });
export type PatchUserRequest = z.infer<typeof PatchUserSchema>;