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

export type AuthProvider = "GOOGLE" | "LOCAL";

export type MemberProfile = {
  birthDate: string | null;
  birthTime: string | null;
  calendarType: "LUNAR" | "LUNAR_LEAP" | "SOLAR" | null;
  email: string | null;
  gender: "FEMALE" | "MALE" | "NONE" | null;
  marketingAgreed: boolean;
  name: string;
  onboardingCompleted: boolean;
  onboardingCompletedAt: string | null;
  phoneNumber: string;
  privacyAgreed: boolean;
  provider: AuthProvider;
  sensitiveDataAgreed: boolean;
  termsAgreed: boolean;
};
