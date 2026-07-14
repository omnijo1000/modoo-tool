# 중복 클러스터 탐지 보고서 (2단계)

감사일: 2026-07-14 · 대상: 저장소 루트 393개 HTML (분석 모수: 특수페이지 제외 툴 페이지 386개)
방법: (a) 전 파일 title·기능 대조로 기능적 중복 클러스터 수작업 확정, (b) 각 페이지의 실제 렌더링 텍스트(정적 DOM + ko i18n 블록의 seoHtml/FAQ 문자열)를 추출해 단어 3-gram shingle 자카드 유사도를 전 쌍(74,305쌍) 계산.

---

## A. 기능적 중복 클러스터 (검색 의도가 사실상 동일한 키워드 변형)

심사관 판정 기준: "사용자가 Google에서 이 두 페이지 중 무엇을 클릭해도 같은 문제가 해결되는가?" YES면 같은 클러스터. 아래는 실제 title 태그와 기능을 대조해 확정한 것으로, 파일명 추측이 아니다.

### A-1. 완전 중복 (같은 기능, 슬러그만 다름) — 최악 등급

| # | 클러스터 | 파일 | 증거 (title 대조) |
|---|---|---|---|
| 1 | BMI | bmi-calc.html / bmi-calculator.html | "BMI 계산기 - 체질량지수" vs "BMI Calculator - Body Mass Index + BMR" — 둘 다 4개 언어 지원하므로 ko/en 분리 명분 없음 |
| 2 | QR | qr-generator.html / qr-code-generator.html | "QR Code Generator - Free Online" vs "QR코드 생성기 - 무료 QR Code Generator" |
| 3 | 건강보험 | health-insurance.html / health-insurance-calc.html / health-insurance-calculator.html | **3개 페이지**: "건강보험료 계산기 2026" / "건강보험료 정산 계산기 2026" / "건강보험료 계산기 - 2026년" — 정산 페이지만 겨우 차별화, 나머지 2개는 동일 의도 |
| 4 | 국민연금 | national-pension.html / national-pension-calculator.html | "조기수령 vs 연기수령"과 "보험료·예상수령액" — 부분 차별화되나 검색 의도(국민연금 계산기) 동일 |
| 5 | 퇴직금 | severance.html / severance-pay-calculator.html | "퇴직금 계산기 2026" vs "퇴직금 계산기 - 무료 온라인" — 완전 동일 의도 |
| 6 | 실업급여 | unemployment.html / unemployment-benefit.html | "실업급여 계산기 2026" vs "실업급여 계산기 \| 2026년 기준" — title까지 사실상 동일 |
| 7 | CAGR | cagr-calculator.html / compound-annual-growth-rate-calculator.html | 같은 계산기, 슬러그 풀네임 변형 |
| 8 | 키워드 밀도 | keyword-density.html / keyword-density-checker.html | 동일 기능 |
| 9 | 키워드 그룹핑 | keyword-clustering-tool.html / keyword-grouping-tool.html | clustering=grouping, 동일 기능 |
| 10 | 슬러그 | slug-generator.html / url-slug-generator.html (+slug-checker.html) | "Slug Generator - Convert Text to URL Slug" vs "URL 슬러그 생성기 - 텍스트를 URL로 변환" |
| 11 | 파비콘 | favicon-generator.html / favicon-maker.html (+ico-converter.html) | "파비콘 생성기 - 이미지로 Favicon" vs "파비콘 만들기 - 무료 온라인 파비콘 생성기" |
| 12 | SVG 최적화 | svg-minifier.html / svg-optimizer.html / svg-cleaner.html | 3개 모두 "SVG 용량 줄이기" 의도 |
| 13 | Timestamp | timestamp.html / epoch-converter.html | "Unix Timestamp Converter" vs "에포크 타임 변환기 - Epoch Converter" — epoch=unix timestamp |
| 14 | XML 포맷터 | xml-formatter.html / xml-beautifier.html | "XML Formatter - Beautifier & Validator" vs "XML 예쁘게 정렬 - XML Beautifier" |
| 15 | 읽기 시간 | read-time-calculator.html / word-to-minute-converter.html | 둘 다 단어수→읽기/말하기 시간 |
| 16 | 그라디언트 | gradient-generator.html / css-gradient-generator.html | 동일 출력(CSS gradient) |
| 17 | 색 대비 | color-contrast-checker.html / accessibility-color-checker.html | 둘 다 WCAG 대비 검사 |
| 18 | 중복 줄 제거 | remove-duplicate-lines.html / text-deduplicator.html / duplicate-line-finder.html | title이 각각 "Remove Duplicate Lines" / "중복 줄 제거기" / "중복 줄 찾기·제거" — 3개 동일 기능 |
| 19 | PDF 텍스트 추출 | pdf-extract-text.html / pdf-to-text.html | 자카드 0.418 (실측 최상위권). FAQ 답변까지 문장 단위 일치 (아래 B 참조) |
| 20 | PDF 페이지 추출 | pdf-split.html / pdf-page-extractor.html | title이 둘 다 "PDF Page Extractor" |
| 21 | PDF→이미지 | pdf-to-image.html / pdf-thumbnail-generator.html | 둘 다 PDF 페이지→PNG 렌더링 |
| 22 | 이미지 메타데이터 | image-metadata-viewer.html / exif-viewer.html (+exif-remover는 기능 구분됨) | 이미지 메타데이터=EXIF |
| 23 | 이미지 색상 추출 | image-color-extractor.html / dominant-color-finder.html | 자카드 0.239, 둘 다 이미지→팔레트 |
| 24 | 마크다운 | markdown-preview.html / markdown-to-html.html | 프리뷰 툴이 HTML 출력을 포함 — 의도 중첩 |
| 25 | 만나이 | age-calculator.html / korean-age.html | 둘 다 생년월일→나이. (korean-age는 한국 특화로 차별화 여지 있음) |
| 26 | 영업일 | business-days-calculator.html / working-days-calc.html | 둘 다 공휴일 제외 근무일수 |
| 27 | JWT 해부 | jwt-decoder.html / jwt-inspector.html / jwt-validator.html / jwt-expiration-checker.html | 디코더가 나머지 3개 기능(구조 분석·유효성·exp 확인)을 전부 포함. jwt-generator만 별개 기능 |
| 28 | UUID 생성 | uuid-generator.html / uuid-bulk-generator.html | bulk는 생성기의 옵션 하나 |
| 29 | 케이스 변환 | case-converter.html / uppercase-converter.html / lowercase-converter.html / sentence-case-converter.html | case-converter 1개가 상위 3개의 기능을 전부 포함. 자카드 upper↔lower 0.271 |
| 30 | 해시 | hash-generator.html / md5-generator.html / sha256-generator.html | hash-generator가 MD5/SHA256 포함. md5↔sha256 자카드 0.220 |
| 31 | 토큰 카운터 | ai-token-counter.html / chatgpt-token-counter.html / token-estimator.html / prompt-token-estimator.html | **4개 페이지** 전부 "텍스트→LLM 토큰 수 추정". title: "AI Token Counter - GPT, Claude, Gemini" / "ChatGPT Token Counter" / "AI 토큰 추정기" / "프롬프트 토큰 추정기 - GPT/Claude/Gemini" |
| 32 | AI 비용 | ai-cost-calculator.html / openai-cost-estimator.html / claude-cost-estimator.html / gemini-cost-estimator.html / ai-pricing-comparison.html | 모델사별 쪼개기. openai↔claude 자카드 0.212. ai-cost-calculator + 비교표 1개면 충분한 의도 |
| 33 | 프롬프트 개선 | prompt-improver.html / prompt-optimizer.html (+prompt-cleaner.html) | improver=optimizer 동의어 쪼개기 |
| 34 | 프롬프트 템플릿 | prompt-template-generator.html / prompt-template-library.html | 생성기/모음집 — 의도 중첩 |
| 35 | Base64 텍스트 | base64-encoder.html / base64-decoder.html / text-to-base64.html / base64-to-text.html / base64-url.html | text-to-base64=base64-encoder(자카드 0.293), base64-to-text=base64-decoder(0.216), base64-url은 인/디코더 합본+URL모드(encoder의 옵션) |
| 36 | Base64 이미지 | base64-image.html / image-base64-encoder.html / image-base64-decoder.html | base64-image 1개가 양방향 수행 |
| 37 | 이미지 블러/픽셀 | blur-image.html / pixelate-image.html | **전체 1위 자카드 0.464** — FAQ 8개 중 4개가 완전 동일 문장 |
| 38 | robots.txt 검사 | robots-txt-tester.html / robots-txt-validator.html | "테스터"와 "검증기 - 문법 검사 & URL 크롤링 허용 여부 테스트" — validator가 tester 기능 포함 |
| 39 | 스니펫 미리보기 | meta-tag-preview.html / serp-snippet-preview.html (+meta-tag-analyzer.html) | 둘 다 SERP 모양 미리보기 |
| 40 | 스키마 생성 | schema-markup-generator.html / schema-generator-faq.html / schema-generator-product.html / schema-generator-article.html | 통합 생성기가 있는데 타입별로 3개 추가 쪼개기 |
| 41 | 크론 | cron-parser.html / cron-validator.html (+cron-generator는 역방향이라 구분) | 파싱=검증 동일 의도 |
| 42 | 퍼센트 증감 | percent-calc.html / percentage-increase-calculator.html / percentage-decrease-calculator.html / discount-calculator.html | 증가/감소는 부호만 다른 같은 공식 (자카드 0.386). percent-calc가 상위집합 |
| 43 | 시급 환산 | salary-per-hour-calculator.html / hourly-rate-calculator.html (+freelancer-rate-calculator는 방향 다름) | 자카드 0.188, 둘 다 연봉↔시급 |
| 44 | 텍스트 비교 | text-diff-checker.html / text-similarity-checker.html (+csv-diff-checker/json-diff/yaml-diff-checker는 포맷 특화) | 유사도 검사가 diff의 요약 지표 |
| 45 | 유니코드 변환 | text-to-unicode.html / unicode-to-text.html / unicode-converter.html | converter 1개가 양방향 포함 |
| 46 | 텍스트 암호화 | text-encryptor.html / text-decryptor.html | 자카드 0.191, 한 툴의 양방향 |
| 47 | 이미지 WebP | image-to-webp.html / jpg-to-webp.html | image-to-webp가 jpg-to-webp의 상위집합 |
| 48 | VAT | vat-calc.html(ko) / vat-calculator-global.html / vat-reverse-calculator.html / gst-calculator.html | reverse는 vat-calc의 모드. gst/global은 지역 차별화로 일부 인정 |
| 49 | 대출 | loan-calc.html(ko) / loan-calculator-en.html / emi-calculator.html | loan-calculator-en과 emi-calculator는 동일 공식·동일 EN 타깃 |
| 50 | PDF 잠금 | pdf-unlock.html / pdf-password-remover.html (+pdf-password-adder는 역방향) | 자카드 0.222, "잠금 해제"와 "비밀번호 제거" 동일 의도 |
| 51 | 정규식 | regex-tester.html / regex-replace-tester.html / regex-extractor.html | tester가 replace/extract 모드 포함 가능 — replace/extractor는 tester의 탭 수준 |
| 52 | 랜덤 문자열 | random-string.html / password-generator.html (부분) + nanoid-generator.html / ulid-generator.html (ID 계열은 규격이 달라 개별 인정 여지) | random-string과 password-generator는 옵션 차이 |

