import Image from "next/image";

import type { MyMenuItem } from "@/features/user/constants";

type MyMenuSectionProps = {
  className?: string;
  items: MyMenuItem[];
  title: string;
};

export default function MyMenuSection({
  className = "",
  items,
  title,
}: MyMenuSectionProps) {
  const hasMultipleItems = items.length > 1;

  return (
    <section className={`mt-[23px] ${className}`}>
      <h2 className="text-lg font-medium leading-[27px]">{title}</h2>
      <div
        className={`mt-3 grid gap-x-4 gap-y-3 ${
          hasMultipleItems ? "grid-cols-2" : "grid-cols-1"
        }`}
      >
        {items.map((item) => (
          <button
            className="flex h-[60px] items-center gap-2.5 rounded-[8.673px] bg-white px-[19px] text-left shadow-[0_3.469px_17.347px_rgba(0,0,0,0.05)]"
            key={item.label}
            type="button"
          >
            {item.iconHasBackground ? (
              <span className="flex size-[31px] shrink-0 items-center justify-center rounded-full bg-orange-100">
                <Image
                  alt=""
                  height={item.iconSize}
                  src={item.iconSrc}
                  width={item.iconSize}
                />
              </span>
            ) : (
              <Image
                alt=""
                className="size-[31px] shrink-0"
                height={31}
                src={item.iconSrc}
                width={31}
              />
            )}
            <span className="w-[75px] whitespace-pre-line text-[13px] font-medium leading-normal">
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
