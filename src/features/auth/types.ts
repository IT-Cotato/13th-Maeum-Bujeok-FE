export type ApiResponse<T = unknown> = {
  code: string;
  data?: T;
  message: string;
  success: boolean;
};

export type SmsSendRequest = {
  phoneNumber: string;
  purpose: "PASSWORD_RESET" | "SIGNUP";
};

export type SmsVerifyRequest = {
  code: string;
  phoneNumber: string;
};

export type LoginRequest = {
  password: string;
  phoneNumber: string;
};

export type PasswordResetRequest = {
  newPassword: string;
  phoneNumber: string;
};

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

export type SignUpRequest = {
  birthDate?: string;
  marketingAgreed: boolean;
  name: string;
  password: string;
  phoneNumber: string;
  privacyAgreed: boolean;
  sensitiveDataAgreed: boolean;
  termsAgreed: boolean;
};

export type SignUpTerms = {
  marketingAgreed: boolean;
  privacyAndSensitiveAgreed: boolean;
  termsAgreed: boolean;
};

export type CalendarType = "LUNAR" | "LUNAR_LEAP" | "SOLAR";

export type Gender = "FEMALE" | "MALE" | "NONE";

export type SajuProfileDraft = {
  birthDate: string;
  birthTime: string | null;
  calendarType: CalendarType;
  gender: Gender;
};
