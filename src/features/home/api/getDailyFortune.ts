import type { DailyFortune } from "@/features/home/types";

// TODO: Replace with the real daily-fortune endpoint once the backend team
// exposes it. The response should carry the user's saju-based lucky tip and
// today's dominant five-element (오행) energy.
export async function getDailyFortune(): Promise<DailyFortune> {
  return {
    energyElement: "fire",
    luckyMessage: "빨간색이 느낌이 좋네요!",
  };
}
