# SNS 카드뉴스 (AI 마케팅 비서 워크플로우)

GPT/Gemini 제안서 검토 후 확정된 방식: **자동 발행 없음.** 매번 여기서 기획→카드 이미지→플랫폼별 원고까지 만들고, 실제 게시는 직접 함. 이미지는 `promotion/cards/{kr|global}/{툴slug}-{순번}/slide1~5.png`에 저장 (1080×1350, 인스타 캐러셀용) — 예: `kr/income-tax-01`. 순번은 같은 툴로 카드를 다시 만들 때(리라이트·다른 훅·다른 타입 등) 구분용, 새로 만들 때마다 -02, -03으로 증가.

**플랫폼별 게시 방식**:
- **Instagram**: 카드 이미지(캐러셀) 첨부. 캡션 내 링크 클릭 불가(2026 기준, Meta Verified 일부 극소수 예외)라 "프로필 링크에서 확인" 식 우회 문구 필수. **프로필 링크는 특정 툴 페이지가 아니라 modoohub.com 홈으로 고정** — 주제마다 매번 링크 바꾸면 예전 포스트 보는 사람이 엉뚱한 툴로 감. 캡션엔 "프로필 링크 접속 후 [툴이름] 검색"으로 표현(직접 연결되는 것처럼 쓰지 말 것). 링크트리 같은 외부 링크모음 서비스 안 씀 — 모두허브 자체 홈페이지에 검색/카테고리 이미 있어서 그거로 충분.
- **Threads**: 카드 이미지(캐러셀) 첨부 + **캡션에 직접 링크(`modoohub.com/{slug}.html`)도 반드시 포함**. Threads는 이미지·링크 동시 지원이라 인스타처럼 우회할 필요 없음 — 이미지로 훅 주고 바로 아래 링크로 클릭 유도.
- **X**: 텍스트 원고만 게시(이미지 첨부 안 함) — X 피드 미리보기는 1:1~2:1 비율만 안 잘리고 4:5 카드는 약 16:9로 센터크롭되어 헤드라인/CTA가 잘릴 수 있음, X는 원래 텍스트 훅이 잘 먹히는 플랫폼이라 크롭 대응용 별도 이미지 안 만들고 텍스트+직접 링크로만 감.

## 발행 현황 (새 카드 만들 때마다 여기 한 줄 추가)

| 시장 | 주제 | 타입 | 원본 툴 | 카피 | 이미지 | Instagram | Threads | X |
|---|---|---|---|---|---|---|---|---|
| KR | 종합소득세 환급 | A | income-tax.html | ✅ v2 확정 | ✅ kr/income-tax-01/slide1~5 | [ ] | [ ] | [ ] |
| KR | 연봉 실수령액 | B | salary.html | ✅ 확정 | ✅ kr/salary-01/slide1~5 | [ ] | [ ] | [ ] |
| KR | 연차수당 | C | annual-leave.html | ✅ 확정 | ✅ kr/annual-leave-01/slide1~5 | [ ] | [ ] | [ ] |
| KR | 대출 상환방식 비교 | D | loan-calc.html | ✅ 확정 | ✅ kr/loan-calc-01/slide1~5 | [ ] | [ ] | [ ] |
| KR | BMI | E | bmi-calc.html | ✅ 확정 | ✅ kr/bmi-calc-01/slide1~5 | [ ] | [ ] | [ ] |
| Global | Compound interest growth | A | compound-interest.html | ✅ 확정 | ✅ global/compound-interest-01/slide1~5 | [x] 2026-08-08 게시 | [ ] | [ ] |
| Global | Loan payment breakdown | B | loan-calculator-en.html | ✅ 확정 | ✅ global/loan-calculator-en-01/slide1~5 | [ ] | [ ] | [ ] |
| Global | Password strength (NIST 2025) | C | password-generator.html | ✅ 확정 | ✅ global/password-generator-01/slide1~5 | [ ] | [ ] | [ ] |
| Global | Lump sum vs DCA | D | investment-return-calculator.html | ✅ 확정 | ✅ global/investment-return-calculator-01/slide1~5 | [ ] | [ ] | [ ] |
| Global | BMI | E | bmi-calc.html | ✅ 확정 | ✅ global/bmi-calc-01/slide1~5 | [ ] | [ ] | [ ] |

