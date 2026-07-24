import Image from "next/image";
import type { FormEvent } from "react";

import AuthPrimaryButton from "@/features/auth/components/AuthPrimaryButton";

export default function LoginScreen() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <section aria-labelledby="login-title" className="absolute inset-0">
      <div className="absolute left-1/2 top-[135px] flex w-[183px] -translate-x-1/2 flex-col items-center">
        <Image
          alt=""
          className="h-[142px] w-[162px] max-w-none"
          height={142}
          priority
          src="/figma/auth/login-character.svg"
          width={162}
        />
        <div className="mt-[41px] text-center">
          <h1
            className="h-8 font-logo text-[30px] font-extrabold leading-[35px] text-orange-400"
            id="login-title"
          >
            마음부적
          </h1>
          <p className="mt-2.5 w-[281px] text-base font-medium leading-[22px] text-orange-100">
            마음을 기록하고,
            <br />
            따뜻한 위로를 건네받는 공간
          </p>
        </div>
      </div>

      <form
        className="absolute left-1/2 top-[463px] w-[345px] -translate-x-1/2"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-3.5">
          <label className="sr-only" htmlFor="login-id">
            아이디
          </label>
          <input
            autoComplete="username"
            className="h-[57px] rounded-lg border border-[rgba(230,230,230,0.6)] bg-transparent px-[17px] text-lg leading-[23px] text-gray-100 outline-none placeholder:text-[rgba(230,230,230,0.6)]"
            id="login-id"
            name="loginId"
            placeholder="아이디 입력"
            type="text"
          />
          <label className="sr-only" htmlFor="login-password">
            비밀번호
          </label>
          <input
            autoComplete="current-password"
            className="h-[57px] rounded-lg border border-[rgba(230,230,230,0.6)] bg-transparent px-[17px] text-lg leading-[23px] text-gray-100 outline-none placeholder:text-[rgba(230,230,230,0.6)]"
            id="login-password"
            name="password"
            placeholder="비밀번호 입력"
            type="password"
          />
        </div>
        <AuthPrimaryButton className="mt-[25px]" type="submit">
          로그인
        </AuthPrimaryButton>
      </form>

      <nav
        aria-label="계정 찾기 및 가입"
        className="absolute left-1/2 top-[688px] flex -translate-x-1/2 items-center gap-[18px] whitespace-nowrap text-[13px] leading-[23px] text-[rgba(230,230,230,0.7)]"
      >
        <button type="button">아이디 찾기</button>
        <span
          aria-hidden="true"
          className="h-[19px] w-px bg-[rgba(230,230,230,0.7)]"
        />
        <button type="button">비밀번호 찾기</button>
        <span
          aria-hidden="true"
          className="h-[19px] w-px bg-[rgba(230,230,230,0.7)]"
        />
        <button type="button">회원가입</button>
      </nav>
    </section>
  );
}
