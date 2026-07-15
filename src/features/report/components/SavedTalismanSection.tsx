"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import TalismanCard from "@/features/burn/components/TalismanCard";
import { useTalismanStore } from "@/store/useTalismanStore";

const subscribeToClient = () => () => undefined;

export default function SavedTalismanSection() {
  const isClient = useSyncExternalStore(
    subscribeToClient,
    () => true,
    () => false,
  );
  const savedTalismans = useTalismanStore((state) => state.savedTalismans);
  const availableTalismans = isClient ? savedTalismans : [];
  const visibleTalismans = availableTalismans.slice(0, 3);

  return (
    <section className="mt-[164px] px-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-medium leading-[23px]">나의 부적</h2>
        <Link
          className="flex h-[29px] items-center justify-center rounded-full border border-gray-400 px-[13px] text-[13px] font-medium leading-normal text-gray-500"
          href="/report/talismans"
        >
          더보기
        </Link>
      </div>

      {visibleTalismans.length > 0 ? (
        <div className="mt-[17px] grid grid-cols-3 gap-x-[23.28px]">
          {visibleTalismans.map((talisman) => (
            <Link
              aria-label={`${talisman.phrase} 부적 자세히 보기`}
              href={`/report/talismans/${encodeURIComponent(talisman.id)}`}
              key={talisman.id}
            >
              <TalismanCard talisman={talisman} variant="report" />
            </Link>
          ))}
        </div>
      ) : (
        <div className="mt-[17px] flex h-[150px] items-center justify-center rounded-[15px] border border-dashed border-gray-200 text-sm text-gray-400">
          저장한 부적이 아직 없어요.
        </div>
      )}
    </section>
  );
}
