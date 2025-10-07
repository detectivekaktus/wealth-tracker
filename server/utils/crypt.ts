import { hash } from "bcrypt";
import { SALT_ROUNDS } from "~~/server/utils/constants";

export async function hashPassword(password: string): Promise<string> {
  return await hash(password, SALT_ROUNDS)
}