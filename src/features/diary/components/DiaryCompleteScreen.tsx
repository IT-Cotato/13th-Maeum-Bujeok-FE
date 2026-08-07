"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import BottomNavigation from "@/components/layout/BottomNavigation";
import { MAIN_NAVIGATION_ITEMS } from "@/constants/navigation";
import BurnSuggestionDialog from "@/features/diary/components/BurnSuggestionDialog";
import DiaryExitDialog from "@/features/diary/components/DiaryExitDialog";
import EmotionAvatar from "@/features/diary/components/EmotionAvatar";
import PageHeader from "@/features/diary/components/PageHeader";
import {
  COMFORT_MESSAGE_MASCOT,
  EMOTIONS,
  MOCK_COMFORT_MESSAGE,
  MOCK_SITUATION_SUMMARY_HIGHLIGHT,
  MOCK_SITUATION_SUMMARY_LEAD,
  NEGATIVE_EMOTION_IDS,
} from "@/features/diary/constants";
import { getDiaryShortDateParts, getTodayDateString } from "@/features/diary/utils";
import { useDiaryDraftStore } from "@/store/useDiaryDraftStore";
import { useDiaryEntriesStore } from "@/store/useDiaryEntriesStore";
import { useDiarySavedEntryStore } from "@/store/useDiarySavedEntryStore";

const TODAY = getTodayDateString();

export default function DiaryCompleteScreen() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const diaryDate = searchParams.get("date") ?? TODAY;
  const entryId = searchParams.get("id");
  const selectedEmotion =
    EMOTIONS.find((emotion) => emotion.id === searchParams.get("emotion")) ??
    EMOTIONS[0];
  const { datePart, weekdayPart } = getDiaryShortDateParts(diaryDate);

  const ephemeralEntry = useDiarySavedEntryStore((state) =>
    state.entry?.date === diaryDate &&
    (!entryId || state.entry.id === entryId)
      ? state.entry
      : null,
  );
  const [persistedContent, setPersistedContent] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isBurnSuggestionOpen, setIsBurnSuggestionOpen] = useState(false);

  useEffect(() => {
    const persistedEntry = entryId
      ? useDiaryEntriesStore
          .getState()
          .entries[diaryDate]?.find((item) => item.id === entryId)
      : undefined;

    // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing from an external store (localStorage) that isn't available during render
    setPersistedContent(persistedEntry?.content ?? null);

    // 저장 직후(ephemeralEntry가 채워진 경우) + 아직 소각되지 않은 경우에만 부정 감정
    // 소각 제안 팝업을 띄운다. 이미 소각된 일기를 "자세히 보기"로 다시 열었을 때(같은 세션이라
    // ephemeralEntry가 남아있는 경우 포함)는 다시 소각을 묻지 않는다.
    const isAlreadyBurned = persistedEntry?.isBurned ?? false;

    if (
      ephemeralEntry &&
      !isAlreadyBurned &&
      NEGATIVE_EMOTION_IDS.includes(selectedEmotion.id)
    ) {
      setIsBurnSuggestionOpen(true);
    }
  }, [diaryDate, entryId, ephemeralEntry, selectedEmotion.id]);

  // "자세히 보기"로 캘린더에서 과거 일기를 볼 때는 저장 직후의 임시 저장소(사진 포함)가
  // 비어 있으므로, localStorage에 남아 있는 실제 내용을 대신 보여준다(사진은 세션 한정이라 생략).
  const entry = ephemeralEntry ?? (persistedContent !== null
    ? { content: persistedContent, date: diaryDate, imageUrls: [] as string[] }
    : null);

  const handleEdit = () => {
    router.push(
      `/diary/new/write?date=${diaryDate}&emotion=${selectedEmotion.id}${entryId ? `&id=${entryId}` : ""}`,
    );
  };

  const handleConfirmDelete = () => {
    useDiarySavedEntryStore.getState().clearEntry(diaryDate);
    useDiaryDraftStore.getState().removeDraft(diaryDate);

    if (entryId) {
      useDiaryEntriesStore.getState().removeEntry(diaryDate, entryId);
    }

    setIsDeleteDialogOpen(false);
    router.push("/diary");
  };

  const handleBurnFromSuggestion = () => {
    const burnEntryId = ephemeralEntry?.id ?? entryId;

    if (burnEntryId) {
      useDiaryEntriesStore.getState().burnEntry(diaryDate, burnEntryId);
    }

    sessionStorage.setItem(
      "maeum-bujeok:pending-burn",
      JSON.stringify({
        content: entry?.content ?? "",
        diaryId: burnEntryId ?? null,
        imageName: null,
        recordedDate: diaryDate,
        type: "diary",
      }),
    );
    setIsBurnSuggestionOpen(false);
    router.push("/burn/result");
  };

  return (
    <main className="min-h-dvh bg-gray-100 text-foreground">
      <div className="relative mx-auto flex min-h-dvh w-full max-w-[395px] flex-col bg-background px-6 pb-[calc(126px+env(safe-area-inset-bottom))] pt-[28px]">
        <PageHeader
          backLabel="일기 목록으로 돌아가기"
          onBack={() => router.push("/diary")}
          title="일기"
        />

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
              className="pointer-events-none absolute left-1/2 top-1/2 z-0"
              height={233}
              src="/images/diary/mascots/mascot-glow.svg"
              style={{ transform: "translate(calc(-50% - 4.5px), calc(-50% + 7.4px))" }}
              width={233}
            />
            <Image
              alt=""
              className="relative z-10"
              height={COMFORT_MESSAGE_MASCOT.height}
              src={COMFORT_MESSAGE_MASCOT.src}
              width={COMFORT_MESSAGE_MASCOT.width}
            />
          </div>
          <p className="mt-9 whitespace-pre-line px-11 text-sm font-medium leading-5 text-foreground">
            {MOCK_COMFORT_MESSAGE}
          </p>
        </section>

        <section className="-mt-11 rounded-lg border border-gray-200 bg-background px-5 py-4 shadow-[0_4px_20px_rgba(18,18,18,0.12)]">
          <p className="text-[13px] leading-5 text-foreground">
            {MOCK_SITUATION_SUMMARY_LEAD}
            <span className="text-orange-500">{MOCK_SITUATION_SUMMARY_HIGHLIGHT}</span>
          </p>
        </section>

        <section className="mt-6">
          <h2 className="text-xl font-medium text-foreground">저장된 일기</h2>
          <div className="mt-3 rounded-lg border border-gray-200 bg-background px-6 py-5 shadow-[0_4px_20px_rgba(18,18,18,0.12)]">
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

        {isBurnSuggestionOpen ? (
          <BurnSuggestionDialog
            onBurn={handleBurnFromSuggestion}
            onClose={() => setIsBurnSuggestionOpen(false)}
          />
        ) : null}
      </div>
    </main>
  );
}

