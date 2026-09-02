# modoo-tool 프로젝트 컨텍스트

## 프로젝트 개요
- **사이트**: https://modoohub.com
- **구성**: 단일 HTML 파일 집합 (SPA 아님, 각 툴마다 별도 .html)
- **현재 툴 수**: 317개 (index.html footer 카운터 기준, 2026-07-17 실제 카드 수 재계산 후 정정 — 이전 표기 394/336/327은 오래된 스냅샷과 실제 카드 수 사이 드리프트였음)
- **HTML 파일**: 387개 (index.html, privacy.html, naverfc…html, category/×11 제외)
- **sitemap.xml**: 403 URL 항목
- **카테고리 허브**: /category/ 디렉토리, 11개 HTML + category-i18n.js

## 필수 코드 (모든 새 HTML 파일에 공통)

### GA / AdSense
```html
<!-- GA -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-NR6VJF0534"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-NR6VJF0534');</script>
<!-- AdSense -->
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3371462986089885" crossorigin="anonymous"></script>
```

### CSS 변수 (다크 테마)
```css
:root {
  --bg:#0a0a0a; --surface:#141414; --surface2:#1a1a1a; --border:#252525;
  --accent:#fbbf24; --accent2:#f59e0b;
  --text:#f5f5f5; --text-muted:#888; --text-dim:#444;
  --green:#4ade80; --red:#f87171; --blue:#60a5fa; --purple:#c084fc;
}
```

### 폰트
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;600;700&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet">
```
**주의:** `fonts.gstatic.com` preconnect 누락이 2026-07-08 PageSpeed 실측 감사에서 발견됨(402개 파일 중 다수가 googleapis preconnect만 있고 실제 폰트파일 서버인 gstatic 누락 — 크리티컬 렌더링 체인 지연의 원인). 신규 파일은 반드시 위 2줄 preconnect 다 포함할 것.

### SEO 메타/hreflang (SLUG 교체)
```html
<link rel="canonical" href="https://modoohub.com/SLUG.html">
<link rel="alternate" hreflang="ko" href="https://modoohub.com/SLUG.html">
<link rel="alternate" hreflang="en" href="https://modoohub.com/SLUG.html?lang=en">
<link rel="alternate" hreflang="zh" href="https://modoohub.com/SLUG.html?lang=zh">
<link rel="alternate" hreflang="ja" href="https://modoohub.com/SLUG.html?lang=ja">
<link rel="alternate" hreflang="x-default" href="https://modoohub.com/SLUG.html">
```

### related.js (반드시 </body> 직전)
```html
<script src="related.js"></script>
```

## i18n 패턴

### 기본 구조
```javascript
const _i18n = {
  ko: { pageTitle:'...', h1:'...', sub:'...', backLink:'← 모두의 툴', langBtn:'🌐 EN', seoHtml:`...` },
  en: { pageTitle:'...', h1:'...', sub:'...', backLink:'← All Tools', langBtn:'🌐 中文', seoHtml:`...` },
  zh: { pageTitle:'...', h1:'...', sub:'...', backLink:'← 首页', langBtn:'🌐 日本語', seoHtml:`...` },
  ja: { pageTitle:'...', h1:'...', sub:'...', backLink:'← ホーム', langBtn:'🌐 한국어', seoHtml:`...` },
};
```

### applyLang() 패턴
```javascript
function applyLang(l) {
  const t = _i18n[l] || _i18n.ko;
  document.documentElement.lang = t.htmlLang || l;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const v = t[el.dataset.i18n];
    if (v !== undefined) el.innerHTML = v;
  });
}
function detectLang() {
  const p = new URLSearchParams(location.search).get('lang');
  if (p && _i18n[p]) return p;
  const s = localStorage.getItem('modoo_lang');
  if (s && _i18n[s]) return s;
  const n = navigator.language || '';
  if (n.startsWith('zh')) return 'zh';
  if (n.startsWith('ja')) return 'ja';
  if (n.startsWith('ko')) return 'ko';
  return 'en';
}
function toggleLang() {
  const order = ['ko','en','zh','ja'];
  const next = order[(order.indexOf(currentLang)+1) % order.length];
  currentLang = next;
  localStorage.setItem('modoo_lang', next);
  const url = new URL(location.href);
  url.searchParams.set('lang', next);
  history.replaceState(null,'',url);
  applyLang(next);
}
let currentLang = detectLang();
document.addEventListener('DOMContentLoaded', () => applyLang(currentLang));
```

## SEO 섹션 패턴

### seoHtml (다국어 backtick 템플릿 리터럴로 저장 + ko는 정적 프리렌더 필수)
```javascript
seoHtml: `
<h2>타이틀</h2>
<p>설명 500~800자</p>
<h2 class="seo-sub">자주 묻는 질문</h2>
<details class="faq-item"><summary>Q. 질문</summary><p>A. 답변</p></details>
<!-- FAQ 8개 필수 -->
`
```

**필수: `<div class="seo" id="seoDiv">` 컨테이너를 빈 채로 두지 말 것.** 위 `seoHtml.ko` 값을 빌드 시점(파일 작성 시)에 그대로 컨테이너 안에 정적 HTML로 박아 넣는다 — 즉 최초 페이지 소스(view-source, JS 실행 전)에 이미 `<h2>`·FAQ `<details>`가 보여야 한다.
```html
<div class="seo" id="seoDiv"><h2>타이틀</h2><p>설명...</p><h2 class="seo-sub">자주 묻는 질문</h2><details class="faq-item">...</details>...</div>
```
JS(`applyLang()`)는 언어 전환 버튼을 눌렀을 때만 `innerHTML`을 다른 언어로 교체한다 — 최초 로드 시 정적 ko 콘텐츠를 다시 덮어써도 무방하지만(내용 동일하므로 무해), 컨테이너를 빈 채로 만들어놓고 JS 삽입에만 의존하는 구조는 금지. 이유: 2026-07-14 재심사 감사에서 크롤러가 JS 실행 전 원본 HTML만 보는 경우(또는 렌더링 실패 시) 본문·FAQ가 완전히 안 보이는 페이지가 다수 발견됨(빈 컨테이너 + JS 주입 방식 301개 파일). 신규 파일은 처음부터 정적 프리렌더 방식으로 작성할 것.

### FAQ 최소 기준: 8개 필수
- HTML 파일 내 `class="faq-item"` 실제 인스턴스 8개 이상
- FAQPage JSON-LD 내 Question도 4개 이상 권장
- 8개 미만이면 Google FAQ 리치 스니펫 노출 불리

### FAQ HTML 형식 표준 (신규: `<details>` 사용)
```html
<details class="faq-item"><summary>Q. 질문</summary><p>A. 답변</p></details>
```
구형 KO 툴(salary 등)은 `<div class="faq-item"><h3 class="faq-q">` 형식 혼용 — 신규 툴은 반드시 `<details>` 형식 사용.

### SEO CSS (</style> 바로 앞에 추가)
```css
.seo{margin-top:40px;padding-top:28px;border-top:1px solid var(--border);}
.seo h2{font-size:15px;font-weight:700;margin-bottom:8px;color:var(--text-muted);}
.seo p{font-size:13px;color:var(--text-dim);line-height:1.8;margin-bottom:14px;}
.seo strong{color:var(--text-muted);}
.seo-sub{font-size:14px;font-weight:700;margin:16px 0 8px;color:var(--text-muted);}
details.faq-item{border:1px solid var(--border);border-radius:6px;margin-bottom:8px;}
details.faq-item summary{padding:10px 14px;cursor:pointer;font-size:13px;font-weight:600;color:var(--text-muted);list-style:none;}
details.faq-item summary::-webkit-details-marker{display:none;}
details.faq-item[open] summary{border-bottom:1px solid var(--border);}
details.faq-item p{padding:10px 14px;font-size:13px;color:var(--text-dim);line-height:1.8;}
```

## JSON-LD 스키마 (2개 필수)
```html
<script type="application/ld+json">
{
  "@context":"https://schema.org",
  "@type":"WebApplication",
  "name":"TOOL NAME",
  "url":"https://modoohub.com/SLUG.html",
  "applicationCategory":"UtilitiesApplication",
  "operatingSystem":"Any",
  "offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},
  "description":"DESCRIPTION"
}
</script>
<script type="application/ld+json">
{
  "@context":"https://schema.org",
  "@type":"FAQPage",
  "mainEntity":[
    {"@type":"Question","name":"Q1","acceptedAnswer":{"@type":"Answer","text":"A1"}},
    {"@type":"Question","name":"Q2","acceptedAnswer":{"@type":"Answer","text":"A2"}}
  ]
}
</script>
```

## index.html 업데이트 방법

### 섹션 맵 (툴 카드 추가 위치)

| 섹션 ID | data-cat | 줄 | ko-only | 용도 |
|---|---|---|---|---|
| secWork | work | 129 | ✅ | 한국 근로·급여 계산기 |
| secTax | tax | 151 | ✅ | 한국 4대보험·세금 계산기 |
| secReal | real | 171 | ✅ | 한국 부동산·대출 계산기 |
| secLifeKo | life-ko | 188 | ✅ | 한국 일상·날짜 툴 |
| secFinance | finance | 197 | ❌ | 글로벌 금융·재테크 |
| secHealth | health | 229 | ❌ | 건강·체력 계산기 |
| secLife | life | 244 | ❌ | 일상 생활·날짜·시간 |
| secDev | dev | 275 | ❌ | 개발자 도구 |
| secText | text | 550 | ❌ | 텍스트·AI·이미지·PDF |

`ko-only` 섹션은 한국어 사용자에게만 표시됨.

### 툴 카드 추가
```html
<a href="SLUG.html" class="tool-card c7">
  <div class="tool-icon">ICON</div>
  <div class="tool-info">
    <div class="tool-name" data-i18n="toolKEYName">KO NAME</div>
    <div class="tool-desc" data-i18n="toolKEYDesc">KO DESC</div>
  </div>
  <div class="tool-arrow">→</div>
