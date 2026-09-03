# P2-A: 언어 토글 / i18n 보일러플레이트 통합

> 새 세션에서 진행. 코드 품질·유지보수성 개선 시리즈의 마지막 항목.
> **선행 완료**: P1-A(aria-live), P1-B(tax-table.js), P2-B(four-insurance 검증),
> P2-C(info 페이지), P2-D(transition:all), P2-E(넓은 표), P3(docs) — 커밋
> `69ac9ae`~`6b87e70`, 전부 배포·라이브 검증 완료.

---

## 목표

~280개 다국어 페이지에 복제된 언어 감지·전환·적용 로직을 공유 자산으로 추출.
페이지는 **`_i18n` 데이터 객체 + 페이지 고유 후처리 콜백**만 유지.

## 왜 별도 세션인가 (이번 세션에서 안 한 이유)

- `detectLang` 함수만 **225파일에 189개 고유 시그니처** (대부분 공백 차이지만 실제 분기도 섞임)
- 언어 전환 = 모든 다국어 페이지의 핵심 UX 경로 → 회귀 표면 = 사이트 전체
- 클린 mechanical 추출 불가 → 변형 분류 + 헬퍼 설계 + 파일럿 + 배치 검증 필요
- 활성 버그를 유발하진 않음 (단, 아래 "발견된 실제 버그" 참고)

---

## 현황 데이터 (2026-09, 실측)

| 항목 | 분포 |
|---|---|
| `detectLang` 명명 함수 보유 | 225파일 (그 외는 lang 초기화 IIFE에 인라인) |
| `detectLang` 고유 시그니처 | 189 (공백 정규화 후에도) |
| 토글 함수명 | `cycleLang` 244 / `toggleLang` 41 (둘 다 가진 파일 0) |
| **localStorage 키** | **`modoo_lang` 237 / `lang` 49** ← 불일치 |
| i18n 변수명 | `_i18n` 263 / `i18n` 22 |
| `applyLang` 명명 | `applyLang` 243 / `_applyLang` 40 |
| lang order 배열 | **`['ko','en','zh','ja']` 282파일 전부 동일** |
| `applyLang` 본문이 하는 일 | `<html lang>` 설정 283 · `document.title` 197 · `seoDiv/seoHtml` 주입 191 · `[data-i18n]` 루프 98 · calc/update 재호출 48 · aria-label i18n 3 |

### 발견된 실제 버그 (P2-A로 해결됨)

**언어 설정이 페이지 그룹 간 안 넘어감.** 49개 파일(json-formatter, timestamp,
tip-calculator, emi-calculator, savings-calc, index.html 등)은 `localStorage['lang']`,
나머지 237개는 `localStorage['modoo_lang']`. json-formatter에서 EN 선택 후
salary 방문 시 KO로 표시됨. → **통합 시 단일 키(`modoo_lang`)로 정규화 필수.**

### 이미 있는 인프라 (활용)

`theme-instrument.js`가 **이미 `<html lang>` 속성 변경을 MutationObserver로 감시**
(라인 276): `localizeEyebrow()` + `localizeVhLabels()` 재실행. 공유 i18n 헬퍼도
같은 훅에 연결 가능.

```js
// theme-instrument.js 기존 패턴
new MutationObserver(function(){ localizeEyebrow(); localizeVhLabels(); })
  .observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
```

---

## 제안 아키텍처

### 신규: `/mh-i18n.js` (classic script, 인라인 페이지 스크립트보다 먼저 로드)

