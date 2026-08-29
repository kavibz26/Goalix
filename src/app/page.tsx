import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Hero } from "@/components/home/Hero";
import { ProductRail } from "@/components/home/ProductRail";
import { TeamCard } from "@/components/product/TeamCard";
import { Container, EmptyState, SectionHeader } from "@/components/ui";
import { ComingSoon } from "@/components/ComingSoon";
import { TrustStrip } from "@/components/TrustStrip";
import { Reveal } from "@/components/Reveal";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { whatsappUrl } from "@/lib/whatsapp";
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
    <div className="flex flex-col gap-14 pb-10">
      <Hero hasImage={publicFileExists("/images/hero.jpg")} />
      <TrustStrip />

      <Container className="flex flex-col gap-14">
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
                        <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
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
                      <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
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
                      <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
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

        {catalogReady ? (
        <Reveal>
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-surface p-8 text-center">
            <h2 className="font-display text-2xl font-bold">
              לא בטוחים מה לבחור?
            </h2>
            <p className="max-w-md text-sm text-muted">
              דברו איתנו בוואטסאפ ונעזור לכם למצוא את החולצה, המידה והגרסה
              המתאימה.
            </p>
            <div className="flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
              <Link
                href="/shop"
                className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-accent px-6 font-semibold text-accent-contrast sm:w-auto"
              >
                צפייה בכל החולצות
              </Link>
              <WhatsAppButton
                href={whatsappUrl("היי Goalix, אשמח לעזרה בבחירת חולצה")}
                className="w-full sm:w-auto"
              />
            </div>
          </div>
        </Reveal>
        ) : null}
      </Container>
    </div>
  );
}
