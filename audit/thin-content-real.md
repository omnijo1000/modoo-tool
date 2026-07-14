# 빈약한 콘텐츠 실체 — main-scoped unique_char_count 재계산

기준: <main> 내부 텍스트만 계산, 범용 "브라우저 내 처리" 푸터 문구 제외, script/style/comment 제외.
related.js 관련 도구 패널은 런타임에만 DOM 삽입되며 정적 HTML 소스에는 존재하지 않아, 정적 파일 기반의 원본 total_content_chars 지표에도 애초에 포함되지 않았음을 확인함 (아래 참고).

임계값: gap(문자수 차이) > 300 또는 gap 비율 > 50%

총 397개 파일 중 32개가 기준 초과.

| # | 파일 | 기존 total_content_chars | 신규 unique_char_count | gap |
|---|---|---|---|---|
| 1 | hash-generator.html | 3570 | 679 | 2891 (81%) |
| 2 | regex-tester.html | 3825 | 979 | 2846 (74%) |
| 3 | vat-calculator-global.html | 4386 | 1575 | 2811 (64%) |
| 4 | calorie-calculator.html | 3794 | 998 | 2796 (74%) |
| 5 | gst-calculator.html | 4033 | 1544 | 2489 (62%) |
| 6 | compound-interest.html | 3622 | 1170 | 2452 (68%) |
| 7 | roi-calculator.html | 3225 | 885 | 2340 (73%) |
| 8 | mortgage-calculator.html | 3001 | 879 | 2122 (71%) |
| 9 | currency-converter.html | 4328 | 2504 | 1824 (42%) |
| 10 | loan-calc.html | 4379 | 2632 | 1747 (40%) |
| 11 | ai-tweet-generator.html | 2035 | 777 | 1258 (62%) |
| 12 | category/developer-tools.html | 8674 | 7503 | 1171 (14%) |
| 13 | base64-url.html | 1577 | 444 | 1133 (72%) |
| 14 | category/image-tools.html | 5842 | 4816 | 1026 (18%) |
| 15 | prompt-optimizer.html | 2067 | 1063 | 1004 (49%) |
| 16 | category/text-tools.html | 6752 | 5761 | 991 (15%) |
| 17 | json-formatter.html | 1589 | 658 | 931 (59%) |
| 18 | category/ai-tools.html | 4360 | 3431 | 929 (21%) |
| 19 | ai-linkedin-post-generator.html | 1672 | 765 | 907 (54%) |
| 20 | jwt-decoder.html | 1183 | 609 | 574 (49%) |
| 21 | category/security-tools.html | 4855 | 4289 | 566 (12%) |
| 22 | redirect-checker.html | 2718 | 2184 | 534 (20%) |
| 23 | meta-description-generator.html | 1252 | 739 | 513 (41%) |
| 24 | category/generator-tools.html | 5565 | 5100 | 465 (8%) |
| 25 | category/finance-calculators.html | 4777 | 4334 | 443 (9%) |
| 26 | category/pdf-tools.html | 3891 | 3451 | 440 (11%) |
| 27 | youtube-script-generator.html | 1210 | 809 | 401 (33%) |
| 28 | canonical-tag-checker.html | 2078 | 1684 | 394 (19%) |
| 29 | text-merger.html | 703 | 329 | 374 (53%) |
| 30 | ssh-key-generator.html | 1376 | 1039 | 337 (24%) |
| 31 | jpg-to-heic.html | 1644 | 1342 | 302 (18%) |
| 32 | naverfc35bcbb70f824fb8fba2e8491a4dbec.html | 67 | null | 67 (100%) |
