import Image from "next/image";
import type {
  GeneratedTalisman,
  TalismanTemplateKey,
} from "@/features/burn/types";
import { splitTalismanPhrase } from "@/features/burn/utils";

const TEMPLATE_ASSETS: Record<TalismanTemplateKey, string> = {
  "talisman-01": "/figma/talisman/templates/talisman-01.png",
  "talisman-02": "/figma/talisman/templates/talisman-02.png",
  "talisman-03": "/figma/talisman/templates/talisman-03.png",
  "talisman-04": "/figma/talisman/templates/talisman-04.png",
  "talisman-05": "/figma/talisman/templates/talisman-05.png",
  "talisman-06": "/figma/talisman/templates/talisman-06.png",
  "talisman-07": "/figma/talisman/templates/talisman-07.png",
  "talisman-08": "/figma/talisman/templates/talisman-08.png",
  "talisman-09": "/figma/talisman/templates/talisman-09.png",
  "talisman-10": "/figma/talisman/templates/talisman-10.png",
};

type TalismanCardProps = {
  talisman: GeneratedTalisman;
};

export default function TalismanCard({ talisman }: TalismanCardProps) {
  const characters = splitTalismanPhrase(talisman.phrase) ?? ["", "", "", ""];
  const isFirstTemplate = talisman.templateKey === "talisman-01";

  return (
    <article
      aria-label={`${talisman.phrase} 마음부적`}
      className="relative aspect-[345/476] w-full overflow-hidden rounded-[15px] bg-[#ffcd4a]"
    >
      {isFirstTemplate ? (
        <Image
          alt=""
          className="absolute left-[-20px] top-[-16px] h-[516px] w-[385px] max-w-none"
          height={516}
          priority
          src={TEMPLATE_ASSETS[talisman.templateKey]}
          unoptimized
          width={385}
        />
      ) : (
        <Image
          alt=""
          className="object-fill"
          fill
          priority
          src={TEMPLATE_ASSETS[talisman.templateKey]}
          unoptimized
        />
      )}

      <div className="absolute left-[46px] top-[63px] grid h-[68px] w-[253px] grid-cols-4">
        {characters.map((character, index) => (
          <span
            className="font-talisman flex items-center justify-center pt-1 text-[35px] leading-none text-[#ffcd4a]"
            key={`${character}-${index}`}
          >
            {character}
          </span>
        ))}
      </div>

      <time
        className="absolute left-1/2 top-[165px] -translate-x-1/2 text-[21px] font-semibold leading-normal text-[#ff6726]"
        dateTime={talisman.generatedAt}
      >
        {formatDate(talisman.generatedAt)}
      </time>
    </article>
  );
}

function formatDate(value: string): string {
  const date = new Date(value);
  const parts = new Intl.DateTimeFormat("ko-KR", {
    day: "2-digit",
    month: "2-digit",
    timeZone: "Asia/Seoul",
    year: "numeric",
  }).formatToParts(date);
  const year = getDatePart(parts, "year");
  const month = getDatePart(parts, "month");
  const day = getDatePart(parts, "day");

  return `${year}.${month}.${day}`;
}

function getDatePart(
  parts: Intl.DateTimeFormatPart[],
  type: Intl.DateTimeFormatPartTypes,
): string {
  return parts.find((part) => part.type === type)?.value ?? "";
}
