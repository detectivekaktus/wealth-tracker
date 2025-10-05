import { UserSchema } from "../user";
import { emptyStringToUndefined } from "../utils";
import z from "zod";

export const UserUpdateForm = UserSchema.extend({
  password: z.preprocess(emptyStringToUndefined, z.string().min(8, "Password is too short").optional()),
  confirmPassword: z.preprocess(emptyStringToUndefined, z.string().min(8, "Re-typed password is too short").optional())
})
.omit({ emailVerified: true })
.refine((data) => data.password === data.confirmPassword, { error: "Passwords don't match" });