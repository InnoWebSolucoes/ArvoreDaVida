export const AI_MODEL = "gpt-4o";
export const AI_URL   = import.meta.env.VITE_AI_URL || "https://api.openai.com/v1/responses";

export const AREAS = [
  { key:"raizes",     label:"🌱 Raízes",        color:"#8B5E3C", desc:"Quem sou de verdade, mesmo quando ninguém está olhando. Valores, caráter, sombras. O passado no presente. Resolver o que ficou inacabado." },
  { key:"tronco",     label:"🌳 Tronco",         color:"#3A7D3A", desc:"Como ajo e interajo com o mundo. Estrutura do dia a dia, rotinas, momento presente. Ser eu mesma, ainda descobrindo quem sou." },
  { key:"seiva",      label:"💧 Seiva",           color:"#2A6FAA", desc:"Interações internas. Emocional, psicológico, sutil. Menos físico, mais sentido. Atemporal. O fluxo que conecta tudo." },
  { key:"flores",     label:"🌸 Flores",          color:"#8B3A8B", desc:"Quem quero me tornar. O futuro. Cada passo em direção a esse ideal me torna mais eu mesma. Realização em movimento." },
  { key:"frutos",     label:"🍎 Frutos",          color:"#AA3020", desc:"Marcos. Colheita. Celebração. Cada fruto abre espaço para a próxima florada." },
  { key:"seiva_elab", label:"🌿 Seiva Profunda",  color:"#2A7A55", desc:"Insights theta, sonhos, reflexão profunda. Nutrientes brutos se transformando em energia refinada para a vida." },
];

export const PRIO = [
  { key:"regar",  label:"Regar",  emoji:"💧", color:"#2A6FAA" },
  { key:"nutrir", label:"Nutrir", emoji:"🌿", color:"#3A7D3A" },
  { key:"podar",  label:"Podar",  emoji:"🌾", color:"#8B5E3C" },
];

export const CAT_COLORS = {
  raizes:"#8B5E3C", tronco:"#3A7D3A", seiva:"#2A6FAA",
  flores:"#8B3A8B", frutos:"#AA3020", seiva_elab:"#2A7A55",
};

export const CAT_LABELS = {
  raizes:"🌱 Raízes", tronco:"🌳 Tronco", seiva:"💧 Seiva",
  flores:"🌸 Flores", frutos:"🍎 Frutos", seiva_elab:"🌿 Seiva Profunda",
};

