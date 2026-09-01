import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Hero } from "@/components/home/Hero";
import { WhyGoalix } from "@/components/home/WhyGoalix";
import { HowItWorks } from "@/components/home/HowItWorks";
import { HomeCta } from "@/components/home/HomeCta";
import { ProductRail } from "@/components/home/ProductRail";
import { TeamCard } from "@/components/product/TeamCard";
import { Container, EmptyState, SectionHeader } from "@/components/ui";
import { ComingSoon } from "@/components/ComingSoon";
import { Reveal } from "@/components/Reveal";
import { publicFileExists } from "@/lib/serverImages";
import {
  getBestsellers,
  getDeals,
  getNewArrivals,
  getTeams,
  hasCatalog,
} from "@/lib/catalog";

export default function HomePage() {
  const teams = getTeams();
  const newArrivals = getNewArrivals();
  const bestsellers = getBestsellers();
  const deals = getDeals();
  const catalogReady = hasCatalog();

  return (
    <div className="flex flex-col gap-16 pb-12 sm:gap-20">
      <Hero hasImage={publicFileExists("/images/hero.jpg")} />

      <Container className="flex flex-col gap-16 sm:gap-20">
        {!catalogReady ? (
          <Reveal>
            <ComingSoon />
          </Reveal>
        ) : (
          <>
            {newArrivals.length > 0 ? (
              <Reveal>
                <section>
                  <SectionHeader
                    title="חדש בחנות"
                    action={
                      <Link
                        href="/shop"
                        className="inline-flex items-center gap-1 text-sm font-semibold text-accent"
                      >
                        לכל החולצות{" "}
                        <ArrowLeft className="h-4 w-4 rtl:rotate-180" aria-hidden />
                      </Link>
                    }
                  />
                  <ProductRail products={newArrivals.slice(0, 12)} />
                </section>
              </Reveal>
            ) : null}

            {bestsellers.length > 0 ? (
              <Reveal>
                <section>
                  <SectionHeader title="הנמכרות ביותר" />
                  <ProductRail products={bestsellers} />
                </section>
              </Reveal>
            ) : null}

            <Reveal>
              <section>
                <SectionHeader
                  title="🔥 מבצעים חמים"
                  action={
                    <Link
                      href="/deals"
                      className="inline-flex items-center gap-1 text-sm font-semibold text-accent"
                    >
                      לכל המבצעים{" "}
                      <ArrowLeft className="h-4 w-4 rtl:rotate-180" aria-hidden />
                    </Link>
                  }
                />
                {deals.length > 0 ? (
                  <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {deals.slice(0, 3).map((d) => (
                      <li
                        key={d.id}
                        className="rounded-2xl border border-border bg-surface-raised p-5"
                      >
                        <span className="inline-flex rounded-full bg-magenta-500 px-2.5 py-1 text-xs font-bold text-white">
                          {d.badge ?? `${d.kitCount} חולצות`}
                        </span>
                        <p className="mt-3 font-semibold">
                          {d.title_he ?? d.title}
                        </p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <EmptyState
                    title="אין מבצעים פעילים כרגע"
                    hint="עקבו אחרינו — מבצעים חדשים מתפרסמים כאן."
                  />
                )}
              </section>
            </Reveal>

            <Reveal>
              <section>
                <SectionHeader
                  title="קנייה לפי קבוצה"
                  action={
                    <Link
                      href="/shop"
                      className="inline-flex items-center gap-1 text-sm font-semibold text-accent"
                    >
                      צפייה בכל החולצות
                      <ArrowLeft className="h-4 w-4 rtl:rotate-180" aria-hidden />
                    </Link>
                  }
                />
                {teams.length > 0 ? (
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {teams.map((t) => (
                      <TeamCard key={t.id} team={t} />
                    ))}
                  </div>
                ) : (
                  <EmptyState title="רשימת הקבוצות תתעדכן בקרוב" />
                )}
              </section>
            </Reveal>
          </>
        )}

        <Reveal>
          <WhyGoalix />
        </Reveal>

        <Reveal>
          <HowItWorks />
        </Reveal>

        <Reveal>
          <HomeCta catalogReady={catalogReady} />
        </Reveal>
      </Container>
    </div>
  );
}
