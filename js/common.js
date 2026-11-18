/* Utilidades compartilhadas: mensagens entre telas, QR code e preenchimento de textos. */
(function () {
  'use strict';
  var C = window.J2C;

  /* ---------- Mensagens entre janelas (apresentador <-> projetor) ---------- */
  var bc = null, fns = [];
  try { bc = new BroadcastChannel('j2c-workshop'); } catch (e) { bc = null; }
  if (bc) {
    bc.onmessage = function (e) { fns.forEach(function (f) { f(e.data); }); };
  } else {
    window.addEventListener('storage', function (e) {
      if (e.key === 'j2c-msg' && e.newValue) {
        try { var m = JSON.parse(e.newValue); fns.forEach(function (f) { f(m); }); } catch (_) { }
      }
    });
  }
  window.J2CBus = {
    send: function (m) {
      if (bc) { bc.postMessage(m); return; }
      try { localStorage.setItem('j2c-msg', JSON.stringify(Object.assign({ t: Date.now(), r: Math.random() }, m))); } catch (_) { }
    },
    on: function (f) { fns.push(f); }
  };


  /* ---------- Relógio compartilhado: geral (progressivo) + regressivo por tela ---------- */
  var KEY = 'j2c-clock';
  var cs = { running: false, t0: 0, acc: 0, sceneAt: 0 };
  try { var raw = JSON.parse(localStorage.getItem(KEY) || 'null'); if (raw) cs = raw; } catch (_) { }
  function csave(broadcast) {
    try { localStorage.setItem(KEY, JSON.stringify(cs)); } catch (_) { }
    if (broadcast) J2CBus.send({ cmd: 'clock', s: cs });
  }
  J2CBus.on(function (m) { if (m && m.cmd === 'clock' && m.s) cs = m.s; });
  window.J2CClock = {
    elapsed: function () { return cs.acc + (cs.running ? (Date.now() - cs.t0) / 1000 : 0); },
    running: function () { return cs.running; },
    start: function () { if (cs.running) return; cs.running = true; cs.t0 = Date.now(); csave(true); },
    pause: function () { if (!cs.running) return; cs.acc = this.elapsed(); cs.running = false; csave(true); },
    reset: function () { cs = { running: false, t0: 0, acc: 0, sceneAt: 0 }; csave(true); },
    setScene: function (i) { cs.sceneAt = this.elapsed(); csave(true); },
    budget: function (i) { var S = window.J2C_SCENES; return S && S[i] ? S[i].sec : 60; },
    sceneLeft: function (i) { return this.budget(i) - (this.elapsed() - cs.sceneAt); }
  };

  /* ---------- QR code em SVG ---------- */
  window.qrSvg = function (text) {
    var q = qrcode(0, 'M');
    q.addData(text);
    q.make();
    var n = q.getModuleCount(), d = '';
    for (var r = 0; r < n; r++) {
      for (var c = 0; c < n; c++) {
        if (q.isDark(r, c)) d += 'M' + c + ' ' + r + 'h1v1h-1z';
      }
    }
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2 ' + (n + 4) + ' ' + (n + 4) + '" shape-rendering="crispEdges" role="img" aria-label="QR code"><rect x="-2" y="-2" width="' + (n + 4) + '" height="' + (n + 4) + '" fill="#fff"/><path d="' + d + '" fill="#0a0a0b"/></svg>';
  };

  window.waLink = function (texto) {
    return 'https://wa.me/' + C.whatsapp + '?text=' + encodeURIComponent(texto || C.mensagemWhatsapp);
  };

  window.qrTarget = function (kind) {
    if (kind === 'wa') return waLink();
    if (kind === 'site') return C.site;
    if (kind === 'instagram') return C.instagram;
    if (kind === 'pratica') return C.praticaUrl();
    if (kind === 'depoimentos') return C.depoimentos;
    return C.alunoUrl();
  };

  window.fillQR = function (root) {
    (root || document).querySelectorAll('[data-qr]').forEach(function (el) {
      el.innerHTML = qrSvg(qrTarget(el.getAttribute('data-qr')));
    });
  };

  /* ---------- Troca de {{variáveis}} em textos ---------- */
  window.fillText = function (html) {
    return html
      .replace(/\{\{nome\}\}/g, C.nome)
      .replace(/\{\{cargo\}\}/g, C.cargo)
      .replace(/\{\{igx\}\}/g, C.instagramExibir)
      .replace(/\{\{wa\}\}/g, C.whatsappExibir)
      .replace(/\{\{site\}\}/g, C.siteExibir)
      .replace(/\{\{evento\}\}/g, C.evento)
      .replace(/\{\{data\}\}/g, C.data)
      .replace(/\{\{local\}\}/g, C.local);
  };
})();
