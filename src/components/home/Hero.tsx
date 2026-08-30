import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

/**
 * Dark, premium hero with violet lighting. Renders the owner-supplied
 * /public/images/hero.jpg when it exists (checked server-side by the caller);
 * otherwise a branded gradient — decorative only, no fake product imagery.
 */
export function Hero({ hasImage }: { hasImage: boolean }) {
  return (
    <section className="relative isolate overflow-hidden bg-night-950 text-white">
      {hasImage ? (
        <>
          <Image
            src="/images/hero.jpg"
            alt="Goalix — חולצות כדורגל"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-night-950/60" />
        </>
      ) : (
        <div className="absolute inset-0 -z-10 bg-gradient-to-tl from-violet-700 via-night-900 to-night-950">
          <div className="absolute -end-24 -top-24 h-96 w-96 rounded-full bg-violet-500/30 blur-3xl" />
          <div className="absolute -start-20 bottom-0 h-80 w-80 rounded-full bg-magenta-500/20 blur-3xl" />
        </div>
      )}

      <div className="mx-auto flex min-h-[64vh] w-full max-w-6xl flex-col items-start justify-center gap-5 px-4 py-20 sm:px-6 sm:py-28">
        <Image
          src="/brand/goalix-logo-dark.png"
          alt="Goalix — FOOTBALL IS YOURS"
          width={984}
          height={664}
          priority
          // The art is composed on pure black; `screen` drops that backdrop so
          // the mark reads as lit-up over the hero's own dark gradient.
          className="h-14 w-auto mix-blend-screen sm:h-20"
        />
        <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold backdrop-blur">
          חולצות כדורגל · 2025/26
        </span>
        <h1 className="font-display text-5xl font-extrabold leading-[1.05] sm:text-7xl">
          פשוט. חכם. בשבילך.
        </h1>
        <p className="max-w-md text-base text-white/85 sm:text-lg">
          בית · חוץ · שלישית — לקבוצות ולנבחרות. בוחרים מידה וגרסה, שולחים הזמנה
          בוואטסאפ.
        </p>
        <Link
          href="/shop"
          className="inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-xl bg-white px-6 font-semibold text-night-950 transition-transform hover:scale-[1.02] active:scale-[0.99] sm:w-auto"
        >
          לכל החולצות
          <ArrowLeft className="h-5 w-5 rtl:rotate-180" />
        </Link>
      </div>
    </section>
  );
}
