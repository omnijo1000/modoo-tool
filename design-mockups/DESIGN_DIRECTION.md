# 디자인 리프레시 — 진행 상황 (2026-07-15 시작)

## 배경
사용자 요청: "전체적으로 디자인 올드해 보이나? 예쁘고 인텔리전트하게 만들고 싶다" — 컨셉/비주얼 아이덴티티 레벨 요청. 기존 dark/amber 디자인 시스템의 버그성 문제(팔레트 드리프트, 검색 부재, 저대비 SEO 텍스트 등)는 별도 이슈 — 이 문서는 **컨셉 디자인 방향 결정**만 다룸.

## 현재까지 결론: 하이브리드 A+ 로 수렴 중 (최종 확정 아님, 다음 세션에서 계속)

로컬 목업 파일 (이 폴더 안에 있음, 실제로 작동하는 BMI 계산기 프로토타입):

| 파일 | 뭔지 |
|---|---|
| `direction1-instrument.html` | 방향1: 정밀 계기판 (근흑색 + 값에만 붙는 앰버 accent, mono 숫자, 임상 경계 게이지) |
| `direction2-editorial.html` | 방향2: 조용한 지면 (따뜻한 종이색, 세리프, 문장형 인풋) |
| `direction3-glass.html` | 방향3: 글래스 시그널 (블러 블롭 + 프로스티드 글래스, 레인보우 게이지) |
| `hybrid-glass-instrument.html` | 하이브리드 A: 글래스 쉘 + 계기판 정보층(임상 게이지·delta 문구·공식 캡션) |
| `hybrid-instrument-editorial.html` | 하이브리드 B: 계기판 + 지면식 문장 콜아웃/각주 (초기 추천안, 사용자가 A를 더 선호해서 보류) |
| `hybrid-glass-instrument-tooltip.html` | **하이브리드 A+ (현재 선호안)**: A에서 하단 각주 한 줄을 없애고 `ⓘ` 호버/포커스 툴팁 4곳(분류 기준·표준체중 공식·BMR 공식·TDEE 활동계수)으로 분산 |

각 파일을 브라우저로 그냥 열면 실제 계산기처럼 작동함(키/몸무게 입력하면 BMI·BMR·TDEE 다 계산됨). 파일 하단에 `.concept-note`로 각 컨셉의 의도와 이식 비용도 적어둠.

## 사용자 피드백 히스토리 (중요도 순)
1. 글래스 시그널(방향3)이 제일 예뻐 보이지만 "인텔리전트"함이 약하다는 지적 → 원인: 레인보우 게이지가 클리셰, 숫자=그라디언트 장식일 뿐 정보 신호 아님, delta 설명 문장 없음, 공식 캡션 없음.
2. 하이브리드 A(글래스+계기판 정보층)를 제일 마음에 들어함.
3. 다만 "지면 주석"(하단 각주 텍스트 블록)을 늘 보이게 두지 말고 **호버 시에만 뜨는 버블**로 바꾸자고 요청 → 하이브리드 A+ 로 발전.
4. A+에 대한 사용자 확인 질문에 답변한 내용:
   - **배경색은 페이지마다 통일해야 함.** 카테고리별로 배경/블롭 색을 바꾸는 건 절대 금지 — 기존 audit에서 지적된 "그린 페이지 vs 앰버 페이지 팔레트 드리프트"를 재현하는 것과 동일한 문제. 카테고리 구분이 필요하면 accent 색조 정도만 좁게 적용.
   - `backdrop-filter` 성능 우려는 재평가 결과 이 정도 규모(카드 5~6개, blob 2개)면 **실사용에 크게 문제 없음** (iOS/최신 Android Chrome 다 GPU 가속). 우려해야 할 케이스는 blur 레이어가 수십 개 겹치는 리스트형 페이지이거나 아주 오래된 저가 기기일 때 뿐.
   - 툴팁의 실제 문제는 성능이 아니라 **모바일 UX**: `div[tabindex]`로 만든 배지라 (a) 탭했을 때 포커스가 100% 보장 안 되는 구형 iOS Safari 이슈, (b) 닫는 상호작용이 불명확, (c) 배지 크기(15×15px)가 권장 터치 타겟(44×44px) 미달. → **다음 개선 필요: `<button aria-expanded>` + JS 탭 토글로 교체, 배지 주변 padding 늘리기.**

## 진행 상황 업데이트 (2026-07-15, 같은 세션)

**컨셉 확정됨: 하이브리드 A+.** 실제 프로덕션 파일에 파일럿 적용 완료.

### 새로 생긴 공유 파일 (레포 루트, 387개 파일이 앞으로 링크해서 쓸 것)
- `theme-instrument.css` — 하이브리드 A+ 전체 토큰(`:root` 변수)과 컴포넌트 클래스(카드, readout, 게이지, 툴팁 배지, delta-line, cal-grid, `.seo`/`.faq-item` 포함). 사이트는 다크 전용이라 CLAUDE.md 방침대로 라이트/다크 토글 없음 — 목업 단계의 `data-theme`/`prefers-color-scheme` 분기는 프로덕션 파일엔 안 넣음(불필요).
- `theme-instrument.js` — 배경 블롭(mesh) 2개를 `DOMContentLoaded`에 JS로 주입(마크업에 안 넣어도 됨), `ⓘ` 툴팁 배지를 **버튼 + JS 클릭 토글** 방식으로 처리(이전에 지적된 모바일 UX 문제 해결 — hover는 CSS로 유지, 클릭/탭은 JS로 열고 닫음, 바깥 클릭·Escape로 닫힘, 데스크탑/모바일 둘 다 커버), `countTo()` 카운트업 애니메이션 헬퍼.

### 파일럿 적용 완료: `bmi-calc.html`
기존 GA/AdSense/hreflang/canonical/JSON-LD(WebApplication+FAQPage+HowTo)/i18n(ko/en/zh/ja)/정적 프리렌더 FAQ/`related.js` 스크립트 태그 등 CLAUDE.md 필수 요소는 전부 그대로 유지하고, **시각 레이어(CSS+계산기 UI 마크업)만** 하이브리드 A+로 교체함. i18n의 `h1` 텍스트에 `<span>BMI</span>` 마크업을 넣어 언어 전환 후에도 그라디언트 강조가 유지되도록 살짝 개선(기존엔 언어 전환 시 accent span이 사라지는 사소한 버그가 있었음).

**브라우저로 직접 열어 검증 완료** (로컬 서버 띄워서 claude-in-chrome으로 확인):
- 계산 로직 정확함 (178cm/92kg → BMI 29.0, 표준체중 69.7kg, BMR/TDEE 등 전부 원본 공식과 일치)
- `ⓘ` 툴팁 버튼 클릭 시 열림/다른 곳 클릭 시 닫힘 정상 동작
- FAQ `<details>` 아코디언, SEO 섹션 정상 프리렌더 확인
- 언어 토글(EN 전환) 정상 — h1 accent 유지됨, subtitle/footer 번역 반영됨
- **주의: `related.js`가 주입하는 하단 "관련 도구" 위젯은 여전히 자기 하드코딩 색상을 씀 (이전 audit에서 지적된 그 이슈).** 지금은 크게 안 튀지만 완전히 통일하려면 related.js 위젯 스타일도 `theme-instrument.css` 토큰을 쓰도록 나중에 손봐야 함.

### 두 번째 파일럿 완료: `calorie-calculator.html` (2026-07-15, 같은 세션 이어서)
BMI와 다른 형태(게이지 없음, 명시적 "계산하기" 버튼 클릭 방식, 4칸 목표 카드, 2x2 활동수준 버튼)로 골라서 테마 재사용성 검증. `theme-instrument.css`에 `.calc-btn`(그라디언트 CTA 버튼, 라이브 업데이트가 아니라 버튼 클릭으로 계산하는 페이지들을 위한 공용 컴포넌트) 추가함 — 이 페이지처럼 사이트에 꽤 많을 것으로 예상되는 패턴.
브라우저 검증 완료: BMR/TDEE 계산 정확(30세 남성 70kg 170cm 가벼운 활동 → BMR 1,618 / TDEE 2,224, 수식과 일치), 게이지 없이도 readout 패널 잘 작동, 목표별 칼로리 4칸 카드, 툴팁 정상. 사소한 버그 하나 발견해 즉시 수정: "체중 / 신장" 묶음 라벨이 data-i18n 없이 하드코딩 한국어였던 것 → `calBodyLabel` 키 4개 언어 추가해서 고침.
**결론: 하이브리드 A+ 패턴(게이지 있는/없는 버전, 라이브계산/버튼계산 버전 둘 다)이 최소 2개의 서로 다른 계산기 형태에 재사용 가능함을 확인.** 나머지 파일 롤아웃 시 참고할 두 가지 패턴 원형이 됨.

### 배치 3: health-calculators 카테고리 10개 병렬 전환 완료 (2026-07-15, 세션 한도 도달 직전)
bmi-calc/calorie-calculator 제외한 health-calculators 카테고리 나머지 10개 전부 fork 에이전트로 병렬 전환: `body-fat-calculator`, `macro-calculator`, `water-intake`, `pace-calculator`, `pregnancy-due-date`, `sleep-calculator`, `health-insurance-calc`, `national-pension-calculator`, `health-insurance`, `national-pension`. **이걸로 health-calculators 카테고리 12개 전부 완료.**

**주의 — 세션 한도(사용량) 도달로 8/10개 fork가 "failed" 상태로 끝남.** 하지만 실제 파일은 확인 결과 전부 정상 완료된 상태였음(에이전트가 최종 보고 메시지 작성 중에 끊긴 것으로 추정, 파일 저장 자체는 끝나 있었음). 검증한 내용:
- 10개 파일 전부 `</html>` 정상 종료, `theme-instrument.css`/`theme-instrument.js`/`related.js` 참조 정상
- 10개 파일 인라인 `<script>` 전부 Node로 문법 검증 통과(JSON-LD 블록 제외)
- leftover `:root{...}` 중복 블록 없음(구 스타일 완전 제거 확인)
- 브라우저로 2개 직접 스팟체크: `water-intake.html`(70kg 좌식 → 2.31L/일, 계산 정확), `national-pension.html`(법정수치 보존 확인 — 요율 9.5%/상한 659만원/하한 41만원 그대로, 예상 연금액 계산 정상)
- 법정수치 4개 파일(`health-insurance-calc`, `national-pension-calculator`, `health-insurance`, `national-pension`)은 각 fork에게 숫자 절대 변경 금지 명시했고, 완료 보고한 2개(`health-insurance-calc`)는 명시적으로 모든 요율/구간 숫자 그대로임을 확인 응답받음.

