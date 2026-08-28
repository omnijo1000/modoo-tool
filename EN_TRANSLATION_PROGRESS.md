# 가이드 영어(EN) 번역 진행 상황

**마지막 갱신**: 2026-08-28  |  **진행률**: 176/176 (완료)

## 배경 & 방식

- `guides/` ko 250개 작성 완료 후, zh/ja는 유입 거의 없어 스킵하고 **영어만** 번역 진행.
- 대상: 8개 기술 카테고리(dev/text/image/security/generator/pdf/ai/data-tools) 176개.
  한국 세법·노무·부동산 등 finance/health/date-time-tools는 국가특화 콘텐츠라 번역 제외.
- **URL 분리 방식**: `guides/{slug}.html`(ko, 기존 유지) 옆에 `guides/{slug}-en.html`(신규) 생성.
  JS 토글 아님 — 완전히 별도 정적 파일.
- **번역 원칙**: ko 원문이 이미 도구 소스코드로 검증 완료된 내용이므로 재검증 불필요.
  숫자·사실·결론 그대로 유지, 자연스러운 영어로 번역만.

## 매 항목 작업 시 체크리스트 (에이전트 프롬프트 표준 절차)

1. `guides/{slug}.html` 원문 전체 읽기 (재검증 없이 번역 소스로만 사용)
2. `guides/{slug}-en.html` 신규 생성:
   - `<html lang="en">`, title/meta description/h1/본문/FAQ/footer 번역
   - canonical = 자기 자신(`-en.html`)
   - hreflang 3줄: `ko`→`{slug}.html`, `en`→`{slug}-en.html`, `x-default`→`{slug}.html` (zh/ja는 없으므로 추가 금지)
   - JSON-LD Article: headline/description 번역, datePublished/dateModified = 작업일
   - `.tool-links`의 각 href에 `?lang=en` 쿼리 추가
3. ko 원본(`guides/{slug}.html`)에도 hreflang 3줄 보강(없으면 추가, ko/x-default만 있으면 en 줄 삽입)
4. 소스 툴 페이지(`{tool}.html`)에 영어 UI용 백링크 추가 — 3가지 패턴 중 하나로 존재:
   - **패턴1**: 정적 `.guide-links` div (CSS `html[lang="ko"] .guide-links{display:block}` 게이팅) → 형제 `.guide-links-en` div 추가 + 대응 CSS(`html[lang="en"]`)
   - **패턴2**: JS `_i18n` 객체의 `en:` 블록 `seoHtml:` 안에 첫 요소로 링크 삽입 (ko/zh/ja는 건드리지 않음)
   - **패턴3**: 정적 seoDiv에 직접 박힌 케이스 → 패턴1과 유사하게 형제 요소+CSS로 처리
5. 완료 후: sitemap.xml에 `-en.html` URL 등록(priority 0.6), 이 문서에 체크 표시

**세션이 끊기거나 다른 PC에서 이어갈 때**: 이 문서의 미체크(`[ ]`) 항목부터 10개씩 골라 진행하면 됨.
따로 참고할 임시 파일 없음 — 이 문서가 유일한 소스.

## 진행 현황 (카테고리별)
| 카테고리 | 완료/전체 |
|---|---|
| 개발자 도구 (developer-tools) | 52/52 |
| 텍스트 도구 (text-tools) | 32/32 |
| 이미지 도구 (image-tools) | 24/24 |
| 생성기 도구 (generator-tools) | 21/21 |
| 보안 도구 (security-tools) | 17/17 |
| PDF 도구 (pdf-tools) | 13/13 |
| AI 도구 (ai-tools) | 10/10 |
| 데이터 도구 (data-tools) | 7/7 |

---

## 개발자 도구 (developer-tools) — 52/52

