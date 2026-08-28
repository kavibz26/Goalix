import { MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/lib/whatsapp";

/**
 * Persistent WhatsApp affordance for desktop / tablet. Hidden on mobile, where
 * the sticky bottom bar (MobileWhatsAppBar) already covers this.
 */
export function FloatingWhatsApp() {
  return (
    <a
      href={whatsappUrl("היי Goalix, יש לי שאלה")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="פנייה אלינו בוואטסאפ"
      className="fixed bottom-6 end-6 z-40 hidden h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-black shadow-lg transition-transform hover:scale-105 md:flex"
    >
      <MessageCircle className="h-7 w-7" aria-hidden />
    </a>
  );
}
