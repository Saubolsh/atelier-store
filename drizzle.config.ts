import { loadEnvConfig } from "@next/env";
import { defineConfig } from "drizzle-kit";

// Also block direct CLI use before loading database credentials. Loopback binding
// alone does not protect Studio from requests made by unrelated websites.
if (process.argv.includes("studio")) {
  throw new Error(
    "Drizzle Studio is disabled: the installed version exposes an unauthenticated database proxy.",
  );
}

// drizzle-kit runs outside Next.js, so load .env* files the same way Next does.
loadEnvConfig(process.cwd());

export default defineConfig({
  dialect: "postgresql",
  // Must match `casing` on the client in src/db/index.ts.
  casing: "snake_case",
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