**아직 안 한 것 (다음 세션 필수):**
- [ ] 나머지 8개 파일(실패 표시된 것들) 중 `macro-calculator`/`pregnancy-due-date`/`sleep-calculator`/`national-pension-calculator`/`national-pension`은 fork가 최종 보고를 못 남기고 끊겨서, "숫자 안 건드렸다"는 명시적 확인을 못 받은 상태 — **법정수치 있는 파일(`national-pension-calculator.html`, `national-pension.html`)은 특히 다음 세션에서 원본과 diff 떠서 숫자 영역 변경 없는지 재확인 필수** (`git diff`로 세율/구간 숫자만 별도로 훑어볼 것)
- [ ] 아직 브라우저로 스팟체크 안 한 나머지 8개 중 8개(`water-intake`/`national-pension` 2개만 확인함) — 최소 `pace-calculator`(가장 복잡, 457줄)와 `pregnancy-due-date`(게이지 적용 여부 확인 필요)는 다음 세션에서 브라우저 확인 권장
- [ ] git add/commit (아직 스테이징 전, 아래 커밋에 포함시킬 예정)

### 배치 4: date-time-tools 카테고리 10개 병렬 전환 완료 (2026-07-15, 계속 이어서)
`age-calculator`, `date-calc`, `time-calculator`, `business-days-calculator`, `dday`, `korean-age`, `working-days-calc`, `timezone-converter`, `timestamp`, `meeting-cost-calculator` — 10개 전부 fork 병렬 전환, 이번엔 **10/10 전부 정상 완료 보고**(지난 배치처럼 세션 한도로 끊긴 것 없음).

**품질이 이전 배치보다 좋아짐 — fork들이 자체적으로 버그를 발견하고 고침:**
- `time-calculator.html` 변환 중 fork가 영어 `seoHtml` 문자열 안 이스케이프 안 된 아포스트로피("Korea's")를 발견 → Node 문법체크로 잡아내고 원본과 diff 대조해서 직접 수정함
- `working-days-calc.html`은 `HOLIDAYS_2026` 공휴일 목록을 `git diff`로 명시적으로 대조해서 "1바이트도 안 바뀜" 확인까지 하고 보고함

**패턴 다양성 확인:** 게이지 없는 페이지 다수(날짜/시간엔 임상 범위 개념이 없음 — 예상대로), 라이브 틱 표시(timestamp.html의 실시간 현재 타임스탬프, meeting-cost-calculator.html의 러닝 타이머)도 기존 mechanism 그대로 유지한 채 스타일만 입힘, 탭 전환 UI(`date-calc`/`dday`/`working-days-calc`/`time-calculator`)는 `.tab/.active` → `.rbtn-row/.rbtn.on` 컨벤션으로 통일(JS의 탭 전환 함수만 클래스명 변경, 로직 불변), JS 템플릿 생성 카드(`timezone-converter`의 다중 시간대 카드)는 기존 자체 스타일 유지하며 토큰만 재활용.

**직접 검증 완료:**
- 10개 파일 전부 Node로 인라인 JS 문법 재검증 통과, `</html>` 1회, `theme-instrument.css/js`·`related.js` 정상 링크, 중복 `:root` 블록 없음
- 브라우저 3개 스팟체크: `dday.html`(JS로 날짜 세팅 → D-170 정확), `timestamp.html`(라이브 현재 타임스탬프 실제 epoch 값과 일치, UI 전부 정상)

**결론: health-calculators(12) + date-time-tools(10/13, 남은 3개는 countdown-timer/pomodoro-timer/time-zone-meeting-planner) = 총 22개 파일 전환 완료.**

### 다음에 할 일 (미결, 2026-07-15 세션 종료 시점)
- [x] `related.js` 위젯 스타일을 theme-instrument.css 토큰 참조하도록 정리 완료 (2026-07-15). `.rt-hdr-cat`, `.rt-card`, `.rt-cat-link` 등 하드코딩 hex를 `var(--glass-border, var(--border, fallback))` 식 체이닝 fallback으로 교체 — **신규 하이브리드A+ 페이지(--glass/--cyan 등 정의)와 기존 미마이그레이션 페이지(--surface/--border/--accent 정의) 양쪽에서 다 자연스럽게 작동**하도록 함(각 페이지가 정의한 토큰이 없으면 다음 순서로 폴백, 최종 폴백은 원래 하드코딩 hex). `.rt-card`에 `backdrop-filter:blur(10px)` 추가해 새 글래스 페이지에서 위젯도 유리질감으로 보이게 함.
- [x] 사용자가 `bmi-calc.html` 확인, 컨셉 확정 승인 → 전체 롤아웃 지시 받음 (2026-07-16, "나머지 파일 모두 다 진행해")
- [ ] index.html 홈페이지 자체의 히어로/카드그리드도 같은 토큰으로 별도 리프레시 필요 (지금까지는 개별 계산기 페이지 기준으로만 진행함)
- [x] **git 커밋함, push는 안 함.** 브랜치 `design/hybrid-instrument-glass`, 커밋 `00a7d93`("Convert 60 more files (batch 0+1) to Hybrid A+ theme"). origin에 push된 상태 아님 — 다른 PC에서 이어가려면 이 로컬 저장소를 그대로 가져가거나(git bundle/clone), 사용자가 명시적으로 push를 요청해야 함(에이전트는 push를 임의로 하지 않음).

---

## 전체 사이트 롤아웃 진행 상황 (2026-07-16 시작)

### 방법론 (배치 0/1에서 확립됨)
- 전체 `*.html` 393개 중 이미 전환된 22개(health-calculators 12 + date-time-tools 10) + 인프라 페이지 5개(index/privacy/about/contact/terms) + 리다이렉트 스텁 68개(`http-equiv="refresh"` 있는 파일, 시각 전환 불필요)를 제외한 **298개 파일이 전환 대상**.
- 298개를 30개씩 10개 배치로 나눔(마지막 배치만 27~28개). 배치 하나당 **fork 에이전트 5개를 병렬로 띄워 6개 파일씩 담당**시키는 방식으로 진행.
- fork 프롬프트 템플릿(재사용):
  1. bmi-calc.html/calorie-calculator.html을 레퍼런스로 참고할 것 명시
  2. 루트의 `theme-instrument.css`/`theme-instrument.js` 재사용, 새로 만들지 말 것
  3. **theme-instrument.css에 새 클래스 추가 전 grep으로 기존 정의 확인 필수** — 같은 배치 안 다른 fork들이 동시에 같은 파일을 편집 중이라 클래스명 충돌 위험 있음 (`.opt-label`이 실제로 2가지 다른 용도로 중복 정의된 적 있음 → `.opt-label`/`.opt-label-inline`으로 분리해 해결)
  4. 각 파일: `<style>` 블록 제거 → `<link rel="stylesheet" href="theme-instrument.css">` 추가 → `</body>` 직전(related.js 앞)에 `<script src="theme-instrument.js"></script>` 추가 → 계산기 UI만 하이브리드 A+ 클래스로 리마크업
  5. **절대 불가침**: GA/AdSense, canonical/hreflang, JSON-LD 2개, i18n `_i18n` 객체·로직 함수, 정적 `<div class="seo">` FAQ 본문 텍스트(이전 세션에 보강한 파일 — compound-interest/break-even-calculator/cagr-calculator/roi-calculator/gst-calculator/mortgage-calculator 등은 특히 주의), `related.js` 태그
  6. 라이트/다크 토글 넣지 않음(사이트는 다크 전용)
  7. 세율/법정 수치 있는 파일(세금·연금·최저임금류)은 숫자 절대 변경 금지, git diff로 확인
  8. 파일 하나 끝낼 때마다 바로 Node 문법 검증 (세션 중간에 끊겨도 이미 끝낸 파일은 안전하게 남도록)
- **부모(오케스트레이터) 쪽 필수 검증** (fork의 자체 보고를 그대로 믿지 않고 매 배치 후 직접 재확인):
  ```
  # 파일별: theme 링크 확인 + related.js 유지 확인 + JS 문법 검증
  grep -q 'theme-instrument.css' "$f" && grep -q 'theme-instrument.js' "$f" && grep -q 'related.js' "$f"
  node -e "...vm.Script(...)..."  # 인라인 <script> 블록 문법 체크, JSON-LD 제외

  # theme-instrument.css 전체 무결성
  python3 -c "s=open('theme-instrument.css').read(); print(s.count('{'), s.count('}'))"  # 중괄호 짝 확인
  python3 -c "..."  # 중복 셀렉터 탐지 (Counter로 셀렉터 텍스트 집계, count>1이면 조사 — @media/@keyframes 안에 있는 정당한 재정의는 무시)

  # 법정 수치 파일: git diff로 숫자만 훑기
  git diff --unified=0 파일.html | grep -E '[0-9]+%|[0-9]+원|[0-9]+억'

  # 사이트 전체 SEO 콘텐츠 회귀 확인 (있으면 재사용, 없으면 audit/ 폴더의 이전 스캔 스크립트 참고해 재작성)
  # 정적 <div class="seo"> vs JS seoHtml 글자수 10%+ 격차 있는 파일 0건이어야 함
  ```
- **세션 사용량 한도 주의**: fork 5개를 동시에 띄우면 세션 한도(리셋 시각 있음, 예: "resets 6:10am")에 걸려 `status: failed`로 죽는 경우 있음. **이 경우 fork의 마지막 result 메시지를 믿지 말고, 실제 파일 상태(`grep theme-instrument.css` 여부)를 직접 확인해서 뭐가 됐고 안 됐는지 판정할 것** — 다행히 fork들은 파일 단위로 원자적으로 작업해서 파일 중간에 깨진 상태로 남는 경우는 없었음(전부 정상 종료했거나 아예 손 안 댄 상태). 안 된 파일만 추려서 더 작은 fork 배치로 재시도.

### 완료: 배치 0 (30개, 2026-07-16)
acquisition-tax, ai-blog-title-generator, ai-cost-calculator, ai-cover-letter-generator, ai-email-generator, ai-linkedin-post-generator, ai-model-comparison, ai-product-description-generator, ai-resume-generator, ai-thumbnail-title-generator, ai-token-counter, ai-tweet-generator, ai-youtube-title-generator, alphabetizer, anagram-checker, annual-leave, apache-config-generator, api-response-viewer, api-tester, apr-calculator, ascii-converter, ascii-table, avif-to-jpg, barcode-generator, base64-decoder, base64-encoder, base64-image, bcrypt-generator, bcrypt-validator, blur-image — **30/30 성공, 전량 검증 완료.**

### 완료: 배치 1 (30개, 2026-07-16)
break-even-calculator, cagr-calculator, canonical-tag-checker, capital-gains-tax, case-converter, character-counter, chatgpt-token-counter, cheongyak-score, color-blindness-simulator, color-contrast-checker, color-converter, color-palette, color-picker, commission-calculator, compound-interest, cors-header-checker, countdown-timer, cps-calculator, credit-loan-limit, cron-generator, cron-parser, csp-generator, csp-validator, csr-generator, css-beautifier, css-gradient-generator, css-minifier, csv-diff-checker, csv-to-json, csv-viewer — **30/30 성공, 전량 검증 완료.** (세션 한도로 fork 5개 중 일부가 중간에 끊겨서 재시도 2회 발생 — 최종 전부 완료.)

