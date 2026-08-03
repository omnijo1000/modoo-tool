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

## 4차 스캔 (1000~1500자, worst-first) — 완료

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

### 완료 (4차 배치 7/N, content-depth-audit 브랜치에 커밋됨 — 커밋 36469ea, 1541df7)
text-diff-checker(버그도 수정 — 줄 수 초과 경고가 언어 무관 하드코딩 한국어였던 것 i18n 처리 + 4개 언어 전부에서 마지막 FAQ가 "변경된 단어 수/문자 수까지 보여준다"고 거짓 주장(실제로는 추가/삭제/동일 줄 수만 표시)하던 것을 정정), business-days-calculator(이 배치 최대 발견 — new Date("YYYY-MM-DD")가 UTC 자정으로 파싱되고 getDay()는 로컬 타임존 기준으로 읽어, UTC보다 느린 모든 타임존(북중남미 전역)에서 요일이 하루 밀려 잘못 분류되는 문제를 TZ=America/New_York로 재현 확인(2026-01-05 월요일이 일요일/주말로 오분류) — dday.html/korean-age.html과 동일한 UTC 자정 파싱 버그 패턴, parseLocalDate() 헬퍼 도입 + toISOString() 기반 날짜 포맷터를 로컬 날짜 포맷터로 교체(계산 함수와 기본값 초기화 양쪽 모두) + 하드코딩 한국어 alert 2곳 i18n 처리), sql-formatter(이 세션 최대급 버그 — 압축(Minify) 기능이 전체 텍스트에 공백 뭉치 정규식을 그대로 적용해, `-- 주석`처럼 줄바꿈으로만 끝나는 주석이 있으면 압축 후 그 뒤의 FROM/WHERE 등 실제 쿼리 코드까지 전부 주석 안으로 삼켜버려 완전히 다른(깨진) SQL이 되던 문제를 재현 확인 + 문자열 리터럴 내부 공백도 같은 정규식에 훼손됨('John   Smith'→'John Smith') 확인, 이미 존재하는 tokenize()를 재사용해 문자열은 그대로 보존·주석은 제거·공백은 토큰 단위로만 축약하도록 minify() 재작성, FAQ에 주석 제거 동작 명시)

