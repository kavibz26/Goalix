import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Link that opens WhatsApp with a pre-filled message.
 * `href` should be built with helpers in @/lib/whatsapp.
 */
export function WhatsAppButton({
  href,
  children = "הזמנה בוואטסאפ",
  variant = "solid",
  className,
}: {
  href: string;
  children?: React.ReactNode;
  variant?: "solid" | "outline";
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-5 text-sm font-semibold transition-transform active:scale-[0.98]",
        variant === "solid"
          ? "bg-[#25D366] text-black hover:brightness-105"
          : "border border-[#25D366] text-[#25D366] hover:bg-[#25D366]/10",
        className,
      )}
    >
      <MessageCircle className="h-5 w-5" aria-hidden />
      {children}
    </a>
  );
}
