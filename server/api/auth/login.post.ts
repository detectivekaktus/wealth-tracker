import { compare } from "bcrypt";
import db from "db";
import { users } from "db/schemas";
import { eq } from "drizzle-orm";
import { LoginRequest } from "#shared/types/api/auth";

export default defineEventHandler(async (event) => {
  const body: LoginRequest = event.context.parsedBody;
  const user = (await db.select({
    id: users.id,
    email: users.email,
    password: users.password
  }).from(users).where(eq(users.email, body.email)))[0];

  const matched = await compare(body.password, user.password);
  if (!matched) {
    throw createError({
      statusCode: 400,
      statusMessage: "Wrong password."
    });
  }

  const jwt = await createJwtToken(user.id);
  const refresh = await createRefreshToken(user.id);
  
  setCookie(event, "_wealth_refresh", refresh, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7 // 1 week
  });
  setCookie(event, "_wealth_jwt", jwt, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 60 * 60 // 1 hour
  });
});
