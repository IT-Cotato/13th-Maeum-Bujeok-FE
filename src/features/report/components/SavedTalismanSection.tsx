"use client";

import { useState, useSyncExternalStore } from "react";
import TalismanCard from "@/features/burn/components/TalismanCard";
import { useTalismanStore } from "@/store/useTalismanStore";

const subscribeToClient = () => () => undefined;

export default function SavedTalismanSection() {
  const [showAll, setShowAll] = useState(false);
  const isClient = useSyncExternalStore(
    subscribeToClient,
    () => true,
    () => false,
  );
  const savedTalismans = useTalismanStore((state) => state.savedTalismans);
  const availableTalismans = isClient ? savedTalismans : [];
  const visibleTalismans = showAll
    ? availableTalismans
    : availableTalismans.slice(0, 3);

  return (
    <section className="mt-[164px] px-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-medium leading-[23px]">나의 부적</h2>
        <button
          className="flex h-[29px] items-center justify-center rounded-full border border-gray-400 px-[13px] text-[13px] font-medium leading-normal text-gray-500"
          onClick={() => setShowAll((current) => !current)}
          type="button"
        >
          {showAll ? "접기" : "더보기"}
        </button>
      </div>

      {visibleTalismans.length > 0 ? (
        <div className="mt-[17px] grid grid-cols-3 gap-[9px]">
          {visibleTalismans.map((talisman) => (
            <TalismanCard key={talisman.id} talisman={talisman} />
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