**클러스터 수: 52개 / 연루 파일 약 140개.** 이 중 "완전 중복(대표 1개로 301 통합해야 함)" 판정은 3단계 verdict.csv에서 파일 단위로 확정.

### A-2. 방향 쌍 쪼개기 패턴 (X-to-Y / Y-to-X)

한 페이지에서 방향 토글 하나면 되는 기능을 2페이지로 쪼갠 패턴. 개별로는 "변환 방향별 검색어가 다르다"는 방어가 가능하나, 아래처럼 **본문까지 대칭 복제**된 경우 심사관은 도구 수 부풀리기(doorway)로 본다:

- avif-to-jpg ↔ jpg-to-avif (자카드 0.357), jpg-to-webp ↔ webp-to-jpg (0.246), jpg-to-heic ↔ heic-to-jpg, webp-to-png / png-to-jpg / png-to-svg / svg-to-png
- url-encoder ↔ url-decoder, html-encoder ↔ html-decoder, base64 계열 (위 35번)
- json-to-yaml ↔ yaml-to-json, json-to-xml ↔ xml-to-json, csv-to-json ↔ json-to-csv, json-to-csv 등 데이터 포맷 N×N 매트릭스
- markdown-to-html ↔ html-to-markdown
- hex-to-rgb ↔ rgb-to-hex (+상위집합 color-converter.html: "HEX RGB HSL 색상 코드 변환" — 이미 양방향+HSL까지 포함)

