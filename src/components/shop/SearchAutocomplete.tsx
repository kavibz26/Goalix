"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { searchCatalog, type SearchHit } from "@/lib/catalog";
import { cn } from "@/lib/cn";

export function SearchAutocomplete({
  autoFocus = false,
  onNavigate,
  placeholder = "חיפוש קבוצה או חולצה…",
  className,
}: {
  autoFocus?: boolean;
  onNavigate?: () => void;
  placeholder?: string;
  className?: string;
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const boxRef = useRef<HTMLDivElement>(null);

  const hits = useMemo<SearchHit[]>(
    () => (query.trim().length >= 2 ? searchCatalog(query, 8) : []),
    [query],
  );

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!boxRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  function go(hit: SearchHit | undefined) {
    if (hit) {
      router.push(hit.href);
    } else if (query.trim()) {
      router.push(`/shop?q=${encodeURIComponent(query.trim())}`);
    }
    setOpen(false);
    onNavigate?.();
  }

  return (
    <div ref={boxRef} className={cn("relative w-full", className)}>
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          go(hits[active]);
        }}
        className="flex items-center gap-2 rounded-xl border border-border bg-surface-raised px-3"
      >
        <Search className="h-4 w-4 shrink-0 text-muted" aria-hidden />
        <input
          type="search"
          value={query}
          autoFocus={autoFocus}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
            setActive(0);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown")
              setActive((a) => Math.min(a + 1, hits.length - 1));
            if (e.key === "ArrowUp") setActive((a) => Math.max(a - 1, 0));
            if (e.key === "Escape") setOpen(false);
          }}
          placeholder={placeholder}
          aria-label="חיפוש"
          className="min-h-11 w-full bg-transparent text-sm outline-none placeholder:text-muted"
        />
        {query ? (
          <button
            type="button"
            aria-label="נקה חיפוש"
            onClick={() => {
              setQuery("");
              setOpen(false);
            }}
            className="text-muted hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        ) : null}
      </form>

      {open && query.trim().length >= 2 ? (
        <div className="absolute z-50 mt-2 w-full overflow-hidden rounded-xl border border-border bg-surface-raised shadow-lg">
          {hits.length === 0 ? (
            <p className="px-4 py-3 text-sm text-muted">אין תוצאות לחיפוש זה.</p>
          ) : (
            <ul role="listbox">
              {hits.map((hit, i) => (
                <li key={`${hit.kind}-${hit.id}`}>
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onClick={() => go(hit)}
                    className={cn(
                      "flex w-full items-center justify-between gap-3 px-4 py-2.5 text-start text-sm",
                      i === active ? "bg-surface" : "",
                    )}
                  >
                    <span className="truncate">
                      {hit.labelHe ?? hit.label}
                    </span>
                    <span className="shrink-0 text-xs text-muted">
                      {hit.kind === "team" ? "קבוצה" : hit.sub}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : null}
    </div>
  );
}
