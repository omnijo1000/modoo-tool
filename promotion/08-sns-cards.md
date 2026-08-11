# SNS 카드뉴스 (AI 마케팅 비서 워크플로우)

GPT/Gemini 제안서 검토 후 확정된 방식: **자동 발행 없음.** 매번 여기서 기획→카드 이미지→플랫폼별 원고까지 만들고, 실제 게시는 직접 함. 이미지는 `promotion/cards/{kr|global}/{툴slug}-{순번}/slide1~5.png`에 저장 (1080×1350, 인스타 캐러셀용) — 예: `kr/income-tax-01`. 순번은 같은 툴로 카드를 다시 만들 때(리라이트·다른 훅·다른 타입 등) 구분용, 새로 만들 때마다 -02, -03으로 증가.

**플랫폼별 게시 방식**:
- **Instagram**: 카드 이미지(캐러셀) 첨부. 캡션 내 링크 클릭 불가(2026 기준, Meta Verified 일부 극소수 예외)라 "프로필 링크에서 확인" 식 우회 문구 필수. **프로필 링크는 특정 툴 페이지가 아니라 modoohub.com 홈으로 고정** — 주제마다 매번 링크 바꾸면 예전 포스트 보는 사람이 엉뚱한 툴로 감. 캡션엔 "프로필 링크 접속 후 [툴이름] 검색"으로 표현(직접 연결되는 것처럼 쓰지 말 것). 링크트리 같은 외부 링크모음 서비스 안 씀 — 모두허브 자체 홈페이지에 검색/카테고리 이미 있어서 그거로 충분.
- **Threads**: 카드 이미지(캐러셀) 첨부 + **캡션에 직접 링크(`modoohub.com/{slug}.html`)도 반드시 포함**. Threads는 이미지·링크 동시 지원이라 인스타처럼 우회할 필요 없음 — 이미지로 훅 주고 바로 아래 링크로 클릭 유도.
- **X**: **Global 세트에만 게시. KR은 X 아예 안 씀** — 한국 X 이용자(약 751만)가 스레드(약 593만)보다 많아 죽은 플랫폼은 아니지만, Z세대가 자주 쓰는 SNS 순위에서 인스타·페이스북 다음 3위(8.4%)로 밀리고 유저층이 엔터/정치뉴스 쪽에 쏠려있어 재테크·계산기형 콘텐츠랑 안 맞음(효율 낮음). Global(영어) 세트는 계속 X 포함 — 텍스트 원고만 게시(이미지 첨부 안 함), X 피드 미리보기는 1:1~2:1 비율만 안 잘리고 4:5 카드는 약 16:9로 센터크롭되어 헤드라인/CTA가 잘릴 수 있어서 별도 이미지 안 만들고 텍스트+직접 링크로만 감.

## 발행 현황 (새 카드 만들 때마다 여기 한 줄 추가)

| 시장 | 주제 | 타입 | 원본 툴 | 카피 | 이미지 | Instagram | Threads | X |
|---|---|---|---|---|---|---|---|---|
| KR | 양도소득세 | A | capital-gains-tax.html | ✅ 확정 | ✅ kr/capital-gains-tax-01/slide1~5 | [ ] | [ ] | — |
| KR | 4대보험 | B | four-insurance.html | ✅ 확정 | ✅ kr/four-insurance-01/slide1~5 | [ ] | [ ] | — |
| KR | 육아휴직급여 | C | parental-leave.html | ✅ 확정 | ✅ kr/parental-leave-01/slide1~5 | [ ] | [ ] | — |
| KR | 국민연금 | D | national-pension-calculator.html | ✅ 확정 | ✅ kr/national-pension-calculator-01/slide1~5 | [ ] | [ ] | — |
| KR | 칼로리 계산기 | E | calorie-calculator.html | ✅ 확정 | ✅ kr/calorie-calculator-01/slide1~5 | [ ] | [ ] | — |
| Global | Inflation impact | A | inflation-calculator.html | ✅ 확정 | ✅ global/inflation-calculator-01/slide1~5 | [ ] | [ ] | [ ] |
| Global | VAT rate comparison | B | vat-calculator-global.html | ✅ 확정 | ✅ global/vat-calculator-global-01/slide1~5 | [ ] | [ ] | [ ] |
| Global | Loan payoff savings | C | loan-payoff-calculator.html | ✅ 확정 | ✅ global/loan-payoff-calculator-01/slide1~5 | [ ] | [ ] | [ ] |
| Global | Timezone (Seoul vs NY) | D | timezone-converter.html | ✅ 확정 | ✅ global/timezone-converter-01/slide1~5 | [ ] | [ ] | [ ] |
| Global | Sleep cycle | E | sleep-calculator.html | ✅ 확정 | ✅ global/sleep-calculator-01/slide1~5 | [ ] | [ ] | [ ] |

KR용 계정과 Global(영어)용 계정은 분리 운영 — KR 세트는 한국어 계정, Global 세트는 영어 계정에 게시.

**이 표는 아직 게시 안 끝난 것만 남김.** 이미 KR/Global 각 5종(1차 배치)은 전부 게시 완료돼서 표에서 지우고 `09-sns-published.md`로 이동함 — 게시 이력·과거 캡션 찾을 땐 그 파일 볼 것. 새로 게시 완료되면: 해당 칸 `[x] 날짜`로 바꾸고, 그 항목의 상세 섹션(캡션·Alt Text)을 09번 파일로 옮긴 뒤 이 표에서도 행 삭제.

