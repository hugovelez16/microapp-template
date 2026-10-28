import type { ItemStatus } from "@/domain/item";
import type { Role } from "@/domain/roles";

/** Textos visibles de los valores internos (el codigo usa ingles, la interfaz espanol). */
export const ROLE_LABELS: Record<Role, string> = {
  admin: "Administrador",
  worker: "Trabajador",
};

export const ITEM_STATUS_LABELS: Record<ItemStatus, string> = {
  pending: "Pendiente",
  done: "Hecho",
};