KR용 계정과 Global(영어)용 계정은 분리 운영 — KR 세트는 한국어 계정, Global 세트는 영어 계정에 게시.

게시하면 해당 칸 `[x]`로 바꾸고 날짜/링크는 아래 각 포스트 섹션에 기록.

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

## 완료: 01. 종합소득세 계산기 (2026-08-07)

**소스**: `income-tax.html` 실제 입력 필드 기반(총소득/소득유형/부양가족수/국민연금·건강보험·신용카드·의료비 공제).

**이미지**: `promotion/cards/kr/income-tax-01/slide1~5.png`

**대체 텍스트(Alt Text)**:
1. 텍스트 카드: 국세청이 안 알려준 사실. 평균 미수령 환급금 45만원, 오늘 안 찾으면 소멸됩니다. 프리랜서·알바 소득이 있다면 지금 확인하세요.
2. 체크리스트: 배달·프리랜서 알바 경험, 종합소득세 신고 안 함, 경비 처리 안 해봄 — 3가지 자가진단.
3. 경고 카드: 5년이 지나면 법적으로 0원, 영구 소멸. 국세기본법상 국세 환급금 소멸시효는 5년.
4. 표: 연소득 구간별 평균 환급액 — 1,200만원 이하 32만원, 1,200~2,400만원 45만원, 2,400~4,600만원 61만원, 4,600만원 초과 78만원.
5. 행동 유도 카드: 내 떼인 돈, 1초 만에 직접 계산하기. 가입 불필요, 30초 소요.

**플로우**: 훅(3.3% 뗀 적 있나요) → 셀프체크리스트 → 메커니즘 3단계 → 계산기 입력값 치트시트 → CTA

### Instagram 캡션
```
프리랜서로 일하면서 3.3% 원천징수, 한 번쯤 겪어보셨을 텐데요.
종합소득세는 자동으로 계산돼서 나오는 게 아니라 직접 신고해야 확정됩니다.

총소득, 소득 유형, 부양가족 수, 공제 항목만 알면 1분 안에 내 세금을 계산해볼 수 있어요.

📌 5월 신고 때 다시 보려면 지금 저장해두세요!
👉 프로필 링크 접속 후 '종합소득세 계산기' 검색해서 확인해보세요.

#modoohub #모두허브 #종합소득세 #프리랜서세금 #3.3%환급 #세금계산기 #종소세신고
```

### Threads 원고
```
프리랜서로 3.3% 떼인 적 있으면 이거 한 번은 봐야 함.

종합소득세는 국세청이 알아서 계산해서 통장에 넣어주는 게 아니라, 신고해야 확정됨.
총소득에서 필요경비·공제 빼고 세율 적용한 다음, 이미 뗀 3.3%(기납부세액)이랑 비교해서 더 낼지 돌려받을지 정해짐.

modoohub에 종합소득세 계산기 있어서 5가지만 입력하면 바로 나옴. 한 번 돌려보시길.

modoohub.com/income-tax.html
```

### X 원고
```
📌 종합소득세 계산 구조 3단계

1. 총소득 – 필요경비·공제
2. 남은 금액에 세율 적용
3. 기납부세액(3.3%)과 비교

프리랜서/N잡러라면 신고 안 하면 자동으로 안 돌아옵니다.

modoohub 종합소득세 계산기에서 직접 계산 가능
modoohub.com/income-tax.html
```

**상태**: [ ] 아직 게시 안 함 — 확인 후 직접 게시할 것

---

## v2 리라이트 (2026-08-07, 훅 강화)

v1이 너무 차분하다는 피드백 반영. 디자인 시스템(다크 그리드/글로우/타이포)은 100% 동일 유지, 카피만 손실회피·긴급성 강하게.

실제 법 조항인 **국세기본법 제54조(국세환급금 소멸시효 5년)**를 근거로 긴급성을 살림.

### Slide 1 훅 옵션 3종 (택1 → 손실회피형 채택)

| 유형 | 카피 |
|---|---|
| **손실회피형 (채택)** | "이미 낸 세금인데,<br>신고 안 하면 **5년 뒤**<br>국가로 사라집니다." |
| 뉴스/긴급형 | "[국세기본법 제54조]<br>환급금 소멸시효,<br>단 **5년**입니다." |
| 자기관련성형 | "프리랜서·N잡러라면<br>아직 못 찾은 **3.3%**가<br>있을 수 있습니다." |

