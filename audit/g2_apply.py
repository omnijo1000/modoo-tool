#!/usr/bin/env python3
"""G-2: 5열 표 가이드 10개 — 표 반응형 처리.
 - <table>..</table> -> <div class="table-wrap"><table>..</table></div>
 - th,td 규칙 다음에 공통 CSS 블록 삽입 (.table-wrap + <=480px)
데스크톱 무변경 (min-width:440 < 컨테이너), 열 삭제/숨김 없음, 페이지 가로 overflow 차단.
사용: python3 audit/g2_apply.py --dry|<apply>  [files...]  (기본: 10개 고정 목록)
"""
import sys, re, difflib

FILES = [
    "guides/mortgage-pmi-vs-korea-ltv-20-percent-down.html",
    "guides/macro-calculator-fixed-protein-ratio.html",
    "guides/margin-markup-percentage-confusion.html",
    "guides/uuid-extractor-version-variant-regex-detection.html",
    "guides/uuid-extractor-version-variant-regex-detection-en.html",
    "guides/sql-validator-not-a-real-parser.html",
    "guides/sql-validator-not-a-real-parser-en.html",
    "guides/typing-speed-wpm-5-char-word-standard.html",
    "guides/typing-speed-wpm-5-char-word-standard-en.html",
    "guides/cagr-hides-volatility-trap.html",
]

ANCHOR = "th,td{border:1px solid var(--border);padding:8px 10px;text-align:left;}"
CSS = (
    "\n.table-wrap{overflow-x:auto;-webkit-overflow-scrolling:touch;margin:16px 0;}"
    "\n.table-wrap table{margin:0;min-width:440px;}"
    "\n@media(max-width:480px){.table-wrap th,.table-wrap td{padding:6px 8px;font-size:12px;}}"
)

def transform(html):
    if "table-wrap" in html:
        return None, "이미 적용됨"
    # CSS
    if html.count(ANCHOR) != 1:
        return None, f"ANCHOR {html.count(ANCHOR)}개"
    html = html.replace(ANCHOR, ANCHOR + CSS, 1)
    # wrap tables (non-greedy, no nesting verified)
    html, n = re.subn(r'<table>([\s\S]*?)</table>',
                      r'<div class="table-wrap"><table>\1</table></div>', html)
    if n == 0:
        return None, "<table> 미매칭"
    return html, f"css + {n} table wrap"

def main():
    a = sys.argv[1:]
    dry = "--dry" in a
    files = [x for x in a if not x.startswith("--")] or FILES
    ok = fail = 0
    for f in files:
        h = open(f, encoding="utf-8").read()
        out, msg = transform(h)
        if out is None:
            print(f"  SKIP/FAIL {f}: {msg}"); fail += 1; continue
        if dry:
            print("".join(difflib.unified_diff(
                h.splitlines(keepends=True), out.splitlines(keepends=True),
                fromfile=f, tofile=f+" (new)", n=1)))
        else:
            open(f, "w", encoding="utf-8").write(out)
        print(f"  OK {f}: {msg}"); ok += 1
    print(f"\n== {'DRY ' if dry else ''}적용:{ok} 실패:{fail} ==")
    sys.exit(1 if fail else 0)

if __name__ == "__main__":
    main()
