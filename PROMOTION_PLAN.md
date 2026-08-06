# 커뮤니티 홍보 계획

modoohub.com 트래픽 유입용 커뮤니티 홍보 채널·전략·기록.

## 원칙 (Opus 분석 기준)

- 317개 전체 아님. **글로벌 대상 툴**(finance/dev/text/image/pdf 등)만 소개. ko-only 계산기(급여/4대보험/부동산 등)는 영어권 채널에서 제외.
- **"317개 툴 모음" 프레이밍 금지.** 개발자 커뮤니티에서 툴 대량 나열 + AdSense는 콘텐츠팜/스팸 신호로 읽힘. 항상 단일 툴 1개 + 그게 푸는 구체적 문제로 소개.
- **랜딩은 index.html 아니라 그 툴 페이지로.**
- **신규 런칭인 척하지 말 것** (들킨다). 이미 성숙한 사이트이므로 "N년 운영, 월 X 방문" 같은 실적을 솔직히 쓰는 게 오히려 강점.
- 채널마다 카피 다르게 작성. 복붙 금지 (역효과).
- 주기: 격주 1채널씩 로테이션 권장 (과다 포스팅 시 계정 신뢰도 하락).
- 기대치는 낮게 잡을 것 — 대부분 48시간 스파이크, 실제 남는 건 백링크·SEO 효과.

## 우선순위

| 순위 | 채널 | 이유 | 리스크 |
|---|---|---|---|
| 1 | Tool Directory 등록 | 리스크 0, 영구 백링크. 허브 1건 아니라 개별 툴을 "X의 대안"으로 등록 | 낮음 |
| 2 | Reddit (니치 서브) | 잠재력 최대. 대형 서브보다 주제별 소형 서브에서 실제 질문에 답하며 링크 | 중간 (자기홍보 10:1 룰, 계정 karma/연차 부족 시 섀도밴, 도메인 automod 차단 시 전 서브 확산) |
| 3 | Dev.to / Hashnode | 툴 링크만 던지면 무시됨. 진짜 기술 글 + 문맥 링크 필요 | 낮음 |
| 4 | X | 빌드 로그/수치 공개형. 팔로워 없으면 효과 낮지만 비용도 0 | 낮음 |
| 5 | Indie Hackers | 성숙 사이트에 유리. "317개까지 어떻게 왔나 / AdSense 수익 공개"가 툴 소개보다 잘 먹힘 | 낮음 |
| 6 | Product Hunt | 제품당 사실상 1회. 지금 훅 없이 태우면 낭비 — 신규 기능·리브랜딩 시점까지 아껴두기 | 중간 (재사용 불가) |
| 7 | Hacker News (Show HN) | 마지막. 광고 밀도 높은 사이트는 플래그, HN은 도메인 단위 영구 차단 실재. 올릴 거면 광고 없는 단일 툴 페이지로, "317 tools" 절대 금지 | 높음 |

## 채널별 메모

### Tool Directory 등록
- AlternativeTo, SaaSHub, There's An AI For That, awesome-* GitHub 리스트 등.
- 사이트 전체가 아니라 개별 글로벌 툴(pdf-compressor, qr-code-generator 등)을 카테고리별로 각각 등록해야 승인율 높음.
- 등록 자체가 목적인 곳이라 스팸 리스크 없음. 대신 트래픽은 소량 — 백링크·SEO 누적용.

### Reddit
- 서브별 자기홍보 룰 먼저 확인 (일부는 9:1 룰 — 자기 콘텐츠 10% 이하).
- 대형 서브(r/webdev)보다 주제별 소형 서브 우선. 예: r/SideProject, r/InternetIsBeautiful, r/coolgithubprojects.
- 링크만 던지지 말고 실제 질문/스레드에 답하는 맥락에서 자연스럽게.

### Dev.to / Hashnode
- "브라우저에서 PDF를 서버 없이 처리한 방법"처럼 실제 기술 콘텐츠 + 문맥상 링크. 링크만 있는 소개글은 무시당함.

### X (Twitter)
- 빌드 로그/업데이트/수치 공개 위주. 스레드보다 짧은 업데이트.

### Indie Hackers
- "N년 운영, 월 방문자 X, AdSense 수익 얼마" 같은 실적 공개형이 툴 소개보다 반응 좋음.
- 정기 업데이트 포스팅 가능.

### Product Hunt
- 런칭 1회성 이벤트. 지금 아껴두고 신규 기능·리브랜딩 시점에 가장 완성도 높은 단일 훅으로 진행.

### Hacker News
- Show HN 좁은 스토리만, 마지막 순서. 광고 없는 단일 툴 페이지로. 실패/플래그 시 도메인 영구 차단 리스크 있어 신중하게.

## 등록/포스팅 카피 자료

md 하나에 몰아쓰면 나중에 찾기 힘들어서 `promotion/` 폴더로 분리. 채널별 파일, 우선순위 번호로 정렬:

| 파일 | 채널 |
|---|---|
| [promotion/01-tool-directory.md](promotion/01-tool-directory.md) | Tool Directory (AlternativeTo, SaaSHub 등) |
| [promotion/02-reddit.md](promotion/02-reddit.md) | Reddit |
| [promotion/03-devto-hashnode.md](promotion/03-devto-hashnode.md) | Dev.to / Hashnode |
| [promotion/04-x.md](promotion/04-x.md) | X (Twitter) |
| [promotion/05-indie-hackers.md](promotion/05-indie-hackers.md) | Indie Hackers |
| [promotion/06-product-hunt.md](promotion/06-product-hunt.md) | Product Hunt |
| [promotion/07-hacker-news.md](promotion/07-hacker-news.md) | Hacker News |

각 파일 안에서 `## 툴명` / `## 제목` 섹션으로 카피 누적. 첫 카피(pdf-compressor, Tool Directory용)는 `promotion/01-tool-directory.md`에 있음.

## 포스팅 로그

| 날짜 | 채널 | 소개한 툴 | 링크 | 결과(트래픽/반응) |
|---|---|---|---|---|
| 2026-08-04 | SaaSHub | pdf-compressor | saashub.com | 제출 완료, 승인 대기 중 (verify/로고/pricing 남음) |
| 2026-08-04 | AlternativeTo | pdf-compressor | alternativeto.net | 실패 — 계정 7일 미만이라 작성 불가, 2026-08-11 이후 재시도 |