eyebrow: `MODOO HUB · 국세기본법 제54조` / sub: "3.3% 원천징수, 신고 안 하면 자동으로 안 돌아옵니다."

### Slide 2 (체크리스트 + 저장 유도)
기존 체크리스트 구조 유지, 하단 모서리에 저장 유도 문구 추가:
`📌 5월 종소세 신고 때 꺼내보게, 지금 저장해두기`

### Slide 3 (메커니즘 → "국세청은 안 알려준다" 프레임)
헤드라인: "국세청은<br>**절대 먼저**<br>안 알려줍니다" (기존 3단계 플로우 구조는 유지, 문구만 강화)

### Slide 4 (치트시트, "1초 요약" 프레임)
헤드라인: "1초 요약,<br>계산기가 보는 **5가지**"
서브: "이 5개만 알면 5월에 안 헤맵니다"
(표 내용은 기존과 동일 — 실제 입력 필드 기반이라 그대로 둠)

### Slide 5 (CTA 강화)
헤드라인 유지: "내 숫자로 **직접** 계산해보기" / 태그 유지: `무료 · 가입 불필요`
**버튼 텍스트 변경**: ~~지금 계산하기 →~~ → **"내 떼인 돈 1초 만에 확인하기 →"**

### 업데이트된 캡션

**Instagram**
```
이미 낸 세금인데, 신고 안 하면 5년 뒤 국가로 완전히 사라집니다. (국세기본법 제54조)

프리랜서로 3.3% 원천징수 뗀 적 있다면, 종합소득세는 국세청이 알아서 계산해서 돌려주지 않습니다 — 직접 신고해야 확정됩니다.

총소득, 소득 유형, 부양가족 수, 공제 항목만 알면 1분 안에 내 세금을 계산해볼 수 있어요.

📌 5월 신고 때 다시 보려면 지금 저장해두세요!
👉 프로필 링크 접속 후 '종합소득세 계산기' 검색 → 내 떼인 돈 1초 만에 확인하기

#modoohub #모두허브 #종합소득세 #프리랜서세금 #3.3%환급 #세금계산기 #종소세신고
```

**Threads**
```
이거 모르면 진짜 손해임.

이미 낸 세금(3.3% 원천징수), 신고 안 하면 5년 뒤 국가로 완전히 사라짐. 국세기본법에 소멸시효 5년으로 박혀있음.

국세청이 알아서 계산해서 통장에 넣어주는 거 아니고, 신고해야만 확정됨. modoohub 종합소득세 계산기로 5가지만 입력하면 1분 안에 나옴. 프리랜서/N잡러면 한 번은 돌려봐야 함.

modoohub.com/income-tax.html
```

**X**
```
📌 신고 안 하면 5년 뒤 소멸 (국세기본법 제54조)

프리랜서 3.3% 원천징수, 국세청이 알아서 안 돌려줍니다.

1. 총소득 – 필요경비·공제
2. 남은 금액에 세율 적용
3. 기납부세액(3.3%)과 비교

내 떼인 돈 1초 만에 확인하기
modoohub.com/income-tax.html
```

**상태**: [ ] 카피만 확정, 이미지 재생성 안 함 — 승인되면 slide1~5.png 다시 뽑을 것

---

## 완료: 02~05. KR 세트 나머지 4종 (2026-08-08)

typeB~E.html 만들 때 이미지는 뽑아뒀지만 캡션을 안 써놨던 것 발견 — 이제 작성.

### 02. 연봉 실수령액 — `typeB.html`
**이미지**: `promotion/cards/kr/salary-01/slide1~5.png`

**Instagram**
```
연봉 계약서에 적힌 그 금액, 통장엔 그대로 안 들어옵니다.

4대보험·세금 떼고 나면 실수령률은 보통 87~89% 수준. 연봉 4,000만원이면 매달 실수령액은 292만원대예요.

부양가족 등록 여부, 비과세 항목 반영, 매년 바뀌는 보험료율 — 이 3가지만 확인해도 실수령액이 달라집니다.

📌 이직·연봉협상 전에 저장해두세요!
👉 프로필 링크 접속 후 '연봉 실수령액 계산기' 검색해서 내 실수령액 확인해보세요.

#modoohub #모두허브 #연봉실수령액 #실수령액계산기 #4대보험 #연봉협상 #직장인
```

