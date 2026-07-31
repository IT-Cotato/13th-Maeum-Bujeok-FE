"use client";

import Image from "next/image";

export type DiaryArchiveEntry = {
  content: string;
  createdAt: string;
  id: string;
  isBurned?: boolean;
};

type DiaryArchiveCardProps = {
  entries: DiaryArchiveEntry[];
  onViewDetail?: (id: string) => void;
};

export default function DiaryArchiveCard({
  entries,
  onViewDetail,
}: DiaryArchiveCardProps) {
  if (entries.length === 0) {
    return null;
  }

  const title = entries.every((entry) => entry.isBurned)
    ? "소각된 일기"
    : "보관일기";

  return (
    <section aria-label={title} className="mt-[18px]">
      <h2 className="text-xl font-medium leading-normal text-foreground">
        {title}
      </h2>
      <div className="mt-3 flex flex-col gap-3">
        {entries.map((entry) => (
          <article
            className="relative h-[140px] rounded-lg border border-gray-200 bg-background px-5 pt-[18px] shadow-[0_4px_20px_rgba(18,18,18,0.05)]"
            key={entry.id}
          >
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
              className="absolute inset-x-5 bottom-[9px] flex items-center justify-between text-[13px] leading-[22px] text-gray-400"
              onClick={() => onViewDetail?.(entry.id)}
              type="button"
            >
              <span>자세히 보기</span>
              <Image
                alt=""
                className="rotate-90"
                height={17}
                src="/figma/diary/diary-detail-arrow.svg"
                width={17}
              />
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
