import Image from "next/image";

import AuthPrimaryButton from "@/features/auth/components/AuthPrimaryButton";

type WelcomeScreenProps = {
  onLogin: () => void;
  onStart: () => void;
};

export default function WelcomeScreen({
  onLogin,
  onStart,
}: WelcomeScreenProps) {
  return (
    <section aria-labelledby="welcome-title" className="absolute inset-0">
      <div className="absolute left-1/2 top-[217px] flex w-[183px] -translate-x-1/2 flex-col items-center">
        <div className="relative h-[150px] w-[69px] shrink-0">
          <Image
            alt=""
            className="absolute -left-5 -top-4 h-[190px] w-[109px] max-w-none"
            height={190}
            priority
            src="/figma/auth/welcome-flame.svg"
            width={109}
          />
        </div>
        <h1
          className="mt-[35px] h-8 text-center font-logo text-[30px] font-extrabold leading-[35px] text-orange-400"
          id="welcome-title"
        >
          마음부적
        </h1>
        <p className="mt-[35px] w-[281px] text-center text-base font-medium leading-[22px] text-orange-100">
          어제의 눈물을 태워 내일의 복으로 바꾸는 곳,
          <br />
          당신만을 위한 마음 처방전
        </p>
      </div>

      <div className="absolute inset-x-6 bottom-[112px]">
        <AuthPrimaryButton onClick={onStart} type="button">
          시작하기
        </AuthPrimaryButton>
      </div>

      <div className="absolute inset-x-0 bottom-[76px] flex items-center justify-center gap-[7px] text-[13px] leading-[23px]">
        <span className="font-light text-gray-400">이미 계정이 있나요?</span>
        <button
          className="font-medium text-gray-100"
          onClick={onLogin}
          type="button"
        >
          로그인
        </button>
      </div>
    </section>
  );
}
