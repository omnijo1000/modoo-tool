# guides/ 확장 진행 체크리스트 (5개 → 15개+)

**배경**: 애드센스 반려 대응 분석(2026-08-18, fable5 크로스체크)에서 "장문 아티클 부족"이 실재하는 갭으로 확인됨 — `guides/` 현재 5개(before-you-quit-checklist, image-format-comparison-2026, jwt-authentication-guide, rental-contract-checklist, salary-take-home-2026), 목표 15~20개.

**2026-08-19 갱신**: 이전 버전은 비금융 18개가 "샘플링"(카테고리당 2~3개)으로만 뽑힌 상태였음. 사용자가 "전체 파일 다 확인해서 쓰라"고 명시 지시 → `related.js` CATEGORY_MAP 기준 전체 319개 파일 중 이미 다룬 것 제외한 **나머지 전부**를 14개 병렬 에이전트로 전수 확인 완료(파일 단위 ACCEPT/REJECT 판정, 스킵 없음). 그 결과 **후보가 총 258개**로 늘어남(목표 15~20 대비 압도적으로 여유) — 아래는 전수 조사 원본 결과이며, 실제 작성은 이 중 우선순위 골라 진행하면 됨. 재조사 불필요.

---

## 전체 요약

| 카테고리 | 전체 파일 | 이미 클레임(중복 제외) | ACCEPT | REJECT(너무 얕음) |
|---|---|---|---|---|
| finance-calculators | 61 | 10 (아래 1~10번) | 47 | 4 |
| developer-tools | 57 | 2 (cron-parser, sql-query-explainer) | 52 | 3 |
| text-tools | 43 | 2 (text-similarity-checker, keyword-density-checker) | 32 | 9 |
| image-tools | 31 | 2 (image-compressor, color-contrast-checker) | 24 | 7 |
| generator-tools | 29 | 2 (barcode-generator, favicon-generator) | 21 | 8 |
| security-tools | 22 | 2 (ssl-decoder, password-generator) | 17 | 5 |
| pdf-tools | 17 | 1 (pdf-compressor) | 13 | 4 |
| ai-tools | 10 | 2 (ai-cost-calculator, chatgpt-token-counter) | 10 | 0 |
| data-tools | 15 | 1 (json-schema-validator) | 8 | 7 |
| health-calculators | 8 | 2 (body-fat-calculator, sleep-calculator) | 8 | 0 |
| date-time-tools | 11 | 2 (korean-age, meeting-cost-calculator) | 8 | 3 |
| **합계** | **304** | **28** | **240** | **50** |

(finance/health는 "이미 클레임" 파일이 애초에 목록에서 빠져있었으므로 위 표의 ACCEPT는 전수조사 대상 파일 기준 accept 수. 최종 후보 풀 = 기존 확정 10개(수치 검증 완료) + 위 240개 = **250개**, 목표 15~20개 대비 압도적으로 여유 있음.)

**작성 규칙** (기존 5개 가이드와 동일하게):
- `guides/` 디렉토리, `salary-take-home-2026.html`을 템플릿으로 복사해서 구조 재사용(헤더/스타일/footer 동일)
- 본문 1,500~2,000자 이상(실측 기준, 태그 제거 후), 최소 3개 FAQ, 관련 계산기 링크(`tool-links`) 포함
- JSON-LD Article 스키마에 `datePublished`+`dateModified` 둘 다
- `<p class="meta">가이드 · 2026-08-19 최종 확인</p>` 형식으로 검증일 명시
- 완료 후 관련 계산기 페이지에서 가이드로 역링크 연결할지 확인

**작업 중 발견해서 이미 고친 것**: `guides/salary-take-home-2026.html`이 국민연금 인상 전 구요율을 쓰고 있어서 실제 계산기(four-insurance.html)랑 안 맞았음 — 요율표·예시계산·실수령액·datePublished 전부 재계산해서 수정 완료(2026-08-18).

**다음 세션에서 이어할 때**:
1. 아래 후보 250개 중 카테고리 균형 맞춰(금융에 쏠리지 않게) 15~20개 우선순위 골라서 작성 진행.
2. `salary-take-home-2026.html` HTML 구조 그대로 복사해 새 파일 만들 것.
3. 하나 완성할 때마다 아래 목록 옆에 `[x] 작성 완료`로 표시.
4. 병렬 작업 시: 전부 서로 다른 소스 파일·다른 guides/ 파일명이라 충돌 없음.
5. "Key fact"로 적힌 수치는 담당 에이전트가 실제 소스 HTML을 읽고 뽑은 것이지만, **1~10번(금융/노무 핵심)만큼 재검증된 건 아님** — 작성 시 본문에 넣기 전 소스 파일 재대조 권장.

---

## 금융/노무 핵심 10개 (수치 이중검증 완료 — 바로 작성 가능)

| # | 주제 | 파일명(예정) | 상태 |
|---|---|---|---|
| 1 | 양도소득세 완전정리 | `guides/capital-gains-tax-guide-2026.html` | [x] 작성 완료 (2026-08-19) |
| 2 | 육아휴직급여 2025 개편 총정리 | `guides/parental-leave-2025-reform.html` | [x] 작성 완료 (2026-08-19) |
| 3 | 국민연금 직장 vs 지역가입자 | `guides/national-pension-employee-vs-regional.html` | [x] 작성 완료 (2026-08-19) |
| 4 | 퇴직금 계산법 + IRP 절세 | `guides/severance-pay-irp-tax-saving.html` | [x] 작성 완료 (2026-08-19) |
| 5 | 최저임금·주휴수당 완전정리 | `guides/minimum-wage-2026-2027.html` | [x] 작성 완료 (2026-08-19) |
| 6 | 실업급여 신청 A to Z | `guides/unemployment-benefit-checklist.html` | [x] 작성 완료 (2026-08-19) |
| 7 | 주택담보대출 한도 완전정리(LTV·DSR) | `guides/mortgage-limit-ltv-dsr-guide.html` | [x] 작성 완료 (2026-08-19) |
| 8 | 상속세 vs 증여세 비교 | `guides/inheritance-vs-gift-tax.html` | [x] 작성 완료 (2026-08-19) |
| 9 | 프리랜서 세금 완전정리 | `guides/freelancer-tax-guide-2026.html` | [x] 작성 완료 (2026-08-19) |
| 10 | 건강보험료 직장 vs 지역가입자 | `guides/health-insurance-employee-vs-regional.html` | [x] 작성 완료 (2026-08-19) |

(각 항목 상세 검증 수치는 파일 하단 "부록: 금융 10개 상세" 참고)

---

## 금융 추가 (finance-calculators, 47개 ACCEPT)

