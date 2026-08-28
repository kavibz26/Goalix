import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

/**
 * Hero banner. Renders the owner-supplied /public/images/hero.jpg when it
 * exists (checked server-side by the caller); otherwise a plain branded
 * gradient — decorative only, no fake product imagery.
 */
export function Hero({ hasImage }: { hasImage: boolean }) {
  return (
    <section className="relative isolate overflow-hidden">
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
          <div className="absolute inset-0 -z-10 bg-navy-950/55" />
        </>
      ) : (
        <div className="absolute inset-0 -z-10 bg-gradient-to-tl from-azure-500 via-azure-800 to-navy-950">
          <div className="absolute -end-24 -top-24 h-80 w-80 rounded-full bg-azure-300/30 blur-3xl" />
          <div className="absolute -start-16 bottom-0 h-72 w-72 rounded-full bg-azure-400/20 blur-3xl" />
        </div>
      )}

      <div className="mx-auto flex min-h-[62vh] w-full max-w-6xl flex-col items-start justify-center gap-5 px-4 py-16 text-white sm:px-6 sm:py-24">
        <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">
          עונת 2025/26
        </span>
        <h1 className="font-display text-4xl font-bold sm:text-6xl">
          חולצות כדורגל
        </h1>
        <p className="max-w-md text-sm text-white/85 sm:text-base">
          בית, חוץ ושלישית לכל הקבוצות הגדולות. בחירה, מידה, והזמנה בוואטסאפ תוך שתי
          לחיצות.
        </p>
        <Link
          href="/shop"
          className="inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 font-semibold text-accent-contrast transition-transform hover:scale-[1.02] active:scale-[0.99] sm:w-auto"
        >
          לחנות החולצות החדשות
          <ArrowLeft className="h-5 w-5 rtl:rotate-180" />
        </Link>
      </div>
    </section>
  );
}
