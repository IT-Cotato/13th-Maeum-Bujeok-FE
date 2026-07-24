import { FIVE_ELEMENT_META } from "@/features/user/constants";
import type { FiveElementGaugeValue } from "@/features/user/types";

type FiveElementGaugeSectionProps = {
  values: FiveElementGaugeValue[];
};

export default function FiveElementGaugeSection({
  values,
}: FiveElementGaugeSectionProps) {
  return (
    <section className="mt-[23px]" aria-labelledby="five-element-title">
      <h2
        className="text-lg font-medium leading-[27px]"
        id="five-element-title"
      >
        오행 (五行)
      </h2>

      <div className="mt-3 h-[250px] rounded-lg bg-white px-[22px] pt-6 shadow-[0_4px_20px_rgba(18,18,18,0.05)]">
        <div className="flex flex-col gap-2">
          {values.map((value) => {
            const meta = FIVE_ELEMENT_META[value.element];
            const fillPercentage = value.fillPercentage ?? value.percentage;

            return (
              <div className="h-[33px]" key={value.element}>
                <div className="flex h-[22px] items-center justify-between font-semibold">
                  <span
                    className={`text-xs leading-[22px] ${meta.textClassName}`}
                  >
                    {meta.label}
                  </span>
                  <span className="text-[10px] leading-[22px] text-gray-400">
                    {value.percentage}%
                  </span>
                </div>
                <div className="relative mt-0.5 h-[9px] w-full overflow-hidden rounded-lg bg-[#e9e9e9]">
                  <div
                    aria-hidden="true"
                    className={`h-full rounded-lg ${meta.barClassName}`}
                    style={{ width: `${fillPercentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
