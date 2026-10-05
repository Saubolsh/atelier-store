import Link from "next/link";

export function AnnouncementBar() {
  return (
    <p className="bg-surface px-gutter py-3 text-center text-caption">
      Complimentary shipping and returns.{" "}
      <Link href="/shipping" className="link font-medium">
        Learn more
      </Link>
    </p>
  );
}
