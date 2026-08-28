"use client";

import Image from "next/image";
import { useState } from "react";
import { ImageOff } from "lucide-react";
import { cn } from "@/lib/cn";

interface KitImageProps {
  src?: string;
  alt: string;
  /** Fill the parent (which must be positioned + sized). Default true. */
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  className?: string;
  rounded?: boolean;
}

/**
 * Renders a real, owner-supplied kit photo. When the file is missing or absent
 * from the data it shows a tidy "Image coming soon" state — never a fake mockup.
 */
export function KitImage({
  src,
  alt,
  fill = true,
  width,
  height,
  sizes = "(max-width: 768px) 50vw, 25vw",
  priority = false,
  className,
  rounded = true,
}: KitImageProps) {
  const [errored, setErrored] = useState(false);
  const missing = !src || errored;

  if (missing) {
    return (
      <div
        className={cn(
          "flex h-full w-full flex-col items-center justify-center gap-2 bg-surface text-muted",
          rounded && "rounded-xl",
          className,
        )}
        role="img"
        aria-label={`${alt} — תמונה בקרוב`}
      >
        <ImageOff className="h-7 w-7" aria-hidden />
        <span className="text-xs font-medium">תמונה בקרוב</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      sizes={fill ? sizes : undefined}
      priority={priority}
      onError={() => setErrored(true)}
      className={cn("object-contain", rounded && "rounded-xl", className)}
    />
  );
}
