import type { Metadata, Viewport } from "next";
import { Heebo, Oswald } from "next/font/google";
import "./globals.css";
import { site } from "@/config/site";
import { Providers } from "@/components/Providers";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileWhatsAppBar } from "@/components/layout/MobileWhatsAppBar";

const heebo = Heebo({
  subsets: ["latin", "hebrew"],
  variable: "--font-heebo",
  display: "swap",
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — חולצות כדורגל 2025/26`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "חולצות כדורגל",
    "חולצות קבוצות",
    "חולצות נבחרות",
    "football kits",
    "FootballKits-il",
    "2025/26",
  ],
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
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#060f1e" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang={site.lang}
      dir={site.dir}
      suppressHydrationWarning
      className={`${heebo.variable} ${oswald.variable} h-full`}
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
                    contactType: "sales",
                    telephone: `+${site.whatsappNumber}`,
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
        </Providers>
      </body>
    </html>
  );
}
