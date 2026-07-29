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

**완료: 33개 / 70개** (batch 1~11)
✅ json-schema-validator, ico-converter, image-prompt-generator, markdown-chat-exporter, xml-to-json, pdf-size-analyzer, hash-checker, regex-generator, prompt-template-generator, curl-generator, ngram-analyzer, json-schema-generator, png-to-svg, yaml-to-json, pdf-metadata-remover, curl-parser, text-similarity-checker, webhook-tester, time-zone-meeting-planner, image-color-extractor, open-graph-preview, pdf-word-counter, webhook-generator, avif-to-jpg, api-tester, bcrypt-validator, regex-cheatsheet, keyword-cannibalization-checker, bcrypt-generator, national-pension-calculator, nanoid-generator, keyword-difficulty-estimator, exif-viewer

**주의**: `grep -c 'class="faq-item"' 파일명`은 "매칭되는 줄 수"를 세는 것이라, ko/en/zh/ja seoHtml이 한 줄짜리 템플릿 리터럴로 저장된 파일에서는 실제 개수보다 훨씬 적게 나올 수 있음(예: 40개인데 5로 표시됨). 반드시 `grep -o 'class="faq-item"' 파일명 | wc -l`로 실제 occurrence 개수를 셀 것. 또한 이 카운트는 배치 시작 전 반드시 확인 — 과거 콘텐츠(exif-viewer 등)에 원래부터 45개(9x5) 오류가 남아있던 사례 있었음.

**남은 37개 (worst-first, char count)** — 다음 배치는 여기서부터 3개씩:
```
829  slug-generator.html                  ⬜ 다음 배치 시작점
833  json-diff.html
834  graphql-formatter.html
836  hmac-generator.html
836  uuid-generator.html
837  meeting-cost-calculator.html
845  unicode-converter.html
846  heic-to-jpg.html
852  transparent-background-maker.html
852  rsa-key-generator.html
852  sitemap-extractor.html
853  ulid-generator.html
854  image-dpi-checker.html
864  serp-snippet-preview.html
867  text-encryptor.html
868  pdf-ocr.html
872  image-dimension-checker.html
878  lorem-ipsum-generator.html
880  sentence-counter.html
883  json-path-tester.html
890  tailwind-color-generator.html
896  text-reverser.html
901  ssh-key-generator.html
909  remove-empty-lines.html
911  jpg-to-avif.html
911  uuid-converter.html
917  remove-duplicate-words.html
918  jpg-to-heic.html
919  json-flattener.html
933  text-shuffler.html
934  css-gradient-generator.html
942  json-to-yaml.html
944  prompt-optimizer.html
964  read-time-calculator.html
986  csv-to-json.html
993  line-counter.html
999  ai-model-comparison.html
```
(1000자 이상은 700~1000 구간이 끝나면 재스캔해서 다음 구간 산정)

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
