# 세션 노트

날짜별로 그날 세션에서 있었던 일을 요약. 코드/전략 파일(PROMOTION_PLAN.md, CONTENT_AUDIT_PROGRESS.md, promotion/*)에 이미 기록된 세부사항은 여기서 반복 안 하고 링크만 걺.

## 2026-08-04 ~ 08-07

### 사이트 버그 수정
- **sitemap.xml 68개 파일 누락 발견·수정** — 실제 html 파일과 sitemap `<loc>` 목록 직접 대조해서 발견. 배치29 기록에 "등록 완료"라고 적혀있던 파일들도 실제론 빠져있었음. 커밋 `d1a673b`. 상세: [CONTENT_AUDIT_PROGRESS.md](CONTENT_AUDIT_PROGRESS.md) "sitemap.xml 미등록" 섹션.
- **related.js 언어 토글 시 미갱신 버그 수정** — 카테고리 칩·관련 도구 섹션·BreadcrumbList가 페이지 최초 로드 언어에 고정되고 언어 토글 눌러도 안 바뀌던 버그. MutationObserver로 수정, 390개 전 파일에 자동 적용. 실사이트에서 ko→en→zh→ja 토글 검증 완료. 커밋 `eb9cfe3`.

### 커뮤니티 홍보 (Tool Directory)
전략 문서: [PROMOTION_PLAN.md](PROMOTION_PLAN.md), 채널별 상세: [promotion/](promotion/)

- **SaaSHub** — pdf-compressor 등록 → 승인 → verified 완료. 로고(모두허브 M 마크)·확장설명·Pricing·Platform 다 채움. Verify 직후 뜬 $99/월 Featured Listing 업셀은 스킵.
- **Slant.co** — 사이트 검색 기능 자체가 고장나서 스킵.
- **SaaSWorthy** — G2/Capterra류 기업 리드젠 모델(무료도 영업 문의 방식), 별도 Vendor Portal 재가입 필요해서 스킵.
- **Tool Finder** — 유료($39~)라 스킵.
- **Turbo0.com** — 폼까지 다 채웠지만, 무료 등록 조건이 "Listed on Turbo0" 배지를 실제 사이트에 삽입하는 반대급부 백링크 방식이라 취소. (상호 백링크 요구 = 구글이 링크 스킴으로 보는 패턴이라 SEO상 리스크)
- **AlternativeTo** — 계정 가입 7일 제한 걸림, 2026-08-11부터 재시도 가능.
- 로고 제작 과정에서 시행착오 있었음(이모지 로고 → PDF 워드마크가 Adobe 카피 느낌 → 최종적으로 사이트 실제 브랜드인 보라(#8B7CFA)→시안(#3FD8C8) 그라데이션 M 마크로 정착). 파일: `promotion/assets/modoohub-logo-icon.png`.

### SNS 카드뉴스 홍보
- ChatGPT/Gemini가 제안한 "완전 자동화 AI SNS Content OS"(Trend/Psychology/Hook/Learning Engine 등 10단계, PostgreSQL + Thompson Sampling)를 Opus에게 검토시킴 → **구현 불가 판정**: 인스타/X 자동발행 API가 사실상 막혀있고, 데이터 0인 상태에서 만든 Multi-Armed Bandit 학습엔진은 통계적으로 무의미함.
- 대신 **"AI 마케팅 비서 워크플로우"**로 축소: 자동화·DB·발행 API 다 빼고, AI(나)가 기획+카드 이미지+플랫폼별 원고까지 만들고 사용자가 직접 검토·게시하는 방식으로 확정.
- 카드 디자인은 Claude의 `artifact-design` 스킬 가이드를 따라 제작(모두허브 실제 브랜드 컬러·타이포 적용, HTML→크롬 스크린샷 방식). 뷰포트가 슬라이드 높이(1350px)보다 낮아서 2번 나눠 찍고 그라데이션 블렌딩으로 이음선 제거하는 기법 확립.
- **첫 카드셋 완성**: 종합소득세 계산기 5슬라이드 + 인스타/쓰레드/X 원고. 파일: `promotion/cards/income-tax-01/`, 원고: [promotion/08-sns-cards.md](promotion/08-sns-cards.md). 아직 게시 전, 사용자 검토 대기 중.

### 반복하지 말 것 (교훈)
- 외부 서비스 추천 전에 실제로 들어가서 동작 여부·가격·요구조건 확인 먼저 할 것 (Slant/SaaSWorthy/Turbo0에서 확인 안 하고 추천했다가 시간 낭비함). 메모리: `feedback_verify_before_acting`.
- "완료"라고 문서에 적혀있어도 실제 파일/설정 대조로 재검증할 것 (sitemap 사례). 메모리: `feedback_annual_data_check`.
