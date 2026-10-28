export const ITEM_STATUSES = ["pending", "done"] as const;

export type ItemStatus = (typeof ITEM_STATUSES)[number];

export const ITEM_NAME_MAX_LENGTH = 120;

/** Recorta y colapsa espacios repetidos. */
export function normalizeItemName(raw: string): string {
  return raw.trim().replace(/\s+/g, " ");
}

export function isItemStatus(value: unknown): value is ItemStatus {
  return typeof value === "string" && (ITEM_STATUSES as readonly string[]).includes(value);
}

/** Un elemento puede pasar de pendiente a hecho y volver a abrirse. */
export function nextStatus(current: ItemStatus): ItemStatus {
  return current === "pending" ? "done" : "pending";
}
