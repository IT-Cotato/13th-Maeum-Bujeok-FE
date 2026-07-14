import type { ReactNode } from "react";

export default function EmotionSummarySection() {
  return (
    <section className="relative mt-[20px] h-[271px] bg-orange-100 pt-[18px]">
      <h2 className="text-center text-lg font-semibold leading-normal text-orange-400">
        리포트 요약
      </h2>
      <EmotionDonutChart />
      <SummaryCard />
    </section>
  );
}

function EmotionDonutChart() {
  return (
    <div className="relative mx-auto mt-[18px] size-[139px] rounded-full bg-[conic-gradient(#f3f3f3_0_2.9%,#feecd2_2.9%_10.7%,#fed7a5_10.7%_27.2%,#ff9d58_27.2%_100%)]">
      <div className="absolute left-1/2 top-1/2 size-[42px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-100" />
      <EmotionLabel
        className="left-[20px] top-[63px] text-white"
        label="설렘"
        value="72.8%"
      />
      <EmotionLabel
        className="right-[9px] top-[51px] text-[7px] text-foreground"
        label="뿌듯함"
        value="16.5%"
        valueClassName="text-[9px]"
      />
      <EmotionLabel
        className="right-[42px] top-[17px] text-[5px] text-gray-500"
        label="평온"
        value="7.8%"
        valueClassName="text-[6px]"
      />
      <EmotionLabel
        className="left-[61px] top-[-9px] text-[4px] text-gray-500"
        label="피로"
        value="2.9%"
        valueClassName="text-[5px]"
      />
    </div>
  );
}

type EmotionLabelProps = {
  className: string;
  label: string;
  value: string;
  valueClassName?: string;
};

function EmotionLabel({
  className,
  label,
  value,
  valueClassName = "text-sm",
}: EmotionLabelProps) {
  return (
    <p
      className={`absolute text-center font-medium leading-normal ${className}`}
    >
      {label}
      <br />
      <span className={valueClassName}>{value}</span>
    </p>
  );
}

function SummaryCard() {
  return (
    <article className="absolute left-6 right-6 top-[224px] h-[185px] rounded-lg border border-gray-200 bg-background px-[26px] py-[26px] shadow-[0_4px_20px_rgba(18,18,18,0.05)]">
      <h3 className="text-base font-medium leading-6">
        이번 주는 마음님에게 꽤 괜찮은 한 주였어요!
      </h3>
      <p className="mt-[7px] text-sm leading-[18px] text-gray-500">
        이번 주 마음님의 기록에는 <Highlight>따뜻한 기운</Highlight>이
        가득했어요.
        <Highlight> 72.8%</Highlight>가 긍정적인 감정으로 채워진 한 주였네요.
        작은 일상에서 기쁨을 발견하고, 스스로를 다독이는 순간들이 많았던 것
        같아요. 木의 기운이 활발한 시기답게, 새로운 것을 시도하거나 성장하는
        느낌을 자주 받으셨을 것 같아요. 이 흐름을 잘 이어가 보세요.
      </p>
    </article>
  );
}

type HighlightProps = {
  children: ReactNode;
};

function Highlight({ children }: HighlightProps) {
  return <span className="text-orange-400">{children}</span>;
}
