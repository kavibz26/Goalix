import { Container } from "@/components/ui";

/** Full-section loading placeholder used by route-level loading.tsx files. */
export function RouteLoading({ label = "טוען…" }: { label?: string }) {
  return (
    <Container className="flex flex-col items-center gap-3 py-24 text-muted">
      <span
        className="h-8 w-8 animate-spin rounded-full border-2 border-border border-t-accent"
        aria-hidden
      />
      <span className="text-sm">{label}</span>
    </Container>
  );
}
