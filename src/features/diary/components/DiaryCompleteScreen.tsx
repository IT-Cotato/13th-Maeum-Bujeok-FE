"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import BottomNavigation from "@/components/layout/BottomNavigation";
import { MAIN_NAVIGATION_ITEMS } from "@/constants/navigation";
import DiaryExitDialog from "@/features/diary/components/DiaryExitDialog";
import EmotionAvatar from "@/features/diary/components/EmotionAvatar";
import EmotionIcon from "@/features/diary/components/EmotionIcon";
import {
  EMOTION_MASCOTS,
  EMOTIONS,
  MOCK_COMFORT_MESSAGE,
  MOCK_SITUATION_SUMMARY_HIGHLIGHT,
  MOCK_SITUATION_SUMMARY_LEAD,
} from "@/features/diary/constants";
import { getDiaryShortDateParts, getTodayDateString } from "@/features/diary/utils";
import { useDiaryDraftStore } from "@/store/useDiaryDraftStore";
import { useDiarySavedEntryStore } from "@/store/useDiarySavedEntryStore";

const TODAY = getTodayDateString();
const MASCOT_SIZE = 162;

export default function DiaryCompleteScreen() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const diaryDate = searchParams.get("date") ?? TODAY;
  const selectedEmotion =
    EMOTIONS.find((emotion) => emotion.id === searchParams.get("emotion")) ??
    EMOTIONS[0];
  const { datePart, weekdayPart } = getDiaryShortDateParts(diaryDate);

  const entry = useDiarySavedEntryStore((state) =>
    state.entry?.date === diaryDate ? state.entry : null,
  );
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const mascot = EMOTION_MASCOTS[selectedEmotion.id];
  const mascotScale = MASCOT_SIZE / Math.max(selectedEmotion.boxWidth, selectedEmotion.boxHeight);

  const handleEdit = () => {
    router.push(`/diary/new/write?date=${diaryDate}&emotion=${selectedEmotion.id}`);
  };

  const handleConfirmDelete = () => {
    useDiarySavedEntryStore.getState().clearEntry(diaryDate);
    useDiaryDraftStore.getState().removeDraft(diaryDate);
    setIsDeleteDialogOpen(false);
    router.push("/diary");
  };

  return (
    <main className="min-h-dvh bg-gray-100 text-foreground">
      <div className="relative mx-auto flex min-h-dvh w-full max-w-[395px] flex-col bg-background px-6 pb-[calc(126px+env(safe-area-inset-bottom))] pt-[28px]">
        <header className="grid grid-cols-[28px_1fr_28px] items-center">
          <button
            aria-label="일기 목록으로 돌아가기"
            className="flex size-7 items-center justify-center"
            onClick={() => router.push("/diary")}
            type="button"
          >
            <BackIcon />
          </button>
          <h1 className="text-center text-xl font-medium leading-[23px] text-foreground">
            일기
          </h1>
        </header>

        <div className="mt-[25px] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <EmotionAvatar emotion={selectedEmotion} />
            <p className="flex items-center gap-[9px] whitespace-nowrap text-lg text-foreground">
              <span>{datePart}</span>
              <span>{weekdayPart}</span>
            </p>
          </div>

          <div className="inline-flex items-center gap-2">
            <button
              aria-label="일기 수정하기"
              className="relative size-7"
              onClick={handleEdit}
              type="button"
            >
              <Image
                alt=""
                className="absolute left-1/2 top-[3.5px] -translate-x-1/2"
                height={24.2835}
                src="/images/diary/icons/edit.svg"
                width={21}
              />
            </button>
            <button
              aria-label="일기 삭제하기"
              className="relative size-7"
              onClick={() => setIsDeleteDialogOpen(true)}
              type="button"
            >
              <Image alt="" className="absolute inset-0" height={28} src="/images/diary/icons/trash.svg" width={28} />
            </button>
          </div>
        </div>

        <section className="-mx-6 mt-[25px] bg-orange-100 pb-[72px] pt-[59px] text-center">
          <div className="relative flex justify-center">
            <Image
              alt=""
              className="pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2"
              height={233}
              src="/images/diary/mascots/mascot-glow.svg"
              width={233}
            />
            {mascot ? (
              <Image
                alt=""
                className="relative z-10"
                height={mascot.height}
                src={mascot.src}
                width={mascot.width}
              />
            ) : (
              <div className="relative z-10">
                <EmotionIcon emotion={selectedEmotion} scale={mascotScale} />
              </div>
            )}
          </div>
          <p className="mt-9 whitespace-pre-line px-11 text-sm font-medium leading-5 text-foreground">
            {MOCK_COMFORT_MESSAGE}
          </p>
        </section>

        <section className="-mt-11 rounded-lg border border-gray-200 bg-background px-5 py-4 shadow-[0_4px_20px_rgba(18,18,18,0.05)]">
          <p className="text-[13px] leading-5 text-foreground">
            {MOCK_SITUATION_SUMMARY_LEAD}
            <span className="text-orange-500">{MOCK_SITUATION_SUMMARY_HIGHLIGHT}</span>
          </p>
        </section>

        <section className="mt-6">
          <h2 className="text-xl font-medium text-foreground">저장된 일기</h2>
          <div className="mt-3 rounded-lg border border-gray-200 bg-background px-6 py-5 shadow-[0_4px_20px_rgba(18,18,18,0.05)]">
            <p className="whitespace-pre-line text-[15px] leading-[22px] text-foreground">
              {entry?.content ?? "저장된 일기 내용을 불러올 수 없어요."}
            </p>

            {entry && entry.imageUrls.length > 0 ? (
              <div className="mt-5 flex flex-col gap-3">
                {entry.imageUrls.map((url) => (
                  // eslint-disable-next-line @next/next/no-img-element -- object URLs from the write screen aren't compatible with next/image's optimizer
                  <img
                    alt="첨부한 사진"
                    className="h-[277px] w-full rounded-xl object-cover object-bottom"
                    key={url}
                    src={url}
                  />
                ))}
              </div>
            ) : null}
          </div>
        </section>

        <button
          className="mt-8 flex h-[57px] w-full items-center justify-center rounded-lg bg-orange-500 text-xl font-semibold leading-[23px] text-white transition-opacity active:opacity-90"
          onClick={() => router.push("/diary")}
          type="button"
        >
          확인
        </button>

        <BottomNavigation activeValue="diary" items={MAIN_NAVIGATION_ITEMS} />

        {isDeleteDialogOpen ? (
          <DiaryExitDialog
            description="삭제한 일기는 복구할 수 없어요."
            onClose={() => setIsDeleteDialogOpen(false)}
            onPrimary={handleConfirmDelete}
            onSecondary={() => setIsDeleteDialogOpen(false)}
            primaryLabel="삭제하기"
            secondaryLabel="취소"
            title="일기를 삭제할까요?"
          />
        ) : null}
      </div>
    </main>
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

