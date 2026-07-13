"use client";

import { ChangeEvent, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import DiaryCalendar, {
  type DiaryCalendarEntry,
} from "@/components/common/DiaryCalendar";
import BottomNavigation from "@/components/layout/BottomNavigation";
import { MAIN_NAVIGATION_ITEMS } from "@/constants/navigation";

type BurnTab = "emotion" | "diary";

const DIARY_ENTRIES: DiaryCalendarEntry[] = [
  1, 2, 7, 9, 10, 11, 13, 14, 15, 18, 19, 20, 21, 22, 25, 26, 27, 28,
].map((day) => ({
  content:
    "누군가에게 잔소리를 들어도 짜증이 너무 난다. 쉬지도 못하고 계속 일만 하니 스트레스를 너무 받은 것 같다. 의욕도 더 떨어지고…",
  createdAt:
    `2026.06.${String(day).padStart(2, "0")} ${day === 28 ? "일요일 AM 2:03" : ""}`.trim(),
  date: `2026-06-${String(day).padStart(2, "0")}`,
}));

const BURNED_DIARY: DiaryCalendarEntry = {
  content: "소각한 일기",
  createdAt: "2026.06.24",
  date: "2026-06-24",
  isBurned: true,
};

const CALENDAR_ENTRIES = [...DIARY_ENTRIES, BURNED_DIARY];
const CALENDAR_MONTHS = createMonthOptions("2025-01", 36);

export default function BurnPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<BurnTab>("emotion");
  const [burnText, setBurnText] = useState("");
  const [isInputError, setIsInputError] = useState(false);
  const [selectedImageName, setSelectedImageName] = useState<string | null>(
    null,
  );
  const [selectedDiaryDate, setSelectedDiaryDate] = useState<string | null>(
    "2026-06-28",
  );
  const [selectedMonth, setSelectedMonth] = useState("2026-06");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const burnButtonPositionClass =
    activeTab === "emotion"
      ? "mt-[35px]"
      : selectedDiaryDate
        ? "mt-[25px]"
        : "fixed bottom-[calc(111px+env(safe-area-inset-bottom))] left-1/2 z-40 w-[calc(100%-48px)] max-w-[347px] -translate-x-1/2";

  const handleCameraClick = () => {
    void requestCameraPermission();
    fileInputRef.current?.click();
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setSelectedImageName(file.name);
  };

  const handleBurnClick = () => {
    const selectedDiary = DIARY_ENTRIES.find(
      (entry) => entry.date === selectedDiaryDate,
    );
    const trimmedBurnText = burnText.trim();

    if (activeTab === "emotion" && !trimmedBurnText) {
      setActiveTab("emotion");
      setIsInputError(true);
      return;
    }

    if (activeTab === "diary" && !selectedDiary) {
      return;
    }

    const content =
      activeTab === "diary" ? (selectedDiary?.content ?? "") : trimmedBurnText;

    sessionStorage.setItem(
      "maeum-bujeok:pending-burn",
      JSON.stringify({
        content,
        imageName: activeTab === "emotion" ? selectedImageName : null,
      }),
    );
    router.push("/burn/result");
  };

  const handleBurnTextChange = (value: string) => {
    setBurnText(value);

    if (isInputError) {
      setIsInputError(false);
    }
  };

  const handleMonthChange = (month: string) => {
    setSelectedMonth(month);
    setSelectedDiaryDate(
      DIARY_ENTRIES.find((entry) => entry.date.startsWith(month))?.date ?? null,
    );
  };

  return (
    <main className="h-dvh overflow-hidden bg-gray-100 text-foreground">
      <div className="relative mx-auto h-dvh w-full max-w-[395px] overflow-y-auto bg-background px-6 pb-[calc(126px+env(safe-area-inset-bottom))] pt-[28px]">
        <h1 className="text-center text-xl font-medium leading-[23px] text-foreground">
          소각
        </h1>

        <div className="mt-[18px] flex items-center justify-between">
          <BurnTabs activeTab={activeTab} onChange={setActiveTab} />
          <button
            aria-label="사진 촬영 또는 선택"
            className="flex size-[37px] items-center justify-center rounded-full bg-orange-400 text-white transition-opacity active:opacity-80"
            onClick={handleCameraClick}
            type="button"
          >
            <CameraIcon />
          </button>
          <input
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={handleImageChange}
            ref={fileInputRef}
            type="file"
          />
        </div>

        <section
          className={`mt-[22px] ${
            activeTab === "emotion"
              ? "h-[452px] rounded-[15px] border border-gray-200 bg-background shadow-[0_4px_20px_rgba(18,18,18,0.05)]"
              : ""
          }`}
        >
          {activeTab === "emotion" ? (
            <EmotionInput
              hasError={isInputError}
              imageName={selectedImageName}
              onChange={handleBurnTextChange}
              value={burnText}
            />
          ) : (
            <DiarySelect
              onSelect={setSelectedDiaryDate}
              onMonthChange={handleMonthChange}
              selectedDate={selectedDiaryDate}
              selectedMonth={selectedMonth}
            />
          )}
        </section>

        <button
          className={`flex h-[57px] w-full items-center justify-center rounded-lg bg-orange-500 text-xl font-semibold leading-[23px] text-white transition-opacity active:opacity-90 ${burnButtonPositionClass}`}
          onClick={handleBurnClick}
          type="button"
        >
          소각하기
        </button>

        <BottomNavigation activeValue="burn" items={MAIN_NAVIGATION_ITEMS} />
      </div>
    </main>
  );
}

