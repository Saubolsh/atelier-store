import Link from "next/link";

// Replaces Next's default 404, whose inline body styles (black in dark mode)
// would override the design system inside our layout.
export default function NotFound() {
  return (
    <section className="container-narrow flex min-h-[60svh] flex-col items-center justify-center gap-6 py-section text-center">
      <p className="title-xs text-muted">404</p>
      <h1 className="title-xl">Page not found</h1>
      <p className="text-body text-muted">The page you are looking for does not exist or has moved.</p>
      <Link href="/" className="btn btn-primary mt-4">
        Back to the homepage
      </Link>
    </section>
  );
}
