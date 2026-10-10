"use client";

import { useRef, useState, useTransition } from "react";

import { addToBag, type AddToBagResult } from "@/app/bag/actions";
import { BagDrawer } from "@/components/bag/bag-drawer";
import { announceBagChange } from "@/lib/use-bag-count";

export function AddToBag({ productId, soldOut }: { productId: string; soldOut: boolean }) {
  const [result, setResult] = useState<AddToBagResult | null>(null);
  const [pending, startTransition] = useTransition();
  const drawer = useRef<HTMLDialogElement>(null);

  function add() {
    if (pending) return;
    startTransition(async () => {
      const next = await addToBag(productId);
      setResult(next);
      if (next.ok) {
        announceBagChange();
        drawer.current?.showModal();
      }
    });
  }

  return (
    <>
      <button
        type="button"
        onClick={add}
        disabled={soldOut}
        aria-busy={pending}
        className="btn btn-primary w-full"
      >
        {pending ? "Adding…" : "Add to bag"}
      </button>
      <p aria-live="polite" className="text-caption text-danger empty:hidden">
        {result && !result.ok ? result.message : null}
      </p>
      <BagDrawer ref={drawer} result={result?.ok ? result : null} />
    </>
  );
}