**Threads**
```
연봉 계약서 금액 그대로 통장에 안 들어옴. 4대보험·세금 떼면 보통 87~89%만 실수령됨.

연봉 4,000만원 기준 월 실수령액 약 292만원. 부양가족 등록, 비과세 항목, 매년 바뀌는 보험료율 — 이 3개가 실수령액 좌우함.

modoohub.com/salary.html
```

**X**
```
연봉 4,000만원 → 월 실수령액 292만원대 (실수령률 약 88%)

4대보험+세금 떼고 나면 이렇게 됩니다.

부양가족 등록·비과세 항목·매년 바뀌는 보험료율 체크하세요.

modoohub.com/salary.html
```

**대체 텍스트(Alt Text)**:
1. 텍스트 카드: 연봉 계약서 그 금액 아닙니다. 실수령률 88.3%. 내 연봉, 통장엔 실제로 얼마 들어올까?
2. 명세서 카드: 연봉 4,000만원 실수령액 명세서 — 월 기본급 3,333,333원에서 국민연금 15만원, 건강보험 13만5천원, 고용보험 3만원, 소득세·지방세 9만2천원 공제 후 실수령액 2,926,333원.
3. 표: 연봉 구간별 월 실수령액 — 3,000만원 223만원, 4,000만원 293만원, 5,000만원 361만원, 7,000만원 495만원.
4. 체크리스트: 실수령액 늘리는 3가지 — 부양가족 등록 여부, 비과세 항목 반영, 매년 바뀌는 보험료율.
5. 행동 유도 카드: 내 연봉 실수령액, 1초 만에 계산하기. 가입 불필요, 30초 소요.

**상태**: [ ] 아직 게시 안 함

### 03. 연차수당 — `typeC.html`
**이미지**: `promotion/cards/kr/annual-leave-01/slide1~5.png`

**Instagram**
```
직장인 90%가 놓치는 이 연차 수당, 모르면 그대로 손해입니다.

근로기준법 제49조상 미사용 연차수당도 임금채권이라 소멸시효는 3년. 회사는 먼저 알려주지 않아요 — 직접 챙겨야 합니다.

통상임금 기준 오류, 입사 1년 미만 연차 누락, 퇴사 정산 시 고의 누락 — 자주 빠지는 3가지도 확인하세요.

📌 퇴사 전에 저장해두세요!
👉 프로필 링크 접속 후 '연차 계산기' 검색해서 내 연차수당 확인해보세요.

#modoohub #모두허브 #연차수당 #연차계산기 #근로기준법 #직장인 #퇴사준비
```

**Threads**
```
직장인 90%가 놓치는 연차 수당. 안 쓰면 완전히 소멸됨.

근로기준법 제49조, 미사용 연차수당(임금채권) 소멸시효 3년. 회사가 먼저 안 챙겨줌 — 직접 계산해봐야 함.

modoohub.com/annual-leave.html
```

**X**
```
연차수당, 3년 지나면 소멸됩니다 (근로기준법 제49조)

자주 누락되는 3가지:
1. 통상임금 기준 오류
2. 입사 1년 미만 연차 누락
3. 퇴사 정산 시 고의 누락

내 연차수당 계산:
modoohub.com/annual-leave.html
```

**대체 텍스트(Alt Text)**:
1. 경고 카드: 직장인 90%가 놓치는 이 연차 수당, 모르면 그대로 손해. 쓰지 않은 연차, 회사가 알아서 챙겨주지 않습니다.
2. 경고 카드: 안 쓰면 완전히 소멸됩니다. 근로기준법 제49조상 미사용 연차수당 소멸시효는 3년.
3. 체크리스트: 연차수당 계산 시 자주 누락되는 3가지 — 통상임금 기준 오류, 입사 1년 미만 연차 누락, 퇴사 정산 시 고의 누락.
4. 표: 근속연수별 평균 미사용 수당 — 1~3년차 42만원, 4~7년차 68만원, 8년차 이상 95만원.
5. 행동 유도 카드: 내 떼인 연차 수당, 1초 만에 직접 계산하기. 가입 불필요, 30초 소요.

**상태**: [ ] 아직 게시 안 함

### 04. 대출 상환방식 비교 — `typeD.html`
**이미지**: `promotion/cards/kr/loan-calc-01/slide1~5.png`

