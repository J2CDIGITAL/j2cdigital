/* Conteúdo do workshop: 9 blocos, 30 telas, 50 minutos.
   data-s="N" = passo N (aparece ao avançar). data-h="N" = botão que a bolinha vai destacar. */
(function () {
  'use strict';

  var BLOCKS = {
    0: { name: 'Abertura', start: 0, end: 5 },
    1: { name: 'Base estratégica com IA', start: 5, end: 12 },
    2: { name: 'Conta segura', start: 12, end: 20 },
    3: { name: 'Públicos', start: 20, end: 26 },
    4: { name: 'Campanha de mensagens', start: 26, end: 32 },
    5: { name: 'Landing page com IA', start: 32, end: 38 },
    6: { name: 'IA nas campanhas', start: 38, end: 43 },
    7: { name: 'Prática', start: 43, end: 48 },
    8: { name: 'Próximo passo', start: 48, end: 50 }
  };

  var S = [];
  function add(block, id, title, html, notes, opts) {
    var o = { block: block, id: id, title: title, html: html, notes: notes };
    if (opts) for (var k in opts) o[k] = opts[k];
    S.push(o);
  }
  function img(slug, alt, w, h, step, extra) {
    return '<div class="ia" ' + (step ? 'data-s="' + step + '" ' : '') + 'style="width:' + w + 'px;height:' + h + 'px;' + (extra || '') + '">' +
      '<img src="img/ia/' + slug + (slug === 'claude-logo' ? '.png' : '.jpg') + '" alt="' + alt + '" onerror="this.parentNode.classList.add(\'empty\')">' +
      '<div class="iaph"><b>' + alt + '</b><span>img/ia/' + slug + (slug === 'claude-logo' ? '.png' : '.jpg') + '</span></div></div>';
  }
  function arrow(s) {
    return '<svg class="draw" data-s="' + s + '" width="90" height="44" viewBox="0 0 90 44" style="flex:none;align-self:center"><path class="st" d="M4 22 H80"/><path class="st" d="M62 6 L82 22 L62 38"/></svg>';
  }

  /* ================= BLOCO 0 · ABERTURA (0–5 min) ================= */

  add(0, 'capa', 'Capa',
    '<section class="col center mid gap34" style="flex:1">' +
    '<img data-s="1" src="img/logo-j2c.png" alt="J2C Digital" style="width:560px;height:auto">' +
    '<div class="tag w" data-s="2">Workshop gratuito · 50 minutos</div>' +
    '<h1 class="h1 big w" data-s="3">Tráfego Pago <span class="gold">com IA</span></h1>' +
    '<p class="p w" data-s="4" style="max-width:1300px">Como atrair clientes pelo Instagram usando o celular e a inteligência artificial</p>' +
    '<p class="small w" data-s="5">{{nome}} · {{evento}} · 28 de novembro</p>' +
    '</section>',
    'FALE: Boas-vindas. Apresente-se em uma frase: quem você é, há quanto tempo trabalha com isso (mais de 26 anos entre gestão, marketing e audiovisual) e que o workshop é prático e gratuito.\nFAÇA: Pergunte quem aqui já tem Instagram ou WhatsApp do negócio. Peça para deixarem o celular à mão.',
    { hud: false });

  add(0, 'agora', 'Gatilho: neste exato minuto',
    '<section class="row" style="flex:1;gap:90px;align-items:center">' +
    '<div class="col gap34 grow">' +
    '<div class="tag w" data-s="1">Pense nisto</div>' +
    '<h1 class="h1 w" data-s="2">Agora, neste exato minuto,</h1>' +
    '<p class="p w" data-s="3" style="font-size:54px">alguém da sua cidade está no Instagram procurando <span class="gold">o que você vende.</span></p>' +
    '<h2 class="h2 w goldl" data-s="4">Quem ele encontra primeiro?</h2>' +
    '</div>' +
    '<svg class="draw" data-s="1" width="330" height="620" viewBox="0 0 300 560" style="flex:none">' +
    '<path class="st" d="M60 20 H240 A40 40 0 0 1 280 60 V500 A40 40 0 0 1 240 540 H60 A40 40 0 0 1 20 500 V60 A40 40 0 0 1 60 20 Z"/>' +
    '<path class="st thin" d="M60 88 H240 A24 24 0 0 1 240 136 H60 A24 24 0 0 1 60 88 Z"/>' +
    '<path class="st thin" d="M60 190 H240 V330 H60 Z"/>' +
    '<path class="st thin" d="M60 372 H240"/><path class="st thin" d="M60 404 H180"/>' +
    '<path class="st thin" d="M60 450 H240"/><path class="st thin" d="M60 482 H150"/>' +
    '</svg>' +
    '</section>',
    'FALE: "Enquanto estamos aqui, alguém da sua cidade está no Instagram procurando exatamente o que você vende. A pergunta é: quem ele encontra primeiro, você ou o seu concorrente?"\nFAÇA: Faça uma pausa depois da pergunta final. Deixe o silêncio trabalhar por 3 segundos.');

  add(0, 'sozinho', 'Gatilho: falar sozinho',
    '<section class="col gap48" style="flex:1;justify-content:center">' +
    '<h1 class="h1 w" data-s="1">Postar sem anunciar<br><span class="gold">é falar sozinho.</span></h1>' +
    '<div class="grid3">' +
    '<div class="card" data-s="2"><div class="tag">Sem anúncio</div><p class="p m" style="margin-top:14px">Seu post chega a uma parte pequena de quem já segue você.</p></div>' +
    '<div class="card g" data-s="3"><div class="tag">Com anúncio</div><p class="p m" style="margin-top:14px">Você aparece para quem ainda não conhece o seu trabalho.</p></div>' +
    '<div class="card" data-s="4"><div class="tag">Tráfego pago é</div><p class="p m" style="margin-top:14px">Comprar atenção de quem já quer o que você vende.</p></div>' +
    '</div>' +
    '</section>',
    'FALE: O gatilho da perda: todo dia sem anúncio é um dia em que o cliente certo vê o concorrente. Tráfego pago não é "gastar dinheiro com anúncio": é comprar atenção de quem já quer o que você vende.\nFAÇA: Use a mão para mostrar "só quem já te segue" (círculo pequeno) contra "gente nova" (círculo grande).');

  add(0, 'casa-numeros', 'Prova: Casa de Vovó Dedé',
    '<section class="col gap34" style="flex:1;justify-content:center">' +
    '<div class="tag w" data-s="1">Resultado real</div>' +
    '<h1 class="h1 w" data-s="1" style="font-size:54px">Casa de Vovó Dedé · redes sociais em 2024</h1>' +
    '<div class="grid3" style="margin-top:10px">' +
    '<div class="card g" data-s="2"><div class="num" data-to="1.9" data-dec="1" data-suf=" mi">0</div><p class="p m soft" style="margin-top:14px">pessoas alcançadas</p></div>' +
    '<div class="card g" data-s="3"><div class="num" data-to="4.8" data-dec="1" data-suf=" mi">0</div><p class="p m soft" style="margin-top:14px">visualizações</p></div>' +
    '<div class="card g" data-s="4"><div class="num" data-to="54" data-suf=" mil">0</div><p class="p m soft" style="margin-top:14px">seguidores</p></div>' +
    '</div>' +
    '<p class="small w" data-s="5">Fonte: relatório de redes sociais da Casa de Vovó Dedé, 2024.</p>' +
    '</section>',
    'FALE: Mostre que não é teoria. O público do evento conhece a Casa de Vovó Dedé. Um perfil de projeto social, com estratégia, chegou a 1,9 milhão de pessoas em 2024.\nCONFIRA ANTES: os números vêm do relatório de redes sociais de 2024 que você apresentou. Ajuste se houver versão mais atual.');

  add(0, 'depoimentos', 'Prova: clientes',
    '<section class="col gap34" style="flex:1;justify-content:center">' +
    '<h1 class="h1 w" data-s="1" style="font-size:52px">Quem já colocou em prática</h1>' +
    '<div class="grid3">' +
    '<div class="card g" data-s="2"><div class="tag">Michelle · escola de inglês</div>' +
    '<div class="col gap16" style="margin-top:18px">' +
    '<div><span class="num s" data-to="50" data-pre="R$ ">R$ 0</span><span class="small"> investidos em 2 dias</span></div>' +
    '<div><span class="num s" data-to="7">0</span><span class="small"> matrículas</span></div>' +
    '<div><span class="num s" data-to="2000" data-pre="R$ ">R$ 0</span><span class="small"> recebidos</span></div>' +
    '</div></div>' +
    '<div class="card g" data-s="3"><div class="tag">Alexandre Almeida</div>' +
    '<div class="col gap16" style="margin-top:18px">' +
    '<div><span class="num s" data-to="2" data-suf="×">0</span></div>' +
    '<p class="p m">o faturamento dobrou, chegando a mais de R$ 20 mil.</p>' +
    '</div></div>' +
    '<div class="card g" data-s="4"><div class="tag">Dra. Taís Melo · dentista</div>' +
    '<div class="col gap16" style="margin-top:18px">' +
    '<p class="p m">Mais seguidores e mais pacientes no consultório desde que começou.</p>' +
    '</div></div>' +
    '</div>' +
    '<div class="row gap34" data-s="5" style="align-items:center"><div class="igpill"><span class="igdot"></span><div><b>Veja os depoimentos em vídeo no Instagram</b><span>{{igx}}</span></div></div><p class="small" style="max-width:720px">Depoimentos autorizados pelos clientes. Os resultados variam de negócio para negócio.</p></div>' +
    '</section>',
    'FALE: Três histórias reais de clientes. Não prometa o mesmo resultado: diga que cada negócio é diferente, mas que quem seguiu o passo a passo colheu.\nFAÇA: Avise que os vídeos completos estão no material do aluno (link da pasta de depoimentos).\nCONFIRA: a Michelle investiu R$ 25 por dia e recebeu R$ 2.000 em 2 dias (7 matrículas), conforme o vídeo. O áudio da Carla estava confuso, por isso ela não aparece com valores.');

  add(0, 'promessa', 'Promessa: 3 coisas',
    '<section class="col gap34" style="flex:1;justify-content:center">' +
    '<h1 class="h1 w" data-s="1">Hoje você leva <span class="gold">3 coisas</span></h1>' +
    '<div class="col gap24" style="margin-top:14px">' +
    '<div class="row gap24" data-s="2" style="align-items:center"><span class="badge">1</span><p class="p">A sua <b>persona</b>, pronta</p></div>' +
    '<div class="row gap24" data-s="3" style="align-items:center"><span class="badge">2</span><p class="p">O caminho para uma <b>conta segura</b></p></div>' +
    '<div class="row gap24" data-s="4" style="align-items:center"><span class="badge">3</span><p class="p">O roteiro da sua <b>primeira campanha</b></p></div>' +
    '</div>' +
    '<p class="small w" data-s="5" style="margin-top:14px">Sem computador? Tudo aqui funciona pelo celular.</p>' +
    '</section>',
    'FALE: Prometa três entregas concretas. Reforce: "quem não trouxe computador não perde nada, tudo funciona pelo celular e o material fica com vocês em PDF".\nFAÇA: Mostre a agenda de 50 minutos em uma frase: primeiro o cliente, depois a conta, depois o anúncio, depois a IA nos números.');

  /* ================= BLOCO 1 · BASE ESTRATÉGICA COM IA (5–12 min) ================= */

  add(1, 'cliente', 'Antes do anúncio, vem o cliente',
    '<section class="col gap48" style="flex:1;justify-content:center">' +
    '<h1 class="h1 w" data-s="1">Antes do anúncio,<br><span class="gold">vem o cliente.</span></h1>' +
    '<div class="row gap48" style="align-items:center">' +
    '<div class="col gap24 grow">' +
    '<p class="p w" data-s="2">Para quem eu falo?</p>' +
    '<p class="p w" data-s="3">O que ele sente e deseja?</p>' +
    '<p class="p w" data-s="4">Como ele fala?</p>' +
    '</div>' +
    '<div class="card g" data-s="5" style="width:640px"><div class="tag">Persona</div><p class="p m" style="margin-top:12px">O retrato do seu cliente ideal. <b>Tudo nasce daqui.</b></p></div>' +
    '</div>' +
    '</section>',
    'FALE: Quem não sabe para quem fala, gasta dinheiro falando com todo mundo. A persona é o retrato do cliente ideal: quem é, o que sente, como fala. É a base de tudo: linha editorial, roteiros, anúncios e página.\nFAÇA: Pergunte: "quem aqui já sabe descrever o seu cliente em 3 linhas?"');

  add(1, 'prompt-persona', 'IA: criando a persona',
    '<section class="col gap34" style="flex:1;justify-content:center">' +
    '<div class="row gap24" style="align-items:center">' + img('claude-logo', 'Logo do Claude', 96, 96, 0, 'border-radius:22px') + '<h1 class="h1 w" data-s="1" style="font-size:50px">Peça a persona ao <span class="gold">Claude</span></h1></div>' +
    '<div class="chat" data-s="2" style="margin-top:10px"><span class="who">Você escreve</span>' +
    '<div class="txt w" data-s="2">Você é especialista em marketing digital. Meu negócio: <span class="ph">[o que eu vendo]</span>, em <span class="ph">[minha cidade]</span>. Crie a persona do meu cliente ideal: nome, idade, rotina, maior dor, maior desejo, o que faz ele desconfiar e como ele fala. Use palavras simples.</div></div>' +
    '<div class="chat ai" data-s="3" style="margin-top:14px"><span class="who">O Claude responde · exemplo</span>' +
    '<div class="txt" style="font-size:34px"><b class="goldl">Marina, 34 anos, manicure em Fortaleza.</b> Dor: agenda vazia no meio da semana. Desejo: clientes fixas sem depender de indicação. Procura no Instagram e no WhatsApp. Fala de forma leve e direta.</div></div>' +
    '</section>',
    'FALE: Mostre que o prompt é só preencher dois campos entre colchetes. A IA devolve a persona em segundos. Depois vocês vão fazer isso no celular.\nFAÇA: Preencha um exemplo ao vivo se quiser, com um negócio da plateia.\nDICA: o prompt completo, copiável, está no material do aluno.');

  add(1, 'persona-tudo', 'Da persona sai tudo',
    '<section class="col" style="flex:1;align-items:center;justify-content:center">' +
    '<div class="card g" data-s="1" style="width:560px;text-align:center"><div class="tag">1 persona</div><p class="h3" style="margin-top:8px">Quem é o meu cliente</p></div>' +
    '<svg class="draw" data-s="2" width="1500" height="120" viewBox="0 0 1500 120" style="margin:6px 0">' +
    '<path class="st" d="M750 0 V50 H250 V104"/><path class="st" d="M750 50 H1250 V104"/><path class="st" d="M750 50 V104"/>' +
    '<path class="st" d="M234 88 L250 110 L266 88"/><path class="st" d="M734 88 L750 110 L766 88"/><path class="st" d="M1234 88 L1250 110 L1266 88"/>' +
    '</svg>' +
    '<div class="grid3" style="width:1500px">' +
    '<div class="card" data-s="3"><div class="tag">Linha editorial</div><p class="p m" style="margin-top:10px">O que postar, em 3 pilares</p></div>' +
    '<div class="card" data-s="4"><div class="tag">Roteiros</div><p class="p m" style="margin-top:10px">O que falar nos vídeos</p></div>' +
    '<div class="card g" data-s="5"><div class="tag">Anúncio</div><p class="p m" style="margin-top:10px">Para quem e com qual texto</p></div>' +
    '</div>' +
    '<p class="p w" data-s="6" style="margin-top:34px">Com a persona pronta, a IA faz o resto <span class="gold">com direção.</span></p>' +
    '</section>',
    'FALE: Da persona nascem três coisas: linha editorial (o que postar), roteiros (o que falar) e o anúncio (para quem e com qual texto). Sem persona, a IA responde genérico. Com persona, ela fala a língua do seu cliente.\nFAÇA: Cite um exemplo prático do seu trabalho: a persona do perfil da British ou da Casa define o tom das campanhas.');

  add(1, 'roteiro30', 'Roteiro de vídeo de 30 segundos',
    '<section class="col gap34" style="flex:1;justify-content:center">' +
    '<h1 class="h1 w" data-s="1" style="font-size:50px">Roteiro de <span class="gold">30 segundos</span></h1>' +
    '<div class="grid4" style="margin-top:12px">' +
    '<div class="card g" data-s="2"><div class="tag">Gancho · 0 a 3 s</div><p class="p m" style="margin-top:12px">Pare quem está rolando o feed.</p><p class="small" style="margin-top:12px">“Você também sofre com isso?”</p></div>' +
    '<div class="card" data-s="3"><div class="tag">Problema · 3 a 10 s</div><p class="p m" style="margin-top:12px">Mostre que você entende a dor.</p></div>' +
    '<div class="card" data-s="4"><div class="tag">Solução · 10 a 25 s</div><p class="p m" style="margin-top:12px">Mostre como você resolve.</p></div>' +
    '<div class="card g" data-s="5"><div class="tag">Chamada · 25 a 30 s</div><p class="p m" style="margin-top:12px">“Me chama no WhatsApp.”</p></div>' +
    '</div>' +
    '<p class="small w" data-s="6">A IA escreve o roteiro. O vídeo pode ser gravado no celular, com luz natural.</p>' +
    '</section>',
    'FALE: Todo vídeo de anúncio segue 4 passos. O mais importante é o gancho: nos primeiros 3 segundos a pessoa decide se continua assistindo.\nFAÇA: Peça um voluntário para dizer a dor do cliente dele em uma frase: esse é o gancho.');

  /* ================= BLOCO 2 · CONTA SEGURA (12–20 min) ================= */

  add(2, 'casa', 'A casa dos anúncios',
    '<section class="row" style="flex:1;gap:56px;align-items:center">' +
    '<div class="col gap24 grow">' +
    '<h1 class="h1 w" data-s="1" style="font-size:48px">Seus anúncios precisam de <span class="gold">uma casa</span></h1>' +
    '<div class="tag" data-s="2">Portfólio empresarial · o antigo “BM”</div>' +
    '<div class="card" data-s="3"><p class="h3">Página do Facebook</p><p class="small" style="margin-top:6px">A identidade do negócio</p></div>' +
    '<div class="card" data-s="4"><p class="h3">Instagram profissional</p><p class="small" style="margin-top:6px">Onde as pessoas encontram você</p></div>' +
    '<div class="card" data-s="5"><p class="h3">Conta de anúncios</p><p class="small" style="margin-top:6px">Onde o dinheiro é investido</p></div>' +
    '</div>' +
    img('gerenciador-desktop', 'Gerenciador de anúncios no computador', 800, 500, 6) +
    '</section>',    'FALE: O portfólio empresarial (que todo mundo chama de BM) junta Página, Instagram e conta de anúncios num lugar só, com a chave nas suas mãos. Se o anúncio mora no perfil pessoal, você perde o controle.\nFAÇA: Cite que o nome mudou, mas o conceito é o mesmo: "se vocês ouvirem BM, Business Manager ou portfólio, é a mesma casa".');

  add(2, 'mock-bm', 'Montando a casa (passo a passo)',
    '<section class="col gap24" style="flex:1;justify-content:center">' +
    '<h2 class="h2 w" data-s="1" style="font-size:38px">Montando a casa em <span class="gold">5 cliques</span></h2>' +
    '<div class="row" style="gap:88px;align-items:flex-start;margin-top:8px">' +
    '<div class="win" style="width:820px;height:600px"><div class="bar0"><i></i><i></i><i></i><div class="url">business.facebook.com</div></div>' +
    '<div class="body"><h4>Passo 1 · Criar</h4><p class="hint">Entre com o seu Facebook pessoal (perfil real).</p>' +
    '<div class="ui-row"><span>Seu portfólio empresarial</span><span class="ui-btn hit" data-h="1" data-label="Criar o portfólio">Criar</span></div>' +
    '<p class="hint" style="margin-top:20px">Preencha: nome do negócio, o seu nome e um e-mail de trabalho.</p>' +
    '<div class="ui-row"><span style="color:#8a91a1">Nome do negócio</span></div><div class="ui-row"><span style="color:#8a91a1">E-mail de trabalho</span></div>' +
    '<div class="ribbon">Tela ilustrativa</div></div></div>' +
    '<div class="win" style="width:820px;height:600px"><div class="bar0"><i></i><i></i><i></i><div class="url">Configurações · Contas</div></div>' +
    '<div class="body"><h4>Passo 2 · Adicionar as peças</h4>' +
    '<div class="ui-row"><span class="row gap16" style="align-items:center"><i class="ico"></i>Página</span><span class="ui-btn hit" data-h="2" data-label="Adicione a Página">Adicionar</span></div>' +
    '<div class="ui-row"><span class="row gap16" style="align-items:center"><i class="ico"></i>Instagram</span><span class="ui-btn hit" data-h="3" data-label="Adicione o Instagram">Adicionar</span></div>' +
    '<div class="ui-row"><span class="row gap16" style="align-items:center"><i class="ico"></i>Conta de anúncios</span><span class="ui-btn hit" data-h="4" data-label="Crie a conta de anúncios">Criar</span></div>' +
    '<div class="ui-row"><span class="row gap16" style="align-items:center"><i class="ico"></i>Forma de pagamento</span><span class="ui-btn hit" data-h="5" data-label="Cadastre o pagamento">Cadastrar</span></div>' +
    '<div class="ribbon">Tela ilustrativa</div></div></div>' +
    '</div>' +
    '</section>',
    'FALE: Mostre o caminho, não decore os menus: a Meta muda os nomes e a posição dos botões com frequência. O raciocínio é sempre o mesmo: criar o portfólio, adicionar Página, Instagram e conta de anúncios, e cadastrar o pagamento.\nDICA: na conta de anúncios, defina com cuidado moeda (real) e fuso horário: depois não dá para mudar.\nFAÇA: Ao vivo, se tiver internet, abra business.facebook.com para mostrar a tela real depois da simulação.');

  add(2, 'aquecimento', 'Conta saudável: o aquecimento',
    '<section class="col gap34" style="flex:1;justify-content:center">' +
    '<h1 class="h1 w" data-s="1" style="font-size:50px">Conta saudável: o <span class="gold">“aquecimento”</span></h1>' +
    '<ul class="checks" style="margin-top:6px">' +
    '<li data-s="2">Perfil real, completo e com foto</li>' +
    '<li data-s="3">Instagram profissional ligado à Página</li>' +
    '<li data-s="4">Verificação em duas etapas ligada</li>' +
    '<li data-s="5">Use a conta por alguns dias antes de anunciar: poste e responda</li>' +
    '<li data-s="6">Comece com valor baixo e aumente aos poucos</li>' +
    '</ul>' +
    '<p class="small w" data-s="7">Sem atalhos: contas compradas ou alugadas colocam tudo em risco.</p>' +
    '</section>',
    'FALE: "Aquecer" a conta é dar histórico de uso real antes de investir alto. Perfil verdadeiro, dados corretos, uso normal. Isso reduz o risco, mas não existe garantia: a Meta pode analisar qualquer conta.\nDICA: ao aumentar o orçamento, faça aos poucos (por exemplo, subir cerca de 20% por vez) em vez de dobrar de uma vez.\nFAÇA: Deixe claro: não ensinamos atalhos nem contas de terceiros. É conta limpa, regras seguidas.');

  add(2, 'perfil', 'Um bom perfil de Instagram',
    '<section class="row" style="flex:1;gap:70px;align-items:center">' +
    '<div class="col gap34 grow">' +
    '<h1 class="h1 w" data-s="1" style="font-size:50px">O perfil é a sua <span class="gold">vitrine</span></h1>' +
    '<ul class="checks"><li data-s="2">Foto ou logo nítida</li><li data-s="3">Bio com a promessa e a cidade</li><li data-s="4">Botão do WhatsApp no topo</li><li data-s="5">Destaques: serviços, preços e depoimentos</li><li data-s="6">Últimos posts organizados</li></ul>' +
    '<p class="small w" data-s="7">Quem clica no anúncio vai olhar o seu perfil antes de chamar.</p>' +
    '</div>' +
    img('perfil-instagram', 'Exemplo de um bom perfil de Instagram', 820, 447, 2) +
    '</section>',
    'FALE: Antes de pagar por anúncio, arrume a vitrine. Quem vê o anúncio quase sempre abre o perfil antes de mandar mensagem. Bio clara, botão de WhatsApp e destaques organizados fazem diferença.\nFAÇA: Peça para alguém abrir o próprio perfil e conferir os 5 itens da lista.\nDICA: a imagem é um exemplo gerado por IA; o modelo do prompt está no material de apoio.');

  add(2, 'contingencia', 'Contingências (plano B)',
    '<section class="col gap34" style="flex:1;justify-content:center">' +
    '<h1 class="h1 w" data-s="1" style="font-size:50px">Plano B <span class="gold">antes do problema</span></h1>' +
    '<div class="grid2">' +
    '<div class="card g" data-s="2"><div class="tag">Dois administradores</div><p class="p m" style="margin-top:10px">Você e uma pessoa de confiança, com acesso total.</p></div>' +
    '<div class="card g" data-s="3"><div class="tag">Recuperação em dia</div><p class="p m" style="margin-top:10px">E-mail, telefone e verificação em duas etapas atualizados.</p></div>' +
    '<div class="card g" data-s="4"><div class="tag">Dados guardados</div><p class="p m" style="margin-top:10px">Anote os números do portfólio, da Página e da conta de anúncios.</p></div>' +
    '<div class="card g" data-s="5"><div class="tag">Contatos fora da rede</div><p class="p m" style="margin-top:10px">Tenha sua lista de clientes também no WhatsApp.</p></div>' +
    '</div>' +
    '<p class="p w" data-s="6" style="font-size:38px">Se algo for bloqueado: <span class="gold">peça análise, aguarde</span> e não abra várias contas novas.</p>' +
    '</section>',
    'FALE: Contingência é preparar o plano B antes de precisar dele. Segundo administrador, recuperação atualizada, números guardados e contatos fora da plataforma. Se bloquear, peça análise pelos canais oficiais e aguarde: abrir contas novas em sequência piora.\nFAÇA: Pergunte quem já teve conta bloqueada. Normalmente tem alguém, e isso engaja.');

  /* ================= BLOCO 3 · PÚBLICOS (20–26 min) ================= */

  add(3, 'seguidor', 'Seguidor não é cliente',
    '<section class="row" style="flex:1;gap:56px;align-items:center">' +
    '<div class="col gap24 grow">' +
    '<h1 class="h1 w" data-s="1" style="font-size:50px">Seguidor <span class="gold">não é</span> cliente</h1>' +
    '<div class="card" data-s="2"><div class="tag" style="color:#e2766b">Seguidores</div>' +
    '<p class="p m" style="margin-top:12px">Apertou “seguir” um dia. Número bonito, venda incerta.</p></div>' +
    '<div class="card g" data-s="3"><div class="tag">Quem assistiu seu vídeo</div>' +
    '<p class="p m" style="margin-top:12px">Assistiu 50% a 75%. Interesse recente e real, mais perto de comprar.</p></div>' +
    '<p class="p w" data-s="4">Número bonito não paga conta. <span class="gold">Interesse real, sim.</span></p>' +
    '</div>' +
    img('seguidor-x-cliente', 'Seguidor x cliente', 660, 660, 2) +
    '</section>',    'FALE: Seguidor é quem apertou o botão um dia. Quem assistiu 75% do seu vídeo escolheu gastar tempo com você agora. Para anunciar, o segundo público quase sempre rende mais.\nFAÇA: Exemplo: "tenho 5 mil seguidores e vendo pouco" é comum. O que importa é quem está quente hoje.');

  add(3, 'mock-publicos', 'Criando públicos (passo a passo)',
    '<section class="col gap24" style="flex:1;justify-content:center">' +
    '<h2 class="h2 w" data-s="1" style="font-size:38px">Criando o público de <span class="gold">quem assistiu</span></h2>' +
    '<div class="row" style="gap:88px;align-items:flex-start;margin-top:8px">' +
    '<div class="win" style="width:820px;height:600px"><div class="bar0"><i></i><i></i><i></i><div class="url">Gerenciador de Anúncios</div></div>' +
    '<div class="body row" style="gap:28px"><div class="ui-menu" style="width:230px"><div>Campanhas</div><div>Conjuntos</div><div>Anúncios</div><div class="hit on" data-h="1" data-label="Abra Públicos">Públicos</div></div>' +
    '<div class="grow"><div class="row" style="justify-content:space-between;align-items:center;margin-bottom:14px"><h4 style="margin:0">Públicos</h4><span class="ui-btn hit" data-h="2" data-label="Criar público">Criar público</span></div>' +
    '<div class="ui-row hit" data-h="3" data-label="Público personalizado"><span>Público personalizado</span></div><div class="ui-row"><span>Público semelhante</span></div><div class="ui-row"><span>Público salvo</span></div>' +
    '<div class="ribbon">Tela ilustrativa</div></div></div></div>' +
    '<div class="win" style="width:820px;height:600px"><div class="bar0"><i></i><i></i><i></i><div class="url">Público personalizado · Fonte</div></div>' +
    '<div class="body"><h4>De onde vem o público?</h4>' +
    '<div class="ui-opt">Site</div><div class="ui-opt">Lista de clientes</div><div class="ui-opt hit" data-h="4" data-label="Engajamento">Engajamento</div>' +
    '<div class="row gap16" style="margin-top:6px"><div class="ui-opt hit grow" data-h="5" data-label="Vídeo">Vídeo</div><div class="ui-opt grow">Perfil do Instagram</div></div>' +
    '<div class="ui-row sel hit" data-h="6" data-label="75% · 30 dias"><span>Assistiu 75% do vídeo · últimos 30 dias</span></div>' +
    '<div class="ribbon">Tela ilustrativa</div></div></div>' +
    '</div>' +
    '</section>',
    'FALE: Caminho: Públicos, Criar público, Público personalizado, Engajamento, Vídeo, e escolha "assistiu 75%" nos últimos 30 dias. Dê um nome claro, por exemplo "VIDEO 75% 30d".\nDICA: o mesmo caminho serve para o perfil do Instagram (quem interagiu com você), mas o público de vídeo costuma ser o mais qualificado.\nFAÇA: O público só funciona se você tem vídeos publicados. Reforce que vídeo é a matéria-prima.');

  add(3, 'escada', 'Frio, morno e quente',
    '<section class="col gap34" style="flex:1;justify-content:center">' +
    '<h1 class="h1 w" data-s="1" style="font-size:50px">Frio, morno e <span class="gold">quente</span></h1>' +
    '<div class="row gap34" style="align-items:flex-end;margin-top:8px">' +
    '<div class="card grow" data-s="2" style="min-height:300px"><div class="tag">Frio</div><p class="h3" style="margin-top:10px">Ainda não te conhece</p><p class="small" style="margin-top:12px">Anuncie por região e idade.</p></div>' +
    '<div class="card g grow" data-s="3" style="min-height:390px"><div class="tag">Morno</div><p class="h3" style="margin-top:10px">Viu seu vídeo</p><p class="small" style="margin-top:12px">Público “assistiu 75%”.</p></div>' +
    '<div class="card g grow" data-s="4" style="min-height:480px;border-color:var(--gold-l)"><div class="tag">Quente</div><p class="h3" style="margin-top:10px">Chamou no WhatsApp</p><p class="small" style="margin-top:12px">Converse e feche a venda.</p></div>' +
    '</div>' +
    '<p class="small w" data-s="5">O caminho: frio vira morno, morno vira quente, quente vira cliente.</p>' +
    '</section>',
    'FALE: Pensem numa escada. Pessoa fria não te conhece, anuncie para ela por região e idade. Quem viu seu vídeo está morna, anuncie de novo para ela. Quem chamou no WhatsApp está quente: atenda rápido.\nFAÇA: Reforce que o atendimento rápido no WhatsApp vale tanto quanto o anúncio.');

  /* ================= BLOCO 4 · CAMPANHA DE MENSAGENS (26–32 min) ================= */

  add(4, 'vira-conversa', 'Anúncio que vira conversa',
    '<section class="col gap48" style="flex:1;justify-content:center">' +
    '<h1 class="h1 w" data-s="1" style="font-size:50px">O anúncio que vira <span class="gold">conversa</span></h1>' +
    '<div class="row" style="align-items:stretch;gap:10px;margin-top:10px">' +
    '<div class="card grow" data-s="2"><div class="tag">1</div><p class="h3" style="margin-top:8px">Anúncio no Instagram</p></div>' + arrow(3) +
    '<div class="card grow" data-s="3"><div class="tag">2</div><p class="h3" style="margin-top:8px">Botão “Enviar mensagem”</p></div>' + arrow(4) +
    '<div class="card grow" data-s="4"><div class="tag">3</div><p class="h3" style="margin-top:8px">Conversa no WhatsApp</p></div>' + arrow(5) +
    '<div class="card g grow" data-s="5"><div class="tag">4</div><p class="h3" style="margin-top:8px">Venda</p></div>' +
    '</div>' +
    '<p class="p w" data-s="6">Para pequenos negócios, é o caminho <span class="gold">mais curto</span> até o cliente.</p>' +
    '</section>',
    'FALE: A campanha de mensagens leva a pessoa direto do anúncio para a conversa no WhatsApp ou no Direct. Para serviço, comércio e atendimento, é o caminho mais curto e mais simples para quem está começando.\nFAÇA: Pergunte quem vende pelo WhatsApp hoje. Quase todos levantam a mão.');

  add(4, 'mock-campanha', 'Criando a campanha (passo a passo)',
    '<section class="col gap24" style="flex:1;justify-content:center">' +
    '<h2 class="h2 w" data-s="1" style="font-size:38px">Campanha de mensagens em <span class="gold">6 passos</span></h2>' +
    '<div class="win" style="height:620px;margin-top:8px"><div class="bar0"><i></i><i></i><i></i><div class="url">Gerenciador de Anúncios · Criar campanha</div><span class="ui-btn hit" data-h="1" data-label="Clique em Criar" style="font-size:22px;padding:8px 22px">+ Criar</span></div>' +
    '<div class="body grid3" style="gap:26px">' +
    '<div><h4>1 · Objetivo</h4><div class="ui-opt">Reconhecimento</div><div class="ui-opt">Tráfego</div><div class="ui-opt hit" data-h="2" data-label="Engajamento">Engajamento</div><div class="ui-opt">Vendas</div></div>' +
    '<div><h4>2 · Onde chegam?</h4><div class="ui-opt">Site</div><div class="ui-opt hit" data-h="3" data-label="Apps de mensagens">Apps de mensagens</div><div class="ui-opt">Perfil do Instagram</div><p class="hint" style="margin-top:10px">Escolha o WhatsApp (e o Direct, se quiser).</p></div>' +
    '<div><h4>3 · Ajustes</h4><div class="ui-row hit" data-h="4" data-label="Orçamento diário"><span>Orçamento diário</span><b>R$ 20</b></div><div class="ui-row hit" data-h="5" data-label="Escolha o público"><span>Público</span><b>Vídeo 75%</b></div><div class="ui-row hit" data-h="6" data-label="Botão de mensagem"><span>Botão</span><b>Enviar mensagem</b></div></div>' +
    '<div class="ribbon">Tela ilustrativa</div></div></div>' +
    '</section>',
    'FALE: Seis passos: Criar, objetivo Engajamento, local de conversão "Apps de mensagens" (WhatsApp), orçamento diário, público e o botão de mensagem. O valor mostrado (R$ 20) é só exemplo.\nATENÇÃO: o nome do objetivo varia por conta (Engajamento, Leads ou Vendas com destino em mensagens). Explique: "se o nome for outro, procurem o local de conversão em mensagens".\nFAÇA: Se tiver internet, mostre a tela real depois da simulação.');

  add(4, 'regras', 'Regras da primeira campanha',
    '<section class="row" style="flex:1;gap:56px;align-items:center">' +
    '<div class="col gap34 grow">' +
    '<h1 class="h1 w" data-s="1" style="font-size:50px">Regras da <span class="gold">primeira campanha</span></h1>' +
    '<div class="col gap24">' +
    '<div class="row gap24" data-s="2" style="align-items:center"><span class="badge">1</span><p class="p m">Um objetivo: <b>conversas no WhatsApp</b></p></div>' +
    '<div class="row gap24" data-s="3" style="align-items:center"><span class="badge">2</span><p class="p m">Um público e <b>dois anúncios</b> para comparar</p></div>' +
    '<div class="row gap24" data-s="4" style="align-items:center"><span class="badge">3</span><p class="p m">Valor baixo e <b>paciência</b>: dê alguns dias</p></div>' +
    '</div>' +
    '<div class="chat" data-s="5" style="margin-top:14px"><span class="who">Mensagem inicial pronta</span><div class="txt">Oi! Vi seu anúncio e quero saber mais.</div></div>' +
    '</div>' +
    img('campanha-config', 'Configurações da campanha', 760, 475, 2) +
    '</section>',    'FALE: Três regras simples: um objetivo, um público com dois anúncios para comparar, e paciência. Mexer todo dia atrapalha a entrega. A mensagem inicial pré-preenchida facilita para o cliente clicar e enviar.\nFAÇA: Reforce o atendimento: quem demora a responder desperdiça o dinheiro do anúncio.');

  /* ================= BLOCO 5 · LANDING PAGE COM IA (32–38 min) ================= */

  add(5, 'lp-minutos', 'Sua página em minutos',
    '<section class="col gap48" style="flex:1;justify-content:center">' +
    '<h1 class="h1 w" data-s="1" style="font-size:50px">Sua página no ar <span class="gold">em minutos</span></h1>' +
    '<div class="row" style="align-items:stretch;gap:10px;margin-top:10px">' +
    '<div class="card grow" data-s="2"><div class="tag">1 · Descreva</div><p class="p m" style="margin-top:10px">Diga o que você vende e para quem.</p></div>' + arrow(3) +
    '<div class="card g grow" data-s="3"><div class="tag">2 · A IA cria</div><p class="p m" style="margin-top:10px">O Claude monta a página completa.</p></div>' + arrow(4) +
    '<div class="card grow" data-s="4"><div class="tag">3 · Publique</div><p class="p m" style="margin-top:10px">Use o link no anúncio e no WhatsApp.</p></div>' +
    '</div>' +
    '<p class="small w" data-s="5">Landing page é uma página com um único objetivo: levar o visitante a chamar você.</p>' +
    '</section>',
    'FALE: Landing page é uma página com um único objetivo. Antes, isso custava dias e dinheiro. Com a IA, você descreve e ela monta. Para campanhas de mensagens a página é opcional, mas ajuda a dar credibilidade.\nFAÇA: Avise que vai criar uma página agora, ao vivo.');

  add(5, 'prompt-lp', 'Prompt da landing page',
    '<section class="col gap34" style="flex:1;justify-content:center">' +
    '<div class="row gap24" style="align-items:center">' + img('claude-logo', 'Logo do Claude', 96, 96, 0, 'border-radius:22px') + '<h1 class="h1 w" data-s="1" style="font-size:50px">O pedido para o <span class="gold">Claude</span></h1></div>' +
    '<div class="chat" data-s="2" style="margin-top:10px"><span class="who">Você escreve</span>' +
    '<div class="txt w slow" data-s="2" style="font-size:34px">Crie uma página de vendas em um único arquivo HTML, pensada para celular, para <span class="ph">[meu negócio]</span> em <span class="ph">[minha cidade]</span>. Inclua: título com a promessa principal, 3 benefícios, um espaço para depoimento, perguntas frequentes e um botão grande que abre o meu WhatsApp. Use as cores <span class="ph">[cores da marca]</span> e palavras simples.</div></div>' +
    '</section>',
    'FALE: Leia o pedido em voz alta enquanto a bolinha escreve. Destaque os campos entre colchetes: negócio, cidade e cores.\nFAÇA: Prepare a conta do Claude logada no computador ou no celular antes do evento. Esteja com o WhatsApp e o nome do negócio de exemplo em mente.');

  add(5, 'demo-lp', 'Demonstração ao vivo',
    '<section class="row" style="flex:1;gap:90px;align-items:center">' +
    '<div class="col gap34 grow">' +
    '<div class="tag w" data-s="1">Ao vivo</div>' +
    '<h1 class="h1 w" data-s="2" style="font-size:56px">Vamos criar uma página <span class="gold">agora</span></h1>' +
    '<ul class="checks" style="margin-top:6px"><li data-s="3">Promessa clara no topo</li><li data-s="4">3 benefícios</li><li data-s="5">Prova: depoimento</li><li data-s="6">Botão do WhatsApp</li></ul>' +
    '</div>' +
    img('landing-claude-celular', 'Criando a página no Claude, pelo celular', 820, 447, 3) +
    '</section>',    'FAÇA (ao vivo): 1) Abra o Claude. 2) Cole o pedido da tela anterior preenchido com um negócio da plateia. 3) Mostre a página gerada e como testar no celular. 4) Mostre onde fica a opção de compartilhar/publicar para gerar um link.\nPLANO B: se a internet falhar, use esta tela como exemplo do resultado e diga que o passo a passo está no material do aluno.\nTEMPO: mantenha a demonstração em até 3 minutos.');

  /* ================= BLOCO 6 · IA NAS CAMPANHAS (38–43 min) ================= */

  add(6, 'tres-numeros', 'Os 3 números que importam',
    '<section class="col gap34" style="flex:1;justify-content:center">' +
    '<h1 class="h1 w" data-s="1" style="font-size:50px">Só <span class="gold">3 números</span> importam</h1>' +
    '<div class="grid3">' +
    '<div class="card g" data-s="2"><div class="tag">Custo por conversa</div><div class="num" data-to="4.2" data-dec="2" data-pre="R$ " style="margin:16px 0 8px">R$ 0,00</div><p class="small">exemplo · quanto você paga por cada pessoa que chama</p></div>' +
    '<div class="card g" data-s="3"><div class="tag">Conversas que viram venda</div><p class="p m" style="margin-top:20px">Você anota. É o número que paga a conta.</p></div>' +
    '<div class="card g" data-s="4"><div class="tag">Anúncio cansado</div><p class="p m" style="margin-top:20px">Resultado caiu e o vídeo aparece demais? Troque o criativo.</p></div>' +
    '</div>' +
    '<p class="small w" data-s="5">Curtida bonita não é resultado. Venda é.</p>' +
    '</section>',
    'FALE: Esqueça dezenas de métricas. Três bastam: quanto custa cada conversa, quantas viram venda (só você sabe, anote) e se o anúncio cansou. Métrica de vaidade, como curtida, não paga conta.\nNOTA: o valor R$ 4,20 é só exemplo e vem marcado assim na tela.');

  add(6, 'ler-ia', 'Peça para o Claude ler por você',
    '<section class="col gap34" style="flex:1;justify-content:center">' +
    '<h1 class="h1 w" data-s="1" style="font-size:50px">Peça ao <span class="gold">Claude</span> para ler por você</h1>' +
    '<div class="grid3">' +
    '<div class="card" data-s="2"><span class="badge">1</span><p class="p m" style="margin-top:14px">Tire um print do relatório</p></div>' +
    '<div class="card" data-s="3"><span class="badge">2</span><p class="p m" style="margin-top:14px">Envie o print ao Claude</p></div>' +
    '<div class="card g" data-s="4"><span class="badge">3</span><p class="p m" style="margin-top:14px">Faça a pergunta certa</p></div>' +
    '</div>' +
    '<div class="chat" data-s="5" style="margin-top:12px"><span class="who">Você escreve</span><div class="txt w" data-s="5" style="font-size:33px">Este é o print da minha campanha de mensagens. Explique com palavras simples: o que está funcionando, o que está caro, o que pausar e o que testar na próxima semana.</div></div>' +
    '<p class="small w" data-s="6">A IA sugere. Quem decide é você.</p>' +
    '</section>',
    'FALE: Em vez de decifrar relatório, tire um print e peça para a IA explicar em palavras simples. Mas a decisão final é sua: a IA não conhece seu cliente como você.\nFAÇA: Se tiver um print de campanha real (sem dados de cliente), mostre ao vivo a resposta.');

  /* ================= BLOCO 7 · PRÁTICA (43–48 min) ================= */

  add(7, 'pratica', 'Prática com QR code',
    '<section class="row" style="flex:1;gap:70px;align-items:center">' +
    '<div class="col gap34 grow">' +
    '<div class="tag w" data-s="1">Mão na massa</div>' +
    '<h1 class="h1 w" data-s="1" style="font-size:54px">Faça a sua <span class="gold">persona</span> agora</h1>' +
    '<div class="col gap24" data-s="2"><div class="row gap24" style="align-items:center"><span class="badge o">1</span><p class="p m">Aponte a câmera para o QR code</p></div>' +
    '<div class="row gap24" style="align-items:center"><span class="badge o">2</span><p class="p m">Abra o Claude no celular (conta grátis)</p></div>' +
    '<div class="row gap24" style="align-items:center"><span class="badge o">3</span><p class="p m">Copie o pedido, preencha e envie</p></div></div>' +
    '</div>' +
    '<div class="col center gap24" style="flex:none;width:520px"><div class="qr l" data-qr="pratica" data-s="3"></div>' +
    '<div class="cd" data-s="4" data-sec="300"><svg viewBox="0 0 200 200"><circle class="cdb" cx="100" cy="100" r="90" fill="none" stroke-width="10"/><circle class="cda" cx="100" cy="100" r="90" fill="none" stroke-width="10"/></svg><div class="cdt">5:00</div></div></div>' +
    '</section>',
    'FAÇA: Dê 5 minutos. O cronômetro começa no último passo. Circule pela sala ajudando quem travar na criação da conta do Claude (e-mail ou Google) e na cópia do pedido.\nFALE: "Escreva o nome do seu negócio, a cidade e envie. Em segundos vocês terão a persona."\nIMPORTANTE: o QR leva ao material do aluno, direto na seção Prática. O site precisa estar publicado.');

  add(7, 'celular', 'Para quem só tem celular',
    '<section class="row" style="flex:1;gap:70px;align-items:center">' +
    '<div class="col gap34 grow">' +
    '<h1 class="h1 w" data-s="1" style="font-size:50px">Tudo isso funciona <span class="gold">no celular</span></h1>' +
    '<div class="grid2" style="gap:24px">' +
    '<div class="card g" data-s="2"><div class="tag">App</div><p class="h3" style="margin-top:8px">Claude</p><p class="small">Persona, roteiros, página</p></div>' +
    '<div class="card g" data-s="3"><div class="tag">App</div><p class="h3" style="margin-top:8px">Instagram</p><p class="small">Perfil profissional</p></div>' +
    '<div class="card g" data-s="4"><div class="tag">App</div><p class="h3" style="margin-top:8px">Meta Business Suite</p><p class="small">Gerenciar e anunciar</p></div>' +
    '<div class="card g" data-s="5"><div class="tag">Material</div><p class="h3" style="margin-top:8px">PDF e site</p><p class="small">Passo a passo para guardar</p></div>' +
    '</div>' +
    '<p class="p w" data-s="6">Você <span class="gold">não precisa</span> de computador para começar.</p>' +
    '</div>' +
    img('suite-celular', 'Gerenciador de anúncios no celular', 780, 425, 2) +
    '</section>',    'FALE: Reforce para quem veio sem computador: tudo o que mostrei funciona no celular, e o material do aluno traz o passo a passo para guardar.\nNOTA: os nomes dos aplicativos podem mudar. Confirme no dia.');

  /* ================= BLOCO 8 · PRÓXIMO PASSO (48–50 min) ================= */

  add(8, 'resumo', 'Resumo: o caminho em 6 passos',
    '<section class="col gap34" style="flex:1;justify-content:center">' +
    '<h1 class="h1 w" data-s="1" style="font-size:50px">O caminho em <span class="gold">6 passos</span></h1>' +
    '<div class="rel" style="margin-top:20px;padding-top:8px">' +
    '<svg class="draw" data-s="2" width="1728" height="80" viewBox="0 0 1728 80" style="position:absolute;left:0;top:0"><path class="st" d="M144 40 H1584"/></svg>' +
    '<div style="display:grid;grid-template-columns:repeat(6,1fr);gap:0;position:relative">' +
    '<div class="col center gap16" data-s="3"><span class="badge">1</span><p class="small" style="color:var(--ink)">Persona</p></div>' +
    '<div class="col center gap16" data-s="4"><span class="badge">2</span><p class="small" style="color:var(--ink)">Conta segura</p></div>' +
    '<div class="col center gap16" data-s="5"><span class="badge">3</span><p class="small" style="color:var(--ink)">Públicos</p></div>' +
    '<div class="col center gap16" data-s="6"><span class="badge">4</span><p class="small" style="color:var(--ink)">Campanha de mensagens</p></div>' +
    '<div class="col center gap16" data-s="7"><span class="badge">5</span><p class="small" style="color:var(--ink)">Página no ar</p></div>' +
    '<div class="col center gap16" data-s="8"><span class="badge">6</span><p class="small" style="color:var(--ink)">Ler e ajustar com IA</p></div>' +
    '</div></div>' +
    '</section>',
    'FALE: Resuma em 30 segundos: persona, conta segura, públicos, campanha de mensagens, página no ar e leitura com IA. É o mesmo caminho do material do aluno.\nTEMPO: este bloco final dura 2 minutos. Seja direto.');

  add(8, 'contato', 'Contato e próximo passo',
    '<section class="row" style="flex:1;gap:60px;align-items:center">' +
    '<div class="col gap24 grow">' +
    '<div class="tag w" data-s="1">Próximo passo</div>' +
    '<h1 class="h1 w" data-s="2" style="font-size:48px">Quer ajuda para colocar <span class="gold">em prática?</span></h1>' +
    '<p class="p m w" data-s="3">Me chame no WhatsApp: vamos olhar o seu caso e montar o seu plano.</p>' +
    '<div class="col gap10" data-s="4" style="margin-top:6px"><p class="h3 goldl">{{nome}} · {{cargo}}</p><p class="p m">{{wa}} · {{site}}</p></div>' +
    '<div class="igpill" data-s="7"><span class="igdot"></span><div><b>Veja os depoimentos no Instagram</b><span>{{igx}}</span></div></div>' +
    '</div>' +
    '<div class="row gap34" style="flex:none;align-items:flex-start">' +
    '<div class="col center gap16" data-s="5"><div class="qr m" data-qr="wa"></div><p class="h3">WhatsApp</p></div>' +
    '<div class="col center gap16" data-s="6"><div class="qr s" data-qr="site" style="margin-top:35px"></div><p class="h3">Site</p></div>' +
    '<div class="col center gap16" data-s="7"><div class="qr s" data-qr="instagram" style="margin-top:35px"></div><p class="h3">Instagram</p></div>' +
    '</div>' +
    '</section>',    'FALE: Convide de forma leve: "Se você quer ajuda para colocar em prática, me chama no WhatsApp: a gente olha o seu caso e monta o seu plano." Não cite valores.\nFAÇA: Deixe esta tela por tempo suficiente para todos fotografarem o QR. Peça para mandarem uma mensagem ainda hoje, mesmo que seja só o nome do negócio.\nCONFIRA: o número de WhatsApp está em js/config.js. Teste o QR antes do evento.');

  add(8, 'final', 'Obrigado',
    '<section class="col center mid gap34" style="flex:1">' +
    '<img data-s="1" src="img/logo-j2c.png" alt="J2C Digital" style="width:500px;height:auto">' +
    '<h1 class="h1 big w" data-s="2" style="font-size:72px">Obrigado!</h1>' +
    '<p class="p w" data-s="3" style="max-width:1400px">{{nome}} · {{cargo}}</p>' +
    '<div class="igpill" data-s="4"><span class="igdot"></span><div><b>Depoimentos e bastidores no Instagram</b><span>{{igx}}</span></div></div>' +
    '<p class="small w" data-s="5">Estratégia que posiciona | Tráfego que escala | Vídeo que converte</p>' +
    '</section>',    'FALE: Agradeça, lembre do QR do material do aluno e do contato. Abra para perguntas se sobrar tempo.',
    { hud: false });

  /* ---- passos por tela ---- */
  S.forEach(function (sc) {
    var m, max = 1, re = /data-(?:s|h)="(\d+)"/g;
    while ((m = re.exec(sc.html))) max = Math.max(max, parseInt(m[1], 10));
    sc.steps = max;
  });

  var FIX = { pratica: 270, celular: 30 };
  S.forEach(function (x) { if (FIX[x.id]) x.sec = FIX[x.id]; });
  /* tempo planejado por tela (segundos): divide o tempo do bloco, respeitando as telas com tempo fixo */
  Object.keys(BLOCKS).forEach(function (b) {
    var list = S.filter(function (x) { return String(x.block) === b; });
    var total = (BLOCKS[b].end - BLOCKS[b].start) * 60, fixed = 0, free = 0;
    list.forEach(function (x) { if (x.sec) fixed += x.sec; else free++; });
    list.forEach(function (x) { if (!x.sec) x.sec = Math.round(Math.max(20, (total - fixed) / free)); });
  });
  window.J2C_BLOCKS = BLOCKS;
  window.J2C_SCENES = S;
})();