**누적: 22(기존) + 30(배치0) + 30(배치1) = 82개 파일 전환 완료.**

### 완료: 배치 2, 1부 (10개, 2026-07-16, 다른 세션에서 이어받아 진행)
**주의: 이번엔 사용자가 "10개씩 끊어서 진행하자"로 지시 변경** — 배치 2(30개)를 통째로 안 하고 앞 10개만 먼저 처리: `curl-generator`, `curl-parser`, `currency-converter`, `discount-calculator`, `dns-lookup`(1차 시도 transient 서버 에러로 실패 → 재시도해서 성공), `dsr-calc`, `electricity-cost-calculator`, `emi-calculator`, `emoji-counter`, `emoji-remover` — **10/10 성공**.

이번 배치부터 fork들에게 "theme-instrument.css에 새 클래스 추가 금지, 필요하면 페이지별 supplemental `<style>` 블록으로 해결"을 명시적으로 강제함(병렬 fork들이 같은 공유 파일 동시 편집하는 race 방지) — 결과: `git diff --stat theme-instrument.css theme-instrument.js` 완전히 비어있음(단 1바이트도 안 건드림), 셀렉터 충돌 0건.

**직접 검증:**
- 10개 파일 전부 Node 문법 검증 통과, `</html>` 1회, 링크 3종(css/js/related) 각 1회, `:root` 중복 0건
- `theme-instrument.css` 중괄호 짝 247/247 일치(무결성 확인)
- `dsr-calc.html`은 법정 DSR 규제 파일이라 특히 꼼꼼히 확인: fork가 `git diff`로 40%/50%/0.40/0.85 등 규제 수치 byte-identical 확인 보고 + 내가 직접 브라우저에서 연소득 6000만원/기존대출 2억(4.5%,20년)/신규대출 1억(4.0%) 입력 → DSR 43.9% 계산되고 1금융권 40% 한도 초과로 "대출 불가" 경고 정확히 뜨는 것까지 실측 확인
- 원형 SVG 게이지(DSR 계산기 전용, 기존 bmi 스타일 막대 게이지와 다른 형태) 새로 등장 — 페이지별 supplemental style로 처리해서 공유 테마 안 건드림

**남은 배치 2: 나머지 20개** (electricity-cost-calculator 이후부터 find-replace까지) — `ROLLOUT_REMAINING_BATCHES.txt`의 "Batch 02" 섹션에서 이미 완료된 10개(`curl-generator`~`emoji-remover`) 제외한 나머지.

### 다음 세션(또는 다음 배치)에서 이어갈 것
방법론은 위 "방법론 (배치 0/1에서 확립됨)" 섹션 그대로 + 이번에 추가된 규칙: **theme-instrument.css/js는 절대 동시 수정 금지, 필요한 컴포넌트는 각 파일의 page-specific `<style>` 블록으로 해결.**

정확한 잔여 파일 목록은 `design-mockups/ROLLOUT_REMAINING_BATCHES.txt` 참고(재생성 불필요). 사용자 지시가 "10개씩 끊어서"이므로, 한 번에 10개씩만 fork 병렬 전환 → 검증 → md 업데이트 → 커밋 → (push는 인증 없어서 실패, 사용자가 직접) → 다음 10개, 순서로 진행. 배치 완료마다 사용자 승인 기다리지 말고 계속 진행(단, 한 번에 10개 단위로 끊어서).

**다음 세션 시작 체크리스트**:
1. `git log --oneline -3`으로 최신 커밋 확인
2. `ROLLOUT_REMAINING_BATCHES.txt`에서 다음 10개 파일 목록 확인 (Batch 02의 나머지 20개부터)
3. 위 fork 프롬프트 템플릿(+ theme-instrument.css 동시수정 금지 규칙)으로 10개 실행 → 검증 → 다음 10개 반복
4. 10개 끝날 때마다 이 문서와 git commit 갱신

### 완료: 배치 2, 2부 (10개, 2026-07-16)
`exif-remover`, `exif-viewer`, `favicon-generator`, `find-replace`, `fire-calculator`, `four-insurance`, `freelancer-rate-calculator`, `freelancer-tax`, `fuel-cost-calculator`, `gift-tax` — **10/10 완료** (5개는 정상 완료 보고, 5개는 세션 한도로 "failed" 표시됐지만 실제로는 거의 다 끝난 상태였음).

**발견 & 수정한 문제:** `freelancer-tax.html`은 세션 한도로 끊긴 fork가 body 마크업은 다 바꿔놨는데 `<script src="theme-instrument.js">` 태그 추가를 못 하고 끊김 — 직접 확인 후 한 줄 추가로 수정. 이번 배치부터 **"실패" 표시된 파일은 절대 fork 자체 보고를 믿지 말고 직접 grep+diff+Node 문법검사로 완결성 확인 후 필요시 직접 마무리**하는 게 확실한 루틴으로 자리잡음.

**법정세율 파일 직접 검증:**
- `four-insurance.html`: fork 자체가 "모든 요율 숫자 개수까지 완전 일치 확인"까지 보고하고 세션 한도로 끊김 — 그 보고 신뢰, 추가로 git diff 재확인함
- `gift-tax.html`: fork가 결과 텍스트 없이 끊겨서 직접 `git diff`로 배우자공제 6억/직계존속 5천만/미성년 2천만/형제자매 1천만, 세율구간 10~50%·누진공제 1천만~4.6억까지 전부 대조 → 텍스트 100% 동일 확인. 브라우저 스팟체크까지 실측: 8억 증여(배우자) → 과세표준 2억 → 산출세액 3,000만원 → 3%공제 90만원 차감 → 최종 2,910만원, 손계산과 정확히 일치.
- `theme-instrument.css`/`.js` 이번 배치 통틀어 `git diff --stat` 완전히 비어있음 — 동시수정 금지 규칙 이번에도 100% 지켜짐.

**누적: 102개 파일 완료** (health/date-time 22 + 배치0/1 60 + 배치2(1부+2부) 20).
**배치 2 남은 것: 10개** (graphql-formatter ~ htaccess-generator, `ROLLOUT_REMAINING_BATCHES.txt` "Batch 02" 마지막 10줄).

### 완료: 배치 2, 3부 (10개, 2026-07-16) — 배치 2(30개) 전체 완료
`graphql-formatter`, `graphql-query-builder`, `gst-calculator`, `hash-checker`, `hash-generator`, `hashtag-generator`, `heic-to-jpg`, `hmac-generator`, `hreflang-generator`, `htaccess-generator` — **10/10 성공, 이번엔 세션 한도 끊김 0건.**

**주목할 점:**
- `gst-calculator.html`(인도 GST세율 파일)은 fork가 자체적으로 브라우저 스팟체크까지 하고 보고함: ₹1000 at 18% → GST ₹180, 합계 ₹1180, CGST/SGST 각 ₹90, IGST ₹180 — 전부 정확. 세율/한도(₹40·20 lakh, ₹5 crore HSN, TCS 1%/0.5%) 텍스트 diff로 byte-identical 확인.
- `htaccess-generator.html`(654줄, 이 배치 최대 파일) — 12개 토글 규칙 전부 원본 id/핸들러 유지 확인. 내가 직접 브라우저에서 HTTPS 강제 리다이렉트 + GZIP 압축 토글 켜서 실제 `.htaccess` 규칙(RewriteEngine/RewriteCond/AddOutputFilterByType 등)이 정확히 생성되는 것까지 확인.
- `hash-generator.html`은 FAQ가 두 군데(정적 `.seo` div + JS로 렌더링되는 별도 `#faqSection`)라 서로 다른 클래스 체계(`details.faq-item` vs `.faq-item .faq-q .faq-a`)를 쓰는 걸 fork가 발견하고, page-specific CSS를 `.faq-section .faq-item`으로 스코핑해서 충돌 없이 처리.
- 탭 UI 있는 파일(`hreflang-generator`)은 계속 `.tab/.active` → `.rbtn-row/.rbtn.on` 컨벤션으로 통일.
- `theme-instrument.css`/`.js` 이번 배치도 `git diff --stat` 완전히 빈 상태 유지.

**누적: 112개 파일 완료** (health/date-time 22 + 배치0/1 60 + 배치2 30). **배치 2(30개) 전체 완료.**

### 완료: 배치 3, 1부 (10개, 2026-07-16)
`html-decoder`, `html-encoder`, `html-minifier`, `html-to-markdown`, `http-header-checker`, `http-request-builder`, `ico-converter`, `image-color-extractor`, `image-compressor`, `image-cropper` — **10/10 성공, 세션 한도 끊김 0건.**

**참고할 만한 점:**
- `html-minifier.html`은 검증 스크립트에서 `</html>` 3회 검출돼서 구조 손상 의심했는데, 실제로는 HTML 압축 툴이라 placeholder 속성값·JS 샘플 문자열 안에 `</html>`이 그냥 텍스트 데이터로 들어있는 것뿐(진짜 닫는 태그는 1개, 나머지 2개는 예시 콘텐츠) — false positive. **검증 스크립트로 이상 신호 뜨면 무조건 파일 열어서 실제 맥락 확인할 것, 특히 인코더/디코더/포매터류 툴은 원래 HTML 태그 문자열을 예시 데이터로 담고 있을 수 있음.**
- `image-cropper.html`은 canvas 좌표 계산 로직(드래그 선택, crop 영역 sync)이 있는 위험도 높은 파일이었는데 fork가 CSS/색상만 건드리고 로직은 전혀 안 건드림 확인.
- `http-header-checker.html`은 탭 패널 표시 방식을 클래스 토글에서 인라인 `style.display`로 바꿈(다른 변환 파일들의 `.readout` 컨벤션과 통일) — 시각적 동작은 동일.
- `theme-instrument.css`/`.js` 이번 배치도 계속 무결.
- `image-compressor.html` 브라우저 스팟체크: 드롭존/관련도구/SEO 가이드 렌더링 정상 확인(파일 업로드 자체는 자동화 테스트 환경 제약으로 실측 안 함, 코드 로직은 손대지 않았음 fork 보고 신뢰).

**누적: 122개 파일 완료** (health/date-time 22 + 배치0/1 60 + 배치2 30 + 배치3(1부) 10).

### 완료: 배치 3, 2부 (10개, 2026-07-16)
`image-dimension-checker`, `image-dpi-checker`, `image-prompt-generator`, `image-resizer`, `image-rotator`, `image-to-pdf`, `image-to-webp`, `image-watermark`, `income-tax`, `inflation-calculator` — **10/10 성공, 끊김 0건.**

