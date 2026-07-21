import Image from "next/image";
import Link from "next/link";

import BottomNavigation from "@/components/layout/BottomNavigation";
import { MAIN_NAVIGATION_ITEMS } from "@/constants/navigation";

const SUPPORT_ITEMS = ["고객센터", "서비스 이용 약관", "개인정보 처리 방침"];
const ACCOUNT_ITEMS = ["로그아웃", "회원탈퇴"];

export default function MyPage() {
  return (
    <main className="min-h-dvh bg-gray-100 text-foreground">
      <div className="relative mx-auto min-h-dvh w-full max-w-[393px] overflow-hidden bg-background px-6 pb-[86px] pt-[25px]">
        <header className="grid h-7 grid-cols-[28px_1fr_28px] items-center">
          <Link
            aria-label="홈으로 돌아가기"
            className="flex size-7 items-center justify-center"
            href="/"
          >
            <Image
              alt=""
              className="-rotate-90"
              height={28}
              src="/figma/my/back-arrow.svg"
              width={28}
            />
          </Link>
          <h1 className="text-center text-xl font-medium leading-[23px]">
            마이
          </h1>
        </header>

        <section
          className="mt-10 flex h-[59px] items-center"
          aria-label="프로필"
        >
          <div className="relative size-[59px] shrink-0 rounded-full bg-orange-200 shadow-[0_5.364px_26.818px_rgba(18,18,18,0.05)]">
            <Image
              alt=""
              className="absolute left-[13.41px] top-[9.39px]"
              height={40}
              src="/figma/my/profile-flame.svg"
              width={32}
            />
          </div>

          <div className="ml-[21px] flex flex-col gap-1.5">
            <p className="text-xl font-semibold leading-[22px]">김마음 님</p>
            <p className="text-center text-base font-medium leading-[22px] text-orange-400">
              木의 기운
            </p>
          </div>

          <button
            className="ml-auto h-[29px] rounded-[50px] bg-orange-500 px-[15px] text-[13px] font-medium leading-normal text-white"
            type="button"
          >
            프로필 수정
          </button>
        </section>

        <MenuSection className="mt-[52px]" items={["알림 설정"]} title="설정" />
        <MenuSection
          className="mt-11"
          items={SUPPORT_ITEMS}
          title="고객 지원"
        />
        <MenuSection className="mt-11" items={ACCOUNT_ITEMS} title="계정" />

        <BottomNavigation activeValue="my" items={MAIN_NAVIGATION_ITEMS} />
      </div>
    </main>
  );
}

type MenuSectionProps = {
  className?: string;
  items: string[];
  title: string;
};

function MenuSection({ className = "", items, title }: MenuSectionProps) {
  return (
    <section className={className}>
      <h2 className="text-lg font-medium leading-normal text-gray-500">
        {title}
      </h2>
      <div className="mt-4 flex flex-col items-start gap-[15px]">
        {items.map((item) => (
          <button
            className="text-left text-xl font-medium leading-normal text-foreground"
            key={item}
            type="button"
          >
            {item}
          </button>
        ))}
      </div>
    </section>
  );
}
