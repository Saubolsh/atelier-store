import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "./schema";

// neon-http sends each query as a single HTTP request, so db.transaction()
// is not supported. Use db.batch() for atomic multi-statement writes.
export const db = drizzle({
  client: neon(process.env.DATABASE_URL!),
  schema,
  // camelCase in TypeScript, snake_case columns; must match drizzle.config.ts.
  casing: "snake_case",
});
