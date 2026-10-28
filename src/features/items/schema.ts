import { z } from "zod";
import { ITEM_NAME_MAX_LENGTH, normalizeItemName } from "@/domain/item";

export const createItemSchema = z.object({
  name: z
    .string()
    .transform(normalizeItemName)
    .pipe(
      z
        .string()
        .min(1, "El nombre es obligatorio")
        .max(ITEM_NAME_MAX_LENGTH, `Máximo ${ITEM_NAME_MAX_LENGTH} caracteres`),
    ),
});

export const toggleItemSchema = z.object({
  id: z.string().uuid(),
});
