import Link from "next/link";

// No href marks the current page, which should be the last crumb.
export type Crumb = { label: string; href?: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      {/* font-normal: body's light 300 weight is too faint at UI scale. */}
      <ol className="flex flex-wrap gap-x-2 text-body font-normal text-muted">
        {items.map((item, index) => (
          // The separator lives inside the item so screen readers count only
          // real crumbs.
          <li key={item.label} className="flex gap-x-2">
            {index > 0 && <span aria-hidden="true">/</span>}
            {item.href ? (
              <Link href={item.href} className="link-quiet text-ink">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