### A-3. 언어/포맷별 템플릿 복제 계열

- minifier/beautifier 6종 (html/css/javascript/sql/svg/json + graphql-formatter) — 개별 검색 수요는 실존하나, 본문이 "X를 압축합니다. 서버 전송 없음. FAQ 8개" 구조 동일
- validator 계열 (json/xml/yaml/sql/schema/csp/robots/sitemap/uuid/jwt/bcrypt) — 동일 구조
- ai-*-generator 12종 (email/resume/cover-letter/product-description/blog-title/youtube-title/thumbnail-title/tweet/linkedin-post 등) — **실제 AI 호출 없이** 템플릿 조합만 출력하는 "생성기"라면 기능 자체가 제목 사기에 가까움 (4단계에서 검증)

---

## B. 텍스트 유사도 실측 결과 (단어 3-gram shingle 자카드)

- 분석 문서: 386개 (ko 렌더링 텍스트 100자 이상)
- 전 쌍 74,305쌍 계산

### 결과: 자카드 ≥ 0.80 쌍 = **0쌍**

**80% 이상 문자 그대로의 복붙 쌍은 존재하지 않는다.** 각 페이지의 seoHtml·FAQ가 페이지별로 새로 작성(패러프레이즈)돼 있기 때문이다. 즉 이 사이트의 문제는 "literal duplicate content"가 아니라 **①동일 검색의도 페이지 분열(A절 52클러스터) ②템플릿 구조 균질성 ③얇은 본문**이다. — 추측이 아닌 실측이며, "유사도 검사만 통과하면 된다"는 방어가 불가능한 이유이기도 하다(심사관은 의도 단위로 본다).

