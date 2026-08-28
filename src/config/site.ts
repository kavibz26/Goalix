// Site-level configuration. Brand name and WhatsApp number come from the project brief.
// Anything not yet supplied by the owner is left as an explicit TODO — never invented.

export const site = {
  name: "FootballKits-il",
  /** Public-facing URL — update before deploy. */
  url: "https://footballkits-il.example",
  description:
    "FootballKits-il — חנות חולצות כדורגל. קנייה מהירה, הזמנה בוואטסאפ.",
  locale: "he_IL",
  dir: "rtl" as const,
  lang: "he" as const,
  currency: "₪",

  /** Order line delivered to WhatsApp. 0555568418 -> international format. */
  whatsappNumber: "972555568418",
  whatsappDisplay: "055-556-8418",

  // TODO(owner): provide real handles / links.
  social: {
    instagram: "", // TODO(owner)
    facebook: "", // TODO(owner)
    tiktok: "", // TODO(owner)
  },

  // TODO(owner): provide real contact details for the Contact page.
  contact: {
    email: "", // TODO(owner)
    phone: "", // TODO(owner)
    address: "", // TODO(owner)
  },
};

export type SiteConfig = typeof site;
