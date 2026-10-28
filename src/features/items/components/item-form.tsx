"use client";

import { useActionState } from "react";
import { createItemAction, type ActionState } from "../actions";

const initialState: ActionState = {};

export function ItemForm() {
  const [state, formAction, pending] = useActionState(createItemAction, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-3">
      <label htmlFor="name" className="text-sm font-medium">
        Nuevo elemento
      </label>
      <input
        id="name"
        name="name"
        type="text"
        required
        maxLength={120}
        autoComplete="off"
        className="h-12 rounded-lg border border-neutral-300 px-3 text-base"
      />
      {state.error ? (
        <p role="alert" className="text-sm text-red-700">
          {state.error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="h-12 rounded-lg bg-neutral-900 text-base font-medium text-white disabled:opacity-60"
      >
        {pending ? "Guardando..." : "Añadir"}
      </button>
    </form>
  );
}
