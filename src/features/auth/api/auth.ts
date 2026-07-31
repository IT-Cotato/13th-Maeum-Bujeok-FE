import type {
  ApiResponse,
  AuthTokens,
  LoginRequest,
  PasswordResetRequest,
  SignUpRequest,
  SmsSendRequest,
  SmsVerifyRequest,
} from "@/features/auth/types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://maumbujeok.p-e.kr";

export class AuthApiError extends Error {
  code: string;

  constructor(message: string, code: string) {
    super(message);
    this.name = "AuthApiError";
    this.code = code;
  }
}

export async function sendSignupSms(phoneNumber: string): Promise<void> {
  await sendSms(phoneNumber, "SIGNUP");
}

export async function sendPasswordResetSms(phoneNumber: string): Promise<void> {
  await sendSms(phoneNumber, "PASSWORD_RESET");
}

export async function verifySmsCode(request: SmsVerifyRequest): Promise<void> {
  await postAuthRequest<SmsVerifyRequest>("/api/auth/sms/verify", request);
}

export async function resetPassword(
  request: PasswordResetRequest,
): Promise<void> {
  await postAuthRequest<PasswordResetRequest>(
    "/api/auth/password/reset",
    request,
  );
}

export async function signUp(request: SignUpRequest): Promise<void> {
  await postAuthRequest<SignUpRequest>("/api/auth/signup", request);
}

export async function login(request: LoginRequest): Promise<AuthTokens> {
  const tokens = await postAuthRequest<LoginRequest, AuthTokens>(
    "/api/auth/login",
    request,
  );

  if (
    !tokens ||
    typeof tokens.accessToken !== "string" ||
    typeof tokens.refreshToken !== "string"
  ) {
    throw new AuthApiError(
      "로그인 응답에서 인증 정보를 확인하지 못했어요.",
      "INVALID_LOGIN_RESPONSE",
    );
  }

  return tokens;
}

async function sendSms(
  phoneNumber: string,
  purpose: SmsSendRequest["purpose"],
): Promise<void> {
  await postAuthRequest<SmsSendRequest>("/api/auth/sms/send", {
    phoneNumber,
    purpose,
  });
}

async function postAuthRequest<TRequest, TData = unknown>(
  path: string,
  body: TRequest,
): Promise<TData | undefined> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });
  const payload = (await response
    .json()
    .catch(() => null)) as ApiResponse | null;

  if (!response.ok || !payload?.success) {
    throw new AuthApiError(
      payload?.message || "요청을 처리하지 못했어요.",
      payload?.code || String(response.status),
    );
  }

  return payload.data as TData | undefined;
}
