
import React from 'react';
import { motion } from 'framer-motion';
import { View, User } from '../types';
import { BookOpen, History, LayoutDashboard, LogOut, User as UserIcon } from 'lucide-react';

interface NavbarProps {
  user: User;
  currentView: View;
  onNavigate: (view: View) => void;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, currentView, onNavigate, onLogout }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3 glass rounded-2xl border border-white/10 shadow-2xl">
        <div 
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => onNavigate(View.DASHBOARD)}
        >
          <div className="p-2 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg group-hover:shadow-[0_0_15px_rgba(168,85,247,0.5)] transition-all">
            <BookOpen size={20} className="text-white" />
          </div>
          <span className="font-orbitron font-bold text-lg tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            STUDY<span className="text-purple-400">BUDDY</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-1">
          <NavBtn 
            active={currentView === View.DASHBOARD} 
            onClick={() => onNavigate(View.DASHBOARD)} 
            icon={<LayoutDashboard size={18} />} 
            label="Dashboard" 
          />
          <NavBtn 
            active={currentView === View.HISTORY} 
            onClick={() => onNavigate(View.HISTORY)} 
            icon={<History size={18} />} 
            label="History" 
          />
        </div>

        <div className="flex items-center gap-4 border-l border-white/10 pl-4">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-xs text-slate-400">Welcome,</span>
            <span className="text-sm font-semibold">{user.name}</span>
          </div>
          <button 
            onClick={onLogout}
            className="p-2 hover:bg-red-500/10 hover:text-red-400 rounded-lg transition-all"
            title="Logout"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </nav>
  );
};

const NavBtn: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode; label: string }> = ({ active, onClick, icon, label }) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
      active ? 'bg-white/10 text-white shadow-inner' : 'text-slate-400 hover:text-white hover:bg-white/5'
    }`}
  >
    {icon}
    {label}
  </button>
);

export default Navbar;
