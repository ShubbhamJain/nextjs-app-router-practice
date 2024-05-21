import mysql2 from "mysql2";
import { drizzle } from "drizzle-orm/mysql2";

import * as schema from "./schema";

if (
  !process.env.MYSQL_DB_PORT ||
  !process.env.MYSQL_DB_USER ||
  !process.env.MYSQL_DB_PWD ||
  !process.env.MYSQL_DB_NAME
) {
  throw new Error("DB credentials error");
}

const connection = mysql2.createConnection({
  port: parseInt(process.env.MYSQL_DB_PORT),
  user: process.env.MYSQL_DB_USER!,
  password: process.env.MYSQL_DB_PWD!,
  database: process.env.MYSQL_DB_NAME!,
});

export const db = drizzle(connection, {
  logger: true,
  schema: schema,
  mode: "default",
});