```js
window.MHI18n = {
  // 페이지가 호출: init({ strings: _i18n, apply: fn })
  init(cfg){
    const ORDER = ['ko','en','zh','ja'];
    const KEY = 'modoo_lang';                    // 단일 키 정규화
    const strings = cfg.strings;
    let lang = detect();

    function detect(){
      const u = new URLSearchParams(location.search).get('lang');
      if (u && strings[u]) return u;
      const s = localStorage.getItem(KEY);
      if (s && strings[s]) return s;
      const n = (navigator.language||'').slice(0,2);
      return strings[n] ? n : (n.startsWith('zh') && strings.zh ? 'zh' : 'en');
    }
    function apply(l){
      const t = strings[l] || strings.ko;
      document.documentElement.lang = l;
      if (t.pageTitle) document.title = t.pageTitle;
      document.querySelectorAll('[data-i18n]').forEach(el=>{
        const v = t[el.dataset.i18n]; if (v !== undefined) el.innerHTML = v;
      });
      if (typeof cfg.apply === 'function') cfg.apply(t, l);   // 페이지 고유 후처리
    }
    MHI18n.cycle = function(){
      lang = ORDER[(ORDER.indexOf(lang)+1)%ORDER.length];
      localStorage.setItem(KEY, lang);
      const url = new URL(location.href); url.searchParams.set('lang', lang);
      history.replaceState(null,'',url);
      apply(lang);
    };
    MHI18n.get = ()=>lang;
    document.addEventListener('DOMContentLoaded', ()=>apply(lang));
  }
};
```

### 페이지 측 (before → after)

**Before** (~40줄):
```js
const _i18n = { ko:{...}, en:{...}, zh:{...}, ja:{...} };
function detectLang(){ ... }
function applyLang(){ ... document.title=...; document.querySelectorAll('[data-i18n]')...; seoDiv.innerHTML=...; }
function cycleLang(){ ... localStorage.setItem('modoo_lang', ...); applyLang(); }
let currentLang = detectLang();
document.addEventListener('DOMContentLoaded', ()=>applyLang(currentLang));
```

**After** (~10줄):
```js
const _i18n = { ko:{...}, en:{...}, zh:{...}, ja:{...} };
MHI18n.init({
  strings: _i18n,
  apply(t, lang){
    // 페이지 고유만: seoDiv 주입 / 재계산 등
    document.getElementById('seoDiv').innerHTML = t.seoHtml;
    if (document.getElementById('result')?.style.display !== 'none') calc();
  }
});
```
버튼: `onclick="cycleLang()"` → `onclick="MHI18n.cycle()"` (또는 `mh-i18n.js`가
`window.cycleLang = MHI18n.cycle` 별칭 제공 → HTML `onclick` 무수정)

---

## 마이그레이션 계획 (단계별, 각 단계 후 커밋+배포+검증)

### 0단계: 헬퍼 + 파일럿
- [ ] `mh-i18n.js` 작성. `window.cycleLang`/`window.toggleLang` 별칭 제공 (HTML onclick 무수정)
- [ ] 파일럿 6개 (변형 스펙트럼): `json-formatter`(i18n·lang키·renderFaq), `salary`(_i18n·modoo_lang·복잡 applyLang), `compound-interest`(seoHtml·재계산), `bmi-calc`(aria-label i18n), `unit-converter`(대형), `qr-code-generator`(단순)
- [ ] 각 파일럿: `<script src="mh-i18n.js">` 추가 + 보일러플레이트 → `MHI18n.init` 교체
- [ ] 브라우저: ko→en→zh→ja→ko 순환, 각 언어에서 `<html lang>`·title·`[data-i18n]`·seoDiv·재계산·`localStorage['modoo_lang']` 확인. `?lang=en` 진입, 새로고침 유지
- [ ] `localStorage['lang']` 잔재 마이그레이션: `mh-i18n.js`에 `const old=localStorage.getItem('lang'); if(old && !localStorage.getItem('modoo_lang')) localStorage.setItem('modoo_lang', old);` 1회성

### 1단계: 변형 분류 (스크립트)
- [ ] 285개 다국어 파일을 `applyLang` 본문 시그니처로 클러스터링:
  - A: `<html lang>` + title + `[data-i18n]` 루프만 (순수 제너릭) — 헬퍼가 전부 처리, `apply` 콜백 불필요
  - B: A + `seoDiv/seoHtml` 주입 (191) — `apply`에 1줄
  - C: B + 재계산 호출 (48) — `apply`에 2줄
  - D: aria-label/`data-i18n-aria` 커스텀 (3, bmi 등) — 개별 처리
  - E: 완전 비표준 (renderFaq, 커스텀 아코디언 등) — 개별
- [ ] 클러스터별 파일 목록 + 예상 `apply` 콜백 템플릿 산출

