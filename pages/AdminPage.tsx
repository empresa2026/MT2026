
import React, { useState, useEffect } from 'react';
import { MembershipStatus, Chapter, Session } from '../types';
import { 
  Settings, 
  Users, 
  BookOpen, 
  Cpu, 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  TrendingUp,
  ShieldCheck,
  RotateCcw,
  X,
  Lock,
  Unlock,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface AdminPageProps {
  chapters: Chapter[];
  setChapters: React.Dispatch<React.SetStateAction<Chapter[]>>;
}

type AdminTab = 'dashboard' | 'content' | 'ai' | 'users';

const AdminPage: React.FC<AdminPageProps> = ({ chapters, setChapters }) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [isSaving, setIsSaving] = useState(false);
  const [aiKnowledge, setAiKnowledge] = useState('');
  const [aiInstruction, setAiInstruction] = useState('');
  const [expandedChap, setExpandedChap] = useState<string | null>(null);
  
  // Modal states
  const [editingChapter, setEditingChapter] = useState<Partial<Chapter> | null>(null);
  const [editingSession, setEditingSession] = useState<{ chapterId: string, session: Partial<Session> } | null>(null);

  useEffect(() => {
    const savedK = localStorage.getItem('mt_ai_knowledge');
    const savedI = localStorage.getItem('mt_ai_instruction');
    if (savedK) setAiKnowledge(savedK);
    else setAiKnowledge('MARKETING TEOLÓGICO: SEGREDOS MILENARES PARA INFLUENCIAR...');
    if (savedI) setAiInstruction(savedI);
    else setAiInstruction('Você é o Mentor de IA do Marketing Teológico...');
  }, []);

  const handleSaveAIConfig = () => {
    setIsSaving(true);
    localStorage.setItem('mt_ai_knowledge', aiKnowledge);
    localStorage.setItem('mt_ai_instruction', aiInstruction);
    setTimeout(() => { setIsSaving(false); alert('IA Configurada!'); }, 800);
  };

  const saveChapter = () => {
    if (!editingChapter?.title) return;
    if (editingChapter.id) {
      setChapters(prev => prev.map(c => c.id === editingChapter.id ? { ...c, ...editingChapter as Chapter } : c));
    } else {
      setChapters(prev => [...prev, { id: `chap-${Date.now()}`, number: prev.length + 1, title: editingChapter.title!, isPremium: editingChapter.isPremium || false, sessions: [] }]);
    }
    setEditingChapter(null);
  };

  const saveSession = () => {
    if (!editingSession?.session.title) return;
    const { chapterId, session } = editingSession;
    setChapters(prev => prev.map(chap => {
      if (chap.id === chapterId) {
        if (session.id) {
          return { ...chap, sessions: chap.sessions.map(s => s.id === session.id ? { ...s, ...session as Session } : s) };
        } else {
          return { ...chap, sessions: [...chap.sessions, { id: `sess-${Date.now()}`, chapterId, title: session.title!, isPremium: session.isPremium || false, content: session.content || '' }] };
        }
      }
      return chap;
    }));
    setEditingSession(null);
  };

  const deleteChapter = (id: string) => {
    if (confirm('Excluir capítulo e todas as suas sessões?')) setChapters(prev => prev.filter(c => c.id !== id));
  };

  const deleteSession = (chapId: string, sessId: string) => {
    if (confirm('Excluir esta sessão?')) setChapters(prev => prev.map(c => c.id === chapId ? { ...c, sessions: c.sessions.filter(s => s.id !== sessId) } : c));
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="serif text-3xl font-bold text-white mb-2">Painel do Governante</h2>
          <p className="text-gray-400">Gestão centralizada da plataforma.</p>
        </div>
        <div className="flex bg-[#141414] border border-[#c9a227]/20 rounded-xl p-1">
          {['dashboard', 'content', 'ai', 'users'].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab as AdminTab)} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all capitalize ${activeTab === tab ? 'bg-[#c9a227] text-black shadow-lg shadow-[#c9a227]/20' : 'text-gray-500 hover:text-white'}`}>
              {tab === 'ai' ? 'IA Config' : tab === 'content' ? 'Sessões' : tab}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'dashboard' && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: 'Membros', value: '1.284', icon: Users, color: 'text-blue-500' },
            { label: 'Premium', value: '452', icon: ShieldCheck, color: 'text-[#c9a227]' },
            { label: 'Sessões', value: '12.400', icon: BookOpen, color: 'text-green-500' },
            { label: 'IA Consultas', value: '3.150', icon: Cpu, color: 'text-purple-500' }
          ].map((stat, i) => (
            <div key={i} className="bg-[#141414] border border-white/5 p-6 rounded-2xl">
              <div className={`${stat.color} mb-4`}><stat.icon className="w-8 h-8" /></div>
              <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">{stat.label}</p>
              <h4 className="text-3xl font-bold text-white">{stat.value}</h4>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'ai' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#141414] border border-white/5 p-8 rounded-2xl">
              <h3 className="serif text-xl font-bold mb-6 flex items-center gap-2 text-[#c9a227]"><Cpu className="w-5 h-5" /> Base Teológica</h3>
              <textarea value={aiKnowledge} onChange={e => setAiKnowledge(e.target.value)} className="w-full h-96 bg-[#0a0a0a] border border-white/10 rounded-xl p-4 text-sm text-gray-300 font-mono focus:border-[#c9a227] resize-none" />
            </div>
            <div className="bg-[#141414] border border-white/5 p-8 rounded-2xl">
              <h3 className="serif text-xl font-bold mb-6 flex items-center gap-2 text-[#c9a227]"><Settings className="w-5 h-5" /> Persona do Mentor</h3>
              <textarea value={aiInstruction} onChange={e => setAiInstruction(e.target.value)} className="w-full h-32 bg-[#0a0a0a] border border-white/10 rounded-xl p-4 text-sm text-gray-300 font-mono focus:border-[#c9a227] resize-none" />
            </div>
          </div>
          <div className="space-y-6">
            <button onClick={handleSaveAIConfig} disabled={isSaving} className="w-full py-5 bg-[#c9a227] text-black font-black uppercase tracking-widest rounded-xl hover:scale-105 transition-all flex items-center justify-center gap-3 shadow-xl">
              {isSaving ? <RotateCcw className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />} Salvar Configurações
            </button>
          </div>
        </div>
      )}

      {activeTab === 'content' && (
        <div className="space-y-6">
          <div className="flex justify-end">
            <button onClick={() => setEditingChapter({ title: '', isPremium: false })} className="flex items-center gap-2 px-6 py-3 bg-[#c9a227] text-black font-bold rounded-xl shadow-lg">
              <Plus className="w-4 h-4" /> Novo Capítulo
            </button>
          </div>
          <div className="space-y-4">
            {chapters.map(chap => (
              <div key={chap.id} className="bg-[#141414] border border-white/5 rounded-2xl overflow-hidden">
                <div className="p-6 flex items-center justify-between bg-white/[0.02]">
                  <div className="flex items-center gap-4 cursor-pointer" onClick={() => setExpandedChap(expandedChap === chap.id ? null : chap.id)}>
                    <div className="w-10 h-10 bg-[#1a1a1a] border border-[#c9a227]/30 text-[#c9a227] flex items-center justify-center font-bold rounded-xl">{chap.number}</div>
                    <div>
                      <h4 className="font-bold text-white flex items-center gap-2">
                        {chap.title}
                        {chap.isPremium ? <Lock className="w-3 h-3 text-[#c9a227]" /> : <Unlock className="w-3 h-3 text-gray-600" />}
                      </h4>
                      <p className="text-[10px] text-gray-500 uppercase tracking-widest">{chap.sessions.length} sessões</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setEditingSession({ chapterId: chap.id, session: { title: '', content: '', isPremium: chap.isPremium } })} className="p-2 text-[#c9a227] hover:bg-[#c9a227]/10 rounded-lg" title="Adicionar Sessão"><Plus className="w-5 h-5" /></button>
                    <button onClick={() => setEditingChapter(chap)} className="p-2 text-gray-500 hover:text-white rounded-lg"><Edit className="w-4 h-4" /></button>
                    <button onClick={() => deleteChapter(chap.id)} className="p-2 text-gray-500 hover:text-red-500 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                    <button onClick={() => setExpandedChap(expandedChap === chap.id ? null : chap.id)} className="p-2 text-gray-500">{expandedChap === chap.id ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}</button>
                  </div>
                </div>
                {expandedChap === chap.id && (
                  <div className="p-4 bg-black/20 divide-y divide-white/5">
                    {chap.sessions.length === 0 ? <p className="p-4 text-center text-gray-600 text-xs italic">Nenhuma sessão cadastrada.</p> : chap.sessions.map(sess => (
                      <div key={sess.id} className="p-4 flex items-center justify-between hover:bg-white/[0.02] transition-all group">
                        <div className="flex items-center gap-3">
                           <BookOpen className="w-4 h-4 text-gray-500" />
                           <span className="text-sm text-gray-300 font-medium">{sess.title}</span>
                           {sess.isPremium && <CrownIcon className="w-3 h-3 text-[#c9a227]" />}
                        </div>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => setEditingSession({ chapterId: chap.id, session: sess })} className="p-1.5 text-gray-500 hover:text-[#c9a227]"><Edit className="w-3.5 h-3.5" /></button>
                          <button onClick={() => deleteSession(chap.id, sess.id)} className="p-1.5 text-gray-500 hover:text-red-500"><Trash2 className="w-3.5 h-3.5" /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Chapter Modal */}
      {editingChapter && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-[#141414] border border-[#c9a227]/30 rounded-3xl w-full max-w-lg p-8 space-y-6 shadow-2xl animate-in zoom-in duration-300">
            <div className="flex justify-between items-center"><h3 className="serif text-2xl font-bold">{editingChapter.id ? 'Editar Capítulo' : 'Novo Capítulo'}</h3><button onClick={() => setEditingChapter(null)} className="text-gray-500 hover:text-white"><X /></button></div>
            <div className="space-y-4">
              <div><label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest mb-2 block">Título</label><input type="text" value={editingChapter.title} onChange={e => setEditingChapter({...editingChapter, title: e.target.value})} className="w-full bg-black border border-white/10 rounded-xl py-3 px-4 text-white focus:border-[#c9a227]" /></div>
              <label className="flex items-center gap-3 cursor-pointer"><input type="checkbox" checked={editingChapter.isPremium} onChange={e => setEditingChapter({...editingChapter, isPremium: e.target.checked})} className="accent-[#c9a227]" /><span className="text-sm font-medium">Conteúdo Premium</span></label>
            </div>
            <button onClick={saveChapter} className="w-full py-4 bg-[#c9a227] text-black font-black uppercase rounded-xl shadow-lg">Salvar Capítulo</button>
          </div>
        </div>
      )}

      {/* Session Modal */}
      {editingSession && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-[#141414] border border-[#c9a227]/30 rounded-3xl w-full max-w-3xl p-8 space-y-6 shadow-2xl animate-in zoom-in duration-300 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center"><h3 className="serif text-2xl font-bold">{editingSession.session.id ? 'Editar Sessão' : 'Nova Sessão'}</h3><button onClick={() => setEditingSession(null)} className="text-gray-500 hover:text-white"><X /></button></div>
            <div className="space-y-6">
              <div><label className="text-[10px] uppercase font-bold text-gray-500 mb-2 block">Título da Sessão</label><input type="text" value={editingSession.session.title} onChange={e => setEditingSession({...editingSession, session: {...editingSession.session, title: e.target.value}})} className="w-full bg-black border border-white/10 rounded-xl py-3 px-4 text-white focus:border-[#c9a227]" /></div>
              <div><label className="text-[10px] uppercase font-bold text-gray-500 mb-2 block">Conteúdo Teológico (Markdown)</label><textarea value={editingSession.session.content} onChange={e => setEditingSession({...editingSession, session: {...editingSession.session, content: e.target.value}})} className="w-full h-64 bg-black border border-white/10 rounded-xl py-3 px-4 text-white font-mono text-sm focus:border-[#c9a227] resize-none" /></div>
              <label className="flex items-center gap-3 cursor-pointer"><input type="checkbox" checked={editingSession.session.isPremium} onChange={e => setEditingSession({...editingSession, session: {...editingSession.session, isPremium: e.target.checked}})} className="accent-[#c9a227]" /><span className="text-sm font-medium">Sessão Premium</span></label>
            </div>
            <button onClick={saveSession} className="w-full py-4 bg-[#c9a227] text-black font-black uppercase rounded-xl shadow-lg">Salvar Sessão</button>
          </div>
        </div>
      )}
    </div>
  );
};

const CrownIcon: React.FC<any> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"/></svg>
);

export default AdminPage;
