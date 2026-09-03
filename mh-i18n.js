/* mh-i18n.js — 공유 언어 감지/전환 헬퍼 (옵트인)
 * 신규 다국어 페이지만 사용. 기존 285개 페이지는 각자 인라인 로직 유지.
 * classic script — 페이지 인라인 스크립트보다 먼저(<head>) 로드.
 * 사용법은 CLAUDE.md "## i18n 패턴 > MHI18n.init (신규 페이지 옵트인)" 참고.
 */
(function () {
  var ORDER = ['ko', 'en', 'zh', 'ja'];
  var KEY = 'modoo_lang';

  // 구 키('lang') 1회성 마이그레이션 — 기존 사용자 선택 보존
  try {
    var old = localStorage.getItem('lang');
    if (old && !localStorage.getItem(KEY)) localStorage.setItem(KEY, old);
  } catch (e) {}

  var API = {
    init: function (cfg) {
      var strings = cfg.strings;
      var lang = detect();

      function detect() {
        try {
          var u = new URLSearchParams(location.search).get('lang');
          if (u && strings[u]) return u;
          var s = localStorage.getItem(KEY);
          if (s && strings[s]) return s;
        } catch (e) {}
        var n = (navigator.language || '').slice(0, 2);
        return strings[n] ? n : 'en';
      }

      function apply(l) {
        var t = strings[l] || strings.ko;
        document.documentElement.lang = t.htmlLang || l;
        if (t.pageTitle) document.title = t.pageTitle;
        document.querySelectorAll('[data-i18n]').forEach(function (el) {
          var v = t[el.dataset.i18n];
          if (v !== undefined) el.innerHTML = v;
        });
        if (typeof cfg.apply === 'function') cfg.apply(t, l);
      }

      API.cycle = function () {
        lang = ORDER[(ORDER.indexOf(lang) + 1) % ORDER.length];
        try {
          localStorage.setItem(KEY, lang);
          var url = new URL(location.href);
          url.searchParams.set('lang', lang);
          history.replaceState(null, '', url);
        } catch (e) {}
        apply(lang);
      };
      API.get = function () { return lang; };

      // HTML onclick 무수정 별칭
      window.cycleLang = window.toggleLang = API.cycle;

      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () { apply(lang); });
      } else {
        apply(lang);
      }
    }
  };

  window.MHI18n = API;
})();
