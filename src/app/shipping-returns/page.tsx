import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { whatsappUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "משלוחים והחזרות",
  description: "פרטי המשלוחים ומדיניות הביטול וההחזרה של Goalix.",
  alternates: { canonical: "/shipping-returns" },
};

export default function ShippingReturnsPage() {
  return (
    <Container className="py-8">
      <h1 className="font-display text-3xl font-bold">משלוחים והחזרות</h1>
      <p className="mt-3 max-w-xl text-sm text-muted">
        את ההזמנה סוגרים איתכם אישית בוואטסאפ, ושם גם מתאמים את פרטי המשלוח
        וההחזרה.
      </p>

      <div className="mt-6 space-y-6">
        <section className="rounded-2xl border border-border bg-surface-raised p-5">
          <h2 className="text-lg font-semibold">משלוחים</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            עלות המשלוח היא 15 ₪. ההזמנה צפויה להגיע בתוך פחות מחודש.
          </p>
        </section>

        <section className="rounded-2xl border border-border bg-surface-raised p-5">
          <h2 className="text-lg font-semibold">הוספת שם ומספר</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            אפשר להוסיף שם ומספר לחולצה בתוספת של 10 ₪.
          </p>
        </section>

        <section className="rounded-2xl border border-border bg-surface-raised p-5">
          <h2 className="text-lg font-semibold">ביטול והחזרה</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            חולצה עם שם ומספר מיוצרת במיוחד עבורכם, ולכן אינה ניתנת לביטול או
            להחזרה. חולצה ללא הדפסה אישית ניתן לבטל בתוך 14 יום מקבלת ההזמנה,
            כשהיא חדשה ולא נעשה בה שימוש — ייתכנו דמי ביטול לפי חוק (עד 5% ממחיר
            הפריט או עד 100 ₪, לפי הנמוך) ודמי המשלוח בחזרה על הלקוח. פריט פגום או
            שאינו תואם לתיאור — נחליף אותו או נזכה אתכם במלואו, ללא עלות. לביטול
            או לכל שאלה כתבו לנו בוואטסאפ, ב-SMS או באימייל.
          </p>
        </section>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <WhatsAppButton href={whatsappUrl("היי Goalix, שאלה על משלוח / החזרה")} />
        <Link
          href="/contact"
          className="inline-flex min-h-12 items-center rounded-xl border border-border px-6 font-semibold"
        >
          דרכי יצירת קשר
        </Link>
      </div>
    </Container>
  );
}