- [x] `api-response-viewer-large-integer-rounding` ← tool: `api-response-viewer`
- [x] `api-tester-cors-vs-network-error-typeerror` ← tool: `api-tester`
- [x] `canonical-tag-duplicate-google-ignores-both` ← tool: `canonical-tag-checker`
- [x] `cron-spring-quartz-vs-crontab` ← tool: `cron-generator`
- [x] `css-beautifier-char-by-char-nesting-scss-limit` ← tool: `css-beautifier`
- [x] `css-color-shorthand-minification` ← tool: `css-minifier`
- [x] `csv-diff-encoding-bom-delimiter-traps` ← tool: `csv-diff-checker`
- [x] `curl-generator-shell-escaping-asymmetry` ← tool: `curl-generator`
- [x] `curl-parser-d-flag-implicit-post` ← tool: `curl-parser`
- [x] `dns-propagation-ttl-explained` ← tool: `dns-lookup`
- [x] `graphql-formatter-hash-comment-vs-string` ← tool: `graphql-formatter`
- [x] `graphql-query-builder-type-inference-naming` ← tool: `graphql-query-builder`
- [x] `html-minifier-regex-pre-textarea-bug` ← tool: `html-minifier`
- [x] `html-to-markdown-structural-loss` ← tool: `html-to-markdown`
- [x] `http-request-builder-cors-preflight-3-conditions` ← tool: `http-request-builder`
- [x] `javascript-beautifier-brace-counting-for-loop-bug` ← tool: `javascript-beautifier`
- [x] `javascript-minifier-string-boundary-regex-risk` ← tool: `javascript-minifier`
- [x] `json-schema-null-array-type-gaps` ← tool: `json-schema-generator`
- [x] `json-to-xml-array-null-limits` ← tool: `json-to-xml`
- [x] `json-to-yaml-auto-quoting-reserved-words` ← tool: `json-to-yaml`
- [x] `keyword-cannibalization-string-vs-intent` ← tool: `keyword-cannibalization-checker`
- [x] `keyword-difficulty-rule-based-no-real-data` ← tool: `keyword-difficulty-estimator`
- [x] `keyword-grouping-search-intent-vs-clustering` ← tool: `keyword-grouping-tool`
- [x] `markdown-xss-commonmark-history` ← tool: `markdown-preview`
- [x] `mime-type-sniffing-nosniff-header` ← tool: `mime-type-finder`
- [x] `number-converter-twos-complement-negative` ← tool: `number-converter`
- [x] `open-graph-preview-tool-accuracy-limits` ← tool: `open-graph-preview`
- [x] `redirect-checker-301-302-307-308-explained` ← tool: `redirect-checker`
- [x] `regex-catastrophic-backtracking-redos` ← tool: `regex-tester`
- [x] `regex-generator-credit-card-no-luhn-check` ← tool: `regex-generator`
- [x] `regex-zero-width-match-count-not-visible` ← tool: `regex-cheatsheet`
- [x] `robots-meta-tag-noindex-follow-combinations` ← tool: `meta-tag-analyzer`
- [x] `robots-txt-disallow-empty-vs-slash` ← tool: `robots-txt-validator`
- [x] `schema-required-vs-recommended-fields` ← tool: `schema-validator`
- [x] `serp-title-pixel-width-not-char-count` ← tool: `serp-snippet-preview`
- [x] `sitemap-changefreq-priority-google-ignores` ← tool: `sitemap-validator`
- [x] `sitemap-priority-changefreq-ignored` ← tool: `sitemap-extractor`
- [x] `slug-generator-nfd-unicode-normalization` ← tool: `slug-generator`
- [x] `sql-minifier-comment-string-collision-bug` ← tool: `sql-minifier`
- [x] `sql-validator-not-a-real-parser` ← tool: `sql-validator`
- [x] `tailwind-color-cielab-perceptual-distance` ← tool: `tailwind-color-generator`
- [x] `unit-converter-gb-vs-gib-binary-decimal` ← tool: `unit-converter`
- [x] `user-agent-applewebkit-537-36-legacy` ← tool: `user-agent-parser`
- [x] `uuid-extractor-version-variant-regex-detection` ← tool: `uuid-extractor`
- [x] `uuid-primary-key-performance` ← tool: `uuid-validator`
- [x] `webhook-signature-github-stripe-slack-differ` ← tool: `webhook-generator`
- [x] `webhook-signature-timing-attack-constant-time` ← tool: `webhook-tester`
- [x] `whois-rdap-protocol-transition` ← tool: `whois-lookup`
- [x] `xml-validator-well-formed-vs-valid` ← tool: `xml-validator`
- [x] `yaml-diff-regex-comment-false-positive` ← tool: `yaml-diff-checker`
- [x] `yaml-norway-problem-boolean-parsing` ← tool: `yaml-validator`
- [x] `yaml-to-json-kubernetes-multi-document-error` ← tool: `yaml-to-json`

