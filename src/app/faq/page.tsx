import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { whatsappUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "שאלות נפוצות",
  description: "שאלות ותשובות נפוצות על הזמנת חולצות כדורגל ב-Goalix.",
  alternates: { canonical: "/faq" },
};

// Answers stay within what the project actually supports (the on-site flow) or
// defer neutrally. No delivery times, prices, return terms, payment methods or
// other business policy is stated unless the owner has provided it.
const FAQ: { q: string; a: string }[] = [
  {
    q: "איך מזמינים?",
    a: "בוחרים חולצה, מסמנים מידה וגרסה, ואם רוצים מוסיפים שם ומספר. מוסיפים לעגלה, ובעגלה לוחצים „המשך להזמנה בוואטסאפ” — וואטסאפ ייפתח עם פירוט ההזמנה. את שאר הפרטים נשלים איתכם בצ’אט.",
  },
  {
    q: "מהם זמני האספקה?",
    a: "זמני האספקה יימסרו בתיאום ההזמנה בוואטסאפ.",
  },
  {
    q: "איך בוחרים מידה נכונה?",
    a: "בעמוד כל חולצה יש בורר מידות. אם אתם מתלבטים בין מידות — כתבו לנו בוואטסאפ לפני ההזמנה ונשמח לעזור.",
  },
  {
    q: "מה ההבדל בין גרסת אוהד (Fan) לגרסת שחקן (Player)?",
    a: "אלה שתי גרסאות של אותה חולצה. בוחרים גרסה בעמוד החולצה, והמחיר מתעדכן בהתאם לגרסה שנבחרה.",
  },
  {
    q: "אפשר להוסיף שם ומספר?",
    a: "כן. בעמוד החולצה יש שדות להוספת שם ומספר להזמנה.",
  },
  {
    q: "מהי מדיניות ההחלפות וההחזרות?",
    a: "תנאי ההחלפות וההחזרות יימסרו בתיאום ההזמנה. לכל שאלה — פנו אלינו בוואטסאפ, ב-SMS או באימייל.",
  },
  {
    q: "אילו אמצעי תשלום מתקבלים?",
    a: "אין תשלום באתר. אופן התשלום ייסגר איתכם בשיחת הוואטסאפ.",
  },
];

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  return (
    <Container className="py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <h1 className="font-display text-3xl font-bold">שאלות נפוצות</h1>

      <div className="mt-6 divide-y divide-border border-y border-border">
        {FAQ.map(({ q, a }) => (
          <details key={q} className="group py-4">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-semibold">
              {q}
              <span className="text-muted transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-2 text-sm leading-relaxed text-muted">{a}</p>
          </details>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-border bg-surface p-6">
        <p className="font-semibold">לא מצאתם תשובה?</p>
        <p className="mt-1 text-sm text-muted">
          אנחנו כאן בוואטסאפ לכל שאלה על מידות, זמינות או הזמנה.
        </p>
        <div className="mt-3 flex flex-wrap gap-3">
          <WhatsAppButton href={whatsappUrl("היי Goalix, יש לי שאלה")} />
          <Link
            href="/contact"
            className="inline-flex min-h-12 items-center rounded-xl border border-border px-6 font-semibold"
          >
            דרכי יצירת קשר
          </Link>
        </div>
      </div>
    </Container>
  );
}
