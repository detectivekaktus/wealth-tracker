import "dotenv/config"
import { drizzle } from "drizzle-orm/node-postgres";
import { dbUrl } from "../drizzle.config";
import * as schema from "./schemas"

// The schema is passed to access query syntax in drizzle
// After some trials I found out that you can use select
// syntax without passing the schema as the parameter.
const db = drizzle(dbUrl, { schema: schema });

export default db;