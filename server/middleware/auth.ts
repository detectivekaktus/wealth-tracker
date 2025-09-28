// List of allowed endpoints to
// visit when not authenticated.
const allowed = [
  "/signup",
  "/login",

  "/api/auth/signup",
  "/api/auth/login"
];

export default defineEventHandler(async (event) => {
  const url = getRequestURL(event);
  const jwt = getCookie(event, "_wealth_jwt");
  try {
    const { payload } = await verifyJwtToken(jwt);
    
    // user is logged in and tries to access `allowed`
    // endpoints
    if (allowed.includes(url.pathname))
      await sendRedirect(event, "/", 302);
    
    const { iat, exp, ...user } = payload;
    event.context.user = user;
  } catch (e) {
    // user is not logged in and tries to access `allowed`
    // endpoints
    if (allowed.includes(url.pathname))
      return;
    else if (url.pathname.startsWith("/api/")) {
      throw createError({
        statusCode: 401,
        statusMessage: "Unauthorized."
      });
    }

    await sendRedirect(event, "/login", 302);
  }
});