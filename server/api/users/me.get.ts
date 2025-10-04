import { User } from "#shared/types/api/user";

export default defineEventHandler(async (event) => {
  const user: User = event.context.user;
  return user;
});