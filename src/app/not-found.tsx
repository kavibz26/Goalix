import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui";

export const metadata: Metadata = {
  title: "הדף לא נמצא",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <Container className="flex flex-col items-center gap-4 py-24 text-center">
      <h1 className="font-display text-5xl font-bold">404</h1>
      <p className="text-muted">הדף שחיפשתם לא נמצא.</p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="inline-flex min-h-12 items-center rounded-xl bg-accent px-6 font-semibold text-accent-contrast"
        >
          חזרה לדף הבית
        </Link>
        <Link
          href="/shop"
          className="inline-flex min-h-12 items-center rounded-xl border border-border px-6 font-semibold"
        >
          כל החולצות
        </Link>
      </div>
    </Container>
  );
}
