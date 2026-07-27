"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import DiaryCalendar from "@/components/common/DiaryCalendar";
import {
  getDiaryDateLabel,
  getMonthFromDate,
  getTodayDateString,
} from "@/features/diary/utils";

const TODAY = getTodayDateString();

export default function DiaryDateSelectScreen() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(TODAY);
  const [month, setMonth] = useState(getMonthFromDate(TODAY));

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
        <header className="grid grid-cols-[28px_1fr_28px] items-center">
          <BackLink />
          <h1 className="text-center text-xl font-medium leading-[23px] text-foreground">
            날짜
          </h1>
        </header>

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

function BackLink() {
  return (
    <Link
      aria-label="홈으로 돌아가기"
      className="flex size-7 items-center justify-center"
      href="/"
    >
      <BackIcon />
    </Link>
  );
}

function BackIcon() {
  return (
    <svg aria-hidden="true" className="size-7" fill="none" viewBox="0 0 28 28">
      <path
        d="M17 7 10 14l7 7"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.2"
      />
    </svg>
  );
}
