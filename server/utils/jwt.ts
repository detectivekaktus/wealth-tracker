import { eq } from "drizzle-orm";
import { SignJWT } from "jose";
import db from "db";
import { users } from "db/schemas";

export const SALT_ROUNDS = 6;

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
    .setExpirationTime("1 hour")
    .sign(JWT_SECRET);
}

export async function createRefreshToken(userId: number): Promise<string> {
  const payload: RefreshJwtPayload = {
    tokenType: "refresh",
    id: userId
  };

  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1 week")
    .sign(REFRESH_SECRET);
}