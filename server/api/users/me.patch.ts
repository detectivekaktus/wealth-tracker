import { PatchUserRequest } from "#shared/schemas/backend/user";
import { User } from "#shared/schemas/user";
import { hash } from "bcrypt";
import db from "db";
import { users } from "db/schemas";
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const body: PatchUserRequest = event.context.parsedBody;
  const user: User = event.context.user;

  // filter entries (key-value pairs) to exclude undefined ones and assemble a new object (`fromEntries`).
  const data = Object.fromEntries(Object.entries(body).filter((_, val) => val !== undefined));

  if (data.password) {
    data.password = data.password as string;
    data.password = await hash(data.password, SALT_ROUNDS);
  }

  await db.update(users).set(data).where(eq(users.id, user.id));
});