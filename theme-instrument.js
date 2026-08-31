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
    var dur=400, t0=performance.now();
    el.dataset.raw=target;
    function step(t){
      var p=Math.min(1,(t-t0)/dur);
      var v=start+(target-start)*(1-Math.pow(1-p,3));
      el.textContent=v.toFixed(decimals);
      if(p<1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
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

  injectThemeColor(); /* before first paint where possible */

  document.addEventListener('DOMContentLoaded', function(){
    injectMesh();
    initTooltips();
    injectSkipLink();
    applyInputMode();
  });
})();
