# 템플릿 균질성·구조 결함 검사 (4단계)

감사일: 2026-07-14 · 방법: 실제 파일을 열어 대조. 모든 인용은 파일에서 그대로 복사한 것.

---

## 1. [구조적/치명] 본문 콘텐츠가 정적 HTML에 존재하지 않는다 — 전부 JS 문자열

이 사이트의 SEO 본문·FAQ는 HTML이 아니라 **인라인 `<script>` 안의 i18n 문자열**로만 존재하고, 런타임에 innerHTML로 주입된다.

증거 (base64-encoder.html):
- 282행: `<div class="seo" id="seoSection"></div>` ← 정적 DOM에서 SEO 섹션은 **빈 div**
- 516행: `document.getElementById('seoSection').innerHTML = t.seoHtml;` ← JS 실행 후에만 본문 생성

실측 규모:
- 빈 `<div class="seo">` 패턴 파일: **85개** (`id="seoSection"` 주입식) + **82개** (`data-i18n="seoHtml"` 주입식) — 나머지도 대부분 동일 계열 변형
- 정적 텍스트(스크립트/스타일 제외) 중앙값: **240자** — JS 없이 보면 페이지당 라벨 몇 개가 전부
- JS 실행 후 렌더링 텍스트(ko) 중앙값: **1,220자**

판정: Google은 JS를 렌더링하지만 (a) 렌더링 큐 지연으로 인덱싱이 밀리고, (b) 아래 2번처럼 JS가 죽으면 **본문이 0이 되며**, (c) AdSense 심사관이 소스 보기로 확인하면 "빈 껍데기 페이지 393개"로 보인다. 이 구조 자체가 반려 요인.

## 2. [치명] JS 문법 오류로 완전히 죽어 있는 페이지 9개

`node --check`로 전 파일 인라인 스크립트를 검사한 실측 결과. 이 9개는 **스크립트 전체가 파싱 불가 → 툴 기능·본문·FAQ·i18n 아무것도 렌더링되지 않는 빈 페이지**로 서비스 중:

| 파일 | 오류 | 원인 (실제 확인) |
|---|---|---|
| json-to-yaml.html | `SyntaxError: Unexpected token ')'` | 114행 FAQ 답변 내 이스케이프 안 된 백틱: `…! % @ \`)를 포함하거나…` — 템플릿 리터럴이 그 지점에서 조기 종료 |
| markdown-to-html.html | `SyntaxError: Unexpected token ')'` | 29행(스크립트 기준) FAQ: `인라인 코드는 백틱(\`)으로 감쌉니다` — 동일 유형 |
| pdf-rotate.html | `Identifier '_buf' has already been declared` | 119행과 224행에 `let _buf=null,_deg=90,_pageCount=0;` **동일 선언문 2회 복붙** |
| pdf-unlock.html | `_buf` 재선언 | 동일 패턴 |
| pdf-reorder-pages.html | `_buf` 재선언 | 동일 패턴 |
| pdf-password-adder.html | `_buf` 재선언 | 동일 패턴 |
| pdf-extract-text.html | `_pages` 재선언 | 동일 패턴 |
| pdf-extract-images.html | `_pdf` 재선언 | 동일 패턴 |
| image-base64-decoder.html | `_dataUrl` 재선언 | 동일 패턴 |

판정: "동작하지 않는 도구"는 AdSense Low value content의 교과서적 사례. PDF 계열 6개가 같은 복붙 오류를 공유한다 = 배치 생산 과정에서 사람이 한 번도 열어보지 않았다는 증거이며, 심사관도 같은 결론에 도달한다.

## 3. [핵심] FAQ·설명 문단의 교차 파일 복붙 — 실제 대조 결과

### 3-1. blur-image.html vs pixelate-image.html (자카드 0.464, 전체 1위)

두 파일을 열어 FAQ 8개를 대조한 결과 **4개 문답이 글자 단위로 동일**:

