"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  AuthApiError,
  sendSignupSms,
  signUp,
  verifySmsCode,
} from "@/features/auth/api/auth";
import PasswordStep from "@/features/auth/components/common/PasswordStep";
import VerificationStep from "@/features/auth/components/common/VerificationStep";
import DuplicateMemberDialog from "@/features/auth/components/signup/DuplicateMemberDialog";
import SajuProfileStep from "@/features/auth/components/signup/SajuProfileStep";
import SignupSuccessScreen from "@/features/auth/components/signup/SignupSuccessScreen";
import TermsStep from "@/features/auth/components/signup/TermsStep";
import type { SajuProfileDraft, SignUpTerms } from "@/features/auth/types";

type SignupStep = "terms" | "verification" | "password" | "success" | "saju";

type SignupFlowProps = {
  onExit: () => void;
};

const SMS_LIMIT_SECONDS = 3 * 60;

const INITIAL_TERMS: SignUpTerms = {
  marketingAgreed: false,
  privacyAndSensitiveAgreed: false,
  termsAgreed: false,
};

export default function SignupFlow({ onExit }: SignupFlowProps) {
  const router = useRouter();
  const [step, setStep] = useState<SignupStep>("terms");
  const [terms, setTerms] = useState<SignUpTerms>(INITIAL_TERMS);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [code, setCode] = useState("");
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [verificationError, setVerificationError] = useState<string | null>(
    null,
  );
  const [signupError, setSignupError] = useState<string | null>(null);
  const [isDuplicateMember, setIsDuplicateMember] = useState(false);

  useEffect(() => {
    if (remainingSeconds <= 0) {
      return;
    }

    const timer = window.setInterval(() => {
      setRemainingSeconds((seconds) => Math.max(0, seconds - 1));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [remainingSeconds]);

  const handleBack = () => {
    if (step === "terms") {
      onExit();
      return;
    }

    if (step === "verification") {
      setStep("terms");
      return;
    }

    if (step === "password") {
      setStep("verification");
      return;
    }

    if (step === "saju") {
      setStep("success");
    }
  };

  const handlePhoneNumberChange = (value: string) => {
    setPhoneNumber(value);
    setCode("");
    setRemainingSeconds(0);
    setVerificationError(null);
  };

  const handleSendCode = async () => {
    setIsSending(true);
    setVerificationError(null);

    try {
      await sendSignupSms(phoneNumber.trim());
      setCode("");
      setRemainingSeconds(SMS_LIMIT_SECONDS);
    } catch (error) {
      if (isDuplicateMemberError(error)) {
        setIsDuplicateMember(true);
      } else {
        setVerificationError(getErrorMessage(error));
      }
    } finally {
      setIsSending(false);
    }
  };

  const handleVerifyCode = async () => {
    if (remainingSeconds <= 0 || !code.trim()) {
      return;
    }

    setIsVerifying(true);
    setVerificationError(null);

    try {
      await verifySmsCode({
        code: code.trim(),
        phoneNumber: phoneNumber.trim(),
      });
      setStep("password");
    } catch {
      setVerificationError("인증번호가 잘못 입력되었어요.");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleSignUp = async () => {
    if (!password || password !== confirmPassword) {
      return;
    }

    setIsSubmitting(true);
    setSignupError(null);

    try {
      await signUp({
        marketingAgreed: terms.marketingAgreed,
        name: name.trim(),
        password,
        phoneNumber: phoneNumber.trim(),
        privacyAgreed: terms.privacyAndSensitiveAgreed,
        sensitiveDataAgreed: terms.privacyAndSensitiveAgreed,
        termsAgreed: terms.termsAgreed,
      });
      setStep("success");
    } catch (error) {
      if (isDuplicateMemberError(error)) {
        setIsDuplicateMember(true);
      } else {
        setSignupError(getErrorMessage(error));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSajuConfirm = (profile: SajuProfileDraft) => {
    // TODO(auth): Replace this draft with /api/members/saju after the signup
    // response defines how the access token is returned.
    sessionStorage.setItem(
      "maeum-bujeok:saju-profile-draft",
      JSON.stringify(profile),
    );
    router.push("/");
  };

  return (
    <>
      {step === "terms" ? (
        <TermsStep
          onBack={handleBack}
          onNext={() => setStep("verification")}
          onTermsChange={setTerms}
          terms={terms}
        />
      ) : null}
      {step === "verification" ? (
        <VerificationStep
          code={code}
          errorMessage={verificationError}
          isSending={isSending}
          isVerifying={isVerifying}
          name={name}
          onBack={handleBack}
          onCodeChange={(value) => {
            setCode(value);
            setVerificationError(null);
          }}
          onNameChange={setName}
          onNext={handleVerifyCode}
          onPhoneNumberChange={handlePhoneNumberChange}
          onSendCode={handleSendCode}
          phoneNumber={phoneNumber}
          remainingSeconds={remainingSeconds}
        />
      ) : null}
      {step === "password" ? (
        <PasswordStep
          confirmPassword={confirmPassword}
          errorMessage={signupError}
          isSubmitting={isSubmitting}
          onBack={handleBack}
          onConfirmPasswordChange={(value) => {
            setConfirmPassword(value);
            setSignupError(null);
          }}
          onPasswordChange={(value) => {
            setPassword(value);
            setSignupError(null);
          }}
          onSubmit={handleSignUp}
          password={password}
        />
      ) : null}
      {step === "success" ? (
        <SignupSuccessScreen onSajuStart={() => setStep("saju")} />
      ) : null}
      {step === "saju" ? (
        <SajuProfileStep onBack={handleBack} onConfirm={handleSajuConfirm} />
      ) : null}
      {isDuplicateMember ? (
        <DuplicateMemberDialog
          onConfirm={() => {
            setIsDuplicateMember(false);
            setPassword("");
            setConfirmPassword("");
            setStep("verification");
          }}
        />
      ) : null}
    </>
  );
}

function getErrorMessage(error: unknown): string {
  return error instanceof Error
    ? error.message
    : "요청을 처리하지 못했어요. 다시 시도해주세요.";
}

function isDuplicateMemberError(error: unknown): boolean {
  return error instanceof AuthApiError && error.message.includes("이미 가입");
}
