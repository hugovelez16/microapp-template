import { migrate } from "drizzle-orm/postgres-js/migrator";
import { fileURLToPath } from "node:url";
import { createDatabase } from "./client";
import { parseConfig } from "@/server/config";

const url = process.env.DATABASE_URL ?? parseConfig(process.env).DATABASE_URL;
const { db, client } = createDatabase(url);

try {
  await migrate(db, { migrationsFolder: fileURLToPath(new URL("./migrations", import.meta.url)) });
  console.log("Migraciones aplicadas.");
} finally {
  await client.end();
}
