export type FiveElement = "earth" | "fire" | "metal" | "water" | "wood";

export type FiveElementGaugeValue = {
  element: FiveElement;
  percentage: number;
  fillPercentage?: number;
};