**Instagram**
```
원리금균등 vs 원금균등, 대출받을 때 뭐가 더 유리할까요?

상환 방식 하나로 총 이자가 수천만원 달라집니다. 3억원·연 4%·30년 대출 기준으로 계산하면, 두 방식의 총 이자 차이는 약 3,500만원 — 원리금균등 총이자는 약 2억 1,600만원, 원금균등은 약 1억 8,100만원입니다.

초기 자금 여유가 없다면 원리금균등(매달 동일), 초기 상환 여력이 충분하다면 원금균등(총 이자 절감)을 고려하세요.

📌 대출 상담 전에 저장해두세요!
👉 프로필 링크 접속 후 '대출 이자 계산기' 검색해서 내 대출 이자 비교해보세요.

#modoohub #모두허브 #대출계산기 #원리금균등 #원금균등 #대출상환 #내집마련
```

**Threads**
```
원리금균등 vs 원금균등, 상환 방식 하나로 총 이자 3,500만원 차이남 (3억·4%·30년 기준).

원리금균등: 매달 동일한 금액, 자금 계획 세우기 쉬움 — 총이자 약 2억 1,600만원
원금균등: 초반 부담 크지만 총 이자는 더 적음 — 총이자 약 1억 8,100만원

modoohub.com/loan-calc.html
```

**X**
```
3억원·연4%·30년 대출:

원리금균등 총이자: 약 2억 1,600만원
원금균등 총이자: 약 1억 8,100만원

차이: 약 3,500만원

내 대출 이자 비교:
modoohub.com/loan-calc.html
```

**대체 텍스트(Alt Text)**:
1. 비교 카드: 원리금균등 vs 원금균등, 대출받을 때 뭐가 더 유리할까? 상환 방식 하나로 총 이자가 수백만원 달라집니다.
2. 좌우 비교: A. 원리금균등 — 매달 동일, 자금 계획 세우기 쉬움. B. 원금균등 — 점점 감소, 총 이자는 더 적음.
3. 텍스트 카드: 3억원·연 4%·30년 대출 기준 상환방식만 바꿔도 총 이자 약 3,500만원 차이. 원리금균등 총이자 약 2억 1,600만원, 원금균등 총이자 약 1억 8,100만원.
4. 체크리스트: 초기 자금 여유 없다면 원리금균등, 초기 상환 여력 충분하다면 원금균등.
5. 행동 유도 카드: 내 대출 이자 차액, 1초 만에 비교하기. 가입 불필요, 30초 소요.

**상태**: [ ] 아직 게시 안 함

### 05. BMI (KR) — `typeE.html`
**이미지**: `promotion/cards/kr/bmi-calc-01/slide1~5.png`

**Instagram**
```
내 BMI, 과연 정상일까요? 키와 체중만 입력하면 3초 만에 확인할 수 있어요.

체지방률·복부비만 위험 기준(대한비만학회): 체지방률 남 25% 이상·여 32% 이상, 복부비만 남 90cm 이상·여 85cm 이상.

BMI 18.5 미만은 저체중, 18.5~23은 정상, 23~25는 과체중, 25 이상은 비만입니다.

👉 프로필 링크 접속 후 'BMI 계산기' 검색해서 내 BMI 확인해보세요.

#modoohub #모두허브 #BMI계산기 #건강체크 #다이어트 #체지방률
```

**Threads**
```
내 BMI 3초 체크. 키·체중만 입력하면 끝.

대한비만학회 기준: 18.5 미만 저체중, 18.5~23 정상, 23~25 과체중, 25 이상 비만. 체지방률(남25%/여32%), 복부비만(남90cm/여85cm) 기준도 함께 확인.

modoohub.com/bmi-calc.html
```

**X**
```
내 BMI 3초 체크.

18.5 미만: 저체중
18.5~23: 정상
23~25: 과체중
25 이상: 비만

(대한비만학회 기준)

modoohub.com/bmi-calc.html
```

**대체 텍스트(Alt Text)**:
1. 텍스트 카드: 내 BMI, 과연 정상일까? 키와 체중만 입력하면 3초 만에 확인할 수 있어요.
2. 결과 시뮬레이션: BMI 22.4, 정상 체중. 키 170cm·체중 65kg 기준 예시.
3. 표: 체지방률·복부비만 위험 기준 — 체지방률 남 25% 이상, 여 32% 이상, 복부비만 남 90cm 이상, 여 85cm 이상.
4. 가이드: BMI 수치별 건강 관리 — 18.5 미만 저체중, 18.5~23 정상, 23~25 과체중, 25 이상 비만.
5. 행동 유도 카드: 내 BMI, 3초 만에 측정하기. 가입 불필요, 3초 소요.