| 공통 문답 (두 파일에서 동일) |
|---|
| "파일이 서버로 전송되나요?" → "아니요. 모두 브라우저 로컬에서 처리됩니다." |
| "결과 형식은?" → "PNG로 다운로드됩니다." |
| "어떤 형식이 지원되나요?" → "PNG, JPG, WebP 등 브라우저에서 지원하는 이미지 형식 모두 지원합니다." |
| "원본 해상도가 유지되나요?" → "예, 원본과 동일한 해상도로 다운로드됩니다." |

나머지 4개도 단어 치환 수준: "특정 부분만 **블러** 처리할 수 있나요? → 현재 전체 이미지에 **블러**를 적용합니다" ↔ "특정 부분만 **픽셀화**할 수 있나요? → 현재 전체 이미지에 **픽셀화**를 적용합니다."

### 3-2. pdf-extract-text.html vs pdf-to-text.html (자카드 0.418)

기능 자체가 동일한 두 페이지. FAQ 대조 결과 5개 문답이 동일하거나 어미만 변형:
- "파일이 서버로 전송되나요?" → "아니요. 브라우저 내에서만 처리됩니다." (동일)
- "표·서식이 유지되나요?" → "단순 텍스트만 추출됩니다. 표 구조는 보장되지 않습니다." (동일)
- "암호화된 PDF도 처리되나요?" → "암호화되지 않은 PDF만 처리됩니다." (동일)
- "TXT 파일은 어떤 인코딩인가요?" ↔ "TXT 파일 인코딩은?" → "UTF-8 인코딩으로 저장됩니다." (답변 동일)
- "스캔 PDF에서 텍스트 추출이 가능한가요?" ↔ "스캔 PDF도 변환할 수 있나요?" → "OCR이 적용된 PDF만 가능합니다. 이미지만 있는…" (답변 동일)
- 심지어 pdf-extract-text의 마지막 FAQ가 자백한다: "PDF → 텍스트 파일 변환과 동일한가요? → **유사합니다.**"

### 3-3. percentage-increase vs percentage-decrease (자카드 0.386)

본문 설명 문단이 부호만 바꾼 대칭 복제:
- 증가판: "원래 값과 새 값을 입력해 퍼센트 증가율을 계산하거나, 원래 값과 증가율로 증가 후 값을 역산합니다."
- 감소판: "원래 값과 새 값을 입력해 퍼센트 감소율을 계산하거나, 원래 값과 감소율로 감소 후 값을 역산합니다."
- FAQ도 동형: "Q. 원래 값이 0이면 어떻게 되나요? A. 0으로 나누기 불가…" 두 파일 동일.

### 3-4. 사이트 전역 보일러플레이트 문장 (교차 파일 실측)

- "파일이 서버로 전송되나요?" — **29개 파일** 동일 질문
- "파일이 서버에 업로드되나요?" — 13개 파일
- "아니요. 모두 브라우저 로컬에서 처리됩니다." — **18개 파일 답변까지 동일**
- "아니요. 브라우저 내에서만 처리됩니다." — 9개 파일
- "예, 모던 모바일 브라우저에서 동작합니다." — 4개 파일 (pdf-rotate/pdf-unlock 등에서 FAQ 1개를 이 한 줄로 처리)
- 프라이버시 강조 상용구("서버로 전송되지 않…/브라우저에서만 처리…") 포함 파일: **83개**

판정: FAQ "8개 필수" 내부 규칙(CLAUDE.md)을 채우기 위한 무가치 한 줄 문답 양산. FAQPage JSON-LD에 이 문답이 들어가므로 구조화데이터 스팸으로도 읽힌다.

## 4. [핵심] 페이지 스켈레톤 완전 균질

- 동일 CSS 변수 세트(`--bg:#0a0a0a…`): **321개 파일**
- 동일 헤더 구조(로고 / "← 모두의 툴" / 🌐 언어 버튼): 전 파일
- 동일 섹션 순서: 툴 UI → `.seo` div → h2 "자주 묻는 질문"(**331개 파일** 동일 헤딩) → details 8개 → related.js 자동 관련툴
- WebApplication + FAQPage JSON-LD 2종 기계 삽입: 382/386개
- title 패턴 균질: "X - Y | MODOO HUB" 계열이 대부분