</a>
```

색상 클래스: c1~c9 (랜덤 배정 가능)

### i18n 키 추가 위치 (4개 언어 모두)
- ko 섹션: `toolAiTokenName` 근처
- en 섹션: 같은 key
- zh 섹션: 같은 key
- ja 섹션: 같은 key

### 카운터 업데이트 (replace_all:true)
- `394가지` → `N가지`
- `394 tools` → `N tools`
- `394种工具` → `N种工具`
- `394種のツール` → `N種のツール`
- 메타 description도 수동 업데이트

## sitemap.xml 업데이트 방법

개발자 도구 섹션 (line ~97) 마지막 항목 뒤에 추가:
```xml
<url><loc>https://modoohub.com/SLUG.html</loc><lastmod>2026-06-15</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>
```

## related.js 업데이트 방법

### T{} 레지스트리에 추가
```javascript
'SLUG': { ko: 'KO NAME', en: 'EN NAME', zh: 'ZH NAME', ja: 'JA NAME', icon: 'ICON' },
```

### GROUPS[] 배열에 추가 (연관 툴 클러스터)
기존 관련 그룹에 slug 추가하거나 새 그룹 생성. **CATEGORY_MAP에 등록된 모든 툴은 반드시 하나 이상의 GROUPS[] 클러스터에 포함시킬 것** (미포함 시 관련 툴 없이 고립).

### CATEGORY_MAP에 추가
```javascript
'SLUG': 'CATEGORY',
```
카테고리 목록: data-tools, security-tools, text-tools, ai-tools, developer-tools, image-tools, pdf-tools, generator-tools, finance-calculators, health-calculators, date-time-tools

**현재 CATEGORY_MAP 현황 (2026-06-14, 총 387개 등록)**
| 카테고리 | 등록 수 |
|---|---|
| finance-calculators | 70 |
| developer-tools | 70 |
| text-tools | 53 |
| image-tools | 44 |
| generator-tools | 35 |
| security-tools | 30 |
| pdf-tools | 22 |
| ai-tools | 20 |
| data-tools | 17 |
| health-calculators | 12 |
| date-time-tools | 14 |

### CAT_INFO 카운트 업데이트
CATEGORY_MAP에 새 툴 추가 시 해당 카테고리 CAT_INFO count도 동기화:
```javascript
'finance-calculators': { ko:'금융 계산기', ..., count:70 },
```

### BreadcrumbList JSON-LD 자동 주입
related.js가 `DOMContentLoaded` 시 CATEGORY_MAP 기반으로 모든 툴 페이지 헤더에 카테고리 chip + BreadcrumbList JSON-LD를 자동 주입. 별도 HTML 편집 불필요.

## 카테고리 허브 업데이트 방법

카테고리 허브 페이지: `/category/CATEGORY_SLUG.html` (11개, 하드코딩 구조)

글로벌 대상 신규 툴 추가 시 해당 카테고리 HTML에 수동으로 툴 카드 추가:
```html
<!-- /category/developer-tools.html 예시 -->
<a href="../SLUG.html" class="tool-card">
  <div class="tool-icon">ICON</div>
  <div class="tool-info">
    <div class="tool-name">EN NAME</div>
    <div class="tool-desc">EN DESC</div>
  </div>
  <div class="tool-arrow">→</div>
</a>
```

카드 추가 후 동기화할 항목:
1. 섹션 헤딩 카운트: `All 15 Finance Calculators` → 수 업데이트
2. `category-i18n.js` 내 해당 카테고리 `count:` 값 업데이트
3. 본문 텍스트 내 하드코딩된 숫자도 함께 수정

**주의**: 카테고리 허브는 글로벌(en/zh/ja) 대상 툴만 포함. 한국 전용 툴(salary, loan-calc 등)은 추가 불필요.

## IndexNow 제출

새 툴 추가 또는 대규모 업데이트 후 신속 인덱싱 요청:
- 키: `e9f6c4e01322aa93057d0995a12a4416`
- 인증 파일: `e9f6c4e01322aa93057d0995a12a4416.txt` (사이트 루트에 존재)
- 엔드포인트: `https://api.indexnow.org/IndexNow`
```bash
curl -X POST "https://api.indexnow.org/indexnow" \
  -H "Content-Type: application/json" \
  -d '{"host":"modoohub.com","key":"e9f6c4e01322aa93057d0995a12a4416","urlList":["https://modoohub.com/SLUG.html"]}'
```

## SEO 완료 작업 현황 (2026-06-14 기준)

전수 감사 후 완료한 일괄 수정:
- **GA + AdSense**: 387개 전 파일 ✅
- **canonical 태그**: 387개 전 파일 ✅
- **hreflang 5개** (ko/en/zh/ja/x-default): 387개 전 파일 ✅
- **WebApplication JSON-LD**: 387개 전 파일 ✅
- **FAQPage JSON-LD**: 387개 전 파일 ✅
- **FAQ 8개 이상**: 구형 KO 툴 38개 파일 보강 완료 ✅
- **CATEGORY_MAP**: 387개 전 파일 등록 (이전 누락 48개 추가) ✅
- **GROUPS[]**: 전 파일 최소 1개 클러스터 등록 (md5-generator, vat-calc 추가) ✅
- **BreadcrumbList JSON-LD**: related.js 자동 주입으로 전체 적용 ✅

