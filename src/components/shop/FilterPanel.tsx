"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { cn } from "@/lib/cn";

export interface FilterOptions {
  teams: { id: string; label: string }[];
  leagues: string[];
  seasons: string[];
  versions: string[];
  ages: string[];
}

const FIELDS = ["team", "league", "season", "version", "age"] as const;
type Field = (typeof FIELDS)[number];

const LABELS: Record<Field, string> = {
  team: "קבוצה",
  league: "ליגה",
  season: "עונה",
  version: "גרסה",
  age: "גיל",
};

export function FilterPanel({ options }: { options: FilterOptions }) {
  const router = useRouter();
  const params = useSearchParams();
  const [open, setOpen] = useState(false);

  const setParam = useCallback(
    (key: string, value: string) => {
      const next = new URLSearchParams(params.toString());
      if (value) next.set(key, value);
      else next.delete(key);
      router.push(`/shop?${next.toString()}`, { scroll: false });
    },
    [params, router],
  );

  const activeCount = FIELDS.filter((f) => params.get(f)).length;

  const valuesFor = (field: Field): { value: string; label: string }[] => {
    switch (field) {
      case "team":
        return options.teams.map((t) => ({ value: t.id, label: t.label }));
      case "league":
        return options.leagues.map((l) => ({ value: l, label: l }));
      case "season":
        return options.seasons.map((s) => ({ value: s, label: s }));
      case "version":
        return options.versions.map((v) => ({ value: v, label: v }));
      case "age":
        return options.ages.map((a) => ({
          value: a,
          label: a === "Kids" ? "ילדים" : "מבוגרים",
        }));
    }
  };

  // `idScope` keeps the control ids unique between the desktop sidebar and the
  // mobile drawer, which are both in the DOM at once for responsiveness.
  const renderBody = (idScope: string) => (
    <div className="space-y-5">
      {FIELDS.map((field) => {
        const opts = valuesFor(field);
        const current = params.get(field) ?? "";
        const id = `${idScope}-filter-${field}`;
        return (
          <div key={field}>
            <label
              htmlFor={id}
              className="mb-1 block text-xs font-semibold text-muted"
            >
              {LABELS[field]}
            </label>
            <select
              id={id}
              value={current}
              onChange={(e) => setParam(field, e.target.value)}
              className="min-h-11 w-full rounded-xl border border-border bg-surface-raised px-3 text-sm"
            >
              <option value="">הכל</option>
              {opts.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        );
      })}

      {activeCount > 0 ? (
        <button
          type="button"
          onClick={() => router.push("/shop", { scroll: false })}
          className="text-sm font-medium text-accent"
        >
          ניקוי סינון ({activeCount})
        </button>
      ) : null}
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:block">
        <h2 className="mb-4 font-display text-lg font-bold">סינון</h2>
        {renderBody("d")}
      </aside>

      {/* Mobile trigger + drawer */}
      <div className="md:hidden">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-border px-4 text-sm font-semibold"
        >
          <SlidersHorizontal className="h-4 w-4" />
          סינון {activeCount > 0 ? `(${activeCount})` : ""}
        </button>

        <div
          className={cn(
            "fixed inset-0 z-50 transition",
            open ? "visible" : "invisible",
          )}
          aria-hidden={!open}
        >
          <div
            className={cn(
              "absolute inset-0 bg-black/50 transition-opacity",
              open ? "opacity-100" : "opacity-0",
            )}
            onClick={() => setOpen(false)}
          />
          <div
            className={cn(
              "absolute inset-y-0 end-0 flex w-80 max-w-[85vw] flex-col overflow-y-auto bg-background p-5 shadow-xl transition-transform",
              open ? "translate-x-0" : "translate-x-full rtl:-translate-x-full",
            )}
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-lg font-bold">סינון</h2>
              <button
                type="button"
                aria-label="סגירת הסינון"
                onClick={() => setOpen(false)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-lg"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {renderBody("m")}
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="mt-6 min-h-12 rounded-xl bg-accent px-6 font-semibold text-accent-contrast"
            >
              הצגת התוצאות
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
