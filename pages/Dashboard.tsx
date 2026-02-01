
import React from 'react';
import { User, MembershipStatus, Page, Chapter } from '../types';
import { BADGES } from '../constants';
import { 
  BarChart3, 
  ChevronRight, 
  CheckCircle2, 
  Lock, 
  Trophy,
  ArrowUpCircle
} from 'lucide-react';

interface DashboardProps {
  user: User | null;
  chapters: Chapter[];
  onNavigate: (page: Page) => void;
  onUpgrade: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, chapters, onNavigate, onUpgrade }) => {
  if (!user) return null;

  const totalSessions = chapters.reduce((acc, chap) => acc + chap.sessions.length, 0);
  const completedSessions = user.progress.length;
  const progressPercent = totalSessions > 0 ? Math.round((completedSessions / totalSessions) * 100) : 0;

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="serif text-3xl md:text-4xl font-bold text-white mb-2">Paz, {user.name.split(' ')[0]}</h2>
          <p className="text-gray-400">Aqui está o resumo da sua jornada no Marketing Teológico.</p>
        </div>
        {user.status === MembershipStatus.FREE && (
          <button 
            onClick={onUpgrade}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#c9a227] to-[#a68520] text-black font-bold rounded-xl shadow-lg shadow-[#c9a227]/20 hover:scale-105 transition-all"
          >
            <ArrowUpCircle className="w-5 h-5" />
            Seja Premium Agora
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Progress Card */}
        <div className="md:col-span-2 bg-[#141414] border border-[#c9a227]/20 rounded-2xl p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <BarChart3 className="w-6 h-6 text-[#c9a227]" />
              <h3 className="serif text-xl font-bold">Progresso Geral</h3>
            </div>
            <span className="text-[#c9a227] font-bold text-2xl">{progressPercent}%</span>
          </div>
          
          <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden mb-8">
            <div 
              className="h-full bg-[#c9a227] transition-all duration-1000" 
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {chapters.map((chap) => {
              const chapCompleted = chap.sessions.length > 0 && chap.sessions.every(s => user.progress.includes(s.id));
              return (
                <div key={chap.id} className="text-center">
                  <div className={`w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center border transition-all ${
                    chapCompleted ? 'bg-[#c9a227]/20 border-[#c9a227] text-[#c9a227]' : 'bg-white/5 border-white/10 text-gray-600'
                  }`}>
                    {chapCompleted ? <CheckCircle2 className="w-6 h-6" /> : <Lock className="w-4 h-4" />}
                  </div>
                  <p className="text-[10px] uppercase font-bold text-gray-500">Cap. {chap.number}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Badges Card */}
        <div className="bg-[#141414] border border-[#c9a227]/20 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-8">
            <Trophy className="w-6 h-6 text-[#c9a227]" />
            <h3 className="serif text-xl font-bold">Conquistas</h3>
          </div>
          
          <div className="space-y-4">
            {BADGES.map((badge, idx) => {
              const isUnlocked = user.progress.length >= (idx + 1) * 3;
              return (
                <div key={badge.id} className={`flex items-center gap-4 p-3 rounded-xl border transition-all ${
                  isUnlocked ? 'bg-[#c9a227]/5 border-[#c9a227]/20 grayscale-0' : 'bg-white/5 border-transparent grayscale'
                }`}>
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isUnlocked ? 'bg-[#c9a227] text-black' : 'bg-gray-800 text-gray-600'}`}>
                    <Trophy className="w-5 h-5" />
                  </div>
                  <div>
                    <p className={`text-sm font-bold ${isUnlocked ? 'text-white' : 'text-gray-500'}`}>{badge.title}</p>
                    <p className="text-[10px] text-gray-500 uppercase">{badge.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quick Access */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <button 
          onClick={() => onNavigate(Page.MODULES)}
          className="group p-8 rounded-2xl bg-[#141414] border border-[#c9a227]/10 hover:border-[#c9a227]/40 transition-all text-left flex items-center justify-between"
        >
          <div>
            <h4 className="serif text-xl font-bold text-white mb-2">Continuar Estudos</h4>
            <p className="text-gray-400 text-sm">Acesse o próximo módulo e aprofunde seu conhecimento.</p>
          </div>
          <ChevronRight className="w-8 h-8 text-gray-600 group-hover:text-[#c9a227] group-hover:translate-x-1 transition-all" />
        </button>

        <button 
          onClick={() => onNavigate(Page.GENERATOR)}
          className="group p-8 rounded-2xl bg-[#141414] border border-[#c9a227]/10 hover:border-[#c9a227]/40 transition-all text-left flex items-center justify-between"
        >
          <div>
            <h4 className="serif text-xl font-bold text-white mb-2">Gerador de Framework</h4>
            <p className="text-gray-400 text-sm">Use nossa IA para articular sua visão e chamado.</p>
          </div>
          <ChevronRight className="w-8 h-8 text-gray-600 group-hover:text-[#c9a227] group-hover:translate-x-1 transition-all" />
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
