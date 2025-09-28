export default defineEventHandler(async (event) => {
  setCookie(event, "_wealth_jwt", "", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    expires: new Date(0) // UNIX epoch
  })
});