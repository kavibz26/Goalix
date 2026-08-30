import { cn } from "@/lib/cn";
import { site } from "@/config/site";

/**
 * Goalix brand mark — a "G + swoosh" monogram — plus the wordmark.
 * SVG approximation of the brand identity, not a final logo file.
 */
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      aria-hidden
      className={cn("h-7 w-7", className)}
    >
      <defs>
        <linearGradient id="goalix-mark" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--color-violet-400)" />
          <stop offset="1" stopColor="var(--color-violet-700)" />
        </linearGradient>
      </defs>
      <g
        fill="none"
        stroke="url(#goalix-mark)"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M45 23 A15 15 0 1 0 45 41 L33 41 L33 34" />
        <path d="M40 44 Q50 50 55 58" />
      </g>
    </svg>
  );
}

export function Logo({
  className,
  withTagline = false,
}: {
  className?: string;
  withTagline?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <BrandMark />
      <span className="flex flex-col leading-none">
        <span className="font-display text-xl font-extrabold tracking-tight">
          Goalix
        </span>
        {withTagline ? (
          <span className="mt-0.5 text-[10px] font-medium tracking-wide text-muted">
            {site.tagline}
          </span>
        ) : null}
      </span>
    </span>
  );
}
