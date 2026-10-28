import { isItemStatus } from "@/domain/item";
import { ItemForm } from "@/features/items/components/item-form";
import { toggleItemAction } from "@/features/items/actions";
import { listItems } from "@/features/items/queries";
import { ITEM_STATUS_LABELS } from "@/lib/labels";
import { getDb } from "@/server/db/client";

export const dynamic = "force-dynamic";

export default async function ItemsPage() {
  const items = await listItems(getDb());

  return (
    <main className="flex flex-col gap-6">
      <h1 className="text-xl font-semibold">Elementos</h1>
      <ItemForm />
      <ul className="flex flex-col gap-3">
        {items.map((row) => (
          <li
            key={row.id}
            className="flex items-center justify-between gap-3 rounded-lg border border-neutral-200 bg-white p-4"
          >
            <div>
              <p className="font-medium">{row.name}</p>
              <p className="text-sm text-neutral-600">
                {isItemStatus(row.status) ? ITEM_STATUS_LABELS[row.status] : row.status}
              </p>
            </div>
            <form action={toggleItemAction}>
              <input type="hidden" name="id" value={row.id} />
              <button type="submit" className="h-10 rounded-lg border border-neutral-300 px-3 text-sm">
                Cambiar estado
              </button>
            </form>
          </li>
        ))}
        {items.length === 0 ? <li className="text-sm text-neutral-600">Todavía no hay elementos.</li> : null}
      </ul>
    </main>
  );
}
