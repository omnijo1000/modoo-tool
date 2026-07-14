# 최종 검수 — "3회 반려시킨 심사관"의 눈으로 재감사

감사일: 2026-07-14 · 목적: 통과 확인이 아니라 반려 사유 발굴. 발견된 문제는 수정하지 않고 보고만 함.

---

## 1. 리다이렉트 무결성

### 1-1. 67건 전수 확인 결과
67개 pair 전부에서 `<link rel="canonical">`, `<meta http-equiv="refresh">`, `location.replace()` 세 요소가 모두 정확한 target을 가리키는 것을 확인함. 누락·오타 0건.

### 1-2. ⚠️ 이것은 진짜 301이 아니다 (반려 사유로 명시 보고)
사이트는 GitHub Pages(CNAME=modoohub.com)에 호스팅되며 **서버사이드 리다이렉트 기능이 없다** (.htaccess는 GH Pages에서 무시되고, vercel.json/netlify _redirects는 애초에 이 플랫폼과 무관). 그 결과 이번 세션이 구현한 67건의 "리다이렉트"는 전부:
- `<link rel="canonical" href="...">`
- `<meta http-equiv="refresh" content="0;url=...">`
- `<script>location.replace('...')</script>`

세 가지 조합으로, **실제 HTTP 301 응답이 아니다.** 이것을 문제로 명시한다:
- Google은 0초 meta refresh를 대체로 301에 준해 처리하지만, 공식적으로는 "soft redirect" 신호로 분류하며 완전히 동일하게 취급한다는 보장이 없다. 링크 에쿼티(link equity) 이전이 진짜 301보다 약하거나 불완전할 수 있다.
- 페이지가 브라우저에서 열리는 순간 실제로 렌더링(300ms 이내라도)된 뒤 JS로 이동하므로, 논 JS 크롤러나 첫 스냅샷 캡처 시점에 따라 "빈 리다이렉트 안내 페이지"가 색인되거나 캐싱될 위험이 이론상 존재한다.
- **심사관 관점에서 가장 중요한 지점**: 사람이 직접 old URL(예: bmi-calculator.html)을 방문하면 진짜 301처럼 즉시 이동하지 않고 "Redirecting to ... " 안내 문구가 있는 중간 화면이 아주 짧게라도 존재한다. 심사관이 구형 URL을 캐시나 이전 스크린샷에서 찾아 직접 열어볼 경우 "죽은 페이지처럼 보이는 리다이렉트 안내 페이지"로 인식할 여지가 있다.

**결론: 이 항목은 구조적 한계(호스팅 제약)이지 이번 작업의 실수는 아니다. 그러나 재심사 시 심사관이 최소 1~2개의 구형 URL을 직접 열어볼 가능성이 있고, 그 경우 "진짜 301이 아님"이 드러난다는 리스크는 남아있다.** GitHub Pages를 벗어나 Cloudflare Pages(Redirects 지원) 또는 Vercel/Netlify로 이전하지 않는 한 근본 해결 불가.

### 1-3. 체인/루프 검사
- `to` 슬러그가 다시 다른 pair의 `from`으로 사용된 경우: **0건** (체인 없음)
- 자기 자신을 가리키는 self-loop: **0건**
- 중복 `from` 매핑: **0건**
- `to` 타겟 파일 자체가 리다이렉트 스텁인 경우(끊긴 체인): **0건**

이 항목은 완전히 클린함.

---

## 2. 내부 링크 정합성

