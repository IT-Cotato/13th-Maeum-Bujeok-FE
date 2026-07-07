"use client";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ reset }: ErrorPageProps) {
  return (
    <main className="min-h-dvh bg-gray-100 text-foreground">
      <div className="mx-auto flex min-h-dvh w-full max-w-[395px] flex-col items-center justify-center bg-background px-6 text-center">
        <p className="text-[13px] font-medium leading-[25px] tracking-[0.02em] text-orange-500">
          오류
        </p>
        <h1 className="mt-1 text-xl font-semibold leading-[27px]">
          잠시 문제가 생겼어요
        </h1>
        <p className="mt-4 text-base leading-6 text-gray-500">
          화면을 다시 불러오면 해결될 수 있어요.
        </p>
        <button
          className="mt-8 flex h-12 w-full items-center justify-center rounded-lg bg-orange-500 text-base font-semibold text-white"
          onClick={reset}
          type="button"
        >
          다시 시도하기
        </button>
      </div>
    </main>
  );
}
