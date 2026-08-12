"use client";

import { useCallback, useEffect, useState } from "react";

import { getMyTalismans } from "@/features/report/api/talismans";
import type { TalismanItem } from "@/features/report/types";

type TalismansState = {
  error: string | null;
  hasNext: boolean;
  isLoading: boolean;
  isLoadingMore: boolean;
  items: TalismanItem[];
  nextCursor: number | null;
};

export function useTalismans(size = 3) {
  const [state, setState] = useState<TalismansState>({
    error: null,
    hasNext: false,
    isLoading: true,
    isLoadingMore: false,
    items: [],
    nextCursor: null,
  });

  useEffect(() => {
    const controller = new AbortController();

    void getMyTalismans({ size }, controller.signal)
      .then((response) => {
        setState({
          error: null,
          hasNext: response.hasNext,
          isLoading: false,
          isLoadingMore: false,
          items: response.items,
          nextCursor: response.nextCursor,
        });
      })
      .catch((error: unknown) => {
        if (!controller.signal.aborted) {
          setState((current) => ({
            ...current,
            error: getErrorMessage(error),
            isLoading: false,
          }));
        }
      });

    return () => controller.abort();
  }, [size]);

  const loadMore = useCallback(async () => {
    const { hasNext, isLoadingMore, nextCursor } = state;

    if (!hasNext || isLoadingMore || nextCursor == null) {
      return;
    }

    setState((current) => ({ ...current, isLoadingMore: true }));

    try {
      const response = await getMyTalismans({ cursor: nextCursor, size });
      setState((current) => ({
        ...current,
        error: null,
        hasNext: response.hasNext,
        isLoadingMore: false,
        items: [...current.items, ...response.items],
        nextCursor: response.nextCursor,
      }));
    } catch (error) {
      setState((current) => ({
        ...current,
        error: getErrorMessage(error),
        isLoadingMore: false,
      }));
    }
  }, [size, state]);

  return { ...state, loadMore };
}

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : "부적을 불러오지 못했어요.";
}
