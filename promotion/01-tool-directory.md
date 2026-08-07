# Tool Directory 등록 카피

AlternativeTo 등록 폼에 들어가서, 아래 필드를 순서대로 복붙하면 됨.

---

## pdf-compressor

상태:
- [x] **SaaSHub** — 2026-08-04 제출, 2026-08-07 승인 + verified 완료. 로고(M 마크)·확장 설명·Pricing(Free)·Platform(Web) 전부 반영. Verify 직후 $99/월 Featured Listing 업셀("1개월 무료" 미끼) 떴는데 결제 필요한 구독이라 스킵함 — 다음에도 이거 누르지 말 것.
- [x] **Slant.co** — 2026-08-06 확인, 사이트 검색 기능 자체가 고장남("browser" 검색해도 0건). 방치된 사이트로 판단, 스킵.
- [x] **SaaSWorthy** — 2026-08-06 확인, G2/Capterra류 기업 리드젠 모델. 무료 티어도 "Talk to Us" 영업 문의 방식, Vendor Portal은 메인 계정과 별도로 이메일+OTP 재가입 필요. 스킵.
- [x] **Tool Finder (toolfinder.com)** — 2026-08-06 확인, 유료($39~). 스킵.
- [x] **Turbo0.com** — 2026-08-06 폼까지 다 채웠으나 취소함. 무료 티어가 "Listed on Turbo0" 배지를 pdf-compressor.html에 직접 삽입해야 승인되는 구조(반대급부 백링크) — 317개 페이지 중 1개만 낯선 배지 붙는 게 부자연스럽고, 상호 백링크 요구는 구글이 링크 스킴으로 보는 패턴이라 SEO상 득보다 실 우려. **다음에 이 사이트 다시 시도하지 말 것.**
  - [x] Description 채움 (Manage → Details 탭, `/manage/pdf-compressor-by-modoohub/edit`. Pending approval 상태여도 제출자 계정이면 즉시 편집 가능, verify 안 눌러도 됨)
  - [x] 로고 업로드 — `promotion/assets/modoohub-logo-icon.png` (아래 "공용 브랜드 로고" 참고, Images 탭에서 업로드 완료)
  - [ ] Pricing 설정 — Pricing 탭에서 Free 설정

### 공용 브랜드 로고 (모든 디렉토리 등록에 재사용)

- 원본: `promotion/assets/modoohubLogo.jpeg` (사용자 제공 브랜드 아이덴티티 시트 — 보라→시안/골드 그라데이션 인터로킹 "M" 마크, 다크테마 버전, 모노크롬 버전 포함)
- 실사용본: `promotion/assets/modoohub-logo-icon.png` — 위 시트에서 "Refined Hero Logo" 아이콘만 크롭, 흰 배경 정사각형 512x512로 정리한 버전. **SaaSHub pdf-compressor 리스팅에 적용 완료.**
- 사이트 실제 헤더/히어로 워드마크 색(`--violet:#8B7CFA`, `--cyan:#3FD8C8`, theme-instrument.css)과 계열이 맞음 — 툴마다 새로 만들지 말고 이 파일 그대로 재사용할 것.
- 다크 배경 디렉토리(예: Product Hunt 다크모드 등)에 올릴 땐 원본 시트의 "Dark Theme Application" 패널(우측 상단, 골드 M + 다크 배경) 크롭해서 별도 파일로 만들 것.
- [ ] **AlternativeTo** — 계정 가입 7일 지나야 등록 가능(사이트 정책). 재시도 예정일: **2026-08-11 이후**.

**1. Name 필드에 붙여넣기**
```
PDF Compressor by ModooHub
```

**2. Tagline / Short description 필드**
```
Free in-browser PDF compressor — your files never leave your device.
```

**3. Description 필드**
```
PDF Compressor by ModooHub reduces PDF file size entirely inside your browser using PDF.js and jsPDF — nothing is uploaded to a server, so your documents never leave your device. You choose the JPEG quality (92 / 80 / 60) and render resolution (72 / 96 / 150 DPI), and the tool re-renders each page and rebuilds the PDF locally. Because it works by rasterising pages, it is most effective on scanned and image-heavy PDFs; text-only PDFs may see little reduction. Free, no sign-up, no file limits per account — the site is supported by ads.
```

**4. "Alternative to" 검색창에 하나씩 추가**
```
Smallpdf
iLovePDF
Adobe Acrobat online
PDF24 Tools
Sejda PDF
```

**5. Tags 필드에 하나씩 추가**
```
pdf-tools
privacy
no-signup
client-side
file-compression
```
(소문자 단어형만 받으면: pdf / compression / privacy / no-registration / web-based)

**6. 나머지 드롭다운 선택**
- License: Free (Proprietary)
- Pricing: Ad-supported
- Platforms: Web (브라우저 기반이라 Windows/macOS/Linux/Android/iOS 다 체크 가능)

**7. Screenshot**
pdf-compressor.html 캡처 1~2장 직접 첨부 (승인률 올라감, 텍스트로 대체 불가)

**8. URL 필드**
```
https://modoohub.com/pdf-compressor.html
```

---

### 쓰지 말 것 (등록 반려 사유)
- "70% 압축률 보장" 같은 미검증 수치
- "가장 빠른", "1위" 같은 최상급
- "N만 명 사용" — 실제 수치 없음
- 압축률 언급하고 싶으면 "scanned PDFs: 60–80% 감소 흔함" 정도만, 조건부로

### 참고 (왜 이렇게 썼는지)
PDF.js로 페이지를 캔버스 렌더링 → JPEG 변환 → jsPDF 재조립 방식. 서버 업로드 없음(사실 확인됨). 스캔·이미지 PDF에 잘 먹히고 텍스트 PDF는 효과 적음 — 그래서 설명문에 그 한계를 그대로 적어놓음(감추면 나중에 리뷰에서 걸림).

---

*다음 툴 등록할 땐 위 pdf-compressor 섹션을 통째로 복사해서 `## 툴슬러그` 새 섹션 만들고 1~8번 내용만 바꿔 채우기.*
