// Site-level configuration. Brand name and contact details come from the owner.
// Anything not yet supplied is tracked in TASKS.md — never shown to customers.

export const site = {
  name: "Goalix",
  /** Public-facing URL — update before deploy (tracked in TASKS.md). */
  url: "https://goalix.example",
  description: "Goalix — חנות חולצות כדורגל. קנייה מהירה, הזמנה בוואטסאפ.",
  locale: "he_IL",
  dir: "rtl" as const,
  lang: "he" as const,
  currency: "₪",

  /** WhatsApp for orders. 0559651785 -> international format for wa.me links. */
  whatsappNumber: "972559651785",
  whatsappDisplay: "055-965-1785",

  contact: {
    /** Same line handles WhatsApp and SMS. */
    phone: "0559651785",
    phoneIntl: "972559651785",
    phoneDisplay: "055-965-1785",
    smsHref: "sms:+972559651785",
    emails: ["lavibz123@gmail.com", "lavibz269@gmail.com"],
  },

  // Social links — not yet supplied (tracked in TASKS.md). Nothing renders while empty.
  social: {
    instagram: "",
    facebook: "",
    tiktok: "",
  },
};

export type SiteConfig = typeof site;