**주목할 점:**
- `image-rotator.html`: fork가 버튼 행 재구성 중 실수로 180도 회전 버튼(`id="btn180"`)을 통째로 빠뜨렸다가, 자체 리뷰 과정에서 발견하고 스스로 복구함 — fork 자체 검증 루프가 실제로 회귀를 잡아낸 사례.
- `image-watermark.html`: 원본에 있던 사소한 기존 버그(포지션 버튼 2개가 동시에 `active` 클래스 가진 정적 마크업, JS가 로드시 정규화)를 발견해서 정적 마크업만 정리(런타임 동작 변화 없음, JS 로직 불변) — 과함 없이 딱 화면 깜빡임 순간의 잠재적 시각 결함만 없앤 선에서 그침.
- `image-dpi-checker.html`: 0-600 DPI 범위에 150/300 임계값 있는 실질적 게이지가 이미 있었음 — 공유 `.gauge` 컴포넌트로 강제 이관하지 않고 페이지 전용 게이지 유지, 색상 토큰만 교체.
- `income-tax.html`(종합소득세, 2026년 과세표준 구간 6~45%): fork가 `calculate()` 전체를 diff, 모든 세율/공제식/세액공제 캡 수치 byte-identical 확인 + 손으로 직접 재계산까지 해서 대조. **내가 직접 브라우저에서 재검증**: 연소득 6000만원 근로소득, 국민연금+건강보험공제 on → 과세표준 4,074만원, 최종 461만원(소득세 419+지방세 42) — fork 보고와 정확히 일치.
- `inflation-calculator.html`: 6개국 CPI 평균치(미국 3.0%, 영국 2.8%, EU 2.3%, 한국 2.5%, 인도 5.5%, 일본 2.0%) 전부 diff로 byte-identical 확인.
- `theme-instrument.css`/`.js` 이번 배치도 무결 유지.

**누적: 142개 파일 완료** (health/date-time 22 + 배치0/1 60 + 배치2 30 + 배치3(1부+2부) 20).

### 완료: 배치 3, 3부 (10개, 2026-07-16) — 배치3(30개) 전체 완료
`inheritance-tax`, `investment-return-calculator`, `ip-address-lookup`, `javascript-beautifier`, `javascript-minifier`, `jpg-to-avif`, `jpg-to-heic`, `json-diff`, `json-flattener`, `json-formatter` — **10/10 완료.**

**중요 — 이번 배치 중 fork 병렬 실행이 막힘:** "Fork is not available inside a forked worker" 에러 발생 — 오케스트레이터 자신이 (알 수 없는 이유로) forked worker 컨텍스트 안에서 실행되고 있어서 추가 fork를 못 띄움. **대응: 나머지 파일을 오케스트레이터가 직접 Read/Write/Edit로 전환함.** 확인해보니 10개 중 8개(`inheritance-tax`, `javascript-beautifier`, `javascript-minifier`, `jpg-to-avif`, `jpg-to-heic`, `json-diff`, `json-flattener`)는 이미 다른 프로세스(아마 사용자의 "다른 PC" 세션)가 먼저 전환해둔 상태였음 — grep으로 확인 후 그대로 채택, 검증만 수행. 직접 전환한 건 `ip-address-lookup`(fork 에러 발생 직전, 정상 fork로 완료), `investment-return-calculator`, `json-formatter`(656줄, 이 배치 최대) 3개뿐.

**직접 전환 중 버그 하나 발견 즉시 수정:** `investment-return-calculator.html` 리마크업 과정에서 결과 패널을 감싸던 `id="result"` wrapper div를 실수로 빼먹음 — 원본 JS `calc()`가 마지막에 `document.getElementById('result').style.display='block'` 호출하는데 그 대상이 사라져 있었음. 문법 검사(Node)로는 안 잡히는 종류의 런타임 에러라 브라우저 스팟체크 중 위험했으나, 배포 전 코드 재검토로 미리 발견하고 `<div id="result" style="display:none;">`로 결과 블록 전체를 다시 감싸 수정. 이후 실측: 1,000만원/7%/10년/월복리 → 최종자산 20,096,614원(CAGR 7.23%) 정확히 계산됨.

`json-formatter.html`은 fork 없이 큰 파일(656줄)을 직접 재작성 — 원본에 이미 있던 사소한 결함(`<textarea id="output" ... id="outputArea">` 중복 id 속성, 아무 데서도 참조 안 됨) 하나를 정리하며 진행, JS 로직 변경 없음. 브라우저 실측: JSON 입력 시 실시간 포맷팅·"Valid JSON" 상태 표시·키 정렬(b,a→a,b) 전부 정상 확인.

**법정세율 파일:** `inheritance-tax.html`(상속세, 일괄공제 5억/배우자공제 최대 30억/세율구간 10~50%)은 이미 전환되어 있던 걸 발견해서 git diff로 `:root` 완전 제거·`--accent:#fcd34d` 등 구 토큰 삭제만 확인, 세율 숫자 자체는 건드리지 않음.

**theme-instrument.css/js**: 이번 배치도 무결(내가 직접 작업한 3개 파일 포함 전부 공유 파일 미수정).

**누적: 152개 파일 완료** (health/date-time 22 + 배치0/1 60 + 배치2 30 + 배치3 30).

### 완료: 배치 4, 1부 (10개, 2026-07-16)
**주의: 배치 시작 전 확인 결과 배치4 앞쪽 10개(`json-minifier`~`jwt-decoder`)는 이미 다른 세션("update files" 커밋)이 전환 완료해둔 상태였음** — grep으로 확인 후 건너뜀. 이번에 실제로 전환한 건 그 다음 10개: `jwt-generator`, `keyword-cannibalization-checker`, `keyword-density-checker`, `keyword-difficulty-estimator`, `keyword-extractor`, `keyword-grouping-tool`, `line-counter`, `line-merger`, `loan-calc`, `loan-calculator-en` — fork 5개 병렬(2파일씩), **10/10 성공, 세션 한도 끊김 0건.**

**직접 검증 완료:**
- 10개 파일 전부 링크 3종(css/js/related) 각 1회, `</html>` 1회, 구 `:root{}` 잔재 0건
- Node로 인라인 `<script>` 전체 문법 재검증(JSON-LD 제외) — 전부 통과
- `theme-instrument.css` 중괄호 247/247 일치, `git diff --stat theme-instrument.css theme-instrument.js` 완전히 빈 상태(공유 파일 무수정 확인), 중복 셀렉터 스캔 결과 `.blob`(media query 재정의)·`from`/`to`(keyframes) 외 실질 충돌 0건

**패턴 메모:** 게이지 있는 페이지 없음(키워드/JWT/라인 툴은 임상 범위 개념 없음), `loan-calc.html`은 `.tabs/.tab` → `.rbtn-row/.rbtn.on` 컨벤션 전환, `keyword-difficulty-estimator.html`은 원형 score-ring을 DSR 계산기 선례처럼 page-local 유지, `csv-viewer.html`에 있던 구식 미정의 클래스(`.logo`/`.lang-btn`) 잔재를 `keyword-density-checker` fork가 발견해 정확한 테마 클래스로 교체(다른 미전환 파일에도 같은 잔재 있을 수 있음, 다음 배치에서 유의).

**누적: 162개 파일 완료** (health/date-time 22 + 배치0/1 60 + 배치2 30 + 배치3 30 + 배치4(1부, 다른세션10+이번10) 20).

### 완료: 배치 4, 2부 (10개, 2026-07-16) — 배치4(30개) 전체 완료
`ltv-calculator`, `margin-calculator`, `markdown-chat-exporter`, `markdown-preview`, `meta-description-generator`, `meta-tag-analyzer`, `meta-tag-generator`, `mime-type-finder`, `minimum-wage`, `mortgage-calculator` — fork 5개 병렬(2파일씩), **10/10 성공, 세션 한도 끊김 0건.**

**법정수치 파일 2개 특별 검증:**
- `ltv-calculator.html`: fork가 규제구간(40%/20%, 50%/30%, 70%, 9억원 기준 `NINE_EOK` 상수) 전부 diff로 byte-identical 확인. 오케스트레이터가 직접 `git diff --unified=0 | grep -E '%|원|억'`로 재확인 — CSS 스타일 값만 걸리고 실제 규제 수치는 0건 변경.
- `minimum-wage.html`: fork가 19곳 수치(10,320원/10,030원/9,288원/2,156,880원 등) diff 확인 + 오케스트레이터 직접 재확인 — CSS/뱃지 텍스트("2026 최저임금 기준")만 걸리고 숫자 변경 없음.
- `mortgage-calculator.html`: 이전 세션에 SEO FAQ 보강된 파일이라 특히 강조 지시 — fork가 `Q. ` 개수 전후 60개 동일, FAQ/seoHtml diff 0라인으로 byte-identical 확인.

**직접 검증 완료:**
- 10개 파일 전부 링크 3종(css/js/related) 각 1회, `</html>` 1회, 구 `:root{}` 잔재 0건
- Node 인라인 `<script>` 전체 문법 재검증(JSON-LD 제외) — 전부 통과
- `theme-instrument.css` 중괄호 247/247 일치, `git diff --stat theme-instrument.css theme-instrument.js` 완전히 빈 상태(공유 파일 무수정 확인)

**패턴 메모:** 탭 UI 있는 파일(`ltv-calculator`/`meta-tag-analyzer`) 계속 `.tab/.active` → `.rbtn-row/.rbtn.on` 컨벤션 통일, `meta-tag-analyzer.html`은 JS 내 하드코딩 hex(`#4ade80` 등)까지 새 팔레트 hex로 치환(점수 계산 로직 자체는 불변), `.show` 클래스 토글 → `style.display` 직접 제어로 통일하는 추세 계속(http-header-checker 선례 따름).

**누적: 172개 파일 완료** (health/date-time 22 + 배치0/1 60 + 배치2 30 + 배치3 30 + 배치4 30). **배치 4(30개) 전체 완료.**

### 완료: 배치 5, 1부 (10개, 2026-07-16)
`minimum-wage`/`mortgage-calculator`는 배치4에서 이미 전환 완료했고, `naverfc…html`은 CLAUDE.md 제외 대상이라 스킵 — 대신 `Batch 05` 목록에서 `nanoid-generator`, `nginx-config-generator`, `ngram-analyzer`, `number-converter`, `open-graph-generator`, `open-graph-preview`, `overtime-pay`, `palindrome-checker`, `parental-leave`, `password-generator` 10개로 채움.

**중간에 "Fork is not available inside a forked worker" 에러 재발** (배치3 3부에서 겪었던 것과 동일 현상) — 5번째 fork(`overtime-pay`+`palindrome-checker` 담당)가 fork-worker 컨텍스트로 오케스트레이터 자신에게 되돌아옴. 매뉴얼대로 오케스트레이터가 직접 Read/Write로 두 파일 전환(법정 가산율 1.5/0.5/2.0배·최저시급 10,320원 초기값 등 `git diff`로 byte-identical 확인). 나머지 4개 fork(`nanoid-generator`+`nginx-config-generator`, `ngram-analyzer`+`number-converter`, `open-graph-generator`+`open-graph-preview`)는 정상 완료. `parental-leave`/`password-generator` 2개는 검증 단계에서 **이미 다른 세션이 전환해둔 상태**(또는 동시 작업 중이던 백그라운드 프로세스)로 발견 — grep 재확인 후 그대로 채택.

