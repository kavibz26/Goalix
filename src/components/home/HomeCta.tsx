import Link from "next/link";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { whatsappUrl } from "@/lib/whatsapp";

/**
 * Closing call-to-action. While the catalog is still empty it points at
 * WhatsApp (so it never sends people to an empty shop); once kits are live it
 * links straight to /shop.
 */
export function HomeCta({ catalogReady }: { catalogReady: boolean }) {
  return (
    <section className="flex flex-col items-center gap-4 rounded-3xl border border-border bg-surface px-6 py-12 text-center">
      <h2 className="font-display text-2xl font-bold sm:text-3xl">
        {catalogReady ? "מוכנים לבחור?" : "רוצים להיות הראשונים?"}
      </h2>
      <p className="max-w-md text-sm leading-relaxed text-muted">
        {catalogReady
          ? "כל חולצות הקבוצות והנבחרות במקום אחד — בחירה, מידה והזמנה בוואטסאפ."
          : "השאירו הודעה בוואטסאפ ונעדכן אתכם ברגע שהחולצות עולות לאתר."}
      </p>
      <div className="flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
        {catalogReady ? (
          <Link
            href="/shop"
            className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-accent px-6 font-semibold text-accent-contrast transition-transform hover:scale-[1.02] active:scale-[0.99] sm:w-auto"
          >
            לכל החולצות
          </Link>
        ) : (
          <WhatsAppButton
            href={whatsappUrl("היי Goalix, אשמח שתעדכנו אותי כשהחנות נפתחת")}
            className="w-full sm:w-auto"
          >
            עדכנו אותי בוואטסאפ
          </WhatsAppButton>
        )}
        <Link
          href="/about"
          className="inline-flex min-h-12 w-full items-center justify-center rounded-xl border border-border px-6 font-semibold transition-colors hover:border-accent/40 sm:w-auto"
        >
          קצת עלינו
        </Link>
      </div>
    </section>
  );
}
