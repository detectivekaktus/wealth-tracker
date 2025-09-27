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
  if (allowed.includes(url.pathname))
    return;

  const jwt = getCookie(event, "_wealth_jwt");
  const isValid = verifyJwtToken(jwt);
  if (!jwt || !isValid) {
    if (url.pathname.startsWith("/api/")) {
      throw createError({
        statusCode: 401,
        statusMessage: "Unauthorized."
      });
    }
    await sendRedirect(event, "/login", 302);
  }
});