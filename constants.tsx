
import React from 'react';
import { Chapter } from './types';
import { 
  Shield, 
  Crown, 
  Users, 
  Sparkles
} from 'lucide-react';

export const COLORS = {
  bg: '#0a0a0a',
  accent: '#c9a227',
  accentHover: '#a68520',
  card: '#141414',
  border: 'rgba(201, 162, 39, 0.2)'
};

export const CHAPTERS: Chapter[] = [
  {
    id: 'chap-1',
    number: 1,
    title: 'O Líder',
    isPremium: false,
    sessions: [
      { 
        id: 'sess-1', 
        chapterId: 'chap-1', 
        title: 'O Chamado', 
        isPremium: false, 
        content: 'Todo movimento começa com uma voz que se levanta. O chamado não é racional, ele é visceral. É aquela sensação de que você não pode mais ficar parado. Pessoas seguem vozes, não posts. Moisés não queria liderar, mas quando Deus o chamou da sarça ardente, ele não pôde mais fugir. Seu chamado está escondido no que causa indignação em você. O que você não suporta mais ver no mundo?' 
      },
      { 
        id: 'sess-2', 
        chapterId: 'chap-1', 
        title: 'Estilo de Liderança', 
        isPremium: false, 
        content: 'Liderar é projetar energia e criar confiança. O estilo de liderança é o DNA invisível do movimento. Existem 4 energias principais: Mestre (autoridade pelo conhecimento), Profeta (inspira pela visão), Pastor (cria pertencimento) e Evangelista/Guerreiro (confronta sistemas e gera urgência). Josué equilibrou ser guerreiro enfrentando inimigos e pastor cuidando do povo. Descubra sua energia predominante.' 
      },
      { 
        id: 'sess-3', 
        chapterId: 'chap-1', 
        title: 'O Povo Escolhido', 
        isPremium: false, 
        content: 'A comunidade é o corpo vivo do movimento. O povo escolhido não é definido por conveniência, mas por identidade e propósito. Eles reconhecem sua autoridade e vivem seus símbolos. Como Israel, que foi selecionado para carregar uma promessa. Símbolos, rituais e linguagem comum reforçam esse laço. Sem comunidade, você tem apenas ideias; com ela, você tem uma força de transformação.' 
      },
      { 
        id: 'sess-4', 
        chapterId: 'chap-1', 
        title: 'A Terra Prometida', 
        isPremium: false, 
        content: 'A Terra Prometida é a promessa de quem eles se tornam ao escolher seguir você. Não é apenas um benefício tangível, é identitário. Moisés guiou o povo pelo deserto focado em um destino fértil e seguro. Sua promessa deve responder: O que a pessoa terá? Quem ela será? Como a vida dela será transformada? A promessa é a âncora que mantém a comunidade coesa.' 
      },
      { 
        id: 'sess-5', 
        chapterId: 'chap-1', 
        title: 'A Nova Aliança', 
        isPremium: false, 
        content: 'Toda promessa precisa de um veículo: a Nova Aliança. O seu produto é o instrumento que transforma visão em experiência. Jesus prometeu o Reino, mas a aliança era o caminho. O produto formaliza o compromisso do indivíduo com o movimento. Ele deve ser apresentado como único e diferente de tudo o que o "velho mercado" oferece.' 
      }
    ]
  },
  {
    id: 'chap-2',
    number: 2,
    title: 'O Inimigo',
    isPremium: true,
    sessions: [
      { 
        id: 'sess-6', 
        chapterId: 'chap-2', 
        title: 'O Grande Problema', 
        isPremium: true, 
        content: 'Um movimento precisa de um obstáculo que unifica e cria urgência. O Inimigo é a força que se opõe à sua Terra Prometida. Pode ser um grupo, um sistema ou uma mentalidade (ex: o pecado, a mediocridade, a cultura do atalho). Sem inimigo claro, não há necessidade de ação imediata. Identificar o inimigo liberta o povo porque mostra que o seu movimento é a solução para vencê-lo.' 
      }
    ]
  },
  {
    id: 'chap-3',
    number: 3,
    title: 'A Verdade',
    isPremium: true,
    sessions: [
      { 
        id: 'sess-7', 
        chapterId: 'chap-3', 
        title: 'A Profecia', 
        isPremium: true, 
        content: 'Toda profecia nasce para quebrar um ciclo. A Profecia é a "Grande Verdade" que reordena a realidade do seu povo. Jesus disse: "Eu sou o caminho, a verdade e a vida". Marcas e movimentos nascem quando uma verdade central é revelada. Ela funciona como o ponto de convergência que torna todas as outras objeções secundárias ou irrelevantes.' 
      },
      { 
        id: 'sess-8', 
        chapterId: 'chap-3', 
        title: 'A Revelação', 
        isPremium: true, 
        content: 'A Revelação é a ponte emocional. É o instante em que sua visão mudou (Epifania). Saulo no caminho de Damasco é o exemplo máximo. Paulo não mudou por lógica, mas por uma luz que o cercou. Sua história de luta, fracasso e revelação pessoal permite que o público reviva a mesma jornada. "Se funcionou para ele, pode funcionar para mim".' 
      },
      { 
        id: 'sess-9', 
        chapterId: 'chap-3', 
        title: 'O Confronto', 
        isPremium: true, 
        content: 'O líder deve agir como guardião da verdade, derrubando heresias (mitos do mercado). Use o "Novos Mandamentos" para silenciar as três vozes: "Isso não funciona", "Não funciona para mim" e "Não tenho condições". Jesus confrontava: "Ouvistes o que foi dito... Eu, porém, vos digo...". O confronto liberta mentes pela antecipação das dúvidas.' 
      }
    ]
  },
  {
    id: 'chap-4',
    number: 4,
    title: 'O Sermão',
    isPremium: true,
    sessions: [
      { 
        id: 'sess-10', 
        chapterId: 'chap-4', 
        title: 'O Grande Sermão', 
        isPremium: true, 
        content: 'O Sermão da Montanha é o maior exemplo de convocação à conversão. É o ápice onde tudo converge: História, Problema, Profecia, Mandamentos e Oferta. Não soa como venda, soa como destino. É um rito de passagem onde a audiência deixa de ser espectadora e se torna discípula comprometida com a sua causa.' 
      },
      { 
        id: 'sess-11', 
        chapterId: 'chap-4', 
        title: 'Repetição e Consistência', 
        isPremium: true, 
        content: 'A doutrinação gera lealdade através da liturgia. A audiência memoriza a mensagem por repetição. Seu trabalho é manter o movimento engajado e coerente. A consistência da sua voz cria um fluxo de verdade interna que é percebido como autoridade inabalável pela sua audiência.' 
      },
      { 
        id: 'sess-12', 
        chapterId: 'chap-4', 
        title: 'Eventos e Obras', 
        isPremium: true, 
        content: 'O movimento em ação e o legado de transformação. São as manifestações tangíveis do seu movimento no mundo real. Obras que validam a fé do povo e marcos que celebram o avanço rumo à Terra Prometida. O líder inegoviável constrói um legado que sobrevive ao tempo.' 
      }
    ]
  }
];

export const FEATURES = [
  { icon: <Crown className="w-6 h-6" />, title: 'Autoridade Bíblica', desc: 'Frameworks testados pelo tempo e princípios eternos.' },
  { icon: <Shield className="w-6 h-6" />, title: 'Liderança Autêntica', desc: 'Construa uma base sólida que não depende de truques de marketing.' },
  { icon: <Users className="w-6 h-6" />, title: 'Comunidade Próspera', desc: 'Transforme clientes em membros de um movimento vivo.' },
  { icon: <Sparkles className="w-6 h-6" />, title: 'IA Teológica', desc: 'Nossa inteligência artificial ajuda a articular sua visão.' }
];

export const BADGES = [
  { id: 'badge-1', title: 'O Visionário', desc: 'Completou o Capítulo 1' },
  { id: 'badge-2', title: 'O Guerreiro', desc: 'Completou o Capítulo 2' },
  { id: 'badge-3', title: 'O Profeta', desc: 'Completou o Capítulo 3' },
  { id: 'badge-4', title: 'O Apóstolo', desc: 'Completou o Capítulo 4' },
];