export const INIT_TASKS = [
  { id:"r1",  area:"raizes",     prio:"regar",  done:false, title:"Atualizar cadastro no Home Office",         detail:"A lei mudou. Verifique se o seu cadastro ainda está válido.",                      obj:"Cadastro confirmado e atualizado.",                  steps:["Acessar o portal do Home Office","Verificar situação atual","Atualizar se necessário","Guardar confirmação"],                                     notes:"" },
  { id:"r2",  area:"raizes",     prio:"regar",  done:false, title:"SAR ao DWP — histórico do JSA",             detail:"Saber exatamente que tipo de JSA recebeu. Direito legal, sem risco.",             obj:"Documentos históricos do DWP recebidos.",            steps:["Enviar email para sar@dwp.gov.uk","Nome, data de nascimento, NI, endereço 2016-17","Guardar cópia"],                                        notes:"" },
  { id:"r3",  area:"raizes",     prio:"regar",  done:false, title:"SAR ao HMRC — Child Benefit",               detail:"Confirmar que era universal e não por renda.",                                   obj:"Histórico do Child Benefit recebido.",               steps:["Enviar email para sar@hmrc.gov.uk","Nome, data de nascimento, NI","Guardar cópia"],                                                          notes:"" },
  { id:"r4",  area:"raizes",     prio:"regar",  done:false, title:"SAR ao TSB — histórico completo de extratos",detail:"Para anos além dos 7 disponíveis online. Gratuito, 30 dias.",                   obj:"Todos os extratos bancários recebidos.",             steps:["Enviar email para sar@tsb.co.uk","Solicitar todos desde [ano] até ao presente","Guardar cópia"],                                             notes:"" },
  { id:"r5",  area:"raizes",     prio:"nutrir", done:false, title:"Cadastro eleitoral — Guildford?",           detail:"Houve uma eleição e você não sabia. Verifique e corrija.",                       obj:"Cadastro atualizado no lugar certo.",                steps:["Verificar cadastro atual","Pesquisar como transferir","Regularizar para si e para os filhos"],                                             notes:"" },
  { id:"r6",  area:"raizes",     prio:"nutrir", done:false, title:"Documentar contribuições no divórcio",      detail:"Você contribuiu muito mais do que dinheiro.",                                    obj:"Documento escrito com linha do tempo completa.",     steps:["Anos trabalhados e rendimentos","Contribuições familiares não remuneradas","Plano de reforma — de quem foi a ideia","Contribuição na compra da casa"], notes:"" },
  { id:"r7",  area:"raizes",     prio:"nutrir", done:false, title:"Custos do carro — dividir com N a partir de setembro", detail:"N para de usar o carro dele. Esclarecer o acordo.",            obj:"Acordo claro e escrito.",                             steps:["Calcular custos atuais","Propor divisão","Formalizar"],                                                                                       notes:"" },
  { id:"r8",  area:"raizes",     prio:"podar",  done:false, title:"Escrever: quem sou eu — valores",           detail:"Não para ninguém ver. Uma âncora interior.",                                    obj:"Documento pessoal escrito e salvo.",                 steps:[],                                                                                                                                            notes:"" },
  { id:"t1",  area:"tronco",     prio:"regar",  done:false, title:"Recarregar o almoço escolar da Jo (£5)",    detail:"O saldo chegou a zero hoje.",                                                   obj:"Saldo recarregado.",                                 steps:["Portal da escola","Adicionar £5"],                                                                                                            notes:"" },
  { id:"t2",  area:"tronco",     prio:"regar",  done:false, title:"Combinar com N quem paga o almoço da Jo",   detail:"O saldo zerou em 2 dias. Urgente.",                                             obj:"Acordo claro sobre a responsabilidade.",             steps:["Falar com N","Combinar o valor","Organizar o pagamento"],                                                                                    notes:"" },
  { id:"t3",  area:"tronco",     prio:"regar",  done:false, title:"Responder ao questionário da escola",       detail:"A escola enviou. Ainda pendente.",                                              obj:"Questionário enviado.",                              steps:["Abrir email da escola","Preencher","Enviar"],                                                                                                notes:"" },
  { id:"t4",  area:"tronco",     prio:"regar",  done:false, title:"Email para a escola — falta médica da Jo",  detail:"O médico pode escrever para a escola se insistirem.",                           obj:"Falta reclassificada como justificada.",             steps:["Rascunhar email","Mencionar consulta e exames","Informar que o médico pode escrever","Enviar"],                                              notes:"" },
  { id:"t5",  area:"tronco",     prio:"regar",  done:false, title:"Pneu dianteiro esquerdo — 14psi e não 33",  detail:"Possível furo lento.",                                                          obj:"Pneu correto, causa identificada.",                  steps:["Verificar pressão","Posto de gasolina","Se baixar de novo: oficina"],                                                                         notes:"" },
  { id:"t6",  area:"tronco",     prio:"nutrir", done:false, title:"Ligar para 4 escolas + responder convite de exame", detail:"Ligar primeiro, depois decidir a resposta.",                          obj:"Decisão tomada.",                                    steps:["Ligar para escola 1","Ligar para escola 2","Ligar para escola 3","Ligar para escola 4","Responder ao convite"],                              notes:"" },
  { id:"t7",  area:"tronco",     prio:"nutrir", done:false, title:"Pagar acomodação da Ga",                    detail:"Valor, transferência, renovação do Students Finance.",                          obj:"Pagamento feito e SF renovado.",                     steps:["Verificar valor","Transferir","Renovar Students Finance","Confirmar"],                                                                       notes:"" },
  { id:"t8",  area:"tronco",     prio:"nutrir", done:false, title:"Estruturar rotina de estudos da Jo",        detail:"1h por dia, matérias, YouTube.",                                                obj:"Horário semanal combinado com a Jo.",                steps:["Listar matérias e datas dos exames","Encontrar vídeos no YouTube","Combinar com a Jo"],                                                        notes:"" },
  { id:"t9",  area:"tronco",     prio:"nutrir", done:false, title:"Encontrar atividade física para a Jo",      detail:"Pesquisar opções locais.",                                                      obj:"Atividade escolhida e matriculada.",                 steps:["Pesquisar opções","Verificar custos","Propor à Jo"],                                                                                          notes:"" },
  { id:"t10", area:"tronco",     prio:"podar",  done:false, title:"Terminar a cozinha — parte 2",              detail:"Metade limpa, metade ainda bagunçada.",                                         obj:"Cozinha totalmente limpa.",                          steps:["Continuar onde parou","Bancadas","Armários"],                                                                                                notes:"" },
  { id:"t11", area:"tronco",     prio:"podar",  done:false, title:"Jardim — separar itens para descartar",     detail:"Apenas o primeiro passo.",                                                     obj:"Jardim renovado ao longo de várias sessões.",        steps:["Separar descartes","Levar ao ponto de entrega","Limpar","Organizar o espaço","Plantar"],                                                      notes:"" },
  { id:"t12", area:"tronco",     prio:"podar",  done:false, title:"Espelho do carro — pedir no Amazon",        detail:"Quebrado há tempo demais.",                                                     obj:"Espelho novo instalado.",                            steps:["Encontrar o modelo do carro","Pesquisar no Amazon","Encomendar"],                                                                             notes:"" },
  { id:"s1",  area:"seiva",      prio:"regar",  done:false, title:"Coleta de alimentos — Sainsbury's",         detail:"Sextas 21h30. Usar a saída para abastecer também.",                             obj:"Coleta feita semanalmente.",                         steps:["Sair às 21h15","Coletar às 21h30","Abastecer se necessário"],                                                                                notes:"" },
  { id:"s2",  area:"seiva",      prio:"regar",  done:true,  title:"Adesivo HRT Evorel 50",                     detail:"Feito — Boots.",                                                                obj:"Adesivo trocado regularmente.",                      steps:[],                                                                                                                                            notes:"Feito a 8 de maio" },
  { id:"s3",  area:"seiva",      prio:"nutrir", done:false, title:"Marcar terapeuta",                          detail:"TDAH + pânico + divórcio + grande transição de vida.",                         obj:"Primeira sessão marcada.",                           steps:["Encontrar terapeuta","Entrar em contacto","Marcar"],                                                                                          notes:"" },
  { id:"s4",  area:"seiva",      prio:"nutrir", done:false, title:"Marcar exame médico",                       detail:"Solicitado pelo médico na consulta.",                                           obj:"Exame marcado.",                                     steps:["Verificar referência","Ligar para marcar"],                                                                                                  notes:"" },
  { id:"s5",  area:"seiva",      prio:"nutrir", done:false, title:"Organizar medicamentos — datas de coleta",  detail:"O que coletar este mês.",                                                      obj:"Lista completa com datas claras.",                   steps:["Listar todos os medicamentos","Verificar datas de coleta","Identificar o que coletar"],                                                        notes:"" },
  { id:"s6",  area:"seiva",      prio:"podar",  done:true,  title:"Caminhada de 20 minutos",                   detail:"Feito — centro da cidade.",                                                     obj:"Hábito diário de movimento.",                        steps:[],                                                                                                                                            notes:"Feito a 8 de maio" },
  { id:"f1",  area:"flores",     prio:"nutrir", done:false, title:"LinkedIn — foto e título (15 min)",         detail:"Não o CV completo. Apenas esses 2 campos.",                                    obj:"Perfil visível e atualizado.",                       steps:["Mudar foto","Título: Transição de carreira, aberta a oportunidades"],                                                                         notes:"" },
  { id:"f2",  area:"flores",     prio:"nutrir", done:false, title:"Escrever 5 coisas em que sou genuinamente boa", detail:"Lista honesta. Base para tudo.",                                          obj:"Lista escrita e salva.",                             steps:[],                                                                                                                                            notes:"" },
  { id:"f3",  area:"flores",     prio:"nutrir", done:false, title:"Falar com a Ga — maratona, exames, como ela está", detail:"Ela está nos exames agora.",                                          obj:"Conexão mantida.",                                   steps:[],                                                                                                                                            notes:"" },
  { id:"se1", area:"seiva_elab", prio:"nutrir", done:false, title:"Registrar insights theta conforme surgem",   detail:"O insight da Lucia esta manhã é um exemplo perfeito.",                        obj:"Insights registrados e transformados em ação.",      steps:["Escrever o que surgiu","Refletir sobre o padrão","Identificar uma ação concreta"],                                                            notes:"" },
];

