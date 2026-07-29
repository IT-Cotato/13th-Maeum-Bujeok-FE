"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { EmotionId } from "@/features/diary/constants";

export type DiaryEntryRecord = {
  content: string;
  emotionId: EmotionId;
  savedAt: string;
};

type DiaryEntriesStore = {
  entries: Record<string, DiaryEntryRecord>;
  removeEntry: (date: string) => void;
  setEntry: (date: string, entry: Omit<DiaryEntryRecord, "savedAt">) => void;
};

// 캘린더(일기 탭)에서 작성일/미작성일을 판단하는 데 쓰는 저장소.
// 사진은 object URL이라 새로고침 후 재생 불가능하므로 포함하지 않는다(임시저장 스토어와 동일한 이유).
export const useDiaryEntriesStore = create<DiaryEntriesStore>()(
  persist(
    (set) => ({
      entries: {},
      removeEntry: (date) => {
        set((state) => {
          const nextEntries = { ...state.entries };
          delete nextEntries[date];
          return { entries: nextEntries };
        });
      },
      setEntry: (date, entry) => {
        set((state) => ({
          entries: {
            ...state.entries,
            [date]: { ...entry, savedAt: new Date().toISOString() },
          },
        }));
      },
    }),
    {
      name: "maeum-bujeok:diary-entries",
      version: 1,
    },
  ),
);
