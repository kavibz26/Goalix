"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Container } from "@/components/ui";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container className="flex flex-col items-center gap-4 py-24 text-center">
      <h1 className="font-display text-3xl font-bold">משהו השתבש</h1>
      <p className="text-muted">אירעה שגיאה בטעינת הדף. אפשר לנסות שוב.</p>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={reset}
          className="inline-flex min-h-12 items-center rounded-xl bg-accent px-6 font-semibold text-accent-contrast"
        >
          נסו שוב
        </button>
        <Link
          href="/"
          className="inline-flex min-h-12 items-center rounded-xl border border-border px-6 font-semibold"
        >
          לדף הבית
        </Link>
      </div>
    </Container>
  );
}
