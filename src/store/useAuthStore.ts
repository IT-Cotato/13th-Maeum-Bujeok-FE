"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { AuthTokens } from "@/features/auth/types";

type AuthStore = {
  accessToken: string | null;
  clearTokens: () => void;
  refreshToken: string | null;
  setTokens: (tokens: AuthTokens) => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      accessToken: null,
      clearTokens: () => {
        set({
          accessToken: null,
          refreshToken: null,
        });
      },
      refreshToken: null,
      setTokens: ({ accessToken, refreshToken }) => {
        set({
          accessToken,
          refreshToken,
        });
      },
    }),
    {
      name: "maeum-bujeok:auth",
      partialize: ({ accessToken, refreshToken }) => ({
        accessToken,
        refreshToken,
      }),
      version: 1,
    },
  ),
);