- [x] **compound-interest** (guides/compound-interest-rule-of-72-accuracy.html, 2026-08-21) — "72의 법칙, 실제로 얼마나 정확한가" — 연8% 복리: 72÷8=9년 근사 vs 실제 9.006년.
- [x] **savings-calc** (guides/isa-savings-interest-tax-exemption.html, 2026-08-19) — "ISA로 적금 이자세금 얼마나 아끼나" — 순이익 200만원(서민형400만)까지 비과세, 초과분 9.9% 분리과세.
- [x] **inflation-calculator** (guides/inflation-purchasing-power-decay.html, 2026-08-19) — "월세·연금 실질가치, 인플레이션이 몇 년 만에 갉아먹나" — 월$1,000 연금, 연2% 인플레 시 구매력 약67%로 하락.
- [x] **currency-converter** (guides/currency-exchange-hidden-spread-cost.html, 2026-08-19) — "환율의 숨은 비용, 스프레드는 얼마나 되나" — USD/KRW 스프레드 20~40원+카드수수료 1.25~2%.
- [x] **sip-calculator** (guides/sip-step-up-compounding-effect.html, 2026-08-26) — "Step-Up SIP, 매년 늘리면 복리효과가 얼마나 커지나" — 월$100+매년10%증액, 10년뒤 월$235.79(코드 실행 검증). **참고**: 이 계산기 자체엔 Step-Up 옵션 없음, FAQ에만 언급.
- [x] **emi-calculator** (guides/emi-india-foir-40-percent-limit.html, 2026-08-26) — "인도 EMI 대출한도, FOIR 40%가 정하는 것" — 월소득5만루피·FOIR40%→최대EMI 2만루피. **참고**: 계산기 자체엔 FOIR 역산 기능 없음, FAQ에만 언급.
- [x] **loan-calculator-en** (guides/loan-prepayment-fee-us-vs-korea.html, 2026-08-26) — "중도상환수수료, 미국과 한국은 왜 이렇게 다른가" — 미국 대부분 무료 vs 한국 잔여원금 0.5~1.5%. (계산기 자체엔 중도상환수수료 필드 없음)
- [x] **gst-calculator** (guides/gst-calculator-itc-explained.html, 2026-08-19) — "인도 GST 매입세액공제(ITC), 실제로 얼마나 절세되나" — 원자재매입 ₹18,000 ITC→실제납부 ₹9,000.
- [x] **vat-calculator-global** (guides/vat-global-highest-lowest-uk-4-tier.html, 2026-08-26) — "전세계 VAT 최고·최저 세율, 영국의 4단계 구조" — 헝가리27% vs 룩셈부르크17%, 영국 20/5/0/면세 4단계. **참고**: 도구 프리셋에 룩셈부르크·영세율/면세 옵션 실제로 없음(가이드에서 지적).
- [x] **mortgage-calculator** (guides/mortgage-pmi-vs-korea-ltv-20-percent-down.html, 2026-08-26) — "PMI vs 한국 LTV, 계약금 20%가 갖는 의미" — 미국 LTV80%이하 PMI면제 vs 한국 LTV50~60%규제. **참고**: 이 계산기 자체는 PMI 자동계산 미지원(보험료 필드는 수동입력).
- [x] **roi-calculator** (guides/roi-vs-cagr-different-numbers-same-investment.html, 2026-08-25) — "ROI와 CAGR, 같은 투자인데 숫자가 다른 이유" — 단순누적 vs 연평균복리환산 비교.
- [x] **apr-calculator** (guides/apr-vs-ear-credit-card-compounding.html, 2026-08-20) — "APR과 EAR, 카드 이자가 표시금리보다 비싸 보이는 이유" — 명목12%월복리→EAR≈12.68%.
- [x] **loan-payoff-calculator** (guides/loan-payoff-negative-amortization-trap.html, 2026-08-26) — "월 상환액이 이자보다 적으면 벌어지는 일" — 음의 상각(negative amortization) 함정(실제로 계산 차단하지만 궤적 시뮬레이션은 안 함).
- [x] **investment-return-calculator** (guides/investment-return-compounding-frequency-diff.html, 2026-08-26) — "복리 주기(연/분기/월), 실제로 얼마나 차이 나나" — 1000만·10%·10년: 연25,937,425 vs 월27,070,415원(코드 실행 검증).
- [x] **fire-calculator** (guides/fire-calculator-4-percent-rule-trinity-study.html, 2026-08-24) — "4% 룰(Trinity Study), 한국에서도 안전한가" — 1998년 미국 30년 가정, 비미국은 3~3.5% 권장.
- [x] **cagr-calculator** (guides/cagr-hides-volatility-trap.html, 2026-08-25) — "CAGR이 감추는 변동성의 함정" — -30%/+80% 등락도 CAGR은 매년 동일성장처럼 평활화.
- [x] **margin-calculator** (guides/margin-markup-percentage-confusion.html, 2026-08-24) — "마진율과 마크업, 같은 거래인데 다른 숫자가 나오는 이유" — 원가700·판매1000: 마진30% vs 마크업42.86%.
- [x] **profit-calculator** (guides/profit-gross-operating-net-three-stages.html, 2026-08-25) — "총이익·영업이익·순이익, 세 단계로 나눠 보는 이유" — COGS/OPEX 분리 3단계 이익구조.
- [x] **break-even-calculator** (guides/break-even-margin-of-safety-beyond-bep.html, 2026-08-25) — "손익분기점만으론 부족한 이유, 안전마진율" — 안전마진율=(예상매출−BEP)÷예상매출. (계산기 자체는 안전마진율 자동계산 안 함, FAQ에만 설명)
- [x] **commission-calculator** (guides/commission-tiered-progressive-like-income-tax.html, 2026-08-25) — "구간별 누진 수수료, 소득세처럼 계산되는 원리" — 100만까지3%+나머지5%, 200만매출시 수수료8만(10만 아님, 실제 재현 확인).
- [x] **discount-calculator** (guides/discount-calculator-stacked-discount-math.html, 2026-08-21) — "중복 할인 30%+10%는 40% 할인이 아니다" — 50%+50%=75%할인(25%남음, 100%아님).
- [x] **salary-per-hour-calculator** (guides/salary-per-hour-4-day-week-25-percent-jump.html, 2026-08-25) — "주4일제, 같은 연봉인데 시급은 왜 25% 오르나" — 연봉5000만: 주5일24,038원 vs 주4일30,048원(실제 재현 확인).
- [x] **freelancer-rate-calculator** (guides/freelancer-rate-non-billable-hours-trap.html, 2026-08-26) — "프리랜서 시급, 비청구 시간을 빼먹으면 생기는 일" — 신규 비청구율40~50%, 72,222원 예시는 도구 기본값과 다른 가정임을 구분해 서술.
- [x] **acquisition-tax** (guides/acquisition-tax-temporary-2house-3year-penalty.html, 2026-08-25) — "임시적 2주택 특례, 3년 안에 못 팔면 생기는 일" — 3년 초과시 중과세율 소급추징. (계산기 자체엔 전용 입력 없음, 1주택 선택으로 수동 모사 필요)
- [x] **annual-leave** (guides/annual-leave-usage-promotion-6month-10day-notice.html, 2026-08-26) — "연차 사용촉진제도, 회사가 이 절차 안 지키면 수당 줘야 한다" — 6개월전 고지+10일전 통보 둘 다 이행해야 면제.
- [x] **cheongyak-score** (guides/cheongyak-score-84-points-breakdown-giveup-penalty.html, 2026-08-26) — "청약 가점 84점 만점, 이렇게 배분된다 + 당첨 포기의 함정" — 무주택32+부양가족35+통장17. 포기시 재당첨제한 최대10년.
- [x] **credit-loan-limit** (guides/credit-loan-overdraft-dsr-full-limit-trap.html, 2026-08-25) — "신용대출 한도, DSR만으로 안 끝나는 이유: 마이너스통장의 함정" — 마이너스통장은 실인출액 아닌 설정한도 전체로 DSR 반영. (계산기 자체엔 전용 로직 없음, 기존대출 월상환액 필드에 수동 환산 입력 필요)
- [x] **electricity-cost-calculator** (guides/electricity-progressive-tariff-seasonal-relaxation.html, 2026-08-25) — "한국 전기요금 누진제 3단계, 여름·겨울엔 왜 완화되나" — 200/201~400/400초과 3단계. **참고**: 이 계산기 자체는 누진제 구간 로직이 전혀 없는 단순 kWh×단가 계산기(가전제품 비교용).
- [x] **four-insurance** (guides/four-insurance-employer-burden-structure.html, 2026-08-20) — "사업주가 근로자보다 4대보험을 더 많이 낸다? 숨은 부담 구조" — 산재보험 평균1.47%는 전액 사업주 부담.
- [x] **fuel-cost-calculator** (guides/fuel-cost-l-per-100km-vs-mpg-diesel-myth.html, 2026-08-26) — "L/100km와 MPG, 왜 헷갈리는가 + 경유가 항상 economical하진 않다" — MPG=235.21÷(L/100km). (연료종류별 나란히 비교는 미지원, 수동 2회 계산 필요)
- [x] **income-tax** (guides/income-tax-progressive-deduction-less-than-table.html, 2026-08-25) — "종합소득세 누진세, 왜 세율표보다 적게 내는가" — 8단계 누진세율+누진공제 개념(코드에서 누진공제액 역산 검증).
- [x] **loan-calc** (guides/loan-equal-payment-vs-equal-principal-interest-diff.html, 2026-08-25) — "원리금균등 vs 원금균등, 총이자 3,500만원 차이의 비밀" — 3억·4%·30년: 실제 계산 차이 35,108,519원(코드 실행 검증).
- [x] **overtime-pay** (guides/overtime-night-pay-200-percent-5-employee-exemption.html, 2026-08-25) — "연장+야간 겹치면 200% — 그런데 5인 미만은 의무가 없다" — 5인미만 사업장 야간수당 의무 없음(단, 계산기 자체엔 5인 여부 토글 없음, 안내문구로만 존재).
- [x] **payslip-calc** (guides/payslip-mandatory-disclosure-500man-fine.html, 2026-08-25) — "급여명세서 미교부, 과태료 500만원 — 2021년 이후 전 사업장 의무" — 2021.11부터 전사업장 의무.
- [x] **percent-calc** (guides/percentage-point-vs-percent-difference.html, 2026-08-24) — "퍼센트 포인트(%p)와 퍼센트(%)는 다르다" — 40%→45%는 5%p(12.5% 아님).
- [x] **prepayment-fee** (guides/prepayment-fee-3year-exemption.html, 2026-08-26) — "중도상환수수료, 왜 3년 지나면 사라지나" — 대부분 실행일로부터 3년 경과시 면제. **버그 발견**: 36개월 이상이면 UI엔 "면제됩니다" 뜨지만 실제 계산 로직은 checkpoint 없이 그대로 비율공식 적용해 수수료 계속 청구됨. 별도 수정 필요.
- [x] **property-tax** (guides/property-tax-comprehensive-not-double-taxation.html, 2026-08-25) — "종부세, 재산세를 또 걷는 이중과세가 아닌 이유" — 종부세의 20% 농특세 추가부과(재산세액공제 로직 코드 확인).
- [x] **realestate-fee** (guides/realestate-agent-fee-negotiable-cap-rate.html, 2026-08-26) — "부동산 중개수수료 상한요율, 사실은 협상 가능하다" — 월세 환산=(보증금+월세×100). **추가발견**: ×100 결과가 5천만원 미만이면 ×70으로 계산하는 예외 조건 있음.
- [x] **rent-convert** (guides/jeonse-monthly-rent-conversion-rate-cap.html, 2026-08-26) — "전월세 전환율 법정 상한, 기준금리+2%p를 넘기면 불법" — 상한=한국은행 기준금리+2%p. **참고**: 기준금리 실시간 반영 안 됨, 정적 기본값(5.0%)이라 사용자가 직접 수정 필요.
- [x] **retirement-calc** (guides/retirement-fire-25x-annual-expense-target.html, 2026-08-25) — "파이어(FIRE) 목표자산, 왜 연지출의 25배인가" (25=1/4% 도출과정 중심으로 각도 조정, fire-calculator 가이드와 중복 방지). **참고**: 이 도구는 실제로 단순 25배가 아니라 유한 은퇴기간 연금현재가치로 계산(기본값 기준 25배가 아닌 약16.6배).
- [x] **retirement-pension** (guides/retirement-pension-db-vs-dc-wage-growth.html, 2026-08-26) — "퇴직연금 DB형 vs DC형, 임금인상률이 갈림길" — 임금인상률>예상투자수익률이면 DB유리(도구는 두 탭 독립계산, 나란히 비교는 안 해줌).
- [x] **salary-raise** (guides/salary-raise-nominal-vs-real-inflation-adjusted.html, 2026-08-26) — "명목 인상률 5%인데 실질은 1.94%? 물가 반영 실질 인상률" — 실질=((1+명목)÷(1+물가)−1)×100. **참고**: 계산기 자체엔 물가 입력·실질인상률 계산 기능 없음, FAQ에만 공식 언급.
- [x] **salary-reverse** (guides/salary-reverse-nonlinear-gross-from-net.html, 2026-08-25) — "실수령액 역산, 왜 단순히 0.85로 나누면 안 되나" — 이분탐색 방식 확인, 월300만 실수령→세전 45,320,000원(코드 로직대로 실측).
- [x] **severance-tax** (guides/severance-tax-service-year-deduction-yeonbun-yeonseung.html, 2026-08-26) — "퇴직소득세가 유독 적은 이유: 근속연수공제와 연분연승법" — 15년근속시 공제액 2,750만원(코드 실행 검증).
- [x] **stock-tax** (guides/stock-tax-domestic-loss-overseas-gain-no-offset.html, 2026-08-26) — "국내주식 손실과 해외주식 이익, 왜 서로 상계가 안 되나" — 해외주식 손익통산 불가, 기본공제 250만.
- [x] **tip-calculator** (guides/tip-service-charge-vs-tip-country-comparison.html, 2026-08-26) — "서비스 차지와 팁은 다르다 + 나라별 팁 비율이 이렇게 다른 이유" — 미국18~20% vs 유럽10~15% vs 한중일 없음. **참고**: 도구엔 국가별 프리셋 없음, FAQ 텍스트로만 설명.