## 디자인 시스템 (2026-08-07 확정, 매번 재사용)

웹클로드 Artifacts 디자인 서비스로 뽑은 시안을 기반으로 5가지 레이아웃 타입 확정. 정적 프로덕션 HTML은 `promotion/template/typeA.html` ~ `typeE.html`에 있음 — 새 주제 나올 때마다 이 5개 파일 중 맞는 타입 하나 복사해서 텍스트/숫자만 갈아끼우면 됨(웹클로드 재방문 불필요).

- **캔버스**: 1080×1350(4:5), 프리뷰 432×540(0.4배 스케일)
- **폰트**: Pretendard (jsdelivr CDN `orioncactus/pretendard`) — 없으면 Noto Sans KR로 폴백
- **배경**: 다크 타입(A/B/C/D)은 `#0B0F19`~`#0F0B10` 딥 네이비 + 미세 모눈 그리드(5% 불투명도) + 비대칭 라디얼 글로우, Type E만 라이트(`#F8FAFC`)
- **글래스 카드**: `background:rgba(255,255,255,0.04)` + `backdrop-filter:blur(16px)` + `border:1px solid rgba(255,255,255,0.1)`
- **강조색**: 핵심 숫자 = 골드/앰버 그라데이션(`#fcd34d`→`#f59e0b`), 브랜드 워드마크 HUB만 amber `#fbbf24`
- **인터랙션**: 하단 이전/다음 버튼 + `01/05` 인디케이터 + 도트(활성 20px pill/비활성 6px), 순수 JS로 슬라이드 전환(React 아님 — 이 사이트는 정적 HTML이라 프로덕션은 항상 plain HTML+JS로 변환해서 씀)

### 타입별 매핑 (용도별 고정, 새 주제 나오면 이 표에서 타입 선택)
| Type | 용도 | 배경/포인트 | KR 주제 | Global 주제 |
|---|---|---|---|---|
| A. 다크 글래스 수치 강조형 | 큰 돈 수치가 핵심(환급금·세금 등) | 네이비 + 골드 | income-tax.html (종합소득세) | compound-interest.html |
| B. 영수증/명세서 UI형 | 상세 내역(실수령액·공제 등) | 네이비 + 골드 | salary.html (연봉 실수령액) | loan-calculator-en.html |
| C. 딥 레드 경고형 | 실수·소멸·마감 임박 | 레드 틴트 + 골드 | annual-leave.html (연차) | password-generator.html |
| D. 좌우 비교/VS형 | 두 옵션 비교 | 네이비(파랑↔골드 분할) | loan-calc.html (원리금균등 vs 원금균등) | investment-return-calculator.html (Lump Sum vs DCA) |
| E. 클린 라이트형 | 건강/날짜 등 피드 환기용 | 라이트 + 골드 포인트 | bmi-calc.html (BMI) | bmi-calc.html (BMI, 영문 콘텐츠) |

Global 세트 템플릿 파일: `promotion/template/global-compound-interest.html` ~ `global-bmi.html` (typeA~E.html을 복사해 영문 콘텐츠로 교체한 것 — 구조는 100% 동일).

- **만드는 법(확정, 2026-08-07 검증됨)**: 해당 타입 HTML 열어서 5슬라이드 텍스트/숫자 교체 → 슬라이드마다 임시 HTML 사본 만들어서 (1) `<head>`에 `#exportNav{display:none}` + `#exportCard{position:absolute;top:0;left:0;transform:scale(2.5);transform-origin:top left}` 오버라이드 주입(432×540 프리뷰 카드를 1080×1350 풀캔버스로 확대, 네비 버튼 숨김), (2) `</body>` 직전에 `<script>current=N;render();</script>` 주입해서 실제 JS 상태(인디케이터·도트 포함)를 슬라이드 N으로 강제 전환 → 크롬 헤드리스로 `--window-size=1080,1350 --screenshot=slideN.png`(N=1~5) 캡처 → 임시 파일 삭제. typeA~E.html 전부 카드 div에 `id="exportCard"`, 네비 div에 `id="exportNav"`가 이미 붙어있어서 이 방식 바로 재사용 가능. (CSS만으로 슬라이드 강제 표시하면 `render()`가 안 돌아서 01/05 인디케이터가 항상 첫 슬라이드 값으로 고정되는 버그 있었음 — 반드시 JS로 `current` 값 실제로 바꿀 것.)
- **숫자·팩트는 반드시 실제 계산기 코드/공식으로 검산하거나(node로 재현) 실제 법 조항으로 검증할 것** — 이 세션에서 typeC(연차수당 소멸시효 1년→3년 오류), typeD(원리금균등/원금균등 총이자 차액 산수 안 맞던 것) 둘 다 실제 오류로 잡혔음. loan-calc.html처럼 이미 자체 FAQ에 검증된 수치가 있으면 그거 재사용.

## 카피라이팅 원칙 (2026-08-07 확정, 매번 참고)

