# modoohub 유지보수 점검표

> 배포 후 운영 관점 정기 점검 항목. 값 갱신 후 각 행의 **최종확인** 날짜를 수정할 것.
> 상세 근거·과거 이력은 `CLAUDE.md` 참고.

---

## 1. 연도별 하드코딩 법정 수치 (계산기)

각 파일이 하드코딩한 법정 수치. 갱신 시 웹서치로 "OO년 X월 기준 최신" 확인 후 코드 수정 → 이 표 최종확인일 갱신.

| 파일 | 하드코딩 값 (2026 확인 기준) | 갱신 주기 | 최종확인 |
|---|---|---|---|
| `salary.html` / `salary-*.html` / `four-insurance.html` / `hourly-wage.html` | 근로소득 간이세액표(`TAX_TABLE`), 최저시급 10,320원(2026), 4대보험 요율 | 매년 1월 + 매년 3월(세액표) | 2026-09-02 |
| `national-pension-calculator.html` | 요율 9.5%, 상한 659만원·하한 41만원 (2026-07-01~) | **매년 7월** | 2026-09-06 |
| `four-insurance.html` | 국민연금 4.75%, 건강보험 7.19%, 장기요양 13.14%(건보료 대비), 고용보험 0.9% | 매년 1월 | 2026-09-06 |
| `health-insurance.html` / `health-insurance-calc.html` / `health-insurance-calculator.html` | 건강보험료율 7.19%, 장기요양 13.14%, 지역가입 점수당 금액 | 매년 1월 | 2026-09-06 |
| `minimum-wage.html` | 2026 시급 10,320원 (+2027 10,700원 병기 확인) | **매년 8월**(7월 고시) | 2026-09-06 |
| `unemployment.html` (실페이지) | 일액 상한 68,100원·하한 66,048원 (2026.1.1~ 퇴사자), 구기준 66,000/64,192 병행 | 매년 1월 (최저시급 연동) | 2026-09-06 |
| `parental-leave.html` | 통상임금 100% 상한 250/200/160만, 하한 70만, 사후지급금 폐지, 6+6 상한(250·250·300·350·400·450만) | 매년 1월 + 제도개편 시 | 2026-09-06 |
| `severance.html` | 퇴직금 = 30일분 평균임금×재직연수 (근퇴법 §8, 사업장 규모 무관 2013.1~ 전면적용). '2026년부터 5인미만 적용' 오기 수정 | 매년 1월 | 2026-09-06 |
| `severance-tax.html` / `severance-pay-calculator.html` | 퇴직소득세 근속연수공제·환산급여 산식 | 매년 1월 | (미검증) |
| `capital-gains-tax.html` | 양도세 기본세율 6~45% 8구간, 1세대1주택 비과세 12억, 장기보유특별공제 표 (소득세법 §55·§95·§104) | 매년 1월 | 2026-09-06 (기본세율·비과세 한도 현행 확인, 출처 표기) |
| `inheritance-tax.html` | 상속세율 10~50% 5구간, 자녀공제 5천만·일괄공제 5억·배우자공제 5억~30억 (상증세법 §26·§18~24). 2024.12 개편안 국회 부결 → 현행 유지 | 매년 1월 | 2026-09-06 (부결 확인, 출처 표기) |
| `gift-tax.html` | 증여재산공제 배우자 6억·직계 5천만(미성년 2천만)·기타친족 1천만, 세율 10~50%, 신고세액공제 3% | 매년 1월 | 2026-09-06 (공제액 현행 확인) |
| `stock-tax.html` | 국내 상장주식 대주주 = **종목당 시가총액 50억원**(2024.1.1 상향, '10억원' 오기 수정) 또는 지분 코스피 1%·코스닥 2%. 대주주 1년↑ 20%·1년↓ 30%, 해외주식 기본공제 250만·22% | 매년 1월 | 2026-09-06 |
| `capital-gains-tax.html` | 대주주 기준 '10억→50억' 오기 수정. 다주택 중과(+20/30%p) 2026-05-10 유예 종료 재적용 반영 확인 | 매년 1월 | 2026-09-06 |
| `acquisition-tax.html` / `property-tax.html` / `income-tax.html` | 세율 구간·공제액·중과 기준 | 매년 1월(세법개정) | (미검증) |
| `ltv-calculator.html` | **규제지역 무주택 매매 LTV 40%, 생애최초 70%(주택가 6억↓·대출 5억↓), 서민실수요 60%, 절대한도 15억↓ 6억·15~25억 4억·25억↑ 2억** (2025.10.15 대책) | **분기 1회 + 부동산대책 발표 즉시** | 2026-09-06 |
| `dsr-calc.html` | DSR 40%(1금융)/50%(2금융). 스트레스 DSR 가산금리는 **미반영(면책 고지)** | 매년 1회 임계값 확인 | 2026-09-06 |
| `credit-loan-limit.html` | 신용대출 평균금리 5~7% 예시, DSR 40% | 반기 1회 | (미검증) |
| `working-days-calc.html` / `business-days-calculator.html` | `HOLIDAYS_2026` 공휴일 20일. **2027 목록 없음** | **매년 11~12월**(다음해 관공서 공휴일 확정 후) | 2026-09-06 · ⚠️2027 추가 필요 |
| `cheongyak-score.html` | 청약 가점 84점 만점 배점(무주택·부양가족·통장기간) | 청약제도 개편 시 | (미검증) |
| `electricity-cost-calculator.html` | 누진 구간·계절별 요금 | 한전 요금개편 시(연 1~2회) | (미검증) |
| `fuel-cost-calculator.html` | (사용자 입력 기반, 하드코딩 없음) | — | — |

