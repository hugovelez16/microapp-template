"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { isItemStatus, nextStatus } from "@/domain/item";
import { requireRole } from "@/server/auth/session";
import { getDb } from "@/server/db/client";
import { item } from "@/server/db/schema";
import { createItemSchema, toggleItemSchema } from "./schema";

export type ActionState = { error?: string; ok?: boolean };

export async function createItemAction(_previous: ActionState, formData: FormData): Promise<ActionState> {
  const current = await requireRole("worker");
  const parsed = createItemSchema.safeParse({ name: formData.get("name") ?? "" });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Datos no válidos" };
  }
  await getDb().insert(item).values({ name: parsed.data.name, createdBy: current.id });
  revalidatePath("/items");
  return { ok: true };
}

export async function toggleItemAction(formData: FormData): Promise<void> {
  await requireRole("worker");
  const parsed = toggleItemSchema.safeParse({ id: formData.get("id") });
  if (!parsed.success) return;
  const db = getDb();
  const [row] = await db.select().from(item).where(eq(item.id, parsed.data.id));
  if (!row || !isItemStatus(row.status)) return;
  await db
    .update(item)
    .set({ status: nextStatus(row.status), updatedAt: new Date() })
    .where(eq(item.id, row.id));
  revalidatePath("/items");
}
