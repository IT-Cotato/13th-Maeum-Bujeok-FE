"use client";

import { useSyncExternalStore } from "react";
import BottomNavigation from "@/components/layout/BottomNavigation";
import { MAIN_NAVIGATION_ITEMS } from "@/constants/navigation";
import TalismanCard from "@/features/burn/components/TalismanCard";
import TalismanPageHeader from "@/features/report/components/TalismanPageHeader";
import { useTalismanStore } from "@/store/useTalismanStore";

const subscribeToClient = () => () => undefined;

type SavedTalismanDetailPageProps = {
  talismanId: string;
};

export default function SavedTalismanDetailPage({
  talismanId,
}: SavedTalismanDetailPageProps) {
  const isClient = useSyncExternalStore(
    subscribeToClient,
    () => true,
    () => false,
  );
  const savedTalisman = useTalismanStore((state) =>
    state.savedTalismans.find((talisman) => talisman.id === talismanId),
  );

  return (
    <main className="h-dvh overflow-hidden bg-gray-100 text-foreground">
      <div className="relative mx-auto h-dvh w-full max-w-[395px] overflow-hidden bg-background px-6 pb-[calc(116px+env(safe-area-inset-bottom))] pt-[28px]">
        <TalismanPageHeader backHref="/report/talismans" />

        {isClient && savedTalisman ? (
          <div className="mt-[25px]">
            <TalismanCard talisman={savedTalisman} />
          </div>
        ) : isClient ? (
          <div className="mt-[25px] flex aspect-[345/476] w-full items-center justify-center rounded-[15px] border border-dashed border-gray-200 text-sm text-gray-400">
            저장된 부적을 찾을 수 없어요.
          </div>
        ) : (
          <div
            aria-hidden="true"
            className="mt-[25px] aspect-[345/476] w-full rounded-[15px] bg-[#ffcd4a]"
          />
        )}

        <BottomNavigation activeValue="report" items={MAIN_NAVIGATION_ITEMS} />
      </div>
    </main>
  );
}
