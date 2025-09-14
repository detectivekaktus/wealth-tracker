import { jwtVerify } from "jose";
import { createJwtToken, RefreshJwtPayload } from "~~/server/utils/jwt";
import { AuthResponse } from "#shared/types/api/auth";

export default defineEventHandler(async (event) => {
  const refresh = getCookie(event, "_wealth_refresh");
  if (!refresh) {
    throw createError({
      statusCode: 400,
      statusMessage: "Expected refresh token."
    })
  }

  try {
    const { payload } = await jwtVerify(refresh, REFRESH_SECRET);
    const refreshPayload = payload as RefreshJwtPayload;
    const jwt = await createJwtToken(refreshPayload.id);
    return { token: jwt } as AuthResponse;
  } catch (e) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid refresh token."
    });
  }
});