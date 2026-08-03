export type FiveElement = "earth" | "fire" | "metal" | "water" | "wood";

export type FiveElementGaugeValue = {
  element: FiveElement;
  percentage: number;
  fillPercentage?: number;
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
