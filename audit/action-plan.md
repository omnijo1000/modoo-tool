# 실행 계획 (5단계) — AdSense 재심사 대비 구조 개편

감사일: 2026-07-14 · 근거: inventory.csv(404행) / clusters.md(52클러스터) / verdict.csv(KEEP 229·MERGE 67·REWRITE 96) / template-issues.md(구조 결함 5종)

실행 순서 원칙: **0번(죽은 페이지)과 3번(AI 사칭)을 고치지 않은 상태의 재심사 요청은 금지.** 심사관이 도구 하나만 눌러봐도 반려가 재현된다.

---

## 0. 선행 수리 (재심사 전 무조건)

**0-a. JS 문법오류 9개 파일 수리** (템플릿-issues.md §2 — 현재 툴·본문·FAQ 전부 렌더링 불능):
json-to-yaml.html(114행 백틱 이스케이프), markdown-to-html.html(백틱 이스케이프 — 단 이 파일은 아래 301 대상이므로 수리 대신 통합 가능), pdf-rotate.html(224행 중복 `let _buf…` 선언 삭제), pdf-unlock.html, pdf-reorder-pages.html, pdf-password-adder.html, pdf-extract-text.html, pdf-extract-images.html, image-base64-decoder.html(각각 동일 유형 중복 선언 제거). 수리 후 `node --check`를 커밋 전 훅으로 상설화.

**0-b. "AI ○○ 생성기" 12종 정직화**: 실제 LLM 호출이 없으므로 (i) title/H1/본문에서 "AI" 표기를 제거하고 "템플릿 생성기"로 재명명하거나, (ii) 사용자 API키 입력 방식으로 실제 AI 연동을 붙이거나, (iii) 페이지 삭제. 현재 상태로 재심사 받으면 기능-표기 불일치로 단독 반려 사유가 된다.

**0-c. 본문 정적화(프리렌더)**: seoHtml·FAQ가 이미 각 파일 JS 문자열에 존재하므로, 빌드 스크립트로 **ko 콘텐츠를 정적 HTML(`<div class="seo">` 내부)로 구워 넣고** JS는 언어 전환 시에만 교체하도록 변경. 정적 텍스트 중앙값 240자 → 1,200자+로 즉시 상승. 신규 파일 템플릿(CLAUDE.md)도 동일하게 수정.

---

## 1. 301 리다이렉트 매핑 전체 목록 (67건, from → to)

정적 호스트 설정(vercel.json redirects / netlify _redirects / .htaccess)로 구현. 301 불가 환경이면 privacy-policy.html처럼 canonical+meta-refresh 0초로 대체하되 301을 강력 권장. 대상 페이지에는 흡수되는 페이지의 고유 FAQ/기능(예: URL-safe 모드, bulk 옵션, 만료확인 탭)을 **먼저 이식한 후** 리다이렉트할 것.

