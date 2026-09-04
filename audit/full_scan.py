#!/usr/bin/env python3
"""전수 자동 점검. 정적 분석만 (브라우저 검증은 별도).
사용: python3 audit/full_scan.py  ->  audit/full_scan.csv + stdout 요약
"""
import os, re, glob, csv, sys, json, collections

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)

def read(p):
    try:
        return open(p, encoding='utf-8').read()
    except Exception as e:
        return ''

# ---- sitemap URLs ----
sm = read('sitemap.xml')
SITEMAP = set(re.findall(r'<loc>https?://modoohub\.com/([^<]*)</loc>', sm))
SITEMAP_PATHS = set(u.split('?')[0].strip('/') or 'index.html' for u in SITEMAP)

# ---- collect html ----
files = []
for pat in ('*.html', 'guides/*.html', 'category/*.html'):
    files += glob.glob(pat)
files = sorted(set(files))

INFO = {'about.html','contact.html','privacy.html','terms.html','404.html'}

def classify(path, html):
    base = os.path.basename(path)
    if path.startswith('category/'):
        return 'category'
    if path.startswith('guides/'):
        return 'guide-en' if base.endswith('-en.html') else 'guide'
    if base == 'index.html':
        return 'index'
    if base in INFO:
        return 'info'
    if re.search(r'http-equiv=["\']?refresh', html, re.I) or "location.replace(" in html and len(re.sub(r'\s','',html)) < 2500:
        return 'stub'
    # tool subtype
    low = html.lower()
    if re.search(r'\b(calculator|계산기|calc\b)', base+low[:3000]) or 'class="readout"' in html or 'result-area' in html:
        return 'tool-calc'
    return 'tool'

def strip_tags(s):
    s = re.sub(r'<script[\s\S]*?</script>', ' ', s, flags=re.I)
    s = re.sub(r'<style[\s\S]*?</style>', ' ', s, flags=re.I)
    s = re.sub(r'<[^>]+>', ' ', s)
    s = re.sub(r'&[a-z#0-9]+;', ' ', s)
    return re.sub(r'\s+', ' ', s).strip()

rows = []
titles = collections.Counter()
title_map = collections.defaultdict(list)
descs = collections.defaultdict(list)

