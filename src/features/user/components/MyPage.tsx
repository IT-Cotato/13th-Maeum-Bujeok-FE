import Image from "next/image";
import Link from "next/link";

import BottomNavigation from "@/components/layout/BottomNavigation";
import { MAIN_NAVIGATION_ITEMS } from "@/constants/navigation";
import FiveElementGaugeSection from "@/features/user/components/FiveElementGaugeSection";
import MyMenuSection from "@/features/user/components/MyMenuSection";
import {
  ACCOUNT_MENU_ITEMS,
  CONVENIENCE_MENU_ITEMS,
  DEFAULT_FIVE_ELEMENT_GAUGES,
  SUPPORT_MENU_ITEMS,
} from "@/features/user/constants";

export default function MyPage() {
  return (
    <main className="h-dvh overflow-hidden bg-gray-100 text-foreground">
      <div className="relative mx-auto h-dvh w-full max-w-[393px] overflow-hidden bg-background">
        <div className="h-full overflow-y-auto px-6 pb-[calc(116px+env(safe-area-inset-bottom))] pt-[25px]">
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
            className="mt-[31px] flex h-[59px] items-center justify-between"
            aria-label="프로필"
          >
            <div className="flex items-center gap-[21px]">
              <div className="relative size-[59px] shrink-0 rounded-full bg-orange-100 shadow-[0_5.364px_26.818px_rgba(18,18,18,0.05)]">
                <Image
                  alt=""
                  className="absolute left-[13.41px] top-[9.39px]"
                  height={40}
                  src="/figma/my/profile-flame-v2.svg"
                  width={32}
                />
              </div>
              <p className="w-[75px] text-xl font-semibold leading-[22px]">
                김마음 님
              </p>
            </div>

            <button
              className="h-[29px] rounded-[50px] bg-orange-500 px-[15px] text-[13px] font-medium leading-normal text-white"
              type="button"
            >
              프로필 수정
            </button>
          </section>

          <FiveElementGaugeSection values={DEFAULT_FIVE_ELEMENT_GAUGES} />
          <MyMenuSection
            className="w-[164px]"
            items={CONVENIENCE_MENU_ITEMS}
            title="생활편의"
          />
          <MyMenuSection items={SUPPORT_MENU_ITEMS} title="고객 지원" />
          <MyMenuSection items={ACCOUNT_MENU_ITEMS} title="계정" />
        </div>

        <BottomNavigation activeValue="my" items={MAIN_NAVIGATION_ITEMS} />
      </div>
    </main>
  );
}
