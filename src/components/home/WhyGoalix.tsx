import { Shirt, Ruler, PenLine, MessageCircle } from "lucide-react";

/**
 * "Why Goalix" — evergreen value props. Every point maps to a capability that
 * already exists on the site (catalog of kits, size picker, name/number
 * customisation, WhatsApp checkout). No claims beyond that.
 */
const POINTS = [
  {
    icon: Shirt,
    title: "מבחר חולצות כדורגל",
    body: "חולצות של קבוצות ונבחרות — דגמי בית, חוץ ושלישית לעונה הנוכחית.",
  },
  {
    icon: Ruler,
    title: "בחירת מידה",
    body: "מידות למבוגרים ולילדים, עם טבלת מידות בכל עמוד חולצה.",
  },
  {
    icon: PenLine,
    title: "התאמה אישית",
    body: "אפשר להוסיף שם ומספר לחולצה — בדיוק כמו של השחקנים.",
  },
  {
    icon: MessageCircle,
    title: "הזמנה בוואטסאפ",
    body: "בלי טפסים ובלי תשלום באתר — סוגרים את ההזמנה בצ׳אט אחד.",
  },
];

export function WhyGoalix() {
  return (
    <section aria-labelledby="why-goalix">
      <h2
        id="why-goalix"
        className="font-display text-2xl font-bold sm:text-3xl"
      >
        <span className="inline-block border-b-2 border-accent pb-1">
          למה Goalix?
        </span>
      </h2>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {POINTS.map(({ icon: Icon, title, body }) => (
          <div
            key={title}
            className="rounded-2xl border border-border bg-surface-raised p-5 transition-colors hover:border-accent/40"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
              <Icon className="h-5 w-5" aria-hidden />
            </span>
            <h3 className="mt-4 font-semibold">{title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">{body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
