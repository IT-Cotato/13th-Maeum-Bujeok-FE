import type { TalismanItem } from "@/features/report/types";

type ServerTalismanCardProps = {
  talisman: TalismanItem;
  variant?: "full" | "list" | "report";
};

export default function ServerTalismanCard({
  talisman,
  variant = "full",
}: ServerTalismanCardProps) {
  const radiusClass = {
    full: "rounded-[15px]",
    list: "rounded-[4.331px]",
    report: "rounded-[4.297px]",
  }[variant];

  return (
    <article
      aria-label={talisman.title ?? "마음부적"}
      className={`relative aspect-[345/476] w-full overflow-hidden bg-[#ffcd4a] ${radiusClass}`}
    >
      {talisman.imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element -- API returns the completed talisman image URL.
        <img
          alt={talisman.title ?? "생성된 마음부적"}
          className="size-full object-fill"
          src={talisman.imageUrl}
        />
      ) : (
        <div className="flex size-full items-center justify-center px-3 text-center text-xs text-orange-500">
          부적 이미지를 준비하고 있어요.
        </div>
      )}
    </article>
  );
}
