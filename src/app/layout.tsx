import type { Metadata, Viewport } from "next";
import { Heebo, Rubik } from "next/font/google";
import "./globals.css";
import { site } from "@/config/site";
import { Providers } from "@/components/Providers";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileWhatsAppBar } from "@/components/layout/MobileWhatsAppBar";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";

// Body font — Hebrew-first, so only the Hebrew subset is preloaded; the Latin
// subset still loads on demand for the few English strings.
const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  variable: "--font-heebo",
  display: "swap",
});

// Display face — covers Hebrew and Latin so headings render in one voice.
// Not preloaded (headings are small relative to body copy); it swaps in from
// the Heebo fallback with `display: "swap"`.
const rubik = Rubik({
  subsets: ["hebrew", "latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-rubik",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — חולצות כדורגל 2025/26`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: `${site.name} — חולצות כדורגל`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — חולצות כדורגל`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  // The site renders light regardless of OS preference, so the browser chrome
  // is always white to match.
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang={site.lang}
      dir={site.dir}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${heebo.variable} ${rubik.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  name: site.name,
                  url: site.url,
                  description: site.description,
                  contactPoint: {
                    "@type": "ContactPoint",
                    contactType: "customer support",
                    telephone: `+${site.whatsappNumber}`,
                    email: site.contact.emails[0],
                    availableLanguage: ["he", "en"],
                  },
                },
                {
                  "@type": "WebSite",
                  name: site.name,
                  url: site.url,
                  inLanguage: "he-IL",
                  potentialAction: {
                    "@type": "SearchAction",
                    target: `${site.url}/shop?q={search_term_string}`,
                    "query-input": "required name=search_term_string",
                  },
                },
              ],
            }),
          }}
        />
        <Providers>
          <a href="#main" className="skip-link">
            דלג לתוכן
          </a>
          <Header />
          <main id="main" className="flex-1 pb-24 md:pb-0">
            {children}
          </main>
          <Footer />
          <MobileWhatsAppBar />
          <FloatingWhatsApp />
        </Providers>
      </body>
    </html>
  );
}