**직접 검증 중 발견/수정한 문제:**
- `password-generator.html`: `theme-instrument.js` 링크 누락 감지 → Edit 시도 중 "파일이 읽은 이후 변경됨" 에러 발생(동시에 다른 프로세스가 같은 줄을 이미 추가하고 있었음) → 재확인 결과 이미 정상 삽입되어 있어 추가 조치 불필요.
- `nginx-config-generator.html`(css=2 검출)·`open-graph-preview.html`(`</html>` 3회 검출)은 둘 다 false positive — 각각 CSS 주석 텍스트, textarea placeholder/템플릿 리터럴 안의 문자열이었음(html-minifier 선례와 동일 패턴). 실제 구조 이상 없음.

**직접 검증 완료:** 10개 파일 전부 Node 문법검증 통과, `theme-instrument.css` 중괄호 247/247 일치, `git diff --stat theme-instrument.css theme-instrument.js` 완전히 빈 상태, `overtime-pay.html`/`parental-leave.html` 법정수치(가산수당 배율·초기값, 육아휴직 급여 수치) `git diff`로 byte-identical 확인.

**누적: 182개 파일 완료** (health/date-time 22 + 배치0/1 60 + 배치2 30 + 배치3 30 + 배치4 30 + 배치5(1부) 10).

### 완료: 배치 5, 2부 (10개, 2026-07-17)
`payslip-calc`, `pdf-compressor`, `pdf-extract-images`, `pdf-merge`, `pdf-metadata-remover`, `pdf-metadata-viewer`, `pdf-ocr`, `pdf-page-counter`, `pdf-password-adder`, `pdf-password-remover` — **10/10 완료.** `payslip-calc`/`pdf-compressor`는 검증 시작 시점에 이미 다른 세션(동시 작업 중이던 프로세스)이 전환해둔 상태로 발견 — grep 재확인 후 채택, `pdf-compressor.html`에 `theme-instrument.js` 링크가 누락돼 있어 오케스트레이터가 직접 한 줄 추가로 수정. 나머지 8개는 fork 4개 병렬(2파일씩)로 전환, 세션 한도 끊김 0건.

**직접 검증 완료:**
- 10개 파일 전부 링크 3종(css/js/related) 각 1회, `</html>` 1회, 구 `:root{}` 잔재 0건
- Node 인라인 `<script>` 전체 문법 재검증(JSON-LD 및 src 외부 스크립트 제외) — 전부 통과
- `theme-instrument.css` 중괄호 247/247 일치, `git diff --stat theme-instrument.css theme-instrument.js` 완전히 빈 상태
- `payslip-calc.html`(4대보험 요율 등 하드코딩 가능성 있는 급여명세서 계산기) — CSS/링크 값만 diff에 걸림, 요율 상수 변경 0건 확인

**패턴 메모:** PDF 처리 유틸리티(`pdf-metadata-viewer`/`pdf-password-adder` 등) 다수가 구식 미정의 클래스(`.logo`/`.lang-btn`) 잔재를 갖고 있었음 — `keyword-density-checker` 이후로도 계속 발견되는 패턴, 다음 배치에서도 유의. `pdf-metadata-viewer.html`은 fork가 page-local로 새로 만들려던 `.box`/`.section-label`이 이미 theme-instrument.css에 있는 걸 grep으로 발견해 중복 방지한 사례 있음 — "새 클래스 추가 전 grep 필수" 규칙이 실제로 작동함을 재확인.

**누적: 202개 파일 완료** (health/date-time 22 + 배치0/1 60 + 배치2 30 + 배치3 30 + 배치4 30 + 배치5(1부+2부) 30). **배치 5(30개) 전체 완료.**

### 완료: 배치 6, 1부 (10개, 2026-07-17)
`pdf-word-counter`, `percent-calc`, `pixelate-image`, `png-to-jpg`, `png-to-svg`, `pomodoro-timer`, `prepayment-fee`, `profit-calculator`, `prompt-cleaner`, `prompt-formatter` — **10/10 완료.**

**이번에도 "Fork is not available inside a forked worker" 에러 재발** — 배치 시작 직후 fork 2개 띄우자마자 발생(오케스트레이터 자신이 forked worker 컨텍스트였음). 대응: 오케스트레이터가 직접 전환 진행. `png-to-svg.html`은 확인 시점에 이미 다른 세션이 전환 완료해둔 상태 발견 — grep 재확인 후 스킵. `pdf-word-counter`/`percent-calc`는 앞서 백그라운드로 띄웠던 fork(`a5f2f6dec437bf23b`)가 정상 완료해둔 상태를 나중에 grep으로 확인(그 fork의 최종 보고 메시지는 기다리지 않고 파일 상태로 직접 판정). `prepayment-fee`/`profit-calculator`/`prompt-cleaner`/`prompt-formatter` 4개는 검증 시점에 이미 다른 동시 세션이 전환해둔 상태로 발견 — grep+diff 재확인 후 채택. 오케스트레이터가 실제로 직접 Read/Write로 처음부터 전환한 파일은 `pixelate-image.html`(blur-image.html을 그대로 참고해 거의 1:1 변환)과 `png-to-jpg.html`(배치 파일 컨버터 패턴, image-to-webp.html 참고)와 `pomodoro-timer.html`(타이머 원형 게이지 페이지) 3개뿐.

**`pomodoro-timer.html` 변환 중 주의 깊게 처리한 부분:** 세션 진행 점(`.session-dot`, 완료 세션 표시용 10px 원)이 테마 공용 헤더 로고 점(`.dot`, 6px 그라디언트 원)과 클래스명이 충돌하는 것을 발견 — `.dot` → `.session-dot`으로 리네임(마크업 JS 양쪽 다 수정), 헤더의 `.dot`은 공용 그대로 유지. 3가지 모드(집중/짧은휴식/긴휴식)별 색상 구분(빨강/초록/파랑)은 의미가 있는 정보라 `.rbtn.on` 단일 그라디언트로 강제 통일하지 않고 페이지 전용 `.mode-tab.focus/brk/lng.on` 클래스로 유지, 색상값만 테마 토큰 hex(`--danger:#F2725E`/`--good:#4FCB9A`/`--info:#4FA6E8`)로 교체(SVG 링 stroke 초기값 및 JS `MODES` 객체의 색상 리터럴도 동일 hex로 동기화 — 로직 자체는 불변, 순수 색상값 치환).

**법정수치 파일 직접 검증:** `prepayment-fee.html`(중도상환수수료, 요율 0.5/1.2/1.4/1.5%, 3년 면제, 정책금융 HF 0.5~1.2% 등)은 `git diff --unified=0`으로 전부 byte-identical 확인 — 클래스명(`qbtn`→`rbtn`, `div.faq-item`→`details.faq-item`) 변경만 있고 숫자 자체는 무변경.

**직접 검증 완료:** 10개 파일 전부 링크 3종(css/js/related) 각 1회, `</html>` 1회, 구 `:root{--bg` 잔재 0건, Node 인라인 `<script>` 문법 재검증 전부 통과, `theme-instrument.css`/`.js` `git diff --stat` 완전히 빈 상태(공유 파일 무수정).

**누적: 212개 파일 완료** (health/date-time 22 + 배치0/1 60 + 배치2 30 + 배치3 30 + 배치4 30 + 배치5 30 + 배치6(1부) 10). **커밋:** `92ae7d7` ("Convert batch 6 part 1 (10 files) to Hybrid A+ theme"), push 안 함.

### 완료: 배치 6, 2부 (10개, 2026-07-17) — 배치6(20개) 전체 완료
`property-tax`, `qr-code-generator`, `random-string`, `random-word-generator`, `read-time-calculator`, `reading-level-checker`, `realestate-fee`, `redirect-checker`, `regex-cheatsheet`, `regex-generator` — **10/10 완료.**

**이번 배치도 "Fork is not available inside a forked worker" 재발** — 배치 시작 직후 fork 2개 연속 시도 모두 즉시 이 에러로 실패, 이번엔 재시도 없이 바로 오케스트레이터가 직접 전환 진행(패턴이 이제 배치3-3부/배치5-1부에 이어 계속 반복 확인됨 — 이 세션에서는 fork가 사실상 항상 막혀있는 것으로 보고 처음부터 직접 처리하는 편이 효율적). `png-to-svg.html`은 확인 시점에 이미 다른 세션이 전환 완료해둔 상태 발견 — grep 재확인 후 스킵, 대신 목록에 없던 `property-tax`를 포함시켜 10개 채움. `pdf-word-counter`/`percent-calc`는 이전에 백그라운드로 띄웠던 fork(`a5f2f6dec437bf23b`)가 알아서 완료해둔 상태를 나중에 grep으로 확인(최종 보고 메시지 기다리지 않고 파일 상태로 직접 판정). `prepayment-fee`/`profit-calculator`/`prompt-cleaner`/`prompt-formatter` 4개도 검증 시점에 이미 다른 동시 세션이 전환해둔 상태로 발견 — grep+diff 재확인 후 채택.

**실제로 처음부터 직접 전환한 파일**(레퍼런스 없이 새로 마크업): `pixelate-image`(blur-image.html 그대로 참고, 거의 1:1), `png-to-jpg`(배치 파일 컨버터, image-to-webp.html 패턴), `pomodoro-timer`(원형 SVG 타이머 게이지 — 세션 진행점 클래스명이 테마 공용 헤더 로고 점 `.dot`과 충돌해 `.session-dot`으로 리네임), `property-tax`(종부세 계산기, income-tax.html의 `.readout`/`.tax-bracket` 패턴 재사용), `qr-code-generator`(4-tab 타입 선택 `.rbtn-row`로 통일), `random-string`/`random-word-generator`(password-generator.html의 카드+옵션+출력박스 패턴), `read-time-calculator`(`.cal-card` 4-스탯 그리드 재사용), `reading-level-checker`(Flesch/Gunning Fog/SMOG 4개 스코어 카드), `realestate-fee`(중개수수료 계산기, `.readout`+`.tabs`→`.rbtn-row` 통일), `redirect-checker`(리다이렉트 체인 빌더, 상태코드별 색상을 테마 토큰 --warn/--info/--violet/--cyan/--good으로 매핑), `regex-cheatsheet`(치트시트 그리드 — 테마의 고정 2열 `.grid`와 충돌 방지 위해 `.cheat-grid`로 분리 네이밍), `regex-generator`(패턴 버튼 그리드 + 실시간 테스터) — 총 12개.

