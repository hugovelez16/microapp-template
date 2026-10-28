import { ROLE_LABELS } from "@/lib/labels";
import { requireRole } from "@/server/auth/session";
import { SignOutButton } from "./sign-out-button";

export default async function StaffLayout({ children }: { children: React.ReactNode }) {
  const current = await requireRole("worker");

  return (
    <div className="mx-auto flex min-h-dvh max-w-md flex-col">
      <header className="flex items-center justify-between border-b border-neutral-200 px-4 py-3">
        <div>
          <p className="text-sm font-medium">{current.name}</p>
          <p className="text-xs text-neutral-600">{ROLE_LABELS[current.role]}</p>
        </div>
        <SignOutButton />
      </header>
      <div className="flex-1 px-4 py-6">{children}</div>
    </div>
  );
}
