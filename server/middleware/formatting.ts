import { SignupRequest, SignupSchema, LoginSchema, LoginRequest } from "#shared/schemas/backend/auth";
import { PatchUserRequest, PatchUserSchema } from "#shared/schemas/backend/user";

function throwError(msg: string) {
  throw createError({
    statusCode: 400,
    statusMessage: msg
  });
}

export default defineEventHandler(async (event) => {
  const url = getRequestURL(event);

  switch (url.pathname) {
    case "/api/auth/signup": {
      const body = await readBody(event);
      const parsed = SignupSchema.safeParse(body);
      if (!parsed.success) {
        throwError(parsed.error.issues[0].message || "Malformatted request.");
      }
      event.context.parsedBody = parsed.data as SignupRequest;
    } break;

    case "/api/auth/login": {
      const body = await readBody(event);
      const parsed = LoginSchema.safeParse(body);
      if (!parsed.success) {
        throwError(parsed.error.issues[0].message || "Malformatted request.");
      }
      event.context.parsedBody = parsed.data as LoginRequest;
    } break;

    case "/api/users/me": {
      if (event.method !== "PATCH")
        return;

      const body = await readBody(event);
      const parsed = PatchUserSchema.safeParse(body);
      if (!parsed.success) {
        throwError(parsed.error.issues[0].message || "Malformatted request.");
      }
      event.context.parsedBody = parsed.data as PatchUserRequest;
    }

    default:
      return;
  }
});