(finance-calculators 61/61 완료 — 전체 250개 후보 풀 소진)
- [x] **vat-calc** (guides/vat-simplified-taxpayer-1-5-4-percent.html, 2026-08-25) — "간이과세자는 왜 부가세를 10%가 아니라 1.5~4%만 내나" — 연매출1억400만이하 업종별 부가가치율 적용. **참고**: 이 계산기 자체는 일반과세(10%)·영세율(0%)만 지원, 간이과세 업종별 계산 미지원(가이드에서 이 한계도 명시).

REJECT(4개, 이유 있음): salary(기존 가이드와 중복), salary-negotiation(수치 근거 얕음), split-calculator(순수 UI), weekly-holiday(minimum-wage 가이드와 중복).

---

## developer-tools (52개 ACCEPT)

- [x] **cron-generator** (guides/cron-spring-quartz-vs-crontab.html, 2026-08-19) — "Spring/Quartz Cron vs 표준 crontab, 필드 하나가 다른 이유" — Spring은 초 필드 추가돼 6필드.
- [x] **uuid-validator** (guides/uuid-primary-key-performance.html, 2026-08-19) — "UUID v4를 DB 기본키로 쓰면 느려지는 이유" — B-트리 페이지 분할 유발, v7/ULID가 대안.
- [x] **regex-tester** (guides/regex-catastrophic-backtracking-redos.html, 2026-08-19) — "정규식 그리디 vs 레이지 매칭과 ReDoS" — 중첩 정량자 `(a+)+`가 catastrophic backtracking 유발.
- [x] **markdown-preview** (guides/markdown-xss-commonmark-history.html, 2026-08-19) — "마크다운 렌더러의 XSS 방어 원리와 CommonMark 표준화 배경" — javascript: 스킴 차단, CommonMark 2014년 등장.
- [x] **html-to-markdown** (guides/html-to-markdown-structural-loss.html, 2026-08-19) — "HTML→Markdown 변환에서 구조적으로 사라지는 것들" — colspan/rowspan 대응 문법 없어 병합셀 풀림.
- [x] **yaml-validator** (guides/yaml-norway-problem-boolean-parsing.html, 2026-08-19) — "YAML의 노르웨이 문제(Norway Problem)" — YAML1.1에서 `no`가 boolean false로 해석되던 버그.
- [x] **json-to-xml** (guides/json-to-xml-array-null-limits.html, 2026-08-19) — "JSON→XML 변환의 근본적 한계" — XML엔 배열 개념 없어 같은 태그 반복, null은 self-closing 태그.
- [x] **html-minifier** (guides/html-minifier-regex-pre-textarea-bug.html, 2026-08-19) — "정규식 기반 HTML 압축기가 실패하는 지점" — `<pre>`/`<textarea>` 내부 의미있는 공백까지 뭉개짐.
- [x] **css-minifier** (guides/css-color-shorthand-minification.html, 2026-08-20) — "CSS 압축기의 색상 코드 축약 규칙" — `#ffffff`→`#fff`는 각 자리쌍 같을 때만.
- [x] **javascript-minifier** (guides/javascript-minifier-string-boundary-regex-risk.html, 2026-08-25) — "JS 압축기의 문자열 손상 위험, 경고는 엉뚱한 곳에 뜬다" — 줄주석 제거는 문자열 인식하지만 블록주석·공백제거는 실제로 위험, 화면 경고는 이미 안전한 케이스만 검사.
- [x] **xml-validator** (guides/xml-validator-well-formed-vs-valid.html, 2026-08-24) — "XML 파서는 왜 HTML보다 깐깐한가(well-formed vs valid)" — strict모드 즉시 파싱중단.
- [x] **user-agent-parser** (guides/user-agent-applewebkit-537-36-legacy.html, 2026-08-24) — "크롬도 왜 AppleWebKit/537.36을 달고 다니나 — UA 문자열의 역사적 유물" — 호환성 위해 고정값 유지.
- [x] **webhook-generator** (guides/webhook-signature-github-stripe-slack-differ.html, 2026-08-24) — "GitHub·Stripe·Slack, 웹훅 서명이 플랫폼마다 다르게 계산되는 이유" — 해시대상 문자열이 각각 다름.
- [x] **sql-minifier** (guides/sql-minifier-comment-string-collision-bug.html, 2026-08-24) — "SQL 압축기가 문자열 속 --를 만나면 쿼리를 통째로 잘라먹는다" — 주석제거가 문자열보호보다 먼저 실행되는 버그(실제 재현 확인).
- [x] **javascript-beautifier** (guides/javascript-beautifier-brace-counting-for-loop-bug.html, 2026-08-25) — "중괄호만 세는 JS 포매터가 for문을 깨뜨리는 이유" — 들여쓰기 깊이를 `{}` 개수로만 계산(실제 재현 확인).
- [x] **css-beautifier** (guides/css-beautifier-char-by-char-nesting-scss-limit.html, 2026-08-25) — "문자 단위 CSS 포매터의 중첩 깊이 추적 방식" — SCSS 전처리기 문법은 깨짐. **추가발견**: 문자열/주석 보호 로직 자체가 없음.
- [x] **keyword-difficulty-estimator** (guides/keyword-difficulty-rule-based-no-real-data.html, 2026-08-25) — "키워드 난이도 점수, 실제 검색 데이터 없이 어떻게 계산되나" — 규칙기반 점수, 5~95 클램프.
- [x] **sitemap-extractor** (guides/sitemap-priority-changefreq-ignored.html, 2026-08-19) — "사이트맵 priority·changefreq, 구글이 이미 무시한다고 밝힌 태그" — 2014년부터 priority 안 씀.
- [x] **serp-snippet-preview** (guides/serp-title-pixel-width-not-char-count.html, 2026-08-25) — "구글 제목 스니펫은 글자수가 아니라 픽셀로 잘린다" — 약600px(Arial기준), 60자는 근사치일뿐.
- [x] **open-graph-preview** (guides/open-graph-preview-tool-accuracy-limits.html, 2026-08-25) — "OG 미리보기 도구, 왜 실제 카카오톡·페이스북과 다르게 보일 수 있나" (open-graph-generator 가이드의 캐시 주제와 중복 피해 "도구는 URL fetch 없이 붙여넣은 HTML만 파싱" 각도로 작성).
- [x] **keyword-cannibalization-checker** (guides/keyword-cannibalization-string-vs-intent.html, 2026-08-25) — "키워드 카니발라이제이션, 문자열은 같아도 검색 의도는 다를 수 있다" — 301/canonical/차별화가 해법.
- [x] **json-schema-generator** (guides/json-schema-null-array-type-gaps.html, 2026-08-20) — "JSON Schema 자동생성기가 놓치는 null과 배열 타입 함정" — null은 nullable 표현 안 됨, 배열은 첫요소만 봄.
- [x] **yaml-diff-checker** (guides/yaml-diff-regex-comment-false-positive.html, 2026-08-20) — "YAML Diff 비교기는 사실 YAML을 이해하지 못한다" — 정규식으로 한줄만 인식, 인라인 주석만 바꿔도 diff 오탐.
- [x] **csv-diff-checker** (guides/csv-diff-encoding-bom-delimiter-traps.html, 2026-08-20) — "CSV diff가 전체 행을 다 다르다고 표시하는 인코딩 함정 3가지" — EUC-KR/CP949, BOM 유무, 구분자 차이.
- [x] **uuid-extractor** (guides/uuid-extractor-version-variant-regex-detection.html, 2026-08-25) — "UUID를 텍스트에서 정확히 골라내는 정규식 조건" — 13번째자리 버전, 19번째자리 변형비트 검사(실제 정규식 확인).
- [x] **api-response-viewer** (guides/api-response-viewer-large-integer-rounding.html, 2026-08-25) — "API 뷰어가 큰 정수를 반올림하는 이유" — JSON.parse가 2^53-1 넘는 정수 정밀도 손실(JS표준동작, reviver 미사용 확인).
- [x] **robots-txt-validator** (guides/robots-txt-disallow-empty-vs-slash.html, 2026-08-25) — "robots.txt에서 Disallow: ''와 Disallow: /는 정반대 의미" — 빈값=전체허용, /=전체차단.
- [x] **meta-tag-analyzer** (guides/robots-meta-tag-noindex-follow-combinations.html, 2026-08-25) — "robots 메타태그 4가지 조합, noindex인데 follow하는 이유" — noindex,follow는 인덱싱만 제외. (도구는 원본값만 노출, 4조합 해설은 FAQ에만 있음)
- [x] **schema-validator** (guides/schema-required-vs-recommended-fields.html, 2026-08-25) — "JSON-LD 필수 vs 권장 필드, 없어도 되는데 왜 넣으라 하나" — 필수필드 누락시 리치스니펫 자체 미표시.
- [x] **canonical-tag-checker** (guides/canonical-tag-duplicate-google-ignores-both.html, 2026-08-25) — "canonical 태그 2개면 구글은 둘 다 무시한다" — CMS 플러그인 충돌·테마 중복출력이 원인.
- [x] **api-tester** (guides/api-tester-cors-vs-network-error-typeerror.html, 2026-08-25) — "CORS 에러 vs 네트워크 오류, 브라우저는 왜 구분해주지 않을까" — fetch()가 둘다 같은 TypeError.
- [x] **curl-generator** (guides/curl-generator-shell-escaping-asymmetry.html, 2026-08-25) — "cURL 명령어 생성기가 조용히 깨지는 순간 — 셸 이스케이핑의 비대칭" — 헤더값 아포스트로피는 이스케이프 안 됨(바디는 됨, 실제 확인).
- [x] **curl-parser** (guides/curl-parser-d-flag-implicit-post.html, 2026-08-25) — "curl -d만 쓰고 -X 안 써도 POST로 잡히는 이유" — -X없이 -d있으면 자동 POST 판정(실제 재현 확인).
- [x] **dns-lookup** (guides/dns-propagation-ttl-explained.html, 2026-08-19) — "DNS 전파는 왜 최대 48시간이나 걸리나 — TTL의 원리" — TTL3600초=1시간 캐시.
- [x] **graphql-formatter** (guides/graphql-formatter-hash-comment-vs-string.html, 2026-08-25) — "GraphQL 포맷터가 문자열 속 #을 주석으로 착각하지 않는 법" — 문자열 placeholder 치환 후 복원(실제 구현 확인).
- [x] **graphql-query-builder** (guides/graphql-query-builder-type-inference-naming.html, 2026-08-26) — "GraphQL 쿼리 빌더의 타입 자동추론, 이름만 보고 어떻게 아나" — id로 끝나면 ID!, count/limit은 Int!. **추가발견**: `/id$/`에 `^` 앵커 없어 "paid"/"valid" 등도 ID!로 오탐.
- [x] **http-request-builder** (guides/http-request-builder-cors-preflight-3-conditions.html, 2026-08-26) — "CORS 프리플라이트(OPTIONS)는 언제 발생하나 — 3가지 조건" — 비단순 메서드/Content-Type/커스텀헤더. (안내문구만, 실시간 검증은 미제공)
- [x] **json-to-yaml** (guides/json-to-yaml-auto-quoting-reserved-words.html, 2026-08-25) — "JSON→YAML 변환기가 문자열에 멋대로 따옴표를 씌우는 이유" — true/false/null처럼 보이면 자동인용.
- [x] **keyword-grouping-tool** (guides/keyword-grouping-search-intent-vs-clustering.html, 2026-08-26) — "검색 의도 분류와 키워드 클러스터링은 다른 개념이다" — 4대 검색의도 키워드 사전매칭(진짜 클러스터링 아님, 순서상 첫 매칭만 적용 확인).
- [x] **mime-type-finder** (guides/mime-type-sniffing-nosniff-header.html, 2026-08-21) — "MIME 스니핑이 뭐길래 보안 헤더가 필요한가" — X-Content-Type-Options:nosniff로 방지. (이 도구 자체는 매직바이트가 아닌 file.type/확장자 기준 판별)
- [x] **number-converter** (guides/number-converter-twos-complement-negative.html, 2026-08-21) — "2의 보수, 컴퓨터가 음수를 표현하는 방법" — 0xFFFFFFFF=-1.
- [x] **redirect-checker** (guides/redirect-checker-301-302-307-308-explained.html, 2026-08-21) — "301 vs 302 vs 307 vs 308, 리다이렉트 코드 헷갈리지 않는 법" — 307/308은 HTTP메서드 보존.
- [x] **regex-cheatsheet** (guides/regex-zero-width-match-count-not-visible.html, 2026-08-25) — "정규식 매칭 개수는 뜨는데 하이라이트가 안 보이는 이유" — 길이0 매칭은 카운트되지만 폭0이라 안 보임(실제 재현 확인).
- [x] **regex-generator** (guides/regex-generator-credit-card-no-luhn-check.html, 2026-08-25) — "정규식 생성기의 '신용카드' 패턴은 사실 아무 13자리 숫자에나 매칭된다" — Luhn체크섬 검증 없음.
- [x] **sitemap-validator** (guides/sitemap-changefreq-priority-google-ignores.html, 2026-08-25) — "changefreq·priority, 구글은 사실 무시한다" — 사이트맵 1개당 최대5만URL·50MB.
- [x] **slug-generator** (guides/slug-generator-nfd-unicode-normalization.html, 2026-08-21) — "URL 슬러그 생성기가 café를 caf-zrich로 안 만드는 이유" — NFD 정규화로 결합기호만 제거.
- [x] **sql-validator** (guides/sql-validator-not-a-real-parser.html, 2026-08-25) — "SQL 유효성 검사기는 사실 파서가 아니다 — 괄호·따옴표·키워드 3가지만 본다" — 순서 뒤죽박죽이어도 통과(실제 재현 확인).
- [x] **tailwind-color-generator** (guides/tailwind-color-cielab-perceptual-distance.html, 2026-08-26) — "가장 비슷한 Tailwind 색상을 찾는 법 — RGB 대신 CIE Lab을 쓰는 이유" — 인간 색지각 비례 거리계산(실제 코드 확인).
- [x] **unit-converter** (guides/unit-converter-gb-vs-gib-binary-decimal.html, 2026-08-21) — "GB와 GiB는 왜 다른가 — 하드디스크 용량이 실제보다 작아 보이는 이유" — 500GB→실제 약465GiB표시. **참고**: 이 도구는 "GB" 단위가 사실상 GiB(2진법)로 계산되고 있음(라벨과 실제 계산 불일치).
- [x] **webhook-tester** (guides/webhook-signature-timing-attack-constant-time.html, 2026-08-25) — "웹훅 서명 검증, === 대신 XOR로 비교하는 이유 — 타이밍 공격 방어" — 상수시간 비교 로직(실제 구현 확인).
- [x] **whois-lookup** (guides/whois-rdap-protocol-transition.html, 2026-08-20) — "WHOIS는 죽었다? RDAP가 대체하는 이유" — HTTPS+JSON 구조화 응답.
- [x] **yaml-to-json** (guides/yaml-to-json-kubernetes-multi-document-error.html, 2026-08-26) — "YAML→JSON 변환기가 쿠버네티스 매니페스트에서 실패하는 이유" — 다중문서 YAML(`---`)에서 에러(실제 재현 확인).

