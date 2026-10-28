import { drizzle, type PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { getConfig } from "@/server/config";
import * as schema from "./schema";

export type Database = PostgresJsDatabase<typeof schema>;

let cached: { db: Database; client: postgres.Sql } | undefined;

export function createDatabase(url: string) {
  const client = postgres(url, { max: 10 });
  return { db: drizzle(client, { schema }), client };
}

/** Conexion perezosa y compartida por el proceso. */
export function getDb(): Database {
  cached ??= createDatabase(getConfig().DATABASE_URL);
  return cached.db;
}
