import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-dvh bg-gray-100 text-foreground">
      <div className="mx-auto flex min-h-dvh w-full max-w-[395px] flex-col items-center justify-center bg-background px-6 text-center">
        <p className="text-[13px] font-medium leading-[25px] tracking-[0.02em] text-orange-500">
          404
        </p>
        <h1 className="mt-1 text-xl font-semibold leading-[27px]">
          페이지를 찾을 수 없어요
        </h1>
        <p className="mt-4 text-base leading-6 text-gray-500">
          주소가 바뀌었거나 아직 준비되지 않은 화면이에요.
        </p>
        <Link
          className="mt-8 flex h-12 w-full items-center justify-center rounded-lg bg-orange-500 text-base font-semibold text-white"
          href="/"
        >
          홈으로 돌아가기
        </Link>
      </div>
    </main>
  );
}
