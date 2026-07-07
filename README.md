🧿 마음부적 (MaeumBuduk)

AI 기반 감정 케어 서비스

사용자가 자신의 감정을 기록하고 AI와 마음을 돌볼 수 있는 모바일 중심 웹 애플리케이션

⸻

📌 프로젝트 정보

Frontend

* Next.js 16 (App Router)
* React 19
* TypeScript
* Tailwind CSS
* Motion
* Zustand

Backend

* Spring Boot (별도 팀 개발)
* REST API 기반 연동 예정

⸻

📁 프로젝트 구조

src/
│
├── app/
├── components/
│   ├── common/
│   ├── layout/
│   └── ui/
│
├── features/
├── hooks/
├── lib/
├── services/
├── store/
├── types/
├── utils/
└── constants/
public/

⸻

✅ 현재 진행 사항

프로젝트 초기 세팅

* Next.js 16 프로젝트 생성
* TypeScript 적용
* Tailwind CSS 적용
* App Router 적용
* React Compiler 활성화

⸻

프로젝트 컨벤션

* AGENTS.md 작성
* 프로젝트 구조 정의
* 폴더 구조 정의
* 컴포넌트 분리 규칙 정의
* Zustand 사용 기준 정의
* 코드 스타일 정의
* TypeScript 규칙 정의
* Motion 사용 규칙 정의
* API 연동 규칙 정의
* AI 개발 가이드 작성

⸻

PWA

현재 준비 단계

예정 작업

* Manifest 구성
* Service Worker 등록
* Push Notification
* 홈 화면 설치(PWA)

※ next-pwa 미사용

Next.js 공식 방식으로 구현 예정

⸻

🏗️ 개발 규칙

App Router

* App Router 사용
* Pages Router 미사용

⸻

컴포넌트

* page.tsx에는 페이지 조립만 담당
* UI와 비즈니스 로직 분리
* 공통 컴포넌트 우선 작성
* 기능별 컴포넌트는 features 내부에서 관리

⸻

상태 관리

useState

컴포넌트 내부 상태 관리

예시

* input
* dropdown
* checkbox

Zustand

여러 컴포넌트에서 공유되는 상태 관리

예시

* 선택한 감정
* 현재 탭
* 모달
* 알림 허용 여부
* 테마

⸻

스타일

* Tailwind CSS 사용
* CSS Modules 미사용 (필요 시 예외)

⸻

애니메이션

* Motion 사용
* 과도한 애니메이션 지양
* 자연스럽고 부드러운 인터랙션 지향

⸻

Import

절대 경로 사용

import Button from "@/components/ui/Button";

⸻

📌 협업 규칙

* 프로젝트 규칙은 AGENTS.md를 기준으로 함
* 새로운 기능 구현 전 기존 컴포넌트 확인
* 기존 구현을 우선 재사용
* 동일한 기능을 중복 구현하지 않기
* page.tsx에 UI와 비즈니스 로직을 몰아넣지 않기
* 기능별 구조(features) 유지
* 공통 컴포넌트는 components에서 관리
* Zustand는 여러 컴포넌트에서 공유되는 상태에만 사용
* 로컬 상태는 useState 사용
* API 로직과 UI 로직 분리
* 절대 경로(@/) 사용

⸻

🚀 실행

npm install
npm run dev

브라우저

http://localhost:3000