for f in files:
    h = read(f)
    typ = classify(f, h)
    p = f  # repo-relative
    inSitemap = (p in SITEMAP_PATHS)
    R = dict(file=p, type=typ, inSitemap=inSitemap, issues=[])
    def flag(sev, code, msg):
        R['issues'].append(f'{sev}:{code}:{msg}')

    loads_theme = 'theme-instrument.js' in h
    has_main = bool(re.search(r'<main[\s>]', h))
    n_h1 = len(re.findall(r'<h1[\s>]', h))
    m_lang = re.search(r'<html[^>]*\blang=["\']([^"\']*)["\']', h, re.I)
    lang = m_lang.group(1) if m_lang else ''
    title_m = re.search(r'<title[^>]*>([\s\S]*?)</title>', h, re.I)
    title = strip_tags(title_m.group(1)) if title_m else ''
    desc_m = re.search(r'<meta[^>]+name=["\']description["\'][^>]*>', h, re.I)
    desc_c = ''
    if desc_m:
        cm = re.search(r'content=["\']([^"\']*)["\']', desc_m.group(0))
        desc_c = cm.group(1) if cm else ''
    canon = bool(re.search(r'<link[^>]+rel=["\']canonical["\']', h, re.I))
    tcolor = bool(re.search(r'<meta[^>]+name=["\']theme-color["\']', h, re.I)) or loads_theme
    noindex = bool(re.search(r'<meta[^>]+name=["\']robots["\'][^>]*noindex', h, re.I))

    if typ == 'stub':
        if not noindex: flag('P0','stub-noindex','스텁에 noindex 없음')
        if not canon: flag('P1','stub-canonical','스텁에 canonical 없음')
        if inSitemap: flag('P0','stub-in-sitemap','스텁 URL이 sitemap에 등록됨')
        rows.append(R); title_map[title].append(p)
        continue

    # 1. structure
    if not has_main: flag('P1','no-main','<main> 없음')
    if not (loads_theme or re.search(r'class=["\'][^"\']*skip-link', h)):
        flag('P1','no-skiplink','skip link 없음(theme-instrument.js 미로드 & 인라인 없음)')
    if n_h1 == 0: flag('P1','no-h1','<h1> 없음')
    elif n_h1 > 1: flag('P2','multi-h1',f'<h1> {n_h1}개')
    if not lang: flag('P1','no-lang','<html lang> 없음')

    # 2. meta
    if not title: flag('P0','no-title','<title> 비어있음')
    if not desc_c: flag('P1','no-desc','meta description 없음')
    elif len(desc_c) < 40: flag('P2','short-desc',f'description {len(desc_c)}자')
    if not canon: flag('P1','no-canonical','canonical 없음')
    if not tcolor: flag('P2','no-theme-color','theme-color 없음')

    # 3. inputs (visible, non-hidden)
    inputs = re.findall(r'<(input|textarea|select)\b[^>]*>', h, re.I)
    unlabeled = 0
    ids_with_label = set(re.findall(r'<label[^>]+for=["\']([^"\']+)["\']', h, re.I))
    for tag in inputs:
        t = tag.lower()
        ty = re.search(r'type=["\']([^"\']+)["\']', t)
        ty = ty.group(1) if ty else 'text'
        if ty in ('hidden','submit','button','reset','image'): continue
        idm = re.search(r'\bid=["\']([^"\']+)["\']', t)
        has = ('aria-label' in t or 'aria-labelledby' in t or 'title=' in t
               or (idm and idm.group(1) in ids_with_label))
        # wrapping <label> heuristic: hard statically; radio/checkbox usually wrapped
        if not has and ty in ('radio','checkbox'): continue
        if not has: unlabeled += 1
    if unlabeled:
        sev = 'P1' if typ in ('tool','tool-calc') and unlabeled >= 2 else 'P2'
        flag(sev,'unlabeled-input',f'라벨 없는 입력 {unlabeled}개')

    # 4. result a11y
    has_result = bool(re.search(r'class=["\'][^"\']*(readout|result-area|result-box|bmi-display|tax-display)', h))
    if has_result and not loads_theme and not re.search(r'aria-live|role=["\']status["\']|id=["\']a11yStatus', h):
        flag('P1','result-no-live','결과 영역에 aria-live/announcer 없음')

    # 5. mobile overflow static heuristics
    if re.search(r'white-space:\s*nowrap', h) and typ in ('tool','tool-calc'):
        # only flag if on a big block, weak signal -> P2
        pass
    for m in re.finditer(r'(width|min-width):\s*(\d{3,})px', h):
        if int(m.group(2)) > 420 and 'max-' not in h[max(0,m.start()-6):m.start()]:
            flag('P2','fixed-wide',f'{m.group(0)} 고정폭(모바일 넘침 위험)')
            break
    if re.search(r'<table', h, re.I) and not re.search(r'(tbl-scroll|overflow-x|table-wrap|table-scroll)', h):
        flag('P2','table-no-scroll','<table>에 가로스크롤 래퍼 없음')

    # 6. i18n
    has_i18n = bool(re.search(r'\b_?i18n\s*=\s*{', h))
    if has_i18n:
        if not re.search(r'function\s+(applyLang|_applyLang)\b|MHI18n\.init', h):
            flag('P2','i18n-no-apply','i18n 객체 있으나 applyLang/MHI18n.init 없음')
        if not re.search(r'function\s+(cycleLang|toggleLang)\b|MHI18n\.init', h):
            flag('P2','i18n-no-toggle','언어 토글 함수 없음')
        # legacy 'lang' key
        if re.search(r"localStorage\.setItem\(\s*['\"]lang['\"]", h):
            flag('P1','i18n-legacy-key',"localStorage 'lang' 키 (modoo_lang 아님)")
    # inline script syntax (crude): unbalanced backtick count in each script
    for sm2 in re.finditer(r'<script\b([^>]*)>([\s\S]*?)</script>', h, re.I):
        attrs, body = sm2.group(1), sm2.group(2)
        if 'src=' in attrs or 'ld+json' in attrs or 'application/json' in attrs: continue
        if body.count('`') % 2 != 0:
            flag('P1','script-backtick','인라인 script 백틱 홀수(템플릿리터럴 깨짐 가능)')
            break

    # 7. empty / dup / english leftover
    for m in re.finditer(r'<div[^>]+class=["\'][^"\']*\bseo\b[^"\']*["\'][^>]*>([\s\S]*?)</div>', h, re.I):
        pass
    seo_m = re.search(r'<(div|section)[^>]+class=["\'][^"\']*\bseo\b[^"\']*["\'][^>]*>([\s\S]*?)</\1>', h, re.I)
    if typ in ('tool','tool-calc'):
        if seo_m is None:
            flag('P1','no-seo','SEO 본문 컨테이너 없음')
        else:
            seo_txt = strip_tags(seo_m.group(2))
            if len(seo_txt) < 120:
                flag('P1','seo-thin',f'SEO 본문 {len(seo_txt)}자(빈약)')
            faq = len(re.findall(r'class=["\'][^"\']*faq-item', h))
            if faq < 4:
                flag('P2','faq-few',f'FAQ {faq}개(<4)')
    body_txt = strip_tags(re.sub(r'<header[\s\S]*?</header>','',h,flags=re.I))
    # english leftover on ko page: visible ALLCAPS/asciiword UI in first 400 chars of body after h1
    if lang == 'ko' and typ in ('tool','tool-calc','info'):
        vis = strip_tags(h)
        # count hangul vs ascii-letters in visible text
        hang = len(re.findall(r'[가-힣]', vis))
        asci = len(re.findall(r'[A-Za-z]', vis))
        if hang > 50 and asci > hang*2:
            flag('P2','maybe-english','ko 페이지인데 가시 영문 비중 과다')

    # dup title tracking
    titles[title] += 1
    title_map[title].append(p)
    if desc_c: descs[desc_c].append(p)

    rows.append(R)