카드뉴스 카피 쓸 때마다 아래 원칙 그대로 적용. (출처: 사용자가 지정한 "대한민국 최정상 바이럴 카피라이터 & 퍼포먼스 마케터" 시스템 프롬프트)

**목표**: 모바일 피드에서 스크롤을 멈추게 만들고 저장률(Save Rate)·클릭률(CTR)을 최대화하는 고자극 퍼포먼스 카피. 얌전하고 정직한 설명문 지양.

**톤앤매너**:
- 다정하거나 평범한 질문형 문장 금지 (예: "~하신 적 있으신가요?", "~알아볼까요?" 금지)
- 직관적이고 단정적인 문장 사용 (예: "안 찾아가면 소멸됩니다", "국세청이 안 알려준 사실")
- 불필요한 서론·수식어 배제, 핵심 수치와 키워드 위주 단문 구성

**슬라이드별 심리 구조 (5슬라이드 고정 플로우)**:
1. **Hooking**: [거대 수치] + [손실회피] + [긴급성] 조합
2. **Targeting**: "어? 내 얘기인데?" 자기관련성 자가진단 체크리스트
3. **Shock & Law**: 구체적 불이익 수치 + 법적 근거 명시
4. **Save Trigger**: 나중에 다시 꺼내보고 싶은 구간별 요약 치트시트 표
5. **Frictionless CTA**: "가입 불필요", "주민번호 없이 30초", "1초 만에 확인" 등 귀찮음·불안 제거형 행동 유도

**수치·카피 강조 규칙**:
- 중요 숫자는 단위 명확히 + 대형 볼드 (예: "45만원", "13.2%", "5년")
- 행동 유도 문구엔 항상 화살표(→) + 시각적 뱃지 UI 결합

**단, 위 원칙과 별개로 숫자·법조항 자체는 항상 실제 검산/검증할 것** — "자극적으로 쓰는 것"과 "틀린 사실을 쓰는 것"은 다른 문제. 위 디자인 시스템 섹션의 검산 원칙과 동시에 적용.

## 완료(이미지·카피): 06~10. KR 세트 2차 배치 (2026-08-11, 게시 대기)

typeA~E.html 복사해서 만든 `kr-capital-gains-tax.html`/`kr-four-insurance.html`/`kr-parental-leave.html`/`kr-national-pension.html`/`kr-calorie.html`을 실제 사이트 슬러그 디렉토리(`capital-gains-tax-01` 등)로 export. 숫자는 전부 해당 계산기 HTML의 실제 요율/공식(grep+node로 재검산) 또는 실제 법조항(2025년 육아휴직 개편, 근로기준법 등) 기반.

### 06. 양도소득세 — `kr-capital-gains-tax.html` (Type A)
**소스**: `capital-gains-tax.html`. 세율표·중과세율(조정대상지역 2주택 +20%p·3주택 +30%p, 2026-05-10 재적용)·과세표준 7억원 실제 예시(2억 5,806만원 = 7억×42%-3,594만원) 전부 사이트 FAQ 원문 그대로 재사용.

**이미지**: `promotion/cards/kr/capital-gains-tax-01/slide1~5.png`

**Instagram**
```
1년 안에 팔면 양도차익의 70%가 세금으로 나갑니다.

1년 미만 보유 시 단기양도세율 70%, 2년 이상 보유하면 최대 45%까지 낮아져요. 조정대상지역 다주택자는 여기에 +20~30%p 중과세율까지 추가됩니다(2026년 5월 10일부터 재적용).

과세표준 7억원 기준 세액은 약 2억 5,806만원(7억×42%-3,594만원) — 보유기간 하나로 세금이 완전히 달라져요.

📌 매도 전에 저장해두세요!
👉 프로필 링크 접속 후 '양도소득세 계산기' 검색해서 내 양도세 확인해보세요.

#modoohub #모두허브 #양도소득세 #양도세계산기 #부동산세금 #다주택자 #매도전필수
```

**Threads**
```
1년 안에 팔면 양도차익의 70%가 세금으로 나갑니다. 2년 이상 보유하면 최대 45%까지 낮아짐.

조정대상지역 2주택 +20%p, 3주택 이상 +30%p 중과세율 2026년 5월 10일부터 재적용 중. 과세표준 7억원 기준 세액 약 2억 5,806만원.

modoohub.com/capital-gains-tax.html
```

**대체 텍스트(Alt Text)**:
1. 텍스트 카드: 1년 안에 팔면. 70%. 양도차익의 70%가 세금으로 나갑니다. 1년 미만 보유 시 단기양도세율, 2년 이상이면 최대 45%까지 낮아집니다.
2. 체크리스트: 나도 해당된다, 자가진단 체크리스트 — 1년 안에 팔 계획, 조정대상지역 다주택자, 1세대1주택 비과세 요건 모름.
3. 경고 카드: 다주택자는 세금이 더블로. 조정대상지역 2주택 +20%p, 3주택 이상 +30%p 중과세율이 2026년 5월 10일부터 재적용.
4. 표: 과세표준 구간별 양도세율 — 1,400만원 이하 6%, ~8,800만원 24%, 5억~10억원 42%, 10억원 초과 45%.
5. 행동 유도 카드: 내 양도소득세, 1초 만에 계산하기. 가입 불필요, 30초 소요.

