import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/server/db/schema.ts",
  out: "./src/server/db/migrations",
  dbCredentials: {
    host: process.env.MYSQL_DB_HOST!,
    port: parseInt(process.env.MYSQL_DB_PORT!),
    user: process.env.MYSQL_DB_USER!,
    password: process.env.MYSQL_DB_PWD!,
    database: process.env.MYSQL_DB_NAME!,
  },
  dialect: "mysql",
  strict: true,
  verbose: true,
});
