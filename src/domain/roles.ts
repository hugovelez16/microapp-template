export const ROLES = ["admin", "worker"] as const;

export type Role = (typeof ROLES)[number];

export function isRole(value: unknown): value is Role {
  return typeof value === "string" && (ROLES as readonly string[]).includes(value);
}

/** El administrador puede todo lo que puede el trabajador. */
export function hasAnyRole(current: unknown, allowed: readonly Role[]): boolean {
  if (!isRole(current)) return false;
  if (current === "admin") return true;
  return allowed.includes(current);
}