**상태**: [ ] 게시 대기.

### 07. 4대보험 — `kr-four-insurance.html` (Type B)
**소스**: `four-insurance.html`. 월급 300만원 기준 근로자 부담 합계 291,522원은 사이트 SEO 본문에 명시된 실제 검증값과 정확히 일치(node 재계산으로도 확인: 142,500+107,850+14,171+27,000=291,521, 사이트 반올림값 291,522와 오차 1원).

**이미지**: `promotion/cards/kr/four-insurance-01/slide1~5.png`

**Instagram**
```
4대보험만으로 월급 300만원 기준 매달 291,522원이 빠집니다.

국민연금 4.75%(142,500원), 건강보험 3.595%(107,850원), 장기요양보험(14,171원), 고용보험 0.9%(27,000원) — 4개가 각각 떼입니다.

2026년 국민연금 요율이 9%→9.5%로 인상됐고, 최종 목표는 13%까지 단계적 인상이에요.

📌 연봉협상·이직 전에 저장해두세요!
👉 프로필 링크 접속 후 '4대보험 계산기' 검색해서 내 4대보험료 확인해보세요.

#modoohub #모두허브 #4대보험 #4대보험계산기 #국민연금 #건강보험료 #직장인필수
```

**Threads**
```
월급 300만원 기준 4대보험만으로 매달 291,522원 빠짐.

국민연금 4.75%(14.25만원), 건강보험 3.595%(10.785만원)+장기요양(1.4171만원), 고용보험 0.9%(2.7만원). 2026년 국민연금 요율 9%→9.5% 인상, 최종 목표 13%.

modoohub.com/four-insurance.html
```

**대체 텍스트(Alt Text)**:
1. 텍스트 카드: 월급 300만원 기준. 291,522원. 4대보험만으로 매달 이만큼 빠집니다.
2. 명세서 카드: 월급 300만원 4대보험 명세서 — 국민연금 142,500원, 건강보험 107,850원, 장기요양보험 14,171원, 고용보험 27,000원, 합계 291,522원.
3. 표: 2026년 보험료율 변화 — 국민연금 4.75%, 건강보험 3.595%, 장기요양보험 건보료의 13.14%, 고용보험 0.9%.
4. 체크리스트: 사업주는 더 많이 부담합니다 — 산재보험(업종별 평균 1.47%), 고용안정·직업능력개발사업분(0.25~0.65%p), 월 300만원 기준 사업주 추가 부담 34만~36만원.
5. 행동 유도 카드: 내 4대보험료, 1초 만에 계산하기. 가입 불필요, 30초 소요.

**상태**: [ ] 게시 대기.

### 08. 육아휴직급여 — `kr-parental-leave.html` (Type C)
**소스**: `parental-leave.html`. 2025년 개편 구간별 지급률(1~3개월 100%/250만원, 4~6개월 100%/200만원, 7~12개월 80%/160만원, 하한 70만원), 사후지급금 폐지(2025-01), 주 15시간 이상 취업 시 급여 반환 규정 전부 사이트 FAQ 원문 기준.

**이미지**: `promotion/cards/kr/parental-leave-01/slide1~5.png`

**Instagram**
```
육아휴직 중 주 15시간만 일해도 급여 전액 반환입니다.

아르바이트도 예외 없어요. 프리랜서·자영업 겸업도 동일하게 적용되고, 적발되면 받은 돈을 그대로 토해내야 합니다.

2025년 개편으로 1~3개월 통상임금 100%(상한 250만원), 4~6개월도 100%(상한 200만원), 7~12개월 80%(상한 160만원) — 사후지급금 제도는 폐지돼서 매달 전액 지급돼요.

📌 신청 전에 저장해두세요!
👉 프로필 링크 접속 후 '육아휴직급여 계산기' 검색해서 내 육아휴직급여 확인해보세요.

#modoohub #모두허브 #육아휴직급여 #육아휴직계산기 #6+6부모육아휴직제 #육아맘 #워킹맘
```

**Threads**
```
육아휴직 중 주 15시간 이상 일하면 급여 전액 반환. 프리랜서·자영업 겸업도 동일 적용.

2025년 개편: 1~3개월 100%(상한 250만원), 4~6개월 100%(상한 200만원), 7~12개월 80%(상한 160만원), 하한 70만원. 사후지급금 폐지, 매달 전액 지급.

modoohub.com/parental-leave.html
```

**대체 텍스트(Alt Text)**:
1. 경고 카드: 육아휴직 중 경고. 주 15시간만 일해도 급여 전액 반환입니다. 아르바이트도 예외 없습니다.
2. 경고 카드: 이런 경우엔 급여가 끊깁니다. 휴직 중 주 15시간 이상 취업 확인되면 해당 기간 급여 전액 반환.
3. 체크리스트: 받기 전에 꼭 확인할 3가지 — 고용보험 가입 180일 미만, 자녀 나이 초과, 6+6 특례 신청 시기 놓침.
4. 표: 구간별 지급률(2025년 개편) — 1~3개월 100%·250만원, 4~6개월 100%·200만원, 7~12개월 80%·160만원, 하한액 70만원.
5. 행동 유도 카드: 내 육아휴직급여, 1초 만에 계산하기. 가입 불필요, 30초 소요.