### 2-1. href/URL 형태의 링크
전체 루트 *.html, /category/*.html, /guides/*.html, related.js를 대상으로 제거된 67개 slug를 href/url 패턴으로 스캔 — **0건 검출**.

### 2-2. 텍스트(비링크) 형태의 잔존 참조 — ⚠️ 발견됨
href는 아니지만 FAQ 답변 텍스트 안에 제거된 도구 이름을 언급하는 경우가 남아있음. 링크는 안 걸려 있으니 "깨진 링크"는 아니지만, **사용자가 그 이름으로 검색하거나 안내를 따라가면 더 이상 존재하지 않는 개념의 페이지 이름을 만나게 되는 콘텐츠 정합성 문제**임:

| 파일 | 문제 |
|---|---|
| `cron-generator.html` | FAQ 답변에 "cron-validator 도구로 유효성도 검사하세요"라고 안내 — cron-validator.html은 이번 세션에 cron-parser.html로 병합됨 |
| `image-color-extractor.html` (ko/en/zh/ja 4개 언어 전부) | "hex-to-rgb 도구로 변환할 수 있습니다" 안내 — hex-to-rgb.html은 color-converter.html로 병합됨 |
| **`text-encryptor.html` (ko×2/en/zh/ja = 5곳) — 🔴 심각** | "text-decryptor.html에서 같은 비밀번호와 AES-256-GCM 방식을 선택하여 복호화합니다"라고 안내하지만, **text-decryptor.html은 이번 세션에 text-encryptor.html로 리다이렉트됨 — 즉 "복호화하려면 여기로 가세요"라고 안내된 곳이 지금 보고 있는 바로 이 페이지로 되돌아온다.** 게다가 실제로 확인한 결과 text-encryptor.html에는 `doEncrypt()` 함수만 있고 **복호화(decrypt) 기능 자체가 없다.** 즉 이 병합은 콘텐츠 중복 제거가 아니라 **실제 기능 손실**이다 — 사용자가 AES-256/Caesar/ROT13으로 암호화한 텍스트를 복호화할 방법이 사이트에서 사라졌다. 이건 단순 문구 수정이 아니라 기능 복구(decrypt UI 추가) 또는 병합 롤백이 필요한 수준. |

### 2-3. category-i18n.js의 죽은 데이터
`TOOL_NAMES` 객체(262번째 줄~)에 제거된 4개 slug의 이름 레이블이 그대로 남아있음: `base64-url.html`, `bmi-calculator.html`(레이블이 "BMI 계산기 (Pro)"로 되어있어 유료/구버전이 있었던 흔적으로 보임), `keyword-density.html`, `qr-generator.html`. related.js의 CATEGORY_MAP/T{}/GROUPS[]는 이번 세션에 정리됐지만 **category-i18n.js의 이 별도 테이블은 정리 대상에서 누락**됐다. 현재 화면에 렌더링되는 곳을 찾지 못했으므로 기능적으로 깨진 건 아니지만(죽은 데이터), 정리 누락임은 명백함.

### 2-4. index.html / category/*.html 카드 목록
제거된 67개 slug 중 어느 것도 index.html 또는 11개 category 허브의 표시되는 카드 목록에 남아있지 않음 — **클린**.

---

## 3. sitemap / canonical / robots 정합성

- sitemap.xml: 제거된 67개 URL 중 **0건 잔존**. 총 340개 URL(신규 가이드 5개 포함, 335+5).
- canonical 자기참조: 67개 병합 대상 파일 + REWRITE top-20 20개 파일(총 67개, 겹침 있음) 전수 확인 — **전부 자기 자신을 정확히 가리킴, 0건 불일치**. 추가로 verdict.csv KEEP 목록에서 무작위 40개 샘플 확인 — **역시 0건 불일치**.
- robots.txt: `/guides/` 또는 이번 세션 변경 경로와 충돌하는 Disallow 없음(유일한 Disallow는 `/privacy.html`, 기존 규칙, 무관).
- **가이드 5개 sitemap 등록 확인**: `/guides/*.html` 5건 모두 sitemap.xml에 존재.

이 항목은 클린함(1번의 meta-refresh 이슈 제외하면).

---

## 4. REWRITE 결과 실측 — 🔴 가장 심각한 발견

### 4-1. 콘텐츠 자체의 품질
top-20 각 파일에 추가된 FAQ 텍스트를 직접 읽어본 결과, **내용 자체는 지시서(action-plan.md §3)가 요구한 구체적 요소(표, 공식, 실측 수치, 코드 예제, 교차링크)를 실제로 담고 있음** — "이 도구는 편리합니다" 류의 일반론 채우기는 발견되지 않음. 예: http-request-builder.html에 curl/fetch/axios 3종 코드 비교, CORS 프리플라이트 발동 조건 3가지, Content-Type 실수 6가지가 실제로 구체적으로 작성되어 있음. **내용 품질 자체는 지시서를 충실히 따랐다.**

### 4-2. 🔴 그런데 그 내용이 정적 HTML에 없다
**20개 파일 전부에서, 새로 추가된 FAQ 내용이 JS `seoHtml` 템플릿 리터럴(또는 개별 `seoFaqN`/`faqList` 키) 안에만 존재하고, 실제 정적 `<div class="seo">` 컨테이너(크롤러가 view-source로 보는 부분)에는 반영되지 않았다.** 이번 세션 초반 "0-c" 단계에서 정확히 이 문제(JS 삽입 방식이라 크롤러가 못 봄)를 고치기 위해 전 사이트를 정적 프리렌더 방식으로 전환했는데, REWRITE-20 작업이 그 원칙을 어기고 다시 JS-only 삽입으로 회귀했다.

정적 vs JS 글자수 비교(20개 전부 static &lt; js, 즉 새 내용이 정적본문에 없음):

| 파일 | 정적 글자수 | JS 글자수 | 차이(누락분) |
|---|---|---|---|
| http-request-builder.html | 660 | 1932 | **1272자 누락** |
| text-case-detector.html | 704 | 1396 | 692자 누락 |
| time-calculator.html | 1119 | 1715 | 596자 누락 |
| api-response-viewer.html | 619 | 1354 | 735자 누락 |
| pdf-metadata-viewer.html | 506 | 1557 | **1051자 누락** |
| webp-to-jpg.html | 575 | 1339 | 764자 누락 |
| commission-calculator.html | 731 | 1483 | 752자 누락 |
| ai-youtube-title-generator.html | 626 | 1266 | 640자 누락 |
| yaml-validator.html | 536 | 1401 | 865자 누락 |
| pixelate-image.html | 561 | 1183 | 622자 누락 |
| emoji-counter.html | 601 | 1259 | 658자 누락 |
| keyword-density-checker.html | 707 | 1279 | 572자 누락 |
| csv-diff-checker.html | 564 | 1456 | 892자 누락 |
| wpm-calculator.html | 527 | 1258 | 731자 누락 |
| profit-calculator.html | 718 | 1525 | 807자 누락 |
| unicode-inspector.html | 643 | 1500 | 857자 누락 |
| seo-title-generator.html | 647 | 1344 | 697자 누락 |
| prompt-variable-extractor.html | 671 | 1540 | 869자 누락 |
| date-calc.html | 1224 | 1867 | 643자 누락 |
| unit-converter.html (근/평/2019kg 재정의 FAQ 3개) | 정적본문에 확인 결과 3개 신규 FAQ 전부 부재 | — | 전부 누락 |

**즉 "REWRITE top-20 완료"라는 이전 보고는 JS 실행 환경(브라우저)에서는 사실이지만, view-source/비-JS 크롤러 기준으로는 사실이 아니다. 심사관이 페이지 소스 보기를 하면 20개 파일 전부 여전히 원래의 얇은 본문만 보인다.** 이것은 이번 재검수에서 나온 **가장 심각하고 가장 확실한 반려 사유**다.

### 4-3. 동일 버그가 REWRITE-20 밖에서도 발견됨
같은 패턴(JS만 수정, 정적 div 미반영)이 이번 세션의 다른 작업물에서도 확인됨:
- `qr-code-generator.html` (정적 939자 vs JS 1292자, 353자 누락 — QR 데이터 용량/오류수정 레벨/정적·동적 QR 차이 FAQ 3개가 정적 본문에 없음)
- `bmi-calc.html` (정적 1274자 vs JS 1384자, 110자 누락 — 파운드·인치 변환 공식 FAQ가 정적 본문에 없음)
- `ai-token-counter.html` (150자 누락), `slug-generator.html` (262자 누락), `unicode-converter.html` (180자 누락)

반대로 67개 병합 포팅 작업 대부분(`ai-cost-calculator`, `color-contrast-checker`, `svg-cleaner`, `case-converter` 등 확인한 파일)은 정적/JS가 정확히 동기화되어 있어 **같은 세션 안에서도 작업자에 따라 방식이 일관되지 않았음**을 보여준다.

### 4-4. 1,000자 미달 여부 (정적 기준 재평가)
위 표의 "정적 글자수" 컬럼 자체를 기준으로 재판정하면, **20개 중 19개가 1,000자 미만**이다(date-calc, time-calculator 제외 — 이 둘은 원래 정적 본문이 있던 상태에 JS가 얹혀서 그나마 1,000자 넘음). 즉 지시서의 "1,000자 이상 확보" 목표도 **정적 기준으로는 아직 달성되지 않았다.**

---

## 5. 템플릿 반복 재검사

### 5-1. pixelate-image.html vs blur-image.html
지시서가 지목한 "FAQ 4개 동일" 문제는 **JS 콘텐츠 기준으로는 해결됨** — 재작성 후 두 파일의 FAQ 질문 8개 중 겹치는 것은 "파일이 서버로 전송되나요?"(사이트 전역에서 반복되는 개인정보 처리 안내 문구, 실질적 중복 아님) 단 1개뿐. **단, 이 재작성된 내용도 4번 항목과 같은 이유로 정적 HTML에는 반영되지 않았다** — 크롤러 관점에서는 여전히 예전의 중복 콘텐츠만 보일 가능성이 있음(원래 있던 정적 중복 문구가 제거되지 않았다면).

### 5-2. 병합 흡수 파일들의 FAQ 정합성
`ai-cost-calculator`, `hash-generator`, `case-converter`, `unicode-converter`, `slug-generator`, `svg-cleaner` 6개 파일의 FAQ를 검토 — 완전 중복 질문은 없음.

**단, `svg-cleaner.html`에서 모순 발견**: FAQ "SVG Optimizer와 차이점은?"의 답변이 "SVG Cleaner는 에디터 전용 요소 제거에 특화되어 있고, SVG Optimizer는 파일 크기 최적화에 더 집중합니다. **두 도구를 함께 사용하면 가장 효과적입니다.**"라고 되어 있음. 그러나 svg-optimizer.html은 이번 세션에 svg-cleaner.html로 리다이렉트 병합되어 **더 이상 별도 도구가 아니다.** "두 도구를 함께 쓰라"는 안내가 이제 "같은 페이지를 두 번 쓰라"는 뜻이 되어버려 사용자에게 혼란을 준다. 병합 후 삭제되거나 수정됐어야 할 FAQ가 그대로 남음.

---

## 6. 심사관 랜덤 샘플링 시뮬레이션 (KEEP 15개)

REWRITE top-20 및 67개 병합 타겟과 겹치지 않는 신선한 KEEP 목록에서 시드 고정 랜덤 샘플 15개 추출.

| # | 파일 | 정적 본문(seo 섹션) 글자수 | 판정 | 사유 |
|---|---|---|---|---|
| 1 | jwt-generator.html | 1,239 | ✅ APPROVE | FAQ 10개(언어별)/서명 알고리즘 설명 등 충분 |
| 2 | **compound-interest.html** | **588** | 🔴 **REJECT** | 정적 본문이 복리 공식 1개 + 짧은 Q&A 2개뿐(약 588자). "72의 법칙"·구체 수치 예시는 있으나 분량이 명백히 얕음. 이 세션 앞선 별도 감사(main-content 재측정 fork)에서도 최악의 콘텐츠-격차 페이지 중 하나로 이미 지목된 파일 — 두 번째 독립 검수에서도 동일하게 걸림 |
| 3 | pdf-page-counter.html | 1,275 | ✅ APPROVE | 충분한 FAQ |
| 4 | stock-tax.html | 1,422 | ✅ APPROVE | 국내·해외 주식 세율 구체 수치 포함 |
| 5 | business-days-calculator.html | 1,084 | ✅ APPROVE | 기준선 통과 |
| 6 | gift-tax.html | 1,965 | ✅ APPROVE | 2026년 공제 한도·누진세율 구체 수치, 법적 근거 확실 |
| 7 | meta-tag-analyzer.html | 1,308 | ✅ APPROVE | 충분 |
| 8 | csv-to-json.html | 927 | ✅ APPROVE(경계) | 1,000자에 살짝 못 미치나 RFC 4180 인용, 구분자 자동감지·타입 변환 등 구체적 기술 설명이라 내용 밀도는 양호 |
| 9 | canonical-tag-checker.html | 1,499 | ✅ APPROVE | 충분 |
| 10 | electricity-cost-calculator.html | 1,171 | ✅ APPROVE | 충분 |
| 11 | age-calculator.html | 1,182 | ✅ APPROVE | 충분 |
| 12 | word-counter.html | 2,230 | ✅ APPROVE | 가장 풍부 |
| 13 | text-cleaner.html | 1,139 | ✅ APPROVE | 충분 |
| 14 | csp-generator.html | 1,355 | ✅ APPROVE | 충분 |
| 15 | sleep-calculator.html | 1,199 | ✅ APPROVE | 충분 |

**15개 중 14개 APPROVE, 1개(compound-interest.html) REJECT.**

> 심사관은 사이트 전체가 아니라 샘플만 보고 판단하므로, **15개 중 1개라도 반려감이면 전체 반려로 간주한다**는 원칙에 따라 — **이 샘플링 자체가 전체 사이트 반려 신호를 낸다.** compound-interest.html과 구조가 비슷한 다른 글로벌(EN 중심) 금융 계산기 페이지들(앞선 audit-correction 단계에서 이미 지목됐던 gst-calculator.html, mortgage-calculator.html, roi-calculator.html 등)도 같은 문제를 가지고 있을 가능성이 높음 — 이번 세션에서 REWRITE 대상에 포함되지 않았던 페이지군임.

*(참고: 나머지 14개의 "APPROVE" 판정은 seo 섹션 정적 글자수·FAQ 개수·플레이스홀더 버그(`로딩 중...`) 부재를 기준으로 내렸으며, 15개 전부를 처음부터 끝까지 정독하지는 못했음 — 시간 제약. compound-interest.html과 csv-to-json.html은 전문을 직접 읽고 판정함.)*

---

## 최종 판정: **보완 필요 (검토 요청 불가)**

3회 반려된 사이트가 4번째 재도전을 하기엔 아직 이르다. 특히 **4번 항목(REWRITE-20 정적 미반영)** 하나만으로도 이전 반려 사유("본문이 크롤러에게 안 보이는 구조")가 사실상 재발한 것과 같다 — 고쳤다고 보고된 20개 파일이 view-source 기준으로는 고쳐지지 않았다.

### 우선순위별 잔여 작업

**P0 — 즉시 차단 사유 (재심사 전 반드시 해결)**
1. **REWRITE top-20 20개 파일 + qr-code-generator/bmi-calc/ai-token-counter/slug-generator/unicode-converter 5개 파일, 총 25개 파일의 신규 FAQ 콘텐츠를 정적 `<div class="seo">` HTML에도 동일하게 반영.** (JS는 그대로 두되, 페이지 로드 시점 정적 소스에 이미 존재해야 함 — 이번 세션 초반 0-c 원칙 재적용)
2. **text-encryptor.html의 복호화(decrypt) 기능 부재 해결.** text-decryptor.html 병합으로 실제 기능이 사라짐 — (a) decrypt UI를 text-encryptor.html에 추가하거나 (b) 병합을 롤백해 별도 유지. 최소한 FAQ의 "text-decryptor.html에서 복호화" 안내 문구부터 즉시 수정.
3. **svg-cleaner.html의 "SVG Optimizer와 함께 쓰라"는 모순 FAQ 수정.**

**P1 — 재심사 전 해결 권장**
4. cron-generator.html, image-color-extractor.html(4개 언어)의 "존재하지 않는 도구로 가라"는 안내 문구 수정.
5. compound-interest.html(그리고 유사한 EN 금융 계산기군 — gst-calculator, mortgage-calculator, roi-calculator 등)의 정적 본문 보강. 이번 세션 REWRITE-20에 없던 페이지들이므로 별도 배치 필요.
6. category-i18n.js의 TOOL_NAMES 죽은 데이터 4건 정리.

**P2 — 구조적 한계(장기 과제, 이번 재심사 여부와 별개)**
7. GitHub Pages는 진짜 301을 지원하지 않음 — Cloudflare Pages/Vercel/Netlify로 이전하면 근본 해결되나, 현재는 meta-refresh+JS 방식이 최선이며 리스크로만 남겨둠.