## 텍스트 도구 (text-tools) — 32/32

- [x] `alphabetizer-localecompare-vs-unicode-sort` ← tool: `alphabetizer`
- [x] `anagram-checker-character-frequency-array` ← tool: `anagram-checker`
- [x] `ascii-del-127-punch-tape-history` ← tool: `ascii-table`
- [x] `ascii-utf8-subset-compatibility` ← tool: `ascii-converter`
- [x] `cps-human-click-speed-limit-butterfly` ← tool: `cps-calculator`
- [x] `emoji-counter-surrogate-pair-sns-limit` ← tool: `emoji-counter`
- [x] `emoji-remover-digit-false-positive` ← tool: `emoji-remover`
- [x] `hashtag-count-strategy-3-4-3-ratio` ← tool: `hashtag-generator`
- [x] `keyword-extractor-korean-particle-limitation` ← tool: `keyword-extractor`
- [x] `ngram-analyzer-cjk-regex-language-bias` ← tool: `ngram-analyzer`
- [x] `palindrome-checker-codepoint-vs-grapheme` ← tool: `palindrome-checker`
- [x] `reading-level-smog-formula-simplification-error` ← tool: `reading-level-checker`
- [x] `reading-time-korean-cjk-char-count` ← tool: `read-time-calculator`
- [x] `remove-special-characters-emoji-surrogate-bug` ← tool: `remove-special-characters`
- [x] `sentence-boundary-detection-limits` ← tool: `sentence-counter`
- [x] `sms-byte-limit-euckr-encoding` ← tool: `character-counter`
- [x] `stopword-remover-tfidf-distortion` ← tool: `stopword-remover`
- [x] `text-case-camelcase-vs-kebab-case-origin` ← tool: `text-case-detector`
- [x] `text-diff-lcs-algorithm-explained` ← tool: `text-diff-checker`
- [x] `text-encryptor-caesar-to-aes-history` ← tool: `text-encryptor`
- [x] `text-reverser-emoji-surrogate-pair-break` ← tool: `text-reverser`
- [x] `text-shuffler-fisher-yates-bias` ← tool: `text-shuffler`
- [x] `text-sorter-natural-sort-numeric-order` ← tool: `text-sorter`
- [x] `text-statistics-flesch-korean-limitation` ← tool: `text-statistics`
- [x] `text-summarizer-korean-limitation` ← tool: `text-summarizer`
- [x] `turkish-i-problem-case-conversion` ← tool: `case-converter`
- [x] `typing-speed-wpm-5-char-word-standard` ← tool: `typing-speed-test`
- [x] `unicode-escape-js-json-python-comparison` ← tool: `unicode-converter`
- [x] `unicode-homograph-phishing-domains` ← tool: `unicode-inspector`
- [x] `word-counter-lexical-diversity-ttr` ← tool: `word-counter`
- [x] `word-frequency-percentage-denominator-basis` ← tool: `word-frequency-counter`
- [x] `wpm-korean-typing-vs-english-conversion` ← tool: `wpm-calculator`

## 이미지 도구 (image-tools) — 24/24