**상태**: [ ] 게시 대기.

### 09. 국민연금 — `kr-national-pension.html` (Type D)
**소스**: `national-pension-calculator.html`. 직장가입자(4.75% 본인 부담) vs 지역가입자(9.5% 전액 본인 부담) 비교, 월소득 300만원 기준 142,500원/285,000원, 2026년 기준소득월액 상한 659만원·하한 41만원 전부 사이트 FAQ·주석(`// 2026년 7월 기준`) 원문 기준.

**이미지**: `promotion/cards/kr/national-pension-calculator-01/slide1~5.png`

**Instagram**
```
직장가입자 vs 지역가입자, 같은 소득이어도 국민연금 부담액이 2배 다릅니다.

직장가입자는 4.75%만 본인 부담(회사가 나머지 4.75% 분담), 지역가입자는 9.5% 전액을 혼자 부담해요. 월 소득 300만원 기준으로 계산하면 직장가입자 142,500원, 지역가입자 285,000원 — 무려 142,500원 차이입니다.

2026년 기준 기준소득월액 상한은 659만원, 하한은 41만원이에요.

📌 이직·프리랜서 전환 전에 저장해두세요!
👉 프로필 링크 접속 후 '국민연금 계산기' 검색해서 내 국민연금 보험료 확인해보세요.

#modoohub #모두허브 #국민연금 #국민연금계산기 #지역가입자 #직장가입자 #프리랜서
```

**Threads**
```
직장가입자 vs 지역가입자, 국민연금 부담액 2배 차이남.

월소득 300만원 기준: 직장가입자 142,500원(4.75%만 본인 부담), 지역가입자 285,000원(9.5% 전액 본인 부담). 2026년 기준소득월액 상한 659만원, 하한 41만원.

modoohub.com/national-pension-calculator.html
```

**대체 텍스트(Alt Text)**:
1. 비교 카드: 직장가입자 vs 지역가입자, 같은 소득이어도 부담액이 2배 다릅니다.
2. 좌우 비교: A. 직장가입자 — 4.75% 본인 부담, 회사가 나머지 분담. B. 지역가입자 — 9.5% 전액 본인, 사업주가 없어 혼자 다 부담.
3. 텍스트 카드: 월 소득 300만원 기준 142,500원 — 가입 유형만 바꿔도 월 부담액이 이만큼 차이납니다. 직장가입자 142,500원, 지역가입자 285,000원.
4. 체크리스트: 2026년 기준 소득 상·하한 — 기준소득월액 상한 659만원, 하한 41만원.
5. 행동 유도 카드: 내 국민연금 보험료, 1초 만에 비교하기. 가입 불필요, 30초 소요.

**상태**: [ ] 게시 대기.

### 10. 칼로리 계산기 — `kr-calorie.html` (Type E)
**소스**: `calorie-calculator.html`. Mifflin-St Jeor 공식(남성 BMR=10×체중+6.25×키-5×나이+5), 활동계수(좌식 1.2/가벼운 1.375/보통 1.55/활발 1.725) 사이트 코드 그대로. 예시값(30세 남성·175cm·70kg·보통 활동 → BMR 1,649kcal, TDEE 2,556kcal)은 node로 직접 재계산해 검증.

**이미지**: `promotion/cards/kr/calorie-calculator-01/slide1~5.png`

**Instagram**
```
내 하루 필요 칼로리, 3초 만에 확인하세요. 나이·체중·활동량만 입력하면 끝이에요.

Mifflin-St Jeor 공식으로 기초대사량(BMR)을 구한 뒤 활동계수(좌식 1.2~활발 1.725)를 곱해서 하루 총 소비 칼로리(TDEE)를 계산해요. 30세 남성·175cm·70kg·보통 활동 기준으로는 BMR 1,649kcal, TDEE 2,556kcal 정도 나옵니다.

체중 감량은 TDEE-500kcal(주 0.5kg 감량), 유지는 TDEE 그대로, 증량은 TDEE+500kcal이 기준이에요.

👉 프로필 링크 접속 후 '칼로리 계산기' 검색해서 내 칼로리 확인해보세요.

#modoohub #모두허브 #칼로리계산기 #TDEE #기초대사량 #다이어트 #식단관리
```

**Threads**
```
내 하루 필요 칼로리 3초 체크. 나이·체중·활동량만 입력하면 끝.

Mifflin-St Jeor 공식으로 BMR 구한 뒤 활동계수(1.2~1.725) 곱해 TDEE 계산. 30세 남성·175cm·70kg·보통 활동 기준 BMR 1,649kcal, TDEE 2,556kcal. 감량은 TDEE-500kcal, 증량은 TDEE+500kcal.

modoohub.com/calorie-calculator.html
```

**대체 텍스트(Alt Text)**:
1. 텍스트 카드: 3초 건강 체크. 내 하루 필요 칼로리, 3초 만에 확인하세요.
2. 결과 시뮬레이션: 기초대사량(BMR) 1,649kcal, TDEE(총 소비량) 2,556kcal. 30세 남성·175cm·70kg·보통 활동 기준 예시.
3. 표: 활동 수준별 계수표 — 좌식 생활 1.2, 가벼운 활동 1.375, 보통 활동 1.55, 활발한 활동 1.725.
4. 가이드: 목표별 섭취 칼로리 가이드 — 체중 감량 TDEE-500kcal, 체중 유지 TDEE 그대로, 체중 증량 TDEE+500kcal.
5. 행동 유도 카드: 내 하루 필요 칼로리, 3초 만에 계산하기. 가입 불필요, 3초 소요.