(developer-tools 52/52 완료)

REJECT(3개): ip-address-lookup(일반 네트워킹 상식 나열뿐), website-speed-estimator(범용 웹퍼포먼스 상식뿐), (json-schema-validator는 이미 클레임되어 제외).

---

## text-tools (32개 ACCEPT)

- [x] **character-counter** (guides/sms-byte-limit-euckr-encoding.html, 2026-08-19) — "글자수 세기, UTF-8 vs EUC-KR 바이트가 다른 이유와 SMS 요금 폭탄" — SMS 한글45자(90바이트) 초과시 LMS 전환.
- [x] **word-counter** (guides/word-counter-lexical-diversity-ttr.html, 2026-08-19) — "고유 단어 비율(TTR)로 내 글의 어휘 다양성 진단하기" — TTR=고유단어÷총단어, 길이 편향과 MTLD/MSTTR/Guiraud 보정.
- [x] **sentence-counter** (guides/sentence-boundary-detection-limits.html, 2026-08-19) — "문장은 어디서 끝나는가, 규칙 기반 문장 분리기의 한계" — 종결부호 없는 마지막 조각도 별도 카운트.
- [x] **read-time-calculator** (guides/reading-time-korean-cjk-char-count.html, 2026-08-19) — "읽기 시간 계산기, 한국어는 왜 '단어 수'가 아니라 '글자 수'로 계산하나" — CJK 40%초과시 계산방식 전환.
- [x] **text-reverser** (guides/text-reverser-emoji-surrogate-pair-break.html, 2026-08-19) — "텍스트를 뒤집으면 왜 이모지가 깨지는가, 서로게이트 쌍의 함정" — UTF-16 서로게이트쌍 2개 구성.
- [x] **text-shuffler** (guides/text-shuffler-fisher-yates-bias.html, 2026-08-24) — "Array.sort(Math.random)이 왜 편향된 셔플인가, Fisher-Yates가 필요한 이유" — 이 도구는 실제로 Fisher-Yates 정확 구현.
- [x] **text-sorter** (guides/text-sorter-natural-sort-numeric-order.html, 2026-08-21) — "자연 정렬(Natural Sort), item2가 item10보다 왜 먼저 와야 하나" — 문자열속 숫자를 값으로 비교.
- [x] **alphabetizer** (guides/alphabetizer-localecompare-vs-unicode-sort.html, 2026-08-19) — "가나다순 정렬, localeCompare와 유니코드 순서는 왜 다른가" — 중국어·일본어는 유니코드 순서로만 정렬.
- [x] **text-diff-checker** (guides/text-diff-lcs-algorithm-explained.html, 2026-08-20) — "diff 도구는 어떻게 변경사항을 찾아내는가, LCS 알고리즘 해부" — 줄단위 LCS만 지원, git Myers 알고리즘과 차이.
- [x] **case-converter** (guides/turkish-i-problem-case-conversion.html, 2026-08-19) — "터키어의 I 문제, 표준 대소문자 변환이 깨지는 언어가 있다" — 터키어 점없는I/점있는i 구분.
- [x] **typing-speed-test** (guides/typing-speed-wpm-5-char-word-standard.html, 2026-08-25) — "타자 속도 WPM, 왜 항상 '5글자=1단어'로 계산하나" — 영문 평균단어길이 5자 기준 국제표준(단, 이 도구는 공백기준 실제 단어수 사용, 가이드에서 지적).
- [x] **cps-calculator** (guides/cps-human-click-speed-limit-butterfly.html, 2026-08-25) — "인간 클릭 속도의 한계, 버터플라이·드래그 클릭이 필요한 이유" — 한손가락 한계 ~10CPS, 기법동원시 14~16CPS.
- [x] **wpm-calculator** (guides/wpm-korean-typing-vs-english-conversion.html, 2026-08-25) — "한글 타자속도(타/분)와 영문 WPM, 왜 1:1 환산이 안 되는가" — 초성·중성·종성 조합 타건 기준.
- [x] **reading-level-checker** (guides/reading-level-smog-formula-simplification-error.html, 2026-08-25) — "가독성 점수의 함정, 이 도구의 SMOG 지수가 표준 공식과 다르게 나오는 이유" — 계수3으로 단순화, +3.1291 상수 아예 없음(코드 실측 확인).
- [x] **remove-special-characters** (guides/remove-special-characters-emoji-surrogate-bug.html, 2026-08-25) — "정규식 문자 클래스의 함정, 왜 이모지가 절반만 지워지는가" — u플래그 부재 확인, 같은 상위서로게이트 공유하는 다른 이모지가 오손됨.
- [x] **text-summarizer** (guides/text-summarizer-korean-limitation.html, 2026-08-19) — "이 텍스트 요약기, 사실 한국어에서는 작동하지 않는다" — `\w`가 한글 비인식, 문장점수 전부 0되는 버그.
- [x] **anagram-checker** (guides/anagram-checker-character-frequency-array.html, 2026-08-20) — "애너그램 판별, 정렬 대신 문자 빈도표를 쓰는 이유" — 각 글자 등장횟수 배열 누적비교.
- [x] **ascii-converter** (guides/ascii-utf8-subset-compatibility.html, 2026-08-24) — "ASCII가 사실 UTF-8의 부분집합인 이유" — 0~127범위 바이트단위 완전동일.
- [x] **ascii-table** (guides/ascii-del-127-punch-tape-history.html, 2026-08-21) — "제어문자 DEL(127)은 왜 하필 127번일까 — 천공 테이프가 남긴 흔적" — 천공테이프 무효화 관습 유래.
- [x] **emoji-counter** (guides/emoji-counter-surrogate-pair-sns-limit.html, 2026-08-20) — "이모지 하나가 글자수 2~11개로 세지는 이유 — SNS 글자수 제한의 함정" — 가족이모지 11코드유닛 이상.
- [x] **emoji-remover** (guides/emoji-remover-digit-false-positive.html, 2026-08-21) — "숫자도 기술적으로는 이모지다? — Intl.Segmenter와 이모지 오탐 문제" — 0~9,#,*가 Emoji속성 보유.
- [x] **hashtag-generator** (guides/hashtag-count-strategy-3-4-3-ratio.html, 2026-08-25) — "해시태그 몇 개가 적당한가 — 인기·중간·틈새 3:4:3 전략" — 플랫폼별 적정개수 차이.
- [x] **keyword-extractor** (guides/keyword-extractor-korean-particle-limitation.html, 2026-08-19) — "왜 '텍스트를'과 '텍스트가'가 다른 단어로 집계될까 — 조사 없는 언어를 위해 설계된 도구의 한계" — 형태소분석 없이 조사포함 집계.
- [x] **ngram-analyzer** (guides/ngram-analyzer-cjk-regex-language-bias.html, 2026-08-25) — "다국어 UI인데 정작 중국어·일본어는 분석 못 하는 N-그램 분석기 — 정규식 언어 편향" — 한자·가나 정규식으로 삭제(실제 재현 확인).
- [x] **palindrome-checker** (guides/palindrome-checker-codepoint-vs-grapheme.html, 2026-08-21) — "사람 눈엔 회문인데 알고리즘은 아니라는 경우 — 코드포인트 vs 그래프임 함정" — 국기·ZWJ이모지 오판 가능.
- [x] **stopword-remover** (guides/stopword-remover-tfidf-distortion.html, 2026-08-21) — "TF-IDF 돌리기 전에 불용어부터 지우는 이유" — 통계왜곡시키는 고빈도단어 개념. (도구 표기 "약70개"는 실제 95개, 가이드에서 정정)
- [x] **text-case-detector** (guides/text-case-camelcase-vs-kebab-case-origin.html, 2026-08-25) — "camelCase vs kebab-case, 왜 언어마다 다른 표기법을 쓰나" — kebab은 JS 변수명 문법상 불가.
- [x] **text-encryptor** (guides/text-encryptor-caesar-to-aes-history.html, 2026-08-24) — "카이사르 암호부터 AES-256-GCM까지, 이 도구 하나로 보는 암호화 발전사" — PBKDF2 10만회 반복+매번 새salt(16바이트)+IV(12바이트) 실측 확인.
- [x] **text-statistics** (guides/text-statistics-flesch-korean-limitation.html, 2026-08-21) — "Flesch 가독성 지수, 왜 한국어에는 안 통하나" — 1948년 영어전용 공식. **버그 발견**: 실제로는 한글도 점수 미표시가 아니라 10단어↑면 무의미한 점수(음절수 강제 fallback=1)를 그대로 노출함 — 도구 자체 FAQ 설명과 실제 동작이 다름. 별도 수정 필요.
- [x] **unicode-converter** (guides/unicode-escape-js-json-python-comparison.html, 2026-08-25) — "이모지 하나, 프로그래밍 언어마다 다른 세 가지 이스케이프 표기" — JS/JSON/Python 표기 비교.
- [x] **unicode-inspector** (guides/unicode-homograph-phishing-domains.html, 2026-08-20) — "apple.com이 진짜 apple.com이 아닐 수도 있다 — 호모글리프 피싱의 원리" — IDN 호모그래프 도메인 피싱.
- [x] **word-frequency-counter** (guides/word-frequency-percentage-denominator-basis.html, 2026-08-25) — "빈도 막대그래프의 %가 어떤 값을 기준으로 하는지" — 분모가 전체토큰(발생횟수) 기준.

