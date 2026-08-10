import { isAxiosError } from "axios";

import type { ApiResponse } from "@/features/auth/types";
import type { MemberProfile } from "@/features/user/types";
import { apiClient } from "@/services/apiClient";

export class ProfileApiError extends Error {
  code?: string;
  status?: number;

  constructor(message: string, code?: string, status?: number) {
    super(message);
    this.name = "ProfileApiError";
    this.code = code;
    this.status = status;
  }
}

export async function getMyProfile(): Promise<MemberProfile> {
  try {
    const response = await apiClient.get<ApiResponse<MemberProfile>>(
      "/api/mypage/profile",
    );
    const payload = response.data;

    if (!payload.success || !payload.data) {
      throw new ProfileApiError(
        payload.message || "사용자 정보를 불러오지 못했어요.",
        payload.code,
      );
    }

    return payload.data;
  } catch (error) {
    if (error instanceof ProfileApiError) {
      throw error;
    }

    if (isAxiosError<ApiResponse>(error)) {
      throw new ProfileApiError(
        error.response?.data?.message || "사용자 정보를 불러오지 못했어요.",
        error.response?.data?.code,
        error.response?.status,
      );
    }

    throw new ProfileApiError("사용자 정보를 불러오지 못했어요.");
  }
}

export function isOnboardingRequiredError(error: unknown): boolean {
  return (
    error instanceof ProfileApiError &&
    (error.code === "MEMBER_003" || error.status === 404)
  );
}
