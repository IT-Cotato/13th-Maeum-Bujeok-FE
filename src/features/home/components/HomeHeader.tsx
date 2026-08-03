import { HOME_CONTENT } from "@/features/home/constants";

type HomeHeaderProps = {
  dateLabel: string;
};

export default function HomeHeader({ dateLabel }: HomeHeaderProps) {
  return (
    <header>
      <p className="text-xl font-medium leading-[27px] text-foreground">
        오늘 <strong className="font-bold">{HOME_CONTENT.userName}</strong>님은
        <br />
        어떤 기분을 느끼고 계신가요?
      </p>
      <p className="mt-[3px] text-[13px] leading-[25px] tracking-[0.02em] text-gray-500">
        {dateLabel}
      </p>
    </header>
  );
}