(text-tools 32/32 완료)

REJECT(9개): line-counter, find-replace, remove-empty-lines, remove-duplicate-lines, text-cleaner, line-merger, random-word-generator, remove-duplicate-words, text-merger (전부 순수 UI/기능 나열, 원리·비교 앵글 부재).

---

## image-tools (24개 ACCEPT)

- [x] **image-resizer** (guides/image-upscale-quality-loss.html, 2026-08-19) — "이미지를 키우면 왜 화질이 안 좋아지나: 업스케일의 함정" — A4 300DPI 인쇄=2480×3508px.
- [x] **png-to-jpg** (guides/progressive-vs-baseline-jpeg.html, 2026-08-19) — "프로그레시브 JPEG vs 기본 JPEG, 브라우저 변환기가 안 만들어주는 이유" — Canvas 기본출력은 항상 baseline방식, 스캔 구조 차이.
- [x] **base64-image** (guides/base64-image-33-percent-overhead.html, 2026-08-19) — "Base64 이미지, 왜 원본보다 33% 커지나" — 1MB→약1.33MB.
- [x] **svg-viewer** (guides/svg-viewer-script-execution-blocked.html, 2026-08-19) — "SVG 미리보기 안에서 스크립트가 실행되지 않는 이유" — Blob+img src로 script실행 원천차단.
- [x] **svg-to-png** (guides/svg-animation-to-png-static-frame.html, 2026-08-19) — "SVG 애니메이션을 PNG로 구우면 왜 항상 정지 프레임인가" — 애니메이션 시작전 상태만 캡처.
- [x] **png-to-svg** (guides/png-to-svg-not-real-vector-tracing.html, 2026-08-19) — "PNG를 SVG로 바꿔준다는 도구, 사실은 벡터 트레이싱이 아니다" — 픽셀마다 1×1 rect 방식.
- [x] **image-rotator** (guides/image-rotator-canvas-bounding-box-expand.html, 2026-08-21) — "정각이 아닌 각도로 회전하면 캔버스가 왜 커지는가" — cos·sin 바운딩박스 동적계산.
- [x] **image-watermark** (guides/image-watermark-webfont-vs-pdf-font.html, 2026-08-21) — "이미지 워터마크는 한글이 안 깨지는데 PDF 워터마크는 왜 깨지나" — 웹폰트 vs PDF내장폰트 차이.
- [x] **exif-viewer** (guides/exif-gps-dms-rational-format.html, 2026-08-19) — "GPS 좌표가 숫자 하나가 아니라 세 개인 이유" — 도·분·초 3개 유리수(RATIONAL) 저장.
- [x] **exif-remover** (guides/exif-remover-gps-privacy-sns.html, 2026-08-20) — "사진 속 GPS 좌표, 왜 SNS 올리기 전에 지워야 하나" — Canvas 재인코딩으로 메타데이터 원천 제거.
- [x] **ico-converter** (guides/ico-converter-png-inside-ico.html, 2026-08-21) — "ICO 파일 속 아이콘, 사실은 전부 PNG로 저장된다" — Vista이후 PNG바이트 그대로 담는 방식.
- [x] **webp-to-jpg** (guides/webp-compatibility-kakaotalk-old-devices.html, 2026-08-20) — "카카오톡에 웹피(WebP) 이미지가 안 열리는 이유" — 구형iOS/안드로이드 WebP 미리보기 실패.
- [x] **image-color-extractor** (guides/image-color-extractor-clustering-vs-average.html, 2026-08-20) — "이미지 대표색, 평균값이 아니라 클러스터링을 쓰는 이유" — 빨강+파랑 평균=보라 오류 방지(k-means 유사 클러스터링 실제 구현 확인됨).
- [x] **pixelate-image** (guides/pixelate-image-low-intensity-recovery-risk.html, 2026-08-21) — "픽셀화로 가린 사진, 낮은 강도면 복원될 수 있다" — 저강도 픽셀화 원본추정 가능 연구.
- [x] **color-palette** (guides/color-palette-complementary-triadic-angles.html, 2026-08-21) — "보색·삼색·분할보색, 각도로 배우는 색상 조화 이론" — 보색180°, 삼색120°씩.
- [x] **color-converter** (guides/color-converter-srgb-vs-display-p3.html, 2026-08-21) — "같은 HEX 코드인데 화면마다 색이 다르게 보이는 이유" — sRGB vs Display P3 색공간 차이.
- [x] **color-blindness-simulator** (guides/color-blindness-simulator-accuracy.html, 2026-08-19) — "색맹 시뮬레이터의 숨은 버그, 왜 완전한 회색이 안 나올까" — 3×4행렬을 3×3으로 착각한 실제 코드버그.
- [x] **avif-to-jpg** (guides/avif-to-jpg-transparent-background-black.html, 2026-08-21) — "투명 배경 이미지를 JPG로 바꾸면 왜 까맣게 나오는가" — Canvas 기본픽셀(투명검정)+알파소실.
- [x] **image-dimension-checker** (guides/image-dimension-aspect-ratio-gcd.html, 2026-08-21) — "16:9는 어떻게 계산되나: 종횡비의 유클리드 호제법" — GCD알고리즘으로 정수비 약분.
- [x] **image-dpi-checker** (guides/image-dpi-checker-cm-inch-conversion-bug.html, 2026-08-21) — "인쇄용 300DPI 사진이 118로 잘못 표시되는 이유" — 이 도구는 ResolutionUnit 태그 확인해 실제로 정상 처리 중(버그 아님, 일반 현상 설명용).
- [x] **jpg-to-heic** (guides/jpg-to-heic-codec-license-webp-fallback.html, 2026-08-21) — "JPG to HEIC라는 이름인데 실제로는 HEIC를 만들 수 없다" — 코덱 라이선스로 브라우저 인코딩 불가, WebP로 대체.
- [x] **heic-to-jpg** (guides/heic-to-jpg-hevc-codec-license.html, 2026-08-20) — "iPhone 사진이 브라우저에서 안 열리는 이유" — HEVC특허코덱, libheif WASM 이식.
- [x] **transparent-background-maker** (guides/transparent-background-color-key-tolerance.html, 2026-08-21) — "배경 제거 도구의 색상 키 알고리즘, 허용범위는 실제로 어떻게 계산되나" — RGB거리×2.2, 알파 선형감소.
- [x] **svg-cleaner** (guides/svg-cleaner-editor-namespace-bloat.html, 2026-08-21) — "SVG 파일 용량의 숨은 범인, 에디터 네임스페이스" — Inkscape/AI/Figma 메타데이터 10~40% 감소. **버그 발견**: Illustrator+Inkscape 정리 동시 활성화 시 `i:` 정규식이 `sodipodi:` 속성 끝문자와 충돌해 훼손, 연속된 빈 속성(`class="" style=""`) 중 하나만 제거됨. 별도 수정 필요.