## 현재 완료된 배치 현황 (2026-06-14)

### 배치 1 ✅
json-validator, json-viewer, json-minifier, base64-encoder, base64-decoder

### 배치 2 ✅
text-to-base64, base64-to-text, url-encoder, url-decoder, html-decoder

### 배치 3 ✅
sha256-generator, md5-generator, uuid-validator, cron-parser, cron-validator

### 배치 4 ✅
csv-viewer, markdown-to-html, html-to-markdown, webp-to-png, png-to-jpg

### 배치 5 ✅
pdf-compressor, pdf-page-counter, ai-cost-calculator, chatgpt-token-counter, utm-builder

### 배치 6 ✅
robots-txt-generator, meta-tag-generator, color-contrast-checker, hex-to-rgb, rgb-to-hex

### 배치 7 ✅
ip-address-lookup

### 배치 8 ✅
sitemap-generator, xml-validator, robots-txt-validator, meta-tag-analyzer, open-graph-generator

### 배치 9 ✅
twitter-card-generator, schema-markup-generator, schema-validator, hreflang-generator, canonical-tag-checker

### 배치 10 ✅
keyword-clustering-tool, keyword-grouping-tool, redirect-checker, http-header-checker, user-agent-parser

### 배치 11 ✅
dns-lookup, whois-lookup, ssl-checker, ssl-decoder, csr-generator

### 배치 12 ✅
htaccess-generator, nginx-config-generator, apache-config-generator, csp-generator, csp-validator

### 배치 13 ✅
cors-header-checker, mime-type-finder, website-speed-estimator, sitemap-validator, favicon-generator

### 배치 14 ✅
jwt-validator, jwt-inspector, json-diff, json-flattener, json-to-yaml, yaml-to-json, xml-to-json, json-path-tester, graphql-formatter, graphql-query-builder, sql-minifier, sql-validator, sql-to-json, curl-generator, curl-parser, http-request-builder, api-tester, webhook-tester, webhook-generator, regex-generator, regex-cheatsheet, uuid-converter, ulid-generator, nanoid-generator, hash-checker, bcrypt-generator, bcrypt-validator, hmac-generator, rsa-key-generator, ssh-key-generator

### 배치 15 ✅
prompt-token-estimator, openai-cost-estimator, claude-cost-estimator, gemini-cost-estimator, prompt-cleaner, prompt-template-generator, prompt-variable-extractor, ai-model-comparison, ai-pricing-comparison, markdown-chat-exporter

### 배치 16 ✅
text-case-detector, duplicate-line-finder, unicode-inspector, unicode-converter, emoji-counter, emoji-remover, text-encryptor, text-decryptor, text-to-unicode, unicode-to-text, ascii-converter, ascii-table, palindrome-checker, anagram-checker, text-statistics, keyword-extractor, stopword-remover, text-merger, line-merger, random-word-generator

### 배치 17 ✅
svg-viewer, svg-minifier, svg-to-png, png-to-svg, image-cropper, image-rotator, image-watermark, image-metadata-viewer, exif-viewer, exif-remover, favicon-maker, ico-converter, jpg-to-webp, webp-to-jpg, image-color-extractor, dominant-color-finder, blur-image, pixelate-image, image-base64-decoder, image-base64-encoder

### 배치 18 ✅
pdf-password-remover, pdf-password-adder, pdf-rotate, pdf-reorder-pages, pdf-extract-text, pdf-extract-images, pdf-metadata-viewer, pdf-unlock, pdf-watermark, pdf-to-text

### 배치 19 ✅
word-to-minute-converter, typing-speed-test, cps-calculator, wpm-calculator, reading-level-checker, keyword-density-checker, seo-title-generator, meta-description-generator, slug-checker, url-slug-generator

### 배치 20 ✅
yaml-validator, json-to-xml, html-minifier, css-minifier, javascript-minifier, javascript-beautifier, css-beautifier

### 배치 21 ✅
token-estimator, prompt-template-library, image-prompt-generator, youtube-script-generator

### 배치 22 ✅
prompt-improver, prompt-optimizer, system-prompt-generator, ai-email-generator, ai-resume-generator, ai-cover-letter-generator, ai-product-description-generator, ai-blog-title-generator, ai-youtube-title-generator, ai-thumbnail-title-generator, ai-tweet-generator, ai-linkedin-post-generator

### 배치 23 ✅
jwt-expiration-checker, json-schema-generator, json-schema-validator, xml-beautifier, yaml-diff-checker, csv-diff-checker, sql-query-explainer, regex-extractor, regex-replace-tester, epoch-converter, uuid-bulk-generator, uuid-extractor, api-response-viewer

### 배치 24 ✅
keyword-difficulty-estimator, sitemap-extractor, robots-txt-tester, meta-tag-preview, serp-snippet-preview, open-graph-preview, schema-generator-faq, schema-generator-product, schema-generator-article, keyword-cannibalization-checker, uppercase-converter, lowercase-converter, sentence-case-converter, remove-special-characters, text-deduplicator, text-summarizer, word-frequency-counter, ngram-analyzer, text-similarity-checker

### 배치 25 ✅
pdf-page-extractor, pdf-thumbnail-generator, pdf-ocr, gradient-generator, css-gradient-generator, tailwind-color-generator, color-blindness-simulator, accessibility-color-checker

### 배치 26 ✅ (금융+생산성)
cagr-calculator, compound-annual-growth-rate-calculator, margin-calculator, profit-calculator, break-even-calculator, commission-calculator, vat-reverse-calculator, discount-calculator, percentage-increase-calculator, percentage-decrease-calculator, meeting-cost-calculator, salary-per-hour-calculator, hourly-rate-calculator, freelancer-rate-calculator, time-zone-meeting-planner

### 배치 27 ✅ (고아 페이지 통합)
avif-to-jpg, heic-to-jpg, image-dimension-checker, image-dpi-checker, jpg-to-avif, jpg-to-heic, transparent-background-maker, svg-cleaner, svg-optimizer, pdf-metadata-remover, pdf-size-analyzer, pdf-word-counter

### 배치 28 ✅ (고검색량 신규)
qr-code-generator, lorem-ipsum-generator, severance-pay-calculator, health-insurance-calculator, national-pension-calculator

