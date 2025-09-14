import { SignupRequest, SignupResponse } from "#shared/types/api/auth";
import db from "db";
import { users } from "db/schemas";
import { DatabaseError } from "pg";
import { hash } from "bcrypt";
import { SignJWT } from "jose";
import { JWT_SECRET, REFRESH_SECRET } from "~~/server/utils/constants";

const SALT_ROUNDS = 6;

export default defineEventHandler(async (event) => {
  const body: SignupRequest = event.context.parsedBody;
  body.password = await hash(body.password, SALT_ROUNDS);

  try {
    const user = (await db.insert(users).values(body).returning())[0];

    const jwt = await new SignJWT({
      tokenType: "jwt",
      id: user.id,
      name: user.name,
      displayName: user.displayName,
      email: user.email,
      currencyId: user.currencyId
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("1 hour")
      .sign(JWT_SECRET);

    const refresh = await new SignJWT({ tokenType: "refresh", id: user.id })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("1 week")
      .sign(REFRESH_SECRET);

    setResponseStatus(event, 201);
    setCookie(event, "_wealth_refresh", refresh, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7 // 1 week
    });
    return { token: jwt } as SignupResponse;
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