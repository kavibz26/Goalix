import Link from "next/link";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { whatsappUrl } from "@/lib/whatsapp";

function PackageArt() {
  return (
    <svg viewBox="0 0 120 110" aria-hidden className="mx-auto h-28 w-28">
      <defs>
        <linearGradient id="cs-box" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--color-violet-400)" />
          <stop offset="1" stopColor="var(--color-violet-700)" />
        </linearGradient>
      </defs>
      {/* box */}
      <path
        d="M60 40 L96 54 V88 L60 104 L24 88 V54 Z"
        fill="url(#cs-box)"
        opacity="0.15"
      />
      <path
        d="M60 40 L96 54 V88 L60 104 L24 88 V54 Z M60 40 L60 104 M24 54 L60 70 L96 54"
        fill="none"
        stroke="url(#cs-box)"
        strokeWidth="3.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {/* G mark rising out */}
      <g
        transform="translate(44 6) scale(0.62)"
        fill="none"
        stroke="url(#cs-box)"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M45 23 A15 15 0 1 0 45 41 L33 41 L33 34" />
        <path d="M40 44 Q50 50 55 58" />
      </g>
      {/* sparkles */}
      <g fill="var(--color-magenta-500)">
        <circle cx="20" cy="30" r="2.5" />
        <circle cx="102" cy="24" r="2" />
        <circle cx="98" cy="44" r="2.5" />
      </g>
    </svg>
  );
}

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
      <PackageArt />
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
