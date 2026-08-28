import type { Metadata } from "next";
import { Container } from "@/components/ui";
import { TodoNotice } from "@/components/TodoNotice";

export const metadata: Metadata = {
  title: "משלוחים והחזרות",
  description: "מדיניות משלוחים, זמני אספקה והחזרות ב-FootballKits-il.",
};

export default function ShippingReturnsPage() {
  return (
    <Container className="py-8">
      <h1 className="font-display text-3xl font-bold uppercase">
        משלוחים והחזרות
      </h1>

      <div className="mt-4">
        <TodoNotice>
          יש לספק את המדיניות המלאה. אין להמציא זמני אספקה, עלויות משלוח, חלון
          החזרה או תנאים.
        </TodoNotice>
      </div>

      <div className="mt-6 space-y-6 text-sm">
        <section>
          <h2 className="text-lg font-semibold">משלוחים</h2>
          <ul className="mt-2 list-disc space-y-1 ps-5 text-muted">
            <li>אזורי משלוח — TODO</li>
            <li>עלות משלוח / משלוח חינם מעל סכום — TODO</li>
            <li>זמן אספקה משוער — TODO</li>
            <li>חברת שילוח / איסוף עצמי — TODO</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold">החלפות והחזרות</h2>
          <ul className="mt-2 list-disc space-y-1 ps-5 text-muted">
            <li>חלון זמן להחזרה — TODO</li>
            <li>מצב המוצר הנדרש להחזרה — TODO</li>
            <li>החזרים על פריטים בהתאמה אישית (שם + מספר) — TODO</li>
            <li>אופן ההחזר הכספי — TODO</li>
          </ul>
        </section>
      </div>
    </Container>
  );
}