**상태**: [ ] 게시 대기.

---

## 완료(이미지·카피): 06~10. Global 세트 2차 배치 (2026-08-11, 게시 대기)

`global-inflation-calculator.html`/`global-vat-calculator.html`/`global-loan-payoff-calculator.html`/`global-timezone-converter.html`/`global-sleep-calculator.html`. 숫자는 각 계산기 HTML의 실제 FAQ 원문/기본값 또는 node 재계산(대출 상환 시뮬레이션) 기준. X는 Global 정책상 텍스트 전용(이미지 미첨부) — 별도 원고 작성.

### 06. Inflation Calculator — `global-inflation-calculator.html` (Type A)
**소스**: `inflation-calculator.html`. $1,000 at 3% over 10 years = $1,343.92(미래가치 공식) → 역산해 현재가치 $744 표기. US 9%(2022, highest since 1981), Argentina 211%(2023), Turkey 80%(2022), 국가별 평균 CPI(Japan 2.0%/EU 2.3%/UK 2.8%/US 3.0%/India 5.5%) 전부 사이트 FAQ·`setCountry()` 프리셋 원문.

**이미지**: `promotion/cards/global/inflation-calculator-01/slide1~5.png`

**Instagram**
```
Your cash is losing value while it just sits there.

At the long-run US average of 3% inflation, $1,000 today buys only $744 of goods in 10 years. And it's not always a slow 2–3% — US inflation hit 9% in 2022 (highest since 1981), Argentina saw 211% in 2023, Turkey hit 80% in 2022.

Average CPI varies a lot by country: Japan 2.0%, EU 2.3%, UK 2.8%, US 3.0%, India 5.5%.

👉 Link in bio → search "Inflation Calculator" to see your real purchasing power.

#modoohub #inflationcalculator #personalfinance #moneytips #savingsmoney #financetips
```

**Threads**
```
Your cash is losing value while it just sits there. At 3% inflation, $1,000 today buys only $744 in 10 years.

US inflation hit 9% in 2022 (highest since 1981). Argentina saw 211% in 2023, Turkey 80% in 2022. Average CPI: Japan 2.0%, EU 2.3%, UK 2.8%, US 3.0%, India 5.5%.

modoohub.com/inflation-calculator.html
```

**X (텍스트 전용, 이미지 미첨부)**
```
Your cash is losing value while it just sits there. At 3% inflation, $1,000 today buys only $744 in 10 years. US inflation hit 9% in 2022 — the highest since 1981.

Calculate your real purchasing power free: modoohub.com/inflation-calculator.html
```

**대체 텍스트(Alt Text)**:
1. Text card: 3% inflation, every year. $1,000 → $744. Your cash is losing value while it just sits there.
2. Checklist: Habits that quietly drain your savings — cash in a 0% checking account, assuming saving protects value on its own, ignoring real inflation-adjusted return.
3. Warning card: Inflation isn't always a slow 2–3%. US inflation hit 9% in 2022, Argentina 211% in 2023, Turkey 80% in 2022.
4. Table: Average CPI by country — Japan 2.0%, EU 2.3%, UK 2.8%, US 3.0%, India 5.5%.
5. CTA card: See your real purchasing power in 10 seconds. Calculate Inflation Impact.

**상태**: [ ] 게시 대기.

### 07. VAT Calculator — `global-vat-calculator.html` (Type B)
**소스**: `vat-calculator-global.html`. Hungary 27%(EU 최고)/Luxembourg 17%(EU 최저), UK 20%, Australia GST 10%, Canada federal GST 5%, EU 최저 표준세율 15%, €500·19% 독일 VAT 예시(€595.00) 전부 사이트 FAQ/seoHtml 원문.

