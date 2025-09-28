export default defineEventHandler(async (event) => {
  const jwt = getCookie(event, "_wealth_jwt");
  if (!jwt) {
    throw createError({
      statusCode: 400,
      statusMessage: "Not logged in."
    });
  }
  
  setCookie(event, "_wealth_jwt", "", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    expires: new Date(0) // UNIX epoch
  })
});