### 배치 29 ✅ (2026-07-08, 고아 페이지 등록 + 전수 재점검)
bmi-calculator, compound-annual-growth-rate-calculator, health-insurance-calc, health-insurance-calculator, keyword-density, national-pension-calculator, qr-generator, severance-pay-calculator, unemployment-benefit, url-slug-generator, xml-beautifier — 위 5개(배치 26-28에서 만들었지만 related.js/sitemap 등록 누락됐던 것)는 CATEGORY_MAP·T{}·GROUPS[]·sitemap.xml에 정식 등록 완료. 5개(bmi-calculator, qr-generator, url-slug-generator, xml-beautifier, compound-annual-growth-rate-calculator)는 글로벌 카테고리 허브(/category/*.html)에도 카드 추가.

**주의:** "배치 완료 = 전부 등록됨"이 아니었음. 배치 작업 후 CATEGORY_MAP/sitemap 등록을 빠뜨린 파일이 실제로 존재했으므로, 새 배치 만들 때마다 `grep -c "'SLUG':" related.js`로 등록 여부 직접 확인할 것.

## 연도별 정기 점검 필요 항목 (매년 수치 바뀌는 계산기)

아래 파일들은 매년/반기별로 바뀌는 법정 수치를 하드코딩하고 있음. **연초, 그리고 하반기 제도 변경 시점(7월)에 반드시 재확인**할 것 — 2026-07-08 점검에서 national-pension-calculator.html이 2024년 수치를 그대로 쓰고 있던 것을 발견함(값 자체가 실제로 2026년 7월부터 바뀌었는데 코드가 안 따라감).

| 파일 | 하드코딩된 수치 | 갱신 주기 |
|---|---|---|
| working-days-calc.html | `HOLIDAYS_2026` 공휴일 날짜 목록 (설날/추석 등 음력 기준) | 매년 (다음해 초 필수) |
| national-pension-calculator.html | 보험료율(9.5%), 상한(659만원)·하한(41만원) | 매년 7월 |
| health-insurance.html / health-insurance-calc.html / health-insurance-calculator.html | 보험료율(7.19%), 장기요양보험료율(13.14%), 점수당 금액(208.4원) | 매년 |
| minimum-wage.html | 최저시급(10,320원) | 매년 1월 |
| ltv-calculator.html | 지역별 LTV%(9억원 구간 차등), 규제지역 목록, DSR 기준 | 부동산 대책 발표 시 수시(연 1~2회) |
| severance.html / severance-tax.html 등 4대보험·세금 계열 전체 | 요율 전반 | 매년 |

새 회계연도 진입 시 이 표 파일들부터 웹서치로 "OO년 X월 기준 최신 수치" 확인 후 갱신. 갱신 후 이 표의 갱신 주기 옆에 마지막 확인일 메모 남기기.

## JS 문자열 이스케이프 주의사항

- 싱글쿼트 문자열 내 아포스트로피: `don\'t`, `&apos; (\')`
- backtick 템플릿 리터럴 내 백틱: `` \`code\` ``
- backtick 템플릿 리터럴 안에 `${...}` 형태의 예시 문구를 **글자 그대로** 넣고 싶을 때는 반드시 `\${...}`로 이스케이프할 것. 그냥 `${주제}` `${topic}` 처럼 쓰면 JS가 실제 변수 참조로 해석해 `ReferenceError`를 던짐 — 2026-08-18 전수 스캔에서 ai-thumbnail-title-generator.html이 4개 언어(ko/en/zh/ja) seoHtml 전부에서 이 실수로 로드 즉시 깨져 있었음.
- `<script>` 태그 안(코드는 물론 **주석 안에서도**) 리터럴 문자열 `</script>`를 쓰면 안 됨 — HTML 파서는 JS 문법을 모르고 그 지점에서 진짜 `<script>` 태그가 끝난 걸로 처리해 그 뒤 코드 전체가 스크립트 밖 마크업이 되어버림. 반드시 `<\/script>`처럼 슬래시를 이스케이프. 2026-08-18에 schema-markup-generator.html이 주석 하나 때문에 이렇게 깨져 있었음(`SyntaxError: Unexpected end of input`).
- JSON-LD `<script type="application/ld+json">` 블록은 JS 문법 검사 제외

## 신규 툴 배포/기존 툴 수정 전 QA 체크리스트 (2026-08-18 애드센스 반려 대응 후 신설)

애드센스가 "가치가 별로 없는 콘텐츠"로 반려한 원인이 실제로는 **사이트 URL의 17%가 빈 리다이렉트 스텁으로 sitemap에 등록돼 크롤링됨** + **JS 런타임 에러로 로드 즉시 깨지는 페이지 다수**였던 것으로 판명(전수 재검사로 확인). 새 툴 만들거나 기존 파일 슬러그를 바꿀 때마다 아래 항목 빠뜨리지 말 것.

1. **슬러그를 바꾸거나 예전 파일을 리다이렉트 스텁으로 남길 때** (`<meta http-equiv="refresh">`):
   - `sitemap.xml`에 스텁 URL을 절대 등록하지 말 것 (canonical이 다른 곳을 가리키는 URL을 sitemap에 넣는 건 SEO 안티패턴이자 애드센스가 실제로 문제 삼은 원인).
   - 스텁 파일 `<head>`에 `<meta name="robots" content="noindex,follow">` 반드시 추가.
   - `llms.txt`에 그 슬러그로 걸린 링크가 있으면 실제 canonical 페이지 URL로 바꿀 것.
2. **SEO 본문(`<div class="seo">`/`<section class="seo">`) 작성 후 실제 글자 수를 확인**할 것 — "500~800자"는 눈대중이 아니라 태그 제거 후 실측 기준. (jwt-decoder.html이 147자로 방치돼 있었음.)
3. **파일 저장 전 브라우저에서 실제로 열어서 콘솔 에러(`read_console_messages` 또는 개발자도구 Console) 확인**할 것. 최소한 로드 시점 에러는 0이어야 함. 특히:
   - 같은 페이지에 `<script>` 블록이 여러 개면, 뒤 블록에서 `const`/`let`으로 선언한 걸 앞 블록에서 즉시 실행 코드가 먼저 참조하고 있지 않은지 확인 (TDZ/ReferenceError). 초기화 호출(`init()`, `addXxx()`, `renderXxx()` 등)은 그 함수가 참조하는 모든 `const`/`let` 선언보다 반드시 뒤에 와야 함.
   - `document.getElementById('X').textContent=...`처럼 null 체크 없이 바로 프로퍼티 접근하는 코드는, 그 id를 가진 요소가 실제로 HTML에 있는지 확인. 없으면 그 시점에서 예외가 터져 **그 함수의 남은 코드 전체가 실행되지 않고 스킵됨** (예: open-graph-generator.html은 없는 `formLabel` id 때문에 그 아래 20개 라벨이 전부 초기 로드 시 언어 적용 안 되고 있었음).
4. **헤더 카테고리 칩(`rt-hdr-cat`)은 related.js가 모든 페이지에 자동 주입**하므로 개별 파일에서 손댈 필요 없음 — 다만 이 요소는 항상 헤더 우측 끝에 오도록 `margin-left:auto`가 related.js 자체 CSS에 박혀 있음(2026-08-18 수정). 헤더 구조를 새로 만들 때 `header{display:flex}`를 벗어나는 레이아웃을 쓰면 이 정렬이 깨질 수 있으니 기존 헤더 구조(`<header><div class="dot"></div><span class="header-label">...</span><a class="back-link">...</a>[<div class="lang-toggle">...]</header>`)를 그대로 따를 것.
5. 배치 작업 끝나면 실제로 `git push`까지 됐는지, 그리고 GitHub Pages(커스텀 도메인, main 브랜치 서빙)에 반영됐는지 `curl`로 라이브 원본을 직접 떠서 확인할 것 — 로컬 커밋만 하고 push 안 한 채로 "완료"라고 보고한 적 있었음(2026-08-18). AI 요약 도구(WebFetch 등)로 XML/큰 파일 개수를 세면 잘못 셀 수 있으니, 개수 확인은 `curl | grep -c` 같은 직접적인 방법을 쓸 것.
6. **`about.html`/`privacy.html`/`terms.html`을 수정할 때마다 두 가지를 같이 갱신할 것** (2026-08-18, 애드센스 E-E-A-T 대응으로 신설 — fable5 크로스체크로 "about 페이지 자체가 없다"는 제3자 분석은 틀렸고, "운영자 신원 정보가 없다"는 지적만 유효했던 것으로 확인):
   - 각 파일 4개 언어(ko/en/zh/ja, `privacy.html`은 ja 없이 ko/en/zh) 블록의 `<p class="updated">최종 업데이트: ...` 날짜를 실제 수정일로 갱신. 한 언어만 고치고 나머지 언어 날짜를 안 맞추면 언어별로 최종수정일이 어긋나므로 4곳(또는 3곳) 전부 확인.
   - `about.html`엔 "운영 정보" 섹션, `privacy.html`/`terms.html`엔 마지막 조항으로 "운영자 정보" 섹션이 있음 — 개인 운영(법인·사업자등록 없음)이라는 문구를 실제와 다르게 바꾸지 말 것(실제 사업자등록을 하게 되면 그때 사업자정보로 교체).

## 2026-09-01 접근성 리디자인 + 후속 전수 감사

### 커밋 요약 (acb4210 → d76dabb, 총 14개 + 이 문서 커밋)

| 커밋 | 날짜 | 내용 | 영향 |
|---|---|---|---|
| `acb4210` | 08-31 | 접근성 P0/P1/P2 (검색 aria-label, 결과 라이브 리전, focus-visible, 대비, reduced-motion, touch-action, theme-color, inputmode 등) | theme-instrument.css/js(320p) + index/guides/salary/age/body-fat |
| `47c6a91` | 09-01 | `.readout{position:sticky}` 단독 사용 시 스크롤하면 하단 콘텐츠 겹침 → `.grid .readout`로 한정 | theme-instrument.css (단독 readout 24p 해소) |
| `1d3b809` | 09-01 | typing-speed-test 지문 `&nbsp;` → 줄바꿈 불가 → 가로 스크롤 → 일반 스페이스 + `white-space:pre-wrap` | typing-speed-test.html |
| `fb8419c` | 09-01 | 사용자 동작 오류 3종: `alert()` 모달 블로킹(28p) → `window.toast()`, clipboard `.catch()` 없음(34p) → 전역 핸들러, allorigins fetch 타임아웃 없음(5p) → `AbortSignal.timeout(12000)` | theme-instrument.css/js + 28 html + 5 html |
| `7372cf3` | 09-01 | docs: 위 감사·버그 5건 기록 | CLAUDE.md |
| `4822dcd` | 09-01 | ico-converter: 이미지 업로드 전 크기 체크박스 토글 → `_origImg` null 크래시 | ico-converter.html |
| `c39e8a4` | 09-01 | image-watermark: `applyLang()`이 `#opacityVal` 자식 span 파괴 → 슬라이더 크래시 (모든 언어) | image-watermark.html |
| `e09bac6` | 09-01 | og/twitter card 생성기: 분리된 `<img>` onerror `this.parentElement` null → 입력마다 크래시 | open-graph-generator.html, twitter-card-generator.html |
| `0fd83fd` | 09-01 | docs: 인터랙션 전수감사 추가 버그 3건 + i18n/onerror QA | CLAUDE.md |
| `d76dabb` | 09-01 | docs: 9커밋 요약표 + 실제 검증 범위 명시 | CLAUDE.md |
| `9f20982` | 09-01 | savings-calc: `fmtW()`가 raw 원에 "만원" 접미 → 모든 금액 10000배 표시 (60조 등). 수식·계산은 정상, 표시 접미만. | savings-calc.html |
| `5790d78` | 09-01 | body-fat-calculator: 해군법(Navy) 공식이 cm 입력에 인치용 상수(86.010/163.205…) 사용 → 남성 ~6.5%p 과다. 미터법 US Navy 공식(`495/(1.0324-0.19077·log10(waist-neck)+0.15456·log10(h))-450`)으로 교체. BMI법은 이미 정상. | body-fat-calculator.html |
| `79c26f8` | 09-01 | salary-reverse: `getIncomeTax()`가 월 과표에 연 누진세율(`m*0.24-468600` 등) 적용 → 필요 세전연봉 ~10% 과다. salary.html 정본 간이세액표(`TAX_TABLE`+`TAX_BASE_10M`+`getIncomeTax`, 42KB) 이식. | salary-reverse.html |
| `9a6d54e` | 09-01 | salary-raise / payslip-calc / salary-negotiation: 위와 동일한 소득세 오류 3파일. 각각 정본 세액표 블록 이식(payslip·negotiation은 `annual*0.06…*0.45/12` 식 근사 → `getIncomeTax(insBase,1)`). | salary-raise/payslip-calc/salary-negotiation.html |

### 실제로 수행한 검증 범위 (과장 없이)
- **레이아웃 감사**: 툴 319 + index/guides/category 11 + about/terms/contact = **334페이지 각각 실제 브라우저 로드**, 입력 채우고 계산/툴 실행, 3~4개 스크롤 위치에서 요소 겹침·가로 오버플로 DOM 측정. (자동화 스크립트가 페이지마다 방문·조작; 결과값 정확도는 미검증, 출력이 나오는지만 확인)
- **인터랙션 감사**: **319 툴 페이지 각각 실제 브라우저 로드**, 잘못된 값(빈값·음수·`!@#`·`bad url`) 입력 + 다운로드 아닌 모든 버튼 클릭 + 언어 전환 후 재입력, `unhandledrejection`/`error`/`console.error`/블로킹 모달/새 탭 캡처.
- **소스 정독**: 편집한 ~30개 파일 + 버그 플래그된 파일만 전체 소스를 읽음. 나머지 ~290개는 정적 grep 패턴(해당 버그 클래스에 대해서는 전수) + 자동 동적 실행으로 커버 — 한 줄씩 정독하지는 않음.
- **계산 정확도 (2026-09-01 전수)**: 계산기 ~76개 전부 수식을 소스에서 읽고 검증 — 한국 4대보험·세금(salary 계열, 국민연금, 건강보험, 퇴직소득세, 상속·증여·양도·종부·취득세, 실업급여, 육아휴직급여), 금융(EMI/CAGR/SIP/은퇴/적금), 건강(BMI/BMR/체지방), 날짜/시간. 법정 수치는 웹서치로 2026년 기준 대조(국민연금 9.5%·상한 659만·하한 41만, 건강보험 7.19%·장기요양 13.14%, 실업급여 상한 68,100·하한 66,048, 육아휴직 6+6 상한 250~450만). **발견·수정한 오류 5건은 아래 9~13번.** 나머지는 정상 또는 명시된 간이 근사(국민연금 예상수령액, 지역건보 점수 등).

### 리디자인 (커밋 88ada4b, 그 전 세션)
`theme-instrument.css`/`theme-instrument.js` 공유자산으로 320개 툴 페이지 일괄 리스킨.

### 완료한 접근성 수정 (커밋 acb4210, 47c6a91, 1d3b809, fb8419c)
- **P0**: 홈/가이드 검색 입력 `aria-label`(placeholder 비의존, i18n 연동), salary/age/body-fat 결과 요약 라이브 리전(`role=status aria-live=polite aria-atomic=true`, salary는 700ms 디바운스, 포커스 강제이동 없음)
- **P1**: `textarea:focus-visible` 아웃라인 + `.box`/`.editor-box:focus-within`, `--text-dim` 대비 0.42→0.55 (3.7:1→5.6:1), `filter-bar` `tabindex="0"` 제거 + `role="group"`
- **P2**: `:root{color-scheme:dark}`, `prefers-reduced-motion` 전역 가드, `transition:all`→명시 속성, 텍스트형 입력 `:focus-visible` 통일, `touch-action:manipulation`, `.info-badge` 28px, `<meta name=theme-color>` JS 주입, `input[type=number]` `inputmode` 자동, `<main tabindex=-1>`, `.input-row` 모바일 1열

### 감사 중 발견·수정한 버그 (재발 방지용 기록)

1. **`.readout{position:sticky}` 단독 사용 시 스크롤하면 하단 콘텐츠 겹침** (커밋 47c6a91) — sticky는 2단 `.grid` 사이드바 전제인데 `.grid` 없이 전체폭 블록으로 쓴 24개 페이지(parental-leave, severance, national-pension, apr-calculator, loan-calc 등)에서 결과 패널이 뷰포트보다 길면 스크롤 시 고정되어 관련도구·SEO 섹션이 그 아래로 파고듦. **수정**: `theme-instrument.css`에서 `.readout` position 선언 제거하고 `.grid .readout{position:sticky; top:20px}`로 한정. `d12a03a` 디자인 시스템 도입 때부터 있던 문제.

2. **typing-speed-test.html 지문 가로 스크롤** (커밋 1d3b809) — 지문 공백을 `&nbsp;`( )로 렌더 → 브라우저가 줄바꿈 지점을 못 잡아 문장 전체가 한 줄로 뻗음. **수정**: 일반 스페이스 + `.passage-box{white-space:pre-wrap; overflow-wrap:anywhere}`.

3. **`alert()`/`confirm()`가 사용자 동작 시 모달로 페이지 전체를 얼림** (커밋 fb8419c) — 입력 검증 실패·에러 처리에 `alert()` 쓴 파일 28개. 스크린리더·자동화도 차단. **수정**: `theme-instrument.js`에 `window.toast(msg)` (비블로킹 토스트, `.mh-toast` CSS), 28개 파일 `alert(` → `(window.toast||alert)(` 치환.

4. **`navigator.clipboard.writeText().then()`에 `.catch()` 없음 → 미처리 promise rejection** (커밋 fb8419c) — 복사 버튼 34개 파일. `file://`·비보안 컨텍스트·포커스 없음·구형 브라우저·권한 거부에서 uncaught rejection. **수정**: `theme-instrument.js`에 `unhandledrejection` 전역 핸들러로 clipboard 계열 reject 흡수(`preventDefault`).

5. **URL 검사 툴 allorigins 프록시 `fetch`에 타임아웃 없음** (커밋 fb8419c) — 프록시가 느리면 "분석 중..." 무한 + 버튼 영구 비활성. **수정**: canonical-tag-checker, http-header-checker, meta-tag-analyzer, robots-txt-validator, sitemap-validator에 `AbortSignal.timeout(12000)`.

### 2026-09-01 인터랙션 전수 감사 (319페이지, 잘못된 값 입력 + 모든 버튼 클릭)로 추가 발견한 버그

6. **ico-converter.html** (커밋 4822dcd) — `updatePreview()`가 `_origImg` null 체크 없이 `drawSize()`에서 `_origImg.naturalWidth` 접근. 이미지 올리기 전에 크기 체크박스를 토글하면 `Uncaught TypeError`. → `updatePreview()` 맨 앞 `if(!_origImg)return;`.

7. **image-watermark.html** (커밋 c39e8a4) — `applyLang()`이 `<label id="lblOpacity">불투명도 <span id="opacityVal">70</span>%</label>`의 `textContent`를 통째로 교체 → 안에 중첩된 `#opacityVal` span 파괴 → 불투명도 슬라이더 `oninput`이 `null.textContent` 접근으로 크래시. **언어 무관, 첫 로드 `applyLang`부터** 발생. → label 텍스트를 별도 `<span id="lblOpacity">`로 감싸 i18n이 형제 span을 안 건드리게. **패턴 주의: i18n 대상 요소 안에 id 붙은 live 자식(값 표시 span, canvas 등)을 두지 말 것.**

8. **open-graph-generator.html / twitter-card-generator.html** (커밋 e09bac6) — 미리보기 `<img onerror="this.parentElement.innerHTML=...">`. 사용자가 이미지 URL을 연속으로 바꿔 입력하면 이전 `<img>`가 DOM에서 분리된 뒤 error 이벤트가 늦게 발생 → `this.parentElement === null` → **입력마다 반복** `Uncaught TypeError`. → `onerror`에 `if(this.parentElement)` 가드.

이 감사에서 자동화 스크립트가 다운로드 버튼·외부링크(`target=_blank`, Google 리치결과 테스트 등)를 클릭해 실제 다운로드/새탭이 발생함 — 감사 스크립트는 `HTMLElement.prototype.click` 오버라이드로 `<a download>`·`<a target=_blank>`·`http(s)` href 클릭과 `window.open`·form submit을 무력화해야 함(사이트 문제 아님).

### 2026-09-01 계산기 수식 전수 검증으로 발견한 계산 오류 (커밋 9f20982·5790d78·79c26f8·9a6d54e)

9. **savings-calc.html** (9f20982) — `fmtW(n){return fmt(n)+'만원';}`인데 `n`이 raw 원 값(예 6,000,000)이라 "6,000,000만원"(60조)으로 표시. 이자·세금 계산 로직 자체는 정상, **표시 접미만** 문제. → `fmtW`를 `fmt(n)+'원'`으로. **주의: dsr-calc는 입력이 만원 단위라 같은 패턴이어도 정상 — 파일별로 입력 단위 확인 후 판단.**

10. **body-fat-calculator.html** (5790d78) — 미해군 체지방 공식이 cm 입력에 **인치 기준 상수**(`86.010*log10(waist-neck)-70.041*log10(h)+36.76` 등)를 그대로 사용 → 남성 약 6.5%p, 여성도 과다. → 미터법 US Navy 공식 `495/(1.0324-0.19077*log10(waist-neck)+0.15456*log10(h))-450` (여성 `495/(1.29579-0.35004*log10(waist+hip-neck)+0.22100*log10(h))-450`). 검증: 남 180/허리90/목40 → 24.9%→18.4%. BMI법(Deurenberg)은 원래 정상.

11. **salary-reverse.html** (79c26f8) — 자체 `getIncomeTax(taxableMonthly, dependents)`가 **월 과세표준에 연 종합소득세 누진식**(`Math.round(m*0.24-468600)` 등)을 적용 → 소득세 대폭 과다 → 필요 세전연봉 ~10% 과다(월 300만 목표 시 4,532만→4,096만). → salary.html 정본 간이세액표 블록(`TAX_TABLE` 646행 + `TAX_BASE_10M` + `getIncomeTax`, ~42KB) 이식. `computeNet()`은 이미 `getIncomeTax(insBase, dependents)` 호출 중이라 함수만 교체.

12. **salary-raise.html** (9a6d54e) — 11번과 동일한 깨진 `getIncomeTax(m,d)`. 정본 블록 이식. 검증: `getIncomeTax(3900000,1)`=182,610 / `getIncomeTax(3416666,1)`=114,990 (salary.html과 정확히 일치).

13. **payslip-calc.html / salary-negotiation.html** (9a6d54e) — 소득세를 `연 gross*12` 구간별 세율 후 `*0.45/12`(payslip) / `*0.5/12`(negotiation) 같은 **임의 근사 계수**로 계산. → 정본 세액표 이식 + `const incomeTax=getIncomeTax(insBase,1);` / `getIncomeTax(Math.max(0,monthly-200000),1)`로 교체. 검증: payslip 월급 380만 → 소득세 169,260.

**교훈: 한국 근로소득세를 계산하는 툴은 반드시 salary.html의 `TAX_TABLE`+`getIncomeTax` 정본을 이식할 것.** 연 종합소득세 누진식(6/15/24/35/38/40/42/45%)을 월 과표에 직접 쓰거나 `*0.45` 같은 계수로 눙치면 전부 틀림. salary.html·four-insurance·salary-calc·hourly-wage는 이미 정본 사용 중(정상).

### 신규 QA 항목 (위 감사에서 얻은 교훈)
- **레이아웃 감사 ≠ 인터랙션 감사**: "계산 실행 후 스크롤" 검사만으로는 3~8번을 못 잡음. 새 툴/수정 시 **잘못된 값(빈 값·음수·`!@#`·`bad url`) 입력 + 모든 버튼 클릭 + 언어 전환 후 재입력**까지 하고 콘솔 `unhandledrejection`·`error`·블로킹 모달·새 탭까지 확인.
- **i18n `element.textContent=` 대상 요소에 id 붙은 자식 두지 말 것** (7번). 값 표시 span은 label 밖이나 별도 텍스트 span으로 분리.
- **`<img onerror>` / 비동기 콜백에서 `this.parentElement`·`getElementById` 결과는 항상 null 체크** — 요소가 그 사이 교체·분리됐을 수 있음.
- **금액 표시 헬퍼(`fmtW` 등)는 입력 단위와 접미 단위를 반드시 대조** (9번). "만원" 붙이는 함수에 raw 원을 넘기면 10000배.
- **한국 근로소득세 = salary.html `TAX_TABLE`+`getIncomeTax` 정본 이식** (11~13번). 연 누진식·임의 계수 금지.
- **새/수정 계산기는 알려진 입력 1~2개로 결과를 손계산 또는 정본 툴과 대조** — 법정 수치 하드코딩 툴은 위 "연도별 정기 점검" 표도 확인.
- **`alert()`/`confirm()`/`prompt()` 절대 쓰지 말 것** — `window.toast(msg)` 사용 (theme-instrument.js 제공, 320개 페이지 로드됨).
- **`navigator.clipboard.writeText(...)`는 반드시 `.catch()` 붙일 것** — 전역 핸들러가 흡수하지만 개별 파일에서도 실패 시 사용자 피드백(토스트) 주는 게 정석.
- **외부 `fetch`(CORS 프록시 등)에는 반드시 `{signal:AbortSignal.timeout(ms)}`** — 무한 대기 방지.
- **`.readout`을 쓸 땐 `.grid` 2단 레이아웃 안에 넣을 것** — 단독 블록으로 쓰면 sticky 안 붙지만 그 외 스타일은 그대로 적용됨(현재 CSS 기준 단독은 static).
- 감사 방법: 로컬 `python3 -m http.server` + `mcp__claude-in-chrome__browser_batch`로 navigate+eval 페어를 6~8개씩. 배치 10개↑는 45s CDP 타임아웃. `alert()`는 자동화도 얼리므로 감사 스크립트에서 `window.alert/confirm/prompt` 스텁 필수.

## 2026-09-01 디자인 일관성 전수 감사 (커밋 53fbb9e → 48f759e)

전체 HTML 836개(루트 325 실페이지 + 스텁 69 + guides 431 + category 11) 대상. 정적 스캔 + 스크린샷 대조.

### 사이트는 2-tier 디자인이 정상 (드리프트 아님)
- **툴 tier** (~320): `theme-instrument.css`/`.js` 공유. 그라디언트 워드마크 + 코너 글로우 + `FINANCE·INSTRUMENT` eyebrow + 그라디언트 h1.
- **콘텐츠 tier** (guides 431 + about/contact/privacy/terms 4): 밋밋한 헤더(`class="logo"` 또는 `.header-label`, 그라디언트 없음) + 얇은 보더 + 앰버 좌측보더 h2. guides는 인라인 스크립트 없음(GA+AdSense만).

### 발견·수정한 실제 드리프트

| 커밋 | 내용 | 파일수 |
|---|---|---|
| `53fbb9e` | privacy.html에 canonical + hreflang 누락 (sitemap 등재·전 페이지 링크되는 정식 페이지인데) | 1 |
| `858d40a` | **Google Fonts 링크 4종 → 1종 통일**: `Noto+Sans+KR:wght@400;600;700`(447) / `400;500;700;900`(290) / `Noto+Sans`(비-KR, 한글 페이지인데 Latin만 로드, 24) / `400;500;700`(5) → `Noto+Sans+KR:wght@400;500;600;700;800;900&family=DM+Mono:wght@400;500`. theme CSS가 쓰는 600·개별 페이지 800·900이 로드 안 돼 폴백되던 문제 해소 | 766 |
| `858d40a` | privacy `--accent` `#4ade80`(초록) → `#fbbf24`(앰버, 사이트 표준) | 1 |
| `858d40a` | viewport `initial-scale=1` → `1.0` 표기 통일 | 13 |
| `1001cd8` | about/contact/terms `<html lang="en">` → `"ko"` (기본 표시가 koContent, privacy는 이미 ko) | 3 |
| `1001cd8` | EN 가이드 back-link `../index.html` → `../index.html?lang=en` (63개는 이미 그럼) | 113 |
| `4166c25` | **툴 헤더 마크업 정규화**: `<span class="logo">`+`<button class="lang-btn">` 쓰던 6개(cron-parser·csv-viewer·pdf-compressor는 lang 버튼이 브라우저 기본 회색 3D 버튼으로, ai-youtube-title-generator·apache-config-generator·api-response-viewer는 밋밋한 텍스트로 렌더) → `<div class="dot">`+`<span class="header-label">`+`.lang-toggle` 표준. + `<span class="dot">`→`<div class="dot">` 5개 | 11 |
| `48f759e` | 구 템플릿 3개의 자체 `header{}`·`.back-link{margin-left:auto}`·`.seo{color:muted}` 오버라이드 제거(back-link이 워드마크 옆이 아닌 가운데로 밀리던 것, SEO h2가 회색이던 것) + minimum-wage `.back-link{margin-left:auto}` 제거 | 4 |
| `d2631b7` | **lang-toggle 전부 `<button type="button">`으로 통일** (`<div class="lang-toggle">` 178 → button). 정보 페이지 4개는 자체 `.lang-toggle`에 `background:transparent;appearance:none` 추가. color-blindness-simulator `.grid`→`.sim-grid`(theme 2단 레이아웃 충돌 회피). loan-calc 중복 인라인 style 제거. guides/index.html `.logo`→`.header-label` | ~185 |
| `b2fc877` | **구형 SEO/FAQ 마크업 24개 → `<div class="seo">` + `<details>`** (KO 계산기: salary·severance·four-insurance·income-tax·gift-tax·acquisition-tax 등. 항상 펼쳐진 `<div class="faq-item"><h3 class="faq-q">` → 접이식 `<details>`). 죽은 `.faq-*` CSS 제거. FAQPage JSON-LD·div 균형 검증 | 24 |
| `ff83c35` | **JS 아코디언 FAQ 3개** (json-formatter·jwt-decoder·uuid-generator): `renderFaq()`가 언어별로 커스텀 `.faq-item.open` 아코디언을 innerHTML로 재구성 → `<details>` 템플릿. 정적+렌더+CSS 정리 | 3 |
| `c40958b` | **남은 구형 FAQ 3개** (i18n 포함): hash-generator·regex-tester(`<p id="seoFaqN"><strong>Q</strong><br>A</p>` + forEach, 4개국어 i18n 문자열도 `<summary>/<p>` 구조로 변환, 아포스트로피 `\'` 보존), loan-calc(`_loanSeo[lang].faq` 문자열 4개국어). hash-generator는 중복이던 별도 `#faqSection` 아코디언 삭제 + FAQPage JSON-LD 재생성 | 3 |
| `65dadf4` | loan-calc `<section class="seo">` → `<div class="seo">` (놓친 것). **사이트 전체 `<section class="seo">` 0개 달성** | 1 |

### 최종 상태 (전 사이트)
- `<section class="seo">` 0, `class="faq-q"` 0, `<div class="lang-toggle">` 0, `class="lang-btn"` 0, 툴에서 `<span class="logo">` 0
- Google Fonts 링크 변형 1종
- 구형 FAQ 30개 전부 `<details class="faq-item">` (theme-instrument.css `details.faq-item` 중앙 스타일). 브라우저에서 ko/en/zh 렌더 + 언어전환 재렌더 + 접이동작 + 콘솔 에러 0 확인.

### 남긴 것 (렌더 동일 / 정상)
- back-link `id="backLink"` vs `data-i18n="backLink"`(10개): 둘 다 동작, theme/related.js가 이 id를 참조 안 함, 변환은 개별 파일 applyLang JS 수술 필요 → 방치.
- 한국 전용 툴 38개 hreflang = `ko` + `x-default`(같은 URL): **정상**. 번역 없는 단일언어 페이지의 올바른 hreflang 설정. 가짜 en/zh/ja 추가 금지.

### QA 항목
- **신규 툴 폰트 링크는 반드시 `Noto+Sans+KR:wght@400;500;600;700;800;900&family=DM+Mono:wght@400;500&display=swap`** (사이트 유일 표준). `Noto+Sans`(비-KR) 금지.
- **헤더는 `<div class="dot"></div><span class="header-label">MODOO HUB</span><a class="back-link">...<div class="lang-toggle">` 표준**. `.logo`·`.lang-btn` 클래스 금지(theme CSS가 스타일 안 함).
- **`header{}`·`.back-link{}`·`.seo{}`·`.readout{}` 등 공유 클래스를 개별 파일 `<style>`에서 재정의하지 말 것** — theme-instrument.css가 중앙 관리. 재정의하면 페이지마다 미묘하게 어긋남.
- **lang toggle은 `<button type="button" class="lang-toggle">`**. `<div>` 금지. FAQ는 `<details class="faq-item"><summary>Q</summary><p>A</p></details>` (theme가 `details.faq-item` 스타일). `<div class="faq-item">`·`.faq-q`·`.faq-a`·커스텀 아코디언 JS 금지.
- **i18n 문자열을 정규식으로 변환할 때 `\'`(이스케이프된 아포스트로피) 보존** — 라인 기반 매칭 쓰고, `re.sub` 치환문은 콜백(`lambda m: ...`)으로 (치환 문자열의 `\\`가 재해석되어 JSON-LD `\.` 깨진 사례 있음).

## 2026-09-02 FAQPage JSON-LD 전수 확장

FAQPage JSON-LD가 초기 기준선대로 Question 4개만 담아 화면 프리렌더 FAQ
8~15개와 불일치 → 리치 스니펫 노출 손실. **루트 실페이지 262개**의 FAQPage
JSON-LD를 화면 `<div class="seo">` 프리렌더 FAQ 전부로 확장.

- 대상: FAQPage 있고 화면 details > JSON-LD Q 인 모든 파일 (스텁·i18n 템플릿 제외)
- standalone 블록은 통째 교체, `@graph` 8개는 FAQPage 노드만 교체(WebApplication 등 보존)
- 스크립트: `/tmp` 아님, 방식은 `<script>` 스트립 후 프리렌더 `<details>` 추출 →
  "Q."/"A." 접두사·인라인태그 제거·중복질문 제거 → json.dumps(ensure_ascii=False) →
  **re.sub 콜백 치환**(백슬래시 `\` 재해석 방지, regex-cheatsheet 등 정규식 답변)
- schema-markup-generator: 생성기 출력 템플릿(`<\/script>` 이스케이프) false positive
  회피, real 블록만 교체

검증: 262개 전부 WebApplication/SoftwareApplication 스키마 유지, FAQPage Q수 =
프리렌더 화면 details 수, real ld+json 647개 전부 유효, 문법 578개 0에러,
남은 불일치 0. 브라우저 ~25개 라이브 확인(json-validator·qr·image-compressor·
csv-viewer(@graph)·schema-markup-generator·regex-cheatsheet(백슬래시)·unit-converter
등) — 콘솔 에러 0, 툴 동작 정상.

### QA 항목
- **신규 툴 FAQPage JSON-LD는 화면 `<details>` FAQ 전부 반영** (8개 이상 권장).
  4개만 넣지 말 것.
- FAQ 답변에 정규식·코드(`\d`, `\.` 등) 들어가면 JSON-LD 생성 시 `re.sub` 콜백
  치환 필수 (치환문자열의 `\`가 재해석돼 `\.` 되면서 JSON 깨짐).

## 2026-09-02 전체 사이트 전수 재점검 (megacheck)

폰트·디자인·FAQPage 대량 변경 후 836개(루트 394 + guides 431 + category 11)
전수 정적 스캔 + 브라우저 샘플 40여개. 발견·수정:

| 항목 | 내용 |
|---|---|
| `690164e` | **category 허브 11개에 GA(G-NR6VJF0534)·AdSense 태그 자체가 없었음** — 애널리틱스·광고 수익 누락. 표준 스니펫 추가. + FAQ가 `<button class="faq-q" onclick="toggleFaq()">` 커스텀 아코디언 → `<details>` 표준 통일, toggleFaq 함수·죽은 CSS 제거 |
| `2add4c5` | **index.html hreflang 8개 → 5개**: `hi`(i18n 미지원), `de`·`fr`(둘 다 `?lang=en` 가리킴 = Google hreflang 규격 위반), `zh-Hans`+`zh-Hant` 중복 제거. `ja` 누락 추가 → ko/en/zh/ja/x-default. index i18n은 실제로 ko/en/zh/ja만 지원 |

### 오탐이었던 것 (수정 안 함)
- `html-encoder.html` "page.html" 링크 = JS i18n 문자열 안의 인코딩 샘플 HTML
- guides `hreflang` 3개(ko/en/x-default) = -en.html 쌍 있는 바이링궐 가이드의 정상 세트
- `schema-markup-generator` ld+json "무효" = 생성기 출력 템플릿(`<\/script>`)

### 재점검 통과 (836개, 이슈 0)
JS 문법 1270개 스크립트 0에러 · ld+json 647개 real 블록 전부 유효 · 내부 링크 0 broken ·
canonical/GA/AdSense 누락 0(naverfc 제외) · 폰트 링크 1종 · viewport 1종 · gstatic preconnect 전부 ·
`<section class="seo">` 0 · `class="faq-q"` 화면 0 · `<div class="lang-toggle">` 0 ·
FAQPage Q < 화면 details 불일치 0.

## 기존 툴 PDF 라이브러리 CDN

- pdf-lib: `https://unpkg.com/pdf-lib@1.17.1/dist/pdf-lib.min.js`
- PDF.js: `https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.min.js`
- PDF.js worker: `https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.worker.min.js`
- jsPDF: `https://unpkg.com/jspdf@2.5.1/dist/jspdf.umd.min.js`