type BurnTabsProps = {
  activeTab: BurnTab;
  onChange: (tab: BurnTab) => void;
};

function BurnTabs({ activeTab, onChange }: BurnTabsProps) {
  return (
    <div className="flex items-center gap-2.5" role="tablist">
      <TabButton
        isActive={activeTab === "emotion"}
        label="감정 입력"
        onClick={() => onChange("emotion")}
      />
      <TabButton
        isActive={activeTab === "diary"}
        label="일기 선택"
        onClick={() => onChange("diary")}
      />
    </div>
  );
}

type TabButtonProps = {
  isActive: boolean;
  label: string;
  onClick: () => void;
};

function TabButton({ isActive, label, onClick }: TabButtonProps) {
  return (
    <button
      aria-selected={isActive}
      className={`rounded-full px-[15px] py-2 text-base leading-normal transition-colors ${
        isActive
          ? "bg-orange-500 text-white"
          : "border border-gray-200 bg-gray-100 text-foreground"
      }`}
      onClick={onClick}
      role="tab"
      type="button"
    >
      {label}
    </button>
  );
}

type EmotionInputProps = {
  hasError: boolean;
  imageName: string | null;
  onChange: (value: string) => void;
  value: string;
};

function EmotionInput({
  hasError,
  imageName,
  onChange,
  value,
}: EmotionInputProps) {
  return (
    <div className="flex size-full flex-col">
      <label className="sr-only" htmlFor="burn-emotion-input">
        소각할 내용
      </label>
      <textarea
        className={`min-h-0 flex-1 resize-none rounded-[15px] bg-transparent px-6 py-[22px] text-[15px] leading-6 text-foreground outline-none ${
          hasError ? "placeholder:text-red-500" : "placeholder:text-gray-400"
        }`}
        id="burn-emotion-input"
        onChange={(event) => onChange(event.target.value)}
        placeholder={
          hasError
            ? "소각 할 내용을 입력해주세요."
            : "소각할 내용을 작성해주세요."
        }
        value={value}
      />
      {imageName ? (
        <p className="border-t border-gray-200 px-6 py-3 text-[13px] leading-5 text-gray-500">
          선택된 사진: {imageName}
        </p>
      ) : null}
    </div>
  );
}

type DiarySelectProps = {
  onMonthChange: (month: string) => void;
  onSelect: (date: string | null) => void;
  selectedDate: string | null;
  selectedMonth: string;
};

function DiarySelect({
  onMonthChange,
  onSelect,
  selectedDate,
  selectedMonth,
}: DiarySelectProps) {
  const selectedDiary = DIARY_ENTRIES.find(
    (entry) => entry.date === selectedDate,
  );

  return (
    <div className="size-full">
      <DiaryCalendar
        entries={CALENDAR_ENTRIES}
        month={selectedMonth}
        monthOptions={CALENDAR_MONTHS}
        onMonthChange={onMonthChange}
        onSelect={onSelect}
        selectedDate={selectedDate}
      />

      {selectedDiary ? (
        <section className="mt-[18px]" aria-label="보관일기">
          <h2 className="text-xl font-medium leading-[23px] text-foreground">
            보관일기
          </h2>
          <article className="mt-3 h-[140px] rounded-lg border border-gray-200 bg-background px-5 py-[18px] shadow-[0_4px_20px_rgba(18,18,18,0.05)]">
            <p className="text-sm leading-normal text-foreground">
              {selectedDiary.createdAt}
            </p>
            <p className="mt-3 line-clamp-2 text-sm leading-[19px] text-foreground">
              {selectedDiary.content}
            </p>
            <button
              className="mt-1 text-[13px] leading-[22px] text-gray-400"
              type="button"
            >
              자세히 보기
            </button>
            <Image
              alt=""
              className="float-right mt-[3px] rotate-90"
              height={17}
              src="/figma/diary/diary-detail-arrow.svg"
              width={17}
            />
          </article>
        </section>
      ) : null}
    </div>
  );
}

function CameraIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-[21px]"
      fill="none"
      viewBox="0 0 21 21"
    >
      <path
        d="M7.1 5.2 8.4 3.5h4.2l1.3 1.7h2.6c1 0 1.8.8 1.8 1.8v8.1c0 1-.8 1.8-1.8 1.8h-12c-1 0-1.8-.8-1.8-1.8V7c0-1 .8-1.8 1.8-1.8h2.6Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
      <circle
        cx="10.5"
        cy="11.1"
        r="3.1"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  );
}

async function requestCameraPermission() {
  if (!navigator.mediaDevices?.getUserMedia) {
    return;
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    stream.getTracks().forEach((track) => track.stop());
  } catch {
    // The file picker still lets users choose an existing image if camera access is denied.
  }
}

function createMonthOptions(startMonth: string, count: number): string[] {
  const [startYear, startMonthNumber] = startMonth.split("-").map(Number);

  return Array.from({ length: count }, (_, index) => {
    const date = new Date(startYear, startMonthNumber - 1 + index, 1);

    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
  });
}
