import type { Metadata } from "next";
import { MessageCircle, Phone, Mail } from "lucide-react";
import { Container } from "@/components/ui";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { whatsappUrl } from "@/lib/whatsapp";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "צור קשר",
  description: "דרכי יצירת קשר עם Goalix — וואטסאפ, SMS ואימייל.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const { phoneDisplay, smsHref, emails } = site.contact;

  return (
    <Container className="py-8">
      <h1 className="font-display text-3xl font-bold">צור קשר</h1>
      <p className="mt-3 max-w-lg text-sm text-muted">
        הדרך המהירה ביותר להזמין או לשאול היא וואטסאפ. אפשר גם ב־SMS או באימייל.
      </p>

      <div className="mt-6 grid gap-4 sm:max-w-lg">
        {/* WhatsApp */}
        <div className="rounded-2xl border border-border bg-surface-raised p-5">
          <div className="flex items-center gap-2 font-semibold">
            <MessageCircle className="h-5 w-5 text-accent" aria-hidden />
            וואטסאפ
          </div>
          <p className="mt-1 text-sm text-muted">
            הזמנות, שאלות על מידות וזמינות — {phoneDisplay}
          </p>
          <WhatsAppButton
            href={whatsappUrl("היי Goalix, יש לי שאלה")}
            className="mt-3 w-full sm:w-auto"
          >
            פתיחת צ׳אט בוואטסאפ
          </WhatsAppButton>
        </div>

        {/* SMS */}
        <div className="rounded-2xl border border-border bg-surface-raised p-5">
          <div className="flex items-center gap-2 font-semibold">
            <Phone className="h-5 w-5 text-accent" aria-hidden />
            SMS
          </div>
          <p className="mt-1 text-sm text-muted">
            שליחת הודעת טקסט לאותו מספר — {phoneDisplay}
          </p>
          <a
            href={smsHref}
            className="mt-3 inline-flex min-h-12 w-full items-center justify-center rounded-xl border border-accent px-6 font-semibold text-accent sm:w-auto"
          >
            שליחת SMS
          </a>
        </div>

        {/* Email */}
        <div className="rounded-2xl border border-border bg-surface-raised p-5">
          <div className="flex items-center gap-2 font-semibold">
            <Mail className="h-5 w-5 text-accent" aria-hidden />
            אימייל
          </div>
          <ul className="mt-2 space-y-2 text-sm">
            {emails.map((email) => (
              <li key={email}>
                <a
                  href={`mailto:${email}`}
                  className="font-medium text-accent hover:underline"
                >
                  {email}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Container>
  );
}