**법정수치 파일 직접 검증:**
- `property-tax.html`(종합부동산세 2026년 기준): 공제금액(9억/12억), 누진 세율표(`calcNormal`/`calcHeavy` 배열의 0.5~2.7%/0.5~6.0% 구간), 농특세 20% — `git diff --unified=0`으로 재확인, CSS 클래스명 변경 외 숫자 리터럴 0건 변경.
- `realestate-fee.html`(중개수수료/복비): `getBuyRate`/`getLeaseRate` 함수의 요율·한도표(매매 0.6→0.4→0.7%, 전세 0.5→0.3→0.6%) 및 HTML 요율표 byte-identical `git diff` 확인 — rate/limit 숫자 리터럴이 diff에 전혀 등장하지 않음(클래스명 변경 라인만 diff에 걸림).

**패턴 메모:** `pomodoro-timer.html`처럼 페이지 전용 클래스가 테마 공용 클래스(`.dot`)와 충돌하는 사례가 계속 나옴 — 새 클래스 추가 전 grep 필수 규칙이 실제로 반복 유효함. `regex-cheatsheet.html`의 `.grid`도 테마의 고정 2열 그리드와 충돌할 뻔해서 `.cheat-grid`로 회피. 색상 팔레트가 순수 장식용(포모도로 모드탭, redirect 상태코드뱃지, random-word 단어 색상)인 경우 구식 hex를 테마 토큰(`--danger`/`--good`/`--info`/`--violet`/`--cyan`/`--warn`)으로 자연스럽게 매핑하는 패턴이 자리잡음.

**직접 검증 완료:** 10개 파일 전부 링크 3종(css/js/related) 각 1회, `</html>` 1회, 구 `:root{--bg` 잔재 0건, Node 인라인 `<script>` 문법 재검증 전부 통과, `theme-instrument.css` 중괄호 247/247 일치, `git diff --stat theme-instrument.css theme-instrument.js` 완전히 빈 상태(공유 파일 무수정 확인).

**누적: 222개 파일 완료** (health/date-time 22 + 배치0/1 60 + 배치2 30 + 배치3 30 + 배치4 30 + 배치5 30 + 배치6 30). **배치 6(30개) 전체 완료.** **커밋:** `a7baa65` ("Convert batch 6 part 2 (10 files) to Hybrid A+ theme -- batch 6 complete"), push 안 함.

### 완료: 배치 6 최종 마무리 (10개, 2026-07-17, 세션 3개 병행 상황에서 진행)
이 세션에서 batch 6 part1(10개, 이미 다른 세션이 커밋 `92ae7d7`) 확인 후 이어서 fork 5개(2파일씩)를 띄워 `prompt-optimizer`/`prompt-template-generator`/`prompt-variable-extractor`/`regex-generator`/`regex-tester`/`remove-duplicate-lines`/`remove-duplicate-words`/`remove-empty-lines`/`remove-special-characters`/`rent-convert` 10개를 진행하던 중, **세션 사용량 한도(4:20am 리셋) 도달로 fork 6개 전부 중도 종료**. 동시에 별도 세션이 `property-tax`~`regex-generator` 10개를 자체적으로 완료·커밋(`a7baa65`, "batch 6 part 2 -- batch 6 complete"라고 표기했으나 실제로는 8개 파일이 아직 미완이었음).

**오케스트레이터가 직접 잔여 작업 정리:**
- fork 6개가 죽으며 남긴 상태를 grep으로 실사 확인 → `prompt-template-generator`/`regex-tester`/`rent-convert` 3개는 CSS 링크는 됐지만 `theme-instrument.js` 스크립트 태그 추가 직전에 끊김 → 직접 한 줄씩 추가해 마무리.
- `remove-duplicate-lines.html`은 fork가 시작도 못 하고 끊긴 상태(구 `:root{}` 스타일 그대로) → 오케스트레이터가 직접 처음부터 `theme-instrument.css` 링크+마크업 재작성(`.box`/`.editor-wrap`/`.editor-box`/`.opt-label`/`.copy-small` 재사용, `_i18n`/SEO FAQ/JSON-LD 전부 그대로 보존).
- `regex-generator.html`은 다른 세션 커밋본과 내 fork 결과가 완전히 동일해 충돌 없음(git diff 0).
- 나머지 6개(`prompt-optimizer`/`prompt-variable-extractor`/`remove-duplicate-words`/`remove-empty-lines`/`remove-special-characters`)는 fork가 끊기기 전에 이미 정상 완료해둔 상태 확인.

**batch 6 파일 목록 재검산 결과 실제로는 29/30이었고 `retirement-calc.html` 1개가 완전히 누락돼 있었음** (다른 세션의 "batch 6 complete" 표기가 부정확했음) — 오케스트레이터가 직접 전환: `.card`/`.section-label`/`.cal-grid`/`.cal-card`/`.field-label`/`.input-wrap`/`.unit`/`.calc-btn` 등 기존 테마 클래스 재사용, `result-hero`/`fire-box`/`fire-row`/`notice`는 페이지 전용 supplemental style로 유지(테마 토큰 `--violet`/`--cyan`/`--glass-border` 등 사용). 은퇴자금 계산 로직(4% 룰, FIRE 배수, 물가·수익률 복리식) 전부 불변 확인, `git diff`로 CSS 라인만 걸리고 숫자 리터럴 무변경 확인.

**직접 검증 완료(10개 전부):** 링크 3종(css/js/related) 각 1회, `</html>` 1회, 구 `:root{--bg` 잔재 0건, Node 인라인 `<script>` 문법 재검증 전부 통과, `theme-instrument.css` 중괄호 247/247 일치, `git diff --stat theme-instrument.css theme-instrument.js` 완전히 빈 상태.

**주의 — `retirement-pension.html`은 이 커밋에서 제외함:** 검증 도중 또 다른 동시 세션이 이 파일을 한창 편집 중인 상태(uncommitted, `theme-instrument.css` 링크는 있지만 다른 세션 소유)로 발견 — 충돌 방지를 위해 손대지 않고 그대로 둠, 다음 세션에서 그 파일이 완료·커밋됐는지 먼저 확인할 것.

**누적: 232개 파일 완료** (health/date-time 22 + 배치0/1 60 + 배치2 30 + 배치3 30 + 배치4 30 + 배치5 30 + 배치6 30). **배치 6(30개) 진짜 전체 완료.**

### 완료: 배치 7, 1부 (11개, 2026-07-17)
`retirement-pension`(다른 세션이 편집 중이던 걸 이어받음), `robots-txt-generator`, `robots-txt-validator`, `roi-calculator`, `rsa-key-generator`, `salary-negotiation`, `salary-per-hour-calculator`, `salary-raise`, `salary-reverse`, `salary`, `savings-calc` — **11/11 완료.**

`retirement-pension.html`은 이전 배치 마무리 시점에 다른 세션이 편집 중이라 제외했었는데, 이번 배치 시작 시 재확인하니 `theme-instrument.js` 스크립트 태그 추가 직전에 그 세션도 끊긴 상태였음(누적된 패턴과 동일) — 오케스트레이터가 한 줄 추가로 마무리, `git diff`로 DC형 수익률 3/5/7% 등 옵션 버튼 수치 무변경 확인. 나머지 10개는 fork 5개(2파일씩) 병렬로 전환, 이번엔 세션 한도 끊김 없이 5개 전부 정상 완료.

**법정/고정수치 파일 검증:**
- `salary.html`(연봉 실수령액, CLAUDE.md에 연 1회 점검 필요 파일로 명시된 4대보험 요율 보유): 4.75%/3.595%/13.14%/0.9%/10% 등 요율과 `getIncomeTax()` 세율구간, `calc()` 로직 전부 `git diff`로 byte-identical 확인. 구형 `div.faq-item`/`.faq-q`/`.faq-a` 마크업은 CLAUDE.md가 "구형 KO 툴 혼용 허용"으로 명시한 그대로 유지(신규 `<details>` 형식 강제 안 함).
- `salary-per-hour-calculator.html`: 최저시급 10,320원 초기값 무변경 확인.
- `salary-raise.html`/`salary-reverse.html`: 소득세 4.75%/3.595%/13.14%/0.9% 등 보험료율 byte-identical, 역산 계산 알고리즘(이진 탐색) 로직 불변. 두 파일 모두 구형 `div.faq-item` → `<details class="faq-item">` 형식으로 전환하며 텍스트는 그대로 옮김(내용 변경 없음). `.show` 클래스 토글이 죽어있던 잠재 버그(구 CSS `.show` 룰 삭제로 무력화됨)를 fork가 발견해 `style.display` 직접 제어로 수정.

**사소한 i18n 버그 직접 발견 및 수정:** `savings-calc.html`의 h1 다국어 문자열(`_i18n.ko/en/zh/ja.h1`)에 `<span>`/`<br>` 마크업이 빠져 있어 언어 전환 시 그라디언트 강조와 줄바꿈이 사라지는 버그 발견(bmi-calc/percent-calc에서 이미 고쳤던 것과 동일 패턴) — 4개 언어 전부 정적 마크업(`<span>적금 만기</span><br>계산기`)과 일치하도록 수정.

**직접 검증 완료:** 11개 파일 전부 링크 3종(css/js/related) 각 1회, `</html>` 1회, 구 `:root{--bg` 잔재 0건, Node 인라인 `<script>` 문법 재검증 전부 통과, `theme-instrument.css` 중괄호 247/247 일치, `git diff --stat theme-instrument.css theme-instrument.js` 완전히 빈 상태(공유 파일 무수정 확인). 이번 배치는 다른 세션과 파일 충돌 0건.

**누적: 243개 파일 완료** (health/date-time 22 + 배치0/1 60 + 배치2 30 + 배치3 30 + 배치4 30 + 배치5 30 + 배치6 30 + 배치7(1부) 11).

### 완료: 배치 7, 2부 (10개, 2026-07-17)
`schema-markup-generator`, `schema-validator`, `sentence-counter`, `seo-title-generator`, `serp-snippet-preview`, `severance-tax`, `severance`, `sip-calculator`, `sitemap-extractor`, `sitemap-generator` — **10/10 완료.**

**이번 배치는 다른 세션과의 동시편집 경쟁이 가장 심했던 배치.** 첫 fork(`schema-markup-generator`+`schema-validator`)를 띄웠는데 "Fork is not available inside a forked worker" 없이도 백그라운드로 안 가고 오케스트레이터 자신의 턴 안에서 인라인으로 실행되는 새로운 패턴 발견(이전엔 명시적 에러가 떴는데 이번엔 조용히 인라인 실행됨) — 두 파일 다 오케스트레이터가 직접 전환. 그 다음 `sentence-counter`~`sitemap-generator` 7개는 확인해보니 이미 다른 세션이 전환 완료해 있어 grep+diff 재확인 후 채택. `sip-calculator.html`은 검증 도중 실시간으로 다른 세션이 계속 편집 중이라(Edit 시도 3회 연속 "파일이 읽은 이후 변경됨" 충돌) 매번 재확인 후 이어감 — 최종적으로 다른 세션이 CSS+본문 마크업 대부분을 완성해뒀고, 오케스트레이터는 (1) 중간에 죽은 미사용 CSS 잔재(summary-grid/s-item 등, 마크업이 이미 cal-grid로 바뀌어 안 쓰던 것) 정리, (2) 누락된 `theme-instrument.js` 링크 추가, (3) `ko`/`en`/`zh` 언어는 이미 고쳐져 있었지만 `ja` h1 문자열에만 `<span>` 누락돼 있던 걸 발견해 마저 수정.

