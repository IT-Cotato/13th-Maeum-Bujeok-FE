"use client";

import { useState } from "react";

import LoginScreen from "@/features/auth/components/LoginScreen";
import ServiceIntroScreen from "@/features/auth/components/ServiceIntroScreen";
import WelcomeScreen from "@/features/auth/components/WelcomeScreen";
import { SERVICE_INTRO_STEPS } from "@/features/auth/constants";

type OnboardingView = "intro" | "login" | "welcome";

export default function OnboardingFlow() {
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

  return (
    <main className="min-h-dvh bg-navy-900 text-orange-100">
      <div className="relative mx-auto h-dvh min-h-[700px] w-full max-w-[393px] overflow-hidden bg-navy-900">
        {view === "welcome" && (
          <WelcomeScreen
            onLogin={() => setView("login")}
            onStart={() => setView("intro")}
          />
        )}

        {view === "intro" && (
          <ServiceIntroScreen
            currentStep={currentStep}
            onNext={handleNext}
            step={SERVICE_INTRO_STEPS[currentStep]}
            totalSteps={SERVICE_INTRO_STEPS.length}
          />
        )}

        {view === "login" && <LoginScreen />}
      </div>
    </main>
  );
}
