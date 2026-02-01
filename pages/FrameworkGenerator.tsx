
import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { User, FrameworkData, Message, Conversation } from '../types';
import { getGeminiResponse } from '../geminiService';
import { 
  Send, 
  Sparkles, 
  RotateCcw, 
  FileText, 
  ChevronRight,
  UserCheck,
  Target,
  Flag,
  Handshake,
  Skull,
  Zap,
  PanelLeftOpen,
  Maximize2,
  Minimize2,
  Save,
  Check,
  History,
  Trash2,
  Pencil,
  PlusCircle
} from 'lucide-react';

interface FrameworkGeneratorProps {
  user: User | null;
}

const STEPS = [
  { id: 'chamado', label: 'Chamado', icon: Zap, prompt: 'Qual é o seu chamado ou missão central?' },
  { id: 'estiloLideranca', label: 'Liderança', icon: UserCheck, prompt: 'Como você descreveria seu estilo de liderança bíblico?' },
  { id: 'povoEscolhido', label: 'Povo Escolhido', icon: Target, prompt: 'Quem é o seu povo escolhido?' },
  { id: 'terraPrometida', label: 'Terra Prometida', icon: Flag, prompt: 'Qual é a sua Terra Prometida?' },
  { id: 'novaAlianca', label: 'Nova Aliança', icon: Handshake, prompt: 'Qual é a sua Nova Aliança?' },
  { id: 'inimigo', label: 'O Inimigo', icon: Skull, prompt: 'Quem é o Inimigo do seu movimento?' },
  { id: 'grandeVerdade', label: 'A Verdade', icon: Sparkles, prompt: 'Qual é a Grande Verdade central?' },
];

