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

// Answers reflect information the site owner has provided (sizes, originality,
// customisation fee, shipping cost, delivery estimate, cancellation / returns,
// payment flow, ordering steps). Do not add facts beyond what the owner supplied.
const FAQ: { q: string; a: string }[] = [
  {
    q: "אילו מידות קיימות?",
    a: "אנחנו מציעים חולצות במגוון מידות, ממידה 6 ועד XXL. מומלץ לבדוק את טבלת המידות לפני ההזמנה כדי לבחור את המידה המתאימה.",
  },
  {
    q: "האם החולצות מקוריות?",
    a: "החולצות אינן חולצות מקוריות של המועדונים, אלא חולצות באיכות גבוהה בהשראת דגמי הקבוצות.",
  },
  {
    q: "האם אפשר להוסיף שם ומספר לחולצה?",
    a: "כן! אפשר להוסיף שם ומספר לבחירתכם בתוספת של 10 ₪.",
  },
  {
    q: "כמה עולה משלוח?",
    a: "עלות המשלוח היא 15 ₪.",
  },
  {
    q: "תוך כמה זמן ההזמנה מגיעה?",
    a: "ההזמנה צפויה להגיע בתוך פחות מחודש.",
  },
  {
    q: "האם ניתן לבטל או להחזיר הזמנה?",
    a: "כן. אפשר לבטל הזמנה או לבקש החזרה. במקרה של החזרה, יש ליצור איתנו קשר כדי לקבל את פרטי התהליך.",
  },
  {
    q: "איך מתבצע התשלום?",
    a: "לאחר בחירת החולצה והפרטים באתר, אנחנו יוצרים איתכם קשר ומסכמים את פרטי התשלום דרך WhatsApp, SMS או אימייל.",
  },
  {
    q: "איך מזמינים חולצה?",
    a: "פשוט מאוד — בוחרים את החולצה באתר, בוחרים מידה, בוחרים אם להוסיף שם ומספר, מוסיפים לסל, ומסכמים את פרטי התשלום דרך WhatsApp.",
  },
  {
    q: "האם ניתן להזמין חולצה שלא מופיעה באתר?",
    a: "נכון לעכשיו אפשר להזמין רק את החולצות שמופיעות באתר.",
  },
  {
    q: "יש לי שאלה או בעיה עם ההזמנה. למי פונים?",
    a: "אפשר ליצור איתנו קשר באמצעות SMS או אימייל, ונשמח לעזור.",
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
