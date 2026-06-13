/**
 * related.js — 모두의 툴 내부링크 클러스터링
 * 각 도구 페이지 </body> 직전에 <script src="related.js"></script> 추가하면 동작
 */
(function () {
  'use strict';

  // ── 언어 감지 ────────────────────────────────────────────────────
  function getLang() {
    var u = new URLSearchParams(location.search).get('lang');
    if (u && { ko: 1, en: 1, zh: 1, ja: 1 }[u]) return u;
    var s = localStorage.getItem('modoo_lang');
    if (s && { ko: 1, en: 1, zh: 1, ja: 1 }[s]) return s;
    var n = (navigator.language || '').slice(0, 2);
    return n === 'zh' ? 'zh' : n === 'ko' ? 'ko' : n === 'ja' ? 'ja' : 'en';
  }

  // ── 도구 정보 레지스트리 [slug]: { ko, en, zh, ja, icon } ─────────
  var T = {
    /* ── 금융 ── */
    'compound-interest':         { ko: '복리 계산기',         en: 'Compound Interest',         zh: '复利计算器',         ja: '複利計算機',           icon: '💰' },
    'savings-calc':              { ko: '적금 계산기',          en: 'Savings Calculator',         zh: '储蓄计算器',         ja: '積立計算機',           icon: '🏦' },
    'sip-calculator':            { ko: 'SIP 계산기',           en: 'SIP Calculator',             zh: 'SIP计算器',          ja: 'SIP計算機',            icon: '📈' },
    'investment-return-calculator': { ko: '투자 수익률 계산기', en: 'Investment Return',         zh: '投资收益计算器',      ja: '投資収益計算機',       icon: '📈' },
    'roi-calculator':            { ko: 'ROI 계산기',           en: 'ROI Calculator',             zh: 'ROI计算器',          ja: 'ROI計算機',            icon: '📊' },
    'fire-calculator':           { ko: 'FIRE 계산기',          en: 'FIRE Calculator',            zh: 'FIRE计算器',         ja: 'FIRE計算機',           icon: '🔥' },
    'inflation-calculator':      { ko: '물가상승률 계산기',    en: 'Inflation Calculator',       zh: '通胀计算器',         ja: 'インフレ計算機',       icon: '📉' },
    'emi-calculator':            { ko: 'EMI 계산기',           en: 'EMI Calculator',             zh: 'EMI计算器',          ja: 'EMI計算機',            icon: '🏠' },
    'loan-calculator-en':        { ko: '대출 계산기',          en: 'Loan Calculator',            zh: '贷款计算器',         ja: 'ローン計算機',         icon: '💳' },
    'mortgage-calculator':       { ko: '모기지 계산기',        en: 'Mortgage Calculator',        zh: '房贷计算器',         ja: '住宅ローン計算機',     icon: '🏡' },
    'apr-calculator':            { ko: 'APR 계산기',           en: 'APR Calculator',             zh: 'APR计算器',          ja: 'APR計算機',            icon: '📋' },
    'loan-payoff-calculator':    { ko: '대출 상환 계산기',     en: 'Loan Payoff Calculator',     zh: '贷款还清计算器',      ja: 'ローン完済計算機',     icon: '✅' },
    'gst-calculator':            { ko: 'GST 계산기',           en: 'GST Calculator',             zh: 'GST计算器',          ja: 'GST計算機',            icon: '🧾' },
    'vat-calculator-global':     { ko: '글로벌 VAT 계산기',   en: 'Global VAT Calculator',      zh: '全球VAT计算器',       ja: '世界VAT計算機',        icon: '🌍' },
    'currency-converter':        { ko: '환율 계산기',          en: 'Currency Converter',         zh: '汇率换算',           ja: '為替計算機',           icon: '💱' },
    /* ── 건강 ── */
    'bmi-calculator':            { ko: 'BMI 계산기 (Pro)',      en: 'BMI Calculator (Pro)',        zh: 'BMI计算器(Pro)',      ja: 'BMI計算機(Pro)',        icon: '⚖️' },
    'bmi-calc':                  { ko: 'BMI 계산기',           en: 'BMI Calculator',             zh: 'BMI计算器',          ja: 'BMI計算機',            icon: '⚖️' },
    'body-fat-calculator':       { ko: '체지방률 계산기',      en: 'Body Fat Calculator',        zh: '体脂率计算器',        ja: '体脂肪率計算機',       icon: '💪' },
    'calorie-calculator':        { ko: '칼로리 계산기',        en: 'Calorie Calculator',         zh: '卡路里计算器',        ja: 'カロリー計算機',       icon: '🍎' },
    'macro-calculator':          { ko: '매크로 계산기',        en: 'Macro Calculator',           zh: '宏量营养素计算器',    ja: 'マクロ栄養素計算機',   icon: '🥗' },
    'water-intake':              { ko: '물 섭취량 계산기',     en: 'Water Intake Calculator',    zh: '饮水量计算器',        ja: '水分摂取量計算機',     icon: '💧' },
    'pace-calculator':           { ko: '페이스 계산기',        en: 'Pace Calculator',            zh: '配速计算器',          ja: 'ペース計算機',         icon: '🏃' },
    'pregnancy-due-date':        { ko: '임신 출산예정일',      en: 'Pregnancy Due Date',         zh: '孕期预产期计算器',    ja: '出産予定日計算機',     icon: '🤱' },
    /* ── 일상 ── */
    'age-calculator':            { ko: '나이 계산기',          en: 'Age Calculator',             zh: '年龄计算器',          ja: '年齢計算機',           icon: '🎂' },
    'date-calc':                 { ko: '날짜 계산기',          en: 'Date Calculator',            zh: '日期计算器',          ja: '日付計算機',           icon: '📅' },
    'time-calculator':           { ko: '시간 계산기',          en: 'Time Calculator',            zh: '时间计算器',          ja: '時間計算機',           icon: '⏰' },
    'business-days-calculator':  { ko: '영업일 계산기',        en: 'Business Days Calculator',   zh: '工作日计算器',        ja: '営業日計算機',         icon: '📅' },
    'countdown-timer':           { ko: '카운트다운 타이머',    en: 'Countdown Timer',            zh: '倒计时器',            ja: 'カウントダウンタイマー', icon: '⏳' },
    'sleep-calculator':          { ko: '수면 계산기',          en: 'Sleep Calculator',           zh: '睡眠计算器',          ja: '睡眠計算機',           icon: '😴' },
    'pomodoro-timer':            { ko: '뽀모도로 타이머',      en: 'Pomodoro Timer',             zh: '番茄工作法计时器',    ja: 'ポモドーロタイマー',   icon: '🍅' },
    'tip-calculator':            { ko: '팁 계산기',            en: 'Tip Calculator',             zh: '小费计算器',          ja: 'チップ計算機',         icon: '💵' },
    'split-calculator':          { ko: '더치페이 계산기',      en: 'Split Calculator',           zh: 'AA制计算器',          ja: '割り勘計算機',         icon: '🍽️' },
    'percent-calc':              { ko: '퍼센트 계산기',        en: 'Percent Calculator',         zh: '百分比计算器',        ja: 'パーセント計算機',     icon: '🔢' },
    'fuel-cost-calculator':      { ko: '연료비 계산기',        en: 'Fuel Cost Calculator',       zh: '油费计算器',          ja: '燃料費計算機',         icon: '⛽' },
    'electricity-cost-calculator': { ko: '전기요금 계산기',   en: 'Electricity Cost Calculator', zh: '电费计算器',         ja: '電気料金計算機',       icon: '⚡' },
    /* ── 개발자: 포맷터 ── */
    'json-formatter':            { ko: 'JSON 포맷터',          en: 'JSON Formatter',             zh: 'JSON格式化',          ja: 'JSONフォーマッター',   icon: '{ }' },
    'json-validator':            { ko: 'JSON 검증기',          en: 'JSON Validator',             zh: 'JSON验证器',          ja: 'JSONバリデーター',     icon: '✓' },
    'json-viewer':               { ko: 'JSON 뷰어',            en: 'JSON Viewer',                zh: 'JSON查看器',          ja: 'JSONビューアー',       icon: '🌲' },
    'json-minifier':             { ko: 'JSON 압축기',          en: 'JSON Minifier',              zh: 'JSON压缩器',          ja: 'JSONミニファイアー',   icon: '{}' },
    'xml-formatter':             { ko: 'XML 포맷터',           en: 'XML Formatter',              zh: 'XML格式化',           ja: 'XMLフォーマッター',    icon: '〈/〉' },
    'yaml-formatter':            { ko: 'YAML 포맷터',          en: 'YAML Formatter',             zh: 'YAML格式化',          ja: 'YAMLフォーマッター',   icon: '⚙️' },
    'sql-formatter':             { ko: 'SQL 포맷터',           en: 'SQL Formatter',              zh: 'SQL格式化',           ja: 'SQLフォーマッター',    icon: '🗃️' },
    'markdown-preview':          { ko: '마크다운 미리보기',    en: 'Markdown Preview',           zh: 'Markdown预览',        ja: 'Markdownプレビュー',   icon: '📄' },
    'markdown-to-html':          { ko: 'Markdown → HTML',      en: 'Markdown to HTML',           zh: 'Markdown转HTML',      ja: 'Markdown→HTML',        icon: 'MD' },
    'html-to-markdown':          { ko: 'HTML → Markdown',      en: 'HTML to Markdown',           zh: 'HTML转Markdown',      ja: 'HTML→Markdown',        icon: '⬇' },
    /* ── 개발자: 인코딩·해시 ── */
    'base64-url':                { ko: 'Base64 & URL 인코더', en: 'Base64 & URL Encoder',       zh: 'Base64&URL编码',      ja: 'Base64 & URLエンコーダー', icon: '🔢' },
    'base64-encoder':            { ko: 'Base64 인코더',        en: 'Base64 Encoder',             zh: 'Base64编码器',        ja: 'Base64エンコーダー',   icon: '🔡' },
    'base64-decoder':            { ko: 'Base64 디코더',        en: 'Base64 Decoder',             zh: 'Base64解码器',        ja: 'Base64デコーダー',     icon: '🔓' },
    'text-to-base64':            { ko: '텍스트 → Base64',      en: 'Text to Base64',             zh: '文本转Base64',        ja: 'テキスト→Base64',      icon: 'B64' },
    'base64-to-text':            { ko: 'Base64 → 텍스트',      en: 'Base64 to Text',             zh: 'Base64转文本',        ja: 'Base64→テキスト',      icon: 'TXT' },
    'url-encoder':               { ko: 'URL 인코더',           en: 'URL Encoder',                zh: 'URL编码器',           ja: 'URLエンコーダー',      icon: '%2B' },
    'url-decoder':               { ko: 'URL 디코더',           en: 'URL Decoder',                zh: 'URL解码器',           ja: 'URLデコーダー',        icon: '%' },
    'html-decoder':              { ko: 'HTML 엔티티 디코더',   en: 'HTML Entity Decoder',        zh: 'HTML实体解码器',      ja: 'HTMLエンティティデコーダー', icon: '&amp;' },
    'html-encoder':              { ko: 'HTML 인코더/디코더',  en: 'HTML Encoder/Decoder',       zh: 'HTML编码/解码',       ja: 'HTMLエンコーダー/デコーダー', icon: '</>' },
    'base64-image':              { ko: 'Base64 이미지 변환',  en: 'Base64 Image Converter',     zh: 'Base64图片转换',      ja: 'Base64画像変換',       icon: '🖼️' },
    'hash-generator':            { ko: 'Hash 생성기',          en: 'Hash Generator',             zh: 'Hash生成器',          ja: 'ハッシュ生成器',       icon: '#' },
    'sha256-generator':          { ko: 'SHA-256 생성기',       en: 'SHA-256 Generator',          zh: 'SHA-256生成器',        ja: 'SHA-256生成器',        icon: '256' },
    'md5-generator':             { ko: 'MD5 생성기',           en: 'MD5 Generator',              zh: 'MD5生成器',            ja: 'MD5生成器',            icon: 'MD5' },
    /* ── 개발자: 유틸 ── */
    'cron-generator':            { ko: 'Cron 생성기',          en: 'Cron Generator',             zh: 'Cron表达式生成器',    ja: 'Cron式生成器',         icon: '⏱️' },
    'cron-parser':               { ko: 'Cron 파서',            en: 'Cron Parser',                zh: 'Cron解析器',          ja: 'Cronパーサー',         icon: '📋' },
    'cron-validator':            { ko: 'Cron 검증기',          en: 'Cron Validator',             zh: 'Cron验证器',          ja: 'Cronバリデーター',     icon: '✓' },
    'regex-tester':              { ko: '정규식 테스터',        en: 'Regex Tester',               zh: '正则表达式测试',      ja: '正規表現テスター',     icon: '.*' },
    'timestamp':                 { ko: 'Timestamp 변환기',    en: 'Timestamp Converter',        zh: '时间戳转换',          ja: 'タイムスタンプ変換器', icon: '🕑' },
    'uuid-generator':            { ko: 'UUID 생성기',          en: 'UUID Generator',             zh: 'UUID生成器',          ja: 'UUID生成器',           icon: '🆔' },
    'uuid-validator':            { ko: 'UUID 검증기',          en: 'UUID Validator',             zh: 'UUID验证器',          ja: 'UUIDバリデーター',     icon: '✓' },
    'jwt-decoder':               { ko: 'JWT 디코더',           en: 'JWT Decoder',                zh: 'JWT解析器',           ja: 'JWTデコーダー',        icon: '🔑' },
    'jwt-generator':             { ko: 'JWT 생성기',           en: 'JWT Generator',              zh: 'JWT生成器',           ja: 'JWT生成器',            icon: '🔏' },
    /* ── 개발자: 생성기·변환 ── */
    'qr-generator':              { ko: 'QR 코드 생성기',      en: 'QR Code Generator',          zh: 'QR码生成器',          ja: 'QRコード生成器',       icon: '▦' },
    'barcode-generator':         { ko: '바코드 생성기',        en: 'Barcode Generator',          zh: '条码生成器',          ja: 'バーコード生成器',     icon: '▌▐' },
    'number-converter':          { ko: '진법 변환기',          en: 'Number Converter',           zh: '进制转换器',          ja: '進数変換器',           icon: '🔟' },
    'unit-converter':            { ko: '단위 변환기',          en: 'Unit Converter',             zh: '单位换算',            ja: '単位変換器',           icon: '📏' },
    'timezone-converter':        { ko: '시간대 변환기',        en: 'Time Zone Converter',        zh: '时区转换器',          ja: 'タイムゾーン変換器',   icon: '🕐' },
    'random-string':             { ko: '랜덤 문자열 생성기',  en: 'Random String Generator',    zh: '随机字符串生成器',    ja: 'ランダム文字列生成器', icon: '🎲' },
    'lorem-ipsum':               { ko: 'Lorem Ipsum 생성기',  en: 'Lorem Ipsum Generator',      zh: 'Lorem Ipsum生成器',   ja: 'Lorem Ipsum生成器',    icon: '📜' },
    'password-generator':        { ko: '비밀번호 생성기',      en: 'Password Generator',         zh: '密码生成器',          ja: 'パスワード生成器',     icon: '🔐' },
    'case-converter':            { ko: '케이스 변환기',        en: 'Case Converter',             zh: '大小写转换',          ja: 'ケース変換器',         icon: 'Aa' },
    'json-to-csv':               { ko: 'JSON → CSV',           en: 'JSON → CSV',                 zh: 'JSON → CSV',         ja: 'JSON → CSV',           icon: '📊' },
    'csv-to-json':               { ko: 'CSV → JSON',           en: 'CSV → JSON',                 zh: 'CSV → JSON',         ja: 'CSV → JSON',           icon: '📋' },
    'csv-viewer':                { ko: 'CSV 뷰어',             en: 'CSV Viewer',                 zh: 'CSV查看器',           ja: 'CSVビューアー',        icon: '📊' },
    /* ── 개발자: 색상 ── */
    'color-converter':           { ko: '색상 변환기',          en: 'Color Converter',            zh: '颜色转换器',          ja: 'カラー変換器',         icon: '🎨' },
    'color-palette':             { ko: '컬러 팔레트',          en: 'Color Palette',              zh: '调色板',              ja: 'カラーパレット',       icon: '🖌️' },
    'color-picker':              { ko: '컬러 피커',            en: 'Color Picker',               zh: '颜色选择器',          ja: 'カラーピッカー',       icon: '🎨' },
    'color-contrast-checker':    { ko: '색상 대비 검사기',     en: 'Color Contrast Checker',     zh: '色彩对比检查器',      ja: 'カラーコントラストチェッカー', icon: '♿' },
    'hex-to-rgb':                { ko: 'HEX → RGB',            en: 'HEX to RGB',                 zh: 'HEX转RGB',            ja: 'HEX → RGB',            icon: '#→R' },
    'rgb-to-hex':                { ko: 'RGB → HEX',            en: 'RGB to HEX',                 zh: 'RGB转HEX',            ja: 'RGB → HEX',            icon: 'R→#' },
    /* ── 개발자: 이미지 ── */
    'image-compressor':          { ko: '이미지 압축기',        en: 'Image Compressor',           zh: '图片压缩',            ja: '画像圧縮',             icon: '🗜️' },
    'image-resizer':             { ko: '이미지 리사이저',      en: 'Image Resizer',              zh: '图片调整大小',        ja: '画像リサイズ',         icon: '↔️' },
    'image-to-webp':             { ko: '이미지 → WebP',        en: 'Image → WebP',               zh: '图片→WebP',           ja: '画像→WebP',            icon: '🔄' },
    'webp-to-png':               { ko: 'WebP → PNG',           en: 'WebP to PNG',                zh: 'WebP转PNG',           ja: 'WebP→PNG',             icon: '🖼' },
    'png-to-jpg':                { ko: 'PNG → JPG',            en: 'PNG to JPG',                 zh: 'PNG转JPG',            ja: 'PNG→JPG',              icon: '📷' },
    /* ── 개발자: PDF ── */
    'pdf-merge':                 { ko: 'PDF 합치기',           en: 'PDF Merge',                  zh: 'PDF合并',             ja: 'PDF結合',              icon: '📄' },
    'pdf-split':                 { ko: 'PDF 분리',             en: 'PDF Split',                  zh: 'PDF分割',             ja: 'PDF分割',              icon: '✂️' },
    'pdf-compressor':            { ko: 'PDF 압축기',           en: 'PDF Compressor',             zh: 'PDF压缩器',           ja: 'PDF圧縮ツール',        icon: '🗜' },
    'pdf-page-counter':          { ko: 'PDF 페이지 수 계산기', en: 'PDF Page Counter',           zh: 'PDF页数计算器',        ja: 'PDFページ数カウンター', icon: '📑' },
    'pdf-to-image':              { ko: 'PDF → 이미지',         en: 'PDF → Image',                zh: 'PDF→图片',            ja: 'PDF→画像',             icon: '🖼️' },
    'image-to-pdf':              { ko: '이미지 → PDF',         en: 'Image → PDF',                zh: '图片→PDF',            ja: '画像→PDF',             icon: '📑' },
    /* ── AI 도구 ── */
    'ai-token-counter':          { ko: 'AI 토큰 카운터',       en: 'AI Token Counter',           zh: 'AI Token计数器',      ja: 'AIトークンカウンター', icon: '🤖' },
    'ai-cost-calculator':        { ko: 'AI API 비용 계산기',   en: 'AI API Cost Calculator',     zh: 'AI API费用计算器',    ja: 'AI APIコスト計算機',   icon: '💰' },
    'chatgpt-token-counter':     { ko: 'ChatGPT 토큰 카운터',  en: 'ChatGPT Token Counter',      zh: 'ChatGPT Token计数器', ja: 'ChatGPTトークンカウンター', icon: 'GPT' },
    'utm-builder':               { ko: 'UTM 빌더',             en: 'UTM Builder',                zh: 'UTM生成器',           ja: 'UTMビルダー',          icon: '🔗' },
    'ip-address-lookup':         { ko: 'IP 주소 조회',         en: 'IP Address Lookup',          zh: 'IP地址查询',          ja: 'IPアドレス照会',       icon: '🌐' },
    'sitemap-generator':         { ko: '사이트맵 생성기',      en: 'Sitemap Generator',          zh: '站点地图生成器',      ja: 'サイトマップジェネレーター', icon: '🗺️' },
    'xml-validator':             { ko: 'XML 검증기',           en: 'XML Validator',              zh: 'XML验证器',           ja: 'XMLバリデーター',      icon: 'XML' },
    'robots-txt-validator':      { ko: 'Robots.txt 검증기',   en: 'Robots.txt Validator',       zh: 'Robots.txt验证器',   ja: 'Robots.txtバリデーター', icon: '🔍' },
    'meta-tag-analyzer':         { ko: 'Meta 태그 분석기',    en: 'Meta Tag Analyzer',          zh: 'Meta标签分析器',      ja: 'Metaタグ分析器',       icon: '🔎' },
    'open-graph-generator':      { ko: '오픈 그래프 생성기',  en: 'Open Graph Generator',       zh: 'Open Graph生成器',   ja: 'OGジェネレーター',     icon: '📣' },
    'twitter-card-generator':    { ko: '트위터 카드 생성기',  en: 'Twitter Card Generator',     zh: 'Twitter卡片生成器',  ja: 'Twitterカードジェネレーター', icon: '🐦' },
    'schema-markup-generator':   { ko: '스키마 마크업 생성기',en: 'Schema Markup Generator',    zh: 'Schema标记生成器',   ja: 'スキーママークアップジェネレーター', icon: '🏗️' },
    'schema-validator':          { ko: '스키마 검증기',       en: 'Schema Validator',           zh: 'Schema验证器',       ja: 'スキーマバリデーター', icon: '✅' },
    'hreflang-generator':        { ko: 'hreflang 생성기',    en: 'hreflang Generator',         zh: 'hreflang生成器',     ja: 'hreflangジェネレーター', icon: '🌍' },
    'canonical-tag-checker':     { ko: 'Canonical 태그 검사기',en: 'Canonical Tag Checker',    zh: 'Canonical标签检查器',ja: 'Canonicalタグチェッカー', icon: '🔗' },
    /* ── Batch 10 ── */
    'keyword-clustering-tool':   { ko: '키워드 클러스터링',     en: 'Keyword Clustering Tool',   zh: '关键词聚类工具',     ja: 'キーワードクラスタリング', icon: '🔗' },
    'keyword-grouping-tool':     { ko: '키워드 그룹화 툴',      en: 'Keyword Grouping Tool',     zh: '关键词分组工具',     ja: 'キーワードグルーピング', icon: '🎯' },
    'redirect-checker':          { ko: '리다이렉트 검사기',     en: 'Redirect Checker',          zh: '重定向检查器',       ja: 'リダイレクトチェッカー', icon: '↪️' },
    'http-header-checker':       { ko: 'HTTP 헤더 검사기',      en: 'HTTP Header Checker',       zh: 'HTTP头检查器',       ja: 'HTTPヘッダーチェッカー', icon: '🔐' },
    'user-agent-parser':         { ko: 'User-Agent 파서',       en: 'User-Agent Parser',         zh: 'User-Agent解析器',   ja: 'User-Agentパーサー', icon: '🕵️' },
    /* ── Batch 11 ── */
    'dns-lookup':                { ko: 'DNS 조회',              en: 'DNS Lookup',                zh: 'DNS查询',            ja: 'DNS照会',              icon: '🌐' },
    'whois-lookup':              { ko: 'WHOIS 조회',            en: 'WHOIS Lookup',              zh: 'WHOIS查询',          ja: 'WHOIS照会',            icon: '🔍' },
    'ssl-checker':               { ko: 'SSL 인증서 검사기',     en: 'SSL Certificate Checker',   zh: 'SSL证书检查器',      ja: 'SSL証明書チェッカー', icon: '🔒' },
    'ssl-decoder':               { ko: 'SSL 인증서 디코더',     en: 'SSL Certificate Decoder',   zh: 'SSL证书解码器',      ja: 'SSL証明書デコーダー', icon: '📋' },
    'csr-generator':             { ko: 'CSR 생성기',            en: 'CSR Generator',             zh: 'CSR生成器',          ja: 'CSRジェネレーター',   icon: '📜' },
    /* ── Batch 12 ── */
    'htaccess-generator':        { ko: '.htaccess 생성기',      en: '.htaccess Generator',       zh: '.htaccess生成器',    ja: '.htaccessジェネレーター', icon: '⚙️' },
    'nginx-config-generator':    { ko: 'Nginx 설정 생성기',     en: 'Nginx Config Generator',    zh: 'Nginx配置生成器',    ja: 'Nginx設定ジェネレーター', icon: '🖥️' },
    'apache-config-generator':   { ko: 'Apache 설정 생성기',    en: 'Apache Config Generator',   zh: 'Apache配置生成器',   ja: 'Apache設定ジェネレーター', icon: '🔧' },
    'csp-generator':             { ko: 'CSP 생성기',            en: 'CSP Generator',             zh: 'CSP生成器',          ja: 'CSPジェネレーター',   icon: '🛡️' },
    'csp-validator':             { ko: 'CSP 검증기',            en: 'CSP Validator',             zh: 'CSP验证器',          ja: 'CSPバリデーター',     icon: '✅' },
    /* ── Batch 13 ── */
    'cors-header-checker':       { ko: 'CORS 헤더 검사기',      en: 'CORS Header Checker',       zh: 'CORS头检查器',       ja: 'CORSヘッダーチェッカー', icon: '🔀' },
    'mime-type-finder':          { ko: 'MIME 타입 검색기',      en: 'MIME Type Finder',          zh: 'MIME类型查找器',     ja: 'MIMEタイプ検索器',   icon: '🔎' },
    'website-speed-estimator':   { ko: '웹사이트 속도 추정기',  en: 'Website Speed Estimator',   zh: '网站速度估算器',     ja: 'ウェブサイト速度推定器', icon: '⚡' },
    'sitemap-validator':         { ko: '사이트맵 검증기',       en: 'Sitemap Validator',         zh: 'Sitemap验证器',      ja: 'サイトマップバリデーター', icon: '🗺️' },
    'favicon-generator':         { ko: '파비콘 생성기',         en: 'Favicon Generator',         zh: 'Favicon生成器',      ja: 'ファビコンジェネレーター', icon: '🖼️' },
    /* ── 배치 14 ── */
    'jwt-validator':             { ko: 'JWT 검증기',             en: 'JWT Validator',              zh: 'JWT验证器',           ja: 'JWT検証ツール',         icon: '🔑' },
    'jwt-inspector':             { ko: 'JWT 인스펙터',           en: 'JWT Inspector',              zh: 'JWT检查器',           ja: 'JWTインスペクター',     icon: '🔍' },
    'json-diff':                 { ko: 'JSON 비교기',            en: 'JSON Diff',                  zh: 'JSON比较器',          ja: 'JSON比較ツール',        icon: '⟷' },
    'json-flattener':            { ko: 'JSON 평탄화',            en: 'JSON Flattener',             zh: 'JSON扁平化',          ja: 'JSONフラット化',        icon: '⊟' },
    'json-to-yaml':              { ko: 'JSON → YAML',            en: 'JSON to YAML',               zh: 'JSON转YAML',          ja: 'JSON→YAML',             icon: 'Y' },
    'yaml-to-json':              { ko: 'YAML → JSON',            en: 'YAML to JSON',               zh: 'YAML转JSON',          ja: 'YAML→JSON',             icon: '{ }' },
    'xml-to-json':               { ko: 'XML → JSON',             en: 'XML to JSON',                zh: 'XML转JSON',           ja: 'XML→JSON',              icon: '⇄' },
    'json-path-tester':          { ko: 'JSONPath 테스터',        en: 'JSONPath Tester',            zh: 'JSONPath测试器',      ja: 'JSONPathテスター',      icon: '$.x' },
    'graphql-formatter':         { ko: 'GraphQL 포맷터',         en: 'GraphQL Formatter',          zh: 'GraphQL格式化',       ja: 'GraphQLフォーマッター', icon: '◈' },
    'graphql-query-builder':     { ko: 'GraphQL 쿼리 빌더',     en: 'GraphQL Query Builder',      zh: 'GraphQL查询构建器',   ja: 'GraphQLクエリビルダー', icon: '◇' },
    'sql-minifier':              { ko: 'SQL 압축기',             en: 'SQL Minifier',               zh: 'SQL压缩器',           ja: 'SQL圧縮ツール',         icon: 'SQL' },
    'sql-validator':             { ko: 'SQL 검증기',             en: 'SQL Validator',              zh: 'SQL验证器',           ja: 'SQL検証ツール',         icon: '✓' },
    'sql-to-json':               { ko: 'SQL → JSON',             en: 'SQL to JSON',                zh: 'SQL转JSON',           ja: 'SQL→JSON',              icon: '→{}' },
    'curl-generator':            { ko: 'cURL 생성기',            en: 'cURL Generator',             zh: 'cURL生成器',          ja: 'cURL生成ツール',        icon: 'cURL' },
    'curl-parser':               { ko: 'cURL 파서',              en: 'cURL Parser',                zh: 'cURL解析器',          ja: 'cURLパーサー',          icon: '↙' },
    'http-request-builder':      { ko: 'HTTP 요청 빌더',         en: 'HTTP Request Builder',       zh: 'HTTP请求构建器',      ja: 'HTTPリクエストビルダー', icon: 'HTTP' },
    'api-tester':                { ko: 'API 테스터',             en: 'API Tester',                 zh: 'API测试器',           ja: 'APIテスター',           icon: '🚀' },
    'webhook-tester':            { ko: 'Webhook 테스터',         en: 'Webhook Tester',             zh: 'Webhook测试器',       ja: 'Webhookテスター',       icon: '🔔' },
    'webhook-generator':         { ko: 'Webhook 생성기',         en: 'Webhook Generator',          zh: 'Webhook生成器',       ja: 'Webhook生成ツール',     icon: '📤' },
    'regex-generator':           { ko: '정규식 생성기',          en: 'Regex Generator',            zh: '正则表达式生성器',    ja: '正規表現生成ツール',    icon: '.*' },
    'regex-cheatsheet':          { ko: '정규식 치트시트',        en: 'Regex Cheatsheet',           zh: '正则表达式速查表',    ja: '正規表現チートシート',  icon: '📖' },
    'uuid-converter':            { ko: 'UUID 변환기',            en: 'UUID Converter',             zh: 'UUID转换器',          ja: 'UUIDコンバーター',      icon: '🔄' },
    'ulid-generator':            { ko: 'ULID 생성기',            en: 'ULID Generator',             zh: 'ULID生成器',          ja: 'ULID生성ツール',        icon: 'ULID' },
    'nanoid-generator':          { ko: 'NanoID 생성기',          en: 'NanoID Generator',           zh: 'NanoID生成器',        ja: 'NanoID生成ツール',      icon: 'nano' },
    'hash-checker':              { ko: '해시 검사기',            en: 'Hash Checker',               zh: '哈希检查器',          ja: 'ハッシュチェッカー',    icon: '#✓' },
    'bcrypt-generator':          { ko: 'bcrypt 생성기',          en: 'bcrypt Generator',           zh: 'bcrypt生成器',        ja: 'bcrypt生成ツール',      icon: '🔐' },
    'bcrypt-validator':          { ko: 'bcrypt 검증기',          en: 'bcrypt Validator',           zh: 'bcrypt验证器',        ja: 'bcrypt検証ツール',      icon: '🔏' },
    'hmac-generator':            { ko: 'HMAC 생성기',            en: 'HMAC Generator',             zh: 'HMAC生成器',          ja: 'HMAC生成ツール',        icon: 'HMAC' },
    'rsa-key-generator':         { ko: 'RSA 키 생성기',          en: 'RSA Key Generator',          zh: 'RSA密钥生成器',       ja: 'RSA鍵生成ツール',       icon: 'RSA' },
    'ssh-key-generator':         { ko: 'SSH 키 생성기',          en: 'SSH Key Generator',          zh: 'SSH密钥生成器',       ja: 'SSH鍵生成ツール',       icon: 'SSH' },
    /* ── 배치 15 ── */
    'prompt-token-estimator':    { ko: '프롬프트 토큰 추정기',  en: 'Prompt Token Estimator',     zh: '提示词Token估算器',   ja: 'プロンプトToken推定器', icon: '🔢' },
    'openai-cost-estimator':     { ko: 'OpenAI 비용 계산기',   en: 'OpenAI Cost Calculator',     zh: 'OpenAI费用计算器',    ja: 'OpenAIコスト計算',     icon: '💲' },
    'claude-cost-estimator':     { ko: 'Claude 비용 계산기',   en: 'Claude Cost Calculator',     zh: 'Claude费用计算器',    ja: 'Claudeコスト計算',     icon: '🤖' },
    'gemini-cost-estimator':     { ko: 'Gemini 비용 계산기',   en: 'Gemini Cost Calculator',     zh: 'Gemini费用计算器',    ja: 'Geminiコスト計算',     icon: '♊' },
    'prompt-cleaner':            { ko: '프롬프트 클리너',       en: 'Prompt Cleaner',             zh: '提示词清理器',        ja: 'プロンプトクリーナー', icon: '🧹' },
    'prompt-template-generator': { ko: '프롬프트 템플릿 생성기', en: 'Prompt Template Generator', zh: '提示词模板生成器',    ja: 'プロンプトテンプレート生成', icon: '📋' },
    'prompt-variable-extractor': { ko: '프롬프트 변수 추출기', en: 'Prompt Variable Extractor',  zh: '提示词变量提取器',    ja: 'プロンプト変数抽出ツール', icon: '⚙️' },
    'ai-model-comparison':       { ko: 'AI 모델 비교표',        en: 'AI Model Comparison',        zh: 'AI模型对比',          ja: 'AIモデル比較表',       icon: '📊' },
    'ai-pricing-comparison':     { ko: 'AI 가격 비교',          en: 'AI Pricing Comparison',      zh: 'AI价格比较',          ja: 'AI料金比較',           icon: '💹' },
    'markdown-chat-exporter':    { ko: 'AI 채팅 내보내기',      en: 'Markdown Chat Exporter',     zh: 'AI聊天导出',          ja: 'AIチャットエクスポート', icon: '💬' },
    /* ── 배치 16 ── */
    'text-case-detector':        { ko: '케이스 감지기',          en: 'Case Detector',              zh: '大小写检测器',        ja: 'ケース検出器',         icon: 'Aa' },
    'duplicate-line-finder':     { ko: '중복 줄 찾기',           en: 'Duplicate Line Finder',      zh: '重复行查找器',        ja: '重複行ファインダー',   icon: '🔎' },
    'unicode-inspector':         { ko: '유니코드 인스펙터',      en: 'Unicode Inspector',          zh: 'Unicode检查器',       ja: 'Unicodeインスペクター', icon: 'U+' },
    'unicode-converter':         { ko: '유니코드 변환기',        en: 'Unicode Converter',          zh: 'Unicode转换器',       ja: 'Unicode変換器',        icon: '∪' },
    'emoji-counter':             { ko: '이모지 카운터',          en: 'Emoji Counter',              zh: '表情符号计数器',      ja: '絵文字カウンター',     icon: '😀' },
    'emoji-remover':             { ko: '이모지 제거기',          en: 'Emoji Remover',              zh: '表情符号去除器',      ja: '絵文字リムーバー',     icon: '🚫' },
    'text-encryptor':            { ko: '텍스트 암호화',          en: 'Text Encryptor',             zh: '文本加密器',          ja: 'テキスト暗号化',       icon: '🔐' },
    'text-decryptor':            { ko: '텍스트 복호화',          en: 'Text Decryptor',             zh: '文本解密器',          ja: 'テキスト復号化',       icon: '🔓' },
    'text-to-unicode':           { ko: '텍스트 → 유니코드',     en: 'Text to Unicode',            zh: '文本→Unicode',        ja: 'テキスト→Unicode',    icon: '▶U' },
    'unicode-to-text':           { ko: '유니코드 → 텍스트',     en: 'Unicode to Text',            zh: 'Unicode→文本',        ja: 'Unicode→テキスト',    icon: 'U▶' },
    'ascii-converter':           { ko: 'ASCII 변환기',           en: 'ASCII Converter',            zh: 'ASCII转换器',         ja: 'ASCII変換器',          icon: 'ASCII' },
    'ascii-table':               { ko: 'ASCII 코드표',           en: 'ASCII Table',                zh: 'ASCII码表',           ja: 'ASCIIコード表',        icon: '128' },
    'palindrome-checker':        { ko: '회문 검사기',            en: 'Palindrome Checker',         zh: '回文检测器',          ja: '回文チェッカー',       icon: '↔' },
    'anagram-checker':           { ko: '애너그램 검사기',        en: 'Anagram Checker',            zh: '变位词检测器',        ja: 'アナグラムチェッカー', icon: '≈' },
    'text-statistics':           { ko: '텍스트 통계',            en: 'Text Statistics',            zh: '文本统计',            ja: 'テキスト統計',         icon: '📊' },
    'keyword-extractor':         { ko: '키워드 추출기',          en: 'Keyword Extractor',          zh: '关键词提取器',        ja: 'キーワード抽出器',     icon: '🔑' },
    'stopword-remover':          { ko: '불용어 제거기',          en: 'Stopword Remover',           zh: '停用词去除器',        ja: 'ストップワードリムーバー', icon: '✂' },
    'text-merger':               { ko: '텍스트 합치기',          en: 'Text Merger',                zh: '文本合并器',          ja: 'テキストマージャー',   icon: '⊕' },
    'line-merger':               { ko: '줄 합치기',              en: 'Line Merger',                zh: '行合并器',            ja: '行マージャー',         icon: '↓↓' },
    'random-word-generator':     { ko: '랜덤 단어 생성기',       en: 'Random Word Generator',      zh: '随机单词生成器',      ja: 'ランダム単語生成器',   icon: '🎲' },
    'robots-txt-generator':      { ko: 'Robots.txt 생성기',   en: 'Robots.txt Generator',       zh: 'Robots.txt生成器',    ja: 'Robots.txtジェネレーター', icon: '🤖' },
    'meta-tag-generator':        { ko: 'Meta 태그 생성기',    en: 'Meta Tag Generator',         zh: 'Meta标签生成器',      ja: 'メタタグジェネレーター', icon: '<M>' },
    'prompt-formatter':          { ko: '프롬프트 포맷터',      en: 'Prompt Formatter',           zh: '提示词格式化',        ja: 'プロンプトフォーマッター', icon: '💬' },
    /* ── 텍스트: 분석 ── */
    'word-counter':              { ko: '단어수 세기',          en: 'Word Counter',               zh: '单词计数器',          ja: '単語数カウンター',     icon: '📝' },
    'character-counter':         { ko: '글자수 세기',          en: 'Character Counter',          zh: '字符计数器',          ja: '文字数カウンター',     icon: '✍️' },
    'line-counter':              { ko: '줄 수 세기',           en: 'Line Counter',               zh: '行数统计',            ja: '行数カウンター',       icon: '📏' },
    'sentence-counter':          { ko: '문장 수 세기',         en: 'Sentence Counter',           zh: '句子计数器',          ja: '文章数カウンター',     icon: '💬' },
    'read-time-calculator':      { ko: '읽기 시간 계산기',     en: 'Read Time Calculator',       zh: '阅读时间计算器',      ja: '読書時間計算機',       icon: '⏱️' },
    'keyword-density':           { ko: '키워드 밀도 분석기',   en: 'Keyword Density Analyzer',   zh: '关键词密度分析器',    ja: 'キーワード密度解析器', icon: '📊' },
    /* ── 텍스트: 편집 ── */
    'find-replace':              { ko: '찾기 & 바꾸기',        en: 'Find & Replace',             zh: '查找替换',            ja: '検索と置換',           icon: '🔍' },
    'text-cleaner':              { ko: '텍스트 클리너',        en: 'Text Cleaner',               zh: '文本清理器',          ja: 'テキストクリーナー',   icon: '🧹' },
    'remove-empty-lines':        { ko: '빈 줄 제거',           en: 'Remove Empty Lines',         zh: '删除空行',            ja: '空行削除',             icon: '🧹' },
    'remove-duplicate-lines':    { ko: '중복 줄 제거',         en: 'Remove Duplicate Lines',     zh: '删除重复行',          ja: '重複行削除',           icon: '🗑️' },
    'remove-duplicate-words':    { ko: '중복 단어 제거',       en: 'Remove Duplicate Words',     zh: '删除重复单词',        ja: '重複単語削除',         icon: '🔤' },
    'text-diff-checker':         { ko: '텍스트 비교기',        en: 'Text Diff Checker',          zh: '文本差异检查器',      ja: 'テキスト差分チェッカー', icon: '⟷' },
    /* ── 텍스트: 변환 ── */
    'text-sorter':               { ko: '텍스트 줄 정렬기',     en: 'Text Line Sorter',           zh: '文本行排序器',        ja: 'テキスト行ソーター',   icon: '↕️' },
    'alphabetizer':              { ko: '알파벳 순 정렬',       en: 'Alphabetizer',               zh: '字母排序',            ja: 'アルファベット順整列', icon: '🔡' },
    'text-reverser':             { ko: '텍스트 뒤집기',        en: 'Text Reverser',              zh: '文字反转',            ja: 'テキスト反転',         icon: '↩️' },
    'text-shuffler':             { ko: '텍스트 셔플',          en: 'Text Shuffler',              zh: '文本随机排列',        ja: 'テキストシャッフル',   icon: '🔀' },
    'slug-generator':            { ko: 'URL 슬러그 생성기',   en: 'Slug Generator',             zh: 'URL Slug生成器',      ja: 'URLスラッグ生成器',    icon: '🔗' },
    'hashtag-generator':         { ko: '해시태그 생성기',      en: 'Hashtag Generator',          zh: '标签生成器',          ja: 'ハッシュタグ生成器',   icon: '#️⃣' },
    /* ── 한국 전용: 급여 ── */
    'salary':                    { ko: '연봉 실수령액',        en: 'Take-Home Pay (KR)',         zh: '韩国税后工资',        ja: '韓国税引手取り',       icon: '💰' },
    'salary-reverse':            { ko: '연봉 역산 계산기',     en: 'Reverse Salary Calc (KR)',   zh: '韩国逆算工资',        ja: '韓国年俸逆算',         icon: '🔄' },
    'salary-raise':              { ko: '연봉 인상 계산기',     en: 'Salary Raise Calc (KR)',     zh: '韩国工资涨幅',        ja: '韓国昇給計算機',       icon: '📈' },
    'salary-negotiation':        { ko: '연봉 협상 계산기',     en: 'Salary Negotiation (KR)',    zh: '韩国薪资谈判',        ja: '韓国年俸交渉',         icon: '🤝' },
    'payslip-calc':              { ko: '급여명세서 계산기',    en: 'Payslip Calculator (KR)',    zh: '韩国工资单',          ja: '韓国給与明細',         icon: '📋' },
    'overtime-pay':              { ko: '연장근무수당 계산기',  en: 'Overtime Pay (KR)',          zh: '韩国加班费',          ja: '韓国残業代計算機',     icon: '⏰' },
    'minimum-wage':              { ko: '최저임금 계산기',      en: 'Minimum Wage (KR)',          zh: '韩国最低工资',        ja: '韓国最低賃金',         icon: '💵' },
    'weekly-holiday':            { ko: '주휴수당 계산기',      en: 'Weekly Holiday Pay (KR)',    zh: '韩国周休津贴',        ja: '韓国週休手当',         icon: '📅' },
    'annual-leave':              { ko: '연차 계산기',          en: 'Annual Leave Calc (KR)',     zh: '韩国年假计算',        ja: '韓国有給休暇',         icon: '🏖️' },
    'parental-leave':            { ko: '육아휴직 급여',        en: 'Parental Leave Pay (KR)',    zh: '韩国育儿假',          ja: '韓国育児休業',         icon: '👶' },
    'severance':                 { ko: '퇴직금 계산기',        en: 'Severance Pay (KR)',         zh: '韩国退职金',          ja: '韓国退職金計算機',     icon: '📦' },
    /* ── 한국 전용: 보험·연금 ── */
    'four-insurance':            { ko: '4대보험 계산기',       en: '4 Major Insurance (KR)',     zh: '韩国四大保险',        ja: '韓国四大保険',         icon: '🏥' },
    'national-pension':          { ko: '국민연금 계산기',      en: 'National Pension (KR)',      zh: '韩国国民年金',        ja: '韓国国民年金',         icon: '🏛️' },
    'health-insurance':          { ko: '건강보험 계산기',      en: 'Health Insurance (KR)',      zh: '韩国健康保险',        ja: '韓国健康保険',         icon: '💊' },
    'health-insurance-calc':     { ko: '건강보험료 조회',      en: 'Health Insurance Calc (KR)', zh: '韩国健保费查询',      ja: '韓国健保費照会',       icon: '💊' },
    'retirement-calc':           { ko: '퇴직연금 계산기',      en: 'Retirement Pension (KR)',    zh: '韩国退休年金',        ja: '韓国退職年金',         icon: '👴' },
    'retirement-pension':        { ko: '개인연금 계산기',      en: 'Personal Pension (KR)',      zh: '韩国个人年金',        ja: '韓国個人年金',         icon: '💼' },
    'unemployment':              { ko: '실업급여 계산기',      en: 'Unemployment Benefit (KR)', zh: '韩国失业补贴',        ja: '韓国失業給付',         icon: '📋' },
    'unemployment-benefit':      { ko: '구직급여 계산기',      en: 'Job Seeker Benefit (KR)',   zh: '韩国求职补贴',        ja: '韓国求職給付',         icon: '🔎' },
    /* ── 한국 전용: 세금 ── */
    'income-tax':                { ko: '종합소득세 계산기',    en: 'Income Tax (KR)',            zh: '韩国综合所得税',      ja: '韓国総合所得税',       icon: '📑' },
    'freelancer-tax':            { ko: '프리랜서 세금 계산기', en: 'Freelancer Tax (KR)',        zh: '韩国自由职业税',      ja: '韓国フリーランス税',   icon: '💻' },
    'capital-gains-tax':         { ko: '양도소득세 계산기',    en: 'Capital Gains Tax (KR)',     zh: '韩国转让所得税',      ja: '韓国譲渡所得税',       icon: '🏠' },
    'stock-tax':                 { ko: '주식 양도세 계산기',   en: 'Stock Tax (KR)',             zh: '韩国股票转让税',      ja: '韓国株式譲渡税',       icon: '📉' },
    'severance-tax':             { ko: '퇴직소득세 계산기',    en: 'Severance Tax (KR)',         zh: '韩国退职所得税',      ja: '韓国退職所得税',       icon: '📦' },
    'gift-tax':                  { ko: '증여세 계산기',        en: 'Gift Tax (KR)',              zh: '韩国赠与税',          ja: '韓国贈与税',           icon: '🎁' },
    'inheritance-tax':           { ko: '상속세 계산기',        en: 'Inheritance Tax (KR)',       zh: '韩国遗产税',          ja: '韓国相続税',           icon: '⚖️' },
    /* ── 한국 전용: 부동산 ── */
    'loan-calc':                 { ko: '대출이자 계산기',      en: 'Loan Interest (KR)',         zh: '韩国贷款利息',        ja: '韓国ローン利息',       icon: '🏦' },
    'ltv-calculator':            { ko: 'LTV 계산기',           en: 'LTV Calculator (KR)',        zh: '韩国LTV计算',         ja: '韓国LTV計算',          icon: '📊' },
    'dsr-calc':                  { ko: 'DSR 계산기',           en: 'DSR Calculator (KR)',        zh: '韩国DSR计算',         ja: '韓国DSR計算',          icon: '📊' },
    'prepayment-fee':            { ko: '중도상환수수료 계산기', en: 'Prepayment Fee (KR)',        zh: '韩国提前还款费',      ja: '韓国繰上返済手数料',   icon: '💳' },
    'realestate-fee':            { ko: '부동산 중개수수료',    en: 'Real Estate Fee (KR)',       zh: '韩国房产中介费',      ja: '韓国不動産仲介手数料', icon: '🏠' },
    'rent-convert':              { ko: '전월세 전환 계산기',   en: 'Rent Conversion (KR)',       zh: '韩国租金换算',        ja: '韓国家賃換算',         icon: '🏘️' },
    'acquisition-tax':           { ko: '취득세 계산기',        en: 'Acquisition Tax (KR)',       zh: '韩国取得税',          ja: '韓国取得税',           icon: '🏠' },
    'property-tax':              { ko: '재산세 계산기',        en: 'Property Tax (KR)',          zh: '韩国财产税',          ja: '韓国固定資産税',       icon: '🏛️' },
    'cheongyak-score':           { ko: '청약 가점 계산기',     en: 'Housing Subscription (KR)', zh: '韩国购房申请积分',    ja: '韓国住宅申込加点',     icon: '🏠' },
    'credit-loan-limit':         { ko: '신용대출 한도 계산기', en: 'Credit Loan Limit (KR)',     zh: '韩国信用贷款上限',    ja: '韓国信用ローン上限',   icon: '💳' },
    /* ── 한국 전용: 날짜·일상 ── */
    'korean-age':                { ko: '한국 나이 계산기',     en: 'Korean Age Calculator',      zh: '韩国年龄计算',        ja: '韓国年齢計算機',       icon: '🎂' },
    'dday':                      { ko: 'D-Day 계산기',         en: 'D-Day Calculator',           zh: 'D-Day計算器',         ja: 'D-Day計算機',          icon: '📅' },
    'working-days-calc':         { ko: '근무일 계산기',        en: 'Working Days Calc (KR)',      zh: '韩国工作日计算',      ja: '韓国勤務日計算機',     icon: '📅' },
    /* ── 배치 17: 이미지 도구 ── */
    'svg-viewer':                { ko: 'SVG 뷰어',             en: 'SVG Viewer',                 zh: 'SVG查看器',           ja: 'SVGビューアー',        icon: '🎨' },
    'svg-minifier':              { ko: 'SVG 압축기',           en: 'SVG Minifier',               zh: 'SVG压缩器',           ja: 'SVG圧縮器',            icon: '✂️' },
    'svg-to-png':                { ko: 'SVG → PNG',            en: 'SVG to PNG',                 zh: 'SVG转PNG',            ja: 'SVG→PNG',              icon: '🖼' },
    'png-to-svg':                { ko: 'PNG → SVG',            en: 'PNG to SVG',                 zh: 'PNG转SVG',            ja: 'PNG→SVG',              icon: '🔄' },
    'image-cropper':             { ko: '이미지 크롭',          en: 'Image Cropper',              zh: '图片裁剪',            ja: '画像クロップ',         icon: '✂️' },
    'image-rotator':             { ko: '이미지 회전',          en: 'Image Rotator',              zh: '图片旋转',            ja: '画像回転',             icon: '🔁' },
    'image-watermark':           { ko: '이미지 워터마크',      en: 'Image Watermark',            zh: '图片水印',            ja: '画像ウォーターマーク', icon: '💧' },
    'image-metadata-viewer':     { ko: '이미지 메타데이터',    en: 'Image Metadata Viewer',      zh: '图片元数据',          ja: '画像メタデータ',       icon: '📋' },
    'exif-viewer':               { ko: 'EXIF 뷰어',            en: 'EXIF Viewer',                zh: 'EXIF查看器',          ja: 'EXIFビューアー',       icon: '📷' },
    'exif-remover':              { ko: 'EXIF 제거기',          en: 'EXIF Remover',               zh: 'EXIF删除器',          ja: 'EXIF削除ツール',       icon: '🛡️' },
    'favicon-maker':             { ko: '파비콘 메이커',        en: 'Favicon Maker',              zh: 'Favicon制作器',       ja: 'ファビコンメーカー',   icon: '⭐' },
    'ico-converter':             { ko: 'ICO 변환기',           en: 'ICO Converter',              zh: 'ICO转换器',           ja: 'ICOコンバーター',      icon: '🔧' },
    'jpg-to-webp':               { ko: 'JPG → WebP',           en: 'JPG to WebP',                zh: 'JPG转WebP',           ja: 'JPG→WebP',             icon: '🖼️' },
    'webp-to-jpg':               { ko: 'WebP → JPG',           en: 'WebP to JPG',                zh: 'WebP转JPG',           ja: 'WebP→JPG',             icon: '📸' },
    'image-color-extractor':     { ko: '이미지 색상 추출기',   en: 'Image Color Extractor',      zh: '图片取色器',          ja: '画像カラー抽出',       icon: '🎨' },
    'dominant-color-finder':     { ko: '주요 색상 찾기',       en: 'Dominant Color Finder',      zh: '主色提取器',          ja: '主要カラー検索',       icon: '🎯' },
    'blur-image':                { ko: '이미지 블러',          en: 'Blur Image',                 zh: '图片模糊',            ja: '画像ぼかし',           icon: '🌫️' },
    'pixelate-image':            { ko: '이미지 픽셀화',        en: 'Pixelate Image',             zh: '图片像素化',          ja: '画像ピクセル化',       icon: '⬛' },
    'image-base64-encoder':      { ko: '이미지 Base64 인코더', en: 'Image Base64 Encoder',       zh: '图片Base64编码',      ja: '画像Base64エンコーダー', icon: '📤' },
    'image-base64-decoder':      { ko: '이미지 Base64 디코더', en: 'Image Base64 Decoder',       zh: '图片Base64解码',      ja: '画像Base64デコーダー', icon: '📥' },
    /* ── 배치 18: PDF 도구 ── */
    'pdf-password-remover':      { ko: 'PDF 비밀번호 제거',    en: 'PDF Password Remover',       zh: 'PDF密码删除',         ja: 'PDFパスワード削除',     icon: '🔓' },
    'pdf-password-adder':        { ko: 'PDF 비밀번호 추가',    en: 'PDF Password Adder',         zh: 'PDF密码添加',         ja: 'PDFパスワード追加',     icon: '🔒' },
    'pdf-rotate':                { ko: 'PDF 페이지 회전',      en: 'PDF Page Rotate',            zh: 'PDF页面旋转',         ja: 'PDFページ回転',         icon: '🔁' },
    'pdf-reorder-pages':         { ko: 'PDF 페이지 순서 변경', en: 'PDF Reorder Pages',          zh: 'PDF页面重排',         ja: 'PDFページ並び替え',     icon: '📑' },
    'pdf-extract-text':          { ko: 'PDF 텍스트 추출',      en: 'PDF Extract Text',           zh: 'PDF文本提取',         ja: 'PDFテキスト抽出',       icon: '📝' },
    'pdf-extract-images':        { ko: 'PDF 이미지 추출',      en: 'PDF Extract Images',         zh: 'PDF图片提取',         ja: 'PDF画像抽出',           icon: '🖼️' },
    'pdf-metadata-viewer':       { ko: 'PDF 메타데이터 뷰어',  en: 'PDF Metadata Viewer',        zh: 'PDF元数据查看器',     ja: 'PDFメタデータビューアー', icon: '📋' },
    'pdf-unlock':                { ko: 'PDF 잠금 해제',        en: 'PDF Unlock',                 zh: 'PDF解锁',             ja: 'PDFロック解除',         icon: '🔓' },
    'pdf-watermark':             { ko: 'PDF 워터마크',         en: 'PDF Watermark',              zh: 'PDF水印',             ja: 'PDFウォーターマーク',   icon: '💧' },
    'pdf-to-text':               { ko: 'PDF → TXT',            en: 'PDF to Text',                zh: 'PDF转TXT',            ja: 'PDF→TXT',               icon: '📄' },
    'word-to-minute-converter':  { ko: '단어→분 변환기',       en: 'Words to Minutes',           zh: '词语转分钟',          ja: '単語→分変換',           icon: '⏱' },
    'typing-speed-test':         { ko: '타이핑 속도 테스트',   en: 'Typing Speed Test',          zh: '打字速度测试',         ja: 'タイピング速度テスト',  icon: '⌨' },
    'cps-calculator':            { ko: 'CPS 계산기',           en: 'CPS Calculator',             zh: 'CPS计算器',           ja: 'CPS計算ツール',         icon: '🖱' },
    'wpm-calculator':            { ko: 'WPM 계산기',           en: 'WPM Calculator',             zh: 'WPM计算器',           ja: 'WPM計算ツール',         icon: '📊' },
    'reading-level-checker':     { ko: '독해 수준 분석기',     en: 'Reading Level Checker',      zh: '阅读水平检测器',       ja: '読解レベルチェッカー',  icon: '📖' },
    'keyword-density-checker':   { ko: '키워드 밀도 분석기',   en: 'Keyword Density Checker',    zh: '关键词密度分析器',     ja: 'キーワード密度分析',    icon: '🔑' },
    'seo-title-generator':       { ko: 'SEO 제목 생성기',      en: 'SEO Title Generator',        zh: 'SEO标题生成器',        ja: 'SEOタイトルジェネレーター', icon: '✏' },
    'meta-description-generator':{ ko: '메타 설명 생성기',     en: 'Meta Description Generator', zh: '元描述生成器',         ja: 'メタ説明ジェネレーター', icon: '📝' },
    'slug-checker':              { ko: '슬러그 검사기',         en: 'Slug Checker',               zh: 'Slug检查器',           ja: 'スラグチェッカー',      icon: '🔗' },
    'url-slug-generator':        { ko: 'URL 슬러그 생성기',    en: 'URL Slug Generator',         zh: 'URL Slug生成器',       ja: 'URLスラグジェネレーター', icon: '🔤' },
    'yaml-validator':            { ko: 'YAML 검증기',          en: 'YAML Validator',             zh: 'YAML验证器',           ja: 'YAMLバリデーター',      icon: '✅' },
    'json-to-xml':               { ko: 'JSON → XML',          en: 'JSON to XML',                zh: 'JSON转XML',            ja: 'JSON→XML',             icon: '📦' },
    'html-minifier':             { ko: 'HTML 압축기',          en: 'HTML Minifier',              zh: 'HTML压缩器',           ja: 'HTMLミニファイアー',    icon: '🗜️' },
    'css-minifier':              { ko: 'CSS 압축기',           en: 'CSS Minifier',               zh: 'CSS压缩器',            ja: 'CSSミニファイアー',     icon: '🎨' },
    'javascript-minifier':       { ko: 'JS 압축기',            en: 'JS Minifier',                zh: 'JS压缩器',             ja: 'JSミニファイアー',      icon: '⚡' },
    'javascript-beautifier':     { ko: 'JS 포매터',            en: 'JS Beautifier',              zh: 'JS格式化器',           ja: 'JSフォーマッター',      icon: '✨' },
    'css-beautifier':            { ko: 'CSS 포매터',           en: 'CSS Beautifier',             zh: 'CSS格式化器',          ja: 'CSSフォーマッター',     icon: '🖌️' },
    'token-estimator':           { ko: 'AI 토큰 추정기',       en: 'AI Token Estimator',         zh: 'AI Token估算器',       ja: 'AIトークン推定器',      icon: '🔢' },
    'prompt-template-library':   { ko: '프롬프트 템플릿 라이브러리', en: 'Prompt Template Library', zh: '提示词模板库',        ja: 'プロンプトテンプレートライブラリ', icon: '📚' },
    'image-prompt-generator':    { ko: '이미지 프롬프트 생성기', en: 'Image Prompt Generator',   zh: '图像提示词生成器',     ja: '画像プロンプトジェネレーター', icon: '🎨' },
    'youtube-script-generator':  { ko: '유튜브 스크립트 생성기', en: 'YouTube Script Generator', zh: 'YouTube脚本生成器',    ja: 'YouTubeスクリプトジェネレーター', icon: '🎬' },
    'prompt-improver':           { ko: 'AI 프롬프트 개선기', en: 'AI Prompt Improver', zh: 'AI提示词改进器', ja: 'AIプロンプト改善器', icon: '✨' },
    'prompt-optimizer':          { ko: 'AI 프롬프트 최적화기', en: 'AI Prompt Optimizer', zh: 'AI提示词优化器', ja: 'AIプロンプト最適化器', icon: '⚡' },
    'system-prompt-generator':   { ko: 'AI 시스템 프롬프트 생성기', en: 'AI System Prompt Generator', zh: 'AI系统提示词生成器', ja: 'AIシステムプロンプトジェネレーター', icon: '🤖' },
    'ai-email-generator':        { ko: 'AI 이메일 생성기', en: 'AI Email Generator', zh: 'AI邮件生成器', ja: 'AIメールジェネレーター', icon: '📧' },
    'ai-resume-generator':       { ko: 'AI 이력서 생성기', en: 'AI Resume Generator', zh: 'AI简历生成器', ja: 'AI履歴書ジェネレーター', icon: '📄' },
    'ai-cover-letter-generator': { ko: 'AI 자기소개서 생성기', en: 'AI Cover Letter Generator', zh: 'AI求职信生成器', ja: 'AIカバーレタージェネレーター', icon: '✍️' },
    'ai-product-description-generator': { ko: 'AI 제품 설명 생성기', en: 'AI Product Description Generator', zh: 'AI产品描述生成器', ja: 'AI商品説明ジェネレーター', icon: '🛍️' },
    'ai-blog-title-generator':   { ko: 'AI 블로그 제목 생성기', en: 'AI Blog Title Generator', zh: 'AI博客标题生成器', ja: 'AIブログタイトルジェネレーター', icon: '📝' },
    'ai-youtube-title-generator':{ ko: 'AI 유튜브 제목 생성기', en: 'AI YouTube Title Generator', zh: 'AIYouTube标题生成器', ja: 'AIYouTubeタイトルジェネレーター', icon: '▶️' },
    'ai-thumbnail-title-generator':{ ko: 'AI 썸네일 문구 생성기', en: 'AI Thumbnail Title Generator', zh: 'AI缩略图文字生成器', ja: 'AIサムネイルテキストジェネレーター', icon: '🖼️' },
    'ai-tweet-generator':        { ko: 'AI 트윗 생성기', en: 'AI Tweet Generator', zh: 'AI推文生成器', ja: 'AIツイートジェネレーター', icon: '🐦' },
    'ai-linkedin-post-generator':{ ko: 'AI 링크드인 포스트 생성기', en: 'AI LinkedIn Post Generator', zh: 'AI领英帖子生成器', ja: 'AILinkedInポストジェネレーター', icon: '💼' },
    'jwt-expiration-checker':    { ko: 'JWT 만료 확인기', en: 'JWT Expiration Checker', zh: 'JWT过期检查器', ja: 'JWT有効期限チェッカー', icon: '⏱️' },
    'json-schema-generator':     { ko: 'JSON 스키마 생성기', en: 'JSON Schema Generator', zh: 'JSON Schema生成器', ja: 'JSON Schemaジェネレーター', icon: '📐' },
    'json-schema-validator':     { ko: 'JSON 스키마 검증기', en: 'JSON Schema Validator', zh: 'JSON Schema验证器', ja: 'JSON Schemaバリデーター', icon: '✅' },
    'xml-beautifier':            { ko: 'XML Beautifier', en: 'XML Beautifier', zh: 'XML美化器', ja: 'XML Beautifier', icon: 'XML' },
    'yaml-diff-checker':         { ko: 'YAML Diff 비교기', en: 'YAML Diff Checker', zh: 'YAML Diff比较器', ja: 'YAML Diff比較器', icon: '⟷' },
    'csv-diff-checker':          { ko: 'CSV Diff 비교기', en: 'CSV Diff Checker', zh: 'CSV Diff比较器', ja: 'CSV Diff比較器', icon: 'CSV' },
    'sql-query-explainer':       { ko: 'SQL 쿼리 설명기', en: 'SQL Query Explainer', zh: 'SQL查询解释器', ja: 'SQLクエリ解説器', icon: 'SQL?' },
    'regex-extractor':           { ko: '정규식 추출기', en: 'Regex Extractor', zh: '正则表达式提取器', ja: '正規表現抽出器', icon: '.*↑' },
    'regex-replace-tester':      { ko: '정규식 치환 테스터', en: 'Regex Replace Tester', zh: '正则表达式替换测试器', ja: '正規表現置換テスター', icon: '.*→' },
    'epoch-converter':           { ko: '에포크 변환기', en: 'Epoch Converter', zh: '纪元时间转换器', ja: 'エポックコンバーター', icon: '🕐' },
    'uuid-bulk-generator':       { ko: 'UUID 대량 생성기', en: 'UUID Bulk Generator', zh: 'UUID批量生成器', ja: 'UUID一括生成器', icon: '🔢' },
    'uuid-extractor':            { ko: 'UUID 추출기', en: 'UUID Extractor', zh: 'UUID提取器', ja: 'UUID抽出器', icon: 'UUID↑' },
    'api-response-viewer':       { ko: 'API 응답 뷰어', en: 'API Response Viewer', zh: 'API响应查看器', ja: 'APIレスポンスビューア', icon: '🔍' },
  };

  // ── 토픽 클러스터 ────────────────────────────────────────────────
  // 같은 배열 안의 도구들이 서로 "관련 도구"가 됨
  var GROUPS = [
    // 금융: 저축·투자
    ['compound-interest','savings-calc','sip-calculator','investment-return-calculator','roi-calculator','fire-calculator','inflation-calculator'],
    // 금융: 대출·모기지
    ['emi-calculator','loan-calculator-en','mortgage-calculator','apr-calculator','loan-payoff-calculator'],
    // 금융: 세금·환율
    ['gst-calculator','vat-calculator-global','currency-converter','inflation-calculator'],
    // 건강
    ['bmi-calculator','bmi-calc','body-fat-calculator','calorie-calculator','macro-calculator','water-intake','pace-calculator'],
    // 임신
    ['pregnancy-due-date','bmi-calculator','calorie-calculator','water-intake'],
    // 일상: 시간·날짜
    ['age-calculator','date-calc','time-calculator','business-days-calculator','countdown-timer','sleep-calculator','pomodoro-timer'],
    // 일상: 비용·유틸
    ['tip-calculator','split-calculator','percent-calc','fuel-cost-calculator','electricity-cost-calculator'],
    // 개발자: 포맷터
    ['json-formatter','json-validator','json-viewer','json-minifier','xml-formatter','yaml-formatter','sql-formatter','markdown-preview'],
    // 개발자: 인코딩·해시
    ['base64-url','base64-encoder','base64-decoder','text-to-base64','base64-to-text','html-encoder','base64-image','hash-generator'],
    ['url-encoder','url-decoder','html-encoder','html-decoder','base64-url','slug-generator'],
    // 개발자: 개발 유틸
    ['cron-generator','cron-parser','cron-validator','regex-tester','timestamp','uuid-generator','uuid-validator','jwt-decoder','jwt-generator'],
    // 개발자: 생성기
    ['qr-generator','barcode-generator','random-string','lorem-ipsum','password-generator','uuid-generator'],
    // 개발자: 변환
    ['number-converter','unit-converter','timezone-converter','case-converter','json-to-csv','csv-to-json'],
    // 개발자: 색상
    ['color-converter','color-palette','color-picker','color-contrast-checker','hex-to-rgb','rgb-to-hex'],
    // 개발자: 이미지
    ['image-compressor','image-resizer','image-to-webp','webp-to-png','png-to-jpg','base64-image'],
    // 배치 17: SVG
    ['svg-viewer','svg-minifier','svg-to-png','png-to-svg','image-compressor'],
    // 배치 17: 이미지 편집
    ['image-cropper','image-rotator','image-watermark','image-resizer','image-compressor'],
    // 배치 17: EXIF/메타데이터
    ['exif-viewer','exif-remover','image-metadata-viewer','image-compressor','image-resizer'],
    // 배치 17: 파비콘/ICO
    ['favicon-maker','ico-converter','favicon-generator','svg-to-png','image-compressor'],
    // 배치 17: 포맷 변환
    ['jpg-to-webp','webp-to-jpg','image-to-webp','webp-to-png','png-to-jpg','image-compressor'],
    // 배치 17: 색상 추출
    ['image-color-extractor','dominant-color-finder','color-picker','color-converter','color-palette'],
    // 배치 17: 이미지 효과
    ['blur-image','pixelate-image','image-rotator','image-cropper','image-watermark'],
    // 배치 17: Base64 이미지
    ['image-base64-encoder','image-base64-decoder','base64-image','base64-encoder','base64-decoder'],
    ['markdown-preview','markdown-to-html','html-to-markdown','html-encoder','html-decoder'],
    ['csv-to-json','json-to-csv','csv-viewer','json-formatter','text-diff-checker'],
    // 개발자: PDF
    ['pdf-merge','pdf-split','pdf-to-image','image-to-pdf','pdf-compressor','pdf-page-counter'],
    // 배치 18: PDF 보안
    ['pdf-password-remover','pdf-password-adder','pdf-unlock','pdf-merge','pdf-compressor'],
    // 배치 18: PDF 편집
    ['pdf-rotate','pdf-reorder-pages','pdf-merge','pdf-split','pdf-compressor'],
    // 배치 18: PDF 추출/변환
    ['pdf-extract-text','pdf-to-text','pdf-extract-images','pdf-metadata-viewer','pdf-to-image'],
    // 배치 18: PDF 꾸미기
    ['pdf-watermark','pdf-metadata-viewer','pdf-compressor','pdf-merge','pdf-split'],
    // 배치 19: 속도/시간 측정
    ['word-to-minute-converter','wpm-calculator','typing-speed-test','cps-calculator','reading-level-checker'],
    // 배치 19: SEO 콘텐츠 도구
    ['seo-title-generator','meta-description-generator','keyword-density-checker','slug-checker','url-slug-generator'],
    // 배치 19: 슬러그/URL
    ['slug-checker','url-slug-generator','url-encoder','url-decoder','slug-generator'],
    // 배치 19: 텍스트 분석
    ['reading-level-checker','keyword-density-checker','word-counter','character-counter','text-statistics'],
    // 배치 20: YAML/XML 변환
    ['yaml-validator','yaml-to-json','json-to-yaml','json-to-xml','xml-to-json','xml-validator'],
    // 배치 20: 압축기
    ['html-minifier','css-minifier','javascript-minifier','sql-minifier','json-minifier'],
    // 배치 20: 포매터
    ['javascript-beautifier','css-beautifier','json-viewer','graphql-formatter','sql-validator'],
    // 배치 21: AI 토큰/비용
    ['token-estimator','prompt-token-estimator','openai-cost-estimator','claude-cost-estimator','gemini-cost-estimator','ai-cost-calculator'],
    // 배치 21: AI 프롬프트 도구
    ['prompt-template-library','image-prompt-generator','youtube-script-generator','prompt-cleaner','prompt-template-generator'],
    // 배치 22: AI 프롬프트 개선/최적화
    ['prompt-improver','prompt-optimizer','system-prompt-generator','prompt-template-library','prompt-cleaner'],
    // 배치 22: AI 콘텐츠 생성 (텍스트)
    ['ai-email-generator','ai-resume-generator','ai-cover-letter-generator','ai-product-description-generator'],
    // 배치 22: AI 소셜/콘텐츠 제목
    ['ai-blog-title-generator','ai-youtube-title-generator','ai-thumbnail-title-generator','ai-tweet-generator','ai-linkedin-post-generator'],
    // 배치 22: 유튜브 콘텐츠 도구
    ['ai-youtube-title-generator','ai-thumbnail-title-generator','youtube-script-generator','image-prompt-generator'],
    // 배치 23: JWT/토큰 도구
    ['jwt-expiration-checker','jwt-validator','jwt-inspector'],
    // 배치 23: JSON 스키마
    ['json-schema-generator','json-schema-validator','json-validator','json-diff','json-flattener'],
    // 배치 23: XML 도구
    ['xml-beautifier','xml-validator','xml-to-json','json-to-xml'],
    // 배치 23: Diff 도구
    ['yaml-diff-checker','csv-diff-checker','json-diff','text-diff-checker'],
    // 배치 23: SQL 도구
    ['sql-query-explainer','sql-validator','sql-minifier','sql-to-json','sql-formatter'],
    // 배치 23: 정규식 도구
    ['regex-extractor','regex-replace-tester','regex-generator','regex-cheatsheet'],
    // 배치 23: 시간/날짜 도구
    ['epoch-converter','timestamp','cron-parser'],
    // 배치 23: UUID 도구
    ['uuid-bulk-generator','uuid-extractor','uuid-converter','uuid-validator','ulid-generator','nanoid-generator'],
    // 배치 23: API 도구
    ['api-response-viewer','api-tester','http-request-builder','curl-generator','curl-parser','webhook-tester'],
    // AI 도구
    ['ai-token-counter','ai-cost-calculator','chatgpt-token-counter','prompt-formatter','word-counter','character-counter'],
    ['utm-builder','slug-generator','url-encoder','url-decoder','qr-generator'],
    ['robots-txt-generator','meta-tag-generator','utm-builder','slug-generator','html-encoder','url-encoder'],
    ['ip-address-lookup','utm-builder','robots-txt-generator','url-encoder','url-decoder'],
    ['sitemap-generator','robots-txt-generator','robots-txt-validator','xml-validator','sitemap-validator'],
    ['meta-tag-analyzer','meta-tag-generator','open-graph-generator','robots-txt-validator','canonical-tag-checker'],
    ['open-graph-generator','meta-tag-generator','twitter-card-generator','meta-tag-analyzer','utm-builder'],
    ['twitter-card-generator','open-graph-generator','meta-tag-generator','meta-tag-analyzer','utm-builder'],
    ['schema-markup-generator','schema-validator','meta-tag-generator','open-graph-generator','robots-txt-generator'],
    ['schema-validator','schema-markup-generator','meta-tag-analyzer','canonical-tag-checker','meta-tag-generator'],
    ['hreflang-generator','canonical-tag-checker','meta-tag-generator','sitemap-generator','robots-txt-generator'],
    ['canonical-tag-checker','hreflang-generator','meta-tag-analyzer','robots-txt-validator','sitemap-generator'],
    // SEO: 키워드
    ['keyword-clustering-tool','keyword-grouping-tool','keyword-density','meta-tag-analyzer','utm-builder'],
    // 네트워크: 헤더·리다이렉트
    ['redirect-checker','http-header-checker','cors-header-checker','user-agent-parser','ip-address-lookup'],
    ['http-header-checker','csp-generator','csp-validator','cors-header-checker','redirect-checker'],
    ['user-agent-parser','http-header-checker','redirect-checker','ip-address-lookup','dns-lookup'],
    // 네트워크: DNS·WHOIS·SSL
    ['dns-lookup','whois-lookup','ip-address-lookup','ssl-checker','redirect-checker'],
    ['whois-lookup','dns-lookup','ip-address-lookup','ssl-checker','canonical-tag-checker'],
    ['ssl-checker','ssl-decoder','csr-generator','dns-lookup','http-header-checker'],
    ['ssl-decoder','ssl-checker','csr-generator','http-header-checker','dns-lookup'],
    ['csr-generator','ssl-checker','ssl-decoder','nginx-config-generator','apache-config-generator'],
    // 서버: 설정 생성
    ['htaccess-generator','nginx-config-generator','apache-config-generator','csp-generator','cors-header-checker'],
    ['nginx-config-generator','apache-config-generator','htaccess-generator','csp-generator','ssl-checker'],
    ['apache-config-generator','nginx-config-generator','htaccess-generator','csp-generator','ssl-checker'],
    ['csp-generator','csp-validator','http-header-checker','cors-header-checker','htaccess-generator'],
    ['csp-validator','csp-generator','http-header-checker','cors-header-checker','meta-tag-analyzer'],
    // 유틸리티
    ['mime-type-finder','user-agent-parser','http-header-checker','redirect-checker','ip-address-lookup'],
    ['website-speed-estimator','sitemap-validator','redirect-checker','http-header-checker','robots-txt-validator'],
    ['sitemap-validator','sitemap-generator','robots-txt-validator','xml-validator','website-speed-estimator'],
    ['favicon-generator','meta-tag-generator','open-graph-generator','twitter-card-generator','meta-tag-analyzer'],
    // 배치 14: JWT·보안
    ['jwt-validator','jwt-inspector','jwt-decoder','jwt-generator','hmac-generator'],
    ['hmac-generator','hash-checker','bcrypt-generator','bcrypt-validator','rsa-key-generator'],
    ['bcrypt-generator','bcrypt-validator','hash-checker','hmac-generator','password-generator'],
    ['rsa-key-generator','ssh-key-generator','ssl-checker','csr-generator','hmac-generator'],
    ['ssh-key-generator','rsa-key-generator','csr-generator','ssl-checker','htaccess-generator'],
    // 배치 14: JSON 변환·분석
    ['json-diff','json-flattener','json-path-tester','json-formatter','json-validator'],
    ['json-to-yaml','yaml-to-json','json-formatter','yaml-formatter','xml-to-json'],
    ['xml-to-json','json-to-yaml','yaml-to-json','xml-formatter','json-formatter'],
    ['json-path-tester','json-diff','json-flattener','json-viewer','json-formatter'],
    // 배치 14: GraphQL·SQL
    ['graphql-formatter','graphql-query-builder','json-formatter','json-validator','api-tester'],
    ['sql-minifier','sql-validator','sql-formatter','sql-to-json','json-to-csv'],
    ['sql-to-json','sql-minifier','csv-to-json','json-to-csv','json-formatter'],
    // 배치 14: HTTP·API
    ['curl-generator','curl-parser','http-request-builder','api-tester','webhook-tester'],
    ['webhook-tester','webhook-generator','hmac-generator','api-tester','curl-generator'],
    ['http-request-builder','curl-generator','curl-parser','api-tester','user-agent-parser'],
    // 배치 14: Regex
    ['regex-generator','regex-cheatsheet','regex-tester','json-path-tester','find-replace'],
    ['regex-cheatsheet','regex-generator','regex-tester','find-replace','text-cleaner'],
    // 배치 14: ID 생성
    ['uuid-converter','uuid-generator','ulid-generator','nanoid-generator','random-string'],
    ['ulid-generator','nanoid-generator','uuid-generator','uuid-converter','random-string'],
    // 배치 15: AI 비용·토큰
    ['prompt-token-estimator','openai-cost-estimator','claude-cost-estimator','gemini-cost-estimator','ai-pricing-comparison'],
    ['openai-cost-estimator','claude-cost-estimator','gemini-cost-estimator','ai-pricing-comparison','ai-model-comparison'],
    ['claude-cost-estimator','openai-cost-estimator','gemini-cost-estimator','ai-pricing-comparison','prompt-token-estimator'],
    ['gemini-cost-estimator','openai-cost-estimator','claude-cost-estimator','ai-pricing-comparison','ai-model-comparison'],
    // 배치 15: 프롬프트 도구
    ['prompt-cleaner','prompt-template-generator','prompt-variable-extractor','prompt-token-estimator','ai-cost-calculator'],
    ['prompt-template-generator','prompt-cleaner','prompt-variable-extractor','ai-model-comparison','chatgpt-token-counter'],
    ['prompt-variable-extractor','prompt-template-generator','prompt-cleaner','prompt-token-estimator','ai-cost-calculator'],
    // 배치 15: AI 비교
    ['ai-model-comparison','ai-pricing-comparison','prompt-token-estimator','openai-cost-estimator','claude-cost-estimator'],
    ['ai-pricing-comparison','ai-model-comparison','openai-cost-estimator','claude-cost-estimator','gemini-cost-estimator'],
    ['markdown-chat-exporter','prompt-cleaner','prompt-template-generator','markdown-to-html','text-cleaner'],
    // 배치 16: 유니코드·인코딩
    ['unicode-inspector','unicode-converter','text-to-unicode','unicode-to-text','ascii-converter','ascii-table'],
    ['text-to-unicode','unicode-to-text','unicode-inspector','unicode-converter','ascii-converter'],
    ['ascii-converter','ascii-table','unicode-inspector','text-to-unicode','unicode-to-text'],
    // 배치 16: 이모지·텍스트 유틸
    ['emoji-counter','emoji-remover','text-case-detector','duplicate-line-finder','text-statistics'],
    ['emoji-remover','emoji-counter','text-cleaner','remove-empty-lines','stopword-remover'],
    // 배치 16: 암호화
    ['text-encryptor','text-decryptor','bcrypt-generator','hmac-generator','sha256-generator'],
    ['text-decryptor','text-encryptor','bcrypt-validator','hash-checker','sha256-generator'],
    // 배치 16: 케이스·중복
    ['text-case-detector','case-converter','duplicate-line-finder','remove-duplicate-lines','text-diff-checker'],
    ['duplicate-line-finder','remove-duplicate-lines','text-case-detector','find-replace','text-diff-checker'],
    // 배치 16: 언어·단어 분석
    ['palindrome-checker','anagram-checker','text-statistics','keyword-extractor','stopword-remover'],
    ['anagram-checker','palindrome-checker','text-statistics','keyword-extractor','random-word-generator'],
    ['text-statistics','keyword-extractor','stopword-remover','word-counter','keyword-density'],
    ['keyword-extractor','stopword-remover','text-statistics','keyword-density','word-counter'],
    ['stopword-remover','keyword-extractor','text-statistics','text-cleaner','remove-empty-lines'],
    // 배치 16: 병합
    ['text-merger','line-merger','text-sorter','text-diff-checker','find-replace'],
    ['line-merger','text-merger','remove-empty-lines','remove-duplicate-lines','text-sorter'],
    ['random-word-generator','lorem-ipsum','random-string','hashtag-generator','keyword-extractor'],
    // 텍스트: 분석·카운팅
    ['word-counter','character-counter','line-counter','sentence-counter','read-time-calculator','keyword-density'],
    // 텍스트: 편집·클리닝
    ['find-replace','text-cleaner','remove-empty-lines','remove-duplicate-lines','remove-duplicate-words','text-diff-checker'],
    // 텍스트: 정렬·변환
    ['text-sorter','alphabetizer','text-reverser','text-shuffler','slug-generator','hashtag-generator','case-converter'],
    // 한국: 급여
    ['salary','salary-reverse','salary-raise','salary-negotiation','payslip-calc','overtime-pay','minimum-wage','weekly-holiday','annual-leave','parental-leave','severance'],
    // 한국: 보험·연금
    ['four-insurance','national-pension','health-insurance','health-insurance-calc','retirement-calc','retirement-pension','unemployment','unemployment-benefit'],
    // 한국: 세금
    ['income-tax','freelancer-tax','capital-gains-tax','stock-tax','severance-tax','gift-tax','inheritance-tax'],
    // 한국: 부동산
    ['loan-calc','ltv-calculator','dsr-calc','prepayment-fee','realestate-fee','rent-convert','acquisition-tax','property-tax','cheongyak-score','credit-loan-limit'],
    // 한국: 날짜
    ['korean-age','dday','working-days-calc','age-calculator','date-calc'],
  ];

  // ── 관련 도구 맵 빌드 ────────────────────────────────────────────
  // 같은 그룹에서 최대 MAX_RELATED개 선택 (자기 자신 제외, 거리 가까운 순)
  var MAX_RELATED = 5;
  var RELATED = {};

  GROUPS.forEach(function (group) {
    group.forEach(function (slug, idx) {
      if (!RELATED[slug]) RELATED[slug] = [];
      // 같은 그룹 내 가까운 이웃부터: 앞뒤 2, 3, ... 거리 순
      for (var dist = 1; dist < group.length; dist++) {
        [-dist, dist].forEach(function (d) {
          var j = idx + d;
          if (j >= 0 && j < group.length) {
            var other = group[j];
            if (other !== slug && RELATED[slug].indexOf(other) === -1) {
              RELATED[slug].push(other);
            }
          }
        });
      }
    });
  });

  // ── 카테고리 허브 맵 ─────────────────────────────────────────────
  var CATEGORY_MAP = {
    // Finance
    'compound-interest':'finance-calculators','savings-calc':'finance-calculators',
    'inflation-calculator':'finance-calculators','currency-converter':'finance-calculators',
    'sip-calculator':'finance-calculators','emi-calculator':'finance-calculators',
    'loan-calculator-en':'finance-calculators','gst-calculator':'finance-calculators',
    'vat-calculator-global':'finance-calculators','mortgage-calculator':'finance-calculators',
    'roi-calculator':'finance-calculators','apr-calculator':'finance-calculators',
    'loan-payoff-calculator':'finance-calculators','investment-return-calculator':'finance-calculators',
    'fire-calculator':'finance-calculators',
    // Health
    'bmi-calculator':'health-calculators','bmi-calc':'health-calculators',
    'body-fat-calculator':'health-calculators','calorie-calculator':'health-calculators',
    'macro-calculator':'health-calculators','water-intake':'health-calculators',
    'pace-calculator':'health-calculators','pregnancy-due-date':'health-calculators',
    // Date & Time
    'age-calculator':'date-time-tools','date-calc':'date-time-tools',
    'time-calculator':'date-time-tools','business-days-calculator':'date-time-tools',
    'countdown-timer':'date-time-tools','pomodoro-timer':'date-time-tools',
    'timestamp':'date-time-tools','timezone-converter':'date-time-tools',
    'dday':'date-time-tools','korean-age':'date-time-tools','working-days-calc':'date-time-tools',
    // Data
    'json-formatter':'data-tools','json-validator':'data-tools','json-viewer':'data-tools',
    'json-minifier':'data-tools','sha256-generator':'data-tools','md5-generator':'data-tools',
    'xml-formatter':'data-tools','yaml-formatter':'data-tools',
    'sql-formatter':'data-tools','json-to-csv':'data-tools','csv-to-json':'data-tools',
    // Security
    'base64-url':'security-tools','base64-encoder':'security-tools','base64-decoder':'security-tools',
    'text-to-base64':'security-tools','base64-to-text':'security-tools',
    'url-encoder':'security-tools','url-decoder':'security-tools',
    'html-encoder':'security-tools','html-decoder':'security-tools',
    'hash-generator':'security-tools','jwt-decoder':'security-tools',
    'jwt-generator':'security-tools','password-generator':'security-tools',
    'random-string':'security-tools',
    // Text
    'character-counter':'text-tools','word-counter':'text-tools','line-counter':'text-tools',
    'sentence-counter':'text-tools','read-time-calculator':'text-tools',
    'keyword-density':'text-tools','find-replace':'text-tools','text-reverser':'text-tools',
    'text-shuffler':'text-tools','text-sorter':'text-tools','alphabetizer':'text-tools',
    'remove-empty-lines':'text-tools','remove-duplicate-lines':'text-tools',
    'text-cleaner':'text-tools','text-diff-checker':'text-tools','case-converter':'text-tools',
    // AI
    'ai-token-counter':'ai-tools','ai-cost-calculator':'ai-tools','chatgpt-token-counter':'ai-tools','prompt-formatter':'ai-tools',
    // Developer
    'cron-generator':'developer-tools','cron-parser':'developer-tools','cron-validator':'developer-tools',
    'uuid-validator':'developer-tools','regex-tester':'developer-tools',
    'markdown-preview':'developer-tools','markdown-to-html':'developer-tools','html-to-markdown':'developer-tools',
    'lorem-ipsum':'developer-tools',
    // Image
    'csv-viewer':'data-tools',
    'image-compressor':'image-tools','image-resizer':'image-tools','webp-to-png':'image-tools','png-to-jpg':'image-tools',
    'image-to-webp':'image-tools','base64-image':'image-tools',
    'svg-viewer':'image-tools','svg-minifier':'image-tools','svg-to-png':'image-tools','png-to-svg':'image-tools',
    'image-cropper':'image-tools','image-rotator':'image-tools','image-watermark':'image-tools','image-metadata-viewer':'image-tools',
    'exif-viewer':'image-tools','exif-remover':'image-tools','favicon-maker':'image-tools','ico-converter':'image-tools',
    'jpg-to-webp':'image-tools','webp-to-jpg':'image-tools','image-color-extractor':'image-tools','dominant-color-finder':'image-tools',
    'blur-image':'image-tools','pixelate-image':'image-tools','image-base64-encoder':'image-tools','image-base64-decoder':'image-tools',
    'color-picker':'image-tools','color-palette':'image-tools','color-converter':'image-tools',
    'color-contrast-checker':'image-tools','hex-to-rgb':'image-tools','rgb-to-hex':'image-tools',
    // PDF
    'pdf-merge':'pdf-tools','pdf-split':'pdf-tools','pdf-compressor':'pdf-tools','pdf-page-counter':'pdf-tools',
    'pdf-to-image':'pdf-tools','image-to-pdf':'pdf-tools',
    'pdf-password-remover':'pdf-tools','pdf-password-adder':'pdf-tools','pdf-rotate':'pdf-tools','pdf-reorder-pages':'pdf-tools',
    'pdf-extract-text':'pdf-tools','pdf-extract-images':'pdf-tools','pdf-metadata-viewer':'pdf-tools','pdf-unlock':'pdf-tools',
    'pdf-watermark':'pdf-tools','pdf-to-text':'pdf-tools',
    'word-to-minute-converter':'text-tools','typing-speed-test':'text-tools','cps-calculator':'text-tools',
    'wpm-calculator':'text-tools','reading-level-checker':'text-tools','keyword-density-checker':'text-tools',
    'seo-title-generator':'generator-tools','meta-description-generator':'generator-tools',
    'slug-checker':'developer-tools','url-slug-generator':'developer-tools',
    'yaml-validator':'developer-tools','json-to-xml':'developer-tools',
    'html-minifier':'developer-tools','css-minifier':'developer-tools',
    'javascript-minifier':'developer-tools','javascript-beautifier':'developer-tools','css-beautifier':'developer-tools',
    'token-estimator':'ai-tools','prompt-template-library':'ai-tools',
    'image-prompt-generator':'ai-tools','youtube-script-generator':'generator-tools',
    'prompt-improver':'ai-tools','prompt-optimizer':'ai-tools','system-prompt-generator':'ai-tools',
    'ai-email-generator':'generator-tools','ai-resume-generator':'generator-tools','ai-cover-letter-generator':'generator-tools',
    'ai-product-description-generator':'generator-tools',
    'ai-blog-title-generator':'generator-tools','ai-youtube-title-generator':'generator-tools',
    'ai-thumbnail-title-generator':'generator-tools','ai-tweet-generator':'generator-tools','ai-linkedin-post-generator':'generator-tools',
    'jwt-expiration-checker':'security-tools',
    'json-schema-generator':'developer-tools','json-schema-validator':'developer-tools',
    'xml-beautifier':'developer-tools',
    'yaml-diff-checker':'developer-tools','csv-diff-checker':'developer-tools',
    'sql-query-explainer':'developer-tools',
    'regex-extractor':'developer-tools','regex-replace-tester':'developer-tools',
    'epoch-converter':'date-time-tools',
    'uuid-bulk-generator':'developer-tools','uuid-extractor':'developer-tools',
    'api-response-viewer':'developer-tools',
    'utm-builder':'generator-tools',
    'robots-txt-generator':'generator-tools','meta-tag-generator':'generator-tools',
    'ip-address-lookup':'developer-tools',
    'sitemap-generator':'generator-tools','xml-validator':'developer-tools',
    'robots-txt-validator':'developer-tools','meta-tag-analyzer':'developer-tools',
    'open-graph-generator':'generator-tools',
    'twitter-card-generator':'generator-tools','schema-markup-generator':'generator-tools',
    'schema-validator':'developer-tools','hreflang-generator':'generator-tools',
    'canonical-tag-checker':'developer-tools',
    // Batch 10
    'keyword-clustering-tool':'developer-tools','keyword-grouping-tool':'developer-tools',
    'redirect-checker':'developer-tools','http-header-checker':'security-tools','user-agent-parser':'developer-tools',
    // Batch 11
    'dns-lookup':'developer-tools','whois-lookup':'developer-tools',
    'ssl-checker':'security-tools','ssl-decoder':'security-tools','csr-generator':'security-tools',
    // Batch 12
    'htaccess-generator':'generator-tools','nginx-config-generator':'generator-tools',
    'apache-config-generator':'generator-tools','csp-generator':'security-tools','csp-validator':'security-tools',
    // Batch 13
    'cors-header-checker':'security-tools','mime-type-finder':'developer-tools',
    'website-speed-estimator':'developer-tools','sitemap-validator':'developer-tools','favicon-generator':'generator-tools',
    // Generator
    'uuid-generator':'generator-tools','qr-generator':'generator-tools',
    'barcode-generator':'generator-tools',
    // Batch 14
    'jwt-validator':'security-tools','jwt-inspector':'security-tools',
    'json-diff':'data-tools','json-flattener':'data-tools',
    'json-to-yaml':'developer-tools','yaml-to-json':'developer-tools',
    'xml-to-json':'data-tools','json-path-tester':'data-tools',
    'graphql-formatter':'developer-tools','graphql-query-builder':'developer-tools',
    'sql-minifier':'developer-tools','sql-validator':'developer-tools','sql-to-json':'data-tools',
    'curl-generator':'developer-tools','curl-parser':'developer-tools',
    'http-request-builder':'developer-tools','api-tester':'developer-tools',
    'webhook-tester':'developer-tools','webhook-generator':'developer-tools',
    'regex-generator':'developer-tools','regex-cheatsheet':'developer-tools',
    'uuid-converter':'generator-tools','ulid-generator':'generator-tools','nanoid-generator':'generator-tools',
    'hash-checker':'security-tools','bcrypt-generator':'security-tools','bcrypt-validator':'security-tools',
    'hmac-generator':'security-tools','rsa-key-generator':'security-tools','ssh-key-generator':'security-tools',
    // Batch 15
    'prompt-token-estimator':'ai-tools','openai-cost-estimator':'ai-tools','claude-cost-estimator':'ai-tools',
    'gemini-cost-estimator':'ai-tools','prompt-cleaner':'ai-tools','prompt-template-generator':'ai-tools',
    'prompt-variable-extractor':'ai-tools','ai-model-comparison':'ai-tools','ai-pricing-comparison':'ai-tools',
    'markdown-chat-exporter':'ai-tools',
    // Batch 16
    'text-case-detector':'text-tools','duplicate-line-finder':'text-tools','unicode-inspector':'text-tools',
    'unicode-converter':'text-tools','emoji-counter':'text-tools','emoji-remover':'text-tools',
    'text-encryptor':'text-tools','text-decryptor':'text-tools','text-to-unicode':'text-tools',
    'unicode-to-text':'text-tools','ascii-converter':'text-tools','ascii-table':'text-tools',
    'palindrome-checker':'text-tools','anagram-checker':'text-tools','text-statistics':'text-tools',
    'keyword-extractor':'text-tools','stopword-remover':'text-tools','text-merger':'text-tools',
    'line-merger':'text-tools','random-word-generator':'text-tools',
  };

  var CAT_INFO = {
    'finance-calculators':  { ko:'금융 계산기',     en:'Finance Calculators',      zh:'金融计算器',   ja:'金融計算機',   icon:'💰', count:15 },
    'health-calculators':   { ko:'건강 계산기',     en:'Health Calculators',       zh:'健康计算器',   ja:'健康計算機',   icon:'🩺', count:8  },
    'date-time-tools':      { ko:'날짜 & 시간',     en:'Date & Time Tools',        zh:'日期时间工具', ja:'日時ツール',   icon:'📅', count:11 },
    'data-tools':           { ko:'데이터 포맷터',   en:'Data Formatter Tools',     zh:'数据工具',     ja:'データフォーマッター', icon:'📊', count:6  },
    'security-tools':       { ko:'보안 & 인코딩',   en:'Security & Encoding',      zh:'安全工具',     ja:'セキュリティ & エンコード', icon:'🔐', count:9  },
    'text-tools':           { ko:'텍스트 도구',     en:'Text Tools',               zh:'文本工具',     ja:'テキストツール', icon:'✍️', count:22 },
    'ai-tools':             { ko:'AI 도구',         en:'AI Tools',                 zh:'AI工具',       ja:'AIツール',     icon:'🤖', count:2  },
    'developer-tools':      { ko:'개발자 도구',     en:'Developer Tools',          zh:'开发工具',     ja:'開発者ツール', icon:'💻', count:6  },
    'image-tools':          { ko:'이미지 도구',     en:'Image Tools',              zh:'图片工具',     ja:'画像ツール',   icon:'🖼️', count:27 },
    'pdf-tools':            { ko:'PDF 도구',        en:'PDF Tools',                zh:'PDF工具',      ja:'PDFツール',    icon:'📄', count:14 },
    'generator-tools':      { ko:'생성기 도구',     en:'Generator Tools',          zh:'生成器',       ja:'ジェネレーターツール', icon:'⚡', count:8  },
  };

  // ── 브레드크럼 JSON-LD 주입 ──────────────────────────────────────
  function injectBreadcrumbSchema(slug, catSlug) {
    if (document.querySelector('script[data-rt-bc]')) return;
    var catI = CAT_INFO[catSlug];
    var toolI = T[slug];
    if (!catI || !toolI) return;
    var lang = getLang();
    var toolName = toolI[lang] || toolI.en;
    var catName  = catI[lang]  || catI.en;
    var schema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type':'ListItem', position:1, name:'MODOO HUB', item:'https://modoohub.com/' },
        { '@type':'ListItem', position:2, name:catName, item:'https://modoohub.com/category/' + catSlug + '.html' },
        { '@type':'ListItem', position:3, name:toolName, item:'https://modoohub.com/' + slug + '.html' }
      ]
    };
    var s = document.createElement('script');
    s.type = 'application/ld+json';
    s.setAttribute('data-rt-bc', '1');
    s.textContent = JSON.stringify(schema);
    document.head.appendChild(s);
  }

  // ── 현재 페이지 감지 & 렌더링 ────────────────────────────────────
  var page = location.pathname.split('/').pop().replace(/\.html$/, '') || '';
  if (!page || !RELATED[page]) return;

  var relatedSlugs = RELATED[page]
    .filter(function (s) { return T[s]; })
    .slice(0, MAX_RELATED);
  if (!relatedSlugs.length) return;

  var lang = getLang();
  var LABELS = { ko: '관련 도구', en: 'Related Tools', zh: '相关工具', ja: '関連ツール' };
  var CAT_LABELS = { ko: '카테고리 전체 보기', en: 'Browse all', zh: '查看全部', ja: 'カテゴリをすべて見る' };

  // 브레드크럼 스키마 주입
  var pageCat = CATEGORY_MAP[page];
  if (pageCat) injectBreadcrumbSchema(page, pageCat);

  // CSS 주입 (한 번만)
  if (!document.getElementById('rt-style')) {
    var style = document.createElement('style');
    style.id = 'rt-style';
    style.textContent = [
      '.rt-section{margin:32px 0 24px;padding-top:24px;border-top:1px solid #222;}',
      '.rt-heading{font-size:11px;color:#555;font-family:"DM Mono",monospace;letter-spacing:.08em;margin-bottom:12px;}',
      '.rt-grid{display:flex;flex-wrap:wrap;gap:8px;}',
      '.rt-card{display:flex;align-items:center;gap:8px;padding:9px 14px;background:#141414;border:1px solid #222;border-radius:8px;text-decoration:none;color:#aaa;font-size:12px;font-family:"DM Mono",monospace;transition:border-color .15s,color .15s;}',
      '.rt-card:hover{border-color:var(--accent,#60a5fa);color:var(--accent,#60a5fa);}',
      '.rt-icon{font-size:14px;flex-shrink:0;}',
      '.rt-cat-link{display:inline-flex;align-items:center;gap:6px;margin-top:12px;font-size:11px;color:#555;font-family:"DM Mono",monospace;text-decoration:none;transition:color .15s;}',
      '.rt-cat-link:hover{color:var(--accent,#60a5fa);}',
    ].join('');
    document.head.appendChild(style);
  }

  // 카테고리 허브 링크 생성
  var catLinkHtml = '';
  if (pageCat && CAT_INFO[pageCat]) {
    var cI = CAT_INFO[pageCat];
    var cName = cI[lang] || cI.en;
    catLinkHtml = '<a href="category/' + pageCat + '.html" class="rt-cat-link">' +
      cI.icon + ' ' + CAT_LABELS[lang] + ' ' + cName + ' (' + cI.count + ') →</a>';
  }

  // 섹션 생성
  var section = document.createElement('div');
  section.className = 'rt-section';
  section.innerHTML =
    '<div class="rt-heading">' + LABELS[lang] + '</div>' +
    '<div class="rt-grid">' +
    relatedSlugs.map(function (s) {
      var info = T[s];
      var name = info[lang] || info.en;
      return '<a href="' + s + '.html" class="rt-card"><span class="rt-icon">' + info.icon + '</span><span>' + name + '</span></a>';
    }).join('') +
    '</div>' +
    catLinkHtml;

  // .seo 바로 앞에 삽입 (없으면 main 끝에)
  var seoEl = document.querySelector('.seo');
  var mainEl = document.querySelector('main');
  if (seoEl) {
    seoEl.parentNode.insertBefore(section, seoEl);
  } else if (mainEl) {
    mainEl.appendChild(section);
  }
})();
