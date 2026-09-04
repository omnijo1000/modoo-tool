# 전수 자동 점검 결과 (2026-09-04)

스크립트: `audit/full_scan.py` → `audit/full_scan.csv` (정적)
+ 브라우저 검증 15페이지 계층 표본 (`audit/sample.txt` 중).

## 대상 규모

| 유형 | 수 | 비고 |
|---|---|---|
| tool | 216 | 루트 도구 |
| tool-calc | 104 | 계산기 |
| guide | 255 | 가이드(ko) |
| guide-en | 176 | 가이드(en) |
| category | 11 | 카테고리 허브 |
| info | 5 | about/contact/privacy/terms/404 |
| index | 1 | |
| stub | 69 | 리디렉션 스텁 |
| **합계** | **837** | sitemap URL 766 |

## 결과: 실사용/애드센스 영향 있는 P0·P1 = 0

정적 스캔이 1,500여 플래그를 냈으나 브라우저 검증 결과 **거의 전부 오탐**:

| 스캔 코드 | 수 | 판정 |
|---|---|---|
| `unlabeled-input` (P1) | 261 | **오탐.** salary/age-calc/ascii-converter/… 브라우저 `e.labels‖aria‖closest('label')` 확인 = 미연결 0. 2026-09-02 접근성 2차 작업이 실제로 커버함. |
| `no-skiplink` (P1) | 431 | 전부 guide. 실제 갭이나 P2 (아래) |
| `no-theme-color` (P2) | 431 | 전부 guide. 실제 갭이나 P2 (아래) |
| `table-no-scroll` (P2) | 310 | guide 표. `width:100%` + 셀 `white-space:nowrap` 없음 → 리플로우. 5열 표만 10개(모바일 촘촘하나 페이지 넘침 유발 근거 없음) |
| `script-backtick` (P1) | 7 | **오탐.** 7개 전부 `new Function()` 파싱 정상 (백틱이 정규식/문자열 내부) |
| `multi-h1` (P2) | 8 | **오탐.** info 4개=언어블록(가시 1개), html-* 4개=JS 문자열/textarea 샘플 내 `<h1>`. DOM h1 = 1 |
| `no-desc` / `short-desc` | 4 / 61 | **오탐.** description 텍스트의 `>`(화살표함수 `=>`)·`'` 때문에 스캐너 정규식 조기종료. 관대한 정규식 재스캔 = 누락 0 (naverfc 제외) |
| `fixed-wide` (P2) | 2 | **오탐.** qr/sentence-counter `min-width` = `@media` 브레이크포인트 |
| `i18n-no-apply` (P2) | 1 | **오탐.** ai-model-comparison은 `render()`로 적용. 토글 ko→en→…→ko 정상 |
| `maybe-english` (P2) | 4 | **오탐.** about/contact/privacy/terms 4언어 블록 텍스트 합산 |
| `dup-title` / `dup-desc` | 0 | 중복 없음 |
| stub `noindex`/sitemap | 0 문제 | **스텁 69개 전부 정상** — `noindex,follow` ✅, canonical ✅, sitemap 미등재 ✅ |

### 브라우저 검증 통과 (표본)
salary, age-calculator, ascii-converter, ai-model-comparison, html-minifier,
category/finance·image·data·security·date-time·ai·text·health·pdf·generator,
guides 6개, index — `<main>`·h1(1개)·lang·title·canonical·meta desc·theme-color
정상, 계산기 결과 aria-live(`#mh-a11y-result`) 정상, 언어 토글 순환 정상,
콘솔 에러 0.

## P2 (실제 갭, 이번 수정 범위 밖 — 별도 배치 권장)

### G-1. 가이드 430개: skip link / theme-color / `<main id>` / `color-scheme` 없음
- guide 431개 중 430개가 `theme-instrument.js` 미로드 (콘텐츠 tier). info 5개는
  2026-09 P2-C에서 인라인 추가됐고, category 11개는 theme-instrument.js가 런타임
  주입. **guide만 누락.**
- 영향: WCAG 2.4.1(bypass blocks) 형식 위반. 단 guide 헤더는 포커스 요소 1개
  (`.back-link`)뿐 → skip link 실익 = Tab 1회 절약. theme-color = 모바일 URL바 색.
  **실사용 UX·애드센스 영향 미미.**
- 수정 시: guide `<style>`에 `.skip-link` 규칙 + `<body>` 첫 요소로
  `<a href="#main" class="skip-link">본문 바로가기</a>` + `<main>`→`<main id="main" tabindex="-1">`
  + `<meta name="theme-color" content="#0a0a0a">` + `:root{color-scheme:dark}`.
  430파일 스크립트 일괄. 순수 additive, 회귀 표면 낮음. ko/en 문구만 분기.

### G-2. 가이드 5열 표 10개: 모바일(<400px) 촘촘
`mortgage-pmi…`, `macro-calculator…`, `margin-markup…`, `uuid-extractor…`(±en),
`sql-validator…`(±en), `typing-speed-wpm…`(±en), `cagr-hides-volatility…`.
- `width:100%`라 리플로우는 됨. 페이지 가로 넘침 유발 근거는 못 찾음(이 환경에서
  실뷰포트 측정 불가).
- 수정 시: 해당 guide `<style>`에 `@media(max-width:640px){table{display:block;overflow-x:auto;white-space:nowrap}}` 1줄.

## 검증 불가 (환경 한계)

**모바일 실뷰포트 가로 overflow / 터치 영역** — `resize_window`·CSS width 핸들
둘 다 이 환경에서 실제 리플로우를 안 일으킴 (CLAUDE.md 기록됨). 정적 추론만 가능:
- 도구 페이지: 2026-09-01 레이아웃 감사(334p, 커밋 `bd90b2a` P2-E `.tbl-scroll`)에서 커버됨.
- guide: 위 G-2 외 구조상 리플로우 (셀 nowrap 없음).
- 터치 영역: 표본에서 24px 미만 = 인라인 텍스트 링크(헤더 back-link·푸터·본문)
  뿐 — WCAG 2.5.8 인라인 예외. radio/checkbox는 `<label>` 래핑으로 행 전체 탭 가능.

## 이번 세션 수정

**없음.** 확인된 이슈 중 "실사용 UX 또는 애드센스 품질 영향" 기준 통과 항목 0.
G-1/G-2는 사용자 승인 시 별도 배치.
