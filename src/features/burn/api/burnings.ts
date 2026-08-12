import { isAxiosError } from "axios";

import type { ApiResponse } from "@/features/auth/types";
import type {
  CreateBurningRequest,
  CreateBurningResponse,
} from "@/features/burn/types";
import { apiClient } from "@/services/apiClient";

export class BurningApiError extends Error {
  code?: string;

  constructor(message: string, code?: string) {
    super(message);
    this.name = "BurningApiError";
    this.code = code;
  }
}

export async function createBurning(
  request: CreateBurningRequest,
): Promise<CreateBurningResponse> {
  try {
    const response = await apiClient.post<ApiResponse<CreateBurningResponse>>(
      "/api/burnings",
      request,
    );
    const payload = response.data;

    if (!payload.success || !payload.data) {
      throw new BurningApiError(
        payload.message || "소각을 시작하지 못했어요.",
        payload.code,
      );
    }

    return payload.data;
  } catch (error) {
    if (error instanceof BurningApiError) {
      throw error;
    }

    if (isAxiosError<ApiResponse>(error)) {
      throw new BurningApiError(
        error.response?.data?.message || "소각을 시작하지 못했어요.",
        error.response?.data?.code,
      );
    }

    throw new BurningApiError("소각을 시작하지 못했어요.");
  }
}
