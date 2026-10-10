"use client";

import { useTransition } from "react";

import { removeFromBag, setQuantity } from "@/app/bag/actions";
import { announceBagChange } from "@/lib/use-bag-count";

const stepper =
  "grid size-11 cursor-pointer place-items-center text-body disabled:cursor-not-allowed disabled:text-muted";

type Props = { productId: string; name: string; quantity: number; max: number; available: boolean };

export function BagLineControls({ productId, name, quantity, max, available }: Props) {
  const [pending, startTransition] = useTransition();

  function run(action: () => Promise<void>) {
    startTransition(async () => {
      await action();
      announceBagChange();
    });
  }

  return (
    <div aria-busy={pending} className="flex items-center gap-6">
      {available && (
        <div role="group" aria-label={`Quantity of ${name}`} className="inline-flex items-center border">
          <button
            type="button"
            aria-label="Decrease quantity"
            disabled={pending || quantity <= 1}
            onClick={() => run(() => setQuantity(productId, quantity - 1))}
            className={stepper}
          >
            −
          </button>
          <output aria-live="polite" className="w-6 text-center text-caption">
            {quantity}
          </output>
          <button
            type="button"
            aria-label="Increase quantity"
            disabled={pending || quantity >= max}
            onClick={() => run(() => setQuantity(productId, quantity + 1))}
            className={stepper}
          >
            +
          </button>
        </div>
      )}
      <button
        type="button"
        disabled={pending}
        onClick={() => run(() => removeFromBag(productId))}
        className="link cursor-pointer text-caption"
      >
        Remove
      </button>
    </div>
  );
}
