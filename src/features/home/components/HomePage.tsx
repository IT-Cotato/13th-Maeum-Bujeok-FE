import BottomNavigation from "@/components/layout/BottomNavigation";
import { MAIN_NAVIGATION_ITEMS } from "@/constants/navigation";
import DailyFortuneCard from "@/features/home/components/DailyFortuneCard";
import EmotionMascotSection from "@/features/home/components/EmotionMascotSection";
import HomeHeader from "@/features/home/components/HomeHeader";
import WriteDiaryButton from "@/features/home/components/WriteDiaryButton";

export default function HomePage() {
  return (
    <main className="min-h-dvh bg-gray-100 text-foreground">
      <div className="relative mx-auto flex min-h-dvh w-full max-w-[395px] flex-col overflow-hidden bg-background px-6 pb-[calc(126px+env(safe-area-inset-bottom))] pt-[28px]">
        <h1 className="text-center text-xl font-medium leading-[23px] text-foreground">
          홈
        </h1>
        <HomeHeader />
        <EmotionMascotSection />
        <DailyFortuneCard />
        <WriteDiaryButton />
        <BottomNavigation activeValue="home" items={MAIN_NAVIGATION_ITEMS} />
      </div>
    </main>
  );
}
