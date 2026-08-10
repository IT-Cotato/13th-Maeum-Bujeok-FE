"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import FeedbackScreen, {
  LoadingFlameIcon,
} from "@/components/common/FeedbackScreen";
import LoginScreen from "@/features/auth/components/login/LoginScreen";
import MemberOnboardingFlow from "@/features/auth/components/onboarding/MemberOnboardingFlow";
import PasswordResetFlow from "@/features/auth/components/password-reset/PasswordResetFlow";
import ServiceIntroScreen from "@/features/auth/components/onboarding/ServiceIntroScreen";
import WelcomeScreen from "@/features/auth/components/onboarding/WelcomeScreen";
import SignupFlow from "@/features/auth/components/signup/SignupFlow";
import { SERVICE_INTRO_STEPS } from "@/features/auth/constants";
import { useAuthStore } from "@/store/useAuthStore";
import { useUserStore } from "@/store/useUserStore";

type OnboardingView =
  | "intro"
  | "login"
  | "member-onboarding"
  | "password-reset"
  | "signup"
  | "welcome";

export default function OnboardingFlow() {
  const router = useRouter();
  const accessToken = useAuthStore((state) => state.accessToken);
  const profile = useUserStore((state) => state.profile);
  const profileStatus = useUserStore((state) => state.profileStatus);
  const [view, setView] = useState<OnboardingView>("welcome");
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    const isLastStep = currentStep === SERVICE_INTRO_STEPS.length - 1;

    if (isLastStep) {
      setView("login");
      return;
    }

    setCurrentStep((step) => step + 1);
  };

  useEffect(() => {
    if (view !== "welcome" || profileStatus !== "success" || !profile) {
      return;
    }

    if (profile.onboardingCompleted) {
      router.replace("/");
    }
  }, [profile, profileStatus, router, view]);

  const currentView =
    view === "welcome" &&
    profileStatus === "success" &&
    profile &&
    !profile.onboardingCompleted
      ? "member-onboarding"
      : view;

  if (accessToken && view === "welcome" && profileStatus !== "success") {
    return (
      <FeedbackScreen
        description="사용자 정보를 확인하고 있어요."
        icon={<LoadingFlameIcon />}
        title="잠시만 기다려주세요"
        topClassName="top-[317px]"
      />
    );
  }

  return (
    <main className="min-h-dvh bg-navy-900 text-orange-100">
      <div className="relative mx-auto h-dvh min-h-[700px] w-full max-w-[393px] overflow-hidden bg-navy-900">
        {currentView === "welcome" && (
          <WelcomeScreen
            onLogin={() => setView("login")}
            onStart={() => setView("intro")}
          />
        )}

        {currentView === "intro" && (
          <ServiceIntroScreen
            currentStep={currentStep}
            onNext={handleNext}
            step={SERVICE_INTRO_STEPS[currentStep]}
            totalSteps={SERVICE_INTRO_STEPS.length}
          />
        )}

        {currentView === "login" && (
          <LoginScreen
            onPasswordReset={() => setView("password-reset")}
            onSignup={() => setView("signup")}
          />
        )}

        {currentView === "password-reset" && (
          <PasswordResetFlow onExit={() => setView("login")} />
        )}

        {currentView === "signup" && (
          <SignupFlow onExit={() => setView("login")} />
        )}

        {currentView === "member-onboarding" && (
          <MemberOnboardingFlow onExit={() => setView("welcome")} />
        )}
      </div>
    </main>
  );
}