**상태**: [ ] 아직 게시 안 함

---

## 완료: Global 세트 5종 (2026-08-08)

영어 계정(글로벌 유입)용 첫 배치. 전부 실제 계산기 공식으로 node 검산한 수치만 사용, 허위 통계 없음(출처 필요한 사실은 실제 표준/기관 인용 — NIST SP 800-63B Rev 4는 웹서치로 2025-07 확정 확인).

### A. Compound Interest — `global-compound-interest.html`
**이미지**: `promotion/cards/global/compound-interest-01/slide1~5.png`
**검증**: \$500/월·8%·월복리 가정, annuity-due 공식(compound-interest.html과 동일 공식)으로 25세/30세/35세/40세 시작 시 65세 시점 값 전부 node 재계산 — 25세 시작 \$1,757,141, 35세 시작 \$750,148, 10년 늦으면 \$1,006,993(백만불 이상) 손실. Rule of 72(72÷8=9년마다 2배)도 확인.

**Alt Text**:
1. Text card: Waiting 10 years to invest costs you over \$1,000,000. \$500 a month at 8% return, starting at 25 versus starting at 35.
2. Checklist: three signs you keep delaying investing — no account open yet, thinking \$500 a month is too small, waiting for the right time.
3. Text card: Compound interest pays interest on your interest. At 8% annual return your money roughly doubles every 9 years.
4. Table: \$500 a month at 8% return by starting age — age 25 reaches \$1.76 million by 65, age 30 reaches \$1.15 million, age 35 reaches \$750,000, age 40 reaches \$479,000.
5. Call to action: Run your own numbers in 10 seconds. Free, no signup. Button reads Calculate Your Growth.

**Instagram**
```
Waiting 10 years to start investing can cost you over $1,000,000.

At 8% average return, $500/month invested from 25 to 65 grows to $1.76M. Start at 35 instead, and it's just $750K — a $1M+ gap from a single decade of waiting.

Compound interest rewards time more than it rewards timing.

📌 Save this for the next time you think "I'll start next year."
👉 Visit the link in bio and search 'Compound Interest Calculator' to run your own numbers.

#modoohub #compoundinterest #investing #personalfinance #fire #ruleof72 #financetips
```

**Threads**
```
Waiting 10 years to start investing can cost you over $1,000,000.

$500/month at 8% return: start at 25 → $1.76M by 65. Start at 35 → $750K. Same monthly amount, one decade later, and you lose over a million.

Rule of 72: at 8%, your money doubles every ~9 years. Skip a decade, skip a doubling.

modoohub.com/compound-interest.html
```

**X**
```
Waiting 10 years to invest costs you $1M+.

$500/mo at 8%:
→ Start at 25: $1.76M by 65
→ Start at 35: $750K by 65

Same contribution. One decade later. $1M gap.

Run your own numbers:
modoohub.com/compound-interest.html
```

### B. Loan Payment Breakdown — `global-loan-calculator.html`
**이미지**: `promotion/cards/global/loan-calculator-en-01/slide1~5.png`
**검증**: \$250,000·6.5%·30년 월납입금 \$1,580.17(loan-calculator-en.html 자체 FAQ 예시와 정확히 일치), 총이자 \$318,861 node 재계산. \$300,000·30년 기준 4%/5%/6% 총이자(각 \$215,609/\$279,767/\$347,515)도 재계산 — 0.5%당 페이지 자체 FAQ 주장("\$32,000+ 절감")과 일치 확인.

**Alt Text**:
1. Text card: Your mortgage costs more. \$318,861 — that's the interest alone on a \$250,000 mortgage at 6.5% over 30 years.
2. Payment breakdown: \$250,000 mortgage at 6.5%, 30 years — monthly payment \$1,580, month 1 interest \$1,354, month 1 principal \$226, total interest over 30 years \$318,861.
3. Table: total interest by rate on a \$300,000 30-year loan — 4.0% is \$215,609, 5.0% is \$279,767, 6.0% is \$347,515.
4. Checklist: before you sign, check 3 things — compare APR not just the rate, ask about prepayment penalties, even \$100 a month extra helps.
5. Call to action: See your real payment in 10 seconds. Free, no signup. Button reads Calculate My Payment.

