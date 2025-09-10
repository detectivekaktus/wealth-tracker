import * as z from "zod";

/**
 * General purpose AuthSchema. This schema is meant to be extended both on the frontend and
 * the backend.
 * 
 * When signing up a user on the frontend, extend the schema with username, confirmPassword, and
 * currencyId fields that will be used for form validation. Instead, on the backend, add only username
 * and currencyId fields that will be validated on the server.
 * 
 * This schema can also be used for loging in as it is.
 */
export const AuthSchema = z.object({
  email: z.email("Invalid email address.").max(255, "The email address is too long."),
  // TODO: Define a regex for password that must include upper and lower characters, at least 1 number
  // and at least 1 special character.
  password: z.string().min(8, "The password is too short."),
});