**법정/세율 파일 검증:** `severance-tax.html`/`severance.html`(퇴직소득세) `git diff --unified=0 | grep -E '%|원|만원'`로 CSS 스타일 값만 걸리고 세율·공제 로직 숫자는 0건 변경 확인.

**직접 검증 완료:** 10개 파일 전부 링크 3종(css/js/related) 각 1회, `</html>` 1회, 구 `:root{--bg` 잔재 0건, Node 인라인 `<script>` 문법 재검증 전부 통과, `theme-instrument.css` 중괄호 247/247 일치, `git diff --stat theme-instrument.css theme-instrument.js` 완전히 빈 상태.

**누적: 263개 파일 완료** (health/date-time 22 + 배치0/1 60 + 배치2 30 + 배치3 30 + 배치4 30 + 배치5 30 + 배치6 30 + 배치7 20). **배치 7(30개) 전체 완료.**

### 정정: 배치 7 실제로는 21/30이었음 — 진짜 잔여 9개 완료 (2026-07-17)
바로 위 "배치 7(30개) 전체 완료" 표기가 배치6과 동일한 패턴으로 부정확했음 — 실제로는 `sitemap-validator`부터 `ssh-key-generator`까지 9개가 완전히 미착수 상태였음(grep으로 직접 확인, `theme-instrument.css` 링크 0건). fork 5개(2파일씩, 1개는 단독)로 전환: `sitemap-validator`, `slug-generator`, `split-calculator`, `sql-formatter`, `sql-minifier`, `sql-query-explainer`, `sql-to-json`, `sql-validator`, `ssh-key-generator` — **9/9 완료, 세션 한도 끊김 0건.**

**주목할 점:**
- `split-calculator.html`: 4개 언어 h1 문자열에 `<span>` 누락돼 있던 그라디언트 버그 발견·수정(bmi-calc/percent-calc/savings-calc/sip-calculator에서 반복 확인된 동일 패턴).
- `sql-validator.html`: 테마의 `.result-box`(가운데 정렬 단일 라인용)와 충돌 방지 위해 다중 라인 출력을 `.sql-result`로 페이지 전용 분리.
- `ssh-key-generator.html`: 실제 키 생성 없이 `ssh-keygen` 명령어 문자열만 생성하는 도구라 `rsa-key-generator.html`의 pub/priv 2패널 컨벤션은 미적용, 대신 `badge-green/blue/purple` → `badge pass/info/violet`로 통일.

**직접 검증 완료:** 9개 파일 전부 링크 3종(css/js/related) 각 1회, `</html>` 1회, 구 `:root{--bg` 잔재 0건, Node 인라인 `<script>` 문법 재검증 전부 통과, `theme-instrument.css` 중괄호 247/247 일치, `git diff --stat theme-instrument.css theme-instrument.js` 완전히 빈 상태.

**누적: 272개 파일 완료** (health/date-time 22 + 배치0/1 60 + 배치2 30 + 배치3 30 + 배치4 30 + 배치5 30 + 배치6 30 + 배치7 30). **배치 7(30개) 이번엔 진짜로 전체 완료.**

**교훈 재확인:** 이 세션에서만 배치6·배치7 두 번 연속으로 "배치 완료" 커밋 메시지가 부정확했음(둘 다 실제로는 파일 하나 이상 누락). **앞으로 모든 배치는 "완료" 표기 전에 반드시 `ROLLOUT_REMAINING_BATCHES.txt`의 전체 파일 목록과 grep 결과를 1:1 대조할 것** — fork/세션의 자체 보고나 이전 커밋 메시지를 절대 신뢰하지 말 것.

### 완료: 배치 8, 1부 (10개, 2026-07-17)
`ssl-checker`, `ssl-decoder`, `stock-tax`, `stopword-remover`, `svg-cleaner`, `svg-to-png`, `svg-viewer`, `system-prompt-generator`, `tailwind-color-generator`, `text-case-detector` — **10/10 완료, 이번 배치는 다른 세션과 충돌 0건(전부 오케스트레이터가 처음부터 직접 전환).**

이번 배치 시작 시 Agent(fork) 호출이 즉시 "Fork is not available inside a forked worker" 에러를 반환 — 재시도 없이 바로 오케스트레이터가 10개 전부 Read/Edit로 순차 전환. `ssl-checker`/`ssl-decoder`/`stock-tax`(주식 양도세, 250만원 기본공제·22%/20%/30%/10% 세율)/`stopword-remover`/`svg-cleaner`/`svg-to-png`/`svg-viewer`/`system-prompt-generator`/`tailwind-color-generator`/`text-case-detector` 모두 `<header>`+`<main>` 구조가 없던 구형 레이아웃(div만 존재)이라 `<main>` 래퍼를 새로 추가하고 `</main>` 닫는 태그 위치를 직접 확인. `.drag`→`.dragover` 클래스명 통일(svg-cleaner/svg-to-png 드롭존), `.tab`/`.preset-btn`→`.rbtn-row`/`.rbtn` 통일(stock-tax 탭, system-prompt-generator 프리셋 버튼) 계속 적용.

**법정수치 파일:** `stock-tax.html`(해외주식·국내대주주·비상장주식 양도세) — `git diff --unified=0`으로 250(기본공제)·0.20/0.30/0.10(세율) 등 JS 상수 재확인, CSS 클래스명 변경만 diff에 걸림.

**직접 검증 완료:** 10개 파일 전부 링크 3종(css/js/related) 각 1회, `</html>` 1회, 구 `:root{--bg` 잔재 0건, Node 인라인 `<script>` 문법 재검증 전부 통과, `theme-instrument.css` 중괄호 247/247 일치, `git diff --stat theme-instrument.css theme-instrument.js` 완전히 빈 상태.

**누적: 273개 파일 완료** (health/date-time 22 + 배치0/1 60 + 배치2 30 + 배치3 30 + 배치4 30 + 배치5 30 + 배치6 30 + 배치7 30 + 배치8(1부) 10).

### 완료: 배치 8, 2부 (14개, 2026-07-17)
`text-cleaner`, `text-diff-checker`, `text-encryptor`, `text-merger`(4개는 확인 시점에 이미 다른 세션이 완료해둔 상태 — grep 재확인 후 채택), `text-reverser`, `text-shuffler`, `text-similarity-checker`, `text-sorter`, `text-statistics`, `text-summarizer`, `time-zone-meeting-planner`, `tip-calculator`, `transparent-background-maker`, `twitter-card-generator` — **14/14 완료.**

**동시편집 경쟁이 심한 배치.** fork 5개를 띄웠는데 `text-reverser`/`text-shuffler`는 다른 세션과 실시간으로 파일을 주고받으며 "파일이 읽은 이후 변경됨" 충돌이 여러 번 발생 — 최종적으로 다른 세션이 마크업 대부분을 끝내둔 상태였고 fork는 `setMode()`의 `'active'`→`'on'` 클래스 버그만 마저 수정. `text-sorter.html`은 편집 도중 중복 `<script src="theme-instrument.js">` 태그가 생겼던 걸(동시편집 잔재로 추정) fork가 발견해 제거.

**실제 기능 버그 발견·수정:**
- `time-zone-meeting-planner.html`: 범례 점 인라인 스타일이 새 테마에 없는 구 토큰(`var(--green)`/`var(--accent)`)을 참조하던 걸 발견해 `--good`/`--cyan`으로 교체.
- `tip-calculator.html`: 마크업은 `.rbtn`/`.on`으로 바뀌었는데 JS(`setTip()`/`customTipInput()`)가 여전히 구 클래스(`.tip-btn`/`.active`)를 참조하고 있어 팁 비율 프리셋 버튼 하이라이트가 조용히 깨져 있던 실제 버그를 fork가 발견해 수정. 같은 파일에서 h1 그라디언트 span 누락 버그(반복 패턴)도 함께 수정.

**직접 검증 완료:** 14개 파일 전부 링크 3종(css/js/related) 각 1회, `</html>` 1회, Node 인라인 `<script>` 문법 재검증 전부 통과, `theme-instrument.css` 중괄호 247/247 일치, `git diff --stat theme-instrument.css theme-instrument.js` 완전히 빈 상태. Git 커밋 로그도 재확인해 다른 세션의 예상외 커밋 없음을 확인(오래 지연되어 돌아온 fork 응답 하나가 "committing"이라 언급했으나 실제 커밋은 발생하지 않았음 — 착각 소지 있는 응답이었을 뿐).

**누적: 296개 파일 완료** (health/date-time 22 + 배치0/1 60 + 배치2 30 + 배치3 30 + 배치4 30 + 배치5 30 + 배치6 30 + 배치7 30 + 배치8(1부+2부) 24).

### 완료: 배치 8 마지막 6개 — 배치 8(30개) 진짜 전체 완료 (2026-07-17)
`typing-speed-test`, `ulid-generator`, `unemployment`, `unicode-converter`, `unicode-inspector`, `unit-converter` — **6/6 완료.**

**세션 한도 재도달(리셋 10:10am) — 2개 fork(4파일 담당) 전부 시작도 못 하고 즉시 종료됨.** grep으로 확인 결과 6개 파일 전부 완전 미착수 상태(theme-instrument.css 링크 0건) — fork 자체 보고를 기다리지 않고 바로 오케스트레이터가 직접 Read/Write로 6개 전부 처음부터 전환.

**주목할 점:**
- `typing-speed-test.html`/`unit-converter.html`: 4-카테고리 탭(`unit-converter`)과 4-스탯 바(`typing-speed-test`)를 각각 `.rbtn-row`/`.rbtn.on`, `.cal-grid`/`.cal-card`(`.cal-val`/`.cal-label` 정확한 클래스명 사용)로 통일. `setCat()` JS의 `.cat-btn`/`active` 클래스 참조도 `.rbtn`/`on`으로 동기화.
- `unemployment.html`(실업급여, 법정수치 파일): 상한 68,100원/하한 66,048원/나이·가입기간별 지급일수 테이블(120~270일) 등 `dayTable` 상수와 텍스트 내 명시된 최저시급 10,320원 — `git diff`에 CSS 클래스명 변경 라인만 걸리고 숫자 리터럴은 diff에 전혀 등장하지 않음(무변경 확인). 구형 `div.faq-item` 형식은 CLAUDE.md 허용대로 유지.
- `unicode-inspector.html`: 테마의 기존 `.chip-btn`/`.chip-val` 조합과 충돌 방지 위해 페이지 자체 통계 pill을 `.stat-chip`으로 분리 명명(JS 템플릿 리터럴도 함께 수정).
- 6개 파일 전부 `_i18n` 객체·`applyLang`/`cycleLang` 로직, 정적 SEO/FAQ 텍스트, JSON-LD, GA/AdSense 완전 불변.

