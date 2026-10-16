import { btn } from "@/components/section";
import { PHARMACY } from "@/lib/pharmacy";
import { Phone } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-gradient-to-b from-[#f9f9f6] to-white px-4 py-20">
      <div className="mx-auto max-w-xl text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand">Error 404</p>
        <h1 className="mt-3 text-4xl font-bold text-ink sm:text-5xl">Page not found</h1>
        <p className="mt-4 text-lg text-slate-600">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It may have been moved, or
          the link may be incorrect.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/" className={btn.primary}>
            Back to home
          </Link>
          <a href={PHARMACY.phoneHref} className={btn.outline}>
            <Phone className="h-4 w-4" />
            {PHARMACY.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  );
}
