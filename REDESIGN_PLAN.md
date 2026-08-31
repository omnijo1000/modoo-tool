# modoohub UI/UX 개선 계획

작성: 2026-08-31 · 스킬: `redesign-existing-projects` · 제미나이·GPT 크로스체크 반영본

---

## 원칙 / 안 건드리는 영역

- 계산 함수, 툴별 `<script>` 로직 변경 금지
- `data-i18n` 키, canonical/hreflang, JSON-LD **구조**, 파일명·URL, `sitemap.xml` 변경 금지
- 과한 애니메이션·장식보다 가독성·신뢰감·속도 우선
- 한국어 서비스 자연스러운 문구·숫자 표기 유지
- 각 단계 완료 후 실제 페이지 띄워 검증(브라우저), 대비는 실측값으로 확인 후에만 "충족" 선언

---

## 발견한 문제점 (요약)

1. **시각 정체성 3분할** — `theme-instrument.css`(index+툴, `#080B14` 글래스 보라/청록) / `category/*.html`(`#0f0f0f` 초록 신호등dot) / `guides/*.html`(`#0a0a0a` 앰버). 한 흐름에서 3개 디자인 통과 → 신뢰 저하.
2. **접근성**
   - `:focus-visible` 스타일 전무 (`.tool-card` `.filter-chip` `.search-input` `.lang-toggle` `.back-link` `.header-guides-link`)
   - 툴 394개 중 `<label>` 사용 102개뿐. ~290개는 `<div class="field-label">`/`placeholder`만, `for`/`id` 미연결. `<label>` 써도 `for=` 없음(compound-interest). 슬라이더 레이블 없음.
   - 폼 레이블·소형 텍스트가 `--text-dim`(불투명도 0.42, 대비 ≈3:1) → 11px에서 WCAG AA 미달 의심 (실측 필요)
   - 스킵 링크 없음, `<main>` id 없음, 헤더 `<nav>` 아님
   - `category/*.html` FAQ `<div onclick>` — 키보드/스크린리더 불가
   - 모바일 필터 이동 버튼 28px (터치 타겟 44px 미만)
3. **검색 약함** — name+desc 부분 문자열만. 동의어 없음("월급"→연봉, "이자"→복리/대출). 결과 개수 없음. Enter 이동 없음.
4. **카테고리 탐색** — 필터 칩 폰트 `var(--mono)`로 한글 어색. `category/*.html` 카운트 드리프트(배지 "4" / 헤딩 "59" / JSON-LD `56` / 실제 58 / 하단 "336"). 영어 허브에 한글 설명 + `…무료 온라…` 잘림.
5. **툴 카드** — desc 11px 과소. 색상 `c1~c10` 랜덤 배정 = 의미 없는 장식. 자주 쓰는 계산기 우선노출 없음. 500~760px 2열 유지로 태블릿 잘림.
6. **AI 지문 / 장식 과다** — 히어로 h1 5색 그라디언트. 배경 blob 2개 `blur(90px)` 520px 무한 애니메이션(모바일 GPU 부담, `prefers-reduced-motion` 가드는 있음).
7. **기타** — `body{min-height:100vh}` / `related.js` `.rt-hdr-cat` `margin-left:8px`(문서엔 auto라 기재) / 언어 토글이 "다음 언어" 표시로 현재 언어 혼란 / 카드 hover `translateX` 모바일 잔상.

---

## 크로스체크 반영 (원안 → 수정)

| 원안 | 수정 |
|---|---|
| JS로 `aria-label` 자동 연결(290개) | **폐기.** 실제 `<label for>` + 입력 `id`. 공통 패턴 확정 → 구조 동일 파일 배치 수정 → 샘플 F12 검수 → 확장 |
| 포커스 링 그룹 선택자 | 각 선택자마다 `:focus-visible` 명시. `a`/`button`/`input`에만 |
| 카테고리 11 + 가이드 일괄 교체 | **시범 1개(카테고리 1 + `guides/index.html`)만** → 전후 비교·검수 보고 → 승인 후 확장 |
| 카운트 숫자만 정정 | 실제 툴 목록 원본으로 배지·제목·JSON-LD·`category-i18n.js` 동시 검증. Rich Results 테스트 |
| `100vh`→`100dvh` | **보류** (모바일 점프 주원인 아님) |
| 히어로 2색·blob 모션 | **보류** — 시범 테마 화면 보고 판단 |
| "AA 충족"/"성능 개선" 선언 | 실측(대비 계산 + 모바일 검사) 후에만 수치로 보고 |
| `data-kw` 394개 | 상위 30~50개(금융·세금·근로)부터. 실제 한/영 명칭 검토 후, 효과 확인 후 확장 |

