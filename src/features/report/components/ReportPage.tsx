import BottomNavigation from "@/components/layout/BottomNavigation";
import { MAIN_NAVIGATION_ITEMS } from "@/constants/navigation";

export default function ReportPage() {
  return (
    <main className="h-dvh overflow-hidden bg-gray-100 text-foreground">
      <div className="relative mx-auto h-dvh w-full max-w-[395px] overflow-y-auto bg-background pb-[calc(118px+env(safe-area-inset-bottom))] pt-[61px]">
        <header className="px-8">
          <div className="grid grid-cols-[24px_1fr_24px] items-center">
            <button
              aria-label="이전 주 리포트"
              className="text-foreground"
              type="button"
            >
              <ChevronLeftIcon />
            </button>
            <h1 className="text-center text-xl font-medium leading-[22px] tracking-[-0.408px]">
              감정 리포트
            </h1>
          </div>

          <section className="mt-6">
            <h2 className="text-xl font-semibold leading-[22px] tracking-[-0.408px]">
              김마음 님
            </h2>
            <div className="mt-[9px] flex gap-[25px] text-lg leading-[22px] tracking-[-0.408px]">
              <ReportCount label="일기" value="4" />
              <ReportCount label="소각" value="2" />
            </div>
          </section>

          <div className="mt-[31px] flex items-center justify-center gap-[9px]">
            <button
              aria-label="이전 주"
              className="text-orange-500"
              type="button"
            >
              <SmallChevronLeftIcon />
            </button>
            <p className="text-xl font-semibold leading-[22px] tracking-[-0.408px] text-orange-500">
              6월 1주차
            </p>
            <button
              aria-label="다음 주"
              className="rotate-180 text-orange-500"
              type="button"
            >
              <SmallChevronLeftIcon />
            </button>
          </div>
        </header>

        <section className="relative mt-[27px] bg-orange-100 pb-[97px] pt-[18px]">
          <h2 className="text-center text-lg font-semibold leading-normal text-orange-400">
            리포트 요약
          </h2>
          <DonutChartSkeleton />
          <SummaryCard />
        </section>

        <section className="px-5 pt-[130px]">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-medium leading-[22px]">나의 부적</h2>
            <button
              className="h-[29px] rounded-full border border-gray-400 px-[13px] text-[13px] font-medium leading-normal text-gray-500"
              type="button"
            >
              더보기
            </button>
          </div>
          <div className="mt-[17px] grid grid-cols-3 gap-[9px]">
            <CharmCard label="기억포켓" />
            <CharmCard label="마음쑥쑥" />
            <CharmCard label="내맞아님" />
          </div>
        </section>

        <section className="px-5 pt-[31px]">
          <h2 className="text-xl font-medium leading-normal">다음주 흐름</h2>
          <div className="mt-3 rounded-lg border border-gray-200 bg-background px-[25px] py-[29px] shadow-[0_4px_20px_rgba(18,18,18,0.05)]">
            <h3 className="text-lg font-medium leading-[22px]">
              조급한 마음은 <span className="text-orange-500">금물!</span>{" "}
              에너지 아껴쓰기
            </h3>
            <p className="mt-[15px] whitespace-pre-line text-sm leading-[22px] text-gray-500">
              {
                "이번 주 좋은 흐름이 이어졌던 만큼, 다음 주는 이 에너지를 무리하게 쓰지 않는 게 포인트예요.\n\n木 기운이 활발한 시기엔 자꾸 더 하고 싶어지거든요. 다음 주는 새로 시작하기보다 이번 주 잘 된 것들을 천천히 다져가는 방향으로 가봐요!"
              }
            </p>
          </div>
        </section>

        <BottomNavigation activeValue="report" items={MAIN_NAVIGATION_ITEMS} />
      </div>
    </main>
  );
}

type ReportCountProps = {
  label: string;
  value: string;
};

function ReportCount({ label, value }: ReportCountProps) {
  return (
    <p className="flex gap-[9px]">
      <span className="font-medium text-gray-500">{label}</span>
      <span className="font-semibold text-orange-500">{value}</span>
    </p>
  );
}

function DonutChartSkeleton() {
  return (
    <div className="relative mx-auto mt-[18px] size-[139px] rounded-full bg-[conic-gradient(#ff9d58_0_72.8%,#fed7a5_72.8%_89.3%,#feecd2_89.3%_97.1%,#f3f3f3_97.1%_100%)]">
      <div className="absolute left-1/2 top-1/2 size-[42px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-100" />
      <p className="absolute left-[30px] top-[58px] text-xs font-medium leading-normal text-white">
        설렘
        <br />
        <span className="text-sm">72.8%</span>
      </p>
      <p className="absolute right-[18px] top-[58px] text-[7px] font-medium leading-normal text-foreground">
        뿌듯함
        <br />
        <span className="text-[9px]">16.5%</span>
      </p>
    </div>
  );
}

function SummaryCard() {
  return (
    <div className="absolute left-1/2 top-[183px] w-[345px] -translate-x-1/2 rounded-lg border border-gray-200 bg-background px-[26px] py-[26px] shadow-[0_4px_20px_rgba(18,18,18,0.05)]">
      <h2 className="text-base font-medium leading-6">
        이번 주는 마음님에게 꽤 괜찮은 한 주였어요!
      </h2>
      <p className="mt-[7px] text-sm leading-[18px] text-gray-500">
        이번 주 마음님의 기록에는{" "}
        <span className="text-orange-400">따뜻한 기운</span>이 가득했어요.
        <span className="text-orange-400"> 72.8%</span>가 긍정적인 감정으로
        채워진 한 주였네요. 작은 일상에서 기쁨을 발견하고, 스스로를 다독이는
        순간들이 많았던 것 같아요.
      </p>
    </div>
  );
}

type CharmCardProps = {
  label: string;
};

function CharmCard({ label }: CharmCardProps) {
  return (
    <div className="flex h-[150px] items-end justify-center rounded-[15px] border-2 border-orange-300 bg-orange-200 p-3 text-center text-sm font-semibold text-orange-500">
      {label}
    </div>
  );
}

function ChevronLeftIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-3" fill="none" viewBox="0 0 12 20">
      <path
        d="M10 2 2 10l8 8"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function SmallChevronLeftIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-3 w-1.5"
      fill="none"
      viewBox="0 0 6 12"
    >
      <path
        d="M5 1 1 6l4 5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}
