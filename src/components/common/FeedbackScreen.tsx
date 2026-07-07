import type { ReactNode } from "react";

type FeedbackScreenProps = {
  action?: ReactNode;
  description: ReactNode;
  icon: ReactNode;
  topClassName: string;
  title: string;
};

export default function FeedbackScreen({
  action,
  description,
  icon,
  topClassName,
  title,
}: FeedbackScreenProps) {
  return (
    <main className="min-h-dvh bg-gray-100 text-foreground">
      <div className="relative mx-auto min-h-dvh w-full max-w-[395px] bg-background">
        <section
          className={`absolute left-1/2 flex w-[201px] -translate-x-1/2 flex-col items-center text-center ${topClassName}`}
        >
          {icon}
          <div className="mt-6 flex w-full flex-col items-center gap-[17px]">
            <h1 className="w-max text-[25px] font-semibold leading-normal text-black">
              {title}
            </h1>
            <p className="text-[15px] font-medium leading-5 text-gray-500">
              {description}
            </p>
          </div>
          {action ? <div className="mt-6">{action}</div> : null}
        </section>
      </div>
    </main>
  );
}

export function ErrorGhostIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-[89px] w-[89px]"
      fill="none"
      viewBox="0 0 89 89"
    >
      <path
        d="M.1 80.2C.9 31.7 17 0 44.4 0 72 0 88 31.7 88.6 80.4c.1 4.2-5.1 6-7.7 2.6l-4.2-5.6a4.6 4.6 0 0 0-7.3 0L65.3 83a4.6 4.6 0 0 1-7.3 0l-4.1-5.5a4.6 4.6 0 0 0-7.3 0L42.5 83a4.6 4.6 0 0 1-7.3 0l-4.1-5.5a4.6 4.6 0 0 0-7.3 0L19.7 83a4.6 4.6 0 0 1-7.3 0l-4.1-5.5C6.3 74.8 1.9 76.3.1 80.2Z"
        fill="#E0E0E0"
      />
      <rect
        fill="#8B8DA8"
        height="15.8"
        rx="3.7"
        transform="rotate(-8 25.8 28.8)"
        width="11.7"
        x="25.8"
        y="28.8"
      />
      <rect
        fill="#8B8DA8"
        height="15.8"
        rx="3.7"
        transform="rotate(8 52.2 28.8)"
        width="11.7"
        x="52.2"
        y="28.8"
      />
    </svg>
  );
}

export function LoadingFlameIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-[120px] w-[55px] overflow-visible"
      fill="none"
      viewBox="0 0 55 120"
    >
      <path
        className="origin-bottom animate-[pulse_1.5s_ease-in-out_infinite]"
        d="M25.4 113.2C10 104.2 2.4 92.7 2.4 78.8c0-9.5 5.2-15.3 10.5-20.6 6.5-6.5 13.2-12.9 13.2-26.8 0-9.3-3.2-16.2-6.8-22.3 15.3 8.1 26.2 21.5 26.2 36.4 0 7-3.2 13-6.6 18.9-4.1 7.2-8.5 14.9-5.2 25.1 1.9 5.6 5.5 8.4 10.1 8.7-3.7 9.1-9.8 14.1-18.4 15Z"
        fill="url(#loading-flame)"
      />
      <path
        d="M24.1 113.1c-12.4-3-20.6-10.6-22-23.5 5.6 6.4 11.1 8.6 16.4 6.6 4.7-1.8 7.1-6 7.1-12.5 8.2 8.2 10.5 21.5-1.5 29.4Z"
        fill="#FFC8A4"
      />
      <defs>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="loading-flame"
          x1="31"
          x2="31"
          y1="9"
          y2="113"
        >
          <stop stopColor="#FFD7BF" />
          <stop offset="1" stopColor="#FFB07A" />
        </linearGradient>
      </defs>
    </svg>
  );
}
