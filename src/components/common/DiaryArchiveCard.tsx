"use client";

import Image from "next/image";
import type { DiaryCalendarEntry } from "@/components/common/DiaryCalendar";

type DiaryArchiveCardProps = {
  entry: DiaryCalendarEntry;
  onViewDetail?: () => void;
  onWriteClick?: () => void;
};

export default function DiaryArchiveCard({
  entry,
  onViewDetail,
  onWriteClick,
}: DiaryArchiveCardProps) {
  const title = entry.isBurned ? "소각된 일기" : "보관일기";

  return (
    <section aria-label={title} className="mt-[18px]">
      <h2 className="text-xl font-medium leading-normal text-foreground">
        {title}
      </h2>
      <article className="mt-3 h-[140px] rounded-lg border border-gray-200 bg-background px-5 py-[18px] shadow-[0_4px_20px_rgba(18,18,18,0.05)]">
        <p className="text-sm leading-normal text-foreground">
          {entry.createdAt}
        </p>
        {entry.isBurned ? (
          <div className="mt-3 flex h-12 items-center justify-center">
            <Image
              alt=""
              height={34}
              src="/figma/diary/diary-burned-lock.svg"
              width={28}
            />
          </div>
        ) : (
          <p className="mt-3 line-clamp-2 text-sm leading-[19px] text-foreground">
            {entry.content}
          </p>
        )}
        <button
          className="mt-1 text-[13px] leading-[22px] text-gray-400"
          onClick={onViewDetail}
          type="button"
        >
          자세히 보기
        </button>
        <button
          aria-label="일기 작성하기"
          className="float-right -m-1 p-1"
          onClick={onWriteClick}
          type="button"
        >
          <Image
            alt=""
            className="mt-[3px] rotate-90"
            height={17}
            src="/figma/diary/diary-detail-arrow.svg"
            width={17}
          />
        </button>
      </article>
    </section>
  );
}
