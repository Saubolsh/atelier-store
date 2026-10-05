"use client";

import Link from "next/link";
import type { MouseEvent, Ref } from "react";

import { CloseIcon } from "@/components/icons";
import { primaryNav, secondaryNav } from "@/lib/navigation";

// Clicks on the backdrop land on the <dialog> itself. Link clicks navigate
// without unmounting the layout, so the menu has to close itself.
function closeOnBackdropOrLink(event: MouseEvent<HTMLDialogElement>) {
  const dialog = event.currentTarget;
  if (event.target === dialog || (event.target as Element).closest("a")) {
    dialog.close();
  }
}

export function MenuDrawer({ ref }: { ref: Ref<HTMLDialogElement> }) {
  return (
    <dialog ref={ref} aria-label="Menu" className="drawer" onClick={closeOnBackdropOrLink}>
      <div className="flex min-h-full flex-col px-8 pb-12 md:px-16">
        <form method="dialog" className="flex h-header shrink-0 items-center justify-end">
          <button className="btn btn-primary btn-icon" aria-label="Close menu">
            <CloseIcon />
          </button>
        </form>

        <nav aria-label="Main menu" className="pt-6">
          <ul className="flex flex-col gap-5 text-xl font-medium tracking-tight">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="link-quiet">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="mt-14 flex flex-col gap-4 text-body">
            {secondaryNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="link-quiet">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </dialog>
  );
}
