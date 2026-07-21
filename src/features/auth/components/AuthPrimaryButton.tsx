import type { ButtonHTMLAttributes } from "react";

type AuthPrimaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export default function AuthPrimaryButton({
  className = "",
  ...props
}: AuthPrimaryButtonProps) {
  return (
    <button
      className={`h-[57px] w-full rounded-lg bg-orange-400 text-lg font-semibold leading-[23px] text-navy-900 ${className}`}
      {...props}
    />
  );
}