### 상위 유사 쌍 (자카드 ≥ 0.20, 실측치)

| 자카드 | 파일 A | 파일 B |
|---|---|---|
| 0.464 | blur-image.html | pixelate-image.html |
| 0.418 | pdf-extract-text.html | pdf-to-text.html |
| 0.386 | percentage-decrease-calculator.html | percentage-increase-calculator.html |
| 0.357 | avif-to-jpg.html | jpg-to-avif.html |
| 0.293 | base64-encoder.html | text-to-base64.html |
| 0.271 | lowercase-converter.html | uppercase-converter.html |
| 0.246 | pdf-password-adder.html | pdf-unlock.html |
| 0.246 | jpg-to-webp.html | webp-to-jpg.html |
| 0.239 | dominant-color-finder.html | image-color-extractor.html |
| 0.232 | css-minifier.html | javascript-minifier.html |
| 0.231 | slug-checker.html | url-slug-generator.html |
| 0.230 | avif-to-jpg.html | heic-to-jpg.html |
| 0.228 | pdf-reorder-pages.html | pdf-rotate.html |
| 0.228 | pdf-extract-images.html | pdf-watermark.html |
| 0.226 | blur-image.html | image-watermark.html |
| 0.224 | pdf-rotate.html | pdf-unlock.html |
| 0.222 | pdf-password-remover.html | pdf-unlock.html |
| 0.221 | image-rotator.html | image-watermark.html |
| 0.220 | md5-generator.html | sha256-generator.html |
| 0.220 | image-watermark.html | pixelate-image.html |
| 0.218 | pdf-password-adder.html | pdf-password-remover.html |
| 0.216 | base64-decoder.html | base64-to-text.html |
| 0.215 | pdf-extract-images.html | pdf-extract-text.html |
| 0.212 | claude-cost-estimator.html | openai-cost-estimator.html |
| 0.212 | pdf-extract-images.html | pdf-to-text.html |
| 0.209 | svg-cleaner.html | svg-optimizer.html |
| 0.208 | salary-reverse.html | salary.html |
| 0.208 | pdf-page-extractor.html | pdf-word-counter.html |
| 0.204 | pdf-unlock.html | pdf-watermark.html |
| 0.201 | unemployment-benefit.html | unemployment.html |
| 0.200 | pdf-rotate.html | pdf-watermark.html |

