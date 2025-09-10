import db from "~~/db/index";
import { currencies } from "~~/db/schemas";
import { type Currency } from "#shared/types/api/currency"; 

export default defineEventHandler(async () => {
  const data = await db.select().from(currencies);
  return data as Currency[];
})