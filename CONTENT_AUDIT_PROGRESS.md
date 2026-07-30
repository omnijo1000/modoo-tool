# 콘텐츠 심화 작업 진행상황 (AdSense 재심사 대비)

브랜치: `content-depth-audit` (origin에 push됨, main엔 미반영)

## 배경
- 애드센스 재심사에서 "가치 낮은 콘텐츠"로 반려됨
- 진단: ~390개 툴 페이지 중 다수가 인트로 1~2문장 + FAQ 답변 1문장짜리 "형식은 갖췄지만 얕은" 콘텐츠
- 방침: 실제 구현 로직(정규식, 알고리즘, 라이브러리 동작 방식 등) 기반으로 인트로+FAQ를 ko/en/zh/ja 4개 언어 전부 재작성. FAQ 8개 이상, static seoDiv와 JS seoHtml 완전 동일해야 함(정적 프리렌더 요구사항, CLAUDE.md 참조)

## 스캔 방법 (재사용 가능)
`class="seo"` 블록 텍스트를 태그 제거 후 길이 측정, `class="faq-item"` 개수 카운트.
리디렉트 스텁(`http-equiv="refresh"` 포함 + 3000자 미만)과 about/contact/terms/index/privacy는 스캔 대상 제외.
스캔 스크립트는 이 대화 내 python 스니펫 참고 (파일로 저장 안 해둠 — 필요하면 아래 방식으로 재작성):
```python
import re, glob
files = [f for f in glob.glob('*.html') if f not in ('index.html','privacy.html','about.html','contact.html','terms.html') and not f.startswith('naverfc')]
results = []
for f in files:
    s = open(f, encoding='utf-8').read()
    if 'http-equiv="refresh"' in s and len(s) < 3000: continue
    m = re.search(r'class="seo"[^>]*>(.*?)(?=<script)', s, re.S)
    if not m: continue
    text_only = re.sub(r'\s+',' ', re.sub(r'<[^>]+>',' ', m.group(1))).strip()
    results.append((f, len(text_only), len(re.findall(r'class="faq-item"', s))))
results.sort(key=lambda x: x[1])
```

## 완료 (1차 배치, main 브랜치에 커밋됨 — 커밋 34b41ff)
500자 미만이었던 17개 파일 전체 재작성 완료:
ai-cover-letter-generator, ai-blog-title-generator, line-merger, ai-thumbnail-title-generator,
blur-image, cps-calculator(버그도 수정), css-beautifier, css-minifier, emoji-remover, exif-remover,
exif-viewer, ico-converter, image-color-extractor, image-cropper, image-rotator, image-watermark,
json-formatter, json-to-xml, jwt-decoder, keyword-extractor, meta-description-generator,
pdf-extract-images, pdf-password-adder, pdf-reorder-pages, pdf-rotate, pdf-to-text, pdf-watermark,
png-to-svg, random-word-generator, stopword-remover(버그도 수정), svg-to-png, text-statistics,
typing-speed-test, uuid-extractor, webp-to-jpg
(text-merger는 이때 truncation 버그만 고침, 깊이 재작성은 안 됨 → 2차 스캔에서 다시 걸림)

## 2차 스캔 결과 (700자 미만 27개, worst-first)
```
534  text-merger.html                    ✅ 완료 (batch1)
608  palindrome-checker.html             ✅ 완료 (batch1)
615  html-minifier.html                  ✅ 완료 (batch1)
616  youtube-script-generator.html       ✅ 완료 (batch2)
617  ai-linkedin-post-generator.html     ✅ 완료 (batch2)
617  ai-tweet-generator.html             ✅ 완료 (batch2)
618  svg-viewer.html                     ✅ 완료 (batch3)
630  ai-email-generator.html             ✅ 완료 (batch3)
632  sql-validator.html                  ✅ 완료 (batch3)
632  word-frequency-counter.html         ✅ 완료 (batch4)
640  ai-resume-generator.html            ✅ 완료 (batch4)
643  javascript-beautifier.html          ✅ 완료 (batch4)
645  sql-query-explainer.html            ✅ 완료 (batch5)
648  ai-product-description-generator.html ✅ 완료 (batch5)
654  system-prompt-generator.html        ✅ 완료 (batch5)
657  prompt-cleaner.html                 ✅ 완료 (batch6)
658  pdf-password-remover.html           ✅ 완료 (batch6)
661  yaml-diff-checker.html              ✅ 완료 (batch6)
662  javascript-minifier.html            ✅ 완료 (batch7)
663  text-summarizer.html                ✅ 완료 (batch7)
678  anagram-checker.html                ✅ 완료 (batch7)
681  remove-special-characters.html      ✅ 완료 (batch8)
681  sql-to-json.html                    ✅ 완료 (batch8)
687  ascii-table.html                    ✅ 완료 (batch8)
692  color-blindness-simulator.html      ✅ 완료 (batch9)
693  reading-level-checker.html          ✅ 완료 (batch9)
699  sql-minifier.html                   ✅ 완료 (batch9)
```

## 완료 (2차 배치 1/9, content-depth-audit 브랜치에 커밋됨 — 커밋 7a04d01)
text-merger, palindrome-checker, html-minifier

## 완료 (2차 배치 2/9, content-depth-audit 브랜치에 커밋됨 — 커밋 a21d63a)
youtube-script-generator, ai-linkedin-post-generator, ai-tweet-generator

## 완료 (2차 배치 3/9, content-depth-audit 브랜치에 커밋됨 — 커밋 3998dcc)
svg-viewer, ai-email-generator, sql-validator

## 완료 (2차 배치 4/9, content-depth-audit 브랜치에 커밋됨 — 커밋 3cd0223)
word-frequency-counter, ai-resume-generator, javascript-beautifier

## 완료 (2차 배치 5/9, content-depth-audit 브랜치에 커밋됨 — 커밋 596ed77)
sql-query-explainer, ai-product-description-generator, system-prompt-generator

## 완료 (2차 배치 6/9, content-depth-audit 브랜치에 커밋됨 — 커밋 4b87c23)
prompt-cleaner, pdf-password-remover, yaml-diff-checker

## 완료 (2차 배치 7/9, content-depth-audit 브랜치에 커밋됨 — 커밋 677cd27)
javascript-minifier, text-summarizer, anagram-checker

## 완료 (2차 배치 8/9, content-depth-audit 브랜치에 커밋됨 — 커밋 60bdcd9)
remove-special-characters, sql-to-json, ascii-table

