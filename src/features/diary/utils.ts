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

// 시드(예: 일기 날짜) 기반으로 목록에서 하나를 고른다. 서버/클라이언트가 항상 같은
// 값을 골라야 하는 상황(예: 초기 렌더 placeholder)에서 Math.random() 대신 사용한다.
export function pickBySeed<T>(items: readonly T[], seed: string): T {
  let hash = 0;

  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash * 31 + seed.charCodeAt(i)) % items.length;
  }

  return items[Math.abs(hash) % items.length];
}
