import { AlertTriangle } from "lucide-react";

/**
 * Visible placeholder for content the site owner must still provide.
 * Nothing here is invented — it is an explicit "to be filled" marker.
 */
export function TodoNotice({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-dashed border-orange-400/60 bg-orange-400/10 p-4 text-sm">
      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" />
      <div>
        <span className="font-semibold">TODO — תוכן להשלמה על ידי בעל האתר: </span>
        {children}
      </div>
    </div>
  );
}
