"use client";

import { Minus, Plus } from "lucide-react";

type QtyInput = number | ((prev: number) => number);

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 99,
}: {
  value: number;
  onChange: (next: QtyInput) => void;
  min?: number;
  max?: number;
}) {
  const clamp = (n: number) => Math.max(min, Math.min(max, n));
  return (
    <div className="inline-flex items-center rounded-xl border border-border">
      <button
        type="button"
        aria-label="הפחת כמות"
        // Functional update: rapid taps that fire before a re-render still
        // accumulate against the latest value.
        onClick={() => onChange((v) => clamp(v - 1))}
        className="inline-flex h-11 w-11 items-center justify-center disabled:opacity-40"
        disabled={value <= min}
      >
        <Minus className="h-4 w-4" />
      </button>
      <input
        type="number"
        inputMode="numeric"
        value={value}
        min={min}
        max={max}
        onChange={(e) => onChange(clamp(Number(e.target.value) || min))}
        className="h-11 w-12 border-x border-border bg-transparent text-center text-sm font-semibold outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
        aria-label="כמות"
      />
      <button
        type="button"
        aria-label="הוסף כמות"
        onClick={() => onChange((v) => clamp(v + 1))}
        className="inline-flex h-11 w-11 items-center justify-center disabled:opacity-40"
        disabled={value >= max}
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}
