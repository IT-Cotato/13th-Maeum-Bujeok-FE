import type {
  FiveElement,
  FiveElementGaugeValue,
  NotificationDays,
  NotificationSettings,
} from "@/features/user/types";

type FiveElementMeta = {
  barClassName: string;
  label: string;
  textClassName: string;
};

export type MyMenuItem = {
  action?: "logout" | "withdraw";
  href?: string;
  iconHasBackground: boolean;
  iconSize: number;
  iconSrc: string;
  label: string;
};

export const FIVE_ELEMENT_META: Record<FiveElement, FiveElementMeta> = {
  wood: {
    label: "목",
    barClassName: "bg-[#3dc56f]",
    textClassName: "text-[#3dc56f]",
  },
  fire: {
    label: "화",
    barClassName: "bg-[#fe5623]",
    textClassName: "text-[#fe5623]",
  },
  earth: {
    label: "토",
    barClassName: "bg-[#dd8b4e]",
    textClassName: "text-[#dd8b4e]",
  },
  metal: {
    label: "금",
    barClassName: "bg-[#f7d200]",
    textClassName: "text-[#f7d200]",
  },
  water: {
    label: "수",
    barClassName: "bg-[#60d5ff]",
    textClassName: "text-[#60d5ff]",
  },
};

export const EMPTY_FIVE_ELEMENT_GAUGES: FiveElementGaugeValue[] = [
  { element: "wood", percentage: 0 },
  { element: "fire", percentage: 0 },
  { element: "earth", percentage: 0 },
  { element: "metal", percentage: 0 },
  { element: "water", percentage: 0 },
];

export const CONVENIENCE_MENU_ITEMS: MyMenuItem[] = [
  {
    href: "/my/notifications",
    iconHasBackground: true,
    iconSize: 18,
    iconSrc: "/figma/my/menu/alarm.svg",
    label: "알림 설정",
  },
];

export const DEFAULT_NOTIFICATION_SETTINGS: NotificationSettings = {
  diaryReminderEnabled: true,
  fortuneActionEnabled: true,
};

export const DEFAULT_NOTIFICATION_DAYS: NotificationDays = {
  fridayEnabled: true,
  mondayEnabled: true,
  saturdayEnabled: true,
  sundayEnabled: true,
  thursdayEnabled: true,
  tuesdayEnabled: true,
  wednesdayEnabled: true,
};

export const SUPPORT_MENU_ITEMS: MyMenuItem[] = [
  {
    iconHasBackground: true,
    iconSize: 19,
    iconSrc: "/figma/my/menu/customer-center.svg",
    label: "고객센터",
  },
  {
    href: "/my/terms",
    iconHasBackground: false,
    iconSize: 31,
    iconSrc: "/figma/my/menu/terms.svg",
    label: "서비스 \n이용 약관",
  },
  {
    iconHasBackground: true,
    iconSize: 17,
    iconSrc: "/figma/my/menu/privacy.svg",
    label: "개인정보 \n처리 방침",
  },
];

export const ACCOUNT_MENU_ITEMS: MyMenuItem[] = [
  {
    action: "logout",
    iconHasBackground: true,
    iconSize: 17,
    iconSrc: "/figma/my/menu/logout.svg",
    label: "로그아웃",
  },
  {
    action: "withdraw",
    iconHasBackground: true,
    iconSize: 17,
    iconSrc: "/figma/my/menu/delete-account.svg",
    label: "회원탈퇴",
  },
];