**직접 검증 완료:** 6개 파일 전부 링크 3종(css/js/related) 각 1회, `</html>` 1회, 구 `:root{--bg` 잔재 0건, Node 인라인 `<script>` 문법 재검증 전부 통과, `theme-instrument.css` 중괄호 247/247 일치, `git diff --stat theme-instrument.css theme-instrument.js` 완전히 빈 상태.

**누적: 302개 파일 완료** (health/date-time 22 + 배치0/1 60 + 배치2 30 + 배치3 30 + 배치4 30 + 배치5 30 + 배치6 30 + 배치7 30 + 배치8 30). **배치 8(30개) 진짜 전체 완료.**

### 다음 세션(또는 다음 배치)에서 이어갈 것: 배치 9부터
`ROLLOUT_REMAINING_BATCHES.txt` "Batch 09"(27개)부터 10개씩. 방법론은 위 "방법론 (배치 0/1에서 확립됨)" 섹션 + theme-instrument.css/js 동시수정 금지 규칙 그대로. **주의: 매 배치 시작 전에 grep으로 해당 파일들이 이미 다른 세션에 의해 전환돼 있지 않은지 먼저 확인할 것** (세션 여러 개가 동시에 병행 작업 중인 것으로 확정됨). **"배치 완료" 표기는 절대 커밋 메시지나 fork 자체보고만으로 믿지 말고, 매번 `ROLLOUT_REMAINING_BATCHES.txt` 전체 목록 대 grep 결과 1:1 대조로 확정할 것** (배치6·배치7에서 반복적으로 파일 누락 상태에서 "완료"로 잘못 표기된 전례 있음). **세션 사용량 한도가 이 세션에서만 이미 2회 발생(4:20am, 10:10am 리셋) — fork가 죽으면 자체 보고를 기다리지 말고 즉시 grep으로 실제 상태 판정 후 오케스트레이터가 직접 Read/Write로 마무리할 것, 재시도로 시간 낭비하지 말 것.** Agent 호출이 매번 정상적으로 백그라운드 fork를 띄운다는 보장이 없음 — "Fork is not available inside a forked worker" 에러가 뜨거나 호출 직후 결과가 바로 텍스트로 돌아오면(비동기 알림이 아니라) 그건 인라인 실행된 것이므로 오케스트레이터가 직접 Read/Edit로 계속 진행하면 됨.

**⚠️ 세션 시작 시 권한 확인:** 이 세션은 사용자가 `--dangerously-skip-permissions`로 시작했다고 확인했으나, 실행 중 harness가 일부 tool(Agent/fork spawn 등)에 대해 승인 팝업을 띄우는 현상이 있었음(원인 불명 — flag 자체 문제인지 harness 설정 문제인지 미확정). **다음 세션 시작 시 사용자가 `claude --dangerously-skip-permissions`로 재실행했는지, 그리고 fork 배치 작업 중 승인 팝업이 안 뜨는지 먼저 확인할 것.** 팝업이 계속 뜨면 배치당 fork 5개 병렬 실행이 매번 수동 승인을 요구하게 되어 무인 진행이 불가능해짐 — 이 경우 사용자에게 원인 확인 요청.

### 완료: 배치 9, 1부 (10개, 2026-07-17)
`url-decoder`, `url-encoder`, `user-agent-parser`, `utm-builder`, `uuid-converter`, `uuid-extractor`, `uuid-generator`, `uuid-validator`, `vat-calc`, `vat-calculator-global` — **10/10 완료.**

**이 배치부터 새로운 패턴 발견: Agent(fork) 호출이 "Fork started — processing in background"라고 응답한 뒤, 다음 호출부터는 명시적으로 "Fork is not available inside a forked worker" 에러가 뜸 — 즉 오케스트레이터 자신이 어느 순간부터 포크 워커 컨텍스트 안에 있었음이 확인됨.** `uuid-converter`+`uuid-extractor`는 그 직전 호출이 인라인으로 즉시 실행되어 오케스트레이터가 직접 처리, 이후 `uuid-generator`+`uuid-validator`용 fork 호출은 즉시 에러 반환 → 오케스트레이터가 직접 확인해보니 `uuid-generator.html`은 이미 다른 세션이 완료해둔 상태, `uuid-validator.html`은 `theme-instrument.js` 링크만 누락돼 있어 한 줄 추가로 마무리. `vat-calc.html`도 이미 다른 세션이 완료, `vat-calculator-global.html`도 같은 누락 패턴이라 한 줄 추가.

**주목할 점:** `vat-calc.html`은 `.rate-btn`/`active` → `.rbtn`/`on`으로 통일하며 10%/0% 등 세율 값 자체는 `git diff`로 무변경 확인. `vat-calculator-global.html`(글로벌 40개국 VAT/GST 세율표)은 국가별 세율 리터럴(UK 20%/5%, 독일 19→20%, 프랑스 20%, 이탈리아 22%, 호주 GST 10% 등)이 diff에 전혀 등장하지 않아 무변경 확인.

**직접 검증 완료:** 10개 파일 전부 링크 3종(css/js/related) 각 1회, `</html>` 1회, Node 인라인 `<script>` 문법 재검증 전부 통과, `theme-instrument.css` 중괄호 247/247 일치, `git diff --stat theme-instrument.css theme-instrument.js` 완전히 빈 상태.

**누적: 312개 파일 완료** (health/date-time 22 + 배치0/1 60 + 배치2 30 + 배치3 30 + 배치4 30 + 배치5 30 + 배치6 30 + 배치7 30 + 배치8 30 + 배치9(1부) 10).

### 완료: 배치 9 나머지 17개 — 배치 9(27개) 진짜 전체 완료 (2026-07-17)
`webhook-generator`, `webhook-tester`, `webp-to-jpg`, `webp-to-png`, `website-speed-estimator`, `weekly-holiday`, `whois-lookup`, `word-counter`, `word-frequency-counter`, `wpm-calculator`, `xml-formatter`, `xml-to-json`, `xml-validator`, `yaml-diff-checker`, `yaml-formatter`, `yaml-to-json`, `yaml-validator`, `youtube-script-generator` — **17/17 완료.**

**세션 여러 개가 동시에 이 배치를 처리 중이었음이 실시간으로 확인됨** — 오케스트레이터가 fork를 띄우는 사이 다른 세션이 `webhook-generator`~`wpm-calculator`(10개)와 `xml-formatter`+`xml-to-json`을 이미 커밋 완료(각각 2파일 단위 개별 커밋). fork 호출 하나(`xml-to-json`+`xml-validator` 담당)는 "Fork started — processing in background" 응답 후 즉시 오케스트레이터 자신이 그 fork 워커 컨텍스트로 전환되는 새로운 패턴 발견 — 재시도 없이 그 자리에서 직접 두 파일 전환 완료.

**race condition 직접 목격 및 수정:**
- `xml-to-json.html`: 편집 도중 다른 세션이 이미 완료해둔 상태를 발견, 오케스트레이터의 CSS 정리 편집이 실수로 아직 마크업에서 참조 중이던 `.cols` 그리드 규칙을 지워버림 — 즉시 grep으로 발견해 페이지 전용 스타일로 복원.
- `xml-formatter.html`/`yaml-formatter.html`: 오케스트레이터와 다른 세션이 거의 동시에 각각 누락된 `theme-instrument.js` 링크를 추가해 중복 `<script>` 태그가 생겼던 것을 재확인 과정에서 발견·제거(`yaml-formatter.html`은 재확인 시점에 이미 다른 세션이 직접 고쳐둔 상태였음).

**직접 전환:** `xml-validator.html`은 테마의 `.status`/`.status.ok`/`.status.err`(결과 배너), `.cal-grid`/`.cal-card`(요소·속성·깊이 통계)로 재구성, JS의 `banner.className` 값과 `var(--green)` 하드코딩 색상 참조를 각각 `status ok/err`, `var(--good)`로 수정.

**직접 검증 완료:** 17개 파일 전부(재확인 포함) 링크 3종(css/js/related) 각 1회, `</html>` 1회, 구 `:root{--bg` 잔재 0건, Node 인라인 `<script>` 문법 재검증 전부 통과, `theme-instrument.css` 중괄호 247/247 일치, `git diff --stat theme-instrument.css theme-instrument.js` 완전히 빈 상태.

**누적: 329개 파일 완료** (health/date-time 22 + 배치0/1 60 + 배치2 30 + 배치3 30 + 배치4 30 + 배치5 30 + 배치6 30 + 배치7 30 + 배치8 30 + 배치9 27). **배치 9(27개) 진짜 전체 완료.**

### 다음 세션(또는 다음 배치)에서 이어갈 것: 배치 10부터
`ROLLOUT_REMAINING_BATCHES.txt` "Batch 10"부터 10개씩(마지막 배치까지 이 방식 반복). 방법론은 위 섹션들 + theme-instrument.css/js 동시수정 금지 규칙 그대로. **주의: 매 배치 시작 전에 grep으로 해당 파일들이 이미 다른 세션에 의해 전환돼 있지 않은지 먼저 확인할 것** (세션 여러 개가 동시에 병행 작업 중인 것으로 확정됨 — 배치9에서 실시간으로 파일 하나를 두 세션이 거의 동시에 고치는 경우까지 발생함). **"배치 완료" 표기는 절대 커밋 메시지나 fork 자체보고만으로 믿지 말고, 매번 전체 목록 대 grep 결과 1:1 대조로 확정할 것.** **Agent(fork) 호출이 "processing in background"라고 답하고 나서 이후 호출부터 "Fork is not available inside a forked worker" 에러가 뜨거나, 응답이 즉시 텍스트로 돌아오는 경우, 오케스트레이터 자신이 fork 워커 컨텍스트로 전환된 것 — 이후엔 재시도 없이 바로 오케스트레이터가 직접 Read/Write로 나머지 파일을 처리할 것.**

## 참고 — 이전에 나온 별도 이슈(디자인 컨셉과 무관, 아직 미착수)
현재 CLAUDE.md에 없는, 이번 세션에서 fable5 에이전트가 지적한 기존 실행 버그들(별도 작업 필요):
- index.html에 검색 기능 없음 (327개 카드, 필터칩만 있음)
- `related.js` 하드코딩 앰버 hex → 다른 팔레트 페이지에서 시각적으로 튐
- `.seo p` / `.faq-item p` 텍스트 색상이 `--text-dim`(대비율 약 2:1, WCAG 실패 수준)
- 이모지 아이콘 중복·텍스트 문자열 아이콘 혼용, `c8` 클래스 미정의(dead hover), 툴 개수 표기 불일치(336/394/327)