### 2단계: 클러스터 A/B 배치 (제일 안전, 최대 물량)
- [ ] 스크립트로 보일러플레이트 블록 제거 + `MHI18n.init` 삽입 (클러스터별 콜백 템플릿)
- [ ] 배치 30~50개씩. 각 배치 후:
  - `node --check` 전 인라인 스크립트
  - 브라우저 자동화: 배치 내 표본 10개 4언어 순환 + 콘솔 에러 0
  - 커밋 + 배포 + curl 라이브 확인
- [ ] `git revert` 가능하도록 배치당 1커밋

### 3단계: 클러스터 C
- [ ] 재계산 호출 순서 주의: `apply` 콜백에서 `calc()`는 `[data-i18n]` 갱신 **후** 호출돼야 함 (헬퍼가 콜백을 마지막에 호출하므로 자동 충족)
- [ ] 표본 브라우저 검증 강화 (계산 결과가 언어 전환 후에도 정확한지)

### 4단계: 클러스터 D/E (개별 수술)
- [ ] bmi-calc `data-i18n-aria` 루프 → `apply` 콜백에 이식 or 헬퍼에 `data-i18n-aria` 지원 추가
- [ ] renderFaq / 커스텀 아코디언 페이지 → 개별 콜백
- [ ] `<html lang="ko">` 고정 단일언어 툴(38개, salary 등 KO 전용)은 **건드리지 않음** (i18n 없음)

### 5단계: 정리
- [ ] `mh-i18n.js` sitemap 미등재 확인 (자산)
- [ ] CLAUDE.md i18n 섹션 갱신 (`MHI18n.init` 패턴이 신규 표준)
- [ ] 잔존 `function detectLang`/`function applyLang`/`function cycleLang` 전수 grep = 0 (클러스터 E 개별 제외)
- [ ] 전 사이트 회귀 스윕 (JS 문법, ld+json, 내부링크, 4언어 표본 40개)

---

## 회귀 테스트 체크리스트 (배치마다)

- [ ] `node --check` 전 인라인 `<script>` 0 에러
- [ ] `ko→en→zh→ja→ko` 순환: `document.documentElement.lang` 정확, `document.title` 갱신, `[data-i18n]` 요소 innerHTML 교체, `.eyebrow`(localizeEyebrow) 언어별, `.seo`/`#seoDiv` 콘텐츠 언어별
- [ ] `localStorage.getItem('modoo_lang')` = 선택 언어, **`localStorage['lang']` 미사용**
- [ ] `?lang=en` URL 진입 시 EN 렌더, 토글 후 `history.replaceState`로 `?lang=` 갱신
- [ ] 새로고침 후 언어 유지
- [ ] 계산기: 언어 전환 후 결과값 정확 (재계산 콜백)
- [ ] 콘솔 에러 0, `unhandledrejection` 0
- [ ] 페이지 간 이동 시 언어 유지 (json-formatter EN → salary도 EN)  ← 기존 버그 해결 확인

---

## 절대 변경 금지

- 계산 로직 / 결과값 / 법정 수치
- URL / 슬러그 / canonical / hreflang / sitemap
- SEO 구조 (`<div class="seo">` 정적 프리렌더, FAQ `<details>`, JSON-LD)
- 광고 설정 (`adsbygoogle.js` 로더, ads.txt)
- 디자인 (레이아웃·색·폰트·간격)
- `_i18n` 객체의 **문자열 내용** (번역 텍스트는 그대로 이동만)
- `<html lang="ko">` 고정 단일언어 툴 38개 (i18n 자체가 없음)

## 롤백

배치당 1커밋 → 문제 시 `git revert <배치커밋>` + `git push`.
`mh-i18n.js`는 `window.cycleLang` 별칭 제공하므로 HTML `onclick` 무수정 →
헬퍼만 되돌려도 대부분 복구. (단 보일러플레이트가 이미 제거된 파일은 revert 필요)

---

## 예상 규모

- 대상: ~285 다국어 파일 (38 KO 전용 제외)
- 클러스터 A/B: ~200 (배치 자동화 가능)
- 클러스터 C: ~48
- 클러스터 D/E: ~35 (개별)
- 절감: 페이지당 ~1KB 보일러플레이트 + `mh-i18n.js` 캐시 1회 → 총 ~250KB 전송량 감소
- 커밋: 8~12개 (0단계 1 + 배치 6~10 + 정리 1)
