"use client";

import { useRef, useState } from "react";

type BooleanSettings = Record<string, boolean>;
type SettingsUpdater<T extends BooleanSettings> = (
  request: Partial<T>,
) => Promise<void>;

export function useNotificationToggles<T extends BooleanSettings>(
  initialValues: T,
  updateSettings: SettingsUpdater<T>,
) {
  const [values, setValues] = useState<T>(initialValues);
  const [pendingKeys, setPendingKeys] = useState<Set<keyof T>>(new Set());
  const pendingKeysRef = useRef<Set<keyof T>>(new Set());

  const toggle = async (key: keyof T): Promise<void> => {
    if (pendingKeysRef.current.has(key)) {
      return;
    }

    const previousValue = values[key];
    const nextValue = !previousValue;

    pendingKeysRef.current.add(key);
    setPendingKeys(new Set(pendingKeysRef.current));
    setValues((currentValues) => ({
      ...currentValues,
      [key]: nextValue,
    }));

    try {
      await updateSettings({ [key]: nextValue } as Partial<T>);
    } catch (error) {
      setValues((currentValues) => ({
        ...currentValues,
        [key]: previousValue,
      }));
      window.alert(
        error instanceof Error
          ? error.message
          : "알림 설정을 변경하지 못했어요.",
      );
    } finally {
      pendingKeysRef.current.delete(key);
      setPendingKeys(new Set(pendingKeysRef.current));
    }
  };

  return {
    isPending: (key: keyof T) => pendingKeys.has(key),
    toggle,
    values,
  };
}
