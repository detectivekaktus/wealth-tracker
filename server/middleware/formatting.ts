import { SignupRequest, SignupSchema, LoginSchema, LoginRequest } from "#shared/types/api/auth";

export default defineEventHandler(async (event) => {
  const url = getRequestURL(event);
  if (url.pathname === "/api/auth/signup") {
    const body = await readBody(event);
    const parsed = SignupSchema.safeParse(body);
    if (!parsed.success) {
      throw createError({
        statusCode: 400,
        statusMessage: parsed.error.issues[0].message || "Malformatted request."
      });
    }

    event.context.parsedBody = parsed.data as SignupRequest;
  }
  else if (url.pathname === "/api/auth/login") {
    const body = await readBody(event);
    const parsed = LoginSchema.safeParse(body);
    if (!parsed.success) {
      throw createError({
        statusCode: 400,
        statusMessage: parsed.error.issues[0].message || "Malformatted request."
      });
    }

    event.context.parsedBody = parsed.data as LoginRequest;
  }
});