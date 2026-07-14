"use client";

import { useState } from "react";
import Link from "next/link";
import BottomNavigation from "@/components/layout/BottomNavigation";
import { MAIN_NAVIGATION_ITEMS } from "@/constants/navigation";
import TalismanCard from "@/features/burn/components/TalismanCard";
import { MOCK_TALISMAN } from "@/features/burn/mocks";
import { useTalismanStore } from "@/store/useTalismanStore";

export default function TalismanResultPage() {
  const saveTalisman = useTalismanStore((state) => state.saveTalisman);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    saveTalisman(MOCK_TALISMAN);
    setIsSaved(true);
  };

  return (
    <main className="h-dvh overflow-hidden bg-gray-100 text-foreground">
      <div className="relative mx-auto h-dvh w-full max-w-[395px] overflow-y-auto bg-background px-6 pb-[calc(116px+env(safe-area-inset-bottom))] pt-[28px]">
        <header className="grid grid-cols-[28px_1fr_28px] items-center">
          <Link
            aria-label="개운지침 화면으로 돌아가기"
            className="flex size-7 items-center justify-center"
            href="/burn/fortune"
          >
            <BackIcon />
          </Link>
          <h1 className="text-center text-xl font-medium leading-[23px]">
            부적
          </h1>
        </header>

        <SourceDate occurredAt={MOCK_TALISMAN.source.occurredAt} />

        <div className="mt-4">
          <TalismanCard talisman={MOCK_TALISMAN} />
        </div>

        <button
          className="mt-5 flex h-[57px] w-full items-center justify-center rounded-lg bg-orange-500 text-xl font-semibold leading-[23px] text-white active:opacity-90"
          onClick={handleSave}
          type="button"
        >
          {isSaved ? "저장 완료" : "저장하기"}
        </button>

        <BottomNavigation activeValue="burn" items={MAIN_NAVIGATION_ITEMS} />
      </div>
    </main>
  );
}

type SourceDateProps = {
  occurredAt: string | null;
};

function SourceDate({ occurredAt }: SourceDateProps) {
  if (!occurredAt) {
    return null;
  }

  const dateParts = new Intl.DateTimeFormat("ko-KR", {
    day: "2-digit",
    hour: "numeric",
    hour12: true,
    minute: "2-digit",
    month: "2-digit",
    timeZone: "Asia/Seoul",
    weekday: "long",
    year: "numeric",
  }).formatToParts(new Date(occurredAt));
  const dateLabel = `${getDatePart(dateParts, "year")}.${getDatePart(dateParts, "month")}.${getDatePart(dateParts, "day")}`;
  const dayPeriod =
    getDatePart(dateParts, "dayPeriod") === "오전" ? "AM" : "PM";
  const timeLabel = `${dayPeriod} ${getDatePart(dateParts, "hour")}:${getDatePart(dateParts, "minute")}`;

  return (
    <section className="mt-[28px]">
      <p className="text-lg leading-normal text-foreground">
        {dateLabel}
        <span className="ml-3">{getDatePart(dateParts, "weekday")}</span>
      </p>
      <p className="mt-0.5 text-[13px] leading-normal text-gray-500">
        {timeLabel}
      </p>
    </section>
  );
}

function getDatePart(
  parts: Intl.DateTimeFormatPart[],
  type: Intl.DateTimeFormatPartTypes,
): string {
  return parts.find((part) => part.type === type)?.value ?? "";
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
