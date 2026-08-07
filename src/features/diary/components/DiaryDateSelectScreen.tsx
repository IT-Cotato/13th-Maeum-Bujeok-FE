"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import DiaryCalendar from "@/components/common/DiaryCalendar";
import PageHeader from "@/features/diary/components/PageHeader";
import {
  getDiaryDateLabel,
  getMonthFromDate,
  getTodayDateString,
} from "@/features/diary/utils";

const TODAY = getTodayDateString();

export default function DiaryDateSelectScreen() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialDate = searchParams.get("date") ?? TODAY;
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [month, setMonth] = useState(getMonthFromDate(initialDate));

  const handleSelect = (date: string | null) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  const handleNext = () => {
    router.push(`/diary/new/emotion?date=${selectedDate}`);
  };

  return (
    <main className="min-h-dvh bg-gray-100 text-foreground">
      <div className="relative mx-auto flex min-h-dvh w-full max-w-[395px] flex-col bg-background px-6 pb-[calc(42px+env(safe-area-inset-bottom))] pt-[28px]">
        <PageHeader backHref="/" backLabel="홈으로 돌아가기" title="날짜" />

        <section className="mt-[30px]">
          <h2 className="text-xl font-medium leading-[27px] text-foreground">
            기록할 날짜를 선택해주세요.
          </h2>
          <p className="mt-[3px] text-[13px] leading-[25px] tracking-[0.02em] text-gray-500">
            {getDiaryDateLabel(selectedDate)}
          </p>
        </section>

        <div className="-mx-1.5 mt-[69px]">
          <DiaryCalendar
            entries={[]}
            month={month}
            onMonthChange={setMonth}
            onSelect={handleSelect}
            selectAnyDate
            selectedDate={selectedDate}
            variant="picker"
          />
        </div>

        <button
          className="mt-[207px] flex h-[57px] w-full items-center justify-center rounded-lg bg-orange-500 text-xl font-semibold leading-[23px] text-white transition-opacity active:opacity-90"
          onClick={handleNext}
          type="button"
        >
          다음으로 이동
        </button>
      </div>
    </main>
  );
}
