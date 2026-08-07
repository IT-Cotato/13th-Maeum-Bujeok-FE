"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DiaryArchiveCard from "@/components/common/DiaryArchiveCard";
import DiaryCalendar from "@/components/common/DiaryCalendar";
import BottomNavigation from "@/components/layout/BottomNavigation";
import { MAIN_NAVIGATION_ITEMS } from "@/constants/navigation";
import BurnedEntryDetailDialog from "@/features/diary/components/BurnedEntryDetailDialog";
import PageHeader from "@/features/diary/components/PageHeader";
import {
  createMonthOptions,
  getMonthFromDate,
  getTodayDateString,
  toDiaryArchiveEntries,
  toDiaryCalendarEntries,
} from "@/features/diary/utils";
import {
  type DiaryEntryRecord,
  useDiaryEntriesStore,
} from "@/store/useDiaryEntriesStore";

const TODAY = getTodayDateString();
const CALENDAR_MONTHS = createMonthOptions("2025-01", 36);

export default function DiaryListScreen() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [month, setMonth] = useState(getMonthFromDate(TODAY));
  const [entries, setEntries] = useState<Record<string, DiaryEntryRecord[]>>(
    {},
  );
  const [pendingBurnedEntryId, setPendingBurnedEntryId] = useState<
    string | null
  >(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing from an external store (localStorage) that isn't available during render
    setEntries(useDiaryEntriesStore.getState().entries);
  }, []);

  const calendarEntries = toDiaryCalendarEntries(entries);
  const selectedDayEntries = selectedDate
    ? toDiaryArchiveEntries(selectedDate, entries[selectedDate] ?? [])
    : [];

  const handleWriteClick = () => {
    router.push(`/diary/new?date=${selectedDate ?? TODAY}`);
  };

  const goToEntryDetail = (id: string) => {
    if (!selectedDate) {
      return;
    }

    const rawEntry = entries[selectedDate]?.find((entry) => entry.id === id);

    if (!rawEntry) {
      return;
    }

    router.push(
      `/diary/new/complete?date=${selectedDate}&emotion=${rawEntry.emotionId}&id=${id}`,
    );
  };

  const handleViewDetail = (id: string) => {
    const rawEntry = selectedDate
      ? entries[selectedDate]?.find((entry) => entry.id === id)
      : undefined;

    if (rawEntry?.isBurned) {
      setPendingBurnedEntryId(id);
      return;
    }

    goToEntryDetail(id);
  };

  return (
    <main className="min-h-dvh bg-gray-100 text-foreground">
      <div className="relative mx-auto flex min-h-dvh w-full max-w-[395px] flex-col bg-background px-6 pb-[calc(126px+env(safe-area-inset-bottom))] pt-[28px]">
        <PageHeader title="일기" />

        <section className="mt-[18px]">
          <DiaryCalendar
            entries={calendarEntries}
            month={month}
            monthOptions={CALENDAR_MONTHS}
            onBurnedSelect={(entry) => setSelectedDate(entry.date)}
            onMonthChange={setMonth}
            onSelect={setSelectedDate}
            selectedDate={selectedDate}
          />
        </section>

        {selectedDayEntries.length > 0 ? (
          <DiaryArchiveCard
            entries={selectedDayEntries}
            onViewDetail={handleViewDetail}
          />
        ) : null}

        <div className="pointer-events-none fixed inset-x-0 bottom-[125px] z-[60] mx-auto w-full max-w-[395px]">
          <button
            aria-label="일기 작성하기"
            className="pointer-events-auto absolute bottom-0 right-6 size-[61px] transition-opacity active:opacity-90"
            onClick={handleWriteClick}
            type="button"
          >
            <Image
              alt=""
              className="pointer-events-none absolute max-w-none"
              height={131}
              src="/figma/diary/diary-write-fab.svg"
              style={{ left: -35.02, top: -25 }}
              width={131}
            />
          </button>
        </div>

        <BottomNavigation activeValue="diary" items={MAIN_NAVIGATION_ITEMS} />

        {pendingBurnedEntryId && selectedDate ? (
          <BurnedEntryDetailDialog
            date={selectedDate}
            onClose={() => setPendingBurnedEntryId(null)}
            onConfirm={() => goToEntryDetail(pendingBurnedEntryId)}
          />
        ) : null}
      </div>
    </main>
  );
}
