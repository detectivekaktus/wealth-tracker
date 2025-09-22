import { SignupRequest, AuthResponse } from "#shared/types/api/auth";
import db from "db";
import { users } from "db/schemas";
import { DatabaseError } from "pg";
import { hash } from "bcrypt";
import { createJwtToken, createRefreshToken, SALT_ROUNDS } from "~~/server/utils/jwt";

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
    return { token: jwt } as AuthResponse;
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