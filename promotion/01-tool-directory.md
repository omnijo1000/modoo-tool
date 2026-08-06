# Tool Directory 등록 카피

AlternativeTo 등록 폼에 들어가서, 아래 필드를 순서대로 복붙하면 됨.

---

## pdf-compressor

상태:
- [x] **SaaSHub** — 2026-08-04 제출 완료, 승인 대기 중.
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
