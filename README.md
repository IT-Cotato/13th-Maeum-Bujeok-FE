🧿 마음부적 (MaeumBuduk)

AI 기반 감정 케어 서비스입니다.

사용자가 자신의 감정을 기록하고 AI와 스스로를 돌아볼 수 있도록 돕는 모바일 중심 웹 애플리케이션입니다.

⸻

📌 프로젝트 정보

Frontend Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Motion
- Zustand

Backend

- Spring Boot (별도 팀 개발)
- REST API 기반 연동 예정

⸻

📁 프로젝트 구조

src/
│
├── app/
│
├── components/
│ ├── common/
│ ├── layout/
│ └── ui/
│
├── features/
│
├── hooks/
│
├── lib/
│
├── services/
│
├── store/
│
├── types/
│
├── utils/
│
└── constants/
public/

⸻

📋 현재 진행 사항

✅ 프로젝트 생성

- Next.js 16
- App Router
- TypeScript
- Tailwind CSS
- React Compiler 활성화

⸻

✅ 프로젝트 컨벤션 구성

프로젝트 루트에 AGENTS.md를 추가했습니다.

포함 내용

- 프로젝트 구조
- 폴더 구조
- 컴포넌트 분리 규칙
- Zustand 사용 기준
- 코드 스타일
- TypeScript 규칙
- Motion 사용 규칙
- API 연동 규칙
- AI 개발 가이드

AI(Codex, Cursor, Claude Code 등)가 프로젝트 규칙을 참고하여 일관된 코드를 생성할 수 있도록 설정했습니다.

⸻

✅ PWA 준비

현재 PWA 적용을 위한 구조를 준비 중입니다.

예정 작업

- manifest 설정
- Service Worker 등록
- Push Notification
- 홈 화면 설치(PWA)

※ next-pwa는 사용하지 않습니다.

Next.js 공식 방식으로 구현할 예정입니다.

⸻

🏗️ 개발 컨벤션

App Router 사용

Pages Router는 사용하지 않습니다.

app/

기반으로 개발합니다.

⸻

컴포넌트 분리

page.tsx에는 페이지를 조립하는 코드만 작성합니다.

복잡한 UI나 로직은 반드시 분리합니다.

예시

page.tsx
↓
features/diary/components
↓
DiaryEditor.tsx
EmotionSelector.tsx

⸻

상태 관리

useState

컴포넌트 내부에서만 사용하는 상태

예시

- input
- dropdown
- checkbox

Zustand

여러 컴포넌트에서 공유하는 상태

예시

- 선택한 감정
- 현재 탭
- 모달 상태
- 알림 허용 여부
- 테마

⸻

스타일

- Tailwind CSS 사용
- CSS Modules 사용하지 않음 (필요 시 제외)

⸻

애니메이션

Motion 사용

과도한 애니메이션보다 자연스럽고 부드러운 인터랙션을 지향합니다.

⸻

Import

절대 경로 사용

import Button from "@/components/ui/Button";

⸻

🚀 실행 방법

npm install
npm run dev

브라우저

http://localhost:3000

⸻

🤝 협업 규칙

- 새로운 기능 구현 전 기존 컴포넌트를 먼저 확인합니다.
- 동일한 기능을 중복 구현하지 않습니다.
- page.tsx에 UI와 비즈니스 로직을 몰아넣지 않습니다.
- 기능별로 features 구조를 유지합니다.
- 공통 컴포넌트는 components에서 관리합니다.
- 프로젝트 규칙은 AGENTS.md를 기준으로 합니다.
