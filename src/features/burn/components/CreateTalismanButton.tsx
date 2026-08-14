"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  BurningApiError,
  createTalisman,
  getBurningDetail,
} from "@/features/burn/api/burnings";
import {
  GENERATED_TALISMAN_STORAGE_KEY,
  getPendingBurningId,
  toGeneratedTalisman,
} from "@/features/burn/utils";

export default function CreateTalismanButton() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const handleCreate = async () => {
    const burningId = getPendingBurningId();

    if (!burningId) {
      setError("소각 정보를 찾지 못했어요. 다시 소각해 주세요.");
      return;
    }

    setIsCreating(true);
    setError(null);

    try {
      let talismanId: number | undefined;

      try {
        const result = await createTalisman(burningId);
        talismanId = result.talisman?.talismanId;
      } catch (createError) {
        if (
          !(createError instanceof BurningApiError) ||
          createError.code !== "TALISMAN_409"
        ) {
          throw createError;
        }
      }

      const detail = await getBurningDetail(burningId);
      const talisman = toGeneratedTalisman(detail, talismanId);

      if (!talisman) {
        throw new BurningApiError("완성된 부적 정보를 확인하지 못했어요.");
      }

      sessionStorage.setItem(
        GENERATED_TALISMAN_STORAGE_KEY,
        JSON.stringify(talisman),
      );
      router.push("/burn/talisman");
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "부적을 생성하지 못했어요.",
      );
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div>
      <button
        className="flex h-[57px] w-full items-center justify-center rounded-lg bg-orange-500 text-xl font-semibold leading-[23px] text-white active:opacity-90 disabled:opacity-60"
        disabled={isCreating}
        onClick={handleCreate}
        type="button"
      >
        {isCreating ? "부적 생성 중" : "부적 생성하기"}
      </button>
      {error ? (
        <p className="mt-2 text-center text-[13px] text-red-500" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
