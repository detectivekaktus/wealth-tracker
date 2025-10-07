import { eq } from "drizzle-orm";
import { jwtVerify, SignJWT } from "jose";
import db from "db";
import { users } from "db/schemas";
import { JWTInvalid } from "jose/errors";
import { User } from "#shared/schemas/user";

export async function createJwtToken(userId: number): Promise<string> {
  const user = (await db.select().from(users).where(eq(users.id, userId)))[0];

  const payload: User = {
    id: user.id,
    name: user.name,
    displayName: user.displayName,
    email: user.email,
    emailVerified: !!user.emailVerified,
    currencyId: user.currencyId
  };

  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1 day")
    .sign(JWT_SECRET);
}

/**
 * Verifies JWT token. Accepts undefined as parameter which always throws
 * `JWTInvalid` error.
 * 
 * @param token JWT token
 * @returns `JWTPayload` if JWT is valid, otherwise error is thrown
 */
export async function verifyJwtToken(token: string | undefined) {
  if (!token)
    throw new JWTInvalid("No token found.")
  return await jwtVerify(token, JWT_SECRET);
}