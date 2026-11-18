/* Motor do projetor: escrita animada com a bolinha dourada, destaque de botões e sincronia com o apresentador. */
(function () {
  'use strict';
  var Q = new URLSearchParams(location.search);
  var EMBED = Q.has('embed'), STATIC = Q.has('static');
  var SC = window.J2C_SCENES;
  var stage = document.getElementById('stage');
  var host = document.getElementById('scene');
  var dot = document.getElementById('dot');
  var rings = document.getElementById('rings');
  var blankEl = document.getElementById('blank');

  var cur = -1, step = 0, total = 0, busy = false, skip = false, token = 0;
  var speed = parseFloat(Q.get('speed')) || 1, scale = 1, waiters = [], timers = [];
  var dotOn = false, noAnim = Q.has('noanim');

  if (EMBED) document.body.classList.add('embed');

  /* ---------- escala do palco 1920x1080 ---------- */
  function fit() {
    scale = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
    stage.style.transform = 'translate(-50%,-50%) scale(' + scale + ')';
  }
  window.addEventListener('resize', fit); fit();

  function pos(el) {
    var r = el.getBoundingClientRect(), s = stage.getBoundingClientRect(), k = s.width / 1920;
    return { x: (r.left - s.left) / k, y: (r.top - s.top) / k, w: r.width / k, h: r.height / k };
  }

  /* ---------- tempo com possibilidade de pular ---------- */
  function wait(ms) {
    return new Promise(function (res) {
      if (skip || ms <= 0) { res(); return; }
      var t = setTimeout(done, ms / speed);
      function done() { clearTimeout(t); res(); }
      waiters.push(done);
    });
  }
  function anim(ms, fn) {
    return new Promise(function (res) {
      if (skip || ms <= 0) { fn(1); res(); return; }
      var t0 = performance.now(), raf = 0, ended = false;
      function end() { if (ended) return; ended = true; cancelAnimationFrame(raf); fn(1); res(); }
      waiters.push(end);
      (function f(now) {
        if (ended) return;
        var p = Math.min(1, (now - t0) * speed / ms);
        fn(p);
        if (p < 1) raf = requestAnimationFrame(f); else { ended = true; res(); }
      })(t0);
    });
  }
  function finishAll() { skip = true; var w = waiters; waiters = []; w.forEach(function (f) { f(); }); }

  /* ---------- bolinha dourada ---------- */
  function dotSet(x, y) { dot.style.transform = 'translate(' + x + 'px,' + y + 'px)'; dot._x = x; dot._y = y; }
  function dotShow(on) { dot.classList.toggle('show', on); dotOn = on; }
  function dotFly(x, y, ms) {
    if (!dotOn || skip) { dotSet(x, y); dotShow(true); return Promise.resolve(); }
    dot.classList.add('fly'); void dot.offsetWidth; dotSet(x, y);
    return wait(ms || 500).then(function () { dot.classList.remove('fly'); });
  }

  /* ---------- preparo de cada cena ---------- */
  function prepWords(root) {
    root.querySelectorAll('.w').forEach(function (el) {
      var tw = document.createTreeWalker(el, NodeFilter.SHOW_TEXT), nodes = [], n;
      while ((n = tw.nextNode())) nodes.push(n);
      nodes.forEach(function (t) {
        if (!t.nodeValue.trim()) return;
        var parts = t.nodeValue.split(/(\s+)/), frag = document.createDocumentFragment();
        parts.forEach(function (p) {
          if (!p) return;
          if (/^\s+$/.test(p)) frag.appendChild(document.createTextNode(p));
          else { var s = document.createElement('span'); s.className = 'wd'; s.textContent = p; frag.appendChild(s); }
        });
        t.parentNode.replaceChild(frag, t);
      });
    });
  }
  function prepDraw(root) {
    root.querySelectorAll('svg.draw').forEach(function (svg) {
      svg.querySelectorAll('.st').forEach(function (p) {
        var L = p.getTotalLength ? p.getTotalLength() : 100;
        p.style.strokeDasharray = L; p.style.strokeDashoffset = L; p._L = L;
      });
    });
  }
  function clearTimers() { timers.forEach(clearInterval); timers = []; }

  function mount(i) {
    clearTimers(); rings.innerHTML = ''; token++;
    cur = i; step = 0; busy = false; skip = false; playing = false; waiters = [];
    var S = SC[i];
    host.innerHTML = fillText(S.html);
    prepWords(host); prepDraw(host); fillQR(host); swapLogo(host); swapLogo(document.querySelector('.hud'));
    total = S.steps;
    document.body.classList.toggle('nohud', S.hud === false);
    document.getElementById('hudBlock').textContent = 'Bloco ' + S.block + ' · ' + window.J2C_BLOCKS[S.block].name;
    document.getElementById('counter').textContent = pad(i + 1) + ' / ' + pad(SC.length);
    document.getElementById('barFill').style.width = ((i + 1) / SC.length * 100) + '%';
    dotShow(false);
  }
  function pad(n) { return (n < 10 ? '0' : '') + n; }

  /* ---------- revelações ---------- */
  function revealWrite(el) {
    var words = [].slice.call(el.querySelectorAll('.wd'));
    var chars = words.reduce(function (a, w) { return a + w.textContent.length + 1; }, 0) || 1;
    var totalMs = Math.min(Math.max(chars * 34, 500), el.classList.contains('slow') ? 8000 : 4200);
    var per = totalMs / chars, lastY = null;
    var chain = Promise.resolve();
    words.forEach(function (w, idx) {
      chain = chain.then(function () {
        var r = pos(w), y = r.y + r.h * 0.6;
        var jump = (idx === 0) || (lastY !== null && Math.abs(y - lastY) > 20);
        var pre = Promise.resolve();
        if (jump) pre = dotFly(r.x, y, idx === 0 ? 420 : 130);
        lastY = y;
        return pre.then(function () {
          w.style.visibility = 'visible';
          w.style.clipPath = 'inset(-6px 100% -6px 0)';
          return anim((w.textContent.length + 1) * per, function (p) {
            w.style.clipPath = p >= 1 ? 'none' : 'inset(-6px ' + ((1 - p) * 100) + '% -6px 0)';
            dotSet(r.x + r.w * p, y);
          });
        });
      });
    });
    return chain.then(function () { return wait(120); });
  }

  function countUp(el) {
    var to = parseFloat(el.getAttribute('data-to')), dec = parseInt(el.getAttribute('data-dec') || '0', 10);
    var pre = el.getAttribute('data-pre') || '', suf = el.getAttribute('data-suf') || '';
    return anim(1300, function (p) {
      var v = to * (1 - Math.pow(1 - p, 3));
      el.textContent = pre + v.toLocaleString('pt-BR', { minimumFractionDigits: dec, maximumFractionDigits: dec }) + suf;
    });
  }
  function startCountdown(el) {
    var sec = parseInt(el.getAttribute('data-sec'), 10) || 300, t0 = Date.now();
    var out = el.querySelector('.cdt'), arc = el.querySelector('.cda');
    var C = 2 * Math.PI * 90;
    function tick() {
      var left = Math.max(0, sec - Math.round((Date.now() - t0) / 1000));
      out.textContent = Math.floor(left / 60) + ':' + pad(left % 60);
      if (arc) arc.style.strokeDashoffset = C * (1 - left / sec);
    }
    tick();
    timers.push(setInterval(tick, 500));
  }

  function revealPop(el) {
    el.classList.add('in');
    var r = pos(el);
    var p = dotFly(r.x + Math.min(40, r.w / 2), r.y + Math.min(40, r.h / 2), 420);
    var extra = [];
    el.querySelectorAll('.num[data-to]').forEach(function (n) { extra.push(countUp(n)); });
    if (el.classList.contains('cd')) startCountdown(el);
    return p.then(function () { return Promise.all(extra); }).then(function () { return wait(260); });
  }

  function revealDraw(svg) {
    var paths = [].slice.call(svg.querySelectorAll('.st')), chain = Promise.resolve();
    svg.querySelectorAll('.fl').forEach(function (f) { f.classList.add('in'); });
    paths.forEach(function (p) {
      chain = chain.then(function () {
        var L = p._L || 100;
        return anim(Math.max(320, L * 1.3), function (pr) {
          p.style.strokeDashoffset = L * (1 - pr);
          var pt = p.getPointAtLength(L * pr), m = p.getScreenCTM();
          if (!m) return;
          var sp = new DOMPoint(pt.x, pt.y).matrixTransform(m), s = stage.getBoundingClientRect();
          if (!dotOn) dotShow(true);
          dotSet((sp.x - s.left) / scale, (sp.y - s.top) / scale);
        });
      });
    });
    return chain.then(function () { return wait(120); });
  }

  function revealHit(el, n) {
    var label = el.getAttribute('data-label') || 'Clique aqui';
    var r = pos(el), pad2 = 10;
    return dotFly(r.x + r.w / 2, r.y + r.h / 2, 650).then(function () {
      rings.querySelectorAll('.ring').forEach(function (x) { x.classList.add('done'); });
      rings.querySelectorAll('.tip').forEach(function (t) { t.remove(); });
      var ring = document.createElement('div'); ring.className = 'ring';
      ring.style.cssText = 'left:' + (r.x - pad2) + 'px;top:' + (r.y - pad2) + 'px;width:' + (r.w + 2 * pad2) + 'px;height:' + (r.h + 2 * pad2) + 'px';
      rings.appendChild(ring);
      var tip = document.createElement('div'); tip.className = 'tip';
      tip.innerHTML = '<b>' + n + '</b>' + label;
      rings.appendChild(tip);
      var tw = tip.offsetWidth, th = tip.offsetHeight;
      var ty = r.y - pad2 - th - 14; if (ty < 130) ty = r.y + r.h + pad2 + 14;
      var tx = Math.max(24, Math.min(r.x, 1920 - tw - 24));
      if (r.w < 420 && r.x - pad2 - tw - 16 >= 24 && r.x > 1000) { tx = r.x - pad2 - tw - 16; ty = r.y + r.h / 2 - th / 2; }
      else if (r.w >= 420) { tx = Math.max(24, Math.min(r.x + r.w - tw - 20, 1920 - tw - 24)); ty = r.y + r.h + pad2 + 10; if (ty + th > 1000) ty = r.y - pad2 - th - 10; }
      tip.style.left = tx + 'px'; tip.style.top = ty + 'px';
      dot.classList.remove('click'); void dot.offsetWidth; dot.classList.add('click');
      el.classList.add('hl');
      return wait(950);
    });
  }

  function reveal(el) {
    var chain;
    if (el.classList.contains('w')) chain = revealWrite(el);
    else if (el.tagName.toLowerCase() === 'svg' && el.classList.contains('draw')) chain = revealDraw(el);
    else if (el.hasAttribute('data-h')) chain = revealHit(el, parseInt(el.getAttribute('data-h'), 10));
    else chain = revealPop(el);
    return chain;
  }

  function runStep(n, instant) {
    var my = token;
    skip = !!instant || noAnim; waiters = []; busy = true;
    var els = [].slice.call(host.querySelectorAll('[data-s="' + n + '"],[data-h="' + n + '"]'));
    var chain = Promise.resolve();
    els.forEach(function (el) {
      chain = chain.then(function () { if (my !== token) return; return reveal(el); });
    });
    return chain.then(function () {
      if (my !== token) return;
      busy = false; skip = false;
    });
  }

  /* ---------- navegação: avançar = trocar de tela; a bolinha monta a tela sozinha ---------- */
  var playing = false, skipAll = false;
  function announce(animate) {
    if (STATIC) return;
    J2CBus.send({ cmd: 'goto', scene: cur, step: total, animate: !!animate });
    try { localStorage.setItem('j2c-pos', JSON.stringify({ scene: cur, step: total })); } catch (_) { }
  }
  function sceneChanged() { if (window.J2CClock && !EMBED) J2CClock.setScene(cur); }

  function runAll(my) {
    playing = true; skipAll = false;
    var chain = Promise.resolve();
    for (var n = 1; n <= total; n++) (function (nn) {
      chain = chain.then(function () {
        if (my !== token) return;
        step = nn;
        return runStep(nn, skipAll).then(function () { if (my === token && nn < total) return wait(skipAll ? 0 : 380); });
      });
    })(n);
    return chain.then(function () {
      if (my !== token) return;
      playing = false; busy = false; skip = false; skipAll = false;
      return new Promise(function (r) { setTimeout(function () { if (my === token) dotShow(false); r(); }, 500); });
    });
  }

  function jumpTo(i, k, silent) {
    i = Math.max(0, Math.min(SC.length - 1, i));
    mount(i); playing = false;
    skip = true;
    var chain = Promise.resolve();
    for (var n = 1; n <= total; n++) (function (nn) { chain = chain.then(function () { return runStep(nn, true); }); })(n);
    return chain.then(function () { step = total; dotShow(false); if (!silent) announce(false); });
  }

  function enterScene(i, animate, silent) {
    mount(i);
    if (!silent) announce(true);
    if (!animate) { skip = true; var c = Promise.resolve(); for (var n = 1; n <= total; n++) (function (nn) { c = c.then(function () { return runStep(nn, true); }); })(n); return c.then(function () { step = total; dotShow(false); }); }
    return runAll(token);
  }

  function next() {
    if (playing) { skipAll = true; finishAll(); return; }
    if (cur < SC.length - 1) { enterScene(cur + 1, true); sceneChanged(); }
  }
  function prev() {
    if (playing) { skipAll = true; finishAll(); }
    if (cur > 0) { jumpTo(cur - 1, 0); sceneChanged(); }
  }
  function replay() { enterScene(cur, true); sceneChanged(); }

  function apply(m) {
    if (!m) return;
    if (m.cmd === 'blank') { blankEl.classList.toggle('on'); return; }
    if (m.cmd === 'theme') { setTheme(m.light); return; }
    if (m.cmd === 'hello') { if (!EMBED && cur >= 0) announce(false); return; }
    if (m.cmd === 'replay') { if (cur >= 0) enterScene(cur, true, true); return; }
    if (m.cmd !== 'goto') return;
    if (m.scene === cur && !m.animate) return;
    if (m.scene === cur && m.animate) { return; }
    if (m.animate) enterScene(m.scene, true, true); else jumpTo(m.scene, 0, true);
  }

  /* ---------- eventos ---------- */
  if (!STATIC) {
    J2CBus.on(apply);
    if (!EMBED) {
      window.addEventListener('keydown', function (e) {
        var k = e.key;
        if (k === 'ArrowRight' || k === 'ArrowDown' || k === ' ' || k === 'PageDown' || k === 'Enter') { e.preventDefault(); next(); }
        else if (k === 'ArrowLeft' || k === 'ArrowUp' || k === 'PageUp' || k === 'Backspace') { e.preventDefault(); prev(); }
        else if (k === 'Home') { jumpTo(0, 0); sceneChanged(); }
        else if (k === 'End') { jumpTo(SC.length - 1, 0); sceneChanged(); }
        else if (k === 'r' || k === 'R') { replay(); J2CBus.send({ cmd: 'goto', scene: cur, step: total, animate: false }); }
        else if (k === 't' || k === 'T') { setTheme(!document.body.classList.contains('light')); J2CBus.send({ cmd: 'theme', light: document.body.classList.contains('light') }); }
        else if (k === 'c' || k === 'C') { document.body.classList.toggle('nocl'); }
        else if (k === 'f' || k === 'F') { if (document.fullscreenElement) document.exitFullscreen(); else document.documentElement.requestFullscreen && document.documentElement.requestFullscreen(); }
        else if (k === 'b' || k === 'B' || k === '.') { blankEl.classList.toggle('on'); J2CBus.send({ cmd: 'blank' }); }
        else if (k === 'a' || k === 'A') { noAnim = !noAnim; toast(noAnim ? 'Animações desligadas' : 'Animações ligadas'); }
        else if (k === '?') document.getElementById('help').classList.toggle('on');
      });
      stage.addEventListener('click', function (e) { if (e.target.closest('a')) return; next(); });
      stage.addEventListener('contextmenu', function (e) { e.preventDefault(); prev(); });
      var tx = null;
      stage.addEventListener('touchstart', function (e) { tx = e.touches[0].clientX; }, { passive: true });
      stage.addEventListener('touchend', function (e) {
        if (tx === null) return; var dx = e.changedTouches[0].clientX - tx; tx = null;
        if (Math.abs(dx) > 60) { dx < 0 ? next() : prev(); }
      });
    }
  }
  function toast(t) {
    var el = document.getElementById('toast'); if (!el) return;
    el.textContent = t; el.classList.add('on'); setTimeout(function () { el.classList.remove('on'); }, 1600);
  }

  /* ---------- tema claro/escuro ---------- */
  function swapLogo(root) { var l = document.body.classList.contains('light'); (root || document).querySelectorAll('img[src*="logo-j2c"]').forEach(function (i) { var n = l ? 'img/logo-j2c-claro.png' : 'img/logo-j2c.png'; if (i.getAttribute('src') !== n) i.setAttribute('src', n); }); }
  function setTheme(light) {
    document.body.classList.toggle('light', !!light); swapLogo();
    try { localStorage.setItem('j2c-tema', light ? 'claro' : 'escuro'); } catch (_) { }
  }
  (function () {
    var t = Q.get('tema'), light = t === 'claro';
    if (!t) { try { light = localStorage.getItem('j2c-tema') === 'claro'; } catch (_) { } }
    document.body.classList.toggle('light', light); swapLogo();
  })();

  /* ---------- relógios do HUD ---------- */
  function mmss(v) { var neg = v < 0; v = Math.abs(Math.round(v)); return (neg ? '+' : '') + Math.floor(v / 60) + ':' + pad(v % 60); }
  function hud() {
    if (!window.J2CClock || cur < 0) return;
    var left = J2CClock.sceneLeft(cur), c = document.getElementById('clkScene');
    if (c) { c.textContent = mmss(left); c.parentNode.classList.toggle('late', left < 0); }
    var t = document.getElementById('clkTotal'); if (t) t.textContent = mmss(J2CClock.elapsed());
  }
  setInterval(hud, 500);

  /* ---------- início ---------- */
  function start() {
    var i = 0;
    if (STATIC) { i = parseInt(Q.get('scene') || '0', 10); jumpTo(i, 0, true); return; }
    var qs = Q.get('scene');
    if (qs !== null) { i = parseInt(qs, 10); jumpTo(i, 0, true); return; }
    try { var p = JSON.parse(localStorage.getItem('j2c-pos') || 'null'); if (p && !EMBED && Q.has('resume')) i = p.scene; } catch (_) { }
    if (i === 0 && !Q.has('resume')) { enterScene(0, true); sceneChanged(); } else { jumpTo(i, 0, true); }
    J2CBus.send({ cmd: 'hello' });
  }
  var ready = (document.fonts && document.fonts.ready) ? document.fonts.ready : Promise.resolve();
  ready.then(function () { setTimeout(start, 80); });

  window.J2CStage = { next: next, prev: prev, jumpTo: jumpTo, replay: replay };
})();
