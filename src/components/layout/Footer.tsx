import Link from "next/link";
import { Container } from "@/components/ui";
import { site } from "@/config/site";

const COLS = [
  {
    title: "חנות",
    links: [
      { href: "/shop", label: "כל החולצות" },
      { href: "/deals", label: "מבצעים" },
    ],
  },
  {
    title: "מידע",
    links: [
      { href: "/faq", label: "שאלות נפוצות" },
      { href: "/shipping-returns", label: "משלוחים והחזרות" },
      { href: "/contact", label: "צור קשר" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-surface">
      <Container className="grid gap-8 py-10 sm:grid-cols-3">
        <div>
          <div className="font-display text-lg font-bold tracking-wide uppercase">
            {site.name}
          </div>
          <p className="mt-2 max-w-xs text-sm text-muted">{site.description}</p>
          <p className="mt-3 text-sm">
            וואטסאפ להזמנות:{" "}
            <a
              href={`https://wa.me/${site.whatsappNumber}`}
              className="font-semibold text-accent"
              target="_blank"
              rel="noopener noreferrer"
            >
              {site.whatsappDisplay}
            </a>
          </p>
        </div>

        {COLS.map((col) => (
          <div key={col.title}>
            <h3 className="text-sm font-semibold">{col.title}</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-foreground">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>

      <div className="border-t border-border py-4 text-center text-xs text-muted">
        © {new Date().getFullYear()} {site.name}. כל הזכויות שמורות.
      </div>
    </footer>
  );
}
