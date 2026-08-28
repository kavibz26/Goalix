import { Star } from "lucide-react";
import type { Review } from "@/lib/types";
import { EmptyState } from "@/components/ui";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex" aria-label={`דירוג ${rating} מתוך 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className="h-4 w-4"
          fill={n <= Math.round(rating) ? "currentColor" : "none"}
        />
      ))}
    </div>
  );
}

export function ReviewList({ reviews }: { reviews: Review[] }) {
  if (reviews.length === 0) {
    return <EmptyState title="עדיין אין ביקורות על החולצה הזו." />;
  }

  return (
    <ul className="space-y-4">
      {reviews.map((r, i) => (
        <li key={i} className="rounded-xl border border-border bg-surface-raised p-4">
          <div className="flex items-center justify-between gap-3">
            <span className="font-semibold">{r.author}</span>
            <span className="text-accent">
              <Stars rating={r.rating} />
            </span>
          </div>
          {r.title ? <p className="mt-1 font-medium">{r.title}</p> : null}
          <p className="mt-1 text-sm text-muted">{r.body}</p>
          {r.date ? (
            <p className="mt-2 text-xs text-muted">{r.date}</p>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
