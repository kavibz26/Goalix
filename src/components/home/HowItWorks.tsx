/**
 * "How it works" — the three steps of the real ordering flow on this site:
 * pick a kit, set size / name / number, then send the order on WhatsApp.
 */
const STEPS = [
  {
    n: "01",
    title: "בוחרים",
    body: "בוחרים חולצה מהחנות — הקבוצה, העונה והגרסה (אוהד או שחקן) שרוצים.",
  },
  {
    n: "02",
    title: "מתאימים",
    body: "בוחרים מידה, ואם בא לכם — מוסיפים שם ומספר לגב החולצה.",
  },
  {
    n: "03",
    title: "מזמינים",
    body: "מוסיפים לעגלה ולוחצים ״המשך להזמנה בוואטסאפ״. שם סוגרים תשלום ומשלוח.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" aria-labelledby="how-it-works-title">
      <h2
        id="how-it-works-title"
        className="font-display text-2xl font-bold sm:text-3xl"
      >
        <span className="inline-block border-b-2 border-accent pb-1">
          איך זה עובד?
        </span>
      </h2>
      <ol className="mt-6 grid gap-3 sm:grid-cols-3">
        {STEPS.map(({ n, title, body }) => (
          <li
            key={n}
            className="rounded-2xl border border-border bg-surface-raised p-5"
          >
            <span
              className="font-display text-3xl font-extrabold text-accent/35"
              aria-hidden
            >
              {n}
            </span>
            <h3 className="mt-2 font-semibold">{title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">{body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
