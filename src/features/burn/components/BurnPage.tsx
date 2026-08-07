"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import DiaryArchiveCard from "@/components/common/DiaryArchiveCard";
import DiaryCalendar, {
  type DiaryCalendarEntry,
} from "@/components/common/DiaryCalendar";
import BottomNavigation from "@/components/layout/BottomNavigation";
import { MAIN_NAVIGATION_ITEMS } from "@/constants/navigation";
import BurnedDiaryDialog from "@/features/burn/components/BurnedDiaryDialog";
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

type BurnTab = "emotion" | "diary";

type SelectedImage = {
  name: string;
  previewUrl: string;
};

const TODAY = getTodayDateString();
const CALENDAR_MONTHS = createMonthOptions("2025-01", 36);

export default function BurnPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<BurnTab>("emotion");
  const [burnText, setBurnText] = useState("");
  const [isInputError, setIsInputError] = useState(false);
  const [selectedImage, setSelectedImage] = useState<SelectedImage | null>(
    null,
  );
  const [diaryEntries, setDiaryEntries] = useState<
    Record<string, DiaryEntryRecord[]>
  >({});
  const [selectedDiaryDate, setSelectedDiaryDate] = useState<string | null>(
    null,
  );
  const [selectedDiaryId, setSelectedDiaryId] = useState<string | null>(null);
  const [selectedMonth, setSelectedMonth] = useState(getMonthFromDate(TODAY));
  const [burnedDiaryDate, setBurnedDiaryDate] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const selectedImageUrlRef = useRef<string | null>(null);
  const burnButtonPositionClass =
    activeTab === "emotion"
      ? selectedImage
        ? "mt-[19px]"
        : "mt-[35px]"
      : selectedDiaryId !== null
        ? "mt-[25px]"
        : "fixed bottom-[calc(111px+env(safe-area-inset-bottom))] left-1/2 z-40 w-[calc(100%-48px)] max-w-[347px] -translate-x-1/2";

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing from an external store (localStorage) that isn't available during render
    setDiaryEntries(useDiaryEntriesStore.getState().entries);
  }, []);

  useEffect(() => {
    return () => {
      if (selectedImageUrlRef.current) {
        URL.revokeObjectURL(selectedImageUrlRef.current);
      }
    };
  }, []);

  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (selectedImageUrlRef.current) {
      URL.revokeObjectURL(selectedImageUrlRef.current);
    }

    const previewUrl = URL.createObjectURL(file);

    selectedImageUrlRef.current = previewUrl;
    setSelectedImage({ name: file.name, previewUrl });
    event.target.value = "";
  };

  const handleImageRemove = () => {
    if (selectedImageUrlRef.current) {
      URL.revokeObjectURL(selectedImageUrlRef.current);
      selectedImageUrlRef.current = null;
    }

    setSelectedImage(null);
  };

  const handleBurnClick = () => {
    const selectedDayEntries = selectedDiaryDate
      ? (diaryEntries[selectedDiaryDate] ?? [])
      : [];
    const selectedEntry = selectedDayEntries.find(
      (entry) => entry.id === selectedDiaryId && !entry.isBurned,
    );
    const trimmedBurnText = burnText.trim();

    if (activeTab === "emotion" && !trimmedBurnText) {
      setActiveTab("emotion");
      setIsInputError(true);
      return;
    }

    if (activeTab === "diary" && !selectedEntry) {
      return;
    }

    const content =
      activeTab === "diary" ? (selectedEntry?.content ?? "") : trimmedBurnText;

    if (activeTab === "diary" && selectedDiaryDate && selectedEntry) {
      useDiaryEntriesStore
        .getState()
        .burnEntry(selectedDiaryDate, selectedEntry.id);
    }

    sessionStorage.setItem(
      "maeum-bujeok:pending-burn",
      JSON.stringify({
        content,
        diaryId: activeTab === "diary" ? (selectedEntry?.id ?? null) : null,
        imageName: activeTab === "emotion" ? selectedImage?.name : null,
        recordedDate: activeTab === "diary" ? selectedDiaryDate : null,
        type: activeTab,
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
    setSelectedDiaryId(null);
  };

  const handleDiaryDateSelect = (date: string | null) => {
    setSelectedDiaryDate(date);
    setSelectedDiaryId(null);
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
            className="hidden"
            onChange={handleImageChange}
            ref={fileInputRef}
            type="file"
          />
        </div>

        <section
          className={`mt-[22px] ${
            activeTab === "emotion"
              ? `${selectedImage ? "h-[344px]" : "h-[452px]"} rounded-[15px] border border-gray-200 bg-background shadow-[0_4px_20px_rgba(18,18,18,0.05)]`
              : ""
          }`}
        >
          {activeTab === "emotion" ? (
            <EmotionInput
              hasError={isInputError}
              onChange={handleBurnTextChange}
              value={burnText}
            />
          ) : (
            <DiarySelect
              entries={diaryEntries}
              onBurnedSelect={(entry) => setBurnedDiaryDate(entry.date)}
              onDiarySelect={setSelectedDiaryId}
              onMonthChange={handleMonthChange}
              onSelect={handleDiaryDateSelect}
              selectedDate={selectedDiaryDate}
              selectedDiaryId={selectedDiaryId}
              selectedMonth={selectedMonth}
            />
          )}
        </section>

        {activeTab === "emotion" && selectedImage ? (
          <SelectedImagePreview
            image={selectedImage}
            onRemove={handleImageRemove}
          />
        ) : null}

        <button
          className={`flex h-[57px] w-full items-center justify-center rounded-lg bg-orange-500 text-xl font-semibold leading-[23px] text-white transition-opacity active:opacity-90 ${burnButtonPositionClass}`}
          onClick={handleBurnClick}
          type="button"
        >
          소각하기
        </button>

        <BottomNavigation activeValue="burn" items={MAIN_NAVIGATION_ITEMS} />

        {burnedDiaryDate ? (
          <BurnedDiaryDialog
            date={burnedDiaryDate}
            onClose={() => setBurnedDiaryDate(null)}
          />
        ) : null}
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
  onChange: (value: string) => void;
  value: string;
};

function EmotionInput({ hasError, onChange, value }: EmotionInputProps) {
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
    </div>
  );
}

type SelectedImagePreviewProps = {
  image: SelectedImage;
  onRemove: () => void;
};

function SelectedImagePreview({
  image,
  onRemove,
}: SelectedImagePreviewProps) {
  return (
    <div className="relative mt-[26px] h-[97px] w-[102px] overflow-hidden rounded-[4px] border border-orange-400 bg-gray-100">
      <Image
        alt={`추가한 사진: ${image.name}`}
        className="object-cover"
        fill
        src={image.previewUrl}
        unoptimized
      />
      <button
        aria-label="추가한 사진 삭제"
        className="absolute right-[6px] top-[5px] flex size-[18px] items-center justify-center"
        onClick={onRemove}
        type="button"
      >
        <Image
          alt=""
          height={18}
          src="/figma/burn/image-remove.svg"
          width={18}
        />
      </button>
    </div>
  );
}

type DiarySelectProps = {
  entries: Record<string, DiaryEntryRecord[]>;
  onBurnedSelect: (entry: DiaryCalendarEntry) => void;
  onDiarySelect: (id: string) => void;
  onMonthChange: (month: string) => void;
  onSelect: (date: string | null) => void;
  selectedDate: string | null;
  selectedDiaryId: string | null;
  selectedMonth: string;
};

function DiarySelect({
  entries,
  onBurnedSelect,
  onDiarySelect,
  onMonthChange,
  onSelect,
  selectedDate,
  selectedDiaryId,
  selectedMonth,
}: DiarySelectProps) {
  const calendarEntries = toDiaryCalendarEntries(entries);
  const selectedDayEntries = selectedDate
    ? toDiaryArchiveEntries(selectedDate, entries[selectedDate] ?? [])
    : [];

  return (
    <div className="size-full">
      <DiaryCalendar
        entries={calendarEntries}
        month={selectedMonth}
        monthOptions={CALENDAR_MONTHS}
        onBurnedSelect={onBurnedSelect}
        onMonthChange={onMonthChange}
        onSelect={onSelect}
        selectedDate={selectedDate}
      />

      {selectedDayEntries.length > 0 ? (
        <DiaryArchiveCard
          entries={selectedDayEntries}
          onSelect={onDiarySelect}
          selectedId={selectedDiaryId}
        />
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
