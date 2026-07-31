import type { DiaryArchiveEntry } from "@/components/common/DiaryArchiveCard";
import type { DiaryCalendarEntry } from "@/components/common/DiaryCalendar";
import type { DiaryEntryRecord } from "@/store/useDiaryEntriesStore";

const dateLabelFormatter = new Intl.DateTimeFormat("ko-KR", {
  day: "numeric",
  month: "long",
  weekday: "long",
  year: "numeric",
});

export function getTodayDateString(date: Date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function getMonthFromDate(dateString: string): string {
  return dateString.slice(0, 7);
}

export function getDiaryDateLabel(dateString: string): string {
  const [year, month, day] = dateString.split("-").map(Number);

  return dateLabelFormatter.format(new Date(year, month - 1, day));
}

// "2026년 6월 24일" 형태. 소각 관련 다이얼로그들이 공통으로 쓴다.
export function formatShortKoreanDate(dateString: string): string {
  const [year, month, day] = dateString.split("-").map(Number);

  return `${year}년 ${month}월 ${day}일`;
}

export function createMonthOptions(startMonth: string, count: number): string[] {
  const [startYear, startMonthNumber] = startMonth.split("-").map(Number);

  return Array.from({ length: count }, (_, index) => {
    const date = new Date(startYear, startMonthNumber - 1 + index, 1);

    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
  });
}

const shortWeekdayFormatter = new Intl.DateTimeFormat("ko-KR", { weekday: "long" });

export type DiaryShortDateParts = {
  datePart: string;
  weekdayPart: string;
};

export function getDiaryShortDateParts(dateString: string): DiaryShortDateParts {
  const [year, month, day] = dateString.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  return {
    datePart: `${year}.${String(month).padStart(2, "0")}.${String(day).padStart(2, "0")}`,
    weekdayPart: shortWeekdayFormatter.format(date),
  };
}

export function getCurrentTimeLabel(date: Date = new Date()): string {
  const hours24 = date.getHours();
  const period = hours24 < 12 ? "AM" : "PM";
  const hours12 = hours24 % 12 === 0 ? 12 : hours24 % 12;
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${period} ${hours12}:${minutes}`;
}

export function formatDiaryEntryTimestamp(date: string, savedAt: string): string {
  const { datePart, weekdayPart } = getDiaryShortDateParts(date);

  return `${datePart} ${weekdayPart} ${getCurrentTimeLabel(new Date(savedAt))}`;
}

// 최신 작성순(내림차순)으로 정렬한다. 화면 6-1의 보관일기 목록에서 쓴다.
export function sortEntriesByNewest<T extends { savedAt: string }>(
  entries: T[],
): T[] {
  return [...entries].sort(
    (a, b) => new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime(),
  );
}

// 소각 탭과 일기 탭이 동일한 실제 저장소(useDiaryEntriesStore)를 캘린더용 형태로 변환할 때 공통으로 쓴다.
// 하루에 여러 편이 있을 수 있으므로, 날짜 한 칸의 아이콘 상태는 그날 전체를 요약해서 판단한다:
// 하나라도 소각 안 된 게 있으면 작성됨(마스코트), 전부 소각됐으면 소각 완료(자물쇠).
export function toDiaryCalendarEntries(
  entries: Record<string, DiaryEntryRecord[]>,
): DiaryCalendarEntry[] {
  return Object.entries(entries)
    .filter(([, dayEntries]) => dayEntries.length > 0)
    .map(([date, dayEntries]) => {
      const newest = sortEntriesByNewest(dayEntries)[0];

      return {
        content: newest.content,
        createdAt: formatDiaryEntryTimestamp(date, newest.savedAt),
        date,
        isBurned: dayEntries.every((entry) => entry.isBurned),
      };
    });
}

// 선택된 날짜의 일기들을 보관일기 카드 목록에 넣을 형태로 변환한다(최신 작성순).
export function toDiaryArchiveEntries(
  date: string,
  dayEntries: DiaryEntryRecord[],
): DiaryArchiveEntry[] {
  return sortEntriesByNewest(dayEntries).map((entry) => ({
    content: entry.content,
    createdAt: formatDiaryEntryTimestamp(date, entry.savedAt),
    id: entry.id,
    isBurned: entry.isBurned,
  }));
}

// 시드(예: 일기 날짜) 기반으로 목록에서 하나를 고른다. 서버/클라이언트가 항상 같은
// 값을 골라야 하는 상황(예: 초기 렌더 placeholder)에서 Math.random() 대신 사용한다.
export function pickBySeed<T>(items: readonly T[], seed: string): T {
  let hash = 0;

  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash * 31 + seed.charCodeAt(i)) % items.length;
  }

  return items[Math.abs(hash) % items.length];
}
