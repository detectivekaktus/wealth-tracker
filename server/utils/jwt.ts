import { eq } from "drizzle-orm";
import { jwtVerify, SignJWT } from "jose";
import db from "db";
import { users } from "db/schemas";

export type JwtTokenType = "jwt" | "refresh";

export type RefreshJwtPayload = {
  tokenType: JwtTokenType,
  id: number
}

export type UserJwtPayload = {
  tokenType: JwtTokenType,
  id: number,
  name: string,
  displayName: string,
  email: string,
  currencyId: number
}

export async function createJwtToken(userId: number): Promise<string> {
  const user = (await db.select().from(users).where(eq(users.id, userId)))[0];

  const payload: UserJwtPayload = {
    tokenType: "jwt",
    id: user.id,
    name: user.name,
    displayName: user.displayName,
    email: user.email,
    currencyId: user.currencyId
  };

  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1 day")
    .sign(JWT_SECRET);
}

/**
 * Verifies JWT token. Accepts undefined as parameter which always returns
 * `false` when evoked.
 * 
 * @param token JWT token
 * @returns `true` if JWT is verified successfully, `false` otherwise.
 */
export async function verifyJwtToken(token: string | undefined) {
  if (!token)
    return false;
  return await jwtVerify(token, JWT_SECRET);
}