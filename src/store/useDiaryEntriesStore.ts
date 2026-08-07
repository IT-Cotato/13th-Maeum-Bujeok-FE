"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { EmotionId } from "@/features/diary/constants";

export type DiaryEntryRecord = {
  content: string;
  emotionId: EmotionId;
  id: string;
  isBurned?: boolean;
  savedAt: string;
};

type NewDiaryEntryInput = Omit<DiaryEntryRecord, "id" | "isBurned" | "savedAt">;

type DiaryEntriesStore = {
  entries: Record<string, DiaryEntryRecord[]>;
  addEntry: (date: string, entry: NewDiaryEntryInput) => string;
  burnEntry: (date: string, id: string) => void;
  removeEntry: (date: string, id: string) => void;
  updateEntry: (date: string, id: string, entry: NewDiaryEntryInput) => void;
};

function createEntryId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

// 하루에 여러 편의 일기를 쓸 수 있어서 날짜별로 배열로 저장한다.
// 캘린더(일기 탭)에서 작성일/미작성일/소각 여부를 판단하는 데도 이 저장소를 쓴다.
// 사진은 object URL이라 새로고침 후 재생 불가능하므로 포함하지 않는다(임시저장 스토어와 동일한 이유).
export const useDiaryEntriesStore = create<DiaryEntriesStore>()(
  persist(
    (set) => ({
      entries: {},
      addEntry: (date, entry) => {
        const id = createEntryId();

        set((state) => ({
          entries: {
            ...state.entries,
            [date]: [
              ...(state.entries[date] ?? []),
              { ...entry, id, savedAt: new Date().toISOString() },
            ],
          },
        }));

        return id;
      },
      burnEntry: (date, id) => {
        set((state) => {
          const dayEntries = state.entries[date];

          if (!dayEntries) {
            return state;
          }

          return {
            entries: {
              ...state.entries,
              [date]: dayEntries.map((entry) =>
                entry.id === id ? { ...entry, isBurned: true } : entry,
              ),
            },
          };
        });
      },
      removeEntry: (date, id) => {
        set((state) => {
          const dayEntries = state.entries[date];

          if (!dayEntries) {
            return state;
          }

          const nextDayEntries = dayEntries.filter((entry) => entry.id !== id);
          const nextEntries = { ...state.entries };

          if (nextDayEntries.length > 0) {
            nextEntries[date] = nextDayEntries;
          } else {
            delete nextEntries[date];
          }

          return { entries: nextEntries };
        });
      },
      updateEntry: (date, id, entry) => {
        set((state) => {
          const dayEntries = state.entries[date];

          if (!dayEntries) {
            return state;
          }

          return {
            entries: {
              ...state.entries,
              [date]: dayEntries.map((existing) =>
                existing.id === id ? { ...existing, ...entry } : existing,
              ),
            },
          };
        });
      },
    }),
    {
      migrate: (persistedState) => {
        // v1은 날짜당 일기 1개(단일 객체)였다. v2부터 하루에 여러 편을 쓸 수 있도록
        // 날짜당 배열로 바꿨으므로, 기존 데이터를 배열로 감싸고 id를 부여해 이전 값을 보존한다.
        const legacyEntries =
          (persistedState as { entries?: Record<string, unknown> } | undefined)
            ?.entries ?? {};
        const migratedEntries: Record<string, DiaryEntryRecord[]> = {};

        for (const [date, value] of Object.entries(legacyEntries)) {
          if (Array.isArray(value)) {
            migratedEntries[date] = value as DiaryEntryRecord[];
            continue;
          }

          const legacyEntry = value as Omit<DiaryEntryRecord, "id"> | undefined;

          if (legacyEntry) {
            migratedEntries[date] = [{ ...legacyEntry, id: createEntryId() }];
          }
        }

        return { entries: migratedEntries };
      },
      name: "maeum-bujeok:diary-entries",
      version: 2,
    },
  ),
);
