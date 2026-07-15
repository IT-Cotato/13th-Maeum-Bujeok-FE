"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import TalismanCard from "@/features/burn/components/TalismanCard";
import TalismanPageHeader from "@/features/report/components/TalismanPageHeader";
import { useTalismanStore } from "@/store/useTalismanStore";

const subscribeToClient = () => () => undefined;

export default function SavedTalismanListPage() {
  const isClient = useSyncExternalStore(
    subscribeToClient,
    () => true,
    () => false,
  );
  const savedTalismans = useTalismanStore((state) => state.savedTalismans);
  const availableTalismans = isClient ? savedTalismans : [];

  return (
    <main className="h-dvh overflow-hidden bg-gray-100 text-foreground">
      <div className="mx-auto h-dvh w-full max-w-[395px] overflow-y-auto bg-background px-6 pb-[32px] pt-[28px]">
        <TalismanPageHeader backHref="/report" />

        <section className="mt-[21px]" aria-labelledby="saved-talisman-title">
          <h2
            className="text-xl font-medium leading-[22px]"
            id="saved-talisman-title"
          >
            나의 부적
          </h2>

          {availableTalismans.length > 0 ? (
            <div className="mt-[25px] grid grid-cols-3 gap-x-[23.1px] gap-y-[21.65px]">
              {availableTalismans.map((talisman) => (
                <Link
                  aria-label={`${talisman.phrase} 부적 자세히 보기`}
                  className="outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
                  href={`/report/talismans/${encodeURIComponent(talisman.id)}`}
                  key={talisman.id}
                >
                  <TalismanCard talisman={talisman} variant="list" />
                </Link>
              ))}
            </div>
          ) : (
            <div className="mt-[25px] flex h-[150px] items-center justify-center border border-dashed border-gray-200 text-sm text-gray-400">
              저장한 부적이 아직 없어요.
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
