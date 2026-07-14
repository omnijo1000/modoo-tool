# P0/P1 수정 검증 결과

검증일: 2026-07-14 · 대상: audit/final-review.md의 P0-1~3, P1-1~3

---

## P0-1. 정적/JS 콘텐츠 동기화 — ✅ PASS

- 지정된 25개 파일(REWRITE top-20 + qr-code-generator, bmi-calc, ai-token-counter, slug-generator, unicode-converter) 전부 정적 `<div class="seo">`(또는 `data-i18n="seoHtml"`/`id="faqList"`) 컨테이너를 JS `seoHtml`(또는 `faqList`)의 ko 콘텐츠와 완전히 동일하게 동기화. `audit/static-sync-verify.csv` 25행 전부 `PASS`(static == js).
- 재발 방지 전체 스캔(`scan_gap.py`, 정적 vs JS 글자수 차이 10% 이상 탐지)에서 25개 외 추가로 7개 파일 발견(`calorie-calculator`, `compound-interest`, `currency-converter`, `gst-calculator`, `mortgage-calculator`, `roi-calculator`, `vat-calculator-global`) — 전부 동일 방식으로 동기화 완료, CSV에 추가 기록.
- 동기화 이후 재스캔 결과: **393개 파일 중 10% 이상 격차 0건** (`audit/gap-scan-full-site.csv`, 헤더만 남음).
- 검증 스크립트: `strip_tags(static_html)` 길이 ≥ `strip_tags(js_ko_content)` 길이를 PASS 기준으로 사용, 33행(25+7+1 unit-converter 별도 케이스) 전부 PASS, FAIL 0건.

## P0-2. text-encryptor 복호화 기능 복구 — ✅ PASS

- text-encryptor.html에 암호화/복호화 모드 토글 UI(상단 탭 버튼) 추가. git 이력(`5ce5bdf:text-decryptor.html`)에서 원래 text-decryptor.html에 있던 decrypt 로직(`caesarDec`, `vigenereDecrypt`, `aesDecrypt`)을 그대로 이식 — 롤백이 아니라 통합.
- `?mode=decrypt` 쿼리로 진입 시 복호화 탭이 기본 선택되도록 처리, text-decryptor.html 리다이렉트 스텁도 `text-encryptor.html?mode=decrypt`로 갱신.
- 4개 방식(AES-256-GCM, Caesar, ROT13, Vigenere) 전부 encrypt→decrypt 왕복 테스트 작성 및 실행 (`audit/text-encryptor-roundtrip-test.js`, 실제 페이지에서 함수를 추출해 Node vm에서 실행) — **15/15 테스트 PASS**(왕복 일치, 오답 비밀번호/키 거부 확인, AES salt/iv 랜덤성 확인 포함).
- "text-decryptor.html에서 복호화" 문구 5곳(ko 정적 1 + ko JS 1 + en/zh/ja 각 1) 전부 "이 페이지 상단의 '복호화' 탭으로 전환" 안내로 수정 확인(`grep -c text-decryptor text-encryptor.html` → 0건).

## P0-3. svg-cleaner 모순 FAQ 수정 — ✅ PASS

- "SVG Optimizer와 함께 사용하면 효과적" 문구(ko 정적/JS, en, zh, ja = 5곳) 전부 "SVG Optimizer는 이 도구로 통합되었습니다" 형태로 병합 사실에 맞게 재작성. `grep -c 두\ 도구를\ 함께` 등 잔존 모순 문구 0건 확인.

## P1-1. 사라진 도구명 언급 수정 — ✅ PASS

- cron-generator.html: JSON-LD FAQPage 내 "cron-validator 도구로 유효성도 검사하세요" → "cron-parser 도구로 유효성도 검사하세요" 수정.
- image-color-extractor.html: ko(정적+JS)/en/zh/ja 4곳 전부 "hex-to-rgb 도구로 변환" → "color-converter 도구로 변환"으로 수정. `grep -c hex-to-rgb image-color-extractor.html` → 0건.

## P1-2. compound-interest 및 EN 금융 계산기군 보강 — ✅ PASS

- finance-calculators 카테고리(related.js CATEGORY_MAP 기준 61개) 전수 스캔 → compound-interest/gst-calculator/mortgage-calculator/roi-calculator 4개(정적/JS 동기화 문제) + margin-calculator/discount-calculator/break-even-calculator/salary-per-hour-calculator/freelancer-rate-calculator/cagr-calculator 6개(원천적으로 정적·JS 모두 1,000자 미만) = 총 10개 식별, `audit/en-calc-verify.csv`에 기록.
- 10개 전부 정적 HTML에 직접 공식·구체 수치 예시·교차링크 보강 후 1,000자 이상 확보(최종 1,044~2,401자). 교차링크 6건 신규 추가(roi↔compound-interest, roi↔cagr, gst↔vat-calculator-global, mortgage↔ltv-calculator, margin↔break-even, salary-per-hour↔freelancer-rate).
- 10개 전부 정적/JS ko 콘텐츠 stripped-text 완전 일치 확인(`static_js_synced=True`) — JS 실행 시 정적 프리렌더 내용이 덮어써지지 않음.

## P1-3. category-i18n.js 죽은 데이터 정리 — ✅ PASS

- `TOOL_NAMES`에서 제거된 4개 slug(`bmi-calculator.html`, `base64-url.html`, `keyword-density.html`, `qr-generator.html`) 삭제, `node --check`로 JS 문법 유효성 확인.
- verdict.csv 기준 이번 세션에 병합(MERGE)된 67개 slug 전체를 category-i18n.js 전 테이블(UI/MAIN_I18N/ORIGINAL_MAIN/CAT/CAT_NAMES/TOOL_NAMES)에서 재검색 — **잔존 참조 0건**.

## 완료 조건 최종 확인

| 항목 | 상태 |
|---|---|
| P0-1 정적/JS 동기화 (25개 + 추가 발견 7개) | PASS |
| P0-2 text-encryptor 복호화 복구 + 왕복 테스트 | PASS (15/15) |
| P0-3 svg-cleaner 모순 FAQ | PASS |
| P1-1 cron-generator / image-color-extractor 문구 | PASS |
| P1-2 EN 금융 계산기 10개 보강 | PASS |
| P1-3 category-i18n.js 죽은 데이터 | PASS |
| 사이트 전체 재스캔 (정적 vs JS 10%+ 격차) | 0건 |
| 사이트 전체 재스캔 (제거된 67개 slug 잔존 참조) | 0건 |

전 항목 PASS. FAIL 없음.
