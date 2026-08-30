import type { Metadata } from "next";
import Link from "next/link";
import { Globe, HeartHandshake, Sparkles } from "lucide-react";
import { Container } from "@/components/ui";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { whatsappUrl } from "@/lib/whatsapp";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "אודות",
  description:
    "הסיפור של Goalix — חנות חולצות כדורגל של קבוצות ונבחרות, עם הזמנה פשוטה בוואטסאפ.",
  alternates: { canonical: "/about" },
};

const VALUES = [
  {
    icon: Globe,
    title: "קבוצות ונבחרות",
    body: "חולצות של קבוצות ונבחרות — בית, חוץ ושלישית — לעונה הנוכחית, ישירות אליכם.",
  },
  {
    icon: Sparkles,
    title: "חוויית קנייה פשוטה",
    body: "בוחרים חולצה, מידה וגרסה, מוסיפים שם ומספר אם רוצים, ומסיימים את ההזמנה בשיחת וואטסאפ אחת.",
  },
  {
    icon: HeartHandshake,
    title: "שירות אישי",
    body: "יש שאלה על מידה, גרסה או זמינות? כותבים לנו בוואטסאפ ומקבלים תשובה מאדם אמיתי.",
  },
];

export default function AboutPage() {
  return (
    <Container className="py-10">
      <p className="text-sm font-semibold tracking-wide text-accent">
        {site.tagline}
      </p>
      <h1 className="mt-2 font-display text-4xl font-extrabold">הסיפור שלנו</h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
        Goalix נולד מתוך אהבה לכדורגל ולחולצות שמייצגות אותו. המטרה פשוטה — לתת
        לכם דרך נקייה ומהירה למצוא את החולצה שאתם רוצים, לבחור מידה וגרסה, ולסגור
        הזמנה בלי טפסים ובלי סיבוכים. הכול נסגר איתכם אישית בוואטסאפ.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {VALUES.map(({ icon: Icon, title, body }) => (
          <div
            key={title}
            className="rounded-2xl border border-border bg-surface p-6"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent/12 text-accent">
              <Icon className="h-5 w-5" aria-hidden />
            </span>
            <h2 className="mt-4 text-lg font-bold">{title}</h2>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">{body}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/shop"
          className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-accent px-6 font-semibold text-accent-contrast sm:w-auto"
        >
          לחנות
        </Link>
        <WhatsAppButton
          href={whatsappUrl("היי Goalix, יש לי שאלה")}
          variant="outline"
          className="w-full sm:w-auto"
        />
      </div>
    </Container>
  );
}
