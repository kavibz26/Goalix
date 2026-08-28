import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container, EmptyState } from "@/components/ui";
import { ProductCard } from "@/components/product/ProductCard";
import { getTeam, getTeamProducts, getTeams } from "@/lib/catalog";

export function generateStaticParams() {
  return getTeams().map((t) => ({ id: t.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const team = getTeam(id);
  if (!team) return { title: "קבוצה לא נמצאה" };
  return {
    title: `${team.name_he ?? team.name} — חולצות 2025/26`,
    description: `חולצות בית, חוץ ושלישית של ${team.name_he ?? team.name}.`,
  };
}

export default async function TeamPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const team = getTeam(id);
  if (!team) notFound();

  const products = getTeamProducts(id);

  return (
    <Container className="py-8">
      <p className="text-sm text-muted">
        {team.type === "national" ? "נבחרת" : team.league}
      </p>
      <h1 className="font-display text-3xl font-bold sm:text-4xl">
        {team.name_he ?? team.name}
      </h1>

      <div className="mt-6">
        {products.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {products.map((p) => (
              <ProductCard key={p.kitId} product={p} />
            ))}
          </div>
        ) : (
          <EmptyState title="החולצות של הקבוצה יתווספו בקרוב" />
        )}
      </div>
    </Container>
  );
}