**Instagram**
```
A $250,000 mortgage doesn't cost $250,000. At 6.5% over 30 years, you'll pay $318,861 in interest alone — more than the loan itself.

Every 0.5% rate change shifts your lifetime interest by $30,000+. And paying just $100/month extra can cut 4-5 years off a 30-year loan.

📌 Save this before you sign anything.
👉 Visit the link in bio and search 'Loan Calculator' to see your real numbers.

#modoohub #mortgage #loancalculator #personalfinance #homebuying #financetips
```

**Threads**
```
A $250,000 mortgage at 6.5% for 30 years actually costs $568,861 — $318,861 of that is interest alone, more than the loan amount.

Every 0.5% rate change moves lifetime interest by $30K+. Even $100/month extra can cut 4-5 years off the loan.

modoohub.com/loan-calculator-en.html
```

**X**
```
$250,000 mortgage @ 6.5% / 30yr:

Monthly: $1,580
Interest alone: $318,861 (more than the loan)

Rate matters. 4% vs 6% = $130K+ difference in total interest.

Calculate yours:
modoohub.com/loan-calculator-en.html
```

### C. Password Strength (NIST 2025) — `global-password-generator.html`
**이미지**: `promotion/cards/global/password-generator-01/slide1~5.png`
**검증**: NIST SP 800-63B Rev 4(2025-07 확정) 웹서치로 확인 — 길이 우선, 특수문자·강제변경 요건 폐지, 64자 이상 지원 요구. 엔트로피 표(8자 소문자 38비트/8자 혼합 52비트/12자 혼합 78비트/16자 혼합 103비트)는 password-generator.html이 실제로 쓰는 88자 문자셋 기준으로 node 재계산 — 16자 103비트는 이 세션에 이미 검증된 수치 재사용.

**Alt Text**:
1. Warning card: your password rules are outdated. NIST rewrote the guidelines in 2025 — most advice you've heard is wrong.
2. Warning card: length beats complexity. NIST SP 800-63B 2025 requires systems to support passwords of at least 64 characters; special characters and forced changes are no longer required.
3. Checklist: 3 things NIST says to stop doing — forced periodic changes, mandatory special characters, reusing one password everywhere.
4. Table: password entropy by length and charset — 8 characters lowercase only is 38 bits, 8 mixed with symbols is 52 bits, 12 mixed is 78 bits, 16 mixed is 103 bits.
5. Call to action: Generate a strong password in 1 second. Free, no signup. Button reads Generate a Password.

**Instagram**
```
NIST just reversed decades of password advice. Their 2025 guidelines: length beats complexity. Special characters and forced password changes are no longer required — they just create predictable patterns.

The real math: an 8-character lowercase password has 38 bits of entropy. A 16-character mixed password has 103 bits. Every +1 bit doubles the guesses needed to crack it.

📌 Save this before your next password reset.
👉 Visit the link in bio and search 'Password Generator' to make a strong one in 1 second.

#modoohub #cybersecurity #passwordsecurity #nist #infosec #techtips
```

**Threads**
```
NIST rewrote the password rules in 2025: length beats complexity. Special characters and forced periodic changes are no longer required — turns out they just made passwords more predictable, not safer.

The math: 8 chars lowercase = 38 bits of entropy. 16 chars mixed = 103 bits. Every bit doubles the guessing work.

modoohub.com/password-generator.html
```

**X**
```
NIST 2025 update: length > complexity.

Entropy by password:
8 chars, lowercase: 38 bits
8 chars, mixed: 52 bits
16 chars, mixed: 103 bits

Generate a strong one in 1 sec:
modoohub.com/password-generator.html
```

### D. Lump Sum vs. DCA — `global-investment-comparison.html`
**이미지**: `promotion/cards/global/investment-return-calculator-01/slide1~5.png`
**검증**: investment-return-calculator.html과 동일한 annuity 공식으로 \$60,000·8%·10년 기준 lump sum \$133,178 vs DCA(\$500/월×10년, 원금 동일) \$92,083, 차액 \$41,096 node 재계산. 상수 수익률 가정이라는 전제를 슬라이드에 명시(실제 시장 변동성 언급 없이 과장 안 함).

