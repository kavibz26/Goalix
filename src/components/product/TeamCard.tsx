import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import type { RawTeam } from "@/lib/types";
import { resolveImage } from "@/lib/serverImages";
import { KitImage } from "@/components/product/KitImage";

export function TeamCard({ team }: { team: RawTeam }) {
  const cover = resolveImage(team.kits?.[0]?.images?.front);
  return (
    <Link
      href={`/team/${team.id}`}
      className="group flex items-center gap-3 rounded-2xl border border-border bg-surface-raised p-3 transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-surface">
        <KitImage
          src={cover}
          alt={`${team.name} — חולצה`}
          sizes="64px"
          rounded={false}
        />
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate font-semibold">{team.name_he ?? team.name}</div>
        <div className="truncate text-xs text-muted">
          {team.type === "national" ? "נבחרת" : team.league}
        </div>
      </div>
      <ChevronLeft className="h-5 w-5 shrink-0 text-muted transition-transform group-hover:-translate-x-0.5 rtl:rotate-180" />
    </Link>
  );
}