export const INIT_DIARY = {
  "2026-05-10": {
    mood:"🙂", energy:"🔥", sleep:"5h",
    note:"Acordei naturalmente às 5h. Insight theta forte sobre Lucia. Muito mais energia — possivelmente o Evorel começando a agir. Manhã produtiva. Ótimas conversas com Ga e Ra. Plantas entregues. Duas coletas de alimentos com a Jo.",
    entries:[
      { time:"05:00", cat:"seiva",      text:"Acordei naturalmente às 5h — preocupada com a coleta de alimentos ainda espalhada na cozinha." },
      { time:"05:05", cat:"seiva_elab", text:"Insight theta: Lucia Já Vou Indo. A minha mãe me chamou de Lucia por causa desse livro — todos riram e eu me identifiquei com ela. A Lucia estava sempre se preparando, trabalhando, fazendo tudo certo, mas nunca chegava na hora ou chegava depois que a festa acabava. Ela só conseguiu aproveitar uma festa — na própria casa, carregada por amigos que a fizeram voar numa folha para chegar a tempo. Aquilo não era lentidão. Era TDAH. Ninguém falava sobre isso no Brasil nos anos 1980. Eu tinha 4 anos quando o livro foi publicado. Eu acreditei nisso e internalizei a Lucia." },
      { time:"05:05", cat:"seiva_elab", text:"Abri o app para ver o progresso e escrever. Me sentindo feliz com as conquistas de ontem. Me sentindo enraizada e como se as coisas estivessem avançando." },
      { time:"05:20", cat:"tronco",     text:"Fui para baixo arrumar a cozinha e tomar café e o remédio da manhã." },
      { time:"07:30", cat:"tronco",     text:"Pedi a N para ajudar a mover algo da porta da geladeira. Ele estava de cueca, foi ao banheiro, nunca voltou." },
      { time:"09:30", cat:"tronco",     text:"Voltei a dormir depois que N desapareceu. Acordei às 9h30." },
      { time:"09:30", cat:"tronco",     text:"N desceu, fez o café da manhã da Jo, perguntou se podia usar alimentos da coleta. Foi agradável." },
      { time:"10:00", cat:"tronco",     text:"Tomei café com a Jo juntas." },
      { time:"12:00", cat:"tronco",     text:"Incentivei a Jo a ajudar N no jardim. Ela foi. Mais tarde se ofereceu para vir à coleta de alimentos." },
      { time:"12:00", cat:"tronco",     text:"Plantas do jardim — envasamos, fomos ao ponto de entrega. Eles ajudaram, nos divertimos. Me senti produtiva." },
      { time:"14:00", cat:"flores",     text:"Longa conversa com a Ga — expliquei o projeto. Ela se sentiu motivada, foi à biblioteca estudar. Pensando em passar o aniversário dela aqui." },
      { time:"14:30", cat:"flores",     text:"Falei também com a Ra hoje." },
      { time:"19:30", cat:"frutos",     text:"Duas coletas de alimentos: 19h30 e 20h30. A Jo veio voluntariamente." },
      { time:"00:00", cat:"seiva",      text:"Noite anterior: reação alérgica ao adesivo Evorel na coxa — ardência. Tirei meio dormindo, coloquei um novo na manhã." },
      { time:"00:00", cat:"seiva",      text:"Noite anterior: fui dormir sem escovar os dentes depois de comer biscoitos na cama. Me senti mal por isso." },
    ]
  },
  "2026-05-09": {
    mood:"😔", energy:"🪫", sleep:"4h",
    note:"Noite sem dormir. Levantei às 6h para o lixo. Sertralina 50mg. N na sala a noite toda.",
    entries:[
      { time:"23:30", cat:"tronco", text:"Escova de dentes da Jo estava seca — ele não tinha escovado. N quando informado: Ele está lá em cima, está dormindo." },
      { time:"23:00", cat:"tronco", text:"Jo trouxe garrafa de Raki fechada do quarto de N para baixo, fingindo beber água. Mais tarde na cama abrindo e fechando garrafa vazia de Glenfarclas pelo som satisfatório." },
      { time:"06:00", cat:"tronco", text:"Levantei às 6h para colocar o lixo para fora. Fiz café. Pequenas tarefas. Voltei para a cama. Dormi aproximadamente das 7h às 9h." },
      { time:"09:00", cat:"seiva",  text:"Sertralina 50mg tomada. Organizei algumas coisas. Joguei um jogo. Assisti Inveja na Netflix. Adormeci." },
    ]
  },
  "2026-05-08": {
    mood:"🙂", energy:"⚡", sleep:"6h",
    note:"Primeiro adesivo Evorel 50. Kit de Educação Física para a Jo. Caminhada no centro da cidade.",
    entries:[
      { time:"08:25", cat:"tronco", text:"Levei Jo para a escola. Jo chegou às 8h34." },
      { time:"08:46", cat:"seiva",  text:"Boots — coletei o adesivo HRT Evorel 50 pela primeira vez. Caminhada pelo centro da cidade, 4 lojas, nada comprado." },
      { time:"09:46", cat:"seiva",  text:"OneStop: sorvete Carte D'Or 900ml por 3 libras, preço promocional honrado pelo caixa." },
      { time:"10:41", cat:"tronco", text:"Jo mandou mensagem pedindo o kit de Educação Física. O uniforme estava na gaveta e não na mochila. Entregue na escola às 11h05." },
      { time:"11:00", cat:"tronco", text:"Breve conversa com homem verificando carros sobre a multa de N." },
    ]
  },
};
