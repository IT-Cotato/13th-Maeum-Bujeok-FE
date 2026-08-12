import { isAxiosError } from "axios";

import type { ApiResponse } from "@/features/auth/types";
import type {
  EmotionStat,
  GenerateWeeklyReportResponse,
  NextWeekFlow,
  NextWeekFlowStart,
  ReportBurning,
  WeeklyReportPeriod,
  WeeklyReportSummary,
} from "@/features/report/types";
import { apiClient } from "@/services/apiClient";

const REPORTS_PATH = "/api/reports";

export class ReportApiError extends Error {
  code?: string;
  status?: number;

  constructor(message: string, code?: string, status?: number) {
    super(message);
    this.name = "ReportApiError";
    this.code = code;
    this.status = status;
  }
}

export async function getWeeklyReportPeriods(
  signal?: AbortSignal,
): Promise<WeeklyReportPeriod[]> {
  return getReportData<WeeklyReportPeriod[]>(`${REPORTS_PATH}/weeks`, signal);
}

export async function generateWeeklyReport(
  weekStart: string,
): Promise<GenerateWeeklyReportResponse> {
  return postReportData<GenerateWeeklyReportResponse>(
    `${REPORTS_PATH}/weekly/generate`,
    { weekStart },
  );
}

export async function getWeeklyReport(
  startDate: string,
  signal?: AbortSignal,
): Promise<WeeklyReportSummary> {
  return getReportData<WeeklyReportSummary>(`${REPORTS_PATH}/weekly`, signal, {
    startDate,
  });
}

export async function getWeeklyReportSummary(
  summaryId: number,
  signal?: AbortSignal,
): Promise<WeeklyReportSummary> {
  return getReportData<WeeklyReportSummary>(
    `${REPORTS_PATH}/weekly-summary/${summaryId}`,
    signal,
  );
}

export async function getReportEmotionStats(
  reportId: number,
  signal?: AbortSignal,
): Promise<EmotionStat[]> {
  return getReportData<EmotionStat[]>(
    `${REPORTS_PATH}/weekly/${reportId}/emotion-stats`,
    signal,
  );
}

export async function getReportBurnings(
  reportId: number,
  signal?: AbortSignal,
): Promise<ReportBurning[]> {
  const data = await getReportData<unknown>(
    `${REPORTS_PATH}/weekly/${reportId}/burnings`,
    signal,
  );

  if (Array.isArray(data)) {
    return data as ReportBurning[];
  }

  if (isRecord(data) && Array.isArray(data.items)) {
    return data.items as ReportBurning[];
  }

  throw new ReportApiError("소각 기록 응답 형식이 올바르지 않아요.");
}

export async function getReportNextWeekFlow(
  reportId: number,
  signal?: AbortSignal,
): Promise<NextWeekFlow | null> {
  try {
    return await getReportData<NextWeekFlow>(
      `${REPORTS_PATH}/weekly/${reportId}/next-week-flow`,
      signal,
    );
  } catch (error) {
    if (error instanceof ReportApiError && error.status === 404) {
      return null;
    }

    throw error;
  }
}

export async function generateNextWeekFlow(
  weekStart: string,
): Promise<NextWeekFlowStart> {
  return postReportData<NextWeekFlowStart>(`${REPORTS_PATH}/next-week-flow`, {
    weekStart,
  });
}

export async function getNextWeekFlow(
  flowId: number,
  signal?: AbortSignal,
): Promise<NextWeekFlow> {
  return getReportData<NextWeekFlow>(
    `${REPORTS_PATH}/next-week-flow/${flowId}`,
    signal,
  );
}

type QueryParams = Record<string, number | string>;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

async function getReportData<TData>(
  path: string,
  signal?: AbortSignal,
  params?: QueryParams,
): Promise<TData> {
  try {
    const response = await apiClient.get<ApiResponse<TData>>(path, {
      params,
      signal,
    });
    const payload = response.data;

    if (!payload.success || payload.data == null) {
      throw new ReportApiError(
        payload.message || "리포트를 불러오지 못했어요.",
        payload.code,
      );
    }

    return payload.data;
  } catch (error) {
    if (error instanceof ReportApiError) {
      throw error;
    }

    if (isAxiosError<ApiResponse>(error)) {
      throw new ReportApiError(
        error.response?.data?.message || "리포트를 불러오지 못했어요.",
        error.response?.data?.code,
        error.response?.status,
      );
    }

    throw new ReportApiError("리포트를 불러오지 못했어요.");
  }
}

async function postReportData<TData>(
  path: string,
  request: Record<string, string>,
): Promise<TData> {
  try {
    const response = await apiClient.post<ApiResponse<TData>>(path, request);
    const payload = response.data;

    if (!payload.success || payload.data == null) {
      throw new ReportApiError(
        payload.message || "리포트를 생성하지 못했어요.",
        payload.code,
      );
    }

    return payload.data;
  } catch (error) {
    if (error instanceof ReportApiError) {
      throw error;
    }

    if (isAxiosError<ApiResponse>(error)) {
      throw new ReportApiError(
        error.response?.data?.message || "리포트를 생성하지 못했어요.",
        error.response?.data?.code,
        error.response?.status,
      );
    }

    throw new ReportApiError("리포트를 생성하지 못했어요.");
  }
}
