import cs from "./data/categories.json";
import { categories } from "../schemas/categories";

export default async function seed(db) {
  for (const category of cs) {
    await db.insert(categories).values(category);
  }
}