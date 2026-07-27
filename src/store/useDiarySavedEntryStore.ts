"use client";

import { create } from "zustand";
import type { EmotionId } from "@/features/diary/constants";

export type DiarySavedEntry = {
  content: string;
  date: string;
  emotionId: EmotionId;
  imageUrls: string[];
};

type DiarySavedEntryStore = {
  clearEntry: (date: string) => void;
  entry: DiarySavedEntry | null;
  setEntry: (entry: DiarySavedEntry) => void;
};

// 세션 내에서 화면4(작성) -> 화면5(저장 완료)로 방금 저장한 일기를 전달하는 용도.
// 이미지가 object URL(File 기반)이라 새로고침 후에는 유효하지 않으므로 영구 저장하지 않는다.
export const useDiarySavedEntryStore = create<DiarySavedEntryStore>((set) => ({
  clearEntry: (date) => {
    set((state) =>
      state.entry?.date === date ? { entry: null } : state,
    );
  },
  entry: null,
  setEntry: (entry) => {
    set({ entry });
  },
}));
