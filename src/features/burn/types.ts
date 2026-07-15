export const TALISMAN_TEMPLATE_KEYS = [
  "talisman-01",
  "talisman-02",
  "talisman-03",
  "talisman-04",
  "talisman-05",
  "talisman-06",
  "talisman-07",
  "talisman-08",
  "talisman-09",
] as const;

export type TalismanTemplateKey = (typeof TALISMAN_TEMPLATE_KEYS)[number];

export type TalismanSource = {
  occurredAt: string | null;
  referenceId: string | null;
  type: "diary" | "emotion";
};

export type GeneratedTalisman = {
  generatedAt: string;
  id: string;
  phrase: string;
  source: TalismanSource;
  templateKey: TalismanTemplateKey;
};

export type SavedTalisman = GeneratedTalisman & {
  savedAt: string;
};
