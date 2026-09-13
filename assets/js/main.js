/* Eason Lee — Portfolio 2026 / Director edition */
(function () {
  'use strict';

  /* ── language toggle ── */
  var KEY = 'eason-lang';
  var root = document.documentElement;

  function setLang(l, persist) {
    root.setAttribute('data-lang', l);
    root.setAttribute('lang', l === 'zh' ? 'zh-Hant' : 'en');
    document.querySelectorAll('[data-langbtn]').forEach(function (b) {
      b.textContent = l === 'zh' ? 'EN' : '中';
      b.setAttribute('aria-label', l === 'zh' ? 'Switch to English' : '切換為中文');
    });
    if (persist) { try { localStorage.setItem(KEY, l); } catch (e) {} }
  }

  var saved = null;
  try { saved = localStorage.getItem(KEY); } catch (e) {}
  setLang(saved === 'en' || saved === 'zh' ? saved : (root.getAttribute('data-lang') || 'zh'), false);

  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-langbtn]');
    if (!b) return;
    setLang(root.getAttribute('data-lang') === 'zh' ? 'en' : 'zh', true);
  });

  /* ── mobile menu ── */
  var hbg = document.getElementById('hbg');
  var mob = document.getElementById('mob');
  if (hbg && mob) {
    hbg.addEventListener('click', function () {
      hbg.classList.toggle('open');
      mob.classList.toggle('open');
    });
    mob.addEventListener('click', function (e) {
      if (e.target.closest('a') && !e.target.closest('[data-langbtn]')) {
        hbg.classList.remove('open');
        mob.classList.remove('open');
      }
    });
  }

  /* ── scroll reveal ── */
  var items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('in'); });
  } else {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e, i) {
        if (!e.isIntersecting) return;
        var el = e.target;
        setTimeout(function () { el.classList.add('in'); }, i * 60);
        obs.unobserve(el);
      });
    }, { threshold: 0.06, rootMargin: '0px 0px -6% 0px' });
    items.forEach(function (el) { obs.observe(el); });
  }

  /* ── scroll progress ── */
  var prog = document.querySelector('#prog i');
  if (prog) {
    var tick = function () {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      prog.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + '%';
    };
    window.addEventListener('scroll', tick, { passive: true });
    window.addEventListener('resize', tick);
    tick();
  }

  /* ── work filters ── */
  document.querySelectorAll('[data-filters]').forEach(function (group) {
    group.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-filter]');
      if (!btn) return;
      var cat = btn.getAttribute('data-filter');
      group.querySelectorAll('[data-filter]').forEach(function (b) {
        var on = b === btn;
        b.classList.toggle('on', on);
        b.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
      document.querySelectorAll('[data-cat]').forEach(function (el) {
        el.hidden = !(cat === 'all' || el.getAttribute('data-cat') === cat);
      });
    });
  });

  /* ── smooth anchors ── */
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href^="#"]');
    if (!a) return;
    var t = document.querySelector(a.getAttribute('href'));
    if (!t) return;
    e.preventDefault();
    t.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  /* ── year ── */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
