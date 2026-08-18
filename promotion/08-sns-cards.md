# SNS 카드뉴스 (AI 마케팅 비서 워크플로우)

GPT/Gemini 제안서 검토 후 확정된 방식: **자동 발행 없음.** 매번 여기서 기획→카드 이미지→플랫폼별 원고까지 만들고, 실제 게시는 직접 함. 이미지는 `promotion/cards/{kr|global}/{툴slug}-{순번}/slide1~5.png`에 저장 (1080×1350, 인스타 캐러셀용) — 예: `kr/income-tax-01`. 순번은 같은 툴로 카드를 다시 만들 때(리라이트·다른 훅·다른 타입 등) 구분용, 새로 만들 때마다 -02, -03으로 증가.

**플랫폼별 게시 방식**:
- **Instagram**: 카드 이미지(캐러셀) 첨부. 캡션 내 링크 클릭 불가(2026 기준, Meta Verified 일부 극소수 예외)라 "프로필 링크에서 확인" 식 우회 문구 필수. **프로필 링크는 특정 툴 페이지가 아니라 modoohub.com 홈으로 고정** — 주제마다 매번 링크 바꾸면 예전 포스트 보는 사람이 엉뚱한 툴로 감. 캡션엔 "프로필 링크 접속 후 [툴이름] 검색"으로 표현(직접 연결되는 것처럼 쓰지 말 것). 링크트리 같은 외부 링크모음 서비스 안 씀 — 모두허브 자체 홈페이지에 검색/카테고리 이미 있어서 그거로 충분.
- **Threads**: 카드 이미지(캐러셀) 첨부 + **캡션에 직접 링크(`modoohub.com/{slug}.html`)도 반드시 포함**. Threads는 이미지·링크 동시 지원이라 인스타처럼 우회할 필요 없음 — 이미지로 훅 주고 바로 아래 링크로 클릭 유도.
- **X**: **Global 세트에만 게시. KR은 X 아예 안 씀** — 한국 X 이용자(약 751만)가 스레드(약 593만)보다 많아 죽은 플랫폼은 아니지만, Z세대가 자주 쓰는 SNS 순위에서 인스타·페이스북 다음 3위(8.4%)로 밀리고 유저층이 엔터/정치뉴스 쪽에 쏠려있어 재테크·계산기형 콘텐츠랑 안 맞음(효율 낮음). Global(영어) 세트는 계속 X 포함 — 텍스트 원고만 게시(이미지 첨부 안 함), X 피드 미리보기는 1:1~2:1 비율만 안 잘리고 4:5 카드는 약 16:9로 센터크롭되어 헤드라인/CTA가 잘릴 수 있어서 별도 이미지 안 만들고 텍스트+직접 링크로만 감.

## 발행 현황 (새 카드 만들 때마다 여기 한 줄 추가)

| 시장 | 주제 | 타입 | 원본 툴 | 카피 | 이미지 | Instagram | Threads | X |
|---|---|---|---|---|---|---|---|---|

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

- **만드는 법(2026-08-12 재검증 확정 — 이전(2026-08-07) 버전은 카드가 우측/하단으로 밀려서 잘리는 실제 버그가 있었음, 절대 아래 옛 방식 쓰지 말 것)**:
  1. 해당 타입 HTML 열어서 5슬라이드 텍스트/숫자 교체.
  2. 슬라이드마다 임시 HTML 사본을 만들어 아래 두 가지를 주입:
     - `</head>` 직전에 다음 CSS(그대로 복붙, 절대 손대지 말 것 — 아래 "왜" 참고):
       ```html
       <style>
       #exportNav{display:none !important;}
       body{margin:0 !important; overflow:hidden !important; zoom:2.5 !important;}
       body>div{padding:0 !important; margin:0 !important; width:432px !important; height:540px !important; min-height:0 !important; display:block !important;}
       body>div>div{display:block !important; width:432px !important; height:540px !important;}
       #exportCard{position:static !important; margin:0 !important;}
       </style>
       ```
     - `</body>` 직전에 `<script>current=N;render();</script>` 주입 (N=0~4, 0-indexed) — 실제 JS 상태(인디케이터·도트 포함)를 슬라이드로 강제 전환. CSS만으로 슬라이드 강제 표시하면 `render()`가 안 돌아서 01/05 인디케이터가 항상 첫 슬라이드로 고정되는 버그 있음.
  3. 크롬 헤드리스로 캡처: **`--window-size=1080,1350 --force-device-scale-factor=1 --screenshot=slideN.png`(N=1~5, 1-indexed 파일명)** — **`--force-device-scale-factor=2.5`나 그 외 값을 쓰면 안 됨(아래 "왜" 참고)**.
  4. 임시 파일 삭제.
  5. **반드시 아래 "필수 검증" 통과 후에만 완료 처리.**

  **왜 이 방식이어야 하는지(2026-08-12 삽질 기록)**: 원래 방식은 `window-size=432,540 + force-device-scale-factor=2.5`로 432×540 프리뷰를 2.5배 키워 1080×1350을 뽑는 거였는데, 이 환경(headless Chrome)에서 `align-items:center; justify-content:center` flexbox 중앙정렬이 안정적으로 안 맞아서 카드가 오른쪽/아래로 밀려 렌더링됨(원본 미수정 typeA.html로 테스트해도 재현되는 파이프라인 자체 버그, 콘텐츠 문제 아니었음). 게다가 DSF=2.5 자체가 폰트 줄바꿈 계산까지 미묘하게 틀어져서 원래 2줄로 wrap돼야 할 문단이 1줄로 나가다 카드 밖으로 잘리는 사고도 있었음(global-loan-payoff-calculator.html slide1 실사고 사례). `zoom:2.5`+`DSF=1`+`window-size=1080,1350`(카드를 처음부터 최종 해상도로 직접 렌더링, 배율 트릭 없음) 조합으로 두 문제 다 해결됨 — **이 조합에서 벗어나지 말 것.**

  **필수 검증 (스킵 금지, 매번)**: 슬라이드 만들 때마다 아래 파이썬 스니펫으로 카드가 캔버스 (0,0)에 정확히 붙어있는지 자동 확인 — 한 장이라도 `left`/`top`이 0(또는 1~2px 오차)이 아니면 카드가 밀린 것.
  ```python
  from PIL import Image
  im = Image.open("slideN.png").convert("RGB")
  w,h = im.size
  bg = im.getpixel((2,2))
  def diff(p1,p2): return sum(abs(a-b) for a,b in zip(p1,p2))
  left = next((x for x in range(w) if diff(im.getpixel((x,h//2)),bg)>15), None)
  top = next((y for y in range(h) if diff(im.getpixel((w//2,y)),bg)>15), None)
  print(im.size, left, top)  # (1080,1350) 0 0 이어야 정상
  ```
  자동 검증 통과해도 **육안으로 최소 1~2장은 실제로 열어서 텍스트가 카드 안에서 정상 줄바꿈됐는지, 잘린 단어 없는지 직접 확인할 것** — 자동 스캔은 프레임 위치만 잡아내고 텍스트 오버플로우는 못 잡음(라이트 테마 Type E는 배경색이 카드색과 거의 같아서 자동 스캔 자체가 부정확하니 특히 육안 확인 필수).
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

