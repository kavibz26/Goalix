import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "עגלת קניות",
  description: "הפריטים שבחרתם, לפני המעבר להזמנה בוואטסאפ.",
  alternates: { canonical: "/cart" },
  robots: { index: false, follow: true },
};

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