## 2. canonical / 사이트맵 / robots / 404

| 항목 | 현재 상태 | 점검 주기 |
|---|---|---|
| `sitemap.xml` — 파일 존재·스텁 미등재·canonical 정합 | 정상 (766 URL) | 신규 툴/슬러그 변경 시 |
| `sitemap.xml` — `<lastmod>` | 2026-09-06 대량 갱신(754 URL). 배포 훅에서 자동화 권장 | **10+ 파일 배포마다** |
| 리다이렉트 스텁 (69개) | `<meta refresh>` + `noindex,follow` + sitemap 미등재 | 반기 1회 |
| `robots.txt` | `Disallow: /privacy.html` 제거됨(2026-09-06). `/promotion/`·`/design-mockups/` 차단 유지 | 반기 1회 |
| `404.html` | 브랜드 404 페이지 생성(2026-09-06). GitHub Pages가 모든 404에 서빙 | 반기 1회 (링크 유효성) |
| 광고/분석 동의 | Consent Mode v2 default(EEA denied) + `consent.js` 배너 전 836파일 적용(2026-09-06). **최종 형태는 AdSense 대시보드 GDPR 메시지 활성화** | AdSense 정책 변경 시 |
| `privacy.html` 제3자 목록 | ip-api.com·allorigins·crt.sh·rdap·Cloudflare DoH 추가(2026-09-06). SEO 체커·whois·dns·ssl 툴 화면 고지도 추가 | 신규 네트워크 툴 추가 시 |
| `llms.txt` — 스텁 슬러그 링크 여부 | canonical 페이지 URL로 유지 | 슬러그 변경 시 |
| 내부 링크 무결성 | 정상 (오탐 1건: html-encoder JS 문자열 내 `page.html`) | 분기 1회 `grep`-기반 스캔 |

## 3. 모바일 성능

