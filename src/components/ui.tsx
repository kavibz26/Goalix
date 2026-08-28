import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Small coloured pill used for deal / season / version badges. */
export function Badge({
  children,
  tone = "accent",
  className,
}: {
  children: ReactNode;
  tone?: "accent" | "hot" | "muted";
  className?: string;
}) {
  const tones = {
    accent: "bg-accent text-accent-contrast",
    hot: "bg-orange-500 text-white",
    muted: "bg-surface text-muted",
  } as const;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Section heading with an optional "see all" link on the opposite side. */
export function SectionHeader({
  title,
  action,
}: {
  title: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-4 flex items-end justify-between gap-4">
      <h2 className="font-display text-2xl font-bold sm:text-3xl">
        <span className="inline-block border-b-4 border-accent pb-1">{title}</span>
      </h2>
      {action}
    </div>
  );
}

export function EmptyState({
  title,
  hint,
}: {
  title: string;
  hint?: string;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-surface/60 px-6 py-12 text-center">
      <p className="font-medium">{title}</p>
      {hint ? <p className="mt-1 text-sm text-muted">{hint}</p> : null}
    </div>
  );
}

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-4 sm:px-6", className)}>
      {children}
    </div>
  );
}
