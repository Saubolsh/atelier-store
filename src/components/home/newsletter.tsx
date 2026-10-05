import Link from "next/link";

// Links to a sign-up page rather than collecting emails here: there is no
// newsletter backend yet, and a form that silently drops sign-ups would mislead.
export function Newsletter() {
  return (
    <section aria-labelledby="newsletter-title" className="border-t">
      <div className="container-narrow py-section text-center">
        <h2 id="newsletter-title" className="title-xs">
          Newsletter
        </h2>
        <p className="pt-6 text-2xl md:text-statement">
          Be the first to see new collections, private sales and stories from the workshop.
        </p>
        <Link href="/newsletter" className="btn btn-secondary mt-10">
          Sign up
        </Link>
      </div>
    </section>
  );
}
