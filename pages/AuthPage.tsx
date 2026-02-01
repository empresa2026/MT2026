
import React, { useState } from 'react';
import { ArrowLeft, Mail, Lock, Chrome } from 'lucide-react';

interface AuthPageProps {
  onLogin: (email: string) => void;
  onBack: () => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onLogin, onBack }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) onLogin(email);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#c9a227]/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="w-full max-w-md relative z-10">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-gray-500 hover:text-[#c9a227] transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Voltar para Home
        </button>

        <div className="bg-[#141414] p-8 md:p-10 rounded-2xl border border-[#c9a227]/20 shadow-2xl">
          <div className="text-center mb-10">
            <h2 className="serif text-3xl font-bold text-white mb-2">{isLogin ? 'Bem-vindo de volta' : 'Inicie sua jornada'}</h2>
            <p className="text-gray-400 text-sm">Acesse sua área de membros exclusiva</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs uppercase tracking-widest text-[#c9a227] font-bold mb-2">E-mail</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="w-full bg-[#0a0a0a] border border-[#c9a227]/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#c9a227] transition-colors"
                />
              </div>
              <p className="text-[10px] text-gray-600 mt-2 italic text-center">Para testar o Admin use: admin@marketing.com</p>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-[#c9a227] font-bold mb-2">Senha</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full bg-[#0a0a0a] border border-[#c9a227]/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#c9a227] transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-[#c9a227] text-black font-bold rounded-lg hover:bg-[#a68520] transition-all"
            >
              {isLogin ? 'Entrar' : 'Cadastrar'}
            </button>
          </form>

          <div className="my-8 flex items-center gap-4 text-gray-600">
            <div className="flex-1 h-px bg-gray-800" />
            <span className="text-xs uppercase tracking-widest">Ou</span>
            <div className="flex-1 h-px bg-gray-800" />
          </div>

          <button className="w-full py-3 bg-white/5 border border-white/10 text-white rounded-lg hover:bg-white/10 transition-all flex items-center justify-center gap-3">
            <Chrome className="w-5 h-5" />
            Continuar com Google
          </button>

          <p className="text-center text-gray-500 text-sm mt-8">
            {isLogin ? 'Não tem uma conta?' : 'Já possui uma conta?'}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 text-[#c9a227] font-bold hover:underline"
            >
              {isLogin ? 'Criar agora' : 'Entrar aqui'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
