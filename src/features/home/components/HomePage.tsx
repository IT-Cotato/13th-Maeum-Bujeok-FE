import BottomNavigation from "@/components/layout/BottomNavigation";
import { MAIN_NAVIGATION_ITEMS } from "@/constants/navigation";
import { getDailyFortune } from "@/features/home/api/getDailyFortune";
import DailyFortuneCard from "@/features/home/components/DailyFortuneCard";
import EmotionMascotSection from "@/features/home/components/EmotionMascotSection";
import HomeHeader from "@/features/home/components/HomeHeader";
import WriteDiaryButton from "@/features/home/components/WriteDiaryButton";
import { getEnergyMessage, getTodayDateLabel } from "@/features/home/utils";

export default async function HomePage() {
  const fortune = await getDailyFortune();

  return (
    <main className="min-h-dvh bg-gray-100 text-foreground">
      <div className="relative mx-auto flex min-h-dvh w-full max-w-[395px] flex-col overflow-hidden bg-background px-6 pb-[calc(126px+env(safe-area-inset-bottom))] pt-[28px]">
        <h1 className="text-center text-xl font-medium leading-[23px] text-foreground">
          홈
        </h1>
        <HomeHeader dateLabel={getTodayDateLabel()} />
        <EmotionMascotSection />
        <DailyFortuneCard
          energyMessage={getEnergyMessage(fortune.energyElement)}
          luckyMessage={fortune.luckyMessage}
        />
        <WriteDiaryButton />
        <BottomNavigation activeValue="home" items={MAIN_NAVIGATION_ITEMS} />
      </div>
    </main>
  );
}
