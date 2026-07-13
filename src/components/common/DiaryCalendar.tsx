"use client";

import Image from "next/image";

export type DiaryCalendarEntry = {
  content: string;
  createdAt: string;
  date: string;
  isBurned?: boolean;
};

type DiaryCalendarProps = {
  entries: DiaryCalendarEntry[];
  month: string;
  monthOptions: string[];
  onMonthChange: (month: string) => void;
  onSelect: (date: string | null) => void;
  selectedDate: string | null;
};

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

export default function DiaryCalendar({
  entries,
  month,
  monthOptions,
  onMonthChange,
  onSelect,
  selectedDate,
}: DiaryCalendarProps) {
  const [year, monthNumber] = month.split("-").map(Number);
  const daysInMonth = new Date(year, monthNumber, 0).getDate();
  const firstWeekday = new Date(year, monthNumber - 1, 1).getDay();
  const entriesByDate = new Map(entries.map((entry) => [entry.date, entry]));
  const monthLabel = `${year}.${String(monthNumber).padStart(2, "0")}`;

  return (
    <section aria-label={`${monthLabel} 일기 달력`} className="w-full">
      <div className="relative flex w-fit items-center gap-1.5">
        <p className="text-sm font-medium leading-normal text-foreground">
          {monthLabel}
        </p>
        <ChevronDownIcon />
        <select
          aria-label="일기 월 선택"
          className="absolute inset-0 size-full cursor-pointer opacity-0"
          onChange={(event) => onMonthChange(event.target.value)}
          value={month}
        >
          {monthOptions.map((option) => (
            <option key={option} value={option}>
              {formatMonthOption(option)}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-2 grid grid-cols-7">
        {WEEKDAYS.map((weekday) => (
          <span
            className="flex h-[22px] items-center justify-center text-[13px] leading-[22px] text-gray-500"
            key={weekday}
          >
            {weekday}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-7">
        {Array.from({ length: firstWeekday }).map((_, index) => (
          <span className="h-[56px]" key={`empty-${index}`} />
        ))}
        {Array.from({ length: daysInMonth }, (_, index) => {
          const day = index + 1;
          const date = `${month}-${String(day).padStart(2, "0")}`;
          const entry = entriesByDate.get(date);
          const isBurned = entry?.isBurned ?? false;
          const isWritten = Boolean(entry) && !isBurned;
          const isSelected = selectedDate === date;

          return (
            <button
              aria-label={`${day}일${isBurned ? ", 소각 완료" : isWritten ? ", 작성한 일기" : ", 작성한 일기 없음"}`}
              aria-pressed={isSelected}
              className="group flex h-[56px] flex-col items-center pt-[7px] outline-none focus-visible:rounded-md focus-visible:ring-2 focus-visible:ring-orange-500"
              key={date}
              onClick={() => onSelect(isWritten ? date : null)}
              type="button"
            >
              <DiaryDayIcon
                isBurned={isBurned}
                isSelected={isSelected}
                isWritten={isWritten}
              />
              <span
                className={`mt-0.5 flex h-[18px] min-w-[26px] items-center justify-center rounded-full px-1 text-[13px] leading-normal transition-colors group-hover:bg-orange-500 group-hover:font-medium group-hover:text-white ${
                  isSelected
                    ? "bg-orange-500 font-medium text-white"
                    : "text-foreground"
                }`}
              >
                {day}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

type DiaryDayIconProps = {
  isBurned: boolean;
  isSelected: boolean;
  isWritten: boolean;
};

function DiaryDayIcon({ isBurned, isSelected, isWritten }: DiaryDayIconProps) {
  if (isBurned) {
    return (
      <span className="flex size-[26px] items-center justify-center rounded-full bg-orange-100 shadow-[0_2.364px_11.818px_rgba(18,18,18,0.05)] transition-transform group-hover:scale-105">
        <Image
          alt=""
          height={14.4}
          src="/figma/diary/figma-lock.svg"
          width={12}
        />
      </span>
    );
  }

  return (
    <span
      className={`relative size-[26px] overflow-hidden rounded-full shadow-[0_2.364px_11.818px_rgba(18,18,18,0.05)] transition-[background-color,transform] group-hover:scale-105 group-hover:bg-orange-400 ${
        isWritten
          ? isSelected
            ? "bg-orange-400"
            : "bg-orange-100"
          : "bg-gray-200"
      }`}
    >
      {isWritten ? <DiaryMascot /> : null}
    </span>
  );
}

function DiaryMascot() {
  return (
    <>
      <Image
        alt=""
        className="absolute left-[5.91px] top-[4.14px] -scale-y-100 rotate-180"
        height={17.568}
        src="/figma/diary/diary-mascot-body.svg"
        width={14.182}
      />
      <Image
        alt=""
        className="absolute left-[8.27px] top-[7.58px] -scale-y-100 rotate-180"
        height={12.793}
        src="/figma/diary/diary-mascot-face.svg"
        width={10.356}
      />
      <Image
        alt=""
        className="absolute left-[12.61px] top-[14.82px]"
        height={1.802}
        src="/figma/diary/diary-mascot-mouth.svg"
        width={2.045}
      />
      <Image
        alt=""
        className="absolute left-[9.8px] top-[11.39px] rotate-[18.11deg]"
        height={1.602}
        src="/figma/diary/diary-mascot-eye-left.svg"
        width={2.54}
      />
      <Image
        alt=""
        className="absolute left-[14.13px] top-[11.32px] -scale-y-100 rotate-[161.89deg]"
        height={1.602}
        src="/figma/diary/diary-mascot-eye-right.svg"
        width={2.54}
      />
    </>
  );
}

function ChevronDownIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-[17px]"
      fill="none"
      viewBox="0 0 17 17"
    >
      <path
        d="m4.5 6.5 4 4 4-4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function formatMonthOption(month: string): string {
  const [year, monthNumber] = month.split("-");

  return `${year}년 ${Number(monthNumber)}월`;
}
