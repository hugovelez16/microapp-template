import { desc } from "drizzle-orm";
import type { Database } from "@/server/db/client";
import { item } from "@/server/db/schema";

export async function listItems(db: Database) {
  return db.select().from(item).orderBy(desc(item.createdAt));
}
