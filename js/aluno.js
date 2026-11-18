(function () {
  'use strict';
  var C = window.J2C;
  var P = {
    persona: 'Você é especialista em marketing digital. Meu negócio: [o que eu vendo], em [minha cidade]. Crie a persona do meu cliente ideal: nome, idade, rotina, maior dor, maior desejo, o que faz ele desconfiar e como ele fala. Use palavras simples.',
    editorial: 'Com base nessa persona, crie a minha linha editorial para o Instagram: 3 temas principais, 10 ideias de posts e vídeos curtos e uma frequência realista de 3 posts por semana. Use palavras simples.',
    roteiro: 'Escreva um roteiro de vídeo de 30 segundos para o Instagram, para [meu negócio]. Estrutura: gancho (0 a 3 s) que pare quem está rolando o feed; problema (3 a 10 s); solução (10 a 25 s); chamada (25 a 30 s) pedindo para a pessoa me chamar no WhatsApp. Fale como a persona fala.',
    anuncio: 'Escreva 3 textos curtos de anúncio para [meu negócio] em [minha cidade], pensados para quem vai me chamar no WhatsApp. Cada um com uma promessa clara e uma chamada para enviar mensagem. Sem exageros e sem prometer o que não posso cumprir.',
    lp: 'Crie uma página de vendas em um único arquivo HTML, pensada para celular, para [meu negócio] em [minha cidade]. Inclua: título com a promessa principal, 3 benefícios, um espaço para depoimento, perguntas frequentes e um botão grande que abre o meu WhatsApp. Use as cores [cores da marca] e palavras simples.',
    ler: 'Este é o print da minha campanha de mensagens. Explique com palavras simples: o que está funcionando, o que está caro, o que pausar e o que testar na próxima semana.'
  };
  function fig(slug, alt, maxw, cap, cls) {
    return '<figure class="fig ' + (cls || '') + '" style="max-width:' + (maxw || 640) + 'px"><div class="ia"><img src="img/ia/' + slug + (slug === 'claude-logo' ? '.png' : '.jpg') + '" alt="' + alt + '" onerror="this.parentNode.classList.add(\'empty\')">' +
      '<div class="iaph"><b>' + alt + '</b><span>img/ia/' + slug + (slug === 'claude-logo' ? '.png' : '.jpg') + '</span></div></div>' + (cap ? '<figcaption>' + cap + '</figcaption>' : '') + '</figure>';
  }
  function esc(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;'); }
  function prompt(id, titulo) {
    return '<div class="card"><div class="t">' + titulo + '</div><div class="prompt" id="p-' + id + '">' +
      esc(P[id]).replace(/\[([^\]]+)\]/g, '<mark>[$1]</mark>') + '</div>' +
      '<div class="row noprint"><button class="btn" data-copy="' + id + '">Copiar pedido</button>' +
      '<a class="btn ghost" target="_blank" rel="noopener" href="' + C.iaLink + '?q=' + encodeURIComponent(P[id]) + '">Abrir no ' + C.iaNome + '</a></div></div>';
  }
  var n = 0;
  function chk(t) { var id = 'c' + (n++); return '<label class="chk"><input type="checkbox" data-k="' + id + '"><span>' + t + '</span></label>'; }
  function sec(id, tag, title, body) { return '<section id="' + id + '"><h2><small>' + tag + '</small>' + title + '</h2>' + body + '</section>'; }

  var S = [];
  S.push(sec('caminho', 'Visão geral', 'O caminho em 6 passos',
    '<ol><li><b>Base:</b> persona, linha editorial e roteiros com a IA.</li><li><b>Conta segura:</b> portfólio empresarial (antigo BM) com Página, Instagram e conta de anúncios.</li><li><b>Públicos:</b> quem assistiu seus vídeos vale mais que seguidor.</li><li><b>Campanha de mensagens:</b> objetivo Engajamento, conversa no WhatsApp.</li><li><b>Página com IA:</b> opcional, dá credibilidade.</li><li><b>Leitura e ajuste:</b> 3 números e a IA para explicar.</li></ol>' +
    '<div class="note">Você não precisa de computador para começar: tudo funciona no celular.</div>' + fig('suite-celular', 'Gerenciador de anúncios no celular', 560, 'Exemplo ilustrativo do gerenciador no celular.')));
  S.push(sec('base', 'Bloco 1', 'Base: persona, linha editorial e roteiro',
    '<p>Quem não sabe para quem fala gasta dinheiro falando com todo mundo. A persona é o retrato do cliente ideal e dela sai tudo: linha editorial, roteiros, anúncios e página.</p>' + fig('claude-logo', 'Logo do Claude', 110, '', 'sm') +
    prompt('persona', '1 · Persona do cliente ideal') + prompt('editorial', '2 · Linha editorial') + prompt('roteiro', '3 · Roteiro de vídeo de 30 segundos') +
    '<div class="note">Preencha o que está em <b>[colchetes]</b>. A IA sugere; quem decide é você, que conhece seu cliente.</div>'));
  S.push(sec('conta', 'Bloco 2', 'Conta segura: montando a casa dos anúncios',
    fig('gerenciador-desktop', 'Gerenciador de anúncios no computador', 640, 'Exemplo ilustrativo: é aqui que ficam suas campanhas.') +
    '<h3>Criar o portfólio empresarial (antigo BM)</h3><ol><li>Entre no Facebook com o <b>seu perfil pessoal real</b>.</li><li>Acesse business.facebook.com e escolha <b>Criar</b>.</li><li>Preencha nome do negócio, seu nome e e-mail de trabalho.</li><li>Em Configurações > Contas, adicione: <b>Página</b>, <b>Instagram</b> e <b>Conta de anúncios</b>.</li><li>Cadastre a <b>forma de pagamento</b>.</li></ol>' +
    '<h3>Conta saudável (aquecimento)</h3>' + chk('Perfil real, completo e com foto') + chk('Instagram profissional ligado à Página') + chk('Verificação em duas etapas ligada') + chk('Use a conta alguns dias antes de anunciar: poste e responda') + chk('Comece com valor baixo e aumente aos poucos') +
    '<div class="note">Sem atalhos: contas compradas ou alugadas colocam tudo em risco.</div>' +
    '<h3>Um bom perfil de Instagram</h3>' + fig('perfil-instagram', 'Exemplo de um bom perfil de Instagram', 640, 'Foto nítida, bio com promessa e cidade, botão de WhatsApp e destaques organizados.') +
    chk('Foto ou logo nítida') + chk('Bio com a promessa e a cidade') + chk('Botão do WhatsApp no topo') + chk('Destaques: serviços, preços e depoimentos') + chk('Últimos posts organizados') +
    '<h3>Plano B (contingência)</h3>' + chk('Pelo menos um segundo administrador de confiança') + chk('Dados de recuperação atualizados (e-mail e telefone)') + chk('IDs da Página, do Instagram e da conta de anúncios anotados') + chk('Lista de contatos dos clientes também fora da plataforma') + chk('Se houver bloqueio: peça análise e aguarde, não abra várias contas novas')));
  S.push(sec('publicos', 'Bloco 3', 'Públicos: seguidor não é cliente',
    '<p>Seguidor é quem clicou uma vez. Quem assistiu 75% do seu vídeo demonstrou interesse de verdade. Frio, morno e quente: comece pelos mais quentes.</p>' + fig('seguidor-x-cliente', 'Seguidor x cliente', 520) +
    '<h3>Criar o público de quem assistiu</h3><ol><li>Gerenciador de Anúncios > <b>Públicos</b> > <b>Criar público</b> > <b>Público personalizado</b>.</li><li>Fonte: <b>Engajamento</b> > <b>Vídeo</b>.</li><li>Escolha <b>Assistiu 75% do vídeo</b> e <b>30 dias</b>.</li><li>Dê um nome e salve.</li></ol>'));
  S.push(sec('campanha', 'Bloco 4', 'Campanha de mensagens em 6 passos',
    fig('campanha-config', 'Configurações da campanha', 640, 'Exemplo ilustrativo das configurações principais.') +
    '<ol><li>No Gerenciador, clique em <b>+ Criar</b>.</li><li>Objetivo: <b>Engajamento</b>.</li><li>Local de conversão: <b>Apps de mensagens</b> (WhatsApp).</li><li>Orçamento diário baixo para começar.</li><li>Público: quem assistiu seus vídeos (ou o público da sua cidade).</li><li>Botão: <b>Enviar mensagem</b>.</li></ol>' +
    '<h3>Regras da primeira campanha</h3>' + chk('Um objetivo: conversas no WhatsApp') + chk('Um público e dois anúncios para comparar') + chk('Valor baixo e paciência: dê alguns dias antes de mexer') +
    '<div class="note">Mensagem inicial pronta: “Oi! Vi seu anúncio e quero saber mais.”</div>' + prompt('anuncio', 'Textos de anúncio')));
  S.push(sec('pagina', 'Bloco 5', 'Página de vendas com IA',
    '<p>Uma página com um único objetivo: levar a pessoa para o WhatsApp. Para campanhas de mensagens ela é opcional, mas dá credibilidade.</p>' + fig('landing-claude-celular', 'Criando a página no Claude, pelo celular', 640, 'Você descreve e o Claude monta a página.') + prompt('lp', 'Pedido da landing page') +
    '<div class="note">Peça ajustes em frases simples: “deixe o botão maior”, “troque a cor”, “inclua o endereço”.</div>'));
  S.push(sec('numeros', 'Bloco 6', 'Só 3 números importam',
    '<ul><li><b>Custo por conversa:</b> quanto você paga por cada pessoa que chama.</li><li><b>Conversas que viram venda:</b> você anota. É o número que paga a conta.</li><li><b>Anúncio cansado:</b> resultado caiu e o vídeo aparece demais? Troque o criativo.</li></ul>' + prompt('ler', 'Peça ao Claude para ler o relatório') +
    '<p>Tire um print do relatório, envie ao Claude e faça a pergunta acima. Nunca envie senhas ou dados de clientes.</p>'));
  S.push(sec('pratica', 'Mão na massa', 'Prática: faça a sua persona agora',
    '<ol><li>Abra o Claude no celular (conta grátis, com e-mail ou Google).</li><li>Toque em <b>Copiar pedido</b> abaixo, preencha os colchetes e envie.</li><li>Guarde a resposta: ela é a base de tudo.</li></ol>' + prompt('persona', 'Persona do cliente ideal') +
    '<h3>Minhas anotações</h3><textarea id="notas" rows="5" placeholder="Anote aqui o nome do seu negócio, a persona e o que quer testar primeiro."></textarea>' +
    '<div class="row noprint"><button class="btn ghost" id="salvar">Salvar anotações neste celular</button></div>'));
  S.push(sec('depoimentos', 'Prova real', 'Resultados de clientes',
    '<p>Clientes autorizaram o uso de seus depoimentos. Veja os vídeos no Instagram.</p><a class="igbig" target="_blank" rel="noopener" href="' + C.instagram + '"><span class="igdot"></span><span><b>Ver depoimentos no Instagram</b><small>' + C.instagramExibir + '</small></span></a>' +
    '<div class="row noprint" style="margin-top:12px"><a class="btn ghost" target="_blank" rel="noopener" href="' + C.depoimentos + '">Pasta com os vídeos (Drive)</a></div>'));
  S.push(sec('contato', 'Próximo passo', 'Vamos olhar o seu caso',
    '<p>Me chame no WhatsApp: vamos olhar o seu caso e montar o seu plano.</p>' +
    '<form id="lead" class="noprint"><input type="text" id="lNome" placeholder="Seu nome"><input type="text" id="lNeg" placeholder="Seu negócio e cidade"><button class="btn" type="submit">Enviar pelo WhatsApp</button></form>' +
    '<div class="qrs"><figure><div class="q" data-qr="wa"></div>WhatsApp<br>' + C.whatsappExibir + '</figure><figure><div class="q" data-qr="instagram"></div>' + C.instagramExibir + '</figure><figure><div class="q" data-qr="site"></div>' + C.siteExibir + '</figure><figure><div class="q" data-qr="aluno"></div>Este material</figure></div>'));

  var nav = [['depoimentos', 'Instagram'], ['caminho', 'Caminho'], ['base', 'Base'], ['conta', 'Conta'], ['publicos', 'Públicos'], ['campanha', 'Campanha'], ['pagina', 'Página'], ['numeros', 'Números'], ['pratica', 'Prática'], ['contato', 'Contato']];
  document.getElementById('nav').innerHTML = nav.map(function (x) { return '<a href="#' + x[0] + '">' + x[1] + '</a>'; }).join('');
  document.getElementById('main').innerHTML = S.join('');
  document.body.innerHTML = document.body.innerHTML.replace(/\{\{(\w+)\}\}/g, function (_, k) { return C[k] || ''; });
  fillQR(document);
  var igt = document.getElementById('igTop'); igt.href = C.instagram; document.getElementById('igTxt').textContent = C.instagramExibir;

  /* tema claro/escuro */
  var tb = document.getElementById('tema');
  function tema(l) { document.body.classList.toggle('light', l); document.querySelectorAll('img.logo').forEach(function (i) { i.src = l ? 'img/logo-j2c-claro.png' : 'img/logo-j2c.png'; }); tb.textContent = l ? 'Tema escuro' : 'Tema claro'; try { localStorage.setItem('j2c-tema', l ? 'claro' : 'escuro'); } catch (_) { } }
  var lt = false; try { lt = localStorage.getItem('j2c-tema') === 'claro'; } catch (_) { } if (new URLSearchParams(location.search).get('tema') === 'claro') lt = true;
  tb.onclick = function () { tema(!document.body.classList.contains('light')); }; tema(lt);

  /* copiar */
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-copy]'); if (!b) return;
    var id = b.getAttribute('data-copy'), txt = P[id];
    var done = function () { var o = b.textContent; b.textContent = 'Copiado!'; setTimeout(function () { b.textContent = o; }, 1500); };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(done, fallback); else fallback();
    function fallback() { var t = document.createElement('textarea'); t.value = txt; document.body.appendChild(t); t.select(); try { document.execCommand('copy'); done(); } catch (_) { } t.remove(); }
  });
  /* checklists e notas salvos no aparelho */
  var store = {}; try { store = JSON.parse(localStorage.getItem('j2c-aluno') || '{}'); } catch (_) { }
  function save() { try { localStorage.setItem('j2c-aluno', JSON.stringify(store)); } catch (_) { } }
  document.querySelectorAll('input[data-k]').forEach(function (i) {
    i.checked = !!store[i.dataset.k];
    i.addEventListener('change', function () { store[i.dataset.k] = i.checked; save(); });
  });
  var nt = document.getElementById('notas'); nt.value = store.notas || '';
  document.getElementById('salvar').onclick = function () { store.notas = nt.value; save(); this.textContent = 'Salvo!'; };
  document.getElementById('lead').addEventListener('submit', function (e) {
    e.preventDefault();
    var nome = document.getElementById('lNome').value.trim(), neg = document.getElementById('lNeg').value.trim();
    var m = C.mensagemWhatsapp + (nome ? ' Meu nome é ' + nome + '.' : '') + (neg ? ' Meu negócio: ' + neg + '.' : '');
    window.open(waLink(m), '_blank');
  });
})();
