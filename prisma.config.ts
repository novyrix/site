import { defineConfig, env } from "prisma/config";

const legacyBuildUrl =
  process.env.DATABASE_URL || "mysql://novyrix_legacy:novyrix_legacy@127.0.0.1:3306/novyrix_legacy";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  engine: "classic",
  datasource: {
    // Phase 1 data lives in platform-api/PostgreSQL. This legacy schema is retained for redirected pages.
    url: process.env.DATABASE_URL ? env("DATABASE_URL") : legacyBuildUrl,
  },
});
