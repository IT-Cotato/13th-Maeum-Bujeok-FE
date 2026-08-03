import type { FiveElement } from "@/features/user/types";

export const HOME_CONTENT = {
  userName: "마음",
} as const;

export const FIVE_ELEMENT_HANJA_LABEL: Record<FiveElement, string> = {
  earth: "土",
  fire: "火",
  metal: "金",
  water: "水",
  wood: "木",
};