템플릿 공통화 자체는 정상이나, **차별화 요소가 seoHtml 문단 1개+FAQ 8개뿐인데 그마저 3절처럼 상호 복제**이므로, 심사관 눈에는 "제목만 치환한 393장 카드"로 보인다.

## 5. [기만성] "AI ○○ 생성기" 12종은 AI를 호출하지 않는다

실제 코드 확인 결과 ai-email-generator, ai-resume-generator, ai-tweet-generator, ai-blog-title-generator 등 전부 `fetch()` 호출 **0회** — LLM 연동이 전혀 없는 고정 문자열 템플릿이다.

증거 (ai-email-generator.html 244행 `generateEmail()`):
```
_genBody = `${greeting}\n\n${body}\n\n${closing}\n${sender}`;
```
→ 인사말 + **사용자가 입력한 텍스트 그대로** + 맺음말을 이어붙일 뿐이다. ai-tweet-generator는 사용자가 내용을 안 쓰면 `'이건 논쟁의 여지가 있지만, 진실은 대부분이 틀렸다는 것이다.'` 같은 **고정 문장**을 "AI 생성 트윗"으로 출력한다.

판정: 페이지 제목·H1·설명이 "AI 생성기"를 표방하지만 실제 기능은 mad-libs 문장 조합이다. 심사관이 도구를 1회만 사용해봐도 확인되는 기대-실제 불일치로, Low value + 오해 소지 콘텐츠 이중 감점. (12종: ai-email/resume/cover-letter/product-description/blog-title/youtube-title/thumbnail-title/tweet/linkedin-post + prompt 계열 일부)

## 6. [구조적] i18n·canonical·hreflang 상호 모순

- 4개 언어가 **하나의 URL**에 `?lang=` 파라미터로 얹혀 있고, hreflang은 `?lang=en/zh/ja` 쿼리 변형을 가리키지만 canonical은 쿼리 없는 기본 URL — **hreflang 대상이 canonical에 의해 소거되는 자기모순 구성**이 390개 파일 전체에 배포됨.
- en/zh/ja 콘텐츠는 JS 실행+파라미터 분기 후에만 존재 → 사실상 인덱스 불가. "4개 언어 지원"은 검색 관점에서 ko 1개 언어 사이트다.
- 중복 페이지 9쌍에는 cross-canonical이 이미 걸려 있으나(예: unemployment-benefit.html → canonical: unemployment.html), 해당 페이지들이 **sitemap에 그대로 남아 있고 자기 hreflang을 선언**해 신호가 상충한다. 실제로 canonical이 다른 곳을 가리키는 unemployment-benefit.html이 GSC 노출 16회로 이 클러스터 노출 1위 = Google이 신호를 신뢰하지 못하고 있다는 방증.

## 7. GSC 보조 신호 (판정 근거 아님, 정황 증거)

- 6주간 사이트 전체: **클릭 2회, 노출 628회** (도구 393개 대비)
- 노출이 1회라도 있는 페이지: 137개 / **노출 0 페이지: 256개(66%)**
- 최다 노출 페이지조차 chatgpt-token-counter 47회, 평균 게재순위 40위권

→ "콘텐츠를 계속 늘렸는데 노출이 형성되지 않는다"는 것은 페이지 수 부족이 아니라 **사이트 단위 품질 평가가 눌려 있다**는 뜻. 130페이지를 더 추가해도 반려가 반복된 것과 정합한다.

---

## 종합 판정 (4단계 결론)

"조금 더 보강"으로 못 고치는 구조적 원인 5개:
1. 검색의도 중복 페이지 분열 (52클러스터 / MERGE 67파일 — clusters.md, verdict.csv)
2. 본문의 JS-전용 존재 + 죽은 페이지 9개 (동작 검증 부재)
3. FAQ 8개 규칙 채우기식 보일러플레이트 (문답 재사용 실측)
4. AI 사칭 생성기 12종 (기능-표기 불일치)
5. canonical/hreflang/sitemap 신호 상충 + 단일 URL 4개 언어 구조