REJECT(7개): webp-to-png, image-to-webp, image-cropper, blur-image, color-picker, css-gradient-generator, jpg-to-avif (기존 image-format-comparison-2026 가이드와 중복 또는 순수 UI 조작). (image-tools 24/24 완료)

---

## generator-tools (21개 ACCEPT)

- [x] **seo-title-generator** (guides/google-title-pixel-width-truncation.html, 2026-08-19) — "SEO 제목, 왜 한글은 영어보다 훨씬 빨리 잘리나" — 구글 픽셀폭 기준(약580px), 한글28~30자 vs 영문50~60자.
- [x] **meta-description-generator** (guides/meta-description-google-rewrite.html, 2026-08-19) — "메타 설명, 써도 구글이 무시하는 이유" — 순위요소 아니나 CTR 간접기여, 구글이 본문서 발췌대체.
- [x] **ai-youtube-title-generator** (guides/youtube-title-thumbnail-redundancy.html, 2026-08-19) — "유튜브 제목 vs 썸네일, 같은 말 두 번 하면 손해인 이유" — 70자초과 잘림, 이탈률↑시 알고리즘 노출↓.
- [x] **ai-thumbnail-title-generator** (guides/youtube-thumbnail-text-10-char-limit.html, 2026-08-21) — "유튜브 썸네일 문구, 왜 10자를 넘기면 안 되나" — 한줄10자·2줄20자 권장.
- [x] **utm-builder** (guides/utm-internal-link-tracking-mistake.html, 2026-08-19) — "UTM, 내부 링크에 붙이면 왜 절대 안 되나" — 내부링크에 붙이면 GA가 새 세션으로 오집계.
- [x] **robots-txt-generator** (guides/robots-txt-allow-disallow-conflict-rule.html, 2026-08-19) — "robots.txt, Allow와 Disallow 충돌하면 누가 이기나" — 더 긴(구체적)경로 우선.
- [x] **meta-tag-generator** (guides/meta-keywords-tag-google-2009-deprecated.html, 2026-08-21) — "구글은 2009년부터 keywords 메타태그를 안 본다" — 2009년(구글)/2011년(빙) 공식 폐기 발표.
- [x] **sitemap-generator** (guides/sitemap-generator-50000-url-limit.html, 2026-08-21) — "사이트맵 5만 개 URL 제한, 왜 하필 그 숫자인가" — 단일 사이트맵 최대5만URL·50MB. (이 도구는 초과 시 경고조차 없음, 가이드에서 지적)
- [x] **open-graph-generator** (guides/open-graph-social-cache-not-updating.html, 2026-08-21) — "OG 태그 고쳤는데 카톡/페북 미리보기가 안 바뀌는 이유" — 플랫폼 캐싱, 2010년 f8공개 프로토콜.
- [x] **twitter-card-generator** (guides/twitter-card-og-tag-fallback.html, 2026-08-21) — "twitter:card 안 넣어도 트위터 카드가 뜨는 이유" — OG태그 자동 폴백.
- [x] **schema-markup-generator** (guides/schema-markup-json-ld-rich-snippet-ctr.html, 2026-08-21) — "JSON-LD가 구조화 데이터 표준이 된 이유" — 리치스니펫 CTR 평균20~30%↑.
- [x] **hreflang-generator** (guides/hreflang-bidirectional-mistakes.html, 2026-08-19) — "hreflang, 절반이 틀리게 쓰는 SEO 태그" — 양방향참조 비대칭이면 구글이 조용히 무시.
- [x] **htaccess-generator** (guides/htaccess-hsts-lockout-risk.html, 2026-08-21) — "HSTS 설정했다가 사이트가 접속 불가가 되는 이유" — 인증서 문제시 HTTPS 강제로 접속불가.
- [x] **nginx-config-generator** (guides/nginx-event-driven-vs-apache-thread.html, 2026-08-21) — "Nginx가 대량 동시접속에 강한 진짜 이유" — 이벤트기반 비동기 vs Apache 스레드/프로세스.
- [x] **apache-config-generator** (guides/apache-htaccess-vs-virtualhost-performance.html, 2026-08-21) — ".htaccess vs VirtualHost, 왜 성능 차이가 나나" — .htaccess는 요청마다 재로딩.
- [x] **uuid-generator** (guides/uuid-crypto-randomuuid-collision-probability.html, 2026-08-21) — "왜 crypto.randomUUID()를 꼭 써야 하나 — UUID 충돌 확률과 예측 가능성" (당초 예정 "DB 기본키" 주제는 uuid-validator 가이드와 중복이라 각도 변경).
- [x] **uuid-converter** (guides/uuid-variant-bits-fourth-group.html, 2026-08-21) — "UUID 네 번째 그룹 첫 글자, 아무도 안 보는 그 한 글자의 의미" — variant 비트 판별규칙.
- [x] **ulid-generator** (guides/ulid-crockford-base32-no-ilou.html, 2026-08-21) — "ULID 알파벳에 I, L, O, U가 없는 이유" — Crockford Base32, 서기10889년까지 표현.
- [x] **nanoid-generator** (guides/random-string-modulo-bias-rejection-sampling.html, 2026-08-20) — "랜덤 문자열 생성기가 몰래 편향되는 이유(그리고 고치는 법)" — 거부샘플링(rejection sampling) 메커니즘.
- [x] **qr-code-generator** (guides/qr-code-error-correction-logo.html, 2026-08-19) — "QR코드 오류 수정 레벨, H(30%)를 쓰면 정말 로고를 박아도 되나" — L7/M15/Q25/H30% 4단계.
- [x] **lorem-ipsum-generator** (guides/lorem-ipsum-cicero-history.html, 2026-08-20) — "Lorem Ipsum, 키케로가 쓴 그 문장이 왜 의미 없는 글자로 보이나" — 기원전45년 키케로 원문 훼손 역사.

REJECT(8개): youtube-script-generator, ai-email-generator, ai-resume-generator, ai-cover-letter-generator, ai-product-description-generator, ai-blog-title-generator, ai-tweet-generator, ai-linkedin-post-generator (전부 FAQ가 자기 도구 내부 버그/한계 고백뿐, 외부지식 없음). (generator-tools 21/21 완료)

---

## security-tools (17개 ACCEPT)