```
accessibility-color-checker.html -> color-contrast-checker.html
ai-pricing-comparison.html -> ai-model-comparison.html
base64-to-text.html -> base64-decoder.html
base64-url.html -> base64-encoder.html
bmi-calculator.html -> bmi-calc.html
claude-cost-estimator.html -> ai-cost-calculator.html
compound-annual-growth-rate-calculator.html -> cagr-calculator.html
cron-validator.html -> cron-parser.html
dominant-color-finder.html -> image-color-extractor.html
duplicate-line-finder.html -> remove-duplicate-lines.html
epoch-converter.html -> timestamp.html
favicon-maker.html -> favicon-generator.html
gemini-cost-estimator.html -> ai-cost-calculator.html
gradient-generator.html -> css-gradient-generator.html
health-insurance-calculator.html -> health-insurance.html
hex-to-rgb.html -> color-converter.html
hourly-rate-calculator.html -> salary-per-hour-calculator.html
image-base64-decoder.html -> base64-image.html
image-base64-encoder.html -> base64-image.html
image-metadata-viewer.html -> exif-viewer.html
jpg-to-webp.html -> image-to-webp.html
jwt-expiration-checker.html -> jwt-decoder.html
jwt-inspector.html -> jwt-decoder.html
jwt-validator.html -> jwt-decoder.html
keyword-clustering-tool.html -> keyword-grouping-tool.html
keyword-density.html -> keyword-density-checker.html
lowercase-converter.html -> case-converter.html
markdown-to-html.html -> markdown-preview.html
md5-generator.html -> hash-generator.html
meta-tag-preview.html -> serp-snippet-preview.html
openai-cost-estimator.html -> ai-cost-calculator.html
pdf-extract-text.html -> pdf-to-text.html
pdf-page-extractor.html -> pdf-split.html
pdf-thumbnail-generator.html -> pdf-to-image.html
pdf-unlock.html -> pdf-password-remover.html
percentage-decrease-calculator.html -> percent-calc.html
percentage-increase-calculator.html -> percent-calc.html
prompt-improver.html -> prompt-optimizer.html
prompt-template-library.html -> prompt-template-generator.html
prompt-token-estimator.html -> ai-token-counter.html
qr-generator.html -> qr-code-generator.html
regex-extractor.html -> regex-tester.html
regex-replace-tester.html -> regex-tester.html
rgb-to-hex.html -> color-converter.html
robots-txt-tester.html -> robots-txt-validator.html
schema-generator-article.html -> schema-markup-generator.html
schema-generator-faq.html -> schema-markup-generator.html
schema-generator-product.html -> schema-markup-generator.html
sentence-case-converter.html -> case-converter.html
severance-pay-calculator.html -> severance.html
sha256-generator.html -> hash-generator.html
slug-checker.html -> slug-generator.html
svg-minifier.html -> svg-cleaner.html
svg-optimizer.html -> svg-cleaner.html
text-decryptor.html -> text-encryptor.html
text-deduplicator.html -> remove-duplicate-lines.html
text-to-base64.html -> base64-encoder.html
text-to-unicode.html -> unicode-converter.html
token-estimator.html -> ai-token-counter.html
unemployment-benefit.html -> unemployment.html
unicode-to-text.html -> unicode-converter.html
uppercase-converter.html -> case-converter.html
url-slug-generator.html -> slug-generator.html
uuid-bulk-generator.html -> uuid-generator.html
vat-reverse-calculator.html -> vat-calc.html
word-to-minute-converter.html -> read-time-calculator.html
xml-beautifier.html -> xml-formatter.html
```

