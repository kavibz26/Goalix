"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
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
  const uid = useId();
  const listboxId = `${uid}-listbox`;
  const optionId = (i: number) => `${uid}-opt-${i}`;

  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const boxRef = useRef<HTMLDivElement>(null);

  const hits = useMemo<SearchHit[]>(
    () => (query.trim().length >= 2 ? searchCatalog(query, 8) : []),
    [query],
  );
  const showPanel = open && query.trim().length >= 2;
  const expanded = showPanel && hits.length > 0;

  useEffect(() => {
    function onDocPointer(e: PointerEvent) {
      if (!boxRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("pointerdown", onDocPointer);
    return () => document.removeEventListener("pointerdown", onDocPointer);
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
          role="combobox"
          aria-label="חיפוש"
          aria-expanded={expanded}
          aria-controls={listboxId}
          aria-autocomplete="list"
          aria-activedescendant={
            expanded ? optionId(active) : undefined
          }
          value={query}
          autoFocus={autoFocus}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
            setActive(0);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setActive((a) => Math.min(a + 1, hits.length - 1));
            }
            if (e.key === "ArrowUp") {
              e.preventDefault();
              setActive((a) => Math.max(a - 1, 0));
            }
            if (e.key === "Escape") setOpen(false);
          }}
          placeholder={placeholder}
          className="min-h-11 w-full bg-transparent text-sm outline-none placeholder:text-muted"
        />
        {query ? (
          <button
            type="button"
            aria-label="ניקוי חיפוש"
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

      {showPanel ? (
        <div className="absolute z-50 mt-2 w-full overflow-hidden rounded-xl border border-border bg-surface-raised shadow-lg">
          {hits.length === 0 ? (
            <p role="status" className="px-4 py-3 text-sm text-muted">
              אין תוצאות לחיפוש זה.
            </p>
          ) : (
            <ul id={listboxId} role="listbox" aria-label="תוצאות חיפוש">
              {hits.map((hit, i) => (
                <li
                  key={`${hit.kind}-${hit.id}`}
                  id={optionId(i)}
                  role="option"
                  aria-selected={i === active}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => go(hit)}
                  className={cn(
                    "flex cursor-pointer items-center justify-between gap-3 px-4 py-2.5 text-sm",
                    i === active ? "bg-surface" : "",
                  )}
                >
                  <span className="truncate">{hit.labelHe ?? hit.label}</span>
                  <span className="shrink-0 text-xs text-muted">
                    {hit.kind === "team" ? "קבוצה" : hit.sub}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : null}
    </div>
  );
}