- [x] `avif-to-jpg-transparent-background-black` ← tool: `avif-to-jpg`
- [x] `base64-image-33-percent-overhead` ← tool: `base64-image`
- [x] `color-blindness-simulator-accuracy` ← tool: `color-blindness-simulator`
- [x] `color-converter-srgb-vs-display-p3` ← tool: `color-converter`
- [x] `color-palette-complementary-triadic-angles` ← tool: `color-palette`
- [x] `exif-gps-dms-rational-format` ← tool: `exif-viewer`
- [x] `exif-remover-gps-privacy-sns` ← tool: `exif-remover`
- [x] `heic-to-jpg-hevc-codec-license` ← tool: `heic-to-jpg`
- [x] `ico-converter-png-inside-ico` ← tool: `ico-converter`
- [x] `image-color-extractor-clustering-vs-average` ← tool: `image-color-extractor`
- [x] `image-dimension-aspect-ratio-gcd` ← tool: `image-dimension-checker`
- [x] `image-dpi-checker-cm-inch-conversion-bug` ← tool: `image-dpi-checker`
- [x] `image-rotator-canvas-bounding-box-expand` ← tool: `image-rotator`
- [x] `image-upscale-quality-loss` ← tool: `image-resizer`
- [x] `image-watermark-webfont-vs-pdf-font` ← tool: `image-watermark`
- [x] `jpg-to-heic-codec-license-webp-fallback` ← tool: `jpg-to-heic`
- [x] `pixelate-image-low-intensity-recovery-risk` ← tool: `pixelate-image`
- [x] `png-to-svg-not-real-vector-tracing` ← tool: `png-to-svg`
- [x] `progressive-vs-baseline-jpeg` ← tool: `png-to-jpg`
- [x] `svg-animation-to-png-static-frame` ← tool: `svg-to-png`
- [x] `svg-cleaner-editor-namespace-bloat` ← tool: `svg-cleaner`
- [x] `svg-viewer-script-execution-blocked` ← tool: `svg-viewer`
- [x] `transparent-background-color-key-tolerance` ← tool: `transparent-background-maker`
- [x] `webp-compatibility-kakaotalk-old-devices` ← tool: `webp-to-jpg`

## 생성기 도구 (generator-tools) — 21/21

- [x] `apache-htaccess-vs-virtualhost-performance` ← tool: `apache-config-generator`
- [x] `google-title-pixel-width-truncation` ← tool: `seo-title-generator`
- [x] `hreflang-bidirectional-mistakes` ← tool: `hreflang-generator`
- [x] `htaccess-hsts-lockout-risk` ← tool: `htaccess-generator`
- [x] `lorem-ipsum-cicero-history` ← tool: `lorem-ipsum-generator`
- [x] `meta-description-google-rewrite` ← tool: `meta-description-generator`
- [x] `meta-keywords-tag-google-2009-deprecated` ← tool: `meta-tag-generator`
- [x] `nginx-event-driven-vs-apache-thread` ← tool: `nginx-config-generator`
- [x] `open-graph-social-cache-not-updating` ← tool: `open-graph-generator`
- [x] `qr-code-error-correction-logo` ← tool: `qr-code-generator`
- [x] `random-string-modulo-bias-rejection-sampling` ← tool: `nanoid-generator`
- [x] `robots-txt-allow-disallow-conflict-rule` ← tool: `robots-txt-generator`
- [x] `schema-markup-json-ld-rich-snippet-ctr` ← tool: `schema-markup-generator`
- [x] `sitemap-generator-50000-url-limit` ← tool: `sitemap-generator`
- [x] `twitter-card-og-tag-fallback` ← tool: `twitter-card-generator`
- [x] `ulid-crockford-base32-no-ilou` ← tool: `ulid-generator`
- [x] `utm-internal-link-tracking-mistake` ← tool: `utm-builder`
- [x] `uuid-crypto-randomuuid-collision-probability` ← tool: `uuid-generator`
- [x] `uuid-variant-bits-fourth-group` ← tool: `uuid-converter`
- [x] `youtube-thumbnail-text-10-char-limit` ← tool: `ai-thumbnail-title-generator`
- [x] `youtube-title-thumbnail-redundancy` ← tool: `ai-youtube-title-generator`

## 보안 도구 (security-tools) — 17/17

