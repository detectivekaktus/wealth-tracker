import ps from "./data/priorities.json";
import { priorities } from "../schemas/priorities";

export default async function seed(db) {
  for (const priority of ps) {
    await db.insert(priorities).values(priority);
  }
}