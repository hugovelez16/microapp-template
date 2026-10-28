import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { hasAnyRole, isRole, type Role } from "@/domain/roles";
import { getAuth } from "./index";

export type SessionUser = { id: string; name: string; email: string; role: Role };

export async function getSessionUser(): Promise<SessionUser | null> {
  // Leer las cabeceras primero marca la ruta como dinamica antes de tocar la configuracion.
  const requestHeaders = await headers();
  const session = await getAuth().api.getSession({ headers: requestHeaders });
  if (!session) return null;
  const role = (session.user as { role?: unknown }).role;
  if (!isRole(role)) return null;
  return { id: session.user.id, name: session.user.name, email: session.user.email, role };
}

/** Exige sesion y uno de los roles indicados (el administrador siempre pasa). */
export async function requireRole(...allowed: Role[]): Promise<SessionUser> {
  const current = await getSessionUser();
  if (!current) redirect("/login");
  if (!hasAnyRole(current.role, allowed)) notFound();
  return current;
}
