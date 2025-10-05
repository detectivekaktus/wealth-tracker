import { UserSchema } from "../user";
import z from "zod";

// https://zod.dev/api?id=preprocess
// Possibly can contribute to zod by creating a .empty option
// on a string that automatically allows strings to be empty.
const emptyStringToUndefined = (val: unknown) => {
  if (typeof val === "string") {
    return val === "" ? undefined : val;
  }
  return val;
};

export const UserUpdateForm = UserSchema.extend({
  password: z.preprocess(emptyStringToUndefined, z.string().min(8, "Password is too short").optional()),
  confirmPassword: z.preprocess(emptyStringToUndefined, z.string().min(8, "Re-typed password is too short").optional())
})
.omit({ emailVerified: true })
.refine((data) => data.password === data.confirmPassword, { error: "Passwords don't match" });