# ---- cross-file: duplicate titles / descs ----
for t, ps in title_map.items():
    real = [p for p in ps if not any(r['file']==p and r['type']=='stub' for r in rows)]
    if t and len(real) > 1:
        for r in rows:
            if r['file'] in real and r['type']!='stub':
                r['issues'].append(f'P2:dup-title:동일 <title> {len(real)}개 공유')
for d, ps in descs.items():
    if d and len(ps) > 1:
        for r in rows:
            if r['file'] in ps:
                r['issues'].append(f'P2:dup-desc:동일 description {len(ps)}개 공유')

# ---- sitemap entries with no file ----
have = set(rows[i]['file'] for i in range(len(rows)))
for u in sorted(SITEMAP_PATHS):
    if u not in have and not os.path.exists(u):
        rows.append(dict(file=u, type='(sitemap-only)', inSitemap=True,
                         issues=['P1:sitemap-404:sitemap URL에 해당 파일 없음']))

# ---- output ----
with open('audit/full_scan.csv','w',newline='',encoding='utf-8') as fh:
    w = csv.writer(fh)
    w.writerow(['file','type','inSitemap','severity','code','detail'])
    for r in rows:
        if not r['issues']:
            continue
        for iss in r['issues']:
            sev,code,detail = iss.split(':',2)
            w.writerow([r['file'], r['type'], r['inSitemap'], sev, code, detail])

# summary
by_type = collections.Counter(r['type'] for r in rows)
sev_count = collections.Counter()
code_count = collections.Counter()
for r in rows:
    for iss in r['issues']:
        sev,code,_ = iss.split(':',2)
        sev_count[sev]+=1
        code_count[(sev,code)]+=1

print('=== 파일 유형 분포 ===')
for t,c in sorted(by_type.items()): print(f'  {t:16} {c}')
print(f'  {"합계":16} {sum(by_type.values())}   (sitemap URL {len(SITEMAP_PATHS)})')
print('\n=== 심각도 합계 (이슈 인스턴스) ===')
for s in ('P0','P1','P2'): print(f'  {s}: {sev_count[s]}')
print('\n=== 코드별 (severity, code, count) ===')
for (s,c),n in sorted(code_count.items(), key=lambda x:(x[0][0],-x[1])):
    print(f'  {s} {c:22} {n}')
print(f'\nCSV: audit/full_scan.csv ({sum(1 for r in rows if r["issues"])} 파일 이슈)')
