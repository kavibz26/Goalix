"use client";

import { useState } from "react";
import { X, ZoomIn } from "lucide-react";
import Image from "next/image";
import { KitImage } from "@/components/product/KitImage";
import { cn } from "@/lib/cn";

interface Shot {
  src?: string;
  label: string;
}

export function ProductGallery({
  front,
  back,
  title,
}: {
  front?: string;
  back?: string;
  title: string;
}) {
  const shots: Shot[] = [
    { src: front, label: "מלפנים" },
    { src: back, label: "מאחור" },
  ];
  const [active, setActive] = useState(0);
  const [zoomed, setZoomed] = useState(false);

  const current = shots[active];

  return (
    <div>
      <button
        type="button"
        onClick={() => current.src && setZoomed(true)}
        className="relative block aspect-square w-full overflow-hidden rounded-2xl border border-border bg-surface p-4"
        aria-label="הגדל תמונה"
      >
        <KitImage
          src={current.src}
          alt={`${title} — ${current.label}`}
          sizes="(max-width: 768px) 100vw, 480px"
          priority
        />
        {current.src ? (
          <span className="absolute end-3 top-3 rounded-full bg-background/80 p-2 text-muted">
            <ZoomIn className="h-4 w-4" />
          </span>
        ) : null}
      </button>

      <div className="mt-3 flex gap-3">
        {shots.map((s, i) => (
          <button
            key={s.label}
            type="button"
            onClick={() => setActive(i)}
            className={cn(
              "relative h-20 w-20 overflow-hidden rounded-xl border bg-surface p-2",
              i === active ? "border-accent" : "border-border",
            )}
            aria-label={s.label}
            aria-pressed={i === active}
          >
            <KitImage src={s.src} alt={`${title} — ${s.label}`} sizes="80px" />
          </button>
        ))}
      </div>

      {zoomed && current.src ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setZoomed(false)}
        >
          <button
            type="button"
            aria-label="סגור"
            className="absolute end-4 top-4 text-white"
            onClick={() => setZoomed(false)}
          >
            <X className="h-7 w-7" />
          </button>
          <div className="relative h-full max-h-[85vh] w-full max-w-3xl">
            <Image
              src={current.src}
              alt={`${title} — ${current.label} מוגדל`}
              fill
              sizes="90vw"
              className="object-contain"
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
