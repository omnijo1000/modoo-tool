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

## 참고 — 이전에 나온 별도 이슈(디자인 컨셉과 무관, 아직 미착수)
현재 CLAUDE.md에 없는, 이번 세션에서 fable5 에이전트가 지적한 기존 실행 버그들(별도 작업 필요):
- index.html에 검색 기능 없음 (327개 카드, 필터칩만 있음)
- `related.js` 하드코딩 앰버 hex → 다른 팔레트 페이지에서 시각적으로 튐
- `.seo p` / `.faq-item p` 텍스트 색상이 `--text-dim`(대비율 약 2:1, WCAG 실패 수준)
- 이모지 아이콘 중복·텍스트 문자열 아이콘 혼용, `c8` 클래스 미정의(dead hover), 툴 개수 표기 불일치(336/394/327)
