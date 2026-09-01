import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

/**
 * Dark, premium hero. Renders the owner-supplied /public/images/hero.jpg when
 * it exists (checked server-side by the caller); otherwise a branded indigo /
 * navy gradient — decorative only, no fake product imagery.
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
          <div className="absolute inset-0 bg-night-950/65" />
        </>
      ) : (
        <div className="absolute inset-0 -z-10 bg-gradient-to-tl from-violet-700 via-night-900 to-night-950">
          <div className="absolute -end-24 -top-24 h-96 w-96 rounded-full bg-violet-500/25 blur-3xl" />
          <div className="absolute -start-24 bottom-0 h-80 w-80 rounded-full bg-violet-400/15 blur-3xl" />
        </div>
      )}

      <div className="mx-auto flex min-h-[58vh] w-full max-w-6xl flex-col items-start justify-center gap-6 px-4 py-16 sm:min-h-[64vh] sm:px-6 sm:py-24">
        <Image
          src="/brand/goalix-logo-dark.png"
          alt="Goalix — FOOTBALL IS YOURS"
          width={984}
          height={664}
          priority
          // The art is composed on pure black; `screen` drops that backdrop so
          // the mark reads as lit-up over the hero's own dark gradient.
          className="h-12 w-auto mix-blend-screen sm:h-16"
        />

        <div className="flex flex-col gap-4">
          <span className="w-fit rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold backdrop-blur">
            חנות חולצות כדורגל
          </span>
          <h1 className="font-display text-4xl font-extrabold leading-[1.08] sm:text-6xl">
            חולצות כדורגל של קבוצות ונבחרות
          </h1>
          <p className="max-w-lg text-base leading-relaxed text-white/85 sm:text-lg">
            בוחרים חולצה, מידה וגרסה, מוסיפים שם ומספר אם רוצים — ומסיימים את
            ההזמנה בוואטסאפ.
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
          <Link
            href="/shop"
            className="inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-xl bg-white px-6 font-semibold text-night-950 transition-transform hover:scale-[1.02] active:scale-[0.99] sm:w-auto"
          >
            לצפייה בחולצות
            <ArrowLeft className="h-5 w-5 rtl:rotate-180" aria-hidden />
          </Link>
          <a
            href="#how-it-works"
            className="inline-flex min-h-13 w-full items-center justify-center rounded-xl border border-white/25 px-6 font-semibold text-white transition-colors hover:bg-white/10 sm:w-auto"
          >
            איך זה עובד?
          </a>
        </div>

        <p className="text-xs text-white/80 sm:text-sm">
          בחירת מידה וגרסה · התאמת שם ומספר · הזמנה בוואטסאפ
        </p>
      </div>
    </section>
  );
}
