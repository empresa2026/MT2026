
import React from 'react';
import { Page, User, UserRole } from '../types';
import { 
  LayoutDashboard, 
  BookOpen, 
  Cpu, 
  Library, 
  LogOut, 
  ChevronRight,
  Settings
} from 'lucide-react';

interface SidebarProps {
  user: User | null;
  activePage: Page;
  onNavigate: (page: Page) => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ user, activePage, onNavigate, onLogout }) => {
  const menuItems = [
    { page: Page.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
    { page: Page.MODULES, label: 'Módulos', icon: BookOpen },
    { page: Page.GENERATOR, label: 'Gerador IA', icon: Cpu },
    { page: Page.LIBRARY, label: 'Biblioteca', icon: Library },
    { page: Page.ADMIN, label: 'Administração', icon: Settings, adminOnly: true },
  ];

  return (
    <aside className="w-64 border-r border-[#c9a227]/20 bg-[#0a0a0a] flex flex-col h-full hidden lg:flex">
      <div className="p-8">
        <h1 className="serif text-xl font-bold text-[#c9a227] tracking-wider uppercase">Marketing<br/>Teológico</h1>
      </div>

      <nav className="flex-1 px-4 py-4">
        <ul className="space-y-2">
          {menuItems
            .filter(item => !item.adminOnly || user?.role === UserRole.ADMIN)
            .map((item) => {
              const isActive = activePage === item.page;
              return (
                <li key={item.page}>
                  <button
                    onClick={() => onNavigate(item.page)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 group ${
                      isActive 
                        ? 'bg-[#c9a227]/10 text-[#c9a227] border border-[#c9a227]/20' 
                        : 'text-gray-400 hover:text-[#c9a227] hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className={`w-5 h-5 ${isActive ? 'text-[#c9a227]' : 'group-hover:text-[#c9a227]'}`} />
                      <span className="font-medium text-sm">{item.label}</span>
                    </div>
                    {isActive && <ChevronRight className="w-4 h-4" />}
                  </button>
                </li>
              );
            })}
        </ul>
      </nav>

      <div className="p-4 border-t border-[#c9a227]/10">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-red-400 transition-colors rounded-lg"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-sm font-medium">Sair</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
