import Link from "next/link";
import { Container } from "@/components/ui";
import { Logo } from "@/components/Logo";
import { site } from "@/config/site";

const NAV_COLS = [
  {
    title: "חנות",
    links: [
      { href: "/shop", label: "כל החולצות" },
      { href: "/deals", label: "מבצעים" },
      { href: "/about", label: "אודות" },
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

// Tap-target-friendly link on mobile (~40px tall via block + py).
const footLink = "block py-2.5 hover:text-foreground";

export function Footer() {
  const { whatsappNumber, whatsappDisplay, contact } = site;

  return (
    <footer className="border-t border-border bg-surface">
      <Container className="grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <Logo withTagline />
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
            {site.description}
          </p>
        </div>

        {NAV_COLS.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h2 className="text-sm font-semibold">{col.title}</h2>
            <ul className="mt-1 text-sm text-muted">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={footLink}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div>
          <h2 className="text-sm font-semibold">יצירת קשר</h2>
          <ul className="mt-1 text-sm text-muted">
            <li>
              <a
                href={`https://wa.me/${whatsappNumber}`}
                className={`${footLink} font-semibold text-accent`}
                target="_blank"
                rel="noopener noreferrer"
              >
                וואטסאפ · {whatsappDisplay}
              </a>
            </li>
            <li>
              <a
                href={contact.smsHref}
                className={`${footLink} font-semibold text-accent`}
              >
                SMS · {whatsappDisplay}
              </a>
            </li>
            {contact.emails.map((email) => (
              <li key={email}>
                <a href={`mailto:${email}`} className={`${footLink} text-accent`}>
                  {email}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <div className="border-t border-border py-4 text-center text-xs text-muted">
        © {new Date().getFullYear()} {site.name}. כל הזכויות שמורות.
      </div>
    </footer>
  );
}
