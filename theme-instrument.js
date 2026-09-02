/* MODOO HUB — Instrument theme shared behavior (Hybrid A+)
   Rationale: design-mockups/DESIGN_DIRECTION.md
   - Injects the two ambient background blobs (kept out of markup to reduce per-file duplication).
   - Info-badge tooltips: click/tap toggle (not hover-only) so touch devices get a real open/close
     affordance instead of relying on :focus persistence. Desktop keeps :hover via CSS as a shortcut.
*/
(function(){
  function injectMesh(){
    if(document.querySelector('.mesh')) return;
    var mesh=document.createElement('div');
    mesh.className='mesh';
    mesh.innerHTML='<div class="blob a"></div><div class="blob b"></div>';
    document.body.insertBefore(mesh, document.body.firstChild);
  }

  function closeAllTooltips(except){
    document.querySelectorAll('.info.open').forEach(function(el){
      if(el===except) return;
      el.classList.remove('open');
      var btn=el.querySelector('.info-badge');
      if(btn) btn.setAttribute('aria-expanded','false');
    });
  }

  function initTooltips(){
    document.querySelectorAll('.info-badge').forEach(function(btn){
      btn.setAttribute('aria-expanded','false');
      btn.addEventListener('click', function(e){
        e.stopPropagation();
        var wrap=btn.closest('.info');
        var willOpen=!wrap.classList.contains('open');
        closeAllTooltips(willOpen?wrap:null);
        wrap.classList.toggle('open', willOpen);
        btn.setAttribute('aria-expanded', willOpen?'true':'false');
      });
    });
    document.addEventListener('click', function(){ closeAllTooltips(); });
    document.addEventListener('keydown', function(e){ if(e.key==='Escape') closeAllTooltips(); });
  }

  window.countTo=function(el,target,decimals){
    var start=parseFloat(el.dataset.raw||'0');
    var dur=400, t0=performance.now(), tgt=(+target)||0, done=false;
    el.dataset.raw=tgt;
    function finish(){ if(!done){ done=true; el.textContent=tgt.toFixed(decimals); } }
    function step(t){
      var p=Math.min(1,(t-t0)/dur);
      el.textContent=(start+(tgt-start)*(1-Math.pow(1-p,3))).toFixed(decimals);
      if(p<1){ requestAnimationFrame(step); } else { finish(); }
    }
    requestAnimationFrame(step);
    setTimeout(finish, dur+120);  /* rAF가 안 돌면(백그라운드 탭 등) 최종값 강제 표시 */
  };

  function injectThemeColor(){
    if(document.querySelector('meta[name="theme-color"]')) return;
    var m=document.createElement('meta');
    m.name='theme-color';
    m.content='#080B14'; /* matches --bg */
    document.head.appendChild(m);
  }

  function applyInputMode(){
    document.querySelectorAll('input[type=number]:not([inputmode])').forEach(function(el){
      var step=(el.getAttribute('step')||'').toLowerCase();
      var decimal = step==='any' || step.indexOf('.')!==-1;
      el.setAttribute('inputmode', decimal ? 'decimal' : 'numeric');
    });
  }


  var EYEBROW_MAP = {
    ko: {
      'AI · Generator':'AI · 생성기','AI · Instrument':'AI · 도구','AI · Markdown':'AI · 마크다운','AI · Reference':'AI · 참고',
      'Color · Instrument':'색상 · 도구','DATE & TIME':'날짜 · 시간','Data · Instrument':'데이터 · 도구',
      'Date & Time · Instrument':'날짜·시간 · 도구','Date · Instrument':'날짜 · 도구','Design · Instrument':'디자인 · 도구',
      'Dev · Instrument':'개발 · 도구','Developer · Instrument':'개발자 · 도구','Family · Instrument':'가족 · 도구',
      'Finance · Instrument':'금융 · 계산기','Fitness · Instrument':'피트니스 · 계산기','Focus · Instrument':'집중 · 도구',
      'Generator · Instrument':'생성 · 도구','Health · Instrument':'건강 · 계산기','Image · Instrument':'이미지 · 도구',
      'Marketing · Instrument':'마케팅 · 도구','Mutual Fund · India':'뮤추얼펀드 · 인도','PDF · Instrument':'PDF · 도구',
      'PDF · Utility':'PDF · 도구','Percent · Instrument':'퍼센트 · 계산기','Productivity · Instrument':'생산성 · 도구',
      'REACTION':'반응 속도','Real Estate · Instrument':'부동산 · 계산기','SECURITY':'보안','SEO · Instrument':'SEO · 도구',
      'Security · Instrument':'보안 · 도구','Tax · Instrument':'세금 · 계산기','Text · Instrument':'텍스트 · 도구',
      'Time · Instrument':'시간 · 도구','Travel · Instrument':'여행 · 도구','Utility · Instrument':'유틸리티 · 도구',
      'Work · Instrument':'근로 · 도구','부동산 · Instrument':'부동산 · 계산기'
    },
    zh: {
      'AI · Generator':'AI · 生成器','AI · Instrument':'AI · 工具','AI · Markdown':'AI · Markdown','AI · Reference':'AI · 参考',
      'Color · Instrument':'颜色 · 工具','DATE & TIME':'日期 · 时间','Data · Instrument':'数据 · 工具',
      'Date & Time · Instrument':'日期时间 · 工具','Date · Instrument':'日期 · 工具','Design · Instrument':'设计 · 工具',
      'Dev · Instrument':'开发 · 工具','Developer · Instrument':'开发者 · 工具','Family · Instrument':'家庭 · 工具',
      'Finance · Instrument':'金融 · 计算器','Fitness · Instrument':'健身 · 计算器','Focus · Instrument':'专注 · 工具',
      'Generator · Instrument':'生成 · 工具','Health · Instrument':'健康 · 计算器','Image · Instrument':'图像 · 工具',
      'Marketing · Instrument':'营销 · 工具','Mutual Fund · India':'共同基金 · 印度','PDF · Instrument':'PDF · 工具',
      'PDF · Utility':'PDF · 工具','Percent · Instrument':'百分比 · 计算器','Productivity · Instrument':'效率 · 工具',
      'REACTION':'反应速度','Real Estate · Instrument':'房产 · 计算器','SECURITY':'安全','SEO · Instrument':'SEO · 工具',
      'Security · Instrument':'安全 · 工具','Tax · Instrument':'税务 · 计算器','Text · Instrument':'文本 · 工具',
      'Time · Instrument':'时间 · 工具','Travel · Instrument':'旅行 · 工具','Utility · Instrument':'实用 · 工具',
      'Work · Instrument':'劳动 · 工具','부동산 · Instrument':'房产 · 计算器'
    },
    ja: {
      'AI · Generator':'AI · ジェネレーター','AI · Instrument':'AI · ツール','AI · Markdown':'AI · Markdown','AI · Reference':'AI · リファレンス',
      'Color · Instrument':'カラー · ツール','DATE & TIME':'日付 · 時刻','Data · Instrument':'データ · ツール',
      'Date & Time · Instrument':'日付時刻 · ツール','Date · Instrument':'日付 · ツール','Design · Instrument':'デザイン · ツール',
      'Dev · Instrument':'開発 · ツール','Developer · Instrument':'開発者 · ツール','Family · Instrument':'家族 · ツール',
      'Finance · Instrument':'金融 · 計算機','Fitness · Instrument':'フィットネス · 計算機','Focus · Instrument':'集中 · ツール',
      'Generator · Instrument':'生成 · ツール','Health · Instrument':'健康 · 計算機','Image · Instrument':'画像 · ツール',
      'Marketing · Instrument':'マーケティング · ツール','Mutual Fund · India':'投資信託 · インド','PDF · Instrument':'PDF · ツール',
      'PDF · Utility':'PDF · ツール','Percent · Instrument':'パーセント · 計算機','Productivity · Instrument':'生産性 · ツール',
      'REACTION':'反応速度','Real Estate · Instrument':'不動産 · 計算機','SECURITY':'セキュリティ','SEO · Instrument':'SEO · ツール',
      'Security · Instrument':'セキュリティ · ツール','Tax · Instrument':'税金 · 計算機','Text · Instrument':'テキスト · ツール',
      'Time · Instrument':'時間 · ツール','Travel · Instrument':'旅行 · ツール','Utility · Instrument':'ユーティリティ · ツール',
      'Work · Instrument':'労働 · ツール','부동산 · Instrument':'不動産 · 計算機'
    }
  };
  function localizeEyebrow(){
    var eb = document.querySelector('.eyebrow');
    if(!eb || eb.hasAttribute('data-i18n')) return;   /* 페이지 자체 i18n이 담당하면 건드리지 않음 */
    var orig = eb.getAttribute('data-eyebrow-src');
    if(orig === null){ orig = eb.textContent.trim(); eb.setAttribute('data-eyebrow-src', orig); }
    var lang = (document.documentElement.lang || 'ko').slice(0,2);
    if(lang === 'en'){ eb.textContent = orig; return; }
    var map = EYEBROW_MAP[lang];
    eb.textContent = (map && map[orig]) ? map[orig] : orig;
  }

  function injectSkipLink(){
    var main = document.querySelector('main');
    if(!main) return;
    if(!main.id) main.id = 'main';
    if(!main.hasAttribute('tabindex')) main.setAttribute('tabindex','-1'); /* skip-link target actually receives focus */
    if(document.querySelector('.skip-link')) return;
    var labels = {ko:'본문 바로가기', en:'Skip to content', zh:'跳至主要内容', ja:'メインコンテンツへスキップ'};
    var lang = (document.documentElement.lang || 'ko').slice(0,2);
    var a = document.createElement('a');
    a.className = 'skip-link';
    a.href = '#' + main.id;
    a.textContent = labels[lang] || labels.ko;
    document.body.insertBefore(a, document.body.firstChild);
  }

  /* ---- non-blocking notice: replacement for alert() on user actions ----
     alert() throws a modal that freezes the page (and blocks automation/AT). */
  window.toast = function(msg){
    var el = document.querySelector('.mh-toast');
    if(!el){ el = document.createElement('div'); el.className = 'mh-toast'; el.setAttribute('role','status'); document.body.appendChild(el); }
    el.textContent = String(msg);
    el.classList.add('show');
    clearTimeout(window.__toastT);
    window.__toastT = setTimeout(function(){ el.classList.remove('show'); }, 3400);
  };

  /* ---- swallow benign clipboard promise rejections (copy buttons lack .catch) ---- */
  window.addEventListener('unhandledrejection', function(e){
    var m = String((e.reason && (e.reason.message || e.reason)) || '');
    if(/clipboard|writeText|not focused|not allowed by the user agent|Document is not focused/i.test(m)){
      e.preventDefault();
    }
  });

  /* ---- result-summary live region ----
     One polite/atomic status node (visually hidden). We DO NOT put aria-live on
     .readout itself — that would re-read every sub-row on every keystroke. Instead
     a MutationObserver on the main result panel writes a short debounced summary
     (primary label + headline number) into the shared region. No focus is moved. */
  function initResultAnnouncer(){
    if(document.getElementById('a11yStatus')) return; /* page has its own bespoke announcer */
    var panels = document.querySelectorAll('.readout, .result-box');
    if(!panels.length) return;
    var region = null, last = '', t;
    function ensureRegion(){
      if(region) return region;
      region = document.getElementById('mh-a11y-result');
      if(!region){
        region = document.createElement('p');
        region.id = 'mh-a11y-result';
        region.className = 'vh';
        region.setAttribute('role','status');
        region.setAttribute('aria-live','polite');
        region.setAttribute('aria-atomic','true');
        document.body.appendChild(region);
      }
      return region;
    }
    function visible(el){
      if(el.offsetParent !== null) return true;
      return /\bshow\b|\bactive\b/.test(el.className);
    }
    function clean(s){ return (s||'').replace(/\s+/g,' ').trim(); }
    function labelText(el){
      if(!el) return '';
      var c = el.cloneNode(true);
      c.querySelectorAll('.info, .tooltip, .info-badge, script, style').forEach(function(n){ n.remove(); });
      var t = clean(c.textContent);
      if(/^(readout|result|계산\s*결과|—|-)?$/i.test(t)) return ''; /* placeholder / generic */
      return t;
    }
    function summarize(panel){
      var num = panel.querySelector('.bmi-num, .tax-num, .result-main-value, .result-main, .big-num, .result-value, .readout-value');
      /* prefer the label nearest the number, else the first meaningful one */
      var L = '';
      if(num){
        var p2 = num.parentElement;
        var near = p2 ? p2.querySelector('.result-main-label, .readout-label, .result-label') : null;
        if(!near){
          var box = num.closest('.bmi-display, .tax-display, .result-box, .result-main, .readout') || panel;
          near = box.previousElementSibling && box.previousElementSibling.querySelector
            ? box.previousElementSibling.querySelector('.readout-label, .result-label') : null;
        }
        L = labelText(near);
      }
      if(!L){
        var labels = panel.querySelectorAll('.readout-label, .result-label, .result-key');
        for(var i=0;i<labels.length;i++){ L = labelText(labels[i]); if(L) break; }
      }
      var N = num ? clean(num.textContent) : '';
      if(N === '-' || N === '--' || N === '—') N = '';
      if(L && N) return L + ': ' + N;
      return N || L;
    }
    try{
      var obs = new MutationObserver(function(recs){
        clearTimeout(t);
        var panel = recs[0] && recs[0].target ? closestPanel(recs[0].target) : null;
        t = setTimeout(function(){
          var ps = panel ? [panel] : panels;
          for(var i=0;i<ps.length;i++){
            if(!visible(ps[i])) continue;
            var s = summarize(ps[i]);
            if(s && s !== last){ last = s; ensureRegion().textContent = s; }
            return;
          }
        }, 650);
      });
      function closestPanel(node){
        for(var i=0;i<panels.length;i++){ if(panels[i].contains(node)) return panels[i]; }
        return null;
      }
      for(var i=0;i<panels.length;i++) obs.observe(panels[i], {childList:true, subtree:true, characterData:true});
    }catch(e){}
  }

  injectThemeColor(); /* before first paint where possible */

  document.addEventListener('DOMContentLoaded', function(){
    injectMesh();
    initTooltips();
    injectSkipLink();
    applyInputMode();
    localizeEyebrow();
    initResultAnnouncer();
    try{ new MutationObserver(localizeEyebrow).observe(document.documentElement,{attributes:true,attributeFilter:['lang']}); }catch(e){}
  });
})();
