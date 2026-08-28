import type { Metadata } from "next";
import { Container } from "@/components/ui";
import { TodoNotice } from "@/components/TodoNotice";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { whatsappUrl } from "@/lib/whatsapp";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "צור קשר",
  description: "דרכי יצירת קשר עם FootballKits-il.",
};

export default function ContactPage() {
  const { email, phone, address } = site.contact;

  return (
    <Container className="py-8">
      <h1 className="font-display text-3xl font-bold uppercase">צור קשר</h1>

      <p className="mt-3 text-sm text-muted">
        הדרך המהירה ביותר להזמין או לשאול — וואטסאפ.
      </p>

      <div className="mt-4">
        <WhatsAppButton
          href={whatsappUrl("Hi FootballKits-il, I have a question")}
        >
          פתיחת צ׳אט בוואטסאפ · {site.whatsappDisplay}
        </WhatsAppButton>
      </div>

      <div className="mt-8 space-y-3 text-sm">
        <div className="mb-4">
          <TodoNotice>
            יש לספק אימייל, טלפון וכתובת (אם רלוונטי) בקובץ src/config/site.ts.
          </TodoNotice>
        </div>
        <p>
          <span className="font-semibold">אימייל: </span>
          {email || "TODO"}
        </p>
        <p>
          <span className="font-semibold">טלפון: </span>
          {phone || "TODO"}
        </p>
        <p>
          <span className="font-semibold">כתובת: </span>
          {address || "TODO"}
        </p>
      </div>
    </Container>
  );
}
