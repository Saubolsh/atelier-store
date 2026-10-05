import Link from "next/link";

import { footerNav } from "@/lib/navigation";

export function SiteFooter() {
  return (
    <footer className="inverse bg-canvas">
      <div className="container-page grid gap-12 py-section md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href="/" className="title-md tracking-[0.4em]">
            Atelier
          </Link>
          <p className="max-w-64 pt-4 text-caption text-muted">
            Leather goods and ready-to-wear, cut and finished by hand.
          </p>
        </div>

        {footerNav.map((group) => (
          <nav key={group.title} aria-label={group.title}>
            <h2 className="title-xs text-muted">{group.title}</h2>
            <ul className="mt-6 flex flex-col gap-4 text-caption">
              {group.links.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="link">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="border-t">
        <div className="container-page flex flex-col gap-2 py-6 text-caption text-muted md:flex-row md:justify-between">
          <p>© {new Date().getFullYear()} Atelier Store</p>
          <p>United States · USD</p>
        </div>
      </div>
    </footer>
  );
}
