import Link from "next/link";
import { Container } from "@/components/ui";

export default function NotFound() {
  return (
    <Container className="flex flex-col items-center gap-4 py-24 text-center">
      <h1 className="font-display text-5xl font-bold uppercase">404</h1>
      <p className="text-muted">הדף שחיפשתם לא נמצא.</p>
      <Link
        href="/"
        className="inline-flex min-h-12 items-center rounded-xl bg-accent px-6 font-semibold text-accent-contrast"
      >
        חזרה לדף הבית
      </Link>
    </Container>
  );
}