- [x] **url-encoder** (guides/url-double-encoding-plus-vs-percent20.html, 2026-08-19) — "encodeURIComponent vs encodeURI, 이중 인코딩(%2520) 버그는 왜 생기나" — 폼(+) vs REST API(%20) 인코딩 차이.
- [x] **url-decoder** (guides/url-decoding-plus-sign-double-decode.html, 2026-08-19) — "URL 디코딩에서 '+'가 공백이 안 되는 이유, 이중 디코딩 처리법" — decodeURI는 %XX만 처리, +는 안건드림.
- [x] **html-decoder** (guides/html-decoder-native-parser-safety.html, 2026-08-19) — "브라우저 네이티브 파서로 HTML 엔티티를 안전하게 디코딩하는 원리" — textarea.innerHTML RAWTEXT모델.
- [x] **hash-generator** (guides/md5-sha1-hash-vs-hmac-vs-crc32.html, 2026-08-19) — "MD5·SHA-1은 왜 아직 쓰이지만 보안엔 못 쓰나 — 해시 vs HMAC vs CRC32" — 실제 해시충돌 사례.
- [x] **random-string** (guides/random-string-crypto-entropy-calculation.html, 2026-08-19) — "Math.random()과 crypto.getRandomValues(), 비밀번호 생성기 엔트로피 계산법" — 128비트 엔트로피=최소22자.
- [x] **http-header-checker** (guides/http-header-hsts-max-age-zero-trap.html, 2026-08-21) — "HSTS max-age=0의 함정 — 보안 헤더가 있어도 없는 셈인 경우" — RFC6797상 max-age=0은 HSTS비활성.
- [x] **ssl-checker** (guides/ssl-checker-certificate-transparency-logs.html, 2026-08-20) — "SSL 체커는 실제로 서버에 접속하지 않는다 — Certificate Transparency 로그의 원리와 한계" — crt.sh CT로그 대체조회.
- [x] **csr-generator** (guides/csr-key-size-rsa-vs-ec-tradeoff.html, 2026-08-21) — "CSR 키 크기 2048 vs 4096, EC vs RSA — 뭘 골라야 인증서가 빨라지나" — EC P-256=RSA2048과 동등보안.
- [x] **csp-generator** (guides/csp-unsafe-inline-nonce-alternative.html, 2026-08-20) — "'unsafe-inline' 한 줄이 CSP 방어를 무력화하는 이유와 nonce 대안" — meta태그는 frame-ancestors 미지원.
- [x] **csp-validator** (guides/csp-report-only-rollout-three-stages.html, 2026-08-21) — "CSP를 사이트 안 깨뜨리고 도입하는 법 — Report-Only에서 강제 모드까지 3단계" — data:URI가 img-src/script-src서 위험도 다름. (도구 자체는 Report-Only 생성·지시어별 위험도 구분은 미지원, FAQ에만 언급)
- [x] **cors-header-checker** (guides/cors-preflight-simple-vs-non-simple-request.html, 2026-08-21) — "Preflight가 도는 요청 vs 안 도는 요청 — CORS 에러의 진짜 원인" — simple request는 preflight없이 즉시전송.
- [x] **hash-checker** (guides/hash-checker-md5-web-crypto-unsupported.html, 2026-08-21) — "왜 브라우저 표준 해시 API는 MD5를 지원하지 않는가" — crypto.subtle.digest는 MD5 넘기면 즉시 예외. (hash-checker.html은 MD5 자체 미지원, 자체 JS MD5 구현은 자매 도구 hash-generator.html 쪽)
- [x] **bcrypt-generator** (guides/bcrypt-72-byte-korean-limit.html, 2026-08-19) — "bcrypt 72바이트 제한, 한글 비밀번호는 24자에서 잘린다" — 72바이트 이후 다른 한글비번 2개 동일해시 실증.
- [x] **bcrypt-validator** (guides/bcrypt-validator-salt-embedded-hash.html, 2026-08-21) — "bcrypt는 salt를 따로 안 저장하는데 어떻게 검증하나 — compare()의 실제 동작" — 해시 앞29자를 salt로 재사용.
- [x] **hmac-generator** (guides/hmac-length-extension-attack.html, 2026-08-19) — "HMAC이 길이 확장 공격을 막는 이중 해시 구조(ipad/opad)" — 단순연결해시는 length-extension 취약.
- [x] **rsa-key-generator** (guides/rsa-public-exponent-65537-pkcs-formats.html, 2026-08-21) — "RSA 공개지수 65537의 의미와 PKCS#8 vs PKCS#1 포맷 함정" — 2048비트+OAEP 평문190바이트 제한.
- [x] **ssh-key-generator** (guides/ssh-key-ed25519-vs-rsa-shell-escape.html, 2026-08-21) — "Ed25519가 RSA를 대체하는 이유 — SSH 키 알고리즘 비교와 셸 이스케이프 함정" — 고정256비트로 RSA2048 이상 보안.

REJECT(5개): base64-encoder, base64-decoder, html-encoder(순수 인코딩 스펙뿐), jwt-decoder, jwt-generator(기존 jwt-authentication-guide와 중복). (security-tools 17/17 완료)

---

## pdf-tools (13개 ACCEPT)

- [x] **pdf-page-counter** (guides/pdf-page-count-fixed-layout-vs-reflow.html, 2026-08-19) — "PDF 페이지 수, 왜 Word 문서랑 다르게 나올까" — pdf-lib getPageCount()가 읽는 Pages트리 Count값(고정) vs Word 리플로우 재계산.
- [x] **image-to-pdf** (guides/image-to-pdf-recompression-size-increase.html, 2026-08-19) — "이미지를 PDF로 바꾸면 왜 용량이 커질 수 있을까" — PNG/GIF는 캔버스거쳐 무손실PNG로 재인코딩.
- [x] **pdf-password-remover** (guides/pdf-password-remover-generic-error.html, 2026-08-19) — "PDF 비밀번호 제거가 실패하는 이유, 오류 메시지가 알려주지 않는 것" — 틀린비번·미지원암호화 동일오류.
- [x] **pdf-password-adder** (guides/pdf-user-vs-owner-password.html, 2026-08-19) — "PDF 비밀번호가 두 종류인 이유 — 사용자 비밀번호 vs 소유자 비밀번호" — 열람제어 vs 권한제어 분리.
- [x] **pdf-rotate** (guides/pdf-rotate-metadata-no-quality-loss.html, 2026-08-19) — "PDF를 돌려도 화질이 그대로인 이유 — /Rotate 메타데이터의 원리" — 재렌더링 없이 값만 변경.
- [x] **pdf-extract-images** (guides/pdf-extract-images-page-rasterize-not-embedded.html, 2026-08-19) — "PDF 이미지 추출, 사실은 페이지 전체를 사진 찍는 방식" — 캔버스 렌더링, 1pt=1/72인치.
- [x] **pdf-metadata-viewer** (guides/pdf-metadata-privacy-leak.html, 2026-08-19) — "이력서에 몰래 딸려가는 정보 — PDF 메타데이터 유출 실제 사례" — Info Dict+XMP 이중저장구조.
- [x] **pdf-watermark** (guides/pdf-watermark-korean-font-embedding-limit.html, 2026-08-20) — "PDF 워터마크에 한글이 깨지는 이유 — 내장 폰트의 한계" — PDF표준14개 기본폰트 라틴전용.
- [x] **pdf-to-text** (guides/pdf-to-text-table-coordinate-scatter.html, 2026-08-20) — "PDF에서 복사한 표가 다 깨지는 이유" — 연속문자열 아닌 좌표+폰트정보로 흩어져 저장.
- [x] **pdf-ocr** (guides/pdf-ocr-per-page-text-detection.html, 2026-08-21) — "PDF OCR가 페이지마다 다르게 동작하는 원리" — 텍스트항목수 기준 페이지별 독립판별.
- [x] **pdf-metadata-remover** (guides/pdf-metadata-remove-empty-vs-delete.html, 2026-08-21) — "PDF 메타데이터 제거, '완전 삭제'와 '빈 값'은 다르다" — 6필드 빈값 vs 2필드 키자체 삭제 비대칭.
- [x] **pdf-size-analyzer** (guides/pdf-size-analyzer-shared-resource-limit.html, 2026-08-21) — "PDF 크기 분석기의 '페이지별 크기', 사실은 용량이 아니다" — 리소스 공유구조상 페이지별 바이트계산 불가.

(pdf-tools 13/13 완료)
- [x] **pdf-word-counter** (guides/pdf-word-counter-cjk-whitespace-split.html, 2026-08-20) — "PDF 단어 수 세기, 중국어·일본어는 왜 부정확할까" — 공백기준분할이 CJK서 텍스트조각개수로 집계.

REJECT(4개): pdf-merge, pdf-split, pdf-to-image, pdf-reorder-pages (순수 기능 사용법, 독자 앵글 없음).

---

## ai-tools (10개 ACCEPT)

- [x] **ai-token-counter** (guides/korean-ai-token-inefficiency.html, 2026-08-19) — "한국어는 왜 영어보다 토큰을 더 많이 먹는가" — "안녕하세요"≈5토큰 vs "Hello"≈3토큰.
- [x] **prompt-formatter** (guides/prompt-formats-chatml-xml-jsonl.html, 2026-08-19) — "ChatML vs XML vs JSONL, 모델마다 프롬프트 포맷이 다른 이유" — OpenAI ChatML vs Claude XML태그.
- [x] **image-prompt-generator** (guides/image-prompt-generator-dalle-negative-prompt-bug.html, 2026-08-19) — "이미지 프롬프트 생성기, DALL-E 모드에만 있는 숨은 버그" — 공백중복+네거티브프롬프트 무시되는 실제버그.
- [x] **prompt-optimizer** (guides/prompt-optimizer-task-type-rctf-structure.html, 2026-08-20) — "프롬프트 하나로 안 되는 이유: 작업 유형별 8가지 구조(RCTF)" — 요약/번역별 요구사항 항목 차이.
- [x] **system-prompt-generator** (guides/system-prompt-fixed-clauses-roleplay-conflict.html, 2026-08-19) — "시스템 프롬프트에 숨어있는 고정 문구, 캐릭터 롤플레이와 충돌하는 이유" — 4가지 일반원칙 무조건 덧붙는 구조.
- [x] **prompt-cleaner** (guides/prompt-cleaner-token-count-approximation.html, 2026-08-19) — "프롬프트 정제기가 보여주는 토큰 수는 가짜다" — 문자수×0.25 근사식, 한글서 과소표시.
- [x] **prompt-template-generator** (guides/prompt-template-chain-of-thought-fixed-steps.html, 2026-08-21) — "Chain-of-Thought 템플릿 '3단계'는 왜 고정값일 뿐인가" — CoT 하드코딩 3단계 vs 최신 reasoning모델.
- [x] **prompt-variable-extractor** (guides/prompt-variable-extractor-bracket-syntax-limit.html, 2026-08-21) — "{{변수}}는 되는데 [변수]는 왜 안 되나" — 마크다운 링크/각주와 구분불가해 미지원. **버그 발견**: 정규식이 `\w`(ASCII전용)라 한글 변수명(예: `{{역할}}`) 매칭 0건 — 내장 한국어 예시 로드 시 변수 추출 안 됨. 별도 수정 필요.
- [x] **ai-model-comparison** (guides/ai-model-comparison-free-tier-differences.html, 2026-08-20) — "GPT vs Claude vs Gemini, 무료 티어는 뭐가 다른가" — Gemini 계열내 무료티어 비대칭.
- [x] **markdown-chat-exporter** (guides/chat-export-silent-failure-role-prefix.html, 2026-08-20) — "AI 채팅 내보내기가 조용히 실패하는 순간" — 역할접두사 없으면 무오류로 결과빔.

REJECT: 없음(10개 전부 ACCEPT). (ai-tools 10/10 완료)

---

## data-tools (8개 ACCEPT)

