
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User } from '../types';
import { Mail, Lock, User as UserIcon, UserPlus, ArrowLeft } from 'lucide-react';

interface RegisterPageProps {
  onSuccess: (user: User) => void;
  onToggle: () => void;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ onSuccess, onToggle }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulated auth
    setTimeout(() => {
      const mockUser = { id: crypto.randomUUID(), name, email };
      localStorage.setItem('studybuddy_user', JSON.stringify(mockUser));
      onSuccess(mockUser);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full glass-dark p-10 rounded-[40px] border border-white/10 shadow-2xl"
      >
        <div className="text-center mb-10">
          <h2 className="text-3xl font-orbitron font-bold mb-2">Create Identity</h2>
          <p className="text-slate-400 text-sm">Join the network of modern learners</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input 
                type="text" 
                required
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
              />
            </div>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input 
                type="email" 
                required
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input 
                type="password" 
                required
                placeholder="Secure Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-emerald-600 to-blue-600 rounded-2xl font-bold text-lg hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? 'Synthesizing...' : (
              <>
                Register Profile
                <UserPlus size={20} />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-white/5 text-center">
          <button 
            onClick={onToggle}
            className="flex items-center gap-2 mx-auto text-slate-400 text-sm hover:text-white transition-colors"
          >
            <ArrowLeft size={16} />
            Already have an account? Sign In
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
