import { isAxiosError } from "axios";

import type {
  ApiResponse,
  CreateSajuAnalysisResponse,
} from "@/features/auth/types";
import { apiClient } from "@/services/apiClient";

export async function createSajuAnalysis(): Promise<CreateSajuAnalysisResponse> {
  try {
    const response =
      await apiClient.post<ApiResponse<CreateSajuAnalysisResponse>>(
        "/api/saju/analyses",
      );
    const payload = response.data;

    if (!payload.success || !payload.data) {
      throw new Error(payload.message || "사주 분석을 시작하지 못했어요.");
    }

    return payload.data;
  } catch (error) {
    if (isAxiosError<ApiResponse>(error)) {
      throw new Error(
        error.response?.data?.message || "사주 분석을 시작하지 못했어요.",
      );
    }

    throw error;
  }
}
