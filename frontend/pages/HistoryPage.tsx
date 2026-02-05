
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, StudySession } from '../types';
import { Search, Calendar, FileText, ChevronRight, BookOpen } from 'lucide-react';

interface HistoryPageProps {
  user: User;
  onViewResult: (session: StudySession) => void;
}

const HistoryPage: React.FC<HistoryPageProps> = ({ user, onViewResult }) => {
  const [sessions, setSessions] = useState<StudySession[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const historyStr = localStorage.getItem(`history_${user.id}`) || '[]';
    setSessions(JSON.parse(historyStr));
  }, [user.id]);

  const filtered = sessions.filter(s => 
    s.summary.toLowerCase().includes(search.toLowerCase()) || 
    s.originalText.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h2 className="text-4xl font-orbitron font-bold mb-2">Knowledge Vault</h2>
            <p className="text-slate-400">Recall your previous AI-powered study sessions.</p>
          </div>
          
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input 
              type="text" 
              placeholder="Search sessions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            />
          </div>
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {filtered.map((session, i) => (
              <motion.div
                key={session.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => onViewResult(session)}
                className="group glass p-6 rounded-3xl border border-white/10 hover:border-purple-500/50 hover:bg-white/5 transition-all cursor-pointer flex items-center gap-6"
              >
                <div className="hidden sm:flex flex-col items-center justify-center p-3 glass rounded-2xl text-slate-400 group-hover:text-purple-400 transition-colors">
                  <FileText size={24} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold truncate mb-1 text-slate-200">
                    {session.summary.substring(0, 80).split('\n')[0]}...
                  </h3>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {new Date(session.createdAt).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen size={12} />
                      {session.difficulty} Difficulty
                    </span>
                    <span className="px-2 py-0.5 bg-blue-500/10 text-blue-400 rounded-lg">
                      {session.readingTime} read
                    </span>
                  </div>
                </div>

                <div className="p-2 text-slate-600 group-hover:text-white transition-colors">
                  <ChevronRight size={24} />
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 glass rounded-[32px] border border-white/10">
            <div className="inline-flex p-6 bg-white/5 rounded-full mb-6">
              <Search size={48} className="text-slate-700" />
            </div>
            <h3 className="text-xl font-bold mb-2">No sessions found</h3>
            <p className="text-slate-500">Try adjusting your search or start a new study session.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
