import { isAxiosError } from "axios";

import type { ApiResponse } from "@/features/auth/types";
import type {
  NotificationDays,
  NotificationSettings,
} from "@/features/user/types";
import { apiClient } from "@/services/apiClient";

const NOTIFICATION_SETTINGS_PATH = "/api/mypage/notifications";
const NOTIFICATION_DAYS_PATH = "/api/mypage/notifications/days";

export class NotificationApiError extends Error {
  code?: string;

  constructor(message: string, code?: string) {
    super(message);
    this.name = "NotificationApiError";
    this.code = code;
  }
}

export async function updateNotificationSettings(
  request: Partial<NotificationSettings>,
): Promise<void> {
  await patchNotificationSettings(NOTIFICATION_SETTINGS_PATH, request);
}

export async function updateNotificationDays(
  request: Partial<NotificationDays>,
): Promise<void> {
  await patchNotificationSettings(NOTIFICATION_DAYS_PATH, request);
}

async function patchNotificationSettings<T extends object>(
  path: string,
  request: T,
): Promise<void> {
  try {
    const response = await apiClient.patch<ApiResponse>(path, request);

    if (!response.data.success) {
      throw new NotificationApiError(
        response.data.message || "알림 설정을 변경하지 못했어요.",
        response.data.code,
      );
    }
  } catch (error) {
    if (error instanceof NotificationApiError) {
      throw error;
    }

    if (isAxiosError<ApiResponse>(error)) {
      throw new NotificationApiError(
        error.response?.data.message || "알림 설정을 변경하지 못했어요.",
        error.response?.data.code,
      );
    }

    throw new NotificationApiError("알림 설정을 변경하지 못했어요.");
  }
}
