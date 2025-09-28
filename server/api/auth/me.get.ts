import { User } from "#shared/types/api/auth";

export default defineEventHandler(async (event) => {
  const user: User = event.context.user;
  return user;
});