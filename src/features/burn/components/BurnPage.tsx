"use client";

import { ChangeEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import BottomNavigation from "@/components/layout/BottomNavigation";
import { MAIN_NAVIGATION_ITEMS } from "@/constants/navigation";

type BurnTab = "emotion" | "diary";

export default function BurnPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<BurnTab>("emotion");
  const [burnText, setBurnText] = useState("");
  const [isInputError, setIsInputError] = useState(false);
  const [selectedImageName, setSelectedImageName] = useState<string | null>(
    null,
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    const trimmedBurnText = burnText.trim();

    if (!trimmedBurnText) {
      setActiveTab("emotion");
      setIsInputError(true);
      return;
    }

    sessionStorage.setItem(
      "maeum-bujeok:pending-burn",
      JSON.stringify({
        content: trimmedBurnText,
        imageName: selectedImageName,
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

  return (
    <main className="h-dvh overflow-hidden bg-gray-100 text-foreground">
      <div className="relative mx-auto h-dvh w-full max-w-[395px] overflow-hidden bg-background px-6 pb-[calc(103px+env(safe-area-inset-bottom))] pt-[28px]">
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

        <section className="mt-[22px] h-[452px] rounded-[15px] border border-gray-200 bg-background shadow-[0_4px_20px_rgba(18,18,18,0.05)]">
          {activeTab === "emotion" ? (
            <EmotionInput
              hasError={isInputError}
              imageName={selectedImageName}
              onChange={handleBurnTextChange}
              value={burnText}
            />
          ) : (
            <DiarySelectSkeleton />
          )}
        </section>

        <button
          className="mt-[35px] flex h-[57px] w-full items-center justify-center rounded-lg bg-orange-500 text-xl font-semibold leading-[23px] text-white transition-opacity active:opacity-90"
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

function DiarySelectSkeleton() {
  return (
    <div className="flex size-full flex-col px-6 py-[22px]">
      <p className="text-[15px] leading-6 text-gray-400">
        소각할 일기를 선택해주세요.
      </p>
      <div className="mt-6 space-y-3">
        <div className="h-[72px] rounded-lg border border-dashed border-gray-200 bg-gray-100" />
        <div className="h-[72px] rounded-lg border border-dashed border-gray-200 bg-gray-100" />
        <div className="h-[72px] rounded-lg border border-dashed border-gray-200 bg-gray-100" />
      </div>
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