**⚠️ 제미나이 크로스체크로 발견한 사이트 원본 오류(2026-08-11)**: `vat-calculator-global.html` 자체 FAQ(ko/en/zh/ja 4개 언어 전부)에 관광객 면세 환급 최소구매액 예시로 "UK £30/store/day"가 들어있는데, 영국은 브렉시트 이후 2021-01-01부로 관광객 대상 VAT Retail Export Scheme(면세 쇼핑 제도)을 폐지했고 2026년 현재도 재도입 안 됨(웹서치로 확인, 출처: [vatcalc.dev](https://vatcalc.dev/uk-tourist-vat-refund/), [visitlondon.com](https://www.visitlondon.com/traveller-information/essential-information/money/tax-free)) — **`vat-calculator-global.html` 원본 페이지 FAQ 자체를 별도로 수정 필요**(이번 세션 범위 밖, SNS 카드만 수정함). 카드뉴스 쪽은 UK 예시를 Italy €70.01/store/day(2024년 인하 후 2026년까지 유지 확인)로 교체 완료.

**이미지**: `promotion/cards/global/vat-calculator-global-01/slide1~5.png`

**Instagram**
```
Hungary charges 27% VAT. Luxembourg charges just 17%.

Selling across Europe means that 10-point gap can wreck your pricing math. On €500 goods at Germany's 19% VAT, the gross price comes out to €595.00.

Standard rates by region: Canada (federal GST) 5%, Australia (GST) 10%, UK 20%, Hungary (EU max) 27% — and the EU sets a 15% minimum standard rate.

👉 Link in bio → search "VAT Calculator" to add or remove VAT instantly.

#modoohub #vatcalculator #ecommerce #crossborderselling #smallbusiness #europeantax
```

**Threads**
```
Hungary charges 27% VAT, Luxembourg just 17%. That gap wrecks cross-border pricing math.

€500 goods at Germany's 19% VAT = €595 gross. Rates by region: Canada 5%, Australia 10%, UK 20%, Hungary 27% (EU max). EU minimum standard rate is 15%.

modoohub.com/vat-calculator-global.html
```

**X (텍스트 전용, 이미지 미첨부)**
```
Hungary charges 27% VAT. Luxembourg charges just 17%. If you sell across Europe, that gap can wreck your pricing math.

Add or remove VAT for 20+ countries free: modoohub.com/vat-calculator-global.html
```

**대체 텍스트(Alt Text)**:
1. Text card: Not all rates are equal. 27%. Hungary charges 27% VAT, Luxembourg charges just 17%.
2. Statement card: €500 goods, 19% German VAT — net price €500.00, VAT (19%) +€95.00, gross price €595.00.
3. Table: Standard VAT/GST rate by region — Canada (federal GST) 5%, Australia (GST) 10%, UK (standard) 20%, Hungary (EU max) 27%.
4. Checklist: Mistakes that cost cross-border sellers — quoting VAT-inclusive as VAT-exclusive, not reclaiming input VAT, missing tourist refund minimums.
5. CTA card: Add or remove VAT in 10 seconds. Calculate VAT.

**상태**: [ ] 게시 대기.

### 08. Loan Payoff Calculator — `global-loan-payoff-calculator.html` (Type C)
**소스**: `loan-payoff-calculator.html`의 실제 상환 계산 로직(월 이자=잔액×연이율/12, 원금=납입금-이자)을 node로 재현해 직접 검산. $300,000·6.5%·30년 표준 상환금 $1,896.20/월 기준 — 기본 납입 시 총이자 $382,633, 여기에 $200/월 추가 납입 시 총이자 $279,185(→ $103,449 절감), 상환기간 360개월→277개월(6.9년 단축).

**이미지**: `promotion/cards/global/loan-payoff-calculator-01/slide1~5.png`

**Instagram**
```
Your bank never tells you this $200/month trick saves six figures.

On a $300,000 loan at 6.5% over 30 years, you'll pay $382,633 in interest — more than the loan itself. But add just $200/month extra, and you save $103,449 in interest and pay it off 6.9 years sooner (23.1 years instead of 30).

Extra payments hit principal directly, which lowers interest every month after — a compounding effect that runs in your favor.

👉 Link in bio → search "Loan Payoff Calculator" to see your own savings.

#modoohub #loanpayoff #debtfreejourney #personalfinance #mortgagetips #payoffdebt
```

**Threads**
```
Your bank never tells you this $200/month trick saves six figures.

$300,000 loan at 6.5%: minimum payments = $382,633 in interest over 30 years. Add $200/month extra = save $103,449 in interest, payoff in 23.1 years instead of 30.

modoohub.com/loan-payoff-calculator.html
```

**X (텍스트 전용, 이미지 미첨부)**
```
Your bank never tells you this $200/month trick saves six figures. On a $300K loan at 6.5%, one extra $200/month payment saves $103,449 in interest and cuts 6.9 years off your loan.

See your own numbers free: modoohub.com/loan-payoff-calculator.html
```

**대체 텍스트(Alt Text)**:
1. Warning card: $200/month extra. Your bank never tells you this $200/month trick saves six figures.
2. Warning card: Minimum payments maximize your interest. $300,000 loan at 6.5% over 30 years = $382,633 in interest.
3. Text card: $300,000 · 6.5% · 30-year loan. $103,449 saved. Payoff time saved 6.9 years, new payoff term 23.1 years.
4. Checklist: Why extra payments work so well — extra payments hit principal directly, lower balance means lower interest every month after, monthly beats an annual lump sum.
5. CTA card: See your own savings in 10 seconds. Calculate My Payoff.

**상태**: [ ] 게시 대기.

### 09. Timezone Converter — `global-timezone-converter.html` (Type D)
**소스**: `timezone-converter.html`. Seoul(KST, UTC+9 연중 고정) vs New York(EDT, UTC-4, 서머타임 시 EST UTC-5) 시차, India UTC+5:30·Nepal UTC+5:45 비표준 오프셋 전부 사이트 FAQ 원문. 9:00 AM Seoul → 8:00 PM 전날 New York 변환은 UTC+9 대비 UTC-4(서머타임 기준)가 13시간 차이라는 사이트 명시값으로 직접 계산. **제미나이 크로스체크로 발견·수정(2026-08-11)**: NY가 서머타임 미적용 시(EST, UTC-5)엔 14시간 차이로 벌어지므로, 슬라이드1 헤드라인/캡션의 "13 hours apart" 고정 표기를 "13–14 hours apart"로 정정.

**이미지**: `promotion/cards/global/timezone-converter-01/slide1~5.png`

**Instagram**
```
One call, two clocks 13–14 hours apart — Seoul vs New York.

Seoul (KST) stays fixed at UTC+9 all year, no daylight saving. New York (EDT) shifts to UTC-4 in summer, EST (UTC-5) in winter. A 9:00 AM Seoul meeting is 8:00 PM the previous day in New York.

Tips: agree on a time in UTC first, double-check DST transition weeks, and watch for non-standard offsets like India (UTC+5:30) and Nepal (UTC+5:45).

👉 Link in bio → search "Timezone Converter" to convert any time zone instantly.

#modoohub #timezoneconverter #remotework #globalteam #digitalnomad #worldclock
```

**Threads**
```
One call, two clocks 13–14 hours apart. Seoul (KST, UTC+9 fixed) vs New York (EDT, UTC-4, shifts with DST).

9:00 AM Seoul = 8:00 PM the previous day in New York. Tip: agree in UTC first, then convert to local time. Watch DST transition weeks and non-standard offsets (India UTC+5:30).

modoohub.com/timezone-converter.html
```

**X (텍스트 전용, 이미지 미첨부)**
```
Seoul and New York run 13–14 hours apart. A 9:00 AM Seoul meeting is 8:00 PM the previous day in NY. Someone's always working off-hours.

Convert any time zone free, DST handled automatically: modoohub.com/timezone-converter.html
```

**대체 텍스트(Alt Text)**:
1. Text card: Seoul vs New York. One call, two clocks 13–14 hours apart.
2. VS comparison: A. Seoul (KST) — UTC+9 fixed, no daylight saving. B. New York (EDT) — UTC-4, shifts to EST in winter.
3. Text card: Seoul 9:00 AM meeting = 8:00 PM (previous day) in New York.
4. Checklist: Tips for scheduling global meetings — agree on a time in UTC first, double-check DST transition weeks, watch for non-standard offsets (India UTC+5:30, Nepal UTC+5:45).
5. CTA card: Convert any time zone in seconds. Convert Time Zones.

**상태**: [ ] 게시 대기.

### 10. Sleep Calculator — `global-sleep-calculator.html` (Type E)
**소스**: `sleep-calculator.html`의 실제 로직(90분 주기, 잠드는 데 평균 15분 소요, cycles=[3,4,5,6])을 기준으로 기상 7:00 AM 예시를 직접 역산: 6주기(9시간15분)→21:45, 5주기(7시간45분)→23:15, 4주기(6시간15분)→00:45. 연령별 권장 수면시간은 National Sleep Foundation 기준(사이트 FAQ 원문).

**이미지**: `promotion/cards/global/sleep-calculator-01/slide1~5.png` (slide4는 라벨/설명 텍스트가 붙어보이는 레이아웃 버그 1차 발견 → `flex-direction:column` 스택 구조로 수정 후 재생성 완료)

**Instagram**
```
Waking up mid-cycle is why you feel groggy.

Sleep runs in ~90-minute cycles. Waking up at 7:00 AM? Go to bed at 9:45 PM (6 cycles), 11:15 PM (5 cycles), or 12:45 AM (4 cycles) — based on a 15-minute average time to fall asleep.

Recommended sleep: adults 7–9 hrs, teens 8–10 hrs, school age 9–12 hrs (National Sleep Foundation). Blue light suppresses melatonin, power naps of 10–20 min are the sweet spot, and weekend catch-up only partially repays sleep debt.

👉 Link in bio → search "Sleep Calculator" to find your ideal bedtime.

#modoohub #sleepcalculator #sleephygiene #healthylifestyle #wellnesstips #betterrest
```

**Threads**
```
Waking up mid-cycle is why you feel groggy. Sleep runs in ~90-min cycles.

Waking up at 7:00 AM? Bedtime options: 9:45 PM (6 cycles), 11:15 PM (5 cycles), 12:45 AM (4 cycles). Adults need 7–9 hrs (National Sleep Foundation).

modoohub.com/sleep-calculator.html
```

**X (텍스트 전용, 이미지 미첨부)**
```
Waking up mid-cycle is why you feel groggy. Sleep runs in ~90-min cycles — wake at the end of one, not the middle.

Find your ideal bedtime free: modoohub.com/sleep-calculator.html
```

**대체 텍스트(Alt Text)**:
1. Text card: The 90-minute rule. Waking up mid-cycle is why you feel groggy.
2. Result simulation: Waking up at 7:00 AM — here's when to sleep. 9:45 PM (6 cycles, 9h15m), 11:15 PM (5 cycles, 7h45m), 12:45 AM (4 cycles, 6h15m).
3. Table: Recommended sleep by age group — school age (6–12) 9–12 hrs, teens 8–10 hrs, adults (18–64) 7–9 hrs.
4. Guide: Small habits, better sleep — blue light suppresses melatonin and delays sleep onset, power naps 10–20 min is the sweet spot, weekend catch-up only partially repays sleep debt.
5. CTA card: Find your ideal bedtime in 3 seconds. Calculate My Sleep.

**상태**: [ ] 게시 대기.