참고: bmi/qr/slug/unemployment/severance/health-insurance/keyword-density/cagr/xml 9쌍은 이미 cross-canonical이 위 방향으로 걸려 있음 — 301로 확정하면 신호 상충(템플릿-issues §6)이 해소된다. 후속 작업: index.html 툴카드·category/*.html 카드·related.js T{}/GROUPS/CATEGORY_MAP에서 67개 슬러그 제거 및 카운터(394가지 등) 갱신.

## 2. sitemap.xml에서 제거할 URL (67건 — 전부 현재 sitemap에 존재함을 확인)

위 1번 목록의 from 쪽 67개 URL 전부 (`https://modoohub.com/{슬러그}` 형태). 제거 후 lastmod 갱신, IndexNow로 대표 페이지 48개 재제출.

## 3. REWRITE 우선순위 Top 20 (+ 구체 보강 지시)

선정 기준: GSC 노출 실적 우선(그나마 Google이 반응한 페이지), 동률은 본문 얇은 순. "보강"의 정의: **검색해서 다른 사이트에서 못 찾는 요소**를 최소 2개 추가. 공통 금지: 한 줄짜리 FAQ 추가로 글자수만 채우기.

| # | 파일 (현재 실질자수/노출) | 구체 추가 항목 |
|---|---|---|
| 1 | http-request-builder.html (906자/9회) | ①메서드·헤더·바디 조합별 실제 curl/fetch/axios 3종 코드 동시 출력 ②CORS 프리플라이트가 발생하는 조건 표(어떤 헤더 조합이 OPTIONS를 유발하는지) ③자주 틀리는 Content-Type 6종 사례 |
| 2 | text-case-detector.html (983자/9회) | ①camel/snake/kebab/Pascal/CONSTANT 판별 규칙표+엣지케이스(숫자·약어 포함 시) ②각 케이스가 쓰이는 언어·프레임워크 관례 매트릭스(JS변수/Python/CSS/DB컬럼/URL) ③일괄 변환 버튼(감지→원하는 케이스로) |
| 3 | time-calculator.html (539자/8회) | ①시간 덧셈·뺄셈 실수 패턴(60진법 반올림 오류) 사례 ②근무시간 계산 예제(휴게시간 공제 규정 연동, overtime-pay 링크) ③밀리초/초/분 환산표 |
| 4 | api-response-viewer.html (795자/8회) | ①HTTP 상태코드별 실전 대응표(401vs403, 502vs504) ②JSON 응답 안티패턴 사례(문자열로 감싼 숫자 등) ③curl-generator·json-formatter와 워크플로 안내 |
| 5 | pdf-metadata-viewer.html (630자/3회) | ①PDF 메타데이터 필드 전체 사전(Producer/Creator 차이 등) ②이력서·계약서 제출 전 메타데이터 유출 사고 시나리오 ③XMP vs Info dictionary 구조 설명 |
| 6 | webp-to-jpg.html (757자/3회) | ①WebP→JPG 변환 시 손실 비교 실측표(품질 70/80/90 파일크기) ②투명 배경이 흰색/검정으로 바뀌는 원리와 해결 ③iPhone/카톡 호환성 이슈 정리 |
| 7 | commission-calculator.html (832자/3회) | ①업종별 실제 수수료율 표(부동산 중개보수 요율표, 오픈마켓·배달앱 수수료 2026 실측) ②수수료 포함가 역산 공식 ③부가세 별도/포함 케이스 |
| 8 | ai-youtube-title-generator.html (839자/3회) | 0-b 정직화 선행. ①실제 고CTR 제목 패턴 데이터(숫자·대괄호·의문형 효과) ②제목 길이별 모바일 잘림 시뮬레이터 ③썸네일 문구와의 중복 회피 가이드 |
| 9 | yaml-validator.html (667자/2회) | ①YAML 함정 모음 실사례(Norway problem, 들여쓰기 탭 금지, 앵커 순환) ②K8s/GitHub Actions에서 자주 나는 스키마 오류 5종과 에러 메시지 원문 ③json-to-yaml과 교차링크 |
| 10 | pixelate-image.html (706자/2회) | blur-image와 FAQ 4개 동일(§3-1) — 전면 재작성. ①모자이크로 개인정보 가리기의 법적 주의(픽셀 크기 복원 가능성 연구 언급) ②픽셀아트 제작 워크플로 ③blur와의 차이 비교표 |
| 11 | emoji-counter.html (744자/2회) | ①이모지가 글자수 2~4개로 세지는 원리(서로게이트 페어·ZWJ) ②트위터/인스타 글자수 정책에서 이모지 취급 실측 ③unicode-inspector 교차링크 |
| 12 | keyword-density-checker.html (744자/2회) | ①"적정 밀도 2~3%"가 왜 미신인지(구글 공식 발언 인용) ②TF-IDF·엔티티 중심의 현대적 대안 설명 ③실제 상위 문서 밀도 분포 예시 |
| 13 | csv-diff-checker.html (774자/2회) | ①키 컬럼 기준 비교 vs 행 순서 비교 모드 설명 ②인코딩(EUC-KR/UTF-8 BOM)·구분자 문제 해결 ③엑셀 diff와의 차이 |
| 14 | wpm-calculator.html (797자/2회) | ①한글 타자속도(타/분)와 영문 WPM 환산 공식 — 한국어 자료 희소 ②직군별 요구 타속 데이터 ③typing-speed-test와 역할 분리 명시 |
| 15 | profit-calculator.html (819자/2회) | ①마진율vs마크업 혼동 사례 ②업종별 평균 영업이익률 데이터(통계청 인용) ③margin-calculator·break-even과 삼각 링크 |
| 16 | unicode-inspector.html (837자/2회) | ①육안 동일 문자 피싱(호모글리프) 실사례 ②NFC/NFD 정규화로 깨지는 한글 파일명 문제(macOS↔Windows) ③보이지 않는 문자(ZWSP) 탐지 가이드 |
| 17 | seo-title-generator.html (869자/2회) | ①픽셀 기반 잘림 계산(글자수 아닌 px — 한글/영문 폭 차이) ②2026 SERP 타이틀 재작성 트리거 조건 ③serp-snippet-preview 교차링크 |
| 18 | prompt-variable-extractor.html (914자/2회) | ①{{var}}/{var}/$var/Jinja2 등 포맷별 지원 명시 ②LangChain/프롬프트 템플릿 실무 예제 3종 ③prompt-template-generator와 워크플로 연결 |
| 19 | date-calc.html (178자/1회) | 실질 본문이 사실상 없음. ①D-day/기간계산 사용례(계약만료·복무일수·임신주수) ②음력 변환 한계 명시 ③working-days-calc·dday와 기능 경계표 |
| 20 | unit-converter.html (367자/0회) | ①단위계 오차 사고 사례(평↔㎡, 근·되 등 한국 전통단위 환산표 — 희소 콘텐츠) ②요리 계량(컵·큰술 국가별 차이) ③국제단위계 재정의(2019 kg) 짧은 해설 |

나머지 76개 REWRITE는 verdict.csv 참조(동일 기준: 희소 데이터 표 1개+실사용 시나리오 1개+FAQ를 검색 질의형 6~8개로 재작성).

## 3-보정. REWRITE 지시 원칙 (분석 정확도 보정, 2026-07-14 추가)

기존 inventory.csv의 글자수 지표(static_text_chars/ko_i18n_content_chars/total_content_chars)는 헤더·푸터·related.js 관련도구 패널까지 포함해 계산된 것으로 의심되어 재검증함. 결과: related.js의 관련도구 패널은 DOMContentLoaded 시점에 순수 JS로 DOM에 주입되며 정적 HTML 소스에는 애초에 존재하지 않으므로, 정적 파일 파싱 기반의 기존 지표에는 실제로 포함되지 않았음을 확인함(우려했던 원인은 아니었음). 대신 `<main>` 스코프로 좁히고 공통 "브라우저 내 처리" 푸터 문구를 제외해 재계산한 결과, 54개 파일에서 기존 지표 대비 300자 이상 또는 50% 이상의 큰 괴리가 발견됨(회귀 검증 후 실제 32개 확정 — 상세: `audit/thin-content-real.md`, `audit/inventory.csv`의 `unique_char_count` 컬럼). 원인은 크게 두 가지: ① 일부 파일(hash-generator 등)은 "활용 예시" 등 일부 섹션이 여전히 JS 런타임에만 존재하고 정적 소스에는 "로딩 중..." 플레이스홀더만 남아 있음(0-c 프리렌더 작업에서 누락된 잔여 사례) ② 일부 글로벌(EN 우선) 도구는 기존 ko_i18n_content_chars가 한국어 콘텐츠 기준으로 측정되어 있어, 실제 정적 렌더링된 영어 콘텐츠 분량과 비교 기준이 달랐음(언어 기준 불일치이지 결함은 아님). 두 원인 모두 개별 확인 필요 — 목록의 파일을 열어 실제 사유를 확인한 뒤 그에 맞게 처리할 것(①은 0-c 방식으로 마저 정적화, ②는 무시하거나 참고만).

향후 REWRITE 지시(현재 Top 20 이후 남은 76개 포함)는 다음 관점으로 구체화할 것 — "무엇이 부족한가"가 아니라 "다른 사이트에 없는 무엇을 더할 것인가"에 집중:

- **개발자 도구**: "이게 무엇인가/어떻게 쓰는가" 식 일반 기능 설명 금지. 대신 **실무에서 실제로 마주치는 edge case와 트러블슈팅**에 집중할 것 — 예: 특정 에러 메시지의 원문과 원인, 흔한 실수 패턴과 재현 조건, 도구가 지원하지 않는 경계 케이스와 우회법, 실제 프로덕션에서 발생하는 버전/브라우저별 차이. 일반 기능 설명은 이미 모든 경쟁 사이트에 있고 글자수만 채울 뿐 검색 상위 노출에 기여하지 않는다.
- **계산기류(금융·건강 등)**: "OO란 무엇인가" 식 사전적 정의 금지. 대신 **법적 근거(법조문·시행령·정부 고시 번호)·실제 계산 로직(공식의 유도 과정과 반올림·구간 처리 방식)·실제 사례(구체적 숫자를 넣은 워크플로)** 세 가지를 반드시 포함할 것. 일반적 정의문은 unique_char_count 재계산에서 확인했듯 글자수만 늘릴 뿐 페이지 고유성에 기여하지 않는 대표적 원인이었다.

## 4. 에디토리얼 콘텐츠(가이드/칼럼) 추천 주제 10개

도구는 "체류 0초-이탈" 페이지라 사이트 단위 신뢰를 못 만든다. 아래는 기존 도구와 내부링크로 엮이는 허브 콘텐츠(각 2,500자+, /guides/ 디렉토리 권장):

| # | 주제 | 링크될 도구 |
|---|---|---|
| 1 | 2026 연봉 실수령액 총정리 — 4대보험·소득세 공제 구조 해부 | salary, payslip-calc, four-insurance, income-tax, salary-reverse, minimum-wage |
| 2 | 퇴사 전 체크리스트: 퇴직금·연차수당·실업급여 계산 순서 | severance, severance-tax, annual-leave, unemployment, retirement-calc |
| 3 | 전월세 계약 전 계산 가이드: 전월세전환율·중개보수·대출한도 | rent-convert, realestate-fee, ltv-calculator, dsr-calc, loan-calc |
| 4 | JWT 인증 완전 가이드: 구조·검증·만료·보안 실수 7가지 | jwt-decoder, jwt-generator, hmac-generator, base64-decoder, epoch(timestamp) |
| 5 | 이미지 포맷 선택 가이드 2026: WebP vs AVIF vs JPG 실측 비교 | image-to-webp, avif-to-jpg, image-compressor, png-to-jpg, image-resizer |
| 6 | PDF 개인정보 유출 방지 실무: 메타데이터·주석·잠금의 함정 | pdf-metadata-remover, pdf-metadata-viewer, pdf-password-adder, exif-remover |
| 7 | LLM API 비용 최적화 실전: 토큰 계산 원리와 모델별 단가 비교 | ai-token-counter, chatgpt-token-counter, ai-cost-calculator, ai-model-comparison |
| 8 | 구조화 데이터(스키마) 실전 가이드: 리치결과 유형별 요건과 흔한 반려 사유 | schema-markup-generator, schema-validator, meta-tag-generator, serp-snippet-preview |
| 9 | 정규식 실무 레시피 30: 전화번호·사업자번호·한글 검증 패턴 | regex-tester, regex-generator, regex-cheatsheet, find-replace |
| 10 | 프리랜서 세금·단가 산정 가이드: 3.3% 원천징수부터 종합소득세까지 | freelancer-tax, freelancer-rate-calculator, vat-calc, income-tax, hourly(salary-per-hour) |

각 가이드가 도구로 내려보내고, 도구의 seo 섹션이 가이드로 올려보내는 양방향 링크 필수 (현재 내부링크는 related.js 자동 카드뿐 — 문맥 링크가 0이다).

## 5. 재심사 요청 전 체크리스트

- [ ] JS 문법오류 9개 파일 수리 완료 + 전 파일 `node --check` 통과 (0-a)
- [ ] "AI" 사칭 생성기 12종 재명명/실연동/삭제 완료 (0-b)
- [ ] ko 본문 정적 프리렌더 배포 — 소스 보기에서 본문·FAQ가 보이는지 무작위 20페이지 확인 (0-c)
- [ ] 301 리다이렉트 67건 배포 + 대상 페이지에 흡수 콘텐츠 이식 확인
- [ ] sitemap.xml에서 67 URL 제거, index.html·category 허브·related.js에서 해당 슬러그 제거, 툴 카운터 4개 언어 갱신
- [ ] hreflang 정리: ?lang= 쿼리 변형 hreflang 제거(단일 언어 문서로 선언)하거나 언어별 실제 분리 — canonical과 모순 없는 상태로
- [ ] REWRITE top 20 반영 (남은 76개는 재심사 후 지속)
- [ ] 에디토리얼 가이드 최소 5편 발행 + 도구↔가이드 양방향 문맥 링크
- [ ] 실측 데이터 페이지(수수료율표·공휴일·요율)의 출처·확인일 표기 통일 ("최종 확인: 2026.7" 패턴 전 페이지 확산)
- [ ] about.html에 운영 주체·연락처·콘텐츠 생산 방식 명시 (E-E-A-T 최소선)
- [ ] 재심사 전 2~4주 대기: 301·sitemap 변경이 재크롤될 시간 확보 + IndexNow 제출
- [ ] GSC에서 "색인 생성됨" 페이지 수가 병합 후 실페이지 수(약 320)에 수렴하는지 확인 후 심사 요청

**심사관 최종 소견**: 이 사이트의 반려 원인은 페이지가 부족해서가 아니라 **같은 의도를 쪼갠 페이지가 너무 많고(67), 죽은 페이지가 방치되어 있고(9), 본문이 크롤러에게 안 보이는 구조**이기 때문이다. 393개를 유지한 채 보강하는 모든 시도는 다시 실패한다. 320개 내외로 통합·수리·정적화한 뒤 가이드 콘텐츠로 사이트 단위 신뢰를 만드는 것이 유일한 경로다.