(0.15~0.20 구간 추가 107쌍 — 원본 데이터: 스크립트 산출 138쌍. 참고: 짧은 한국어 문서의 단어 3-gram 자카드는 엄격한 척도로, 0.4는 "문장 절반이 동일 표현"에 해당한다. blur↔pixelate 쌍은 FAQ 8개 중 4개 문답이 글자 단위로 동일했다: "파일이 서버로 전송되나요? → 아니요. 모두 브라우저 로컬에서 처리됩니다." / "결과 형식은? → PNG로 다운로드됩니다." / "어떤 형식이 지원되나요? → PNG, JPG, WebP…" / "원본 해상도가 유지되나요? → 예, 원본과 동일한 해상도로 다운로드됩니다.")

### 문장 단위 복붙 실측 (교차 파일 동일 문장)

- "파일이 서버로 전송되나요?" — **29개 파일**에서 동일 질문
- "파일이 서버에 업로드되나요?" — 13개 파일
- "아니요. 모두 브라우저 로컬에서 처리됩니다." — **18개 파일에서 답변 문장까지 동일**
- "아니요. 브라우저 내에서만 처리됩니다." — 9개 파일
- "예, 모던 모바일 브라우저에서 동작합니다." — 4개 파일 (pdf-rotate/pdf-unlock 등)
- "PNG, JPG, WebP 등 브라우저에서 지원하는 이미지 형식 모두 지원합니다." — 4개 파일

→ FAQ "8개 필수" 규칙을 채우기 위해 정보가치 없는 한 줄짜리 범용 문답을 돌려쓴 증거. FAQPage 구조화 데이터가 이런 문답으로 채워져 있으면 리치결과 스팸 정책(반복적·자동생성 FAQ) 관점에서도 감점.

---

## C. 심사관 소견 (이 단계 결론)

1. 문자 그대로의 복붙 콘텐츠는 없다 — 그러나 **52개 클러스터 ~140개 파일이 검색의도 단위로 중복**이다. Google 품질 평가 관점에서 이것은 doorway/keyword-variant 확장 패턴이며, "Low value content" 반려의 1순위 구조적 원인으로 판정한다.
2. FAQ는 개수 규칙(8개)을 채우는 방식으로 양산돼, 한 줄짜리 무가치 문답이 교차 파일로 반복된다.
3. 부가 발견(1단계): **SEO 본문 전체가 JS 문자열로만 존재**하고 정적 HTML은 빈 `<div class="seo">`다. 심지어 9개 파일은 JS 문법 오류로 스크립트 전체가 죽어 있어 본문·FAQ·툴 기능이 전혀 렌더링되지 않는다 (inventory.csv js_broken 열, 4단계 상세).