- [x] `bcrypt-72-byte-korean-limit` ← tool: `bcrypt-generator`
- [x] `bcrypt-validator-salt-embedded-hash` ← tool: `bcrypt-validator`
- [x] `cors-preflight-simple-vs-non-simple-request` ← tool: `cors-header-checker`
- [x] `csp-report-only-rollout-three-stages` ← tool: `csp-validator`
- [x] `csp-unsafe-inline-nonce-alternative` ← tool: `csp-generator`
- [x] `csr-key-size-rsa-vs-ec-tradeoff` ← tool: `csr-generator`
- [x] `hash-checker-md5-web-crypto-unsupported` ← tool: `hash-checker`
- [x] `hmac-length-extension-attack` ← tool: `hmac-generator`
- [x] `html-decoder-native-parser-safety` ← tool: `html-decoder`
- [x] `http-header-hsts-max-age-zero-trap` ← tool: `http-header-checker`
- [x] `md5-sha1-hash-vs-hmac-vs-crc32` ← tool: `hash-generator`
- [x] `random-string-crypto-entropy-calculation` ← tool: `random-string`
- [x] `rsa-public-exponent-65537-pkcs-formats` ← tool: `rsa-key-generator`
- [x] `ssh-key-ed25519-vs-rsa-shell-escape` ← tool: `ssh-key-generator`
- [x] `ssl-checker-certificate-transparency-logs` ← tool: `ssl-checker`
- [x] `url-decoding-plus-sign-double-decode` ← tool: `url-decoder`
- [x] `url-double-encoding-plus-vs-percent20` ← tool: `url-encoder`

## PDF 도구 (pdf-tools) — 13/13

- [x] `image-to-pdf-recompression-size-increase` ← tool: `image-to-pdf`
- [x] `pdf-extract-images-page-rasterize-not-embedded` ← tool: `pdf-extract-images`
- [x] `pdf-metadata-privacy-leak` ← tool: `pdf-metadata-viewer`
- [x] `pdf-metadata-remove-empty-vs-delete` ← tool: `pdf-metadata-remover`
- [x] `pdf-ocr-per-page-text-detection` ← tool: `pdf-ocr`
- [x] `pdf-page-count-fixed-layout-vs-reflow` ← tool: `pdf-page-counter`
- [x] `pdf-password-remover-generic-error` ← tool: `pdf-password-remover`
- [x] `pdf-rotate-metadata-no-quality-loss` ← tool: `pdf-rotate`
- [x] `pdf-size-analyzer-shared-resource-limit` ← tool: `pdf-size-analyzer`
- [x] `pdf-to-text-table-coordinate-scatter` ← tool: `pdf-to-text`
- [x] `pdf-user-vs-owner-password` ← tool: `pdf-password-adder`
- [x] `pdf-watermark-korean-font-embedding-limit` ← tool: `pdf-watermark`
- [x] `pdf-word-counter-cjk-whitespace-split` ← tool: `pdf-word-counter`

## AI 도구 (ai-tools) — 10/10

- [x] `ai-model-comparison-free-tier-differences` ← tool: `ai-model-comparison`
- [x] `chat-export-silent-failure-role-prefix` ← tool: `markdown-chat-exporter`
- [x] `image-prompt-generator-dalle-negative-prompt-bug` ← tool: `image-prompt-generator`
- [x] `korean-ai-token-inefficiency` ← tool: `ai-token-counter`
- [x] `prompt-cleaner-token-count-approximation` ← tool: `prompt-cleaner`
- [x] `prompt-formats-chatml-xml-jsonl` ← tool: `prompt-formatter`
- [x] `prompt-optimizer-task-type-rctf-structure` ← tool: `prompt-optimizer`
- [x] `prompt-template-chain-of-thought-fixed-steps` ← tool: `prompt-template-generator`
- [x] `prompt-variable-extractor-bracket-syntax-limit` ← tool: `prompt-variable-extractor`
- [x] `system-prompt-fixed-clauses-roleplay-conflict` ← tool: `system-prompt-generator`

## 데이터 도구 (data-tools) — 7/7

- [x] `csv-to-json-leading-zero-loss` ← tool: `csv-to-json`
- [x] `json-array-diff-index-vs-lcs` ← tool: `json-diff`
- [x] `json-flatten-unflatten-array-loss` ← tool: `json-flattener`
- [x] `json-large-integer-precision-loss` ← tool: `json-validator`
- [x] `jsonpath-syntax-and-slicing-support` ← tool: `json-path-tester`
- [x] `sql-insert-to-json-escaped-quote-bug` ← tool: `sql-to-json`
- [x] `xml-to-json-mixed-content-whitespace-loss` ← tool: `xml-to-json`
