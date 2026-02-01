
import React from 'react';
import { User, MembershipStatus } from '../types';
import { Bell, User as UserIcon, Crown } from 'lucide-react';

interface NavbarProps {
  user: User | null;
}

const Navbar: React.FC<NavbarProps> = ({ user }) => {
  return (
    <header className="h-16 border-b border-[#c9a227]/20 bg-[#0a0a0a]/80 backdrop-blur-md flex items-center justify-between px-6 z-10">
      <div className="flex items-center gap-3">
        {user?.status === MembershipStatus.PREMIUM && (
          <span className="flex items-center gap-1 text-[10px] uppercase font-bold tracking-widest bg-[#c9a227] text-black px-2 py-0.5 rounded-full">
            <Crown className="w-3 h-3" /> Premium
          </span>
        )}
      </div>
      
      <div className="flex items-center gap-6">
        <button className="text-gray-400 hover:text-[#c9a227] transition-colors">
          <Bell className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold">{user?.name}</p>
            <p className="text-[10px] text-gray-500 uppercase tracking-wider">{user?.status === MembershipStatus.PREMIUM ? 'Membro Premium' : 'Membro Gratuito'}</p>
          </div>
          <div className="w-10 h-10 rounded-full border border-[#c9a227]/30 bg-[#1a1a1a] flex items-center justify-center overflow-hidden">
            <UserIcon className="w-6 h-6 text-[#c9a227]" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
