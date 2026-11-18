(function () {
  'use strict';
  var SC = window.J2C_SCENES, BL = window.J2C_BLOCKS, C = window.J2C;
  var pos = { scene: 0, step: 1 }, projWin = null;
  var $ = function (id) { return document.getElementById(id); };
  var fNow = $('fNow'), fNext = $('fNext');

  function fit() {
    document.querySelectorAll('.frame').forEach(function (f) {
      var fr = f.querySelector('iframe'); fr.style.transform = 'scale(' + (f.clientWidth / 1920) + ')';
    });
  }
  window.addEventListener('resize', fit);

  /* lista de telas por bloco */
  var list = $('list'), h = '';
  Object.keys(BL).forEach(function (b) {
    h += '<div class="b">' + b + ' · ' + BL[b].name + '<i>' + (BL[b].end - BL[b].start) + ' min</i></div>';
    SC.forEach(function (s, i) { if (String(s.block) === b) h += '<a data-i="' + i + '">' + (i + 1) + '. ' + s.title + '</a>'; });
  });
  list.innerHTML = h;
  list.addEventListener('click', function (e) {
    var a = e.target.closest('a'); if (!a) return;
    send(parseInt(a.getAttribute('data-i'), 10), true);
  });

  function send(scene, animate) {
    scene = Math.max(0, Math.min(SC.length - 1, scene));
    J2CBus.send({ cmd: 'goto', scene: scene, step: SC[scene].steps, animate: !!animate });
    show(scene, SC[scene].steps);
    J2CClock.setScene(scene);
  }
  function next() { if (pos.scene < SC.length - 1) send(pos.scene + 1, true); }
  function prev() { if (pos.scene > 0) send(pos.scene - 1, false); }

  function show(scene, step) {
    var changed = scene !== pos.scene || !$('nTitle').textContent;
    pos = { scene: scene, step: step };
    var s = SC[scene];
    $('cnt').textContent = '· tela ' + (scene + 1) + '/' + SC.length;
    list.querySelectorAll('a').forEach(function (a) { a.classList.toggle('on', +a.getAttribute('data-i') === scene); });
    var on = list.querySelector('a.on'); if (on) on.scrollIntoView({ block: 'nearest' });
    if (changed) {
      $('nTitle').textContent = s.title;
      $('nBlock').textContent = 'Bloco ' + s.block + ' · ' + BL[s.block].name + ' · ' + BL[s.block].start + '–' + BL[s.block].end + ' min · tela de ' + fmt(s.sec);
      var body = '';
      String(s.notes || '').split('\n').forEach(function (l) {
        var m = l.match(/^(FALE|FAÇA|DICA|CONFIRA|NOTA|IMPORTANTE|PLANO B):\s*(.*)$/);
        var t = fillText(m ? m[2] : l).replace(/<[^>]+>/g, '');
        var esc = t.replace(/&/g, '&amp;').replace(/</g, '&lt;');
        var cls = m ? m[1].replace(/ /g, '') : '';
        body += m ? '<p class="' + cls + '"><b>' + m[1] + '</b>' + esc + '</p>' : '<p>' + esc + '</p>';
      });
      $('nBody').innerHTML = body;
      var n = SC[scene + 1];
      fNext.src = n ? 'projetor.html?static=1&scene=' + (scene + 1) + '&tema=' + (light ? 'claro' : 'escuro') : 'about:blank';
      fit();
    }
    draw();
  }
  var light = false;
  try { light = localStorage.getItem('j2c-tema') === 'claro'; } catch (_) { }
  $('bTheme').textContent = light ? 'Tema escuro' : 'Tema claro';
  $('bTheme').onclick = function () {
    light = !light; try { localStorage.setItem('j2c-tema', light ? 'claro' : 'escuro'); } catch (_) { }
    J2CBus.send({ cmd: 'theme', light: light }); this.textContent = light ? 'Tema escuro' : 'Tema claro';
    var n = SC[pos.scene + 1]; if (n) fNext.src = 'projetor.html?static=1&scene=' + (pos.scene + 1) + '&tema=' + (light ? 'claro' : 'escuro');
  };
  $('bReplay').onclick = function () { J2CBus.send({ cmd: 'replay' }); };

  J2CBus.on(function (m) { if (m && m.cmd === 'goto') show(m.scene, m.step); });

  /* relógios (compartilhados com o projetor) */
  function fmt(s) { var neg = s < 0; s = Math.abs(Math.round(s)); return (neg ? '+' : '') + Math.floor(s / 60) + ':' + ('0' + (s % 60)).slice(-2); }
  function updateDelay() {
    var s = SC[pos.scene], b = BL[s.block], el = $('delay');
    var idx = 0, tot = 0;
    SC.forEach(function (x, i) { if (x.block === s.block) { tot++; if (i < pos.scene) idx++; } });
    var planned = (b.start + (b.end - b.start) * (idx / tot)) * 60;
    var d = J2CClock.elapsed() - planned;
    el.className = 'delay';
    if (!J2CClock.running() && J2CClock.elapsed() === 0) { el.textContent = 'relógio parado'; return; }
    if (d > 45) { el.classList.add('late'); el.textContent = 'atrasado ' + Math.round(d / 60) + ' min: encurte a prática'; }
    else if (d < -60) { el.classList.add('early'); el.textContent = 'adiantado ' + Math.round(-d / 60) + ' min'; }
    else el.textContent = 'no horário';
  }
  function draw() {
    var e = J2CClock.elapsed(), m = Math.floor(e / 60), sec = Math.floor(e % 60);
    $('clock').textContent = ('0' + m).slice(-2) + ':' + ('0' + sec).slice(-2);
    var left = J2CClock.sceneLeft(pos.scene);
    $('reg').textContent = fmt(left); $('regBox').classList.toggle('late', left < 0);
    $('bStart').textContent = J2CClock.running() ? 'Pausar' : (e > 0 ? 'Continuar' : 'Iniciar relógio');
    updateDelay();
  }
  setInterval(draw, 500);
  J2CBus.on(function (m) { if (m && m.cmd === 'clock') draw(); });
  $('bStart').onclick = function () { if (J2CClock.running()) J2CClock.pause(); else J2CClock.start(); draw(); };
  $('bReset').onclick = function () { J2CClock.reset(); J2CClock.setScene(pos.scene); draw(); };
  $('bOpen').onclick = function () {
    projWin = window.open('projetor.html', 'j2c-projetor', 'width=1280,height=720');
    setTimeout(function () { J2CBus.send({ cmd: 'hello' }); }, 1200);
  };
  $('bBlank').onclick = function () { J2CBus.send({ cmd: 'blank' }); };
  $('bNext').onclick = next; $('bPrev').onclick = prev;
  window.addEventListener('keydown', function (e) {
    var k = e.key;
    if (k === 'ArrowRight' || k === ' ' || k === 'PageDown') { e.preventDefault(); next(); }
    else if (k === 'ArrowLeft' || k === 'PageUp') { e.preventDefault(); prev(); }
    else if (k === 'b' || k === 'B') J2CBus.send({ cmd: 'blank' });
  });

  /* o iframe "agora" é um projetor embutido; ele já segue as mensagens */
  show(0, 1);
  fNow.addEventListener('load', function () { fit(); setTimeout(function () { J2CBus.send({ cmd: 'hello' }); }, 500); });
  fit();
})();