- [x] **json-validator** (guides/json-large-integer-precision-loss.html, 2026-08-19) — "JSON 숫자가 깨지는 이유: IEEE 754와 2^53의 함정" — 2^53(9007199254740992) 초과 정수 정밀도 손실.
REJECT: **yaml-formatter** — "YAML의 노르웨이 문제" 주제는 yaml-validator 가이드(guides/yaml-norway-problem-boolean-parsing.html)와 완전 중복돼 스킵. (data-tools 8/8 완료, yaml-formatter는 별도 앵글 없이 제외)
- [x] **csv-to-json** (guides/csv-to-json-leading-zero-loss.html, 2026-08-19) — "CSV를 JSON으로 바꿀 때 숫자로 둔갑하는 값: 앞자리 0이 사라지는 문제" — "007"/"010-"는 문자열 유지.
- [x] **json-diff** (guides/json-array-diff-index-vs-lcs.html, 2026-08-19) — "JSON 배열 비교의 함정: 인덱스 기반 diff가 중간 삽입에서 틀리는 이유" — LCS정렬 없이 인덱스만 대응.
- [x] **json-flattener** (guides/json-flatten-unflatten-array-loss.html, 2026-08-19) — "중첩 JSON 평탄화(flatten)와 되돌리기(unflatten), 정보가 사라지는 지점" — 2차원배열서 구조정보 소실.
- [x] **xml-to-json** (guides/xml-to-json-mixed-content-whitespace-loss.html, 2026-08-19) — "XML을 JSON으로 바꾸면 사라지는 것: 혼합 콘텐츠의 순서와 공백" — 텍스트노드 개별trim으로 공백손실.
- [x] **json-path-tester** (guides/jsonpath-syntax-and-slicing-support.html, 2026-08-19) — "JSONPath 완전정리: 문법과 이 도구가 지원하지 않는 것" — 슬라이싱([0:2]) 미지원.
- [x] **sql-to-json** (guides/sql-insert-to-json-escaped-quote-bug.html, 2026-08-19) — "SQL INSERT를 JSON으로 바꾸는 파서의 숨은 버그: 이스케이프된 따옴표가 사라지는 이유" — 'O''Brien'→"OBrien" 손상버그.

REJECT(7개): json-formatter, json-viewer, json-minifier, xml-formatter, sql-formatter, json-to-csv(json-flattener와 중복), csv-viewer.

---

## health-calculators (8개 ACCEPT — 전부)

- [x] **bmi-calc** (guides/bmi-korean-vs-who-standard.html, 2026-08-19) — "BMI 25 vs 23, 왜 한국 기준이 세계 기준보다 낮은가" — WHO25이상 vs 한국비만학회23이상.
- [x] **calorie-calculator** (guides/calorie-calculator-bmr-adaptation-reality.html, 2026-08-19) — "칼로리 계산기 숫자가 실제 체중 변화와 다른 진짜 이유" — 10년마다 BMR 2~3%자연감소.
- [x] **macro-calculator** (guides/macro-calculator-fixed-protein-ratio.html, 2026-08-19) — "매크로 비율, 목표 바뀌어도 사실 안 바뀌는 것" — 단백질=체중×2g 고정, 실코드 확인된 실제 로직.
- [x] **water-intake** (guides/water-intake-hyponatremia-risk.html, 2026-08-19) — "갈증 느끼면 이미 늦었다? 물도 과하면 위험한 이유" — 저나트륨혈증(hyponatremia) 위험 병기.
- [x] **pace-calculator** (guides/marathon-pace-grade-adjusted-elevation.html, 2026-08-19) — "마라톤 페이스, 평지 기준으로만 계산하면 틀리는 이유" — 경사1%당 km당 약6초 느려짐(GAP).
- [x] **pregnancy-due-date** (guides/pregnancy-due-date-naegele-accuracy.html, 2026-08-19) — "출산 예정일에 정확히 태어나는 아기는 5%뿐인 이유" — 네겔레법칙은 LMP기준, 배란시차 오차.
- [x] **health-insurance-calc** (guides/health-insurance-april-settlement-reconciliation.html, 2026-08-20) — "건강보험료 4월에 왜 더 걷거나 돌려주나" — 전년추정 vs 확정보수 4월정산.
- [x] **national-pension** (guides/national-pension-early-late-claim-timing.html, 2026-08-20) — "국민연금 몇 살에 받아야 손해 안 볼까" — 조기수령 1년당6%감액 vs 연기수령 1년당7.2%증액.

REJECT: 없음. (health-calculators 8/8 완료)

---

## date-time-tools (8개 ACCEPT)

- [x] **date-calc** (guides/statute-of-limitations-debt-types-korea.html, 2026-08-19) — "소멸시효 계산의 함정, 채권 종류마다 왜 다른가" — 일반채권10년/상사5년/불법행위3년.
- [x] **time-calculator** (guides/night-shift-overtime-pay-law.html, 2026-08-19) — "야간수당 50%는 왜 밤 10시부터인가 — 근로기준법 제56조 완전정리" — 야간(22~06시) 별도50%가산.
- [x] **business-days-calculator** (guides/business-days-vs-calendar-days-contract.html, 2026-08-19) — "계약서 '영업일 5일 이내', 달력으로는 며칠인가" — 공휴일 끼면 달력 10일이상 벌어짐.
- [x] **pomodoro-timer** (guides/pomodoro-25-minute-origin-science.html, 2026-08-19) — "뽀모도로 25분, 실제 근거가 있는 숫자인가" — 프란체스코 치릴로 개인 경험칙, 과학적 최적값 아님.
- [x] **timestamp** (guides/unix-timestamp-2038-problem.html, 2026-08-19) — "유닉스 타임스탬프와 2038년 문제" — 32비트 signed integer 오버플로.
- [x] **timezone-converter** (guides/timezone-30-45-minute-offsets.html, 2026-08-20) — "30분·45분 단위 시간대가 존재하는 이유 — IST(UTC+5:30) 결정의 역사" — 인도UTC+5:30, 네팔UTC+5:45(단, 이 도구 프리셋엔 네팔 없음, 가이드에서 지적).
- [x] **working-days-calc** (guides/workers-day-not-legal-public-holiday.html, 2026-08-20) — "근로자의 날은 왜 법적으로 '공휴일'이 아닌가" — 근로기준법상 별도 유급휴일, 대체공휴일 미적용.
- [x] **time-zone-meeting-planner** (guides/timezone-meeting-midnight-crossing-merge.html, 2026-08-20) — "글로벌 회의 시간 추천, UTC 자정을 넘는 구간은 어떻게 합치나" — 자정걸치는 구간 병합알고리즘.

REJECT(3개): age-calculator(korean-age와 중복), countdown-timer(순수 UI), dday(순수 UI). (date-time-tools 8/8 완료)

---

## 부록: 금융 10개 상세 (수치 검증 완료, 2026-08-18)

### 1. 양도소득세 완전정리 — `capital-gains-tax.html` 연계

세율표: 1,400만원 이하 6%, ~8,800만원 24%, 5억~10억원 42%, 10억원 초과 45%. 1년 미만 보유 단기양도세율 70%. 조정대상지역 다주택자 중과세 2주택+20%p·3주택+30%p(2026년 5월 10일부터 재적용). 1세대1주택 비과세 2년 보유+거주, 양도가 12억원 이하. 검증 예시: 과세표준 7억원 → 세액 2억 5,806만원(7억×42%−3,594만원).

### 2. 육아휴직급여 2025 개편 총정리 — `parental-leave.html` 연계

구간별 지급률(2025년 개편): 1~3개월 100%(상한250만), 4~6개월 100%(상한200만), 7~12개월 80%(상한160만), 하한 70만원. 사후지급금 2025년 1월 폐지. 6+6제도 월별상한 250→250→300→350→400→450만원, 생후18개월내 신청. 경고: 주15시간 이상 취업시 급여 전액 반환.

### 3. 국민연금 직장 vs 지역가입자 — `national-pension-calculator.html` 연계

보험료율 9.5%(직장 각4.75%, 지역 전액). 2026년 기준소득월액 상한659만/하한41만원. 예시 월300만원: 직장142,500원 vs 지역285,000원. 조기수령 1개월당0.5%감액(최대5년), 연기연금 최대5년+연7.2%.

### 4. 퇴직금 계산법 + IRP 절세 — `severance.html` 연계

공식=(3개월임금÷3개월일수)×30×(근속일수÷365). 예시 월300만원·92일→일평균97,826원→30일분2,934,783원→3년880만원. IRP 이연시 55세이후 연금수령시 30~40% 감면.

### 5. 최저임금·주휴수당 완전정리 — `minimum-wage.html` 연계

2026년 10,320원(+2.9%). 2027년 확정10,700원(+3.7%, 2026-07-14표결). 209시간=2,156,880원. 주휴수당 주15시간이상 발생, 40시간미만 비례계산.

### 6. 실업급여 신청 A to Z — `unemployment.html` 연계

60%of평균임금, 2026-01-01이후 상한68,100원/일. 최대68,100×270일=18,387,000원. 경고: 12개월 신청기한 소멸.

### 7. 주택담보대출 한도 완전정리(LTV·DSR) — `ltv-calculator.html`+`dsr-calc.html` 연계

LTV 투기과열9억이하40%·초과20%, 조정50%·30%, 비규제70%. DSR 1금융권40%·2금융권50%. 2026 스트레스DSR 3단계 시행.

### 8. 상속세 vs 증여세 비교 — `inheritance-tax.html`+`gift-tax.html` 연계

세율공통 1억↓10%~30억초과50%. 상속 일괄공제5억, 배우자공제5~30억. 증여 10년합산 배우자6억/직계존속5000만/직계비속5000만. 세대생략할증30%.

### 9. 프리랜서 세금 완전정리 — `freelancer-tax.html` 연계

3.3%=소득세3%+지방세0.3%. 프리랜서 지역가입자 국민연금·건보 전액부담. 절세: 노란우산공제(최대500만+), IRP·연금저축(최대900만).

### 10. 건강보험료 직장 vs 지역가입자 — `health-insurance.html` 연계

직장 7.19%(각3.595%), 장기요양 건보료의13.14%. 지역가입자 (소득점수+재산점수)×208.4원(2026).