| 항목 | 현재 상태 | 점검 주기 |
|---|---|---|
| 이미지 자산 | 5개, 100KB 초과 0 | 신규 이미지 추가 시 |
| 폰트 로딩 | **self-host 완료(2026-09-02)**: `/fonts.css` + `/fonts/*.woff2` (Noto Sans KR 400/500/600/700/800/900 + DM Mono 400/500). Google Fonts 링크·gstatic·googleapis preconnect 전부 제거(767 파일). `font-display:swap`. 서브셋 = Latin+Latin-1/ext + 문장부호 + 화살표/기호(→←₩·×✓⚠ 등) + 한글 전체(AC00–D7A3) | 신규 파일 작성 시 `/fonts.css` 링크만 |
| GA / AdSense | `async` | — |
| `theme-instrument.js` / `related.js` | `</body>` 직전 (렌더 비차단) | 신규 파일 작성 시 |
| pdf-lib (11개) / js-yaml(×4) / bcryptjs(×2) / jsbarcode / qrcode | 전부 `defer` 적용(2026-09-06). 렌더 비차단 | 라이브러리 버전업·CDN 장애 시 |
| **웹앱 manifest** | `site.webmanifest` + icon-192/512/maskable 생성, 전 836파일 `<link rel=manifest>`(2026-09-06) | 아이콘 변경 시 |
| **깨진 툴 라이브러리 CDN** | qr-code-generator(qrcode 1.5.3 404 → 1.4.4), bcrypt-generator/validator(`bcrypt` 전역 없음 → `dcodeIO.bcrypt` 별칭) 수정(2026-09-06). **모든 CDN URL은 반기 1회 HEAD 체크** | 반기 1회 |
| CDN 의존 (pdf-lib=unpkg, 그 외 jsdelivr) | unpkg는 cdnjs 대비 느림 — 향후 cdnjs 이전 고려 | 반기 1회 가용성 확인 |
| `index.html` 크기 | 256KB (317카드+i18n 인라인, gzip 후 ~40KB) | 카드 400개 초과 시 뷰포트 아래 지연렌더 검토 |
| PageSpeed 실측 (모바일) | — | **반기 1회** + 대량 리스킨/라이브러리 추가 후 |

| **Google Fonts 외부 로드** | ✅ **해결(2026-09-02)** — self-host 전환. 남은 트레이드오프: (1) woff2 서브셋 weight당 ~650KB, 한글 시스템폰트 없는 기기(일부 Windows·Linux)에서 페이지당 사용 weight 수만큼 다운로드(1회, 이후 캐시). Mac/iOS/Pretendard 설치 기기는 `-apple-system` 우선이라 미다운로드. (2) GitHub Pages `Cache-Control: max-age=600` — 재방문 시 ETag 304 재검증(전체 재전송 아님). 재방문 대역폭이 문제되면 `cdn.jsdelivr.net/gh/<repo>@<tag>/fonts/`로 이전 시 `immutable` 1년 캐시 가능(단 제3자 요청 부활). (3) `✗ ✕ ✔`는 Noto Sans KR 미포함 → 시스템폰트 폴백 | 폰트 버전업 시 `/tmp/buildfonts.sh` 재실행 |

## 4. 고립 페이지

- **진짜 고립 0건.** sitemap 766 URL 전부 파일 존재, 내부 링크 그래프 정상.
- `guides/index.html` 가이드 카드는 **정적 HTML `<a>`** (430개, JS는 검색·필터만) — 크롤러 도달 정상. (2026-09-06 재확인: 이전 "JS 렌더" 판단은 오류였음)
- 점검: 신규 툴 추가 후 `related.js` T{}·GROUPS[]·CATEGORY_MAP 등록 여부 `grep -c "'SLUG':" related.js` 확인.

---

## 정기 점검 캘린더 요약

| 시기 | 할 일 |
|---|---|
| **매년 1월** | 4대보험·건보·장기요양·고용보험 요율, 실업급여 상하한, 육아휴직, 세법(양도·상속·증여·취득·종부·소득세) 구간 |
| **매년 3월** | 근로소득 간이세액표(`TAX_TABLE`) — 국세청 개정 반영 |
| **매년 7월** | 국민연금 기준소득월액 상·하한 |
| **매년 8월** | 최저임금 (7월 고시 후) → salary·four-insurance·minimum-wage·unemployment |
| **매년 11~12월** | 다음해 관공서 공휴일 → `working-days-calc` `HOLIDAYS_2027` 등 |
| **분기 1회** | LTV/DSR/규제지역, 내부 링크 무결성, sitemap↔파일 동기, related.js 등록 |
| **반기 1회** | robots.txt·404·스텁 정합, 외부 CDN 가용성, PageSpeed 모바일 실측 |
| **부동산대책 발표 즉시** | `ltv-calculator` / `dsr-calc` / `acquisition-tax` / `property-tax` 재확인 |
| **대량 배포마다** | 변경분 sitemap `<lastmod>` 갱신, IndexNow 제출, 라이브 원본 `curl` 확인 |
