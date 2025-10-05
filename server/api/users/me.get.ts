import { User } from "#shared/schemas/user";

export default defineEventHandler(async (event) => {
  const user: User = event.context.user;
  return user;
});