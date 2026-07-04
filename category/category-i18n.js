(function () {
  'use strict';

  var LANGS = ['ko', 'en', 'zh', 'ja'];
  var VALID = { ko: 1, en: 1, zh: 1, ja: 1 };

  function detectLang() {
    var u = new URLSearchParams(location.search).get('lang');
    if (u && VALID[u]) return u;
    var s = localStorage.getItem('lang') || localStorage.getItem('modoo_lang');
    if (s && VALID[s]) return s;
    var n = (navigator.language || '').slice(0, 2);
    return n === 'zh' ? 'zh' : n === 'ja' ? 'ja' : n === 'ko' ? 'ko' : 'en';
  }

  function persistLang(lang) {
    localStorage.setItem('lang', lang);
    localStorage.setItem('modoo_lang', lang);
  }


  var UI = {
    backAll: { ko: '\u2190 \ubaa8\ub4e0 \ub3c4\uad6c', en: '\u2190 All Tools', zh: '\u2190 \u5168\u90e8\u5de5\u5177', ja: '\u2190 \u3059\u3079\u3066\u306e\u30c4\u30fc\u30eb' },
    breadcrumbHome: { ko: 'MODOO HUB', en: 'MODOO HUB', zh: 'MODOO HUB', ja: 'MODOO HUB' },
    toolsWord: { ko: '\uac1c', en: 'Tools', zh: '\u4e2a\u5de5\u5177', ja: '\u30c4\u30fc\u30eb' },
    sectionFaq: { ko: '\uc790\uc8fc \ubb3b\ub294 \uc9c8\ubb38', en: 'Frequently Asked Questions', zh: '\u5e38\u89c1\u95ee\u9898', ja: '\u3088\u304f\u3042\u308b\u8cea\u554f' },
    sectionRelated: { ko: '\uad00\ub828 \uce74\ud14c\uace0\ub9ac', en: 'Related Categories', zh: '\u76f8\u5173\u5206\u7c7b', ja: '\u95a2\u9023\u30ab\u30c6\u30b4\u30ea' },
    allToolsCard: { ko: '\uc804\uccb4 {n}\uac1c \ub3c4\uad6c', en: 'All {n} Tools', zh: '\u5168\u90e8 {n} \u4e2a\u5de5\u5177', ja: '\u5168 {n} \u30c4\u30fc\u30eb' },
    free: { ko: '\ubb34\ub8cc', en: 'Free', zh: '\u514d\u8d39', ja: '\u7121\u6599' },
    privacy: { ko: '\uac1c\uc778\uc815\ubcf4\ucc98\ub9ac\ubc29\uce68', en: 'Privacy Policy', zh: '\u9690\u79c1\u653f\u7b56', ja: '\u30d7\u30e9\u30a4\u30d0\u30b7\u30fc\u30dd\u30ea\u30b7\u30fc' },
    langBtn: { ko: '\ud83c\udf10 EN', en: '\ud83c\udf10 \u4e2d\u6587', zh: '\ud83c\udf10 \u65e5\u672c\u8a9e', ja: '\ud83c\udf10 \ud55c\uad6d\uc5b4' }
  };

  var MAIN_I18N = {
    subtitle: {
      ko: '{cat}\uc758 \uc8fc\uc694 \ub3c4\uad6c\ub97c \ud55c\uacf3\uc5d0\uc11c \ube60\ub974\uac8c \uc0b4\ud3b4\ubcf4\uc138\uc694.',
      zh: '\u5728\u8fd9\u91cc\u5feb\u901f\u6d4f\u89c8{cat}\u7684\u4e3b\u8981\u5de5\u5177\u3002',
      ja: '{cat}\u306e\u4e3b\u8981\u30c4\u30fc\u30eb\u3092\u307e\u3068\u3081\u3066\u78ba\u8a8d\u3067\u304d\u307e\u3059\u3002'
    },
    intro: {
      ko: [
        '\uc774 \uce74\ud14c\uace0\ub9ac\ub294 \uc790\uc8fc \uc0ac\uc6a9\ud558\ub294 \ud575\uc2ec \uae30\ub2a5\ub4e4\uc744 \ubaa8\uc544 \ub454 \ud5c8\ube0c \ud398\uc774\uc9c0\uc785\ub2c8\ub2e4.',
        '\uac01 \ub3c4\uad6c\ub294 \ube0c\ub77c\uc6b0\uc800\uc5d0\uc11c \ubc14\ub85c \uc2e4\ud589\ub418\uba70 \ubcc4\ub3c4 \uc124\uce58\ub098 \uac00\uc785 \uc5c6\uc774 \uc0ac\uc6a9\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4.',
        '\uc6d0\ud558\ub294 \ub3c4\uad6c\ub97c \uc120\ud0dd\ud574 \ubc14\ub85c \uc791\uc5c5\uc744 \uc2dc\uc791\ud574 \ubcf4\uc138\uc694.'
      ],
      zh: [
        '\u8be5\u5206\u7c7b\u9875\u9762\u6c47\u603b\u4e86\u6700\u5e38\u7528\u7684\u6838\u5fc3\u5de5\u5177\u3002',
        '\u6240\u6709\u5de5\u5177\u90fd\u53ef\u5728\u6d4f\u89c8\u5668\u5185\u76f4\u63a5\u8fd0\u884c\uff0c\u65e0\u9700\u5b89\u88c5\u6216\u6ce8\u518c\u3002',
        '\u9009\u62e9\u60a8\u9700\u8981\u7684\u5de5\u5177\uff0c\u5373\u53ef\u7acb\u5373\u5f00\u59cb\u4f7f\u7528\u3002'
      ],
      ja: [
        '\u3053\u306e\u30ab\u30c6\u30b4\u30ea\u306b\u306f\u3001\u3088\u304f\u4f7f\u308f\u308c\u308b\u4e3b\u8981\u30c4\u30fc\u30eb\u3092\u307e\u3068\u3081\u3066\u3044\u307e\u3059\u3002',
        '\u3059\u3079\u3066\u306e\u30c4\u30fc\u30eb\u306f\u30d6\u30e9\u30a6\u30b6\u3067\u3059\u3050\u306b\u5b9f\u884c\u3067\u304d\u3001\u30a4\u30f3\u30b9\u30c8\u30fc\u30eb\u3084\u767b\u9332\u306f\u4e0d\u8981\u3067\u3059\u3002',
        '\u4f7f\u3044\u305f\u3044\u30c4\u30fc\u30eb\u3092\u9078\u3093\u3067\u3001\u3059\u3050\u306b\u4f5c\u696d\u3092\u958b\u59cb\u3067\u304d\u307e\u3059\u3002'
      ]
    },
    toolDesc: {
      ko: '\ub3c4\uad6c \uc0c1\uc138 \ud398\uc774\uc9c0\ub85c \uc774\ub3d9',
      zh: '\u8fdb\u5165\u5de5\u5177\u8be6\u60c5\u9875',
      ja: '\u30c4\u30fc\u30eb\u8a73\u7d30\u30da\u30fc\u30b8\u3078\u79fb\u52d5'
    },
    faq: {
      ko: [
        ['\uc774 \uce74\ud14c\uace0\ub9ac\uc758 \ub3c4\uad6c\ub4e4\uc740 \ubb34\ub8cc\uc778\uac00\uc694?', '\ub124, \ud45c\uc2dc\ub41c \ub3c4\uad6c\ub4e4\uc740 \ubb34\ub8cc\ub85c \uc0ac\uc6a9\ud558\uc2e4 \uc218 \uc788\uc2b5\ub2c8\ub2e4.'],
        ['\ud68c\uc6d0\uac00\uc785\uc774 \ud544\uc694\ud55c\uac00\uc694?', '\ub300\ubd80\ubd84\uc758 \ub3c4\uad6c\ub294 \ud68c\uc6d0\uac00\uc785 \uc5c6\uc774 \ubc14\ub85c \uc2e4\ud589\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4.'],
        ['\ubaa8\ubc14\uc77c\uc5d0\uc11c\ub3c4 \uc0ac\uc6a9\uac00\ub2a5\ud55c\uac00\uc694?', '\ub124, \uc8fc\uc694 \uae30\ub2a5\uc740 \ubaa8\ubc14\uc77c\uacfc \ub370\uc2a4\ud06c\ud0d1 \ud658\uacbd\uc744 \ubaa8\ub450 \uc9c0\uc6d0\ud569\ub2c8\ub2e4.'],
        ['\uc785\ub825\ud55c \ub370\uc774\ud130\ub294 \uc800\uc7a5\ub418\ub098\uc694?', '\uac1c\ubcc4 \ub3c4\uad6c \uc815\ucc45\uc5d0 \ub530\ub77c \ucc98\ub9ac\ub418\uba70, \ud398\uc774\uc9c0 \uc548\uc758 \uc548\ub0b4\ub97c \ud655\uc778\ud574 \uc8fc\uc138\uc694.']
      ],
      zh: [
        ['\u8fd9\u4e2a\u5206\u7c7b\u7684\u5de5\u5177\u514d\u8d39\u5417\uff1f', '\u662f\u7684\uff0c\u8fd9\u91cc\u663e\u793a\u7684\u5de5\u5177\u53ef\u4ee5\u514d\u8d39\u4f7f\u7528\u3002'],
        ['\u9700\u8981\u6ce8\u518c\u8d26\u53f7\u5417\uff1f', '\u5927\u591a\u6570\u5de5\u5177\u65e0\u9700\u6ce8\u518c\uff0c\u53ef\u76f4\u63a5\u4f7f\u7528\u3002'],
        ['\u652f\u6301\u624b\u673a\u4f7f\u7528\u5417\uff1f', '\u662f\u7684\uff0c\u4e3b\u8981\u529f\u80fd\u540c\u65f6\u652f\u6301\u624b\u673a\u4e0e\u684c\u9762\u7aef\u3002'],
        ['\u8f93\u5165\u7684\u6570\u636e\u4f1a\u88ab\u4fdd\u5b58\u5417\uff1f', '\u5177\u4f53\u53d6\u51b3\u4e8e\u5404\u5de5\u5177\u7684\u5904\u7406\u65b9\u5f0f\uff0c\u8bf7\u53c2\u8003\u9875\u9762\u8bf4\u660e\u3002']
      ],
      ja: [
        ['\u3053\u306e\u30ab\u30c6\u30b4\u30ea\u306e\u30c4\u30fc\u30eb\u306f\u7121\u6599\u3067\u3059\u304b\uff1f', '\u306f\u3044\u3002\u3053\u3053\u306e\u30c4\u30fc\u30eb\u306f\u7121\u6599\u3067\u5229\u7528\u3067\u304d\u307e\u3059\u3002'],
        ['\u30a2\u30ab\u30a6\u30f3\u30c8\u767b\u9332\u306f\u5fc5\u8981\u3067\u3059\u304b\uff1f', '\u591a\u304f\u306e\u30c4\u30fc\u30eb\u306f\u767b\u9332\u4e0d\u8981\u3067\u3059\u3050\u306b\u4f7f\u3048\u307e\u3059\u3002'],
        ['\u30e2\u30d0\u30a4\u30eb\u3067\u3082\u4f7f\u3048\u307e\u3059\u304b\uff1f', '\u306f\u3044\u3002\u4e3b\u8981\u6a5f\u80fd\u306f\u30e2\u30d0\u30a4\u30eb\u3068\u30c7\u30b9\u30af\u30c8\u30c3\u30d7\u306e\u4e21\u65b9\u306b\u5bfe\u5fdc\u3057\u3066\u3044\u307e\u3059\u3002'],
        ['\u5165\u529b\u3057\u305f\u30c7\u30fc\u30bf\u306f\u4fdd\u5b58\u3055\u308c\u307e\u3059\u304b\uff1f', '\u51e6\u7406\u65b9\u5f0f\u306f\u30c4\u30fc\u30eb\u3054\u3068\u306b\u7570\u306a\u308a\u307e\u3059\u3002\u5404\u30da\u30fc\u30b8\u306e\u8aac\u660e\u3092\u3054\u78ba\u8a8d\u304f\u3060\u3055\u3044\u3002']
      ]
    }
  };

  var ORIGINAL_MAIN = {
    captured: false,
    intro: [],
    toolDesc: [],
    faq: []
  };

  function captureOriginalMain() {
    if (ORIGINAL_MAIN.captured) return;

    var intro = document.querySelector('.intro');
    if (intro) {
      intro.querySelectorAll('p').forEach(function (p) {
        ORIGINAL_MAIN.intro.push(p.textContent);
      });
    }

    document.querySelectorAll('.tools-grid .tool-card .tool-desc').forEach(function (el) {
      ORIGINAL_MAIN.toolDesc.push(el.textContent);
    });

    document.querySelectorAll('.faq-item').forEach(function (item) {
      var q = item.querySelector('.faq-q');
      var a = item.querySelector('.faq-a');
      var qText = '';
      if (q) {
        var qClone = q.cloneNode(true);
        var chev = qClone.querySelector('.faq-chevron');
        if (chev) chev.remove();
        qText = qClone.textContent.trim();
      }
      ORIGINAL_MAIN.faq.push({
        q: qText,
        a: a ? a.textContent : ''
      });
    });

    ORIGINAL_MAIN.captured = true;
  }

  var CAT = {
    'ai-tools': {
      count: 2,
      icon: '\ud83e\udd16',
      name: { ko: 'AI \ub3c4\uad6c', en: 'AI Tools', zh: 'AI\u5de5\u5177' },
      heading: { ko: '<span>AI</span> \ub3c4\uad6c', en: '<span>AI</span> Tools', zh: '<span>AI</span>\u5de5\u5177' },
      subtitle: {
        ko: 'AI \uc791\uc5c5\uc744 \ub354 \uc2a4\ub9c8\ud2b8\ud558\uac8c \ub9cc\ub4dc\ub294 \ubb34\ub8cc \ud1a0\ud070 \uce74\uc6b4\ud305\u00b7\ud504\ub86c\ud504\ud2b8 \uad6c\uc870\ud654 \ub3c4\uad6c',
        en: 'Free tools for working smarter with AI - token counting and prompt structuring',
        zh: '\u63d0\u4f9b\u514d\u8d39\u7684AI\u5de5\u5177\uff1a\u4ee4\u724c\u7edf\u8ba1\u4e0ePrompt\u7ed3\u6784\u5316'
      }
    },
    'data-tools': {
      count: 6,
      icon: '\ud83d\udcca',
      name: { ko: '\ub370\uc774\ud130 \ub3c4\uad6c', en: 'Data Tools', zh: '\u6570\u636e\u5de5\u5177' },
      heading: { ko: '<span>\ub370\uc774\ud130</span> \ub3c4\uad6c', en: '<span>Data</span> Tools', zh: '<span>\u6570\u636e</span>\u5de5\u5177' },
      subtitle: {
        ko: 'JSON\u00b7CSV\u00b7SQL\u00b7YAML \ub4f1 \ub370\uc774\ud130 \ud615\uc2dd\uc744 \ub2e4\ub8e8\ub294 \ubb34\ub8cc \ud3ec\ub9f7\ud130 \ub3c4\uad6c',
        en: 'Free format and conversion tools for JSON, CSV, SQL, and YAML workflows',
        zh: '\u63d0\u4f9bJSON\u3001CSV\u3001SQL\u3001YAML\u7b49\u683c\u5f0f\u7684\u514d\u8d39\u6570\u636e\u5904\u7406\u5de5\u5177'
      }
    },
    'date-time-tools': {
      count: 11,
      icon: '\ud83d\udcc5',
      name: { ko: '\ub0a0\uc9dc \u0026 \uc2dc\uac04 \ub3c4\uad6c', en: 'Date & Time Tools', zh: '\u65e5\u671f\u4e0e\u65f6\u95f4\u5de5\u5177' },
      heading: { ko: '<span>\ub0a0\uc9dc \u0026 \uc2dc\uac04</span> \ub3c4\uad6c', en: '<span>Date & Time</span> Tools', zh: '<span>\u65e5\u671f\u4e0e\u65f6\u95f4</span>\u5de5\u5177' },
      subtitle: {
        ko: '\ub098\uc774\u00b7\ub0a0\uc9dc\ucc28\u00b7\ud0c0\uc774\uba38\u00b7\uc5c5\ubb34\uc77c \uacc4\uc0b0\uc744 \uc704\ud55c \ubb34\ub8cc \uc2dc\uac04 \ub3c4\uad6c \ubaa8\uc74c',
        en: 'Free calculators and timers for age, dates, business days, and schedules',
        zh: '\u63d0\u4f9b\u5e74\u9f84\u3001\u65e5\u671f\u5dee\u3001\u8ba1\u65f6\u5668\u4e0e\u5de5\u4f5c\u65e5\u8ba1\u7b97\u7684\u514d\u8d39\u5de5\u5177'
      }
    },
    'developer-tools': {
      count: 4,
      icon: '\ud83d\udcbb',
      name: { ko: '\uac1c\ubc1c\uc790 \ub3c4\uad6c', en: 'Developer Tools', zh: '\u5f00\u53d1\u5de5\u5177' },
      heading: { ko: '<span>\uac1c\ubc1c\uc790</span> \ub3c4\uad6c', en: '<span>Developer</span> Tools', zh: '<span>\u5f00\u53d1</span>\u5de5\u5177' },
      subtitle: {
        ko: '\uac1c\ubc1c \uc0dd\uc0b0\uc131\uc744 \ub192\uc774\ub294 \ubb34\ub8cc \uc720\ud2f8\ub9ac\ud2f0 \ub3c4\uad6c',
        en: 'Practical browser tools for daily developer workflows',
        zh: '\u63d0\u9ad8\u5f00\u53d1\u6548\u7387\u7684\u5b9e\u7528\u6d4f\u89c8\u5668\u5de5\u5177'
      }
    },
    'finance-calculators': {
      count: 15,
      icon: '\ud83d\udcb0',
      name: { ko: '\uae08\uc735 \uacc4\uc0b0\uae30', en: 'Finance Calculators', zh: '\u91d1\u878d\u8ba1\u7b97\u5668' },
      heading: { ko: '<span>\uae08\uc735</span> \uacc4\uc0b0\uae30', en: '<span>Finance</span> Calculators', zh: '<span>\u91d1\u878d</span>\u8ba1\u7b97\u5668' },
      subtitle: {
        ko: '\ud22c\uc790\u00b7\ub300\ucd9c\u00b7\uc138\uae08\u00b7\ud658\uc728 \uacc4\uc0b0\uc744 \ud55c \uacf3\uc5d0\uc11c \uc81c\uacf5\ud558\ub294 \ubb34\ub8cc \uae08\uc735 \ub3c4\uad6c',
        en: 'Free online calculators for investment growth, loans, taxes, and currency conversion',
        zh: '\u63d0\u4f9b\u6295\u8d44\u589e\u957f\u3001\u8d37\u6b3e\u3001\u7a0e\u8d39\u4e0e\u6c47\u7387\u8f6c\u6362\u7684\u514d\u8d39\u91d1\u878d\u5de5\u5177'
      }
    },
    'generator-tools': {
      count: 6,
      icon: '\u26a1',
      name: { ko: '\uc0dd\uc131\uae30 \ub3c4\uad6c', en: 'Generator Tools', zh: '\u751f\u6210\u5668\u5de5\u5177' },
      heading: { ko: '<span>\uc0dd\uc131\uae30</span> \ub3c4\uad6c', en: '<span>Generator</span> Tools', zh: '<span>\u751f\u6210\u5668</span>\u5de5\u5177' },
      subtitle: {
        ko: 'UUID\u00b7QR\u00b7\ub79c\ub364 \ubb38\uc790\uc5f4\u00b7\ube44\ubc00\ubc88\ud638 \uc0dd\uc131\uc744 \uc704\ud55c \ubb34\ub8cc \ub3c4\uad6c',
        en: 'Free generators for IDs, codes, text, and secure random values',
        zh: '\u63d0\u4f9bID\u3001\u4e8c\u7ef4\u7801\u3001\u968f\u673a\u5b57\u7b26\u4e32\u7b49\u751f\u6210\u5de5\u5177'
      }
    },
    'health-calculators': {
      count: 8,
      icon: '\ud83e\ude7a',
      name: { ko: '\uac74\uac15 \uacc4\uc0b0\uae30', en: 'Health Calculators', zh: '\u5065\u5eb7\u8ba1\u7b97\u5668' },
      heading: { ko: '<span>\uac74\uac15</span> \uacc4\uc0b0\uae30', en: '<span>Health</span> Calculators', zh: '<span>\u5065\u5eb7</span>\u8ba1\u7b97\u5668' },
      subtitle: {
        ko: 'BMI\u00b7\uce7c\ub85c\ub9ac\u00b7\uccb4\uc9c0\ubc29\u00b7\uc6b4\ub3d9 \ud398\uc774\uc2a4 \ub4f1 \uac74\uac15 \uc9c0\ud45c\ub97c \uacc4\uc0b0\ud558\ub294 \ubb34\ub8cc \ub3c4\uad6c',
        en: 'Free health tools for BMI, calories, body composition, and training pace',
        zh: '\u63d0\u4f9bBMI\u3001\u70ed\u91cf\u3001\u4f53\u8102\u4e0e\u8fd0\u52a8\u914d\u901f\u8ba1\u7b97\u7684\u5065\u5eb7\u5de5\u5177'
      }
    },
    'image-tools': {
      count: 7,
      icon: '\ud83d\uddbc\ufe0f',
      name: { ko: '\uc774\ubbf8\uc9c0 \ub3c4\uad6c', en: 'Image Tools', zh: '\u56fe\u50cf\u5de5\u5177' },
      heading: { ko: '<span>\uc774\ubbf8\uc9c0</span> \ub3c4\uad6c', en: '<span>Image</span> Tools', zh: '<span>\u56fe\u50cf</span>\u5de5\u5177' },
      subtitle: {
        ko: '\uc555\ucd95\u00b7\ub9ac\uc0ac\uc774\uc988\u00b7\ubcc0\ud658\u00b7\uc0c9\uc0c1 \uc791\uc5c5\uc744 \ube60\ub974\uac8c \ucc98\ub9ac\ud558\ub294 \ube0c\ub77c\uc6b0\uc800 \uae30\ubc18 \ub3c4\uad6c',
        en: 'Browser-based tools for image compression, resize, conversion, and color work',
        zh: '\u63d0\u4f9b\u56fe\u50cf\u538b\u7f29\u3001\u8c03\u6574\u5927\u5c0f\u3001\u8f6c\u6362\u4e0e\u989c\u8272\u5904\u7406\u5de5\u5177'
      }
    },
    'pdf-tools': {
      count: 4,
      icon: '\ud83d\udcc4',
      name: { ko: 'PDF \ub3c4\uad6c', en: 'PDF Tools', zh: 'PDF\u5de5\u5177' },
      heading: { ko: '<span>PDF</span> \ub3c4\uad6c', en: '<span>PDF</span> Tools', zh: '<span>PDF</span>\u5de5\u5177' },
      subtitle: {
        ko: 'PDF \ud569\uce58\uae30\u00b7\ubd84\ub9ac\u00b7\uc774\ubbf8\uc9c0 \ubcc0\ud658\uc744 \uc704\ud55c \ubb34\ub8cc \ub3c4\uad6c',
        en: 'Free browser tools to merge, split, and convert PDF files',
        zh: '\u63d0\u4f9bPDF\u5408\u5e76\u3001\u62c6\u5206\u4e0e\u56fe\u50cf\u8f6c\u6362\u5de5\u5177'
      }
    },
    'security-tools': {
      count: 9,
      icon: '\ud83d\udd10',
      name: { ko: '\ubcf4\uc548 \u0026 \uc778\ucf54\ub529 \ub3c4\uad6c', en: 'Security Tools', zh: '\u5b89\u5168\u4e0e\u7f16\u7801\u5de5\u5177' },
      heading: { ko: '<span>\ubcf4\uc548</span> \ub3c4\uad6c', en: '<span>Security</span> Tools', zh: '<span>\u5b89\u5168</span>\u5de5\u5177' },
      subtitle: {
        ko: '\uc778\ucf54\ub529\u00b7\ud574\uc2dc\u00b7JWT\u00b7\ube44\ubc00\ubc88\ud638 \uc0dd\uc131 \uc791\uc5c5\uc744 \uc704\ud55c \ubb34\ub8cc \ub3c4\uad6c',
        en: 'Free tools for encoding, hashing, token handling, and password generation',
        zh: '\u63d0\u4f9b\u7f16\u7801\u3001\u54c8\u5e0c\u3001JWT\u4e0e\u5bc6\u7801\u751f\u6210\u5de5\u5177'
      }
    },
    'text-tools': {
      count: 16,
      icon: '\u270d\ufe0f',
      name: { ko: '\ud14d\uc2a4\ud2b8 \ub3c4\uad6c', en: 'Text Tools', zh: '\u6587\u672c\u5de5\u5177' },
      heading: { ko: '<span>\ud14d\uc2a4\ud2b8</span> \ub3c4\uad6c', en: '<span>Text</span> Tools', zh: '<span>\u6587\u672c</span>\u5de5\u5177' },
      subtitle: {
        ko: '\ubb38\uc790\uc218\u00b7\uc815\ub82c\u00b7\ubcc0\ud658\u00b7\ubd84\uc11d\u00b7\ud074\ub9ac\ub2dd\uc744 \uc704\ud55c \ubb34\ub8cc \ud14d\uc2a4\ud2b8 \uc791\uc5c5 \ub3c4\uad6c',
        en: 'Free online tools for counting, cleaning, converting, sorting, and analyzing text',
        zh: '\u63d0\u4f9b\u5b57\u6570\u7edf\u8ba1\u3001\u6e05\u7406\u3001\u8f6c\u6362\u3001\u6392\u5e8f\u4e0e\u5206\u6790\u7684\u6587\u672c\u5de5\u5177'
      }
    }
  };

  var CAT_NAMES = {
    'finance-calculators': { ko: '\uae08\uc735 \uacc4\uc0b0\uae30', en: 'Finance Calculators', zh: '\u91d1\u878d\u8ba1\u7b97\u5668' },
    'health-calculators': { ko: '\uac74\uac15 \uacc4\uc0b0\uae30', en: 'Health Calculators', zh: '\u5065\u5eb7\u8ba1\u7b97\u5668' },
    'date-time-tools': { ko: '\ub0a0\uc9dc \u0026 \uc2dc\uac04 \ub3c4\uad6c', en: 'Date & Time Tools', zh: '\u65e5\u671f\u4e0e\u65f6\u95f4\u5de5\u5177' },
    'data-tools': { ko: '\ub370\uc774\ud130 \ub3c4\uad6c', en: 'Data Tools', zh: '\u6570\u636e\u5de5\u5177' },
    'security-tools': { ko: '\ubcf4\uc548 \ub3c4\uad6c', en: 'Security Tools', zh: '\u5b89\u5168\u5de5\u5177' },
    'text-tools': { ko: '\ud14d\uc2a4\ud2b8 \ub3c4\uad6c', en: 'Text Tools', zh: '\u6587\u672c\u5de5\u5177' },
    'ai-tools': { ko: 'AI \ub3c4\uad6c', en: 'AI Tools', zh: 'AI\u5de5\u5177' },
    'developer-tools': { ko: '\uac1c\ubc1c\uc790 \ub3c4\uad6c', en: 'Developer Tools', zh: '\u5f00\u53d1\u5de5\u5177' },
    'image-tools': { ko: '\uc774\ubbf8\uc9c0 \ub3c4\uad6c', en: 'Image Tools', zh: '\u56fe\u50cf\u5de5\u5177' },
    'pdf-tools': { ko: 'PDF \ub3c4\uad6c', en: 'PDF Tools', zh: 'PDF\u5de5\u5177' },
    'generator-tools': { ko: '\uc0dd\uc131\uae30 \ub3c4\uad6c', en: 'Generator Tools', zh: '\u751f\u6210\u5668\u5de5\u5177' }
  };

  var TOOL_NAMES = {
    'compound-interest.html': { ko: '\ubcf5\ub9ac \uacc4\uc0b0\uae30', en: 'Compound Interest Calculator', zh: '\u590d\u5229\u8ba1\u7b97\u5668' },
    'savings-calc.html': { ko: '\uc801\uae08 \uacc4\uc0b0\uae30', en: 'Savings Calculator', zh: '\u50a8\u84c4\u8ba1\u7b97\u5668' },
    'inflation-calculator.html': { ko: '\ubb3c\uac00\uc0c1\uc2b9\ub960 \uacc4\uc0b0\uae30', en: 'Inflation Calculator', zh: '\u901a\u80c0\u8ba1\u7b97\u5668' },
    'currency-converter.html': { ko: '\ud658\uc728 \ubcc0\ud658\uae30', en: 'Currency Converter', zh: '\u6c47\u7387\u6362\u7b97' },
    'sip-calculator.html': { ko: 'SIP \uacc4\uc0b0\uae30', en: 'SIP Calculator', zh: 'SIP\u8ba1\u7b97\u5668' },
    'emi-calculator.html': { ko: 'EMI \uacc4\uc0b0\uae30', en: 'EMI Calculator', zh: 'EMI\u8ba1\u7b97\u5668' },
    'loan-calculator-en.html': { ko: '\ub300\ucd9c \uacc4\uc0b0\uae30', en: 'Loan Calculator', zh: '\u8d37\u6b3e\u8ba1\u7b97\u5668' },
    'gst-calculator.html': { ko: 'GST \uacc4\uc0b0\uae30', en: 'GST Calculator', zh: 'GST\u8ba1\u7b97\u5668' },
    'vat-calculator-global.html': { ko: '\uae00\ub85c\ubc8c VAT \uacc4\uc0b0\uae30', en: 'Global VAT Calculator', zh: '\u5168\u7403VAT\u8ba1\u7b97\u5668' },
    'mortgage-calculator.html': { ko: '\ubaa8\uae30\uc9c0 \uacc4\uc0b0\uae30', en: 'Mortgage Calculator', zh: '\u623f\u8d37\u8ba1\u7b97\u5668' },
    'roi-calculator.html': { ko: 'ROI \uacc4\uc0b0\uae30', en: 'ROI Calculator', zh: 'ROI\u8ba1\u7b97\u5668' },
    'apr-calculator.html': { ko: 'APR \uacc4\uc0b0\uae30', en: 'APR Calculator', zh: 'APR\u8ba1\u7b97\u5668' },
    'loan-payoff-calculator.html': { ko: '\ub300\ucd9c \uc0c1\ud658 \uacc4\uc0b0\uae30', en: 'Loan Payoff Calculator', zh: '\u8d37\u6b3e\u8fd8\u6e05\u8ba1\u7b97\u5668' },
    'investment-return-calculator.html': { ko: '\ud22c\uc790 \uc218\uc775\ub960 \uacc4\uc0b0\uae30', en: 'Investment Return Calculator', zh: '\u6295\u8d44\u6536\u76ca\u8ba1\u7b97\u5668' },
    'fire-calculator.html': { ko: 'FIRE \uacc4\uc0b0\uae30', en: 'FIRE Calculator', zh: 'FIRE\u8ba1\u7b97\u5668' },
    'bmi-calculator.html': { ko: 'BMI \uacc4\uc0b0\uae30 (Pro)', en: 'BMI Calculator (Pro)', zh: 'BMI\u8ba1\u7b97\u5668(Pro)' },
    'bmi-calc.html': { ko: 'BMI \uacc4\uc0b0\uae30', en: 'BMI Calculator', zh: 'BMI\u8ba1\u7b97\u5668' },
    'body-fat-calculator.html': { ko: '\uccb4\uc9c0\ubc29\ub960 \uacc4\uc0b0\uae30', en: 'Body Fat Calculator', zh: '\u4f53\u8102\u7387\u8ba1\u7b97\u5668' },
    'calorie-calculator.html': { ko: '\uce7c\ub85c\ub9ac \uacc4\uc0b0\uae30', en: 'Calorie Calculator', zh: '\u5361\u8def\u91cc\u8ba1\u7b97\u5668' },
    'macro-calculator.html': { ko: '\ub9e4\ud06c\ub85c \uacc4\uc0b0\uae30', en: 'Macro Calculator', zh: '\u5b8f\u91cf\u8425\u517b\u7d20\u8ba1\u7b97\u5668' },
    'water-intake.html': { ko: '\ubb3c \uc12d\ucde8\ub7c9 \uacc4\uc0b0\uae30', en: 'Water Intake Calculator', zh: '\u996e\u6c34\u91cf\u8ba1\u7b97\u5668' },
    'pace-calculator.html': { ko: '\ud398\uc774\uc2a4 \uacc4\uc0b0\uae30', en: 'Pace Calculator', zh: '\u914d\u901f\u8ba1\u7b97\u5668' },
    'pregnancy-due-date.html': { ko: '\uc784\uc2e0 \ucd9c\uc0b0\uc608\uc815\uc77c \uacc4\uc0b0\uae30', en: 'Pregnancy Due Date', zh: '\u5b55\u671f\u9884\u4ea7\u671f\u8ba1\u7b97\u5668' },
    'age-calculator.html': { ko: '\ub098\uc774 \uacc4\uc0b0\uae30', en: 'Age Calculator', zh: '\u5e74\u9f84\u8ba1\u7b97\u5668' },
    'date-calc.html': { ko: '\ub0a0\uc9dc \uacc4\uc0b0\uae30', en: 'Date Calculator', zh: '\u65e5\u671f\u8ba1\u7b97\u5668' },
    'time-calculator.html': { ko: '\uc2dc\uac04 \uacc4\uc0b0\uae30', en: 'Time Calculator', zh: '\u65f6\u95f4\u8ba1\u7b97\u5668' },
    'business-days-calculator.html': { ko: '\uc601\uc5c5\uc77c \uacc4\uc0b0\uae30', en: 'Business Days Calculator', zh: '\u5de5\u4f5c\u65e5\u8ba1\u7b97\u5668' },
    'countdown-timer.html': { ko: '\uce74\uc6b4\ud2b8\ub2e4\uc6b4 \ud0c0\uc774\uba38', en: 'Countdown Timer', zh: '\u5012\u8ba1\u65f6\u5668' },
    'pomodoro-timer.html': { ko: '\ud3ec\ubaa8\ub3c4\ub85c \ud0c0\uc774\uba38', en: 'Pomodoro Timer', zh: '\u756a\u8304\u5de5\u4f5c\u6cd5\u8ba1\u65f6\u5668' },
    'timestamp.html': { ko: 'Timestamp \ubcc0\ud658\uae30', en: 'Timestamp Converter', zh: '\u65f6\u95f4\u6233\u8f6c\u6362\u5668' },
    'timezone-converter.html': { ko: '\uc2dc\uac04\ub300 \ubcc0\ud658\uae30', en: 'Time Zone Converter', zh: '\u65f6\u533a\u8f6c\u6362\u5668' },
    'dday.html': { ko: 'D-Day \uacc4\uc0b0\uae30', en: 'D-Day Calculator', zh: 'D-Day\u8ba1\u7b97\u5668' },
    'korean-age.html': { ko: '\ud55c\uad6d \ub098\uc774 \uacc4\uc0b0\uae30', en: 'Korean Age Calculator', zh: '\u97e9\u56fd\u5e74\u9f84\u8ba1\u7b97' },
    'working-days-calc.html': { ko: '\uadfc\ubb34\uc77c \uacc4\uc0b0\uae30', en: 'Working Days Calculator', zh: '\u5de5\u4f5c\u65e5\u8ba1\u7b97\u5668' },
    'json-formatter.html': { ko: 'JSON \ud3ec\ub9f7\ud130', en: 'JSON Formatter', zh: 'JSON\u683c\u5f0f\u5316' },
    'xml-formatter.html': { ko: 'XML \ud3ec\ub9f7\ud130', en: 'XML Formatter', zh: 'XML\u683c\u5f0f\u5316' },
    'yaml-formatter.html': { ko: 'YAML \ud3ec\ub9f7\ud130', en: 'YAML Formatter', zh: 'YAML\u683c\u5f0f\u5316' },
    'sql-formatter.html': { ko: 'SQL \ud3ec\ub9f7\ud130', en: 'SQL Formatter', zh: 'SQL\u683c\u5f0f\u5316' },
    'json-to-csv.html': { ko: 'JSON \u2192 CSV', en: 'JSON -> CSV', zh: 'JSON -> CSV' },
    'csv-to-json.html': { ko: 'CSV \u2192 JSON', en: 'CSV -> JSON', zh: 'CSV -> JSON' },
    'base64-url.html': { ko: 'Base64 \u0026 URL \uc778\ucf54\ub354', en: 'Base64 & URL Encoder', zh: 'Base64\u0026URL\u7f16\u7801' },
    'html-encoder.html': { ko: 'HTML \uc778\ucf54\ub354/\ub514\ucf54\ub354', en: 'HTML Encoder/Decoder', zh: 'HTML\u7f16\u7801/\u89e3\u7801' },
    'hash-generator.html': { ko: 'Hash \uc0dd\uc131\uae30', en: 'Hash Generator', zh: 'Hash\u751f\u6210\u5668' },
    'jwt-decoder.html': { ko: 'JWT \ub514\ucf54\ub354', en: 'JWT Decoder', zh: 'JWT\u89e3\u6790\u5668' },
    'jwt-generator.html': { ko: 'JWT \uc0dd\uc131\uae30', en: 'JWT Generator', zh: 'JWT\u751f\u6210\u5668' },
    'password-generator.html': { ko: '\ube44\ubc00\ubc88\ud638 \uc0dd\uc131\uae30', en: 'Password Generator', zh: '\u5bc6\u7801\u751f\u6210\u5668' },
    'random-string.html': { ko: '\ub79c\ub364 \ubb38\uc790\uc5f4 \uc0dd\uc131\uae30', en: 'Random String Generator', zh: '\u968f\u673a\u5b57\u7b26\u4e32\u751f\u6210\u5668' },
    'word-counter.html': { ko: '\ub2e8\uc5b4 \uc218 \uc138\uae30', en: 'Word Counter', zh: '\u5355\u8bcd\u8ba1\u6570\u5668' },
    'character-counter.html': { ko: '\uae00\uc790 \uc218 \uc138\uae30', en: 'Character Counter', zh: '\u5b57\u7b26\u8ba1\u6570\u5668' },
    'line-counter.html': { ko: '\uc904 \uc218 \uc138\uae30', en: 'Line Counter', zh: '\u884c\u6570\u7edf\u8ba1' },
    'sentence-counter.html': { ko: '\ubb38\uc7a5 \uc218 \uc138\uae30', en: 'Sentence Counter', zh: '\u53e5\u5b50\u8ba1\u6570\u5668' },
    'read-time-calculator.html': { ko: '\uc77d\uae30 \uc2dc\uac04 \uacc4\uc0b0\uae30', en: 'Read Time Calculator', zh: '\u9605\u8bfb\u65f6\u95f4\u8ba1\u7b97\u5668' },
    'keyword-density.html': { ko: '\ud0a4\uc6cc\ub4dc \ubc00\ub3c4 \ubd84\uc11d\uae30', en: 'Keyword Density Analyzer', zh: '\u5173\u952e\u8bcd\u5bc6\u5ea6\u5206\u6790\u5668' },
    'find-replace.html': { ko: '\ucc3e\uae30 \u0026 \ubc14\uafb8\uae30', en: 'Find & Replace', zh: '\u67e5\u627e\u66ff\u6362' },
    'text-reverser.html': { ko: '\ud14d\uc2a4\ud2b8 \ub4a4\uc9d1\uae30', en: 'Text Reverser', zh: '\u6587\u5b57\u53cd\u8f6c' },
    'text-shuffler.html': { ko: '\ud14d\uc2a4\ud2b8 \uc154\ud50c', en: 'Text Shuffler', zh: '\u6587\u672c\u968f\u673a\u6392\u5217' },
    'text-sorter.html': { ko: '\ud14d\uc2a4\ud2b8 \uc904 \uc815\ub82c\uae30', en: 'Text Line Sorter', zh: '\u6587\u672c\u884c\u6392\u5e8f\u5668' },
    'alphabetizer.html': { ko: '\uc54c\ud30c\ubcb3 \uc21c \uc815\ub82c', en: 'Alphabetizer', zh: '\u5b57\u6bcd\u6392\u5e8f' },
    'text-cleaner.html': { ko: '\ud14d\uc2a4\ud2b8 \ud074\ub9ac\ub108', en: 'Text Cleaner', zh: '\u6587\u672c\u6e05\u7406\u5668' },
    'remove-empty-lines.html': { ko: '\ube48 \uc904 \uc81c\uac70', en: 'Remove Empty Lines', zh: '\u5220\u9664\u7a7a\u884c' },
    'remove-duplicate-lines.html': { ko: '\uc911\ubcf5 \uc904 \uc81c\uac70', en: 'Remove Duplicate Lines', zh: '\u5220\u9664\u91cd\u590d\u884c' },
    'text-diff-checker.html': { ko: '\ud14d\uc2a4\ud2b8 \ube44\uad50\uae30', en: 'Text Diff Checker', zh: '\u6587\u672c\u5dee\u5f02\u6bd4\u5bf9' },
    'ai-token-counter.html': { ko: 'AI \ud1a0\ud070 \uce74\uc6b4\ud130', en: 'AI Token Counter', zh: 'AI Token\u8ba1\u6570\u5668' },
    'prompt-formatter.html': { ko: '\ud504\ub86c\ud504\ud2b8 \ud3ec\ub9f7\ud130', en: 'Prompt Formatter', zh: '\u63d0\u793a\u8bcd\u683c\u5f0f\u5316' },
    'cron-generator.html': { ko: 'Cron \uc0dd\uc131\uae30', en: 'Cron Generator', zh: 'Cron\u8868\u8fbe\u5f0f\u751f\u6210\u5668' },
    'regex-tester.html': { ko: '\uc815\uaddc\uc2dd \ud14c\uc2a4\ud130', en: 'Regex Tester', zh: '\u6b63\u5219\u8868\u8fbe\u5f0f\u6d4b\u8bd5\u5668' },
    'markdown-preview.html': { ko: '\ub9c8\ud06c\ub2e4\uc6b4 \ubbf8\ub9ac\ubcf4\uae30', en: 'Markdown Preview', zh: 'Markdown\u9884\u89c8' },
    'lorem-ipsum-generator.html': { ko: 'Lorem Ipsum \uc0dd\uc131\uae30', en: 'Lorem Ipsum Generator', zh: 'Lorem Ipsum\u751f\u6210\u5668' },
    'image-compressor.html': { ko: '\uc774\ubbf8\uc9c0 \uc555\ucd95\uae30', en: 'Image Compressor', zh: '\u56fe\u7247\u538b\u7f29' },
    'image-resizer.html': { ko: '\uc774\ubbf8\uc9c0 \ub9ac\uc0ac\uc774\uc800', en: 'Image Resizer', zh: '\u56fe\u7247\u8c03\u6574\u5927\u5c0f' },
    'image-to-webp.html': { ko: '\uc774\ubbf8\uc9c0 \u2192 WebP', en: 'Image -> WebP', zh: '\u56fe\u7247 -> WebP' },
    'base64-image.html': { ko: 'Base64 \uc774\ubbf8\uc9c0 \ubcc0\ud658', en: 'Base64 Image Converter', zh: 'Base64\u56fe\u7247\u8f6c\u6362' },
    'color-picker.html': { ko: '\uceec\ub7ec \ud53c\ucee4', en: 'Color Picker', zh: '\u989c\u8272\u9009\u62e9\u5668' },
    'color-palette.html': { ko: '\uceec\ub7ec \ud314\ub808\ud2b8', en: 'Color Palette', zh: '\u8c03\u8272\u677f' },
    'color-converter.html': { ko: '\uc0c9\uc0c1 \ubcc0\ud658\uae30', en: 'Color Converter', zh: '\u989c\u8272\u8f6c\u6362\u5668' },
    'pdf-merge.html': { ko: 'PDF \ud569\uce58\uae30', en: 'PDF Merge', zh: 'PDF\u5408\u5e76' },
    'pdf-split.html': { ko: 'PDF \ubd84\ub9ac', en: 'PDF Split', zh: 'PDF\u62c6\u5206' },
    'pdf-to-image.html': { ko: 'PDF -> \uc774\ubbf8\uc9c0', en: 'PDF -> Image', zh: 'PDF -> \u56fe\u7247' },
    'image-to-pdf.html': { ko: '\uc774\ubbf8\uc9c0 -> PDF', en: 'Image -> PDF', zh: '\u56fe\u7247 -> PDF' },
    'uuid-generator.html': { ko: 'UUID \uc0dd\uc131\uae30', en: 'UUID Generator', zh: 'UUID\u751f\u6210\u5668' },
    'qr-generator.html': { ko: 'QR \ucf54\ub4dc \uc0dd\uc131\uae30', en: 'QR Code Generator', zh: 'QR\u7801\u751f\u6210\u5668' },
    'barcode-generator.html': { ko: '\ubc14\ucf54\ub4dc \uc0dd\uc131\uae30', en: 'Barcode Generator', zh: '\u6761\u7801\u751f\u6210\u5668' }
  };

  function getSlug() {
    return (location.pathname.split('/').pop() || '').replace(/\.html$/, '');
  }

  function getLabel(map, lang) {
    if (!map) return '';
    return map[lang] || map.en || '';
  }

  function cycleLang(current) {
    var idx = LANGS.indexOf(current);
    return LANGS[(idx + 1) % LANGS.length];
  }

  function applyCategoryI18n(lang) {
    var slug = getSlug();
    var cat = CAT[slug];
    if (!cat) return;

    captureOriginalMain();

    document.documentElement.lang = lang;

    var back = document.querySelector('.back-link');
    if (back) back.textContent = UI.backAll[lang];

    var breadcrumbHome = document.querySelector('.breadcrumb a');
    if (breadcrumbHome) breadcrumbHome.textContent = UI.breadcrumbHome[lang];

    var breadcrumbCurrent = document.querySelector('.breadcrumb span:last-child');
    if (breadcrumbCurrent) breadcrumbCurrent.textContent = getLabel(cat.name, lang);

    var badge = document.querySelector('.hub-badge');
    if (badge) {
      badge.textContent = cat.icon + ' ' + getLabel(cat.name, lang).replace(' Calculators', '').replace(' Tools', '') + ' · ' + cat.count + ' ' + UI.toolsWord[lang];
    }

    var h1 = document.querySelector('h1');
    if (h1) {
      if (cat.heading && cat.heading[lang]) h1.innerHTML = cat.heading[lang];
      else h1.textContent = getLabel(cat.name, lang);
    }

    var subtitle = document.querySelector('.hub-subtitle');
    if (subtitle) {
      var sub = (cat.subtitle && cat.subtitle[lang]) ? cat.subtitle[lang] : null;
      if (!sub && lang !== 'en') sub = MAIN_I18N.subtitle[lang].replace('{cat}', getLabel(cat.name, lang));
      subtitle.textContent = sub || getLabel(cat.subtitle, lang);
    }

    var sections = document.querySelectorAll('.section-heading');
    if (sections[0]) sections[0].textContent = (lang === 'ko' ? ('전체 ' + cat.count + '개 ' + getLabel(cat.name, lang)) : lang === 'zh' ? ('全部 ' + cat.count + ' 个' + getLabel(cat.name, lang)) : ('All ' + cat.count + ' ' + getLabel(cat.name, lang)));
    if (sections[1]) sections[1].textContent = UI.sectionFaq[lang];
    if (sections[2]) sections[2].textContent = UI.sectionRelated[lang];

    document.querySelectorAll('.tools-grid .tool-card').forEach(function (card) {
      var href = (card.getAttribute('href') || '').split('?')[0];
      var file = href.split('/').pop();
      var nameEl = card.querySelector('.tool-name');
      if (nameEl && TOOL_NAMES[file]) nameEl.textContent = getLabel(TOOL_NAMES[file], lang);
      var descEl = card.querySelector('.tool-desc');
      if (descEl && lang !== 'en' && MAIN_I18N.toolDesc[lang]) descEl.textContent = MAIN_I18N.toolDesc[lang];
    });

    // Replace main intro/FAQ hardcoded English for non-English locales.
    if (lang !== 'en') {
      var intro = document.querySelector('.intro');
      if (intro && MAIN_I18N.intro[lang]) {
        var introPs = intro.querySelectorAll('p');
        MAIN_I18N.intro[lang].forEach(function (txt, idx) {
          if (introPs[idx]) introPs[idx].textContent = txt;
        });
      }

      var faqList = MAIN_I18N.faq[lang] || [];
      document.querySelectorAll('.faq-item').forEach(function (item, idx) {
        if (!faqList[idx]) return;
        var q = item.querySelector('.faq-q');
        var a = item.querySelector('.faq-a');
        if (q) {
          var chev = q.querySelector('.faq-chevron');
          q.innerHTML = faqList[idx][0] + (chev ? chev.outerHTML : '<span class="faq-chevron">▼</span>');
        }
        if (a) a.textContent = faqList[idx][1];
      });
    } else {
      var introEn = document.querySelector('.intro');
      if (introEn && ORIGINAL_MAIN.intro.length) {
        var introPsEn = introEn.querySelectorAll('p');
        ORIGINAL_MAIN.intro.forEach(function (txt, idx) {
          if (introPsEn[idx]) introPsEn[idx].textContent = txt;
        });
      }

      document.querySelectorAll('.tools-grid .tool-card .tool-desc').forEach(function (el, idx) {
        if (ORIGINAL_MAIN.toolDesc[idx]) el.textContent = ORIGINAL_MAIN.toolDesc[idx];
      });

      document.querySelectorAll('.faq-item').forEach(function (item, idx) {
        if (!ORIGINAL_MAIN.faq[idx]) return;
        var q = item.querySelector('.faq-q');
        var a = item.querySelector('.faq-a');
        if (q) {
          var chev = q.querySelector('.faq-chevron');
          q.innerHTML = ORIGINAL_MAIN.faq[idx].q + (chev ? chev.outerHTML : '<span class="faq-chevron">▼</span>');
        }
        if (a) a.textContent = ORIGINAL_MAIN.faq[idx].a;
      });
    }

    document.querySelectorAll('.related-cats .cat-card').forEach(function (card) {
      var href = (card.getAttribute('href') || '').split('?')[0];
      var file = href.split('/').pop();
      var base = file.replace(/\.html$/, '');
      var iconEl = card.querySelector('.cat-icon');
      var iconTxt = iconEl ? iconEl.outerHTML : '';
      if (base === 'index') {
        card.innerHTML = iconTxt + UI.allToolsCard[lang].replace('{n}', '136');
      } else if (CAT_NAMES[base]) {
        card.innerHTML = iconTxt + getLabel(CAT_NAMES[base], lang);
      }
    });

    var footer = document.querySelector('footer');
    if (footer) {
      var a = footer.querySelector('a');
      if (a) {
        a.textContent = UI.privacy[lang];
        footer.innerHTML = '&copy; 2026 MODOO HUB · ' + UI.free[lang] + ' · ' + a.outerHTML;
      }
    }

    var btn = document.querySelector('.lang-btn');
    if (btn) btn.textContent = UI.langBtn[lang];
  }

  function ensureLangButton(lang) {
    var header = document.querySelector('header');
    if (!header) return;

    var btn = header.querySelector('.lang-btn');
    if (!btn) {
      btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'lang-btn';
      btn.style.cssText = 'margin-left:auto;font-size:12px;border:1px solid var(--border);background:transparent;color:var(--text-muted);padding:6px 10px;border-radius:8px;cursor:pointer;font-family:"DM Mono",monospace;';
      var back = header.querySelector('.back-link');
      if (back) {
        header.insertBefore(btn, back);
        back.style.marginLeft = '8px';
      } else {
        header.appendChild(btn);
      }
    }

    btn.addEventListener('click', function () {
      var next = cycleLang(detectLang());
      persistLang(next);
      var url = new URL(location.href);
      if (next === 'ko') url.searchParams.delete('lang');
      else url.searchParams.set('lang', next);
      history.replaceState({}, '', url);
      applyCategoryI18n(next);
    });

    btn.textContent = UI.langBtn[lang];
  }

  var lang = detectLang();
  persistLang(lang);
  ensureLangButton(lang);
  applyCategoryI18n(lang);
})();

