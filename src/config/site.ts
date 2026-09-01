// Site-level configuration. Brand name and contact details come from the owner.
// Anything not yet supplied is tracked in TASKS.md — never shown to customers.
//
// This module is safe to import from client components. The site's public
// origin lives in `@/config/site-url` (server-only), because it is only ever
// used server-side and must not enter the browser bundle.

export const site = {
  name: "Goalix",
  tagline: "FOOTBALL IS YOURS",
  description:
    "Goalix — חנות חולצות כדורגל של קבוצות ונבחרות. בית · חוץ · שלישית. הזמנה מהירה בוואטסאפ.",
  locale: "he_IL",
  dir: "rtl" as const,
  lang: "he" as const,
  currency: "₪",

  // The number customers see is the local `0559651785`. `whatsappNumber` /
  // `phoneIntl` / `smsHref` keep the E.164 `972…` form because wa.me links,
  // `sms:` and schema.org `telephone` require international format to work —
  // those values are never shown to customers.
  whatsappNumber: "972559651785",
  whatsappDisplay: "0559651785",

  contact: {
    /** Same line handles WhatsApp and SMS. */
    phone: "0559651785",
    phoneIntl: "972559651785",
    phoneDisplay: "0559651785",
    smsHref: "sms:+972559651785",
    emails: ["lavibz123@gmail.com"],
  },

  // Social links — not yet supplied (tracked in TASKS.md). Nothing renders while empty.
  social: {
    instagram: "",
    facebook: "",
    tiktok: "",
  },
};

export type SiteConfig = typeof site;
