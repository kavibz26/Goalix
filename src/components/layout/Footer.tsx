import Link from "next/link";
import { Container } from "@/components/ui";
import { Logo } from "@/components/Logo";
import { site } from "@/config/site";

const COLS = [
  {
    title: "חנות",
    links: [
      { href: "/shop", label: "חנות" },
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
  return (
    <footer className="bg-surface">
      <Container className="grid gap-8 py-10 sm:grid-cols-3">
        <div>
          <Logo withTagline />
          <p className="mt-3 max-w-xs text-sm text-muted">{site.description}</p>
          <ul className="mt-2 text-sm">
            <li>
              <a
                href={`https://wa.me/${site.whatsappNumber}`}
                className={`${footLink} font-semibold text-accent`}
                target="_blank"
                rel="noopener noreferrer"
              >
                וואטסאפ · {site.whatsappDisplay}
              </a>
            </li>
            <li>
              <a
                href={site.contact.smsHref}
                className={`${footLink} font-semibold text-accent`}
              >
                SMS · {site.whatsappDisplay}
              </a>
            </li>
            {site.contact.emails.map((email) => (
              <li key={email}>
                <a href={`mailto:${email}`} className={`${footLink} text-accent`}>
                  {email}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {COLS.map((col) => (
          <div key={col.title}>
            <h3 className="text-sm font-semibold">{col.title}</h3>
            <ul className="mt-1 text-sm text-muted">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={footLink}>
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
