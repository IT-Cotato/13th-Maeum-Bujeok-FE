import type { GeneratedTalisman } from "@/features/burn/types";

// TODO: Remove this preview record when the talisman generation API is connected.
export const MOCK_TALISMAN: GeneratedTalisman = {
  generatedAt: "2026-07-14T13:00:00+09:00",
  id: "mock-talisman-preview",
  phrase: "분노조절",
  source: {
    occurredAt: "2026-06-28T02:03:00+09:00",
    referenceId: null,
    type: "diary",
  },
  templateKey: "talisman-10",
};
