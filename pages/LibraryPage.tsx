
import React from 'react';
import { User, MembershipStatus } from '../types';
import { 
  FileDown, 
  ExternalLink, 
  Search, 
  Filter,
  Layers,
  FileText,
  Video,
  CheckSquare,
  Crown
} from 'lucide-react';

interface LibraryPageProps {
  user: User | null;
}

const TEMPLATES = [
  { id: 1, title: 'Checklist: Lançamento Teológico', type: 'checklist', format: 'PDF', premium: false },
  { id: 2, title: 'Script: O Grande Sermão', type: 'script', format: 'DOCX', premium: true },
  { id: 3, title: 'Workbook: Definindo o Chamado', type: 'workbook', format: 'PDF', premium: false },
  { id: 4, title: 'Mapa Mental: A Jornada do Povo', type: 'map', format: 'PNG', premium: true },
  { id: 5, title: 'Template: Landing Page Profética', type: 'template', format: 'FIGMA', premium: true },
  { id: 6, title: 'Guia: Narrativas Bíblicas', type: 'guide', format: 'PDF', premium: false },
];

const LibraryPage: React.FC<LibraryPageProps> = ({ user }) => {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="serif text-3xl font-bold text-white mb-2">Biblioteca de Recursos</h2>
          <p className="text-gray-400">Templates, workbooks e materiais de apoio para acelerar sua jornada.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input 
              type="text" 
              placeholder="Buscar material..." 
              className="bg-white/5 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-[#c9a227]/50"
            />
          </div>
          <button className="p-2 bg-white/5 border border-white/10 rounded-lg text-gray-400 hover:text-white transition-colors">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {TEMPLATES.map((item) => {
          const locked = item.premium && user?.status !== MembershipStatus.PREMIUM;
          return (
            <div key={item.id} className="bg-[#141414] border border-[#c9a227]/10 hover:border-[#c9a227]/40 transition-all rounded-2xl p-6 group flex flex-col">
              <div className="flex items-start justify-between mb-6">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                  locked ? 'bg-gray-800 text-gray-600' : 'bg-[#c9a227]/10 text-[#c9a227] group-hover:bg-[#c9a227] group-hover:text-black'
                }`}>
                  {item.type === 'checklist' ? <CheckSquare className="w-6 h-6" /> : 
                   item.type === 'script' ? <FileText className="w-6 h-6" /> : 
                   item.type === 'workbook' ? <Layers className="w-6 h-6" /> : <Video className="w-6 h-6" />}
                </div>
                {item.premium && (
                  <span className={`flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md ${
                    locked ? 'bg-gray-800 text-gray-500' : 'bg-[#c9a227] text-black'
                  }`}>
                    <Crown className="w-3 h-3" /> Premium
                  </span>
                )}
              </div>
              
              <h4 className={`serif text-lg font-bold mb-2 ${locked ? 'text-gray-500' : 'text-white'}`}>{item.title}</h4>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-6">{item.format} • {item.type}</p>
              
              <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                {locked ? (
                  <button className="flex items-center gap-2 text-xs font-bold text-gray-600 cursor-not-allowed">
                    Upgrade Necessário
                  </button>
                ) : (
                  <>
                    <button className="flex items-center gap-2 text-xs font-bold text-[#c9a227] hover:underline transition-all">
                      <FileDown className="w-4 h-4" />
                      Download
                    </button>
                    <button className="text-gray-500 hover:text-white">
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-10 rounded-3xl bg-gradient-to-r from-[#1a1a1a] to-[#0a0a0a] border border-[#c9a227]/20 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="text-center md:text-left">
          <h3 className="serif text-2xl font-bold text-white mb-2">Sugira um Recurso</h3>
          <p className="text-gray-400 text-sm">Sentiu falta de algum template? Conte-nos o que você precisa.</p>
        </div>
        <button className="px-8 py-3 bg-[#c9a227]/10 border border-[#c9a227]/30 text-[#c9a227] font-bold rounded-xl hover:bg-[#c9a227] hover:text-black transition-all">
          Enviar Sugestão
        </button>
      </div>
    </div>
  );
};

export default LibraryPage;
