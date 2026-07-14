"use client";

import { useRouter } from "next/navigation";

export default function CreateTalismanButton() {
  const router = useRouter();

  const handleCreate = () => {
    // TODO: Replace this navigation with the generation API mutation.
    router.push("/burn/talisman");
  };

  return (
    <button
      className="flex h-[57px] items-center justify-center rounded-lg bg-orange-500 text-xl font-semibold leading-[23px] text-white active:opacity-90"
      onClick={handleCreate}
      type="button"
    >
      부적 생성하기
    </button>
  );
}
