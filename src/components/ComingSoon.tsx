import Link from "next/link";
import { Sparkles } from "lucide-react";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { whatsappUrl } from "@/lib/whatsapp";

/**
 * Shown while the catalog has no products yet. Deliberately reads as an
 * intentional "opening soon" moment, not an error or a half-built page.
 */
export function ComingSoon({
  title = "הקולקציה בדרך",
  body = "אנחנו באמצע העלאת חולצות העונה לאתר. השאירו לנו הודעה בוואטסאפ ונעדכן אתכם ברגע שהחנות נפתחת.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <div className="rounded-3xl border border-border bg-surface px-6 py-14 text-center">
      <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent/12 text-accent">
        <Sparkles className="h-6 w-6" aria-hidden />
      </span>
      <h2 className="mt-4 font-display text-2xl font-bold sm:text-3xl">{title}</h2>
      <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted">
        {body}
      </p>
      <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <WhatsAppButton
          href={whatsappUrl("היי Goalix, אשמח שתעדכנו אותי כשהחנות נפתחת")}
          className="w-full sm:w-auto"
        >
          עדכנו אותי בוואטסאפ
        </WhatsAppButton>
        <Link
          href="/contact"
          className="inline-flex min-h-12 w-full items-center justify-center rounded-xl border border-border px-6 font-semibold sm:w-auto"
        >
          דרכי יצירת קשר
        </Link>
      </div>
    </div>
  );
}
