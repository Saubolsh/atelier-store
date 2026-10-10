"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useSyncExternalStore } from "react";

import { AccountIcon, BagIcon, MenuIcon, SearchIcon } from "@/components/icons";
import { MenuDrawer } from "@/components/menu-drawer";
import { primaryNav } from "@/lib/navigation";
import { useBagCount } from "@/lib/use-bag-count";

// Pages that open with a full-bleed image. The header sits on top of it,
// transparent and inverted, until the page scrolls.
const overlayPaths = new Set(["/"]);

const iconLink = "inline-grid size-11 place-items-center";

function subscribeToScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

export function SiteHeader() {
  const pathname = usePathname();
  const scrolled = useSyncExternalStore(
    subscribeToScroll,
    () => window.scrollY > 8,
    () => false,
  );
  const bagCount = useBagCount();
  const menu = useRef<HTMLDialogElement>(null);
  const overlay = overlayPaths.has(pathname) && !scrolled;

  return (
    <>
      <header
        className={`sticky top-0 z-40 h-header border-b transition-colors ${
          overlay ? "inverse border-transparent" : "border-line bg-canvas text-ink"
        }`}
      >
        <div className="container-page grid h-full grid-cols-[1fr_auto] items-center lg:grid-cols-[1fr_auto_1fr]">
          <nav aria-label="Primary" className="hidden gap-6 text-caption font-medium lg:flex">
            {primaryNav.slice(0, 4).map((item) => (
              <Link key={item.href} href={item.href} className="link-quiet">
                {item.label}
              </Link>
            ))}
          </nav>

          {/* lg:pl balances the trailing letter-spacing so the centered wordmark looks centered. */}
          <Link href="/" className="title-md tracking-[0.4em] lg:pl-[0.4em]">
            Atelier
          </Link>

          <div className="-mr-2.5 flex items-center justify-end">
            <Link href="/search" aria-label="Search" className={iconLink}>
              <SearchIcon />
            </Link>
            <Link href="/account" aria-label="Account" className={`${iconLink} max-sm:hidden`}>
              <AccountIcon />
            </Link>
            <Link
              href="/bag"
              aria-label={bagCount > 0 ? `Shopping bag, ${bagCount} ${bagCount === 1 ? "item" : "items"}` : "Shopping bag"}
              className={`${iconLink} relative`}
            >
              <BagIcon />
              {bagCount > 0 && (
                <span
                  aria-hidden
                  className="absolute top-1.5 right-0.5 grid h-4.5 min-w-4.5 place-items-center rounded-full bg-ink px-1 text-micro leading-none font-medium text-canvas"
                >
                  {bagCount > 9 ? "9+" : bagCount}
                </span>
              )}
            </Link>
            <button
              type="button"
              aria-haspopup="dialog"
              onClick={() => menu.current?.showModal()}
              className="flex h-11 cursor-pointer items-center gap-2 px-2.5"
            >
              <MenuIcon />
              <span className="title-xs max-lg:sr-only">Menu</span>
            </button>
          </div>
        </div>
      </header>

      {/* Rendered outside <header> so it never inherits the overlay's inverse colors. */}
      <MenuDrawer ref={menu} />
    </>
  );
}
