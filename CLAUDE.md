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

## 기존 툴 PDF 라이브러리 CDN

- pdf-lib: `https://unpkg.com/pdf-lib@1.17.1/dist/pdf-lib.min.js`
- PDF.js: `https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.min.js`
- PDF.js worker: `https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.worker.min.js`
- jsPDF: `https://unpkg.com/jspdf@2.5.1/dist/jspdf.umd.min.js`
