
import React from 'react';
import { ChevronRight, Play, Shield, Crown, Users, Sparkles, Scroll, Flame, Anchor, Church, Star, ArrowDown } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  return (
    <div className="bg-[#0a0a0a] text-gray-200 selection:bg-[#c9a227] selection:text-black">
      {/* Hero Section - O Mistério Revelado */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-20 px-4 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[#c9a227]/5 rounded-full blur-[150px] pointer-events-none" />
        
        <div className="max-w-5xl mx-auto relative z-10 text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#c9a227]/30 bg-[#c9a227]/5 text-[#c9a227] text-[10px] font-black uppercase tracking-[0.3em] mb-4 animate-pulse">
            O Código da Influência Eterna
          </div>
          
          <h1 className="serif text-5xl md:text-8xl font-bold text-white leading-[1.1] tracking-tight">
            Existe um <span className="text-[#c9a227]">Padrão Oculto</span> por trás de todo Grande Movimento.
          </h1>
          
          <p className="max-w-3xl mx-auto text-gray-400 text-lg md:text-2xl leading-relaxed font-light">
            Enquanto o mundo corre atrás de algoritmos que mudam a cada semana, os maiores líderes da história usaram <span className="text-white font-semibold italic">Sete Princípios Imutáveis</span> para mover nações e atravessar milênios.
          </p>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-6">
            <button
              onClick={onGetStarted}
              className="w-full sm:w-auto px-10 py-5 bg-[#c9a227] text-black font-black uppercase tracking-widest rounded-full hover:scale-105 transition-all shadow-[0_0_40px_rgba(201,162,39,0.3)] flex items-center justify-center gap-3"
            >
              Receber a Revelação
              <ChevronRight className="w-5 h-5" />
            </button>
            <button className="flex items-center gap-3 text-gray-500 hover:text-[#c9a227] transition-colors font-bold uppercase text-xs tracking-widest">
              <div className="w-12 h-12 rounded-full border border-gray-800 flex items-center justify-center group-hover:border-[#c9a227]">
                <Play className="w-4 h-4 fill-current" />
              </div>
              Assista o Manifesto
            </button>
          </div>

          <div className="pt-20 animate-bounce opacity-20">
            <ArrowDown className="mx-auto w-6 h-6" />
          </div>
        </div>
      </section>

      {/* A Grande Insatisfação - O Marketing "Vazio" */}
      <section className="py-32 bg-[#0d0d0d] border-y border-[#c9a227]/10 px-4">
        <div className="max-w-4xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="serif text-4xl md:text-6xl font-bold text-white">Por que o Marketing tradicional <br/><span className="italic text-gray-600">te cansa?</span></h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-gray-400 text-lg leading-relaxed">
            <p>
              Você sente que está gritando em um deserto. Segue as fórmulas dos "gurus", faz as dancinhas, estuda as métricas, mas no fim do dia, sente que sua mensagem é <span className="text-white">vazia e passageira</span>. 
            </p>
            <p>
              Isso acontece porque o marketing secular foca no <span className="text-[#c9a227]">EGO</span>. Mas os movimentos que mudaram o mundo focam no <span className="text-[#c9a227]">REINO</span>. Existe uma diferença abissal entre ter seguidores e ter um povo. Entre ter clientes e ter discípulos da sua visão.
            </p>
          </div>

          <div className="bg-black/40 border border-[#c9a227]/20 p-10 rounded-3xl text-center italic serif text-2xl text-white/80">
            "Não vos conformeis com este mundo, mas transformai-vos pela renovação da vossa mente."
          </div>
        </div>
      </section>

      {/* A Origem - Copy Longa Narrativa */}
      <section className="py-32 px-4 overflow-hidden relative">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <span className="text-[#c9a227] font-black uppercase tracking-[0.3em] text-xs">A Ciência do Sagrado</span>
            <h2 className="serif text-5xl md:text-7xl font-bold text-white leading-tight">O Framework que atravessou o Mar Vermelho.</h2>
            <div className="space-y-6 text-gray-400 text-lg leading-relaxed font-light">
              <p>
                Imagine Moisés tentando convencer um povo escravizado a segui-lo para o deserto sem um <span className="text-white font-bold">Chamado Visceral</span>. Imagine os apóstolos espalhando uma mensagem que conquistou Roma sem uma <span className="text-white font-bold">Profecia Clara</span>.
              </p>
              <p>
                Eles não tinham redes sociais, anúncios ou e-mail marketing. Eles tinham o <span className="text-[#c9a227] font-bold">Marketing Teológico</span>: a arte de comunicar verdades eternas de forma inegociável.
              </p>
              <p>
                Nós decodificamos as estruturas narrativas da Bíblia — o livro mais lido e influente de todos os tempos — para criar um sistema SaaS único que ajuda você a encontrar a essência da sua liderança e construir um movimento que glorifica ao Rei.
              </p>
            </div>
            <div className="pt-4">
               <button onClick={onGetStarted} className="px-8 py-4 bg-transparent border-2 border-[#c9a227] text-[#c9a227] font-black uppercase tracking-widest rounded-xl hover:bg-[#c9a227] hover:text-black transition-all">
                Descobrir os 7 Pilares
              </button>
            </div>
          </div>
          
          <div className="relative group">
            <div className="absolute -inset-4 bg-[#c9a227]/20 rounded-full blur-3xl opacity-30 group-hover:opacity-50 transition-all" />
            <div className="relative bg-[#141414] border border-[#c9a227]/20 p-2 rounded-[2rem] shadow-2xl overflow-hidden aspect-[4/5] flex items-center justify-center">
                <Scroll className="w-48 h-48 text-[#c9a227]/20 absolute rotate-12" />
                <div className="z-10 text-center p-8 space-y-4">
                  <Flame className="w-12 h-12 text-[#c9a227] mx-auto mb-4" />
                  <h4 className="serif text-3xl text-white">Não é sobre vendas.</h4>
                  <p className="text-gray-500 italic">É sobre arrebatamento. É sobre destino. É sobre o Reino.</p>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Os 7 Pilares (Amostra Grátis da Revelação) */}
      <section className="py-32 bg-black px-4">
        <div className="max-w-7xl mx-auto space-y-20">
          <div className="text-center space-y-4">
            <h2 className="serif text-4xl md:text-6xl font-bold text-white">A Anatomia de um <span className="text-[#c9a227]">Movimento</span></h2>
            <p className="text-gray-500 max-w-2xl mx-auto">O framework que transforma ideias em instituições milenares.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <Flame className="w-8 h-8"/>, title: 'O Chamado', desc: 'A indignação sagrada que separa quem vende de quem lidera.' },
              { icon: <Crown className="w-8 h-8"/>, title: 'O Estilo de Liderança', desc: 'Sua energia bíblica predominante: Profeta, Pastor, Mestre ou Guerreiro.' },
              { icon: <Users className="w-8 h-8"/>, title: 'O Povo Escolhido', desc: 'A comunidade que reconhece sua voz no meio do barulho.' },
              { icon: <Anchor className="w-8 h-8"/>, title: 'A Terra Prometida', desc: 'O destino de transformação que ancora a esperança da sua audiência.' },
              { icon: <Shield className="w-8 h-8"/>, title: 'O Inimigo', desc: 'A força que se opõe ao Reino e que deve ser confrontada.' },
              { icon: <Sparkles className="w-8 h-8"/>, title: 'A Grande Verdade', desc: 'A revelação final que torna sua proposta inegociável.' },
            ].map((pilar, i) => (
              <div key={i} className="p-10 rounded-3xl bg-[#0a0a0a] border border-white/5 hover:border-[#c9a227]/40 transition-all group">
                <div className="text-[#c9a227] mb-6 group-hover:scale-110 transition-transform">{pilar.icon}</div>
                <h3 className="serif text-2xl font-bold text-white mb-4">{pilar.title}</h3>
                <p className="text-gray-500 leading-relaxed font-light">{pilar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Teológica */}
      <section className="py-32 px-4 bg-gradient-to-b from-black to-[#0d0d0d]">
        <div className="max-w-4xl mx-auto text-center space-y-16">
          <h2 className="serif text-4xl font-bold text-white italic">"Se sua mensagem não é eterna, ela já nasceu morta."</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[1, 2, 3].map(i => (
              <div key={i} className="space-y-6">
                <div className="w-20 h-20 rounded-full bg-gray-800 mx-auto border-2 border-[#c9a227]/30 overflow-hidden">
                  <img src={`https://picsum.photos/seed/leader${i}/100/100`} alt="Líder" className="w-full h-full object-cover grayscale" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-center gap-1 text-[#c9a227]">
                    <Star className="w-3 h-3 fill-current" />
                    <Star className="w-3 h-3 fill-current" />
                    <Star className="w-3 h-3 fill-current" />
                    <Star className="w-3 h-3 fill-current" />
                    <Star className="w-3 h-3 fill-current" />
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed italic">"Encontrei a voz que eu sabia que tinha, mas não sabia como usar para servir ao Reino."</p>
                  <p className="text-xs font-bold text-white uppercase tracking-widest">— Líder de Movimento</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final - O Convite à Mesa */}
      <section className="py-40 px-4 relative">
        <div className="absolute inset-0 bg-[#c9a227]/5 pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center space-y-12 relative z-10">
          <Church className="w-16 h-16 text-[#c9a227] mx-auto opacity-50" />
          <h2 className="serif text-5xl md:text-7xl font-bold text-white">Sua voz é um instrumento. <br/><span className="text-[#c9a227]">Como você vai tocá-la?</span></h2>
          <p className="text-gray-400 text-xl font-light">
            Não estamos oferecendo uma ferramenta de vendas. Estamos oferecendo um portal para a sua verdadeira identidade de líder. O Reino não espera por quem hesita.
          </p>
          
          <div className="pt-8">
            <button
              onClick={onGetStarted}
              className="px-12 py-6 bg-[#c9a227] text-black font-black uppercase tracking-[0.2em] rounded-full hover:scale-110 transition-all shadow-[0_0_50px_rgba(201,162,39,0.4)]"
            >
              Iniciar Minha Jornada Profética
            </button>
          </div>
          
          <p className="text-[10px] text-gray-600 uppercase tracking-widest font-bold">
            Acesso imediato • Primeiro capítulo gratuito • IA de Mentoria Inclusa
          </p>
        </div>
      </section>

      {/* Footer Minimalista */}
      <footer className="py-20 border-t border-white/5 bg-black px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h3 className="serif text-xl font-bold text-[#c9a227] tracking-widest uppercase mb-1">Marketing Teológico</h3>
            <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">A Serviço do Rei e do Seu Reino.</p>
          </div>
          <div className="flex gap-10 text-xs font-bold text-gray-500 uppercase tracking-widest">
            <a href="#" className="hover:text-[#c9a227] transition-colors">Privacidade</a>
            <a href="#" className="hover:text-[#c9a227] transition-colors">Princípios</a>
            <a href="#" className="hover:text-[#c9a227] transition-colors">Suporte</a>
          </div>
          <p className="text-[10px] text-gray-700 font-bold">&copy; 2024 MARKETING TEOLÓGICO. TODOS OS DIREITOS RESERVADOS.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
