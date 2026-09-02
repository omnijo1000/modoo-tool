/* MODOO HUB — cookie/ads consent (Google Consent Mode v2 companion)
   - The inline GA snippet sets gtag('consent','default', ...) with EEA/UK denied.
   - This script reads the stored choice and pushes gtag('consent','update', ...),
     and shows a one-time banner when no choice is stored.
   - Storage key: localStorage 'modoo_consent' = 'granted' | 'essential'
*/
(function () {
  var KEY = 'modoo_consent';
  function g() { window.dataLayer = window.dataLayer || []; window.gtag = window.gtag || function () { dataLayer.push(arguments); }; return window.gtag; }

  function apply(choice) {
    var gt = g();
    if (choice === 'granted') {
      gt('consent', 'update', {
        ad_storage: 'granted', ad_user_data: 'granted',
        ad_personalization: 'granted', analytics_storage: 'granted'
      });
    } else { /* 'essential' */
      gt('consent', 'update', {
        ad_storage: 'denied', ad_user_data: 'denied',
        ad_personalization: 'denied', analytics_storage: 'denied'
      });
    }
  }

  var stored = null;
  try { stored = localStorage.getItem(KEY); } catch (e) {}
  if (stored === 'granted' || stored === 'essential') { apply(stored); return; }

  /* ---- banner ---- */
  function lang() {
    try {
      var p = new URLSearchParams(location.search).get('lang');
      if (p && /^(ko|en|zh|ja)/.test(p)) return p.slice(0, 2);
      var ls = localStorage.getItem('modoo_lang');
      if (ls && /^(ko|en|zh|ja)/.test(ls)) return ls.slice(0, 2);
    } catch (e) {}
    return (document.documentElement.lang || 'ko').slice(0, 2);
  }
  var T = {
    ko: { msg: '이 사이트는 방문 통계(Google Analytics)와 광고(Google AdSense)에 쿠키를 사용합니다. 계산·변환 도구의 입력값은 브라우저에서만 처리되며 전송되지 않습니다.', ok: '모두 동의', no: '필수만 사용', more: '자세히' },
    en: { msg: 'This site uses cookies for analytics (Google Analytics) and ads (Google AdSense). Data you type into the tools is processed only in your browser and is never sent.', ok: 'Accept all', no: 'Essential only', more: 'Details' },
    zh: { msg: '本站使用 Cookie 进行访问统计（Google Analytics）和广告（Google AdSense）。您在工具中输入的内容仅在浏览器本地处理，不会被发送。', ok: '全部同意', no: '仅必要', more: '详情' },
    ja: { msg: 'このサイトはアクセス解析（Google Analytics）と広告（Google AdSense）に Cookie を使用します。ツールに入力した内容はブラウザ内でのみ処理され、送信されません。', ok: 'すべて同意', no: '必須のみ', more: '詳細' }
  };
  function build() {
    if (document.getElementById('mh-consent')) return;
    var t = T[lang()] || T.ko;
    var bar = document.createElement('div');
    bar.id = 'mh-consent';
    bar.setAttribute('role', 'dialog');
    bar.setAttribute('aria-label', t.more);
    bar.style.cssText = 'position:fixed;left:0;right:0;bottom:0;z-index:2147483000;background:#141414;border-top:1px solid #333;color:#e8e8e8;font:13px/1.6 system-ui,"Noto Sans KR",sans-serif;padding:14px 16px;display:flex;flex-wrap:wrap;gap:10px 14px;align-items:center;justify-content:center;box-shadow:0 -8px 24px rgba(0,0,0,.4)';
    var msg = document.createElement('span');
    msg.style.cssText = 'max-width:640px;flex:1 1 280px;color:#bdbdbd';
    msg.textContent = t.msg + ' ';
    var a = document.createElement('a');
    a.href = '/privacy.html'; a.textContent = t.more;
    a.style.cssText = 'color:#fbbf24;text-decoration:underline';
    msg.appendChild(a);
    var btnWrap = document.createElement('div');
    btnWrap.style.cssText = 'display:flex;gap:8px;flex:0 0 auto';
    var no = mkBtn(t.no, '#1c1c1c', '#bdbdbd', '#333');
    var ok = mkBtn(t.ok, '#fbbf24', '#000', '#fbbf24');
    no.onclick = function () { choose('essential'); };
    ok.onclick = function () { choose('granted'); };
    btnWrap.appendChild(no); btnWrap.appendChild(ok);
    bar.appendChild(msg); bar.appendChild(btnWrap);
    document.body.appendChild(bar);
  }
  function mkBtn(label, bg, fg, bd) {
    var b = document.createElement('button');
    b.type = 'button'; b.textContent = label;
    b.style.cssText = 'cursor:pointer;border:1px solid ' + bd + ';background:' + bg + ';color:' + fg + ';font:600 13px system-ui,"Noto Sans KR",sans-serif;padding:8px 16px;border-radius:8px;white-space:nowrap';
    return b;
  }
  function choose(choice) {
    try { localStorage.setItem(KEY, choice); } catch (e) {}
    apply(choice);
    var el = document.getElementById('mh-consent');
    if (el) el.remove();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build);
  else build();
})();
