"use client";

import { motion, useReducedMotion } from "motion/react";

const sparklePositions = [
  "left-[18px] top-[60px] size-6",
  "left-[60px] top-[45px] size-5",
  "right-[64px] top-[13px] size-7",
  "right-[21px] top-[104px] size-7",
  "left-[62px] bottom-[19px] size-6",
] as const;

export default function EmotionMascotSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      aria-label="오늘의 감정 캐릭터"
      className="relative mt-[30px] h-[211px]"
    >
      <motion.div
        aria-hidden="true"
        animate={shouldReduceMotion ? undefined : { opacity: 1, scale: 1 }}
        className="absolute left-1/2 top-[54px] size-[143px] -translate-x-1/2 rounded-full bg-orange-500/30 blur-[30px]"
        initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.92 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
      {sparklePositions.map((className, index) => (
        <motion.span
          aria-hidden="true"
          animate={shouldReduceMotion ? undefined : { opacity: 1, scale: 1 }}
          className={`absolute block text-orange-500 ${className}`}
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.8 }}
          key={className}
          transition={{ delay: 0.08 * index, duration: 0.35 }}
        >
          <SparkleIcon />
        </motion.span>
      ))}
      <motion.div
        animate={shouldReduceMotion ? undefined : { opacity: 1, y: [0, -5, 0] }}
        className="absolute left-1/2 top-3 z-10 h-[181px] w-[154px] -translate-x-1/2"
        initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
        transition={
          shouldReduceMotion
            ? undefined
            : {
                opacity: { duration: 0.35 },
                y: { duration: 3.2, repeat: Infinity, ease: "easeInOut" },
              }
        }
      >
        <FireMascot />
      </motion.div>
      <span
        aria-hidden="true"
        className="absolute bottom-[18px] right-[55px] size-3 rounded-full bg-orange-500/60"
      />
      <span
        aria-hidden="true"
        className="absolute left-[74px] top-[95px] size-[7px] rounded-full bg-orange-500/60"
      />
      <span
        aria-hidden="true"
        className="absolute left-[88px] top-[12px] size-[5px] rounded-full bg-orange-500/60"
      />
    </section>
  );
}

function SparkleIcon() {
  return (
    <svg className="size-full" fill="none" viewBox="0 0 24 24">
      <path
        d="M12 1.5c.65 6.1 2.4 8.05 8.5 8.7-6.1.65-7.85 2.6-8.5 8.7-.65-6.1-2.4-8.05-8.5-8.7 6.1-.65 7.85-2.6 8.5-8.7Z"
        fill="currentColor"
      />
    </svg>
  );
}

function FireMascot() {
  return (
    <svg
      aria-hidden="true"
      className="size-full overflow-visible drop-shadow-[0_12px_26px_rgba(254,112,35,0.22)]"
      fill="none"
      viewBox="0 0 154 181"
    >
      <path
        d="M52.4 177.2c-27.4-39.3-30-75.8-21-109.3C38.8 40.8 50.8 6.9 66.3 10.6c10.8 2.5 9.2 44 19.5 41.7 5.3-1.2 15-22.3 36.5-34 15.1-8.2 34.3-13.5 28.2 3.9-7.2 20.8-19.6 59.5-7.8 65.1 7.3 3.5 15.2-20.8 20-15.9 10.4 10.6 3.6 51.1-4.7 73.1-5 13.5-12.8 26.1-23.2 36.5-16.2-12.5-44.6-15.4-64.8-10.1-6.4 1.7-12.2 3.9-17.6 6.3Z"
        fill="url(#fire-gradient)"
      />
      <path
        d="M68.4 92.1c-1.5 10.9-8.2 19.1-15 18.2s-11.1-10.4-9.6-21.3c1.5-10.9 8.2-19.1 15-18.2s11.1 10.4 9.6 21.3Z"
        fill="url(#eye-gradient)"
        transform="rotate(-11 56.1 90.6)"
      />
      <path
        d="M110.6 91.9c1.2 10.9-3.3 20.3-10.1 21.1-6.8.7-13.3-7.5-14.5-18.4-1.2-10.9 3.3-20.3 10.1-21.1 6.8-.7 13.3 7.5 14.5 18.4Z"
        fill="url(#eye-gradient)"
        transform="rotate(10 98.2 93.3)"
      />
      <path
        d="M75 121.5c4.2 3.2 9.5 3.2 13.8 0"
        stroke="#111143"
        strokeLinecap="round"
        strokeWidth="5"
      />
      <path
        d="M131 55.5v13.2M141.4 60.5l-6 10.4M148.9 69.2l-10.1 5.5"
        stroke="#FE7023"
        strokeLinecap="round"
        strokeWidth="2.5"
      />
      <defs>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="fire-gradient"
          x1="43"
          x2="150"
          y1="38"
          y2="150"
        >
          <stop stopColor="#FF7A1A" />
          <stop offset="0.55" stopColor="#FE7023" />
          <stop offset="1" stopColor="#FF5A18" />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="eye-gradient"
          x1="48"
          x2="66"
          y1="73"
          y2="107"
        >
          <stop stopColor="#2B3192" />
          <stop offset="1" stopColor="#111143" />
        </linearGradient>
      </defs>
    </svg>
  );
}