## 완료 (2차 배치 9/9, 마지막, content-depth-audit 브랜치에 커밋됨 — 커밋 30e3293)
color-blindness-simulator(버그도 수정 — applyMatrix 3x4→3x3 인덱싱 오류), reading-level-checker(SMOG 계수 오류 + countSyllables 비영어 0음절 버그), sql-minifier(주석 제거가 문자열 보호보다 먼저 실행되어 문자열 내 --/* 로 쿼리 잘림/훼손)

## 2차 스캔 27개 파일 전체 완료 (2026-07-29)
worst-first 27개 파일 전부 재작성 완료.

## 3차 스캔 (700~1000자, 70개 파일, worst-first) — 진행중

이 구간 파일들은 이미 FAQ 8개 형식(faq-item 40개)은 갖췄지만 내용이 얕은 경우가 많음(2026-06-14 전수 SEO 보강 때 형식만 갖춰짐). 스캔 방법은 위와 동일, 범위만 `700 <= len < 1000`으로 필터.

### 완료 (3차 배치 1/N, content-depth-audit 브랜치에 커밋됨 — 커밋 4af5149)
json-schema-validator(버그도 수정 — enum 검사가 문자열 타입 분기 안에만 있어 숫자/불리언 enum 위반 미검출 + minItems/oneOf 등 미구현이면서 head JSON-LD는 $ref·Draft-2019-09 지원을 거짓 주장), ico-converter(버그는 아니지만 PNG압축 방식 ICO/중앙크롭 등 실제 구현 세부사항 문서화), image-prompt-generator(버그도 수정 — DALL-E 모드 템플릿 리터럴 공백 중복 + 네거티브 프롬프트 필드가 DALL-E에서는 조용히 무시됨)

### 완료 (3차 배치 2/N, content-depth-audit 브랜치에 커밋됨 — 커밋 1fe8ec9)
markdown-chat-exporter(버그도 수정 — 파싱이 고정 역할 접두사 없으면 조용히 빈 결과), xml-to-json(버그도 수정 — 혼합 콘텐츠에서 텍스트 순서·공백 유실), pdf-size-analyzer(버그도 수정 — 작성일/수정일 원본 PDF 날짜 포맷 그대로 노출 + "페이지별 크기"가 실제로는 물리적 치수이지 데이터 용량이 아님)

### 완료 (3차 배치 3/N, content-depth-audit 브랜치에 커밋됨 — 커밋 8091de8)
hash-checker(버그도 수정 — title/meta가 MD5 지원을 거짓 광고, Web Crypto API는 MD5 미지원이라 실제로 만들 수 없음. title/meta 태그 자체도 수정함), regex-generator(버그도 수정 — "신용카드"/"JWT" 패턴이 Luhn/BIN 검증이나 실제 JWT 구조 검증 없이 자릿수·구분자 형태만 확인해 오탐 다발), prompt-template-generator(버그는 아니지만 Chain-of-Thought 3단계·Few-Shot 예시 3개가 고정 예시일 뿐 실제로는 난이도에 맞게 편집해야 한다는 실전 지식 보강)

### 완료 (3차 배치 4/N, content-depth-audit 브랜치에 커밋됨 — 커밋 2657d90)
curl-generator(버그도 수정 — 헤더 값/Bearer/URL의 작은따옴표 미이스케이프로 셸 명령어 깨짐 + DELETE 메서드일 때 본문이 조용히 누락), ngram-analyzer(버그도 수정 — 기본 켜진 "구두점 제거"가 중국어 한자·일본어 가나를 전부 삭제, UI는 중/일 번역까지 있는데 실제 처리 로직은 지원 안 함), json-schema-generator(버그도 수정 — null 필드가 기존 FAQ의 거짓 주장과 달리 type:["string","null"]이 아니라 type:"null"로만 생성되어 실사용 시 검증 실패 + 배열 타입 추론이 첫 요소만 봄)

### 완료 (3차 배치 5/N, content-depth-audit 브랜치에 커밋됨 — 커밋 d712521)
png-to-svg(버그도 수정 — "비트맵 추적"이라면서 실제로는 픽셀 1개=rect 1개 방식이라 진짜 벡터가 아님 + 알파 채널 미확인으로 투명 배경이 검게 나올 수 있음), yaml-to-json(버그도 수정 — 기존 FAQ가 "다중 문서는 첫 문서만 변환"이라 했지만 실제로는 js-yaml load()가 다중 문서에서 예외를 던져 변환 자체가 실패함, js-yaml 로컬 설치해 직접 재현 검증함), pdf-metadata-remover(버그도 수정 — 작성일/수정일 체크박스를 선택해도 코드가 CreationDate/ModDate에 대한 pdf-lib setter를 아예 호출하지 않아 실제로는 제거되지 않음)

### 완료 (3차 배치 6/N, content-depth-audit 브랜치에 커밋됨 — 커밋 a4abe9d)
curl-parser(버그도 수정 — -X 없이 -d만 있으면 실제 curl처럼 자동 POST 판정해야 하는데 항상 GET으로 표시되던 로직 오류 + -u Basic Auth가 non-Latin1 비밀번호에서 btoa 예외로 크래시), text-similarity-checker(버그도 수정 — 토큰화 정규식이 한글만 예외처리하고 중국어/일본어 문자를 전부 제거해 서로 무관한 CJK 텍스트끼리도 편집거리 지표가 빈 문자열끼리 비교되어 100%로 나오는 바람에 종합 30% 유사도로 오검출되던 문제, 한자/가나 글자단위 토큰화로 수정), webhook-tester(버그도 수정 — FAQ가 Stripe t=timestamp,v1=hex 서명 형식을 지원한다고 문서화했지만 실제 코드는 그 형식을 파싱하지 않아 정상 시크릿이어도 검증 항상 실패하던 문제를 실제 구현 + 서명 비교를 순수 === 대신 타이밍 세이프 XOR 비교로 교체 + 모든 언어에서 실패 메시지에 하드코딩되어 있던 일본어 "受信:" 라벨을 i18n 키로 수정)

### 완료 (3차 배치 7/N, content-depth-audit 브랜치에 커밋됨 — 커밋 28add7b)
time-zone-meeting-planner(버그도 수정 — 참여자 이름 미입력 시 도시 라벨을 공백 split(' ')[0]로 잘라 "New York"/"São Paulo"/"Los Angeles" 등이 첫 단어로 잘려 표시 + 추천 시간대 UTC 자정(23→0) wraparound를 그룹핑 로직이 처리 못해 하나의 연속 구간이 두 개로 쪼개져 표시 + 겹침 없음 안내 문구가 모든 언어에서 하드코딩 한국어로만 표시), image-color-extractor(버그도 수정 — k-means 유사 클러스터링에서 이미지의 고유색 수가 요청 색상 수보다 적으면 픽셀을 하나도 못 받은 "빈 군집"이 그대로 표시되어 동일 색상 중복 스와치 + 0.0% 유령 칩이 뜨던 문제, 동일 색상 병합 및 0카운트 군집 제거로 수정), open-graph-preview(버그도 수정 — meta content의 HTML 엔티티(&amp;amp; 등)를 디코딩 없이 그대로 다시 이스케이프해 "Coffee &amp;amp; Tea"처럼 이중 인코딩되어 보이던 문제 + FAQ는 "Twitter가 twitter: 태그 우선"이라 주장하면서 실제 미리보기 카드는 og: 값만 사용하던 불일치를 twitter:title/description/image 우선 사용하도록 구현)

### 완료 (3차 배치 8/N, content-depth-audit 브랜치에 커밋됨 — 커밋 d29aa3f)
pdf-word-counter(버그도 수정 — handleFile()에 try/catch가 없어 암호로 보호되거나 손상된 PDF를 열면 PDF.js getDocument().promise가 reject되면서 진행바가 0%에 멈춘 채 아무 안내도 없이 무한 대기하던 문제, try/catch + 명확한 에러 메시지로 수정. 콘텐츠에는 중국어/일본어처럼 공백 없는 언어의 "단어 수"가 PDF.js 텍스트 조각 경계 기준이라 실제보다 훨씬 적게 나온다는 한계도 명시), webhook-generator(버그도 수정 — FAQ는 GitHub/Stripe/Slack 세 플랫폼의 서로 다른 서명 방식을 설명하면서도 실제 코드는 항상 바디만 해시해 "sha256=..."로 표시, Stripe/Slack 템플릿을 선택해도 각 플랫폼의 실제 형식과 다른 값이 나오던 문제를 t=,v1=(Stripe)·v0=(Slack) 형식으로 실제 구현), avif-to-jpg(버그도 수정 — 투명 배경 AVIF를 JPG로 바로 인코딩하면 Canvas 기본 픽셀(0,0,0,0)에서 알파가 버려져 검은 배경으로 남던 문제, JPG 출력일 때만 흰색으로 캔버스를 미리 채우도록 수정 + 이 페이지에 있던 기존 static/JS seoHtml 불일치(가이드 링크 문단 누락)도 함께 수정)

## 3차 스캔 진행 현황 (2026-07-30 기준)

### 완료 (3차 배치 9/N, content-depth-audit 브랜치에 커밋됨 — 커밋 3eef1d6)
api-tester(버그도 수정 — DELETE 요청에 입력한 본문이 조용히 누락되던 문제(POST/PUT/PATCH만 허용) + CORS 오류 감지가 Chrome의 "Failed to fetch" 메시지 문자열에만 의존해 Firefox/Safari에서는 CORS 안내가 전혀 안 뜨던 문제, TypeError 전체를 잡도록 넓히고 CORS/네트워크 오류를 구분 못한다는 사실을 정직하게 안내하도록 수정), bcrypt-validator(버그도 수정 — 해시 형식 검사 정규식이 $2a$/$2b$만 허용해 PHP password_hash()가 기본 생성하는 $2y$ 해시를 "유효하지 않은 형식"으로 거부하던 문제, bcryptjs가 실제로는 $2y$를 정상 검증한다는 것을 직접 재현 확인 후 정규식 확장), regex-cheatsheet(버그도 수정 — 플래그 참조표에는 g/i/m/s/u/y 6개가 다 나오는데 실시간 테스터는 g/i/m/s 체크박스만 있어 u/y를 실습할 수 없던 격차를 체크박스 추가로 해소 + 길이 0 매칭 시 매칭 개수는 표시되는데 하이라이트가 안 보이는 동작을 FAQ에 정직하게 설명)

## 3차 스캔 진행 현황 (2026-07-30 기준)

### 완료 (3차 배치 10/N, content-depth-audit 브랜치에 커밋됨 — 커밋 ade1e22)
keyword-cannibalization-checker(버그도 수정 — normalizeKw()의 공백압축 정규식에 /g 플래그가 없어 스프레드시트 복사로 흔한 이중·삼중 공백이 있는 키워드는 진짜 동일 키워드인데도 충돌 미검출), bcrypt-generator(버그도 수정이자 이 세션 최대 발견 — bcrypt가 72바이트 초과분을 조용히 자르는데 한글은 1자=3바이트라 72바이트=한글 약 24자에 불과, 130바이트짜리 두 한글 비밀번호가 끝 4글자만 다른데도 완전히 같은 해시가 나오는 것을 bcryptjs로 직접 재현 확인 → 실시간 바이트 수 경고 추가), national-pension-calculator(기능 격차 수정 — FAQ는 지역가입자 전액부담을 설명하는데 계산기엔 근로자 4.75%만 있고 지역가입자 모드 자체가 없었음 → 체크박스 추가로 9.5% 전액부담 계산 지원 + "20년/30년 가입 시" 라벨이 실제로는 "현재+20/30년 추가"인데 "총 20/30년"으로 오해되게 표기되어 있던 것을 라벨 수정으로 해소. CLAUDE.md 연도별 점검 대상 파일 — 요율 9.5%/상한 659만원/하한 41만원은 이미 2026-07-08 갱신분과 일치, 추가 갱신 불필요)

## 3차 스캔 진행 현황 (2026-07-30 기준)

### 완료 (3차 배치 11/N, content-depth-audit 브랜치에 커밋됨 — 커밋 ca6cc35)
nanoid-generator(버그도 수정 — 커스텀 알파벳이 256자를 넘으면 Math.floor(256/n)*n=0이 되어 거부 샘플링의 accept 조건(byte<0)이 영원히 거짓이 되면서 무한루프로 탭이 멈추던 문제, 300자 알파벳으로 직접 재현 확인 후 256자 상한 + 경고로 수정), keyword-difficulty-estimator(버그도 수정 — intentMap을 만들어놓고 실제 렌더링에는 안 쓰고 원본 코드 r.intent를 그대로 출력해 "정보형" 대신 "info"/"nav"/"com"/"trans" 같은 내부 코드가 그대로 노출되던 문제), exif-viewer(버그도 수정 — ①GPSLatitude/GPSLongitude가 도·분·초 3개 유리수인데 readVal이 첫 번째 값만 읽어 GPS 좌표가 실제 위치와 크게 다르게 표시되던 문제, 합성 TIFF 버퍼로 직접 재현 확인, ②SRATIONAL(type 10) 값을 계산은 해놓고 return이 type===5 안에만 있어 음수 노출값(ExposureBiasValue 등)이 전부 "(binary)"로 표시되던 문제, ③FAQ가 "EXIF 없어도 파일명·크기·해상도 표시"라고 거짓 주장하는데 실제로는 그런 코드가 아예 없어서 진짜로 구현, ④이 파일에 원래부터 있던 FAQ 45개(9x5) 버그도 8개로 정리)

## 3차 스캔 진행 현황 (2026-07-30 기준)

### 완료 (3차 배치 12/N, content-depth-audit 브랜치에 커밋됨 — 커밋 8681810)
slug-generator(버그도 수정 — 악센트 문자(café, Zürich 등)를 단순 삭제해 "caf-zrich-nave"처럼 글자가 통째로 사라지던 문제, 유니코드 NFD 정규화로 악센트 결합기호만 제거하도록 수정해 "cafe-zurich-naive"로 정상 변환. 이 파일도 원래부터 FAQ 7개(35=7x5) 상태였던 것 8개로 정리), json-diff(버그도 수정 — FAQ는 "배열은 인덱스 기준으로 비교"라고 주장하는데 실제 코드는 배열을 재귀비교 대상에서 제외해 배열값이 하나라도 다르면 배열 전체를 통째로 하나의 "변경"으로 뭉뚱그려 표시하던 문제, 인덱스 기반 재귀 비교를 실제로 구현(중첩 배열·배열 속 객체 포함) + LCS 정렬이 아니라는 한계도 정직하게 명시), graphql-formatter(버그도 수정 — 문자열 인수 안에 #이 있으면(예: bio: "Loves #coding") 그 뒤 전체가 주석으로 오인되어 잘려나가던 심각한 버그, 문자열 리터럴을 처리 전 임시 자리표시자로 보호했다가 마지막에 복원하는 방식으로 수정, 콤마·중괄호·콜론이 문자열 안에 있어도 안전하게 처리됨)

### 완료 (3차 배치 13/N, content-depth-audit 브랜치에 커밋됨 — 커밋 8560a40)
hmac-generator(하드코딩된 한국어 문자열 2곳이 언어 무관하게 표시되던 버그 수정 + static/JS seoHtml 불일치(가이드 링크 문단 누락) 수정), uuid-generator(FAQ 12개 전체가 static HTML엔 빈 컨테이너뿐이고 JS renderFaq()로만 채워지던 CLAUDE.md 위반 사례 발견 — FAQ_DATA 기준으로 static 프리렌더 추가, 8개 표준 템플릿으로 축소하지 않고 기존 12개 유지), meeting-cost-calculator(통화 표시 버그 — en/zh/ja 라벨이 각각 $/元/円이라 주장하지만 실제 계산은 항상 만원 단위 원화로 처리 + 4개 언어 FAQ 예시 수치가 기본값으로 실제 계산한 결과와 전혀 다름(예: ko FAQ가 총비용 81,500원이라 했지만 실제론 162,500원, 연간 절감액도 42배 차이) — node로 직접 재현 후 라벨·수치 전부 수정)

### 완료 (3차 배치 14/N, content-depth-audit 브랜치에 커밋됨 — 커밋 085f705)
unicode-converter(버그는 없음 — UTF-8 바이트 인코딩·서로게이트 쌍 재조합 둘 다 node로 재현해 정상 동작 확인. 다만 이 감사 이전부터 있던 FAQ 45개(9x5) 카운트 버그를 8개로 정리하고 \uXXXX가 BMP까지만 표현 가능한 이유·ES6 \u{} 표기·UTF-8 hex 바이트 가변길이 등 실제 기술 디테일로 심화), heic-to-jpg(버그도 수정 — 결과 행 id를 파일명 기반 CSS.escape(name)으로 생성해 동일 파일명(다른 폴더의 IMG_0001.HEIC 등) 여러 개 변환 시 getElementById가 항상 첫 번째 요소만 반환해 두 번째 파일 행이 "변환 중..."에 멈춰 있던 문제, 카운터 기반 고유 id로 수정 + JPG 선택 시 다운로드 확장자가 MIME 타입을 그대로 split해 ".jpeg"로 붙던 것을 ".jpg"로 수정), transparent-background-maker(버그 2개 수정 — ①"PNG 다운로드"가 화면 표시용으로 360px로 축소된 미리보기 캔버스를 그대로 내보내 원본이 더 큰 이미지는 다운로드 시 조용히 저해상도로 축소되던 문제, 원본 naturalWidth/Height로 새 캔버스를 만들어 같은 연산을 재적용하도록 수정, ②"경계 부드럽게" 슬라이더가 자기 라벨 숫자만 갱신할 뿐 실제 이미지 처리에 전혀 연결되어 있지 않아 조작해도 아무 효과가 없었는데 FAQ는 이 슬라이더로 거친 경계를 고치라고 안내하던 문제, 알파 채널 전용 박스 블러(prefix-sum 기반 O(w·h))를 실제로 구현해 미리보기·다운로드 양쪽에 연결)

### 완료 (3차 배치 15/N, content-depth-audit 브랜치에 커밋됨 — 커밋 76ef699)
rsa-key-generator(버그도 수정 — usageSelect 드롭다운 옵션이 "서명 / Signing", "암호화 / Encryption"처럼 한/영 혼용 하드코딩이라 언어를 바꿔도 그대로 표시되던 문제, i18n 키 추가로 수정 + FAQ의 "동일한 OpenSSL 명령어"가 실제로는 버전에 따라 다른 걸 실제 openssl 3.x로 직접 검증(genrsa가 이제 PKCS#8 기본 생성, 1.x/-traditional에서는 PKCS#1)해 정정), sitemap-extractor(버그도 수정 — 파싱한 <loc> 값을 이스케이프 없이 innerHTML에 그대로 삽입해 사이트맵에 javascript: 스킴 URL이나 HTML 특수문자가 섞이면 클릭 시 실행되거나 레이아웃이 깨지는 DOM 삽입 취약점 발견, escapeHtml + http/https만 링크화 + rel=noopener로 수정 + alert/빈 결과 메시지 하드코딩 한국어 2곳도 i18n 처리), ulid-generator(이 세션 최대급 버그 — randPart 생성 로직의 bits 계산이 Math.min(8,...)로 항상 8에 클램프되어 매 flush마다 2글자만 인코딩, 결과적으로 16자여야 할 랜덤부가 4자뿐이라 전체 ULID가 26자가 아닌 14자로 생성되고 자신의 decodeULID()가 자기 출력을 "Invalid ULID"로 거부하던 문제를 node로 재현 확인, 실질 엔트로피도 80비트에서 약 20비트로 저하되어 있었음 — 10바이트를 5바이트씩 두 묶음(각 40비트→8자)으로 인코딩하도록 수정해 26자 ULID·decode 왕복 정상 확인)

### 완료 (3차 배치 16/N, content-depth-audit 브랜치에 커밋됨 — 커밋 244bdb4)
image-dpi-checker(버그도 수정 — XResolution/YResolution을 읽으면서 ResolutionUnit 태그(0x0128)를 전혀 확인하지 않아, cm 단위(3)로 기록된 파일은 실제 300 DPI인데 118 DPI로 잘못 표시되던 문제, 합성 JPEG+EXIF 버퍼로 재현 확인 후 cm→inch(×2.54) 변환 추가), serp-snippet-preview(버그 3개 수정 — ①모바일 미리보기 "3 min read"가 언어 무관 하드코딩 영어였던 것 i18n 처리, ②titleWarn/descWarn 문구가 4개 언어 전부 정의만 되고 실제로는 어디에도 쓰이지 않던 죽은 코드를 실제 경고 문구로 연결, ③샘플 텍스트의 도구 개수가 언어마다(334/335) 다르고 같은 언어 내 제목·설명끼리도 불일치하던 것을 "300+"로 통일. 이 파일도 원래부터 FAQ 45개(9x5) 상태였던 것 8개로 정리), text-encryptor(버그도 수정 — Caesar 암호 이동값 계산이 고정 오프셋(+26/+52) 방식이라 "1-25" 라벨과 달리 실제로는 범위 제한이 전혀 없는 shift 입력창에 25를 크게 벗어난 값(예: -30, 100)을 넣으면 알파벳이 아닌 깨진 문자가 나오고 복호화도 원문으로 안 돌아오던 문제를 node로 n=-60~60 전수 재현 후 확인, ((x%26)+26)%26 방식으로 교체해 임의의 정수 shift에서도 항상 정확히 왕복되도록 수정 + 0을 입력해도 3으로 강제 치환되던 falsy-zero 버그도 Number.isNaN 체크로 수정. 이 파일도 원래부터 FAQ 45개(9x5) 상태였던 것 8개로 정리)

### 완료 (3차 배치 17/N, content-depth-audit 브랜치에 커밋됨 — 커밋 2a59205)
pdf-ocr(버그도 수정 — 텍스트 레이어 유무를 첫 페이지 하나만 샘플링해 문서 전체에 적용하던 문제, 디지털 표지+스캔 본문처럼 혼합된 문서에서 페이지별로 잘못된 처리 방식이 적용되던 것을 페이지마다 개별 판정하도록 수정 + 상태 메시지 3곳("텍스트 레이어 감지...", "Tesseract.js 로드 중...", "완료!") 하드코딩 한국어를 i18n 처리), image-dimension-checker(버그 3개 수정 — ①파일명을 이스케이프 없이 innerHTML에 삽입해 sitemap-extractor와 동일한 DOM 삽입 취약점 존재, escapeHtml 추가, ②손상된 이미지 로드 실패 시 아무 피드백도 없이 조용히 사라지던 것을 에러 카드로 표시, ③확장자 없는 SVG 파일의 MIME 서브타입을 그대로 써서 "SVG+XML"로 표시되던 것을 "SVG"로 수정), lorem-ipsum-generator(버그도 수정 — 한국어 "단어" 모드의 KO_WORDS가 실제로는 긴 한글 문자열을 `.split('')`로 낱글자 144개로 쪼갠 배열이라 "가 지 하 마 러"처럼 의미 없는 음절 나열이 생성되던 문제를 node로 재현 확인, 실제 한국어 단어 배열로 교체해 "마음 새로운 빠른 넓은" 같은 정상 단어 생성 확인)

### 완료 (3차 배치 18/N, content-depth-audit 브랜치에 커밋됨 — 커밋 c2d6ca2)
sentence-counter(버그도 수정 — 문장 정규식이 종결부호로 끝나야만 매칭돼 마지막에 마침표 없는 문장(초안·채팅체에 흔함)이 문장 수·목록에서 통째로 빠지고도 단어 수에는 포함돼 "평균 단어/문장"이 크게 부풀려지던 문제, node로 "Hello world. This is unfinished" → 실제 2문장 5단어인데 1문장 5.0평균으로 나오는 것 재현 확인 후 종결부호 없는 마지막 조각도 문장으로 포함하도록 재작성(CJK 무공백 문장 분리는 회귀 없음 확인) + FAQ가 존재하지 않는 단락 수·줄바꿈 분리 옵션·Flesch-Kincaid 가독성 점수를 제공한다고 거짓 주장하던 것 발견, 단락 수는 실제로 구현(5번째 통계 카드 추가)하고 나머지 거짓 주장은 정직하게 수정), json-path-tester(이 세션 최대급 버그 — 자체 제작 JSONPath 토크나이저가 대괄호 앞이나 ".." 앞에서만 키 토큰을 밀어넣고 평범한 마침표 하나는 그냥 버퍼에 누적만 해서, 도구의 placeholder 예시이자 7개 예시 칩 중 6개인 `$.store.books[*].title`을 포함한 모든 다단계 경로가 빈 결과를 반환하던 문제, 심지어 가장 단순한 `$.store.name`도 실패, node로 재현해 "store.books"가 하나의 잘못된 합성 키로 취급됨을 확인 후 대괄호 밖 평범한 마침표에서도 매번 키를 flush하도록 토크나이저 재작성, 7개 예시 전부 정상 동작 확인), tailwind-color-generator(버그도 수정 — hexToRgb는 3자리 축약 HEX(#RGB)를 이미 지원하는데 입력 검증 정규식이 6자리만 허용해 #f0a 같은 유효한 CSS 축약형을 입력하면 조용히 아무 반응이 없던 문제, 3자리도 허용하고 6자리로 확장 후 네이티브 color picker에도 동기화하도록 수정 + head JSON-LD FAQ가 "입력 색상 기반 50-950 팔레트를 자동 생성"한다고 거짓 주장하던 것(실제로는 기존 고정 팔레트에서 가장 가까운 색만 찾음) 발견해 정정 + "10단계"라던 것도 실제로는 11단계(50~950)라 정정)

### 완료 (3차 배치 19/N, content-depth-audit 브랜치에 커밋됨 — 커밋 9514b69)
text-reverser(버그도 수정 — "각 단어 뒤집기" 버튼 라벨·FAQ 모두 "단어 내부 문자를 뒤집는다"고 명시하는데 실제 구현은 단어 배치 순서를 바꾸는 것("hello world foo" → "foo world hello")이라 라벨/문서와 정반대로 동작하던 문제, node로 재현 확인 후 단어 순서는 유지하고 각 단어 내부 문자만 뒤집도록(이모지 안전한 스프레드 방식 유지) 재작성 + head FAQ의 낡은(버그와 일치하던) 설명도 수정), ssh-key-generator(버그도 수정 — 생성되는 ssh-keygen 명령어의 -C/-f 값을 이스케이프 없이 큰따옴표 안에 그대로 삽입해, 코멘트에 큰따옴표가 포함되면(예: John "Desktop" Kim) 구문이 깨지고 $나 백틱이 들어가면 터미널에 붙여넣어 실행할 때 셸 확장까지 일어날 수 있던 문제, 백슬래시·큰따옴표·$·백틱을 이스케이프하는 헬퍼 추가), remove-empty-lines(head/body FAQ가 "연속 빈 줄 1개로 축소", "정확한 개수로 제한", "처음/끝만 제거" 3가지 기능을 제공한다고 주장했지만 실제로는 체크박스 1개(공백줄 포함 여부)만 존재하던 문제 발견, 가장 요청 빈도 높고 구현 범위가 명확한 "연속 빈 줄을 1줄로 축소" 옵션은 실제로 구현하고 나머지 2개(임의 개수 제한, 처음/끝만 제거)는 존재하지 않는다고 정직하게 FAQ 수정)

### 완료 (3차 배치 20/N, content-depth-audit 브랜치에 커밋됨 — 커밋 ea95ebc)
jpg-to-avif(버그도 수정 — addResult()가 파일명을 이스케이프 없이 innerHTML에 삽입하던 것을 escH()로 수정(image-dimension-checker와 동일 패턴) + head FAQ가 "Canvas API로는 품질을 직접 지정하기 어렵다"고 주장했지만 실제로는 50~100% 품질 슬라이더가 이미 toBlob 3번째 인자로 정상 전달되고 있어 정정), uuid-converter(버그도 수정 — 복사 버튼의 대기 상태 라벨을 `t.copied.replace('됨','')`로 한국어 접미사를 잘라내 만들던 방식이라 en/zh/ja에서는 치환이 안 먹혀 클릭 전인데도 "Copied"/"已复制"/"コピー完了"가 그대로 표시되던 문제, 별도 copyBtn 키 추가로 수정 + 한국어 FAQ에 일본어 조사 "や"가 섞여 있던 오타("ULIDやUUID v7")도 수정), remove-duplicate-words("순서 유지" 체크박스가 완전히 죽은 컨트롤이었던 것 발견 — node로 재현해 체크 여부와 무관하게 두 분기 모두 JS Set으로 중복 제거해 항상 첫 등장 순서로 출력됨을 확인(Set은 항상 삽입 순서 유지), FAQ는 "체크 해제 시 알파벳순 정렬"이라 주장했지만 실제로는 전혀 그렇지 않았음 — localeCompare 기반 알파벳 정렬을 실제로 구현해 체크박스가 실제로 다른 결과를 내도록 수정 + head FAQ의 "빈도순 정렬"·"불용어 제외" 등 존재하지 않는 기능 주장도 정정)

### 완료 (3차 배치 21/N, content-depth-audit 브랜치에 커밋됨 — 커밋 d2909ee)
jpg-to-heic(버그 2개 수정 — ①투명 PNG를 JPG로 출력할 때 캔버스 기본 투명 픽셀이 검게 나오던 avif-to-jpg와 동일한 문제, JPG 선택 시에만 흰 배경 채우도록 수정, ②addResult() 파일명 미이스케이프 innerHTML 삽입, escH() 추가), json-flattener(FAQ가 "빈 객체·빈 배열은 키를 생성하지 않고 건너뜀"이라 주장했지만 node로 재현해보니 실제로는 빈 컨테이너 자체를 값으로 저장함을 확인 — 오히려 이 동작이 역변환 시 원본을 정확히 복원하는 더 나은 설계라 판단해 코드는 그대로 두고 FAQ를 사실대로 수정 + 배열 속 배열(2차원 배열)은 재귀적으로 더 안 쪼개진다는 기존에 없던 실제 한계도 문서화), text-shuffler(문자 셔플 모드만 다른 두 모드(줄·단어)와 달리 올바른 Fisher-Yates 대신 `sort(()=>Math.random()-0.5)` 안티패턴을 쓰고 있어 FAQ의 "Fisher-Yates 사용" 명시적 주장과 모순되던 문제, node로 30만 회 몬테카를로 시뮬레이션 돌려 sort 방식이 원래 순서("abc")를 균등분포 대비 2배 이상 과다 생성하는 편향을 직접 확인 후, 이미 존재하는 올바른 shuffle() 함수로 통일해 균등분포 확인 + 존재하지 않는 "시드 고정" 기능 주장도 head FAQ에서 제거)

### 완료 (3차 배치 22/N, content-depth-audit 브랜치에 커밋됨 — 커밋 3bc805c, 5862fc1, 636814a)
css-gradient-generator(버그도 수정 — renderStopBar()가 update()에서 호출될 때마다(색상 스탑 드래그 중이면 mousemove 이벤트마다) window에 새 mousemove/mouseup 리스너를 계속 추가만 하고 기존 것은 절대 제거하지 않던 문제, 드래그 한 번에 리스너가 무한 누적되는 메모리 누수를 단일 전역 리스너 + 공유 _dragIdx 변수 방식으로 수정 + 기존에 없던 touchstart/touchmove/touchend도 추가해 FAQ가 이미 주장하던 "드래그로 위치 조정 가능"이 모바일에서도 실제로 동작하도록 함), json-to-yaml(버그도 수정 — 들여쓰기 select의 onchange가 입력창이 비어있어도 무조건 JSON.parse를 실행해 페이지 로드 직후 들여쓰기만 바꿔도 "파싱 오류: Unexpected end of JSON input"이 뜨던 문제, 빈 입력이면 조용히 결과만 비우도록 수정 + FAQ의 "null은 null 또는 ~로 표현"이 거짓이었음을 js-yaml 4.1.0 직접 설치해 확인(항상 null만 출력) 후 정정), prompt-optimizer(콘텐츠 정합성 버그 — zh/ja FAQ가 ko/en에 있는 "Q&A 프롬프트 팁" 항목이 아예 없고 그 자리에 zh/ja에만 있는 별개의 "작업 유형 선택법" 항목이 들어있어 4개 언어 FAQ 세트가 서로 달랐던 문제, zh/ja에 Q&A 팁을 번역 추가하고 이질적인 항목 제거로 5개 블록 모두 동일한 8개 항목으로 통일. 코드 자체는 버그 없음(순수 클라이언트 템플릿 조합기, textContent만 사용해 DOM 삽입 위험 없음) — "AI를 직접 호출하지 않는 템플릿 생성기"라는, 페이지 어디에도 명시 안 돼 있던 핵심 사실을 인트로에 추가)

### 완료 (3차 배치 23/N, 마지막 배치, content-depth-audit 브랜치에 커밋됨 — 커밋 f57a57c, 9fdd01a, 8b3ac1a, 2972736)
read-time-calculator(이 세션 최대급 발견 — head FAQ가 "한국어는 분당 약 500자 기준으로 계산"이라고 명시하는데 실제 코드는 언어 구분 없이 공백 기준 단어 수로만 계산해 중국어/일본어처럼 공백이 없는 텍스트는 전체 문단이 "단어 1개"로 잡혀 아무리 길어도 항상 "< 1m"로 표시되던 문제, node로 880자 중국어 텍스트가 항상 1단어로 집계됨을 재현 확인 후 CJK 문자 비율 40% 초과 시 글자 수/CPM 기반 계산으로 자동 전환하도록 구현(기본 200WPM일 때 정확히 분당 500자로 맞춰 FAQ 수치와 일치) + 프리셋 실제값(150/200/300/450)과 다른 head FAQ의 거짓 수치(150/250/350)·존재하지 않는 "이미지당 추가시간" 기능도 정정), csv-to-json(FAQ가 "007" 등 앞자리 0 값 손상 없이 숫자/불리언 자동 타입 변환 + 헤더 없음 옵션 + 0/2/4/탭 들여쓰기를 모두 제공한다고 주장했지만 셋 다 실제 코드엔 없었음 — 우편번호·전화번호 등 앞자리 0은 문자열로 보존하는 안전장치를 포함해 3개 기능 모두 실제 구현, 들여쓰기 select에 없던 0/tab 옵션도 추가), line-counter(FAQ 절반이 존재하지 않는 기능 주장 + 그 중 파일 업로드 기능은 같은 FAQ 리스트 안에서 "없다"/"있다"로 자기모순까지 있었음 — 빈 줄 제외 체크박스, 단어수/문자수 통계, FileReader 기반 파일 업로드(.txt/.md/.csv/.log/.json/.js/.py/.html/.css) 3개 기능을 실제 구현하고 구현 범위를 벗어나는 grep/패턴 필터링 주장만 정직하게 수정, 콘텐츠 작성 중 미이스케이프 아포스트로피로 발생한 JS 문법 오류도 node --check로 발견해 수정), ai-model-comparison(코드 버그 없는 순수 데이터 비교표 — FAQ가 "Google Gemini 시리즈는 무료"라고 뭉뚱그렸지만 실제 MODELS 배열은 Gemini 2.0 Pro만 free:false로 표시하고 있어 FAQ와 테이블 데이터가 모순되던 것을 발견해 정정, FAQ 10개(50=10x5)를 8개로 정리)

## 3차 스캔 진행 현황 — 700~1000자 구간 전체 완료 (2026-07-30)

**완료: 70개 / 70개** (batch 1~23, 전체 완료)
✅ json-schema-validator, ico-converter, image-prompt-generator, markdown-chat-exporter, xml-to-json, pdf-size-analyzer, hash-checker, regex-generator, prompt-template-generator, curl-generator, ngram-analyzer, json-schema-generator, png-to-svg, yaml-to-json, pdf-metadata-remover, curl-parser, text-similarity-checker, webhook-tester, time-zone-meeting-planner, image-color-extractor, open-graph-preview, pdf-word-counter, webhook-generator, avif-to-jpg, api-tester, bcrypt-validator, regex-cheatsheet, keyword-cannibalization-checker, bcrypt-generator, national-pension-calculator, nanoid-generator, keyword-difficulty-estimator, exif-viewer, slug-generator, json-diff, graphql-formatter, hmac-generator, uuid-generator, meeting-cost-calculator, unicode-converter, heic-to-jpg, transparent-background-maker, rsa-key-generator, sitemap-extractor, ulid-generator, image-dpi-checker, serp-snippet-preview, text-encryptor, pdf-ocr, image-dimension-checker, lorem-ipsum-generator, sentence-counter, json-path-tester, tailwind-color-generator, text-reverser, ssh-key-generator, remove-empty-lines, jpg-to-avif, uuid-converter, remove-duplicate-words, jpg-to-heic, json-flattener, text-shuffler, css-gradient-generator, json-to-yaml, prompt-optimizer, read-time-calculator, csv-to-json, line-counter, ai-model-comparison

**주의**: `grep -c 'class="faq-item"' 파일명`은 "매칭되는 줄 수"를 세는 것이라, ko/en/zh/ja seoHtml이 한 줄짜리 템플릿 리터럴로 저장된 파일에서는 실제 개수보다 훨씬 적게 나올 수 있음(예: 40개인데 5로 표시됨). 반드시 `grep -o 'class="faq-item"' 파일명 | wc -l`로 실제 occurrence 개수를 셀 것.

**주의 2**: 다국어 seoHtml 치환 파이썬 스크립트가 드물게 언어 블록을 뒤바꿔 쓰는 경우가 있었음(배치 18의 tailwind-color-generator 사례, 원인 재현 못함). 배치 19부터 4개 언어 블록 각각의 seoHtml 시작 부분을 적용 스크립트 안에서 매번 print로 직접 확인하는 방식으로 전환 — 이후 전 배치(19~23) 이상 없음.

**주의 3**: "실제로 없는 기능을 있다고 주장하는 FAQ"와 "존재하지만 아무 효과 없는 죽은 컨트롤/분기" 패턴이 이 700~1000자 구간 전체에서 가장 흔한 결함 유형이었음(10건 이상). 새 파일마다: (1) FAQ 각 항목이 설명하는 기능이 실제 UI/JS에 있는지 grep 대조, (2) 여러 모드/분기가 있으면 node로 각각 실행해 결과가 실제로 다른지 직접 비교, (3) 데이터 참조형 페이지(비교표 등)는 코드 버그 대신 FAQ 주장을 실제 데이터 배열과 대조. 문제 있으면 범위가 작으면 실제 구현, 크면 정직하게 FAQ 수정.

**주의 4 (배치 22~23에서 반복 발생)**: 딥닝 인트로 문단 영문 카피를 작성할 때 아포스트로피("it's", "doesn't", "aren't", "editor's")를 single-quote JS 문자열 안에 그대로 쓰면 `node --check`에서 즉시 SyntaxError남 — json-to-yaml, line-counter 두 파일에서 실제로 발생. 영문 카피 작성 시 처음부터 `\'`로 이스케이프하거나 축약형을 풀어 쓸 것("it is" 등), 그리고 4종 검증의 `node --check` 단계를 절대 생략하지 말 것(이번에도 이 단계가 실제로 잡아냄).

## 4차 스캔 (1000~1500자, worst-first) — 진행중

재스캔 결과(이미 완료한 1~3차 파일 제외): **111개**. 스캔 방법은 위와 동일, 범위만 `1000 <= len < 1500`. 이미 완료한 파일이 이 범위로 새로 들어온 경우(내용을 깊게 만들면서 글자수가 늘어난 자연스러운 결과) 재작업 대상에서 제외했음 — 이미 완료 목록(1~3차, 아래 "완료 파일 전체 목록" 참고)에 있으면 이 구간 스캔에서 나와도 건너뛸 것.

### 완료 (4차 배치 1/N, content-depth-audit 브랜치에 커밋됨 — 커밋 fa0e1db, 803c621, 02794d8)
image-to-pdf(버그도 수정 — JPEG 입력도 무조건 canvas에 그려 무손실 PNG로 재인코딩(embedPng)하던 것을, JPEG는 원본 압축 바이트를 그대로 pdf-lib embedJpg()로 직접 삽입하도록 수정해 화질 저하 없이 파일 크기 폭증도 방지(사진 콘텐츠는 PNG가 JPEG보다 압축 효율이 훨씬 낮음) + "품질 옵션 조절 가능"이라던 거짓 FAQ 주장 정정), dday(이 배치 최대 발견 — `new Date("2026-08-15")` 같은 날짜전용 문자열이 UTC 자정으로 파싱되는데 "오늘"은 로컬 자정으로 만들어 비교하던 문제, TZ=Asia/Seoul(한국 대상 사이트의 실제 사용자 시간대)로 재현한 결과 오늘 날짜를 목표일로 선택해도 D-0이 아닌 D-1이 표시됨을 확인 — 이는 페이지 자체 FAQ("당일은 D-Day(0)")와 정면으로 모순되고 diff===0일 때만 뜨는 "🎉 오늘!" 문구가 사실상 한국 사용자에게 절대 안 뜨던 상황, 연/월/일을 로컬 Date로 직접 구성하는 parseLocalDate()로 3곳 모두 수정 후 재검증), graphql-query-builder(FAQ가 예시로 든 "id: $userId → query($userId: ID!)"가 실제로는 모든 변수 타입을 무조건 String으로 하드코딩해 실제 출력이 예시와 전혀 다르던 문제, 인수 이름 패턴 기반 타입 추론(id로 끝나면 ID!, count/limit 등은 Int!, is/has 등은 Boolean!) 구현 후 FAQ의 자체 예시와 정확히 일치하는 출력 재확인)

### 완료 (4차 배치 2/N, content-depth-audit 브랜치에 커밋됨 — 커밋 8c49e75, 7ba1d41, c4ee2f7)
vat-calc(버그도 수정 — "부가세 (10%)" 결과 라벨에 id가 없어 0%(영세율) 선택해도 라벨은 항상 "10%"로 고정 표시되던 문제, id 추가 후 실제 vatRate로 갱신 + FAQ 중복 질문 2쌍(신고 시기, 간이/일반과세자 차이) 정리), svg-cleaner(이 배치 최대 발견 — 기본 켜진 "미사용 네임스페이스 제거" 옵션이 실제로는 사용 중인 xmlns:xlink 같은 선언까지 무조건 삭제하면서(참조는 그대로 남겨 XML 깨짐) 동시에 이미 존재하는 기본 xmlns=""를 조건 없이 하나 더 추가해 거의 모든 SVG에 중복 xmlns 속성을 만들던 문제, 프리픽스 실제 사용 여부를 검사해 정말 안 쓰는 선언만 제거하도록 수정 + 존재하지 않던 DOCTYPE/빈 그룹/XML 주석 제거 기능 실제 구현, FAQ 9→8개 정리), salary-per-hour-calculator(이 배치 최대 발견 — en/zh 필드 라벨은 "$"/"元"(원 단위 그대로) 입력을 암시하는데 실제 코드는 모든 언어에서 무조건 ×10,000(한국 "만원" 관례)을 적용하고 "₩" 접두사도 고정, 영어 사용자가 페이지 자체 FAQ 예시대로 80000(=$80,000/년)을 입력하면 "₩384,615"라는 완전히 틀린 결과가 나옴을 Node로 재현 확인 — 언어별 승수/통화 기호 테이블(ko·ja는 ×10000 만원/万円 관례, en·zh는 raw 단위) 도입 후 4개 언어 전부 자기 FAQ 예시와 정확히 일치하는 출력 재확인 + 한국 전용 최저시급 비교 위젯을 다른 언어에서 숨김 처리, FAQ 10→8개 정리)

### 완료 (4차 배치 3/N, content-depth-audit 브랜치에 커밋됨 — 커밋 bd2cf99, 1c70c02, 9d243da)
korean-age(dday.html과 동일한 UTC 자정 파싱 버그 — "태어난 지" 필드가 `new Date(val)` UTC 파싱과 로컬 자정 today 간 시차로 하루 적게 나오던 문제, parseLocalDate()로 수정 후 재검증 + 중복 FAQ(만나이 통일법 날짜 2번 질문) 1개를 실제로 검증한 윤년 2/29 생일 다음생일 자동 3/1 처리 동작으로 교체), discount-calculator(FAQ가 "3개 이상 중복 할인도 계산되나요?"에 공식만 답하고 실제 UI엔 할인율 입력칸이 2개뿐이던 것을 3번째 할인율 입력칸(선택, 빈 값=0%) 실제 구현해 탭 이름도 "이중"→"다중 할인"로 변경 + 중복 FAQ 2쌍 정리), alphabetizer(FAQ가 주장하는 "빈 줄 제거" 옵션이 실제로 존재하지 않아 실제 체크박스로 구현 + "대소문자 구분(Case-sensitive)" 별도 옵션이 있다는 주장을 실제로는 "대소문자 구분 없음" 단일 체크박스를 해제하는 방식이라고 정정 + 콘텐츠 심화 중 localeCompare가 중국어/일본어도 사전순 정렬한다고 과장할 뻔한 것을 Node로 직접 검증(한국어는 정확히 정렬되지만 로캘 미지정 시 중국어는 병음순 정렬 안 됨)해 기존 FAQ의 정직한 유니코드 순서 설명과 모순되지 않게 수정)

### 완료 (4차 배치 4/N, content-depth-audit 브랜치에 커밋됨 — 커밋 591ec62, 3ea14d7, c5e5bbf)
hashtag-generator(이 배치 최대 발견 — 단어 추출 정규식이 `[a-z가-힣]`뿐이라 중국어/일본어 UI까지 있으면서 실제로 중국어·일본어 텍스트를 붙여넣으면 매칭 0건으로 해시태그가 아예 생성되지 않던 문제, Node로 재현 확인 후 한자·히라가나·가타카나 유니코드 범위 추가(문장부호 기준 어구 단위로 추출, 진짜 분어절은 아님을 FAQ에 정직하게 명시) + FAQ가 주장한 "자주 등장하는 단어 우선순위"가 실제로는 첫 등장 순서였던 것을 빈도순 정렬로 실제 구현 + "인기 해시태그 자동 추천"·"플랫폼 선택 기능" 등 존재하지 않는 기능 주장 정정), json-to-csv(다운로드되는 CSV에 UTF-8 BOM이 전혀 없어 Excel 직접 열기 시 한글이 깨지는 고전적 문제를 FAQ는 "데이터 가져오기 사용" 우회법으로만 안내하던 것을, BOM 자동 첨부로 실제 해결 후 FAQ를 "더블클릭으로 바로 열림"으로 수정 + "컬럼 선택 가능" 거짓 주장을 실제 동작(객체마다 키가 달라도 합집합으로 헤더 구성, 없는 키는 빈 셀)으로 교체), remove-duplicate-lines("빈 줄 제거" 옵션을 켜면 total 카운트가 필터링 이후에 계산되어 "전체"·"제거됨" 통계가 원본 줄 수를 반영하지 못하던 문제, Node로 6줄 입력(빈줄2+중복1)이 4/1로 잘못 표시됨을 확인 후 total 계산을 필터 적용 전으로 이동해 6/3으로 수정)

### 완료 (4차 배치 5/N, content-depth-audit 브랜치에 커밋됨 — 커밋 8a8f430, 5f712a0, 96bbafa)
margin-calculator(손실 시나리오(원가>매출)에서 profPct가 음수로 계산되어 CSS width가 "-50%" 같은 무효값이 되던 엣지케이스 수정(Math.max(0,...) 클램프) + 중복/저가치 FAQ 2개 정리), rent-convert("가이드 가이드 보기" 중복 단어 오타 수정 + 페이지 내에서 법정 전환율 상한을 "기준금리+2%p"(2곳)와 "5.0% 또는 기준금리+3.5%"(FAQ 1곳)로 서로 다르게 주장하던 내부 모순 발견, 나머지와 일치하도록 통일 + rate 입력값 0 입력 시 parseFloat(...)||5 falsy 버그로 5%가 조용히 대입되던 문제를 Number.isNaN 체크로 수정), freelancer-rate-calculator(salary-per-hour-calculator와 동일한 통화 버그 재발견 — en/zh 라벨은 "$"/"元" 원단위를 암시하는데 실제로는 전 언어 ×10,000 고정 + "₩" 접두사 고정, Node로 EN 사용자가 60000(=$60,000/년) 입력 시 "₩600,000,000"이 나옴을 재현 확인, salary-per-hour-calculator와 동일한 언어별 승수/통화기호 테이블 도입으로 수정 + insightBox 결과 요약 문구가 언어 무관 하드코딩 한국어였던 것도 4개 언어 템플릿으로 수정, ko 경로가 페이지 자체 FAQ 예시(72,222원)와 정확히 일치함을 재확인)

### 완료 (4차 배치 6/N, content-depth-audit 브랜치에 커밋됨 — 커밋 6afb883)
break-even-calculator(버그도 수정 — BEP 판매 수량 결과에 언어 무관 한국어 단위 " 개"가 하드코딩되어 en/zh/ja에서도 "625 개"로 표시되던 문제, 언어별 unit 필드 추가로 수정 + FAQ 개수 불일치(ko/static 10개, en/zh/ja 8개)를 ko 전용 추가분(실제 계산 예시, 안전마진율)을 3개 언어에 번역 이식하고 범용 항목 2개를 전 언어에서 제거해 8개로 통일), cagr-calculator(버그도 수정 — 종료값에 음수를 입력하면 Math.pow(음수, 분수)가 NaN이 되어 "NaN%"이 그대로 표시되던 문제, ev<=0 검증 추가로 수정(기존 sv<=0과 동일 패턴) + break-even과 동일한 FAQ 8개 통일 작업(CAGR vs ROI, 3년 매출 예시를 3개 언어에 번역 이식)), find-replace(이 배치 최대 발견 — "줄바꿈 찾기"·"백레퍼런스" FAQ 답변에서 홑따옴표 JS 문자열 안의 \n과 \d가 각각 실제 개행문자로 치환되거나(설명 텍스트가 통째로 사라짐) 인식 안 되는 이스케이프라 백슬래시가 조용히 삭제되는 문제가 ko 하나가 아니라 4개 언어 전부에서 동일하게 발생하고 있었음(정적 프리렌더 블록은 이미 깨진 JS 출력을 그대로 복사해 옮긴 상태), \\n/\\d로 이스케이프 수정 후 static seoDiv를 수정된 ko 콘텐츠와 완전히 동일하게 재구성)

## 남은 93개 (worst-first, char count) — 다음 배치는 여기서부터 3개씩
```
1114  text-diff-checker.html
1128  business-days-calculator.html
1133  sql-formatter.html
1156  loan-calculator-en.html
1158  pdf-to-image.html
1158  timestamp.html
1167  apr-calculator.html
1171  text-cleaner.html
1177  ip-address-lookup.html
1183  split-calculator.html
1183  pixelate-image.html
1189  tip-calculator.html
1193  text-sorter.html
1195  pdf-split.html
1197  prepayment-fee.html
1199  salary-raise.html
1207  body-fat-calculator.html
1210  random-string.html
1212  water-intake.html
1218  electricity-cost-calculator.html
1241  image-to-webp.html
1241  age-calculator.html
1242  xml-formatter.html
1245  emoji-counter.html
1246  fuel-cost-calculator.html
1247  color-converter.html
1252  color-palette.html
1258  wpm-calculator.html
1258  sleep-calculator.html
1260  fire-calculator.html
1261  loan-payoff-calculator.html
1264  yaml-formatter.html
1266  salary-reverse.html
1266  ai-youtube-title-generator.html
1269  cron-generator.html
1270  inflation-calculator.html
1279  keyword-density-checker.html
1284  retirement-calc.html
1292  qr-code-generator.html
1294  website-speed-estimator.html
1303  base64-image.html
1303  credit-loan-limit.html
1305  payslip-calc.html
1307  sitemap-validator.html
1310  pace-calculator.html
1315  json-viewer.html
1315  pomodoro-timer.html
1317  jwt-generator.html
1330  pdf-page-counter.html
1330  macro-calculator.html
1332  pregnancy-due-date.html
1344  seo-title-generator.html
1349  favicon-generator.html
1349  health-insurance-calc.html
1350  mime-type-finder.html
1350  csr-generator.html
1352  pdf-compressor.html
1353  csp-validator.html
1354  api-response-viewer.html
1357  html-encoder.html
1360  meta-tag-analyzer.html
1360  json-validator.html
1367  sip-calculator.html
1381  htaccess-generator.html
1382  number-converter.html
1388  csv-viewer.html
1390  property-tax.html
1396  text-case-detector.html
1397  robots-txt-validator.html
1399  annual-leave.html
1401  yaml-validator.html
1403  user-agent-parser.html
1403  csp-generator.html
1404  json-minifier.html
1408  overtime-pay.html
1410  schema-validator.html
1412  weekly-holiday.html
1416  bmi-calc.html
1427  png-to-jpg.html
1427  hreflang-generator.html
1429  severance.html
1432  ai-token-counter.html
1446  prompt-formatter.html
1447  whois-lookup.html
1452  parental-leave.html
1456  csv-diff-checker.html
1462  stock-tax.html
1482  freelancer-tax.html
1483  commission-calculator.html
1486  dns-lookup.html
1488  severance-tax.html
1490  html-to-markdown.html
```
(1500자 이상은 이 구간이 끝나면 재스캔해서 다음 구간 산정)

## 새 컴퓨터에서 이어할 때 체크리스트
1. `git fetch && git checkout content-depth-audit && git pull`
2. 이 파일의 "남은 49개" 목록 맨 위 3개부터 시작 (다음 배치 시작점 표시 참고)
3. 파일마다: 코드 읽고 실제 버그/과장된 주장 찾기(가능하면 node로 직접 재현) → 없으면 진짜 기술적 디테일로 깊이 보강 → ko 정적 seoDiv 재작성 → JS _i18n.ko.seoHtml에 완전히 동일하게 미러링(정규식 특수문자는 백슬래시 2번 이스케이프 등 주의) → en/zh/ja 번역 → head FAQPage JSON-LD를 새 내용 기준 4개 항목으로 교체
4. 검증 4종 세트 (파일마다 필수):
   - `python3 -c "...json.loads(...)"` 로 JSON-LD 2개 블록 파싱 확인
   - `grep -o 'class="faq-item"' 파일명 | wc -l` → 반드시 40 (정적 8 + JS미러 8 + en 8 + zh 8 + ja 8). **`grep -c`는 쓰지 말 것** — 한 줄짜리 템플릿 리터럴 파일에서 줄 수만 세어 실제 개수보다 적게 나옴
   - `node --check` 로 스크립트 블록 문법 확인
   - node eval로 static seoDiv와 _i18n.ko.seoHtml 완전 일치(MATCH) 확인
5. 3개 끝나면 커밋 1개(버그 설명 포함 커밋 메시지) + 이 파일 업데이트 커밋 1개 + push
6. **주의**: FAQ 항목을 8개로 맞출 것 — 초안 작성 시 실수로 9개 쓰면 총 45개로 어긋남(과거 sql-minifier, curl-generator, curl-parser에서 실제로 발생했던 실수)

## 남은 참고 사항
- 700~1000자 파일 97개, 1000~1500자 227개 — 27개 끝나면 이 구간도 순차적으로 스캔/처리 검토 필요
- 중복 FAQ 답변(4개 파일 이상 겹침) 이슈는 대부분 해소됨 (언어 전환 안내 문구 정도만 남음, 문제 아님)
- 새 컴퓨터에서 이어할 때: `git fetch && git checkout content-depth-audit && git pull` 로 시작
- 파일 하나 끝날 때마다 체크: static seoDiv와 JS ko seoHtml 문자열 완전 동일한지 node eval로 확인, JSON-LD 유효성 확인, faq-item 개수(5개 언어 블록 x 8 = 40) 확인 — 검증 코드는 이 세션 대화 내 여러 번 사용한 패턴 참고
