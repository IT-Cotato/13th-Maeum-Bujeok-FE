export type FiveElement = "earth" | "fire" | "metal" | "water" | "wood";

export type FiveElementGaugeValue = {
  element: FiveElement;
  percentage: number;
  fillPercentage?: number;
};

export type SajuAnalysisStatus =
  "COMPLETED" | "FAILED" | "PENDING" | "PROCESSING";

export type FiveElementsBalance = Record<FiveElement, number>;

export type SajuAnalysis = {
  analysisId: number;
  analyzedAt: string | null;
  elements: FiveElementsBalance | null;
  failureCode: string | null;
  modelName: string | null;
  status: SajuAnalysisStatus;
};

export type NotificationSettings = {
  diaryReminderEnabled: boolean;
  fortuneActionEnabled: boolean;
};

export type NotificationDays = {
  fridayEnabled: boolean;
  mondayEnabled: boolean;
  saturdayEnabled: boolean;
  sundayEnabled: boolean;
  thursdayEnabled: boolean;
  tuesdayEnabled: boolean;
  wednesdayEnabled: boolean;
};
