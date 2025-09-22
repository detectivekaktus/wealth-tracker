import { SignupRequest } from "#shared/types/api/auth";
import db from "db";
import { users } from "db/schemas";
import { DatabaseError } from "pg";
import { hash } from "bcrypt";
import { createJwtToken, createRefreshToken } from "~~/server/utils/jwt";
import { SALT_ROUNDS } from "~~/server/utils/constants";

export default defineEventHandler(async (event) => {
  const body: SignupRequest = event.context.parsedBody;
  body.password = await hash(body.password, SALT_ROUNDS);

  try {
    const user = (await db.insert(users).values(body).returning())[0];
    const jwt = await createJwtToken(user.id);
    const refresh = await createRefreshToken(user.id);

    setResponseStatus(event, 201);
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
  } catch (e: unknown) {
    if (e instanceof DatabaseError) {
      if (e.constraint == "users_email_key") {
        throw createError({
          statusCode: 409,
          statusMessage: "User with this email already exists."
        });
      }
    }
  }
});