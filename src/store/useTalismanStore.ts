"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { GeneratedTalisman, SavedTalisman } from "@/features/burn/types";

type TalismanStore = {
  removeTalisman: (id: string) => void;
  saveTalisman: (talisman: GeneratedTalisman) => SavedTalisman;
  savedTalismans: SavedTalisman[];
};

export const useTalismanStore = create<TalismanStore>()(
  persist(
    (set) => ({
      removeTalisman: (id) => {
        set((state) => ({
          savedTalismans: state.savedTalismans.filter(
            (talisman) => talisman.id !== id,
          ),
        }));
      },
      saveTalisman: (talisman) => {
        const savedTalisman: SavedTalisman = {
          ...talisman,
          savedAt: new Date().toISOString(),
        };

        set((state) => ({
          savedTalismans: [
            savedTalisman,
            ...state.savedTalismans.filter(
              (savedItem) => savedItem.id !== talisman.id,
            ),
          ],
        }));

        return savedTalisman;
      },
      savedTalismans: [],
    }),
    {
      // TODO: Replace local persistence with server data after the API contract is confirmed.
      name: "maeum-bujeok:saved-talismans",
      version: 1,
    },
  ),
);
