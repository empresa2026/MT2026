
import React, { useState, useEffect } from 'react';
import { User, MembershipStatus, Chapter, Session } from '../types';
import { 
  Lock, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  FileText,
  Crown,
  Play,
  Type as TypeIcon,
  Maximize2,
  Minimize2,
  BookOpen
} from 'lucide-react';

interface ModulesPageProps {
  user: User | null;
  chapters: Chapter[];
  onToggleSession: (sessionId: string) => void;
  onUpgrade: () => void;
}

const ModulesPage: React.FC<ModulesPageProps> = ({ user, chapters, onToggleSession, onUpgrade }) => {
  const [expandedChapter, setExpandedChapter] = useState<string | null>(chapters.length > 0 ? chapters[0].id : null);
  const [selectedSession, setSelectedSession] = useState<Session | null>(chapters.length > 0 ? chapters[0].sessions[0] : null);
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg' | 'xl'>('lg');
  const [isFocused, setIsFocused] = useState(false);

  if (!user) return null;

  useEffect(() => {
    const contentArea = document.querySelector('.content-scroll-area');
    if (contentArea) contentArea.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedSession]);

  const isLocked = (chapter: Chapter) => {
    return chapter.isPremium && user.status !== MembershipStatus.PREMIUM;
  };

  const handleCompleteAndNext = () => {
    if (!selectedSession) return;
    
    const isMarkingAsComplete = !user.progress.includes(selectedSession.id);
    onToggleSession(selectedSession.id);

    if (isMarkingAsComplete) {
      const allSessions = chapters.flatMap(c => c.sessions);
      const currentIndex = allSessions.findIndex(s => s.id === selectedSession.id);
      
      if (currentIndex !== -1 && currentIndex < allSessions.length - 1) {
        const nextSess = allSessions[currentIndex + 1];
        setTimeout(() => {
          setSelectedSession(nextSess);
          setExpandedChapter(nextSess.chapterId);
        }, 400);
      }
    }
  };

  const fontSizeClass = {
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  }[fontSize];

  return (
    <div className={`max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 ${isFocused ? 'lg:flex-col' : ''}`}>
      {!isFocused && (
        <div className="w-full lg:w-80 flex-shrink-0 space-y-4 animate-in slide-in-from-left duration-500">
          <h2 className="serif text-2xl font-bold mb-6 text-white/90">Trilha de Conhecimento</h2>
          {chapters.map((chap) => {
            const locked = isLocked(chap);
            const expanded = expandedChapter === chap.id;
            return (
              <div key={chap.id} className={`rounded-xl border transition-all duration-300 ${locked ? 'border-gray-800 bg-gray-900/30' : 'border-[#c9a227]/20 bg-[#141414]'}`}>
                <button
                  onClick={() => !locked && setExpandedChapter(expanded ? null : chap.id)}
                  className={`w-full p-4 flex items-center justify-between ${locked ? 'cursor-not-allowed opacity-60' : 'hover:bg-[#c9a227]/5'}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${locked ? 'bg-gray-800 text-gray-500' : 'bg-[#c9a227] text-black'}`}>
                      {chap.number}
                    </div>
                    <span className={`font-bold text-sm ${locked ? 'text-gray-500' : 'text-white/90'}`}>{chap.title}</span>
                  </div>
                  {locked ? <Lock className="w-4 h-4 text-gray-500" /> : (expanded ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />)}
                </button>
                {expanded && !locked && (
                  <div className="px-2 pb-2 space-y-1">
                    {chap.sessions.map((sess) => {
                      const isActive = selectedSession?.id === sess.id;
                      const isCompleted = user.progress.includes(sess.id);
                      return (
                        <button
                          key={sess.id}
                          onClick={() => setSelectedSession(sess)}
                          className={`w-full flex items-center justify-between p-3 rounded-lg text-xs transition-all ${isActive ? 'bg-[#c9a227] text-black font-bold' : 'text-gray-400 hover:bg-white/5'}`}
                        >
                          <span className="truncate pr-2">{sess.title}</span>
                          {isCompleted && <CheckCircle2 className={`w-3.5 h-3.5 ${isActive ? 'text-black' : 'text-[#c9a227]'}`} />}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      <div className={`flex-1 bg-[#141414] border border-[#c9a227]/20 rounded-2xl p-6 md:p-10 relative overflow-hidden min-h-[700px] content-scroll-area overflow-y-auto`}>
        {selectedSession ? (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-[#c9a227]/10">
              <div>
                <h1 className="serif text-3xl md:text-5xl font-bold text-white tracking-tight">{selectedSession.title}</h1>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex bg-black/40 rounded-lg p-1 border border-white/5 mr-2">
                  {['base', 'lg', 'xl'].map(size => (
                    <button key={size} onClick={() => setFontSize(size as any)} className={`p-1.5 rounded ${fontSize === size ? 'bg-[#c9a227] text-black' : 'text-gray-500'}`}><TypeIcon className="w-4 h-4" /></button>
                  ))}
                </div>
                <button onClick={() => setIsFocused(!isFocused)} className="p-2.5 rounded-lg border border-white/10 text-gray-400 hover:text-[#c9a227]"><Maximize2 className="w-5 h-5" /></button>
              </div>
            </div>

            <div className="aspect-video bg-black/60 rounded-2xl flex items-center justify-center border border-[#c9a227]/10 relative group cursor-pointer shadow-2xl">
              <div className="z-10 w-20 h-20 rounded-full bg-[#c9a227] flex items-center justify-center text-black group-hover:scale-110 transition-all">
                <Play className="w-10 h-10 fill-current ml-1" />
              </div>
            </div>

            <div className={`prose prose-invert max-w-none ${fontSizeClass}`}>
              <div className="text-gray-300 leading-relaxed font-light whitespace-pre-wrap">{selectedSession.content}</div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-10 border-t border-[#c9a227]/10 pb-10">
              <button className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-white/5 border border-white/10 rounded-xl text-sm font-bold hover:bg-white/10 transition-all">
                <FileText className="w-5 h-5 text-[#c9a227]" /> Baixar Workbook
              </button>
              <button
                onClick={handleCompleteAndNext}
                className={`w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-4 rounded-xl border transition-all text-sm font-black uppercase tracking-widest ${
                  user.progress.includes(selectedSession.id) ? 'bg-green-600 text-white border-green-500' : 'bg-[#c9a227] text-black border-[#c9a227]'
                }`}
              >
                {user.progress.includes(selectedSession.id) ? <><CheckCircle2 className="w-5 h-5" /> Lição Concluída</> : 'Concluir Lição'}
              </button>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center p-12">
            <BookOpen className="w-12 h-12 text-[#c9a227] mb-8 animate-pulse" />
            <h3 className="serif text-3xl font-bold mb-4 text-white">Inicie sua Jornada</h3>
            <p className="text-gray-500">Selecione uma sessão ao lado.</p>
          </div>
        )}

        {selectedSession && chapters.find(c => c.id === selectedSession.chapterId)?.isPremium && user.status !== MembershipStatus.PREMIUM && (
          <div className="absolute inset-0 bg-[#0a0a0a]/90 backdrop-blur-xl z-30 flex items-center justify-center p-6 text-center">
            <div className="max-w-md animate-in zoom-in duration-500">
              <Crown className="w-20 h-20 text-[#c9a227] mx-auto mb-8" />
              <h2 className="serif text-4xl font-bold text-white mb-4">Acesso Premium</h2>
              <button onClick={onUpgrade} className="w-full py-5 bg-[#c9a227] text-black font-black uppercase tracking-widest rounded-2xl shadow-xl hover:scale-105 transition-all">Fazer Upgrade</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModulesPage;
