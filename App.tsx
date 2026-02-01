
import React, { useState, useEffect } from 'react';
import { Page, User, MembershipStatus, Chapter, UserRole } from './types';
import { CHAPTERS as INITIAL_CHAPTERS } from './constants';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import ModulesPage from './pages/ModulesPage';
import FrameworkGenerator from './pages/FrameworkGenerator';
import LibraryPage from './pages/LibraryPage';
import AdminPage from './pages/AdminPage';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.LANDING);
  const [user, setUser] = useState<User | null>(null);
  const [chapters, setChapters] = useState<Chapter[]>(INITIAL_CHAPTERS);

  const handleLogin = (email: string) => {
    // Lógica de simulação: se o e-mail for 'admin@marketing.com', entra como Admin
    const isAdmin = email.toLowerCase() === 'admin@marketing.com';
    
    const mockUser: User = {
      id: '1',
      name: isAdmin ? 'Administrador Geral' : 'João Líder',
      email: email,
      status: isAdmin ? MembershipStatus.PREMIUM : MembershipStatus.FREE,
      role: isAdmin ? UserRole.ADMIN : UserRole.MEMBER,
      progress: [],
      badges: []
    };
    setUser(mockUser);
    setCurrentPage(Page.DASHBOARD);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage(Page.LANDING);
  };

  const toggleSession = (sessionId: string) => {
    if (!user) return;
    const newProgress = user.progress.includes(sessionId)
      ? user.progress.filter(id => id !== sessionId)
      : [...user.progress, sessionId];
    setUser({ ...user, progress: newProgress });
  };

  const upgradeToPremium = () => {
    if (user) {
      setUser({ ...user, status: MembershipStatus.PREMIUM });
    }
  };

  const renderPage = () => {
    // Proteção básica: se não for admin e tentar acessar AdminPage, vai para Dashboard
    if (currentPage === Page.ADMIN && user?.role !== UserRole.ADMIN) {
      return <Dashboard user={user} chapters={chapters} onNavigate={setCurrentPage} onUpgrade={upgradeToPremium} />;
    }

    switch (currentPage) {
      case Page.LANDING:
        return <LandingPage onGetStarted={() => setCurrentPage(Page.AUTH)} />;
      case Page.AUTH:
        return <AuthPage onLogin={handleLogin} onBack={() => setCurrentPage(Page.LANDING)} />;
      case Page.DASHBOARD:
        return <Dashboard user={user} chapters={chapters} onNavigate={setCurrentPage} onUpgrade={upgradeToPremium} />;
      case Page.MODULES:
        return <ModulesPage user={user} chapters={chapters} onToggleSession={toggleSession} onUpgrade={upgradeToPremium} />;
      case Page.GENERATOR:
        return <FrameworkGenerator user={user} />;
      case Page.LIBRARY:
        return <LibraryPage user={user} />;
      case Page.ADMIN:
        return <AdminPage chapters={chapters} setChapters={setChapters} />;
      default:
        return <LandingPage onGetStarted={() => setCurrentPage(Page.AUTH)} />;
    }
  };

  const isInside = user && currentPage !== Page.LANDING && currentPage !== Page.AUTH;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100 selection:bg-[#c9a227] selection:text-white">
      {isInside ? (
        <div className="flex h-screen overflow-hidden">
          <Sidebar user={user} activePage={currentPage} onNavigate={setCurrentPage} onLogout={handleLogout} />
          <div className="flex-1 flex flex-col overflow-hidden">
            <Navbar user={user} />
            <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-gradient-to-b from-[#111] to-[#0a0a0a]">
              {renderPage()}
            </main>
          </div>
        </div>
      ) : (
        renderPage()
      )}
    </div>
  );
};

export default App;