const FrameworkGenerator: React.FC<FrameworkGeneratorProps> = ({ user }) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [savedMessageId, setSavedMessageId] = useState<string | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [framework, setFramework] = useState<FrameworkData>({
    chamado: '', estiloLideranca: '', povoEscolhido: '', terraPrometida: '', novaAlianca: '', inimigo: '', grandeVerdade: ''
  });

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem('mt_conversations');
    if (saved) {
      const parsed = JSON.parse(saved);
      setConversations(parsed);
      if (parsed.length > 0) loadConversation(parsed[0]);
      else startNewChat();
    } else startNewChat();
  }, []);

  useEffect(() => {
    if (conversations.length > 0) localStorage.setItem('mt_conversations', JSON.stringify(conversations));
  }, [conversations]);

  useEffect(() => {
    if (activeConversationId) {
      setConversations(prev => prev.map(conv => conv.id === activeConversationId ? { ...conv, messages, lastUpdate: Date.now() } : conv));
    }
  }, [messages]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const startNewChat = () => {
    const newId = Date.now().toString();
    const initialText = `Olá ${user?.name.split(' ')[0]}, vamos articular sua visão. Me fale sobre o seu **Chamado**: O que queima em seu coração?`;
    const newConv: Conversation = { id: newId, title: 'Nova Jornada', messages: [{ role: 'ai', text: initialText, id: 'init' }], lastUpdate: Date.now() };
    setConversations(prev => [newConv, ...prev]);
    setActiveConversationId(newId);
    setMessages(newConv.messages);
    setCurrentStepIndex(0);
    setFramework({ chamado: '', estiloLideranca: '', povoEscolhido: '', terraPrometida: '', novaAlianca: '', inimigo: '', grandeVerdade: '' });
  };

  const loadConversation = (conv: Conversation) => {
    setActiveConversationId(conv.id);
    setMessages(conv.messages);
    const aiMessages = conv.messages.filter(m => m.role === 'ai').length;
    setCurrentStepIndex(Math.min(aiMessages - 1, STEPS.length - 1));
  };

  const deleteConversation = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (confirm('Excluir permanentemente?')) {
      const updated = conversations.filter(c => c.id !== id);
      setConversations(updated);
      if (activeConversationId === id) {
        if (updated.length > 0) loadConversation(updated[0]);
        else startNewChat();
      }
    }
  };

  const renameConversation = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const newTitle = prompt('Novo título:', conversations.find(c => c.id === id)?.title);
    if (newTitle) setConversations(prev => prev.map(c => c.id === id ? { ...c, title: newTitle } : c));
  };

  const handleSend = async (customPrompt?: string) => {
    const userMessage = customPrompt || input;
    if (!userMessage.trim() || isTyping) return;
    if (!customPrompt) setInput('');
    if (!customPrompt) setMessages(prev => [...prev, { role: 'user', text: userMessage, id: Date.now().toString() }]);
    
    setIsTyping(true);
    const context = messages.map(m => `${m.role === 'ai' ? 'IA' : 'Líder'}: ${m.text}`).join('\n');
    const response = await getGeminiResponse(userMessage, context);
    setIsTyping(false);
    setMessages(prev => [...prev, { role: 'ai', text: response, id: Date.now().toString() }]);
    setFramework(prev => ({ ...prev, [STEPS[currentStepIndex].id]: userMessage }));
  };

  const nextStep = () => {
    if (currentStepIndex < STEPS.length - 1) {
      const next = currentStepIndex + 1;
      setCurrentStepIndex(next);
      const nextPrompt = `Profundo. Agora, me conte sobre sua **${STEPS[next].label}**: ${STEPS[next].prompt}`;
      setMessages(prev => [...prev, { role: 'ai', text: nextPrompt, id: Date.now().toString() }]);
    }
  };

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-6 h-[calc(100vh-140px)]">
      <div className="flex-1 flex flex-col lg:flex-row gap-6 overflow-hidden">
        <aside className={`bg-[#141414] border border-[#c9a227]/20 rounded-2xl flex flex-col overflow-hidden transition-all duration-500 ${isSidebarVisible ? 'w-full lg:w-72 p-5' : 'w-0 border-0 p-0 opacity-0 pointer-events-none'}`}>
          <div className="flex-1 overflow-y-auto space-y-8 pr-1">
            <div>
              <h3 className="serif text-xs font-bold flex items-center gap-2 text-[#c9a227] uppercase tracking-widest mb-4"><Sparkles className="w-3 h-3" /> Pilares</h3>
              <div className="space-y-2">
                {STEPS.map((step, idx) => (
                  <div key={step.id} className={`flex items-center gap-2.5 p-2 rounded-lg border transition-all ${currentStepIndex === idx ? 'bg-[#c9a227]/10 border-[#c9a227]/40' : 'bg-black/20 border-white/5'}`}>
                    <div className={`w-6 h-6 rounded flex items-center justify-center ${currentStepIndex === idx ? 'bg-[#c9a227] text-black' : 'bg-gray-800 text-gray-500'}`}><step.icon className="w-3 h-3" /></div>
                    <span className={`text-[10px] font-bold uppercase ${currentStepIndex === idx ? 'text-white' : 'text-gray-500'}`}>{step.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="serif text-xs font-bold flex items-center gap-2 text-[#c9a227] uppercase tracking-widest"><History className="w-3 h-3" /> Jornadas</h3>
                <button onClick={startNewChat} className="text-[#c9a227] hover:text-white"><PlusCircle className="w-4 h-4" /></button>
              </div>
              <div className="space-y-2">
                {conversations.map(conv => (
                  <button key={conv.id} onClick={() => loadConversation(conv)} className={`w-full group flex items-center justify-between p-3 rounded-xl border transition-all ${activeConversationId === conv.id ? 'bg-[#c9a227]/10 border-[#c9a227]/30' : 'bg-black/10 border-transparent hover:border-white/10'}`}>
                    <div className="flex-1 min-w-0"><p className={`text-[11px] font-bold truncate ${activeConversationId === conv.id ? 'text-white' : 'text-gray-400'}`}>{conv.title}</p></div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div onClick={(e) => renameConversation(e, conv.id)} className="p-1 text-gray-500 hover:text-[#c9a227]"><Pencil className="w-3 h-3" /></div>
                      <div onClick={(e) => deleteConversation(e, conv.id)} className="p-1 text-gray-500 hover:text-red-500"><Trash2 className="w-3 h-3" /></div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <div className="flex-1 flex flex-col gap-4 min-w-0 overflow-hidden">
          <div className="flex-1 bg-[#141414] border border-[#c9a227]/20 rounded-2xl flex flex-col overflow-hidden relative">
            <div className="p-4 border-b border-[#c9a227]/10 flex items-center justify-between bg-black/20">
              <div className="flex items-center gap-3">
                {!isSidebarVisible && <button onClick={() => setIsSidebarVisible(true)} className="p-2 -ml-2 text-[#c9a227] hover:bg-[#c9a227]/10 rounded-lg"><PanelLeftOpen className="w-5 h-5" /></button>}
                <span className="text-sm font-medium text-gray-300">Assistente IA</span>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setIsSidebarVisible(!isSidebarVisible)} className="p-2 text-gray-500 hover:text-[#c9a227]" title="Expandir/Recolher">{isSidebarVisible ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}</button>
                <button onClick={startNewChat} className="p-2 text-gray-500 hover:text-white" title="Novo Chat"><RotateCcw className="w-4 h-4" /></button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-10 bg-gradient-to-b from-transparent to-black/20">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === 'ai' ? 'justify-start' : 'justify-end'} group`}>
                  <div className={`max-w-[95%] md:max-w-[85%] p-6 rounded-2xl ${msg.role === 'ai' ? 'bg-white/[0.03] border border-white/5 text-gray-200 text-lg md:text-xl leading-relaxed shadow-xl' : 'bg-[#c9a227] text-black font-semibold text-base shadow-lg'}`}>
                    {msg.role === 'ai' ? (
                      <>
                        <div className="markdown-content"><ReactMarkdown>{msg.text}</ReactMarkdown></div>
                        <div className="flex items-center gap-4 mt-6 pt-4 border-t border-white/5 opacity-0 group-hover:opacity-100 transition-all">
                          <button onClick={() => {setSavedMessageId(msg.id); setTimeout(() => setSavedMessageId(null), 2000)}} className={`p-2 rounded-lg transition-all ${savedMessageId === msg.id ? 'bg-green-500/20 text-green-500' : 'text-gray-500 hover:text-[#c9a227] hover:bg-white/5'}`} title="Salvar"><Save className="w-4 h-4" /></button>
                          <button onClick={() => handleSend(messages.filter(m => m.role === 'user').pop()?.text)} className="p-2 text-gray-500 hover:text-[#c9a227] hover:bg-white/5 rounded-lg transition-all" title="Regerar"><RotateCcw className="w-4 h-4" /></button>
                        </div>
                      </>
                    ) : msg.text}
                  </div>
                </div>
              ))}
              {isTyping && <div className="flex justify-start animate-pulse"><div className="bg-white/5 p-4 rounded-2xl"><div className="flex gap-1.5"><div className="w-2 h-2 bg-[#c9a227] rounded-full animate-bounce" /><div className="w-2 h-2 bg-[#c9a227] rounded-full animate-bounce delay-100" /><div className="w-2 h-2 bg-[#c9a227] rounded-full animate-bounce delay-200" /></div></div></div>}
              <div ref={chatEndRef} />
            </div>

            <div className="p-4 bg-black/60 border-t border-[#c9a227]/10 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} placeholder="Articule sua visão..." className="flex-1 bg-[#0a0a0a] border border-white/10 rounded-xl py-4 px-5 text-lg text-white focus:border-[#c9a227] transition-all" />
                <button onClick={() => handleSend()} disabled={!input.trim() || isTyping} className="w-14 h-14 bg-[#c9a227] text-black rounded-xl flex items-center justify-center hover:scale-105 shadow-lg"><Send className="w-5 h-5" /></button>
              </div>
              <div className="flex items-center justify-between px-2">
                <p className="text-[9px] text-gray-600 uppercase font-bold tracking-widest">Mentor IA v3.2</p>
                {framework[STEPS[currentStepIndex].id as keyof FrameworkData] && (
                  <button onClick={nextStep} className="flex items-center gap-1 text-[10px] text-[#c9a227] font-black uppercase hover:translate-x-1 transition-all">Próximo Pilar <ChevronRight className="w-3 h-3" /></button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrameworkGenerator;
