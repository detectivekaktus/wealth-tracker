import cs from "./data/currencies.json";
import { currencies } from "../schemas/currencies";

export default async function seed(db) {
  for (const currency of cs) {
    await db.insert(currencies).values(currency);
  }
}