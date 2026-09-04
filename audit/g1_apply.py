#!/usr/bin/env python3
"""G-1: 가이드 430개에 skip link / <main id> / theme-color / color-scheme 일괄 적용.
안전장치:
 - 4개 앵커 전부 매칭될 때만 파일 기록 (하나라도 실패 시 스킵 + 보고)
 - 이미 skip-link 있으면 idempotent 스킵
 - 본문/스크립트/광고/번역 텍스트는 앵커 밖이라 불변
사용:
  python3 audit/g1_apply.py --dry  FILE...      # diff 미리보기
  python3 audit/g1_apply.py       FILE...       # 적용
  python3 audit/g1_apply.py       --all         # guides/*.html 전체(index.html 제외)
"""
import sys, re, glob, difflib

SKIP_CSS = (
    ".skip-link{position:absolute;left:12px;top:-48px;z-index:100;"
    "background:var(--surface);color:var(--text);border:1px solid var(--accent);"
    "border-radius:8px;padding:8px 14px;font-size:13px;text-decoration:none;"
    "transition:top .15s;}\n"
    ".skip-link:focus{top:12px;}\n"
)
THEME_META = '<meta name="theme-color" content="#080B14">'

def transform(html, lang):
    changes = []
    txt = "Skip to content" if lang == "en" else "본문 바로가기"

    # 1+2: </header> <main> -> + skip link + <main id tabindex>
    new, n = re.subn(
        r'</header>\s*<main>',
        '</header>\n<a href="#main" class="skip-link">' + txt + '</a>\n<main id="main" tabindex="-1">',
        html, count=1)
    if n != 1:
        return None, "anchor:header/main 미매칭"
    html = new; changes.append("skip-link + <main id>")

    # 3: theme-color after viewport meta
    new, n = re.subn(
        r'(<meta name="viewport"[^>]*>)',
        r'\1\n' + THEME_META,
        html, count=1)
    if n != 1:
        return None, "anchor:viewport meta 미매칭"
    html = new; changes.append("theme-color")

    # 4a: color-scheme into :root{}
    new, n = re.subn(
        r'(:root\{)(?![^}]*color-scheme)',
        r'\1color-scheme:dark;',
        html, count=1)
    if n != 1:
        return None, "anchor::root{ 미매칭"
    html = new; changes.append("color-scheme")

    # 4b: .skip-link CSS right after the :root{...} declaration
    new, n = re.subn(
        r'(:root\{[^}]*\}\s*\n)',
        r'\1' + SKIP_CSS,
        html, count=1)
    if n != 1:
        return None, "anchor::root{} 종료 미매칭"
    html = new; changes.append(".skip-link css")

    return html, "+".join(changes)

def main():
    args = sys.argv[1:]
    dry = "--dry" in args
    args = [a for a in args if a != "--dry"]
    if "--all" in args:
        files = [f for f in sorted(glob.glob("guides/*.html")) if f != "guides/index.html"]
    else:
        files = args
    ok = skipped = failed = 0
    fails = []
    for f in files:
        h = open(f, encoding="utf-8").read()
        if 'class="skip-link"' in h:
            skipped += 1; continue
        m = re.search(r'<html lang="([a-z-]+)"', h)
        lang = m.group(1) if m else "ko"
        out, msg = transform(h, lang)
        if out is None:
            failed += 1; fails.append((f, msg)); continue
        if dry:
            d = "".join(difflib.unified_diff(
                h.splitlines(keepends=True), out.splitlines(keepends=True),
                fromfile=f, tofile=f + " (new)", n=1))
            print(d)
        else:
            open(f, "w", encoding="utf-8").write(out)
        ok += 1
    print(f"\n== {'DRY ' if dry else ''}적용:{ok}  스킵(이미됨):{skipped}  실패:{failed} ==")
    for f, m in fails:
        print(f"  FAIL {f}: {m}")
    sys.exit(1 if failed else 0)

if __name__ == "__main__":
    main()
