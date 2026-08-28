import type { Metadata } from "next";
import { Container } from "@/components/ui";
import { TodoNotice } from "@/components/TodoNotice";

export const metadata: Metadata = {
  title: "שאלות נפוצות",
  description: "שאלות ותשובות נפוצות על הזמנת חולצות כדורגל ב-FootballKits-il.",
};

// Questions are structural placeholders. Real answers to be supplied by the owner.
const QUESTIONS = [
  "איך מזמינים? (תהליך ההזמנה בוואטסאפ)",
  "מהם זמני האספקה?",
  "איך בוחרים מידה נכונה?",
  "מה ההבדל בין גרסת אוהד (Fan) לגרסת שחקן (Player)?",
  "האם אפשר להוסיף שם ומספר?",
  "מהי מדיניות ההחלפות וההחזרות?",
  "אילו אמצעי תשלום מתקבלים?",
];

export default function FaqPage() {
  return (
    <Container className="py-8">
      <h1 className="font-display text-3xl font-bold uppercase">שאלות נפוצות</h1>

      <div className="mt-4">
        <TodoNotice>
          יש לספק את התשובות המלאות לכל שאלה. עד אז מוצגות רק הכותרות.
        </TodoNotice>
      </div>

      <div className="mt-6 divide-y divide-border">
        {QUESTIONS.map((q) => (
          <details key={q} className="group py-4">
            <summary className="cursor-pointer list-none font-semibold">
              {q}
            </summary>
            <p className="mt-2 text-sm text-muted">
              (התשובה תתווסף על ידי בעל האתר.)
            </p>
          </details>
        ))}
      </div>
    </Container>
  );
}