---

## 단계별 실행

### 1단계 — 접근성 (위험 낮음, 검증 가능) ✅ 완료 2026-08-31

- [x] `index.html`: `.tool-card` `.filter-chip` `.search-input` `.filter-nav`에 개별 `:focus-visible` (outline 2px cyan, offset 2px)
- [x] `theme-instrument.css`: `.back-link` `.lang-toggle` `.header-guides-link`에 `:focus-visible`
- [x] 스킵 링크: `index.html`은 정적 `<a class="skip-link" data-i18n="skipLink">` + i18n 4개 언어. 툴 페이지는 `theme-instrument.js`가 DOMContentLoaded에 주입(`<main>`에 id 없으면 `main` 부여). `.skip-link` CSS는 theme-instrument.css에
- [x] `<main id="main">` (index 정적, 툴 페이지 JS)
- [x] 텍스트 대비 상향: 폼/섹션 레이블 클래스 `--text-dim`(3.7:1, AA 미달) → `--text-muted`(**실측 6.91:1**).
      대상: `.field-label` `.fk-sub` `.label` `.section-label` `.editor-label` `.out-label`/`.output-section` `.plbl` `.drop-hint`/`.drop-text` `.compat-note` `.note` (theme-instrument.css) + `.category-label` (index.html)
- [x] 모바일 `.filter-nav`: 작은 터치 타겟(28px) 문제 → `@media(max-width:500px)`에서 `display:none` (칩 바 스와이프 스크롤로 충분, 키보드는 chip focus + scrollIntoView가 처리)
- [x] 검증: 로컬 서버로 index/salary/compound-interest 로드. 스킵링크·포커스링 스샷 확인, 콘솔 에러 0
- [ ] 헤더 `<nav>` 랜드마크 — **보류**(2단계에서 폼 작업과 함께, theme 공통 헤더 구조 변경 최소화)

### 2단계 — 폼 레이블 실제 연결

**파일럿 완료 6개 (2026-08-31)** — salary, loan-calc, four-insurance, national-pension, health-insurance, compound-interest

패턴 확정:
- `<div class="field-label">TEXT</div>` + `<input id="X">` → `<label class="field-label" for="X">` (`.field-label` CSS가 이미 `display:flex`라 `<label>`로 바꿔도 레이아웃 동일)
- `<div class="fk">TEXT</div>` (입력행) → `<label class="fk" for="X">` (readout용 `span.fk`는 건드리지 않음)
- `<label>` 있고 `for` 없음 (compound-interest, qr류) → `for="X"`만 추가. `data-i18n`이 textContent만 교체하므로 `for` 속성은 언어 전환 후에도 유지됨(검증함)
- 시각 레이블 없는 `<select>` (four-insurance `bizSize`) → `aria-label` (수동 작성, 자동 추론 아님)
- 슬라이더 (compound-interest range) → `<label>`에 `id` 부여 + range에 `aria-labelledby` → 번역된 텍스트 자동 추적
- 인라인 `style="color:var(--text-dim)"` 레이블 (national-pension) → `<label>` 변환 + `--text-muted`로 대비 수정

브라우저 검증 결과:
| 파일 | 입력 | 연결 | 계산 |
|---|---|---|---|
| salary | 3 | 3/3 `[label]` | 5천만→3,571,531원 ✅ |
| loan-calc | 3 | 3/3 | 2억→월 1,013,371원 ✅ |
| four-insurance | 2 | 2/2 (select `aria-label`) | 결과 표시 ✅ |
| national-pension | 3 | 3/3 (+대비수정) | 조기/정상/연기 수령액 산출 ✅ |
| health-insurance | 3 | 3/3 | 300만원→122,021원 ✅ |
| compound-interest | 6 | 6/6 (range `aria-labelledby`, i18n 추종) | range↔number 동기 ✅ |

콘솔 에러 0. 레이아웃 회귀 없음(스샷 확인).

콘솔 에러 0. 레이아웃 회귀 없음(스샷 확인).

**확장 완료 (2026-08-31)** — Pattern A 스크립트 일괄 적용

