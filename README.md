# CERTICOS BOOKS

CDRI 과제전형 · 제출자: 최철웅



---

## 프로젝트 개요

| 항목       | 내용                                                                                 |
| ---------- | ------------------------------------------------------------------------------------ |
| 프로젝트명 | CERTICOS BOOKS                                                                       |
| 목적       | 카카오 도서 검색 API를 연동한 도서 검색·찜 서비스 구현                               |
| 기술 스택  | React 19, TypeScript, Vite 8, Tailwind CSS 4                                         |
| 외부 API   | [카카오 도서 검색 API](https://developers.kakao.com/docs/latest/ko/daum-search/book) |
| 주요 화면  | 도서 검색(`/search`), 내가 찜한 책(`/wish`)                                          |

---

## 실행 방법 및 환경 설정

## Scripts

```bash
# 의존성 설치
$ npm i

# 개발 서버 실행
$ npm run dev

# 프로덕션 빌드 및 실행
$ npm run build
$ npm run preview

```

## Environment

```
* Node 22.22.3
```


---

## 폴더 구조 및 주요 코드 설명

```
.
├── src/
│   ├── apis/                    # API 
│   │   ├── axios.ts             # Axios 인스턴스 (카카오 API 인증 헤더 설정)
│   │   └── book/
│   │       ├── book.ts          # 도서 검색 API 호출
│   │       └── book.types.ts    # API 요청/응답 타입
│   │
│   ├── assets/images/           # 아이콘 이미지
│   │
│   ├── components/              # Atomic Design 컴포넌트
│   │   ├── atom/                # Button 등의 가장 작은 컴포넌트
│   │   ├── molecule/            # Dropdown 등의 합성 컴포넌트
│   │   ├── organism/            # BookList 등의 복합 컴포넌트
│   │   └── template/            # Layout 등의 템플릿 컴포넌트
│   │
│   ├── constants/               # 상수
│   │
│   ├── helpers/                 # 헬퍼 Hooks
│   │
│   ├── pages/
│   │   ├── SearchPage/          # 도서 검색 페이지
│   │   │   └── hooks/
│   │   │       ├── useBookSearch.ts         # 데이터 펫칭, 무한 스크롤
│   │   │       ├── useBookDetaildSearch.ts  # 상세 검색 핸들링
│   │   │       └── useSearchHistory.ts      # 검색 기록 핸들링
│   │   ├── WishListPage/        # 찜 목록 페이지
│   │   │   └── useWishList.ts   # 로컬 데이터 페이지네이션
│   │   └── ErrorPage/           # ErrorBoundary 폴백 UI
│   │
│   ├── routes/                  # 라우트 정의
│   ├── store/                   # Zustand 전역 상태
│   │   ├── useWishStore.ts      # 찜 목록 스토어
│   │   └── useHistoryStore.ts   # 검색 기록 스토어
│   │
│   ├── types/                   # 공통 DTO 타입
│   └── utils/                   # 유틸 함수
│
├── index.html
└── vite.config.ts               # Vite 설정
```

### 주요 코드

#### 도서 검색 (`useBookSearch`)

`@tanstack/react-query`의 `useInfiniteQuery`로 카카오 도서 검색 API 호출

#### 상세 검색 (`useBookDetaildSearch`)

상세 검색 팝업 핸들링

#### 검색 기록 (`useSearchHistory`)

검색 기록 핸들링

#### 찜한 도서 (`useWishList`)

찜한 도서 데이터 핸들링

#### 검색 기록 전역상태 (`useHistoryStore`)

localStorage에 검색 기록을 저장

#### 찜하기 전역상태 (`useWishStore`)

localStorage에 찜한 도서 데이터을 저장

---

## 라이브러리 선택 이유

### Dependencies

| 라이브러리       | 버전      | 선택 이유                                                                    |
| ---------------- | --------- | ---------------------------------------------------------------------------- |
| **Vite**         | `^8.1.0`  | 빠른 빌드, 가벼움                                                            |
| **Zustand**      | `^5.0.14` | 가벼운 클라이언트 상태 관리, `persist`로 검색 기록·찜 목록 localStorage 연동 |
| **Tailwind CSS** | `^4.3.1`  | 유틸리티 기반 빠른 UI 구현                                                   |

### DevDependencies

| 라이브러리                      | 선택 이유                 |
| ------------------------------- | ------------------------- |
| **prettier-plugin-tailwindcss** | Tailwind 클래스 자동 정렬 |

---

## 강조하고 싶은 기능

### 검색 기록 최적화

- 사용자가 책 검색 시, 이전에 검색한 적이 있는 keyword 라면 날짜 값을 업데이트하여 검색기록 상단으로 이동합니다.

---
