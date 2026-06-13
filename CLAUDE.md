# modoo-tool 프로젝트 컨텍스트

## 프로젝트 개요
- **사이트**: https://modoohub.com
- **구성**: 단일 HTML 파일 집합 (SPA 아님, 각 툴마다 별도 .html)
- **현재 툴 수**: 306개 (index.html footer 카운터 기준)
- **sitemap.xml**: 312 URL 항목

## 필수 코드 (모든 새 HTML 파일에 공통)

### GA / AdSense
```html
<!-- GA -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-NR6VJF0534"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-NR6VJF0534');</script>
<!-- AdSense -->
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6334638921720175" crossorigin="anonymous"></script>
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
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;600;700&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet">
```

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

### seoHtml (다국어 backtick 템플릿 리터럴로 저장)
```javascript
seoHtml: `
<h2>타이틀</h2>
<p>설명 500~800자</p>
<h2 class="seo-sub">자주 묻는 질문</h2>
<details class="faq-item"><summary>Q. 질문</summary><p>A. 답변</p></details>
<!-- 8개 FAQ -->
`
```

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

### 툴 카드 추가 (dev section: 254번째 줄 근처)
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
- `161가지` → `N가지`
- `161 tools` → `N tools`
- `161种工具` → `N种工具`
- `161種のツール` → `N種のツール`
- 메타 description도 수동 업데이트

## sitemap.xml 업데이트 방법

개발자 도구 섹션 (line ~97) 마지막 항목 뒤에 추가:
```xml
<url><loc>https://modoohub.com/SLUG.html</loc><lastmod>2026-06-11</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>
```

## related.js 업데이트 방법

### T{} 레지스트리에 추가
```javascript
'SLUG': { ko: 'KO NAME', en: 'EN NAME', zh: 'ZH NAME', ja: 'JA NAME', icon: 'ICON' },
```

### GROUPS[] 배열에 추가 (연관 툴 클러스터)
기존 관련 그룹에 slug 추가하거나 새 그룹 생성

### CATEGORY_MAP에 추가
```javascript
'SLUG': 'CATEGORY',
```
카테고리 목록: data-tools, security-tools, text-tools, ai-tools, developer-tools, image-tools, pdf-tools, generator-tools, finance-calculators, health-calculators, date-time-tools

## 현재 완료된 배치 현황 (2026-06-13)

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

## JS 문자열 이스케이프 주의사항

- 싱글쿼트 문자열 내 아포스트로피: `don\'t`, `&apos; (\')`
- backtick 템플릿 리터럴 내 백틱: `` \`code\` ``
- JSON-LD `<script type="application/ld+json">` 블록은 JS 문법 검사 제외

## 기존 툴 PDF 라이브러리 CDN

- pdf-lib: `https://unpkg.com/pdf-lib@1.17.1/dist/pdf-lib.min.js`
- PDF.js: `https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.min.js`
- PDF.js worker: `https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.worker.min.js`
- jsPDF: `https://unpkg.com/jspdf@2.5.1/dist/jspdf.umd.min.js`