### 완료 (4차 배치 8/N, content-depth-audit 브랜치에 커밋됨 — 커밋 0f2c7a4, a7d07e0)
loan-calculator-en(이 배치 최대 발견 — 이 페이지는 title/meta/x-default hreflang이 전부 자기 자신을 가리키는 영어 우선/기본 버전 페이지(JS _detectLang()도 ko/zh/ja 신호 없으면 en으로 폴백)인데, JS 실행 전 정적 seoDiv가 ko 블록을 그대로 복사해 100% 한국어로 렌더링되고 있던 문제 — 크롤러·JS 미실행 사용자에게는 영어 타이틀·설명과 모순되는 한국어 본문이 노출됨, 정적 블록을 올바르게 수정된 en 콘텐츠로 교체. 별개로 EN FAQ 마지막 두 항목만 나머지 전부가 $USD 예시인 페이지에서 갑자기 "한국 시중은행"·원화(KRW) 예시로 전환되던 것을 발견, 중도상환수수료 항목은 국가/대출기관마다 다르다는 일반적 설명(미국은 수수료 없는 경우도 많음)으로, 금리 비교 예시는 실제 상환공식으로 재계산한 $300,000/USD 수치로 교체), pdf-to-image(이 세션 최대급 발견 — head JSON-LD·정적·4개 언어 FAQ 전부가 "모두 다운로드"를 누르면 ZIP으로 묶어 다운로드한다고 명시하는데 실제 코드에는 ZIP 라이브러리가 전혀 없고 downloadAll()은 setTimeout으로 0.2초 간격 개별 PNG 다운로드 n번을 순차 실행할 뿐임을 grep으로 직접 확인, 5곳 전부 실제 동작(개별 순차 다운로드, 브라우저에 따라 다중 다운로드 허용 팝업 가능성)으로 정정 + 페이지 렌더링/완료 상태 메시지가 언어 무관 하드코딩 영어("Rendering page X/Y...")였던 것 i18n 처리 + en 콘텐츠 수정 중 아포스트로피(page's)가 홑따옴표 JS 문자열을 깨던 것을 node --check로 발견해 수정(이 세션 반복 패턴)), timestamp(falsy-zero 버그 — tsToDate()가 `if(!val)`로 빈 입력을 판정해 타임스탬프 0(1970-01-01 UTC 자정, 유효하고 의미 있는 값)을 입력해도 빈 입력처럼 결과가 숨겨지던 문제를 Number.isNaN 체크로 수정(이 세션 반복 패턴: cps-calculator, stopword-remover, rent-convert 등과 동일) + FAQ가 5개 블록 전부 9개(45개)였던 것 발견 — "2038년 문제란?"과 "유닉스 타임스탬프는 2038년 문제가 있나요?"가 사실상 같은 32비트 오버플로우 설명을 중복 질문하고 있어 후자를 제거해 8개로 정리 + 정적 seoDiv에 JS ko와 달리 JWT 가이드 링크 문단이 누락되어 있던 static/JS 불일치(hmac-generator·avif-to-jpg와 동일 패턴)도 발견해 수정)

### 완료 (4차 배치 9/N, content-depth-audit 브랜치에 커밋됨 — 커밋 e642437, b2867ea, ed2a8dd)
apr-calculator(calcEAR() 결과 그리드 라벨("명목금리","월 환산")이 언어 무관 하드코딩 한국어였던 것 i18n 처리 + FAQ 8개 중 1번과 6번이 사실상 같은 "APR과 명목 금리 차이" 질문의 재구성 중복이었던 것을 발견, 6번을 도구 기본값(대출 1,000만원·수수료 10만원·월 20만원·60개월) 실제 계산 예시(APR≈8.13%, node로 Newton-Raphson 알고리즘 직접 재현 검증)로 교체), text-cleaner(줄바꿈 제거 옵션의 정규식 /\r?\n/g가 \n 없는 옛 Mac 방식 단독 \r 줄바꿈은 매칭하지 못해 방치되던 문제를 재현 확인했는데, FAQ는 정확히 "Mac(\r)" 형식도 지원한다고 명시하고 있어 자기모순 — /\r\n|\r|\n/g로 수정 + 해당 FAQ 5개 블록 전부에서 "Windows(\r\n)" 등 예시 텍스트가 홑따옴표 이스케이프 미흡으로 실제 개행문자로 렌더되어 괄호 안이 빈칸으로 보이던 문제(find-replace.html과 동일 패턴)도 함께 수정 + "여러 형식을 하나로 통일" 이라는 과장 표현을 실제 동작(완전 제거만 가능, 형식 유지 통일 기능 없음)에 맞게 정정), ip-address-lookup(이 세션 최고 심각도급 버그 — `let history = [...]`(IP 조회 히스토리 배열)가 스크립트 전역에서 `window.history` 객체를 가리는 바람에 toggleLang() 내부의 `history.replaceState(...)` 호출이 TypeError를 던져 언어 전환 버튼이 완전히 작동하지 않던 문제, Node로 동일한 셰도잉 재현 후 확인, 배열을 ipHistory로 리네임해 해결 + IPv6 정규식이 "::" 압축이 주소 맨 앞/맨 뒤에만 있을 때만 통과하고 중간 압축(가장 흔한 실사용 표기법)은 거부하던 문제 — 심지어 이 페이지 자신의 FAQ 예시 "2001:db8::1"조차 검증에 실패함을 확인, 압축 위치를 인식하는 올바른 검증 로직으로 교체)

## 완료 (4차 배치 10~17, 1183~1261자 구간)
split-calculator(sign 버그+통화/currency 하드코딩+스크립트 로드순서 crash 수정), pixelate-image(WYSIWYG 미리보기/다운로드 해상도 불일치 수정), tip-calculator(ja back-link 분기 누락+하드코딩 라벨 i18n 처리), text-sorter(자연정렬 미구현 실제 구현+Fisher-Yates 편향 셔플 수정), pdf-split(ZIP 거짓 주장 정정+하드코딩 alert i18n), prepayment-fee(요율 0% falsy 버그 수정), salary-raise(버그 없음, 검증만), body-fat-calculator(EN 우선 페이지 static 한국어 콘텐츠 수정), random-string(하드코딩 알림 문구 i18n), water-intake(버그 없음), electricity-cost-calculator(PRESETS_JA 누락+zh 프리셋 영문표기 수정), image-to-webp(버그 없음), age-calculator(UTC자정 파싱+스크립트순서 crash 수정), xml-formatter(minify가 CDATA/주석 훼손하던 버그 수정), emoji-counter(FAQ 45→8 정리), fuel-cost-calculator(단위전환 안 하고 값 초기화되던 버그+ja back-link 누락 수정), color-converter(8자리 hex/alpha 미지원 수정), color-palette(EN 우선인데 static 한국어 수정), wpm-calculator(타이핑속도 판정 로직 완전히 틀렸던 버그 수정), sleep-calculator(버그 없음), fire-calculator(Coast FIRE 65세 가정 미명시 보강), loan-payoff-calculator(하드코딩 alert/mo단위 i18n+extra payment null가드 추가)

## 완료 (4차 배치 18~38, 1264~1332자 구간)
yaml-formatter(yes/no/on/off가 js-yaml 4.x에선 실제로 boolean 아닌데 boolean으로 하이라이트하던 버그 수정), salary-reverse(FAQ 3곳이 서로 다른 틀린 숫자 주장 — 실제 계산값 4,530만원으로 통일), ai-youtube-title-generator(제목 유형 선택 완전히 무시되던 최대급 버그 수정+FAQ 정리), cron-generator(day-of-month 'L'이 매일 매칭되던 버그 — 진짜 월말만 매칭하도록 수정), inflation-calculator(미래모드가 나눗셈으로 계산돼 FAQ 예시와 정반대 결과 나오던 버그+EN페이지 static 한국어 수정), keyword-density-checker(CJK 텍스트 전체가 0단어로 집계되던 코어기능 붕괴 버그 수정), retirement-calc(은퇴나이>기대수명 검증 누락으로 마이너스 결과 나오던 버그 수정), qr-code-generator(WIFI QR 특수문자 미이스케이프 버그+FAQ 정리), website-speed-estimator(메타디스크립션 유무 표시 안 되던 누락 수정), base64-image(하드코딩 에러메시지 i18n), credit-loan-limit(헤드FAQ 2→4), payslip-calc(국민연금 상한액 구버전 수치 드리프트 수정), sitemap-validator(헤드FAQ 2→4, 네임스페이스 관련 오탐 후보 조사 후 반증), pace-calculator(버그 없음, 검증만), json-viewer(클립보드 거부 메시지 하드코딩 수정), pomodoro-timer(구글폰트 URL 오타 수정), jwt-generator(btoa가 비ASCII payload에서 크래시하던 버그+static/JS 콘텐츠 불일치 수정), pdf-page-counter(파일명 미이스케이프 XSS 취약점 수정), macro-calculator(탄수화물 음수 퍼센트 표시되던 엣지케이스 수정), pregnancy-due-date(UTC자정 파싱 버그 수정)

## 완료 (4차 배치 39~66, 1344~1408자 구간)
seo-title-generator(아포스트로피 있는 제목 복사버튼 완전히 깨지던 버그 — encodeURIComponent도 아포스트로피 안 이스케이프한다는 것 발견, ai-youtube-title-generator에도 동일 버그 있어 같이 수정), favicon-generator(비정방형 이미지가 찌그러져 저장되던 버그 — 중앙 정방형 크롭 추가), health-insurance-calc(버그 없음, 검증만), mime-type-finder(MIME→확장자 역검색이 부분일치 확장자들을 전부 첫 검색결과 MIME타입인 것처럼 잘못 묶어 표시하던 버그 수정), csr-generator(OpenSSL -subj 커맨드 인젝션 취약점 수정), pdf-compressor(DPI→scale 변환식이 72 아닌 96으로 나눠 모든 DPI설정에서 실제 해상도·출력물리크기가 항상 75%로 축소되던 버그), csp-validator(default-src 있음/없음 자기모순 메시지+frame-ancestors 폴백 스펙오류 수정), api-response-viewer(querySelector('parseerror') 오타로 XML에러 감지 자체가 죽어있던 버그), html-encoder(미리보기 innerHTML XSS 취약점을 sandboxed iframe으로 수정+폰트URL오타), meta-tag-analyzer(http-equiv 방식 charset 선언 감지 못해 SEO점수 부당 감점되던 버그), json-validator(클립보드 거부 메시지 하드코딩 영어 수정), sip-calculator(이율0% NaN버그+EN페이지 static 한국어 수정), htaccess-generator(RewriteRule 정규식 미이스케이프로 오매칭·500에러 가능하던 버그), number-converter(진법 검증이 parseInt 자릿수 잘라먹기로 우회되던 버그), csv-viewer(버그 없음, 헤드FAQ 언어혼용만 수정), property-tax(타이핑 중 계속 뜨는 alert()+재산세율 팩트 오류 수정), text-case-detector(FAQ가 거짓 예시로 자기모순 나던 것 수정), robots-txt-validator(빈 Disallow 반대동작+와일드카드 미지원 버그), annual-leave(이 배치 최대급 발견 — `years=Math.floor(totalDays/365)`로 근속연수를 계산해 윤년 누적 오차 때문에 실제 입사기념일보다 하루 일찍 다음 해로 승급되는 버그, 5개 입사일×15년을 매일 스캔해 161건의 날짜 불일치 확인(전부 12/30~31 발생) — 구체 사례: 2000-01-01 입사자가 2000-12-31에 조회하면 만1년 미달(11개월)이라 법정 11일이어야 하는데 15일로 표시(4일 과다지급), 매년 반복. getFullYear/Month/Date 기준 진짜 달력 비교로 재작성 후 재검증 0건 불일치. 별도로 UTC자정 new Date() 파싱 버그도 동시 수정. 발견만 하고 안 고친 것: hreflang이 en/zh/ja 가리키는데 실제 i18n 시스템 자체가 없어 그 언어들도 전부 한국어 콘텐츠 그대로 나감 — 4개국어 번역 새로 만드는 큰 작업이라 스코프 밖으로 플래그만), yaml-validator(yaml-formatter와 동일한 Norway Problem 거짓 FAQ 주장 수정), user-agent-parser(Safari 버전이 WebKit빌드번호로 오검출되던 버그), csp-generator(meta태그에 무효한 frame-ancestors 그대로 포함시켜 클릭재킹 방어 안 되는데 되는 것처럼 보이던 버그), json-minifier(언어전환 시 성공상태인데 idle텍스트로 덮어써지던 버그), overtime-pay(버그 없음, 근로기준법 공식 전부 검증)

**주의 5**: 병렬 fork subagent로 4개씩 동시 처리하는 방식으로 전환(배치 39 이후) — 결과는 동일한 4종 검증 기준 유지, fork마다 독립 파일이라 충돌 없음.

## 완료 (4차 배치 67~83, 1410~1490자 구간, 마지막 배치)
schema-validator(@context가 문자열 아닌 객체/배열이면 .includes() 호출로 검증기 자체가 크래시하던 버그 — 재귀 헬퍼로 문자열/배열/객체 다 처리), weekly-holiday(이 배치 최대급 — holidayHours를 실제 "주 근무일수" 입력 무시하고 항상 ÷5로 고정계산, 4일근무 시 실제보다 20% 적게, 6일근무 시 20% 많이 지급되던 버그, 데모기본값이 마침 5일이라 안 걸렸던 케이스), bmi-calc(툴팁은 "남성×0.9/여성×0.85" 성별차등 Broca공식이라 명시하는데 실제 코드는 성별무관 단일 BMI공식이라 성별 바꿔도 결과 불변이던 버그+FAQ 7/7/7/6/6→8×5 정리, 성별·활동량 라디오버튼 미번역 갭 발견만), png-to-jpg(파일명 미이스케이프 XSS+static/JS 콘텐츠 불일치, 투명배경 버그는 이 파일은 원래 정상이었음 확인), hreflang-generator(HTTP헤더 출력탭에 HTML용 이스케이프 그대로 써서 쿼리스트링 있는 URL이 &amp;amp;로 이중이스케이프되던 버그), severance(평균임금 분모를 91일 고정 사용, 실제로는 89~92일 사이 변동하는 정확한 달력일수 써야 함 — 2026-09-01 퇴직 예시로 약 97,000원/1% 오차 확인 후 실제 달력일수 계산으로 수정), ai-token-counter(FAQ 자체 예시 "Hello=1토큰"이 실제 코드 돌리면 3토큰 나오는 자기모순, FAQ 9×5=45→8×5=40 정리), prompt-formatter(헤드FAQ가 "프롬프트 저장/재사용 가능"이라 주장하는데 본문FAQ는 정확히 반대로 "저장기능 없음"이라 명시하던 자기모순), whois-lookup(다른 필드는 다 escHtml() 적용했는데 네임서버 목록만 이스케이프 누락), parental-leave(제목/메타는 "2026년 기준"인데 본문은 "2024년 기준"이라던 자기모순(같은 수치)을 본문 기준으로 통일, FAQ의 상한액 고정 250만원 주장이 실제 200→250→300만원 단계상승과 다르던 것도 수정 — ⚠️ 실제 최신연도 수치 재검증 권장), csv-diff-checker(CSV 셀값·헤더가 그대로 innerHTML 삽입되던 XSS, FAQ 11/11/11/8/8→8×5 정리), stock-tax(UI에 없는 "비상장 대주주 25%" 세율을 요약박스가 주장하던 것 정직하게 수정, 나머지 계산은 자체 FAQ예시로 검증 정상), freelancer-tax(SEO본문 예시 수치가 실제 계산과 거의 2배 차이(14만원 주장 vs 실제 환급 25.7만원), 표현 자체도 "세부담...환급"으로 모순), commission-calculator(FAQ 안에서 요율범위 자기모순(0.4~0.9% vs 실제 0.4~0.6%), 계산로직은 검증 정상, FAQ 11/11/11/8/8→8×5 정리), dns-lookup(whois-lookup과 동일 패턴 — name/type 필드 이스케이프 누락 + "ALL 조회 시 8종류"라 광고하면서 실제론 SOA/PTR 빠진 6종류만 조회하던 버그), severance-tax(이 세션 최대급 발견 — 환산급여공제 구간표 자체가 완전히 다른/구버전 표를 쓰고 있어 자체 FAQ 예시(실효세율 4~6%)로 검증 시 실제로는 10.65% 나옴(2배 이상), 웹서치로 국세청 공식표 확인 후 수정하니 4.26%로 FAQ 범위 안에 정확히 들어감, FAQ 산수오류(2,475만원→실제 2,750만원)도 수정), html-to-markdown(마지막 파일 — ①FAQ는 중첩 목록이 "한 단계로 평탄화"된다고 주장하지만 실제 코드는 중첩 목록을 통째로 스킵해 데이터 완전 삭제, 진짜 들여쓰기 유지 중첩리스트 변환 구현, ②붙여넣은 HTML을 detached div에 innerHTML로 삽입 — DOM 미부착 상태에서도 <img onerror>는 즉시 실행되는 XSS 벡터, DOMParser로 교체해 원천 차단, 헤드FAQ 언어혼용도 정리)

## 4차 스캔(1000~1500자, 83개) 전체 완료 (2026-07-30)
worst-first 83개 파일 전부 처리 완료.

## 5차 스캔 (1500자 이상, worst-first) — 진행중

1500자 이상 148개 파일 중 68개는 이미 완료 처리된 파일이 내용 심화로 글자수만 이 구간에 새로 들어온 경우라 제외. 배치 1~9(unicode-inspector, webp-to-png, realestate-fee, base64-decoder, html-decoder, apache-config-generator, character-counter, profit-calculator, nginx-config-generator, salary, chatgpt-token-counter, prompt-variable-extractor, four-insurance, uuid-validator, canonical-tag-checker, pdf-metadata-viewer, ssl-checker, salary-negotiation, ssl-decoder, open-graph-generator, http-header-checker, url-decoder, cron-parser, minimum-wage, ascii-converter, cors-header-checker, base64-encoder, twitter-card-generator, health-insurance) 완료. **남은 51개, url-encoder.html부터 시작.**

### 완료 (5차 배치 1/N, 1500~1509자 구간)
unicode-inspector(코드포인트 통계 라벨이 "고유값(중복제거)"이라는 걸 안 밝혀서 "3글자,3바이트,1코드포인트"처럼 집계 오류로 보이던 문제, "고유 코드포인트"로 라벨 명확화, 서로게이트쌍/이모지 UTF-8 처리는 검증해서 정상, FAQ 11/11/11/8/8→8×5 정리), webp-to-png(파일명 미이스케이프 XSS, 투명배경은 PNG출력이라 원래 정상), realestate-fee(SEO본문이 완전히 지어낸 요율표(매매 0.4/0.5/0.9%)를 쓰고 있었는데 실제 코드·화면표·FAQ는 전부 서로 일치하는 진짜 공식 U자형 요율을 쓰고 있어 본문만 따로 놀던 문제, 본문을 실제 요율로 수정), base64-decoder(샘플 버튼의 하드코딩 Base64 문자열이 깨져있어 주석이 주장하는 원문과 다른 내용으로 디코딩되던 버그, 6곳 전부 올바른 문자열로 교체 + static/JS 콘텐츠 불일치(가이드링크 누락) 수정, UTF-8 디코딩 경로 자체는 검증해서 정상)

### 완료 (5차 배치 2/N, 병렬 fork 3개, 1512~1524자 구간)
html-decoder(엔티티 개수 카운트가 실제로 디코딩되지 않는(존재하지 않는) 엔티티 형태 문자열까지 세어 과다 집계하던 버그, 정규식 검증 후 head FAQ 8→4 정리), apache-config-generator(버그 없음, SSL+PHP 분기 로직 Node로 검증해 정상 — FAQ 명령어 전부가 Debian/Ubuntu(a2enmod 등) 전제이고 RHEL/CentOS 대응이 전혀 없던 것을 발견해 실제 기술 깊이로 보강, head FAQ 2→4), character-counter(페이지 로드마다 발생하던 ReferenceError(스크립트 실행 순서 버그) 수정 + 일본어 로케일 자동감지 누락 + 이모지 카운트 FAQ 자기모순 수정)

### 완료 (5차 배치 3/N, 병렬 fork 3개, 1525~1527자 구간)
profit-calculator(`_ph` 플레이스홀더 키 미정의로 항상 빈 값 표시되던 버그 수정 + static/ko/en 11개 vs zh/ja 8개(내용도 다름) FAQ 불일치를 5블록 전부 동일 8개로 통일), nginx-config-generator(버그 없음, 토글+HSTS/SSL 게이팅 로직 Node 검증 — apache-config-generator와 동일한 Debian/RHEL 경로 표기 격차 발견해 콘텐츠 보강, head FAQ 2→4), salary.html(FAQ 3곳의 예시 수치(5000만/1억/3000만 연봉)가 Node로 재계산한 실제 결과와 7~17% 차이나던 것 수정, head FAQ 5→4)

### 완료 (5차 배치 4/N, 병렬 fork 3개, 1535~1547자 구간)
chatgpt-token-counter(버그 없음, CJK 정규식+토큰 공식 Node 검증 — 영어 100자→25토큰, 한국어 100자→250토큰으로 자체 FAQ 주장과 일치 확인, head FAQ 8→4 정리), prompt-variable-extractor(이 배치 최대 발견 — `[변수]` 대괄호 추출 패턴이 마크다운 링크 `[text](url)`와 인용 `[1]` 등을 변수로 오인해 Apply 시 실제 콘텐츠가 조용히 삭제되던 데이터 손실 버그, Node로 재현 확인 후 패턴 제거(실제 템플릿 시스템 중 순수 `[]` 변수 문법 쓰는 곳 없음을 자체 FAQ로도 확인) + zh/ja가 static/ko/en(11개)과 다른 8개를 쓰던 FAQ 불일치를 5블록 동일 8개로 통일), four-insurance(사업장 규모 선택 셀렉터가 calc()에 전혀 연결 안 돼 있던 죽은 컨트롤(자체 FAQ는 규모별 고용보험율 차등을 주장) 수정 + FAQ 예시 수치가 실제 계산값과 최대 28% 차이나던 것 수정)

### 완료 (5차 배치 5/N, 병렬 fork 3개, 1548~1557자 구간)
uuid-validator(이 배치 최대 발견 — 버전 정규식이 1-5만 허용해 2024년 RFC 9562로 표준화된 v6/v7/v8을 전부 "invalid"로 거부하던 버그, 자체 FAQ는 DB PK용으로 v7을 추천하면서 정작 v7 UUID를 넣으면 무효 판정하던 자기모순 — [1-8]로 확장 후 v1/v4/v6/v7/v8 통과·v9/nil UUID는 여전히 거부됨을 재검증), canonical-tag-checker(상대경로 canonical URL 입력 시 HTTPS/HTTP 체크 항목이 조용히 아무 피드백 없이 사라지던 문제 수정 + trailing-slash 체크 라벨이 언어 무관 하드코딩 영어였던 것 4개 언어 i18n 처리, head FAQ 3→4), pdf-metadata-viewer(추출한 PDF 메타데이터(Title/Author 등)가 이스케이프 없이 innerHTML에 삽입되던 XSS 취약점 수정 + zh/ja FAQ가 static/ko/en 대비 실질 항목 3개 누락돼있던 콘텐츠 불일치 수정)

### 완료 (5차 배치 6/N, 병렬 fork 3개, 1565~1588자 구간)
ssl-checker(**live crt.sh 데이터로 검증한 버그** — API가 타임존 없이 항상 UTC로 타임스탬프를 반환하는데 `new Date(...)`가 로컬시간으로 오파싱, KST 기준 만료일이 실제보다 하루 빠르게 표시되던 문제(2026-10-28T06:30:21 UTC → KST에서 10-27로 표시) 3곳(daysUntil/formatDate/isExpired) 전부 `toUtcDate()`로 수정 + 죽은 변수 제거), salary-negotiation(오래된 국민연금 상한액 하드코딩 + 과세표준 예시가 실제 세율 구간과 안 맞던 문제 수정), ssl-decoder(SAMPLE_PEM이 잘못된 base64(695자, %4≠0)라 자체 "샘플" 버튼이 즉시 에러나던 버그를 실제 openssl로 인증서 재생성해 수정 + PUBLIC KEY를 개인키로 오분류해 `openssl rsa` 명령을 잘못 추천하던 버그(실제 openssl 실행으로 재현·검증, `openssl pkey -pubin`이 정답) 수정, head FAQ 2→4)

### 완료 (5차 배치 7/N, 병렬 fork 3개, 1602~1609자 구간)
open-graph-generator(버그 없음, 실제 페이로드로 이스케이핑/XSS Node 검증 + datetime 변환 정상 확인, 이미지 width/height 짝 필수 요건·로컬→UTC 변환 등 미문서화 실동작으로 콘텐츠 심화), http-header-checker(HSTS `max-age=0`이 RFC 6797상 HSTS 비활성화를 의미하는데도 헤더 존재 여부만 보고 "통과"로 표시되던 버그, 값까지 검사하도록 수정), url-decoder(decodeURIComponent/decodeURI가 "+"를 공백으로 변환 안 하는 폼/쿼리스트링 흔한 함정을 Node로 확인, 기본 꺼짐 옵션 체크박스 추가해 %2B에서 온 진짜 +는 보존하면서 원시 +만 공백 변환하도록 구현)

### 완료 (5차 배치 8/N, 병렬 fork 3개 + fork 자체판단 보너스 1개, 1611~1644자 구간)
cron-parser(이 배치 최대 발견 — day-of-month/day-of-week 필드를 AND로 결합해 둘 다 값이 있으면 동시 만족해야만 매칭되던 버그, 자체 FAQ가 명시하는 Vixie cron OR 규칙("15일 또는 매주 월요일")과 정반대로 동작 — Node로 "0 0 15 * 1"이 1년간 2건만 매칭됨을 재현 확인 후 올바른 OR 로직으로 수정, 매주 월요일+15일 전부 정상 매칭 재검증), minimum-wage(2026년 최저시급 10,320원 웹서치로 재확인(정상) + 마침 2026-07-14 최저임금위원회가 이례적으로 이미 2027년 시급(10,700원, +3.7%)을 의결한 것을 발견해 반영, 3번째 연도 버튼 추가 과정에서 `currentWage===10320?'2026':'2025'` 식 이진 삼항연산자가 2027 선택 시 "2025년"으로 라벨 오표시하던 버그도 함께 발견해 수정 + 주휴수당 공식이 실제로는 근무시간 무관하게 "하루치 임금"으로 대수적으로 축약돼 8시간×5일 기본값 외엔 틀리던 버그(18시간/주 알바 67% 과다지급 등) + 월급 환산이 반올림 없는 연속소수 계산이라 페이지 자체가 강조하는 209시간 기준 2,156,880원과 불일치하던 버그 수정), ascii-converter(textToAscii()가 비ASCII 문자(한글·이모지)를 걸러내지 않고 UTF-16 코드유닛 그대로 변환해 자체 FAQ의 "ASCII 전용" 주장과 모순되던 버그, 127 이하 범위 필터 추가로 수정), cors-header-checker(fork가 배치 범위를 벗어나 자체 판단으로 추가 처리 — Access-Control-Allow-Methods를 프리플라이트 불필요한 simple request에도 동일 적용해 정상 요청을 BLOCKED로, 반대로 프리플라이트 필요한데 헤더 자체가 없는 경우를 SUCCESS로 오판정하던 CORS 스펙 위반 버그 + 헤더 값 미이스케이프 XSS 수정)

### 완료 (5차 배치 9/N, 병렬 fork 3개, 1659~1688자 구간)
base64-encoder(파일명 라벨 하드코딩 한국어 + "Web Crypto API로 SHA 해시도 지원" 등 존재하지 않는 기능 거짓 주장 수정), twitter-card-generator(이 배치 최대 발견 — "app" 카드 타입 선택해도 generateCard()가 카드 타입 무관하게 항상 같은 일반 태그만 출력하고 twitter:app:id:iphone/googleplay 입력 필드 자체가 UI에 없어 자체 FAQ의 "app 카드 필수 태그" 주장과 정면 모순되던 버그, Node 재현 후 두 입력 필드 추가+연결로 실제 구현), health-insurance(fmtW() 헬퍼가 만원 단위로 반올림하면서 6곳에서 "만원" 접미사를 중복 부착해 "-11만원만원" 식으로 깨져 표시되던 버그, 원 단위 정밀 fmtWon()으로 교체 후 자체 FAQ 예시(107,850원/14,171원/122,021원)와 정확히 일치 재검증, 요율(7.19%/3.595%/13.14%/208.4원) 전체 일관성도 확인)

### 완료 (5차 배치 10/N, 병렬 fork 5개, 1688~1753자 구간)
url-encoder(버그 없음 — encodeURIComponent/encodeURI 이중인코딩·UTF-8 바이트 변환 node 검증 정상, zh/ja에 encodeURI 예약문자 설명 문단이 누락돼있던 콘텐츠 격차만 보강), national-pension.html(national-pension-calculator.html과는 별개 ko-only 파일 — salary/age/years 입력 `parseInt(...)||default` falsy-zero 버그로 0 입력 시 기본값(300만원/30세/30년)으로 조용히 대체되던 문제 수정, 요율 9.5%/상한 659만원/하한 41만원은 이미 최신 확인), case-converter(버그 없음 — FAQ가 5블록 전부 10개(50개)로 표준 초과하던 것을 저가치 UI질문 2개 제거해 8×5=40 정리), unemployment.html(unemployment-benefit.html과는 별개 ko-only 파일 — avgSal `parseFloat(...)||3000000` falsy-zero 버그 수정 + FAQ 중복 2개를 실제 기술 디테일(피보험단위기간·7일 대기기간·비과세·조기재취업수당)로 교체, "신청기한" 결과가 오늘=퇴직일 가정 근사치임을 라벨에 명시), time-calculator(이 배치 최대 발견 — 야간근무시간(22~06시) 계산이 시작시각만 보고 자정 넘어가는 구간을 판정해 22:00~06:00 근무(전체 야간, 480분이어야 함)가 120분으로 과소계산되고 00:00~05:00류는 반대로 과다계산되던 버그, 급여 야간수당 영향 있음 — 3구간 overlap 합산 방식으로 재작성 후 5개 케이스 node 재검증, FAQ 11/8 불일치도 8개로 통일)

**남은 46개, url-encoder·national-pension·case-converter·unemployment·time-calculator 완료 처리.**

### 완료 (5차 배치 11/N, 병렬 fork 5개, 1772~1806자 구간)
color-contrast-checker(이 배치 최대 발견 — 3자리 축약 HEX(#f0a 등)를 확장하는 padHex() 헬퍼가 이미 있었는데 검증 정규식이 6자리만 허용해 조용히 무시되던 죽은 헬퍼 패턴(tailwind-color-generator와 동일), 3자리 허용+연결로 수정 + swap 버튼 하드코딩 영어 i18n 처리 + en/zh/ja에 없던 FAQ 2개(명암비 공식, WCAG 1.4.11) 번역 추가해 5블록 10개로 통일, head 8→10), ai-cost-calculator(head FAQPage가 "호출당비용×일일호출×30"이라 설명하는데 실제 코드는 monthly=cost*calls(월간 호출수 직접 사용)라 본문 FAQ와 모순되던 것 수정 + FAQ 9→8 정리, 모델 가격표는 공식 가격 대조 결과 전부 정확), pdf-merge(파일명 미이스케이프 XSS 수정 + head FAQ 거짓 주장 2건(부분페이지 병합 가능·압축옵션 존재, 둘 다 실제 코드에 없음) 정정 + FAQ 12→8 정리), xml-validator(버그 없음, parsererror 스펠링 정상·XSS 위험 없음 확인 — head FAQPage 2→4개 확장만), working-days-calc(이 배치 최대급 — HOLIDAYS_2026에 근로자의 날(5/1)이 잘못 공휴일로 포함돼 영업일 계산에서 제외되던 버그, 관공서 공휴일 규정상 근로자의 날은 공휴일 아님(관공서 정상 운영) 확인 후 제거, node로 4/30~5/4 구간 2일→3일 정정 재확인 + 제헌절/설날·추석 대체공휴일 웹서치 팩트체크(둘 다 기존 서술 정확, 애매한 총량 수치만 삭제), 2027년 공휴일 데이터는 아직 없음(연초 갱신 대상, 현재는 안 급함), FAQ 10→8, ko-only 페이지)

**남은 41개, inheritance-tax·utm-builder·sitemap-generator·capital-gains-tax·cheongyak-score 완료 처리.**

### 완료 (5차 배치 12/N, 병렬 fork 5개, 1814~1854자 구간)
inheritance-tax(세율표 5단계(10~50%) node 9케이스 대조 정확 확인, 버그 없음 — 배우자공제가 법정상속분 미계산 근사치·사전증여 이중과세공제 미반영이라는 실질 한계를 정직하게 FAQ에 명시), utm-builder(FAQ가 "모든 UTM값 자동 소문자화"라 주장하는데 실제론 term/content엔 sanitize() 미적용이던 문제 수정(코드를 문서에 맞춤) + head/본문 QR예시가 같은 "qr_code" 문자열을 서로 다른 파라미터에 넣던 자기모순 통일), sitemap-generator(todayStr()이 UTC 날짜 반환해 KST 자정~오전9시 사이 lastmod가 하루 이르게 나오던 버그, 로컬 날짜 조합으로 수정 — 나머지 escXml/50000URL 스펙 등은 이미 정확), capital-gains-tax(이 배치 최대급 — ①주택 단기보유세율 1~2년 구간이 40%로 되어있었는데 실제로는 60%(40%는 토지 등 기타자산), 페이지 자체 SEO본문은 60%라 써서 코드와 자기모순이었음, ②8단계 누진세율표에서 5억~10억 구간(42%)이 통째로 누락 + 15,000만원 이상 전 구간 누진공제 상수가 20만원씩 어긋나 7억 기준 62만원, 15억 기준 152만원 과다계산되던 버그, 공식 세율표로 재작성 후 경계값 전수 재검증 — 실제 세금 계산 오차라 영향 큼, 보유/거주기간 select도 10~15년 뭉뚱그림→연도별 세분화), cheongyak-score(배점표 3개 정확 확인 — FAQ가 "당첨 포기 시 1년 제한"이라 했는데 실제로는 지역별 7~10년(최대 10배 과소평가) + 청약통장 효력상실·가점제 2년 추가제한 등 웹서치로 정정, 초기 readout 총점(6점/7%)이 실제 기본 select 합계(8점/9.5%)와 안 맞던 것도 수정)

**남은 36개, meta-tag-generator·date-calc·schema-markup-generator·http-request-builder·currency-converter 완료 처리.**

### 완료 (5차 배치 13/N, 병렬 fork 5개, 1859~1934자 구간)
meta-tag-generator(다른 자유입력 필드는 전부 escHtml() 적용하는데 viewport 필드만 이스케이프 누락돼 생성된 meta 태그가 깨질 수 있던 문제 수정, 사용자가 결과를 그대로 자기 사이트 head에 붙여넣는 도구라 실영향 있음), date-calc(UTC 자정 파싱 버그 — calcAdd/calcDiff가 "YYYY-MM-DD"를 UTC로 파싱해 UTC보다 느린 타임존(America/New_York 등, en/zh/ja 글로벌 사용자 대상)에서 날짜가 하루 당겨지던 문제, parseLocalDate() 도입으로 수정 + FAQ 8/10 불일치를 10개로 통일), schema-markup-generator(script-tag-breakout XSS — JSON.stringify 결과를 이스케이프 없이 그대로 출력해 사용자 입력에 `</script>`가 있으면 대상 페이지의 스크립트 태그가 조기 종료되던 문제(구글 JSON-LD 문서도 명시 경고하는 취약점), `<`→`<` 이스케이프로 수정 + 모든 필수필드 라벨에 리터럴 `*`와 req=true 뱃지가 중복되어 `**필수`로 보이던 UI버그 12곳 정리 + Event 위치 필드 필수표시 누락 수정), http-request-builder(curl-generator와 동일 계열 버그 — 헤더/URL에 홑따옴표 있으면 curl 명령어와 fetch/axios 코드 둘 다 깨지던 문제를 escSh()/escJs() 헬퍼로 수정 + DELETE 메서드가 body 포함 조건에서 빠져있어 body가 조용히 누락되던 문제(curl-generator 재발견) 수정, FAQ 8/11 불일치 11개로 통일), currency-converter(이 배치 최대급 — "150+/160+통화" 거짓 주장(실제 36개) + 정적 고정환율표인데 "실시간 반영" 오인시키는 표현(zh는 "实时汇率"라고까지 명시) + FAQ 자체 예시 수치가 실제 환율상수(1382)와 안 맞아 계산 결과 자체모순이던 것 + falsy-zero 버그(0 입력해도 1로 계산) + ja 콘텐츠가 통째로 다른 8개짜리 구버전 초안이면서 존재하지 않는 "유럽중앙은행 데이터 출처" 거짓 주장까지 있던 것 전부 수정)

**남은 31개, regex-tester·acquisition-tax·redirect-checker·markdown-preview·robots-txt-generator 완료 처리.**

### 완료 (5차 배치 14/N, 병렬 fork 5개, 1936~2003자 구간)
robots-txt-generator(버그 없음, escHtmlAttr 일관 적용·프리셋 파싱 오프셋·FAQ 주장 전부 검증 정상), redirect-checker(analyzeChain()의 hop URL이 innerHTML에 미이스케이프로 삽입되던 XSS 수정, CORS 한계는 이미 정직하게 명시돼있어 콘텐츠 재작성 불필요, head FAQ 2→4), markdown-preview(실행 가능한 XSS 발견 — detached div 아니라 실제 부착된 DOM에 렌더링하면서 `&lt;/&gt;`는 이스케이프했지만 `![alt](url)`/`[text](url)`에서 큰따옴표·URL 스킴은 미검증이라 img src/alt 속성 이탈 + javascript: URI 클릭형 XSS 둘 다 가능했음, escAttr()+safeHref()(http/https/mailto/tel만 허용)로 수정 + FAQ가 주장한 체크박스(`- [ ]`)가 실제로는 리터럴 텍스트로만 나오던 것도 실제 구현), regex-tester(g플래그 토글이 죽어있어 꺼도 항상 전역매칭되던 핵심기능 버그, FAQ1 "g 없으면 첫 매치만"이라는 자체 주장과 정반대로 동작 — matchAll/match 분기로 수정 + 이 파일은 구 구조(faq-item 클래스 없는 개별 p태그 12개)라 static과 i18n.ko가 완전히 다른 내용(static FAQ5는 i-flag인데 i18n.ko FAQ5는 lookahead)이었던 것 발견, i18n.ko 기준으로 static 재생성해 17개 필드 전부 일치 재확인 + head FAQ 8→4 정리), acquisition-tax(이 배치 최대급, 세금 실오차 큼 — ①6~9억 보간공식이 `/3` 나눗셈 누락으로 7.5억 정상세율 2%가 12%로, 9억 경계값은 3%가 15%로 계산되던 버그, ②지방교육세를 전 구간 세율×10% 비례식으로 계산했는데 실제론 8%/12% 중과구간은 취득가액의 0.4%p 고정값이라 2~3배 과다청구, ③농특세도 세율≥3%면 20% 비례식으로 계산했는데 실제론 전용면적 85㎡초과 시에만 부과되는 0.2/0.6/1.0%p 고정값이라 최대 2.7배 과다청구 + 85㎡ 초과 여부 입력 자체가 UI에 없어 잘못된 대리조건을 쓰고 있었음, 웹서치 2개 독립 출처로 5개 시나리오 전부 재검증)

**남은 26개, gift-tax·income-tax·image-resizer·mortgage-calculator·emi-calculator 완료 처리.**

### 완료 (5차 배치 15/N, 병렬 fork 5개, 2003~2137자 구간)
gift-tax(세율표 5단계+관계별 공제액(배우자 6억/직계5천·미성년2천/기타1천) 전부 node로 대조해 정확, 10년 합산과세 로직도 검증 정상 — 버그 없음, severance-tax/capital-gains-tax/acquisition-tax와 달리 이 파일은 깨끗했음), income-tax(누진세율표 자체는 정확 확인, 다만 ①근로소득공제가 총급여 1억 초과 시 실제로는 상한 없이 계속 느는데 코드가 1,475만원 고정 상한 처리해 2억원 기준 200만원 과소공제, ②근로소득세액공제 감소율이 법정 0.0005(1/2000)인데 코드는 0.005(5/1000)로 10배 커서 소득 1억~3억 구간에서 15~172만원씩 과다청구 — 둘 다 수정, 신용카드공제 한도도 소득구간별로 세분화), image-resizer(투명PNG→JPG 변환 시 검은배경 버그, 자체 FAQ "흰색으로 채워짐" 주장과 정면 모순 — avif-to-jpg 등과 동일 패턴, 수정 + static/JS 가이드링크 문단 누락 수정), mortgage-calculator(zh/ja 통화기호가 서로 뒤바뀌어 있던 것(zh는 달러표기 콘텐츠인데 ¥, ja는 엔화 콘텐츠인데 $) 수정 + ja 인트로가 300만달러 대출인데 월상환액은 30만달러 대출 기준 수치를 쓰던 10배 오류 + ja FAQ 자체모순(1.5%라면서 1.0%수치)·절약액 저평가(실제 2배) 수정), emi-calculator(0개월 입력 시 Infinity/NaN 뜨던 크래시 버그 수정 + ko/zh/ja FAQ 예시원금과 결과수치가 안 맞던 것(zh/ja는 10배 단위환산 오류까지) + 1%금리차 FAQ가 4개 언어 전부 실제 계산과 다른 수치였던 것 전부 node 재계산 후 통일)

**5차 스캔(1500자 이상) 잔여 22개, image-compressor 완료 처리.**

### 완료 (5차 배치 16/N, 1개, 2140자)
image-compressor(투명PNG→JPG 변환 시 검은배경 버그 — 자체 FAQ "흰색으로 채워짐" 주장과 모순, avif-to-jpg/jpg-to-heic/image-resizer와 동일 패턴, 수정 + static/JS 가이드링크 문단 누락 수정)

**남은 21개, barcode-generator 완료 처리.**

### 완료 (5차 배치 17/N, 1개, 2142자)
barcode-generator(체크섬 생성은 JsBarcode CDN 라이브러리에 전부 위임돼 자체 코드 버그는 없음, FAQ의 EAN-13 체크디짓 설명은 실제 표준과 일치 확인 — 다만 pharmacode 유효범위 힌트가 "3~131"로 잘려있던 것(실제 라이브러리 소스 대조 결과 3~131070) 수정 + FAQ가 지원포맷을 6개만 나열해 실제 select에 있는 MSI/Pharmacode 2개가 누락돼있던 것 8개로 수정)

**남은 20개, 다음은 password-generator.html부터.**

### 완료 (5차 배치 18/N, 병렬 fork 10개, 2156~2431자 구간)
password-generator(벌크 비밀번호 innerHTML 미이스케이프 — 심볼 문자셋에 `<>&` 포함돼 있어 약 28% 확률로 화면표시 깨짐+copyBulk가 태그 경계까지만 잘라 복사값이 실제 비밀번호와 달라지던 버그 수정 + 엔트로피 과장(95→실제 88종) 정정), retirement-pension(이 배치 최대급 — DC형 연금이 연도별 12개월 납입분을 그 해에만 성장시켜야 하는데 퇴직까지 남은 전체 개월수로 잘못 복리 적용해 8.3배 과다산출(재현: 정답 1.83억 vs 버그값 15.2억), annuity-due 압축 후 잔여개월만 추가 성장하도록 재작성, 5케이스 실제 월별 시뮬레이션과 diff 0% 재검증, ko-only 페이지라 다국어 미러링 해당없음), color-picker(8자리 알파HEX(#RRGGBBAA) 입력이 6/3자리만 허용하는 검증정규식 때문에 죽어있던 버그 수정 + EyeDropper API·CMYK 지원 등 실제 없는 기능을 있다고 주장하던 head FAQPage 거짓 광고 정정), word-counter(keyword-density-checker와 동일 패턴 — 공백기준 split이 중국어/일본어 문장 전체를 "1단어"로 집계해 CJK 지원 명시한 메타 설명과 달리 키워드 빈도 기능이 사실상 죽어있던 버그, 한자/히라가나/가타카나 글자단위 토큰화로 수정, 한국어 어절기준은 회귀없음 확인), roi-calculator(fmtMoney 통화기호 분기에 ja 누락(달러로 표시) + 최종가치 0(총손실) 시나리오에서 유효한 -100% CAGR이 final>0 조건 때문에 숨겨지던 버그 수정), keyword-grouping-tool(renderGroups가 사용자 입력 키워드 미이스케이프 innerHTML 삽입 XSS 수정 + FAQ 5블록 50→40 정리), dsr-calc(원리금균등/원금균등 select value가 라벨과 서로 뒤바뀌어 있어 사용자가 고른 상환방식과 반대 공식으로 DSR 계산되던 버그(node 재현 확인) + 금리 0% falsy-zero 버그 수정 + 2026년 스트레스 DSR 3단계 미반영 한계 명시, ko-only 단일언어 구조), hash-generator(이 배치 최대급 — 순수JS MD5 구현의 길이필드 워드인덱스 공식 오류(+72 should be +8)로 md5("")조차 표준값과 다르게 나오는 등 입력 전체에서 잘못된 해시 생성되던 버그(node crypto 대조 확인) + 이모지 등 서로게이트 문자 UTF-8 인코딩 오류(charCodeAt→codePointAt) + FAQ가 최초 페이지로드시 렌더 안 되고 언어토글 클릭해야만 나타나던 버그(크롤러엔 FAQ 전혀 안 보임) 전부 수정), loan-calc(static/ko/en/zh FAQ 예시 수치가 원리금균등·만기일시 둘 다 정확히 10배 작게 적혀있던 버그(node 재계산 확인) + 원금균등 첫달 예시 자체 산수모순 + 금리 0% falsy-zero로 숨겨지거나 강제계산 시 NaN 크래시 + hreflang은 ja를 광고하는데 실제 _loanSeo에 ja 블록 자체가 없어 영어로 폴백되던 콘텐츠 결손 전부 수정, FAQ 12→8 정리), compound-interest(en/zh/ja FAQ 예시 수치 3곳이 실제 계산식과 불일치 — annuity-due(적립 후 이자) 공식인데 교과서 annuity-ordinary로 계산된 예시, 어떤 복리주기로도 재현 안 되는 근거없는 수치, 연복리 가정 예시인데 실제 기본값은 월복리 — 전부 실제 계산값으로 재계산해 교체 + ja 간체자 오타(广→広) 수정)

**남은 9개, 다음은 savings-calc.html부터 (savings-calc·investment-return-calculator·gst-calculator·ltv-calculator·percent-calc·calorie-calculator·vat-calculator-global·unit-converter·timezone-converter).**

### 완료 (5차 배치 19/N, 병렬 fork 9개, 마지막 배치 — 1500자 이상 구간 전체 완료)
savings-calc(계산로직 정상, head 메타 4곳+FAQPage가 실제 없는 "복리 선택" 기능 광고(본문 FAQ 자체 모순) + Q1이 실제 월적립 삼각수 공식과 다른 목돈예금 공식 서술 + 저율과세 9.5%(실제 9.9%) 오기 전부 정정), investment-return-calculator(0% 수익률+정기납입 조합에서 rn=0 나눗셈 NaN 크래시(node 재현) + 초기투자금 0원 DCA 시나리오에서 CAGR이 fv/1로 계산돼 실제 연7%인데 "92.95%"로 오표시되던 버그 수정 + FAQ 예시 1만원 오차 정정), gst-calculator(fmtINR 연산자 우선순위 버그로 `100..toLocaleString()`이 리터럴 100에 먼저 적용돼 천단위 콤마·소수점 포맷팅이 실제 계산값엔 통째로 안 먹히던 버그 수정), ltv-calculator(계산로직 정상(자체 FAQ 예시와 node 대조 일치), 규제지역 목록에 웹서치로 확인한 2026-06-30 추가지정(화성 동탄구·용인 기흥구·구리시) 누락 보강+수시변동 디스클레이머 추가, CLAUDE.md 연간점검 대상 파일 재확인 완료), percent-calc(버그 없음, 5개 수식 전부 node 검산 정확, 이미 감사 완료 수준), calorie-calculator(인트로 BMR/TDEE 예시 3세트가 실제 Mifflin-St Jeor 계산값과 5~10% 불일치하던 것 정정 + UI에 없는 "매우 활발 1.9" 옵션 거짓 광고 제거), vat-calculator-global(커스텀세율 select가 `'custom|$|Custom'` 복합값을 리터럴 `'custom'`과 비교해 조건이 영원히 거짓이라 커스텀 세율 입력이 항상 무시되고 20% 강제되던 버그(node 재현, 자체 영세율0% FAQ와 모순) + 금리 0 falsy-zero 버그 수정 + "40+개국" 과장(실제 21개국) "20+"로 정정), unit-converter(PB 변환계수 정밀도 오차(1.126e15→정확한 1024^5) 수정 + zh/ja FAQ가 ko/en/static(15개) 대비 12개뿐이던 누락 3개 항목 번역 보강해 5블록 15개 통일), timezone-converter(이 배치 최대급 — getSrcDate()가 datetime-local 값을 항상 방문자 OS 타임존으로만 파싱해 srcTz select가 시간 계산에 전혀 반영 안 되던 버그(TZ=Asia/Seoul로 재현, 자체 FAQ의 PST→KST 변환 예시 자체가 방문자가 PST에 있지 않으면 깨짐), wall-clock→UTC 역산 방식으로 재작성)

이번 배치에서 부수적으로 발견해 함께 고친 것: url-encoder.html의 글자수 표시가 `' chars'`로 4곳 하드코딩돼 en/zh/ja는 물론 ko에서도 언어무관 영어 접미사가 붙던 버그 — charsLabel i18n 키(자/chars/字符/文字) 추가해 4개 호출부+applyLang() 전부 연결(언어 토글 즉시 반영).

## 5차 스캔(1500자 이상, 148개 중 대상 80개) 전체 완료 (2026-08-03)
1500자 이상 구간 worst-first 전부 처리 완료. 다음 단계는 새로 700~1500자 구간으로 재유입된 파일이 있는지 재스캔하거나(콘텐츠 심화로 글자수가 늘어 이 구간을 벗어난 파일 다수 예상), 전체 파일 재스캔으로 놓친 게 없는지 확인 필요.

## 700~1500자 구간 재스캔 완료 (2026-08-03)
스캔 결과 174개가 이 구간에 걸렸지만, 완료 기록 전체(`이름.html`/`이름(` 두 패턴 모두)와 대조한 결과 173개는 전부 콘텐츠 심화로 글자수만 늘어 이 구간에 재유입된 기완료 파일 — 진짜 미처리 파일은 **countdown-timer.html 1개뿐**이었음(과거 어느 배치 목록에도 등장한 적 없는 파일, 1차 감사 시점에 왜 누락됐는지는 불명 — 사이트 전체 재스캔이 필요한 이유이기도 함).

### 완료 (countdown-timer.html, 1개)
renderAll()이 사용자 입력 이벤트명을 미이스케이프 innerHTML 삽입하던 XSS 수정 + 기본 목표일시(`def.toISOString().slice(0,16)`)가 로컬 시각을 UTC로 변환한 뒤 자르는 바람에 datetime-local 입력창에 로컬 UTC오프셋만큼 어긋난 값이 채워지던 버그(KST 재현: 의도 23:18인데 14:18 표시) 수정 + fmtDt()가 ja 로케일 분기가 없어 일본어 사용자에게도 영어(en-US) 날짜 포맷이 나오던 버그 수정 + head FAQPage JSON-LD가 "현재 단일 타이머로만 동작, 여러 개 필요하면 탭 여러 개 여세요"라고 명시해 실제 코드(배열 기반 다중 카운트다운 저장)와 본문 FAQ 자체("여러 개 저장 가능")와 정면 모순되던 것을 정정.

**다음 단계**: 700~1500자 구간에서 놓친 파일이 사실상 없다는 게 확인됐으므로, 남은 리스크는 이 스캔 범위(seo 블록 있는 파일) 밖에 있는 파일(500자 미만 구간 재유입 가능성, 또는 애초에 seo 블록 매칭 자체가 실패하는 구조적으로 다른 파일)이나 아직 한 번도 어느 배치 목록에도 안 걸린 고아 파일(countdown-timer.html 같은 사례) — 전체 HTML 파일 목록과 완료 기록을 직접 대조하는 전수 검증이 다음 단계로 남음.

## 전수검증 완료 (2026-08-03)
전체 393개 HTML 파일(naverfc* 제외) 중 index/privacy/about/contact/terms 5개 제외한 **388개 툴 대상 파일**을 완료기록(`이름.html`/`이름(`/`하이픈-포함-단어` 3가지 패턴 전부)과 정면 대조:
- **321개 실콘텐츠 페이지**: 전부 완료기록과 매칭 확인. countdown-timer.html도 이 세션에 처리 완료돼 포함됨.
- **67개 리다이렉트 스텁**(`http-equiv="refresh"` + 3000자 미만, 스캔 대상에서 애초에 제외되던 것들): 리다이렉트 타겟 67개 전부 실제 존재하는 파일로 확인(깨진 링크 0건, 예: accessibility-color-checker→color-contrast-checker, md5-generator→hash-generator). 정상.
- 700자 미만 재검증도 별도 실시: seo-title-generator.html(691자) 1개만 걸렸는데 이미 기완료 파일. `class="seo"` 정규식 매칭 자체가 실패하는 구조적으로 다른 파일도 0건.

**결론: 고아 파일 없음. 콘텐츠 심화 관점에서는 사이트 전체(388개)가 이 감사의 커버리지 안에 들어와 있음.**

## 부가 발견: ko-only 계산기 39개의 거짓 hreflang (2026-08-03, 처리 완료)
전수검증 과정에서 별개 이슈 발견 — annual-leave.html에 "발견만 하고 스코프 밖으로 플래그" 해뒀던 문제(hreflang은 en/zh/ja 광고하는데 실제 다국어 시스템 자체가 없음)가 사실 이 파일 하나만의 문제가 아니라 **한국 노동법/세금/부동산 전용 ko-only 계산기 39개 전체**에 동일하게 존재하는 구조적 패턴이었음(연차·4대보험·증여세·양도세·LTV/DSR 등 — 실제 성격상 번역해도 한국 거주자 외엔 쓸모가 크지 않은 주제들).

**사용자 확인 후 결정**: 이 39개는 다국어 번역하지 않기로(주제가 한국 법 특정이라 번역 실효성 낮음) — 대신 거짓 hreflang 태그(en/zh/ja)를 제거해 크롤러에게 실제로 없는 번역을 있다고 광고하던 신호만 끊음. `loan-calc.html`은 이번 세션에 실제 `_loanSeo` 4개국어 시스템을 새로 만들어놨던 파일이라 오탐으로 제외(변수명이 `_i18n`이 아니라 `_loanSeo`라 첫 탐지 정규식에서 놓쳤던 것, 2차 검증으로 확인 후 제외).

처리 대상 38개(hreflang en/zh/ja 3줄 제거, ko/x-default만 유지): retirement-pension, national-pension, salary-negotiation, annual-leave, retirement-calc, payslip-calc, severance-tax, stock-tax, property-tax, overtime-pay, salary, dday, credit-loan-limit, severance, rent-convert, salary-raise, gift-tax, ltv-calculator, prepayment-fee, inheritance-tax, acquisition-tax, four-insurance, cheongyak-score, salary-reverse, unemployment, capital-gains-tax, health-insurance-calc, realestate-fee, korean-age, income-tax, dsr-calc, vat-calc, minimum-wage, parental-leave, health-insurance, freelancer-tax, weekly-holiday, working-days-calc.

sitemap.xml에는 이 38개 파일명의 `?lang=` 항목이 애초에 하나도 없었음(확인 완료) — sitemap 쪽은 손댈 것 없음.

**아직 남은 것 (미착수)**:
- **parental-leave.html**: 상한액 최신연도(2026) 법정 수치 재검증 — 이번 세션에서 hreflang만 처리, 수치 재검증은 미착수
- **bmi-calc.html**: 성별/활동량 라디오버튼 미번역 갭 — hreflang 이슈와 무관, 여전히 미착수
- **working-days-calc.html**: 2027년 공휴일 데이터 아직 없음 — CLAUDE.md 연간점검 대상, 연초 갱신 예정이라 안 급함

**주의 6**: 이 스캔에서 처음에 exclude 로직 버그가 있었음 — 4차 배치(67~83)의 완료 기록이 "파일명(설명)" 형식으로 `.html` 확장자 없이 적혀 있는데, 스캔 스크립트가 `이름.html` 패턴으로만 완료 여부를 매칭해서 방금 끝낸 파일들(freelancer-tax, color-palette, inflation-calculator, sip-calculator, body-fat-calculator, loan-calculator-en 등)이 전부 "미완료"로 잘못 다시 나타났었음. `이름(` 패턴도 함께 매칭하도록 스캔 스크립트를 고쳐서 재실행 후 확인함. **앞으로 이 파일에 완료 기록을 추가할 때 파일명 뒤에 `.html`을 붙이든 안 붙이든 상관없지만, 재스캔할 땐 반드시 두 패턴(`이름.html`과 `이름(`) 모두로 완료 여부를 매칭할 것.**

```
2156  password-generator.html
2164  retirement-pension.html
2200  color-picker.html
2289  word-counter.html
2325  roi-calculator.html
2335  keyword-grouping-tool.html
2351  dsr-calc.html
2355  hash-generator.html
2395  loan-calc.html
2431  compound-interest.html
2440  savings-calc.html
2442  investment-return-calculator.html
2494  gst-calculator.html
2498  ltv-calculator.html
2512  percent-calc.html
2770  calorie-calculator.html
2796  vat-calculator-global.html
3030  unit-converter.html
3097  timezone-converter.html
```

특히 주의해서 볼 파일들(라벨/이름부터 이미 알려진 버그 패턴과 겹칠 가능성): working-days-calc.html·minimum-wage.html(CLAUDE.md 연간점검 대상, 하드코딩 법정수치 최신 여부 확인), national-pension.html·health-insurance.html·unemployment.html(national-pension-calculator/health-insurance-calc과 이름 유사한 별개 파일 — 동일한 요율 드리프트 여부 확인 필요), inheritance-tax.html·gift-tax.html·acquisition-tax.html·capital-gains-tax.html·income-tax.html(세금 계산기 — severance-tax급 구간표 오류 가능성 염두), date-calc.html·time-calculator.html(날짜 입력 있으면 UTC자정 파싱 버그 패턴 확인).

## 새 컴퓨터에서 이어할 때 체크리스트
1. `git fetch && git checkout content-depth-audit && git pull`
2. 위 "5차 스캔" 남은 80개 목록 맨 위부터 시작, 4개씩 병렬 fork 배치 권장
3. 파일마다: 코드 읽고 실제 버그/과장된 주장 찾기(가능하면 node로 직접 재현) → 없으면 진짜 기술적 디테일로 깊이 보강 → ko 정적 seoDiv 재작성 → JS _i18n.ko.seoHtml에 완전히 동일하게 미러링(정규식 특수문자는 백슬래시 2번 이스케이프 등 주의) → en/zh/ja 번역 → head FAQPage JSON-LD를 새 내용 기준 4개 항목으로 교체
4. 검증 4종 세트 (파일마다 필수):
   - `python3 -c "...json.loads(...)"` 로 JSON-LD 2개 블록 파싱 확인
   - `grep -o 'class="faq-item"' 파일명 | wc -l` → 반드시 40 (정적 8 + JS미러 8 + en 8 + zh 8 + ja 8). **`grep -c`는 쓰지 말 것** — 한 줄짜리 템플릿 리터럴 파일에서 줄 수만 세어 실제 개수보다 적게 나옴
   - `node --check` 로 스크립트 블록 문법 확인
   - node eval로 static seoDiv와 _i18n.ko.seoHtml 완전 일치(MATCH) 확인
5. 3개 끝나면 커밋 1개(버그 설명 포함 커밋 메시지) + 이 파일 업데이트 커밋 1개 + push
6. **주의**: FAQ 항목을 8개로 맞출 것 — 초안 작성 시 실수로 9개 쓰면 총 45개로 어긋남(과거 sql-minifier, curl-generator, curl-parser에서 실제로 발생했던 실수)

## 남은 참고 사항

**4차 배치(10~66)에서 발견된 심각도 높은 버그 14건 — 2026-08-03 전수 재확인 결과 전부 코드에 실제로 반영돼 있음(current 파일 grep으로 직접 대조 완료):**
annual-leave(달력계산+hreflang 둘 다 해결) · csr-generator(sanitizeSubjField 확인) · pdf-page-counter(escHtml 확인) · html-encoder(sandbox iframe 확인) · pdf-compressor(scale=dpi/72 확인) · csp-generator(FAQ 정직화 확인) · ai-youtube-title-generator · keyword-density-checker(CJK 정규식 확인) · robots-txt-validator(pathToRegex 확인) · weekly-holiday(실근무일수 반영 확인) · severance(달력일수 계산 확인) · severance-tax(공제표 확인) · html-to-markdown(DOMParser 확인) — 이 13개는 재작업 불필요.
**bmi-calc.html**만 "성별·활동량 라디오버튼 미번역 갭"이 발견 당시 미착수 상태로 남아있었음 → fork 처리중(별도 진행상황은 위 "부가 발견" 섹션 참고).

- 1000~1500자 구간 83개 전체 완료. 5차 스캔(1500자 이상)·700~1500 재스캔·전수검증까지 전부 완료.
- 중복 FAQ 답변(4개 파일 이상 겹침) 이슈는 대부분 해소됨 (언어 전환 안내 문구 정도만 남음, 문제 아님)
- 새 컴퓨터에서 이어할 때: `git fetch && git checkout content-depth-audit && git pull` 로 시작
- 파일 하나 끝날 때마다 체크: static seoDiv와 JS ko seoHtml 문자열 완전 동일한지 node eval로 확인, JSON-LD 유효성 확인, faq-item 개수(5개 언어 블록 x 8 = 40) 확인 — 검증 코드는 이 세션 대화 내 여러 번 사용한 패턴 참고
