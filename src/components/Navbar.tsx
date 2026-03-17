import React from 'react';
import { Code2, Terminal, User, Bell, Settings, Plus } from 'lucide-react';

interface NavbarProps {
  onHome: () => void;
  onAddProblem: () => void;
}

export function Navbar({ onHome, onAddProblem }: NavbarProps) {
  return (
    <nav className="border-b border-white/5 bg-[#1a1a1a] px-6 py-3 sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer group"
          onClick={onHome}
        >
          <div className="bg-emerald-500 p-1.5 rounded-lg group-hover:bg-emerald-400 transition-colors">
            <Code2 className="w-5 h-5 text-black" />
          </div>
          <span className="text-xl font-bold text-white tracking-tight">CodeQuest</span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
          <button onClick={onHome} className="hover:text-white transition-colors">Problems</button>
          <button className="hover:text-white transition-colors">Contest</button>
          <button className="hover:text-white transition-colors">Discuss</button>
          <button 
            onClick={onAddProblem}
            className="flex items-center gap-1.5 text-emerald-500 hover:text-emerald-400 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Contribute
          </button>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all">
            <Bell className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all">
            <Settings className="w-5 h-5" />
          </button>
          <div className="w-8 h-8 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center text-emerald-500 font-bold text-xs">
            NP
          </div>
        </div>
      </div>
    </nav>
  );
}