- 스크립트 `scratchpad/labelfix.py` — 타이트 매칭만: `<div|label class="field-label">TEXT</...>` (TEXT에 `<` 없음, `for=` 없음) + 바로 뒤 `\s*(<div class="input-wrap">)?\s*<input|select|textarea id="X">` → `<label ... for="X">`. 그룹 헤더(`input-row`/`cal-grid` 뒤따름)·결과 레이블은 매칭 안 됨.
- **결과: 86파일 / 237레이블 연결** (누적 100개 툴 페이지에 `<label for>`)
- 검증:
  - 변경파일 93개: `<label>` 밸런스 OK, 모든 `for=` 대상 id 실존 (파이썬 파서, 문제 0), 스크립트 재실행 0건(idempotent)
  - 브라우저 샘플 8개(meta-tag-generator·unit-converter·wpm·severance·body-fat·roi·national-pension·compound-interest): `input.labels` 해석 정상, 깨진 `for` 0, 계산 동작(severance 4년→15,662,895원 등), 콘솔 에러 0, 레이아웃 회귀 없음
  - 페이지당 잔여 미연결 0~5개: `field-label` 안 `<span>`/`<button>`, 출력 textarea, 조건부 필드

**미완 (후속)**:
- [ ] `.rbtn-row` / `.rbtn` div·라디오 그룹 → `role="group"` + `aria-label`
- [ ] `field-label` 안에 `<button>`/`<span>` 있는 페이지 → `aria-labelledby`
- [ ] `.plbl` `.editor-label` `.opt-label` 등 다른 레이블 클래스 (dev 툴 textarea 중심)
- [ ] 헤더 `<nav>` 랜드마크 (theme 공통 헤더 구조)

### 3단계 — 검색 ✅ 완료 2026-08-31

- [x] index 상위 53개 카드에 `data-kw` (슬러그→한/영 별칭. salary←"월급 실수령 세후", body-fat-calculator←"인바디", loan-calc←"이자 원리금" 등)
- [x] `applySectionFilter()`가 name·desc·`card.dataset.kw` 3개 매칭
- [x] 결과 개수: `<p id="resultCount" role="status" aria-live="polite">` + i18n `resultCountTpl` 4언어. 검색어 있고 매칭>0일 때만 표시. 입력에 `aria-describedby="resultCount"`
- [x] `searchKey(e)`: Enter 시 보이는 카드 정확히 1개면 `location.href` 이동
- [x] 기존 `applySearch`/`setFilter`/URL/계산 로직 무변경. `autocomplete="off"`만 추가
- [x] 브라우저 검증: "월급"→5개(salary 포함), "이자"→5개, "인바디"→1개, "qr"→1개 / "인바디"+Enter→body-fat 이동 / 0매칭→noResults만 / EN "salary"→"2 tools", JA "json"→"22 件のツール" / 콘솔 에러 0, 레이아웃 정상(스샷)

### 4단계 — 시범 테마 통일 ✅ 시범 완료 2026-08-31 (확장 대기)

시범 대상: `category/developer-tools.html`, `guides/index.html`

