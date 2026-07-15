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

  document.addEventListener('DOMContentLoaded', function(){
    injectMesh();
    initTooltips();
  });
})();