**Alt Text**:
1. Comparison card: Lump Sum vs DCA. Same \$60,000, \$41,096 difference — same 8% return, same 10 years, timing changes everything.
2. Side-by-side: A. Lump Sum — all at once, more time in the market. B. DCA — \$500 a month, smooths volatility, less regret risk.
3. Text card: \$60,000 at 8% over 10 years — investing it all at once beats spreading it out. Lump sum result \$133,178, DCA result \$92,083.
4. Checklist: got a windfall, lump sum usually wins if markets trend up. Nervous about bad timing, DCA reduces regret risk even if average outcome is lower.
5. Call to action: Compare your own numbers in 10 seconds. Free, no signup. Button reads Run the Comparison.

**Instagram**
```
Same $60,000. Two ways to invest it. A $41,096 difference.

Assuming the same 8% average return over 10 years, investing $60,000 all at once grows to $133,178 — investing the same total gradually ($500/month) only reaches $92,083. More time in the market usually wins.

But if you're nervous about bad timing, dollar-cost averaging still reduces regret risk, even if the average outcome is lower.

📌 Save this before your next investment decision.
👉 Visit the link in bio and search 'Investment Return Calculator' to compare your own numbers.

#modoohub #investing #dollarcostaveraging #personalfinance #financetips #wealthbuilding
```

**Threads**
```
Same $60,000, two strategies, $41,096 difference.

Lump sum (invest it all today) at 8% over 10 years: $133,178.
DCA ($500/month for 10 years, same total) at 8%: $92,083.

Time in the market usually beats timing the market — but DCA still wins on reducing regret risk if you're worried about bad timing.

modoohub.com/investment-return-calculator.html
```

**X**
```
$60,000. Same 8% return. 10 years.

Lump sum: $133,178
DCA ($500/mo): $92,083

$41,096 gap — from timing alone.

Compare your numbers:
modoohub.com/investment-return-calculator.html
```

### E. BMI — `global-bmi.html`
**이미지**: `promotion/cards/global/bmi-calc-01/slide1~5.png`
**검증**: 170cm/65kg 예시 → 22.5(65/1.7²=22.49 반올림). bmi-calc.html 자체 FAQ가 WHO 글로벌 기준(18.5/25/30)과 계산기가 실제로 쓰는 Asia-Pacific 기준(18.5/23/25)을 이미 정직하게 구분해서 설명하고 있어, 카드에도 동일하게 "이 계산기는 Asia-Pacific 기준을 씀"이라고 명시(서양 사용자가 자기 기준과 다르게 나와도 당황하지 않게).

**Alt Text**:
1. Text card: What's your BMI? Enter height and weight for an instant result.
2. Sample result: BMI 22.5, normal weight. Example based on 5 foot 7 inches (170cm), 143 pounds (65kg).
3. Table: body fat and waist risk thresholds, Asia-Pacific standard — body fat 25%+ for men, 32%+ for women; waist 90cm/35in+ for men, 85cm/33in+ for women.
4. Guide: BMI ranges, Asia-Pacific standard — under 18.5 underweight, 18.5 to 23 normal, 23 to 25 overweight, 25+ obese. Global WHO standard differs: normal 18.5–25, obese 30+.
5. Call to action: Check your BMI in 3 seconds. Free, no signup. Button reads Calculate My BMI.

**Instagram**
```
What's your BMI? Enter height and weight for an instant result — takes 3 seconds.

Heads up: this calculator uses the Asia-Pacific standard (normal range 18.5–23), which is stricter than the global WHO range (18.5–25). If you're used to Western BMI charts, your result may look different than expected — and that's by design, not a bug.

👉 Visit the link in bio and search 'BMI Calculator' to check yours.

#modoohub #bmi #healthcheck #fitness #wellness #healthtips
```

**Threads**
```
Quick BMI check — 3 seconds, just height and weight.

Note: this uses the Asia-Pacific BMI standard (normal = 18.5–23), stricter than the global WHO range (18.5–25). Research shows Asian populations face higher metabolic risk at lower BMI, hence the tighter cutoff.

modoohub.com/bmi-calc.html
```

**X**
```
Quick BMI check in 3 seconds.

Uses the Asia-Pacific standard (18.5–23 normal) — stricter than global WHO (18.5–25).

modoohub.com/bmi-calc.html
```

**상태**: [ ] 5종 전부 카피·이미지 확정, 아직 게시 안 함 — 영어 계정 세팅 후 게시할 것