변경 (둘 다):
- 인라인 `<style>`의 자체 `:root` 팔레트(#0f0f0f 초록 / #0a0a0a 앰버) 삭제 → `<link href="../theme-instrument.css">` + 페이지 고유 클래스(`.tool-card`/`.g-card`/`.hub-badge`/`.intro`/`.breadcrumb` 등)만 남기고 값을 인스트루먼트 토큰(`--glass` `--glass-border` `--cyan` `--violet` `--text-muted` `--mono`)으로 교체
- 헤더: 신호등 dot 3개/`<span class="logo">` → theme 헤더 구조(그라디언트 `.dot` + 그라디언트 wordmark + `.back-link margin-left:auto` + `.lang-toggle`)
- 폰트 `Noto+Sans` → `Noto+Sans+KR`
- `<script src="../theme-instrument.js">` 추가 (ambient mesh + 스킵링크 자동 주입 + 툴팁)
- 상호작용 요소에 `:focus-visible` 추가
- **마크업·href·JSON-LD·i18n JS·계산/검색 로직 무변경**

검증 (로컬 서버, 전후 스크린샷):
| 항목 | dev 카테고리 | guides |
|---|---|---|
| JSON-LD 블록 | 바이트 동일 (3개) | 바이트 동일 (1개) |
| href 목록 | 콘텐츠 링크 동일 (font URL + theme css만 추가) | 동일 (theme css만 추가) |
| 카드 수 | 58 유지 | 430 유지 |
| 가로 스크롤 | 없음 | 없음 |
| mesh/스킵링크 주입 | ✅ | ✅ |
| FAQ 토글 (`toggleFaq`) | 동작 | — |
| 검색 (`filterGuides`) | — | "청약"→1, count "1개 가이드" |
| 언어 토글 | category-i18n.js 동작 | ko↔en 그리드 전환·h1·back 동작 |
| 콘솔 에러 | 0 | 0 |
| 시각 | 메인 사이트와 동일 정체성(다크 네이비·글래스·violet/cyan) 확인 |

주: category-i18n.js가 KO에서 툴 설명을 "도구 상세 페이지로 이동" 플레이스홀더로 덮어쓰는 것은 **기존 동작**(5단계 카운트/콘텐츠 정비 대상), 테마 변경과 무관.

**확장 완료 2026-08-31** — 나머지 10개 카테고리 허브

- 스크립트 `scratchpad/cat_theme.py` — 10개 파일 모두 동일 4개 변환(style 블록 교체 / 헤더 교체 / 폰트 / theme.js 추가). 헤더 블록은 10개 전부 바이트 동일했음
- 카테고리별 accent 색(초록/인디고/앰버/핑크/빨강 등) → 단일 cyan 통일 (일관성 우선)
- 검증:
  - 11개 전부 태그 밸런스 OK, theme css/js 링크됨, old 팔레트/dots 제거됨
  - 샘플 9개(ai/security/image/text/pdf/data/generator/health/date-time) fetch 검사: JSON-LD 3블록 유지, `<style>` 1개, tool-card 수 유지
  - 브라우저: finance-calculators·security-tools 스샷 — 메인 사이트와 동일 정체성 확인, 콘솔 에러 0

### guide 하위 아티클 (430개) — 이번 미포함 (별도 작업)

- 아티클 `<style>` 블록 36종, 헤더 3종으로 편차 큼 (허브처럼 균일하지 않음)
- 장문 SEO 콘텐츠 페이지(본문 타이포·표·콜아웃 박스)라 blind 스크립트 위험
- amber 테마로 내부적으로는 일관됨 → 급하지 않음
- 나중에: 상위 style 변형(235+53+34개 = 대다수)만 대상으로 샘플 검수하며 단계 확장

### 5단계 — 카운트 동기화 + FAQ 접근성 ✅ 완료 2026-08-31

**카운트** (`scratchpad/cat_counts.py`, 실제 `<a class="tool-card">` 목록이 원본):
- 11개 카테고리 전부: `.hub-badge` 숫자 / `.section-heading "All N"` / ItemList `itemListElement`+`numberOfItems` / BreadcrumbList `itemListElement` = **모두 실제 카드 수와 일치**하도록 재생성 (JSON은 `json.loads`→수정→`json.dumps`로 안전 처리)
- 정정 전 불일치: dev(badge 4 / numberOfItems 56 / BC 58 → 59), finance(27→28), generator(29→33), health(7→8), 그 외 badge 전부 stale
- `category-i18n.js` `CAT[slug].count` — 이미 정확했음(확인만)
- 관련 카테고리 "All 336 Tools"(정적) + `category-i18n.js` `'136'`(런타임) → **317** (index.html footer 기준 사이트 총 도구 수)
- 검증: 11개 JSON-LD 전부 `json.loads` 통과, 파이썬으로 cards=badge=heading=ItemList=numberOfItems=BreadcrumbList 전 항목 일치 확인. 브라우저(dev·finance·health): 배지·JSON-LD 일관

**FAQ 접근성** (11개 파일, 44개 FAQ 항목 균일):
- `<div class="faq-q" onclick>` → `<button type="button" class="faq-q" onclick aria-expanded="false">`, 닫는 `</div>` → `</button>`
- `.faq-q` CSS에 버튼 리셋 추가 (`width:100%;background:transparent;border:0;font-family:inherit`)
- `toggleFaq` → `open` 클래스 토글 + `aria-expanded` 동기화
- 검증: 브라우저에서 `<button>` 태그 확인, 키보드 Space로 토글 + `aria-expanded` false↔true, `:focus-visible` 링 표시, 콘솔 에러 0

주: Rich Results 테스트(구글 도구)는 로컬 서버라 미실행 — 배포 후 실제 URL로 확인 권장 (JSON 구조는 파이썬 파서로 검증됨)

### 보류 (이번 미포함)

`100vh`→`100dvh` · 히어로 색상 축소 · blob 모션 변경 · 카드 `c1~c10` 재매핑 · 카드 desc 12px / 그리드 분기점 → 4단계 검수 후 재논의

---

## 완료 후 보고 항목

변경 파일 목록 / 대비 계산값 표 / 검색 테스트 결과 / 시범 테마 전후 화면 비교 + 검수 결과
