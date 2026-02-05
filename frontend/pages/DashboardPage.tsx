
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, StudySession, View } from '../types';
import { Upload, FileText, Send, Sparkles, Loader2 } from 'lucide-react';
import { processStudyMaterial } from '../services/gemini';

interface DashboardPageProps {
  user: User;
  onProcessed: (session: StudySession) => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ user, onProcessed }) => {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleProcess = async () => {
    if (!inputText.trim()) return;
    
    setIsLoading(true);
    setError('');
    
    try {
      const result = await processStudyMaterial(inputText);
      
      const newSession: StudySession = {
        id: crypto.randomUUID(),
        userId: user.id,
        originalText: inputText,
        summary: result.summary,
        simpleExplanation: result.simpleExplanation,
        questions: result.questions,
        speechScore: result.score,
        speechFeedback: result.feedback,
        keywords: result.keywords,
        difficulty: result.difficulty,
        readingTime: result.readingTime,
        createdAt: new Date().toISOString()
      };

      // Save to local history
      const historyStr = localStorage.getItem(`history_${user.id}`) || '[]';
      const history = JSON.parse(historyStr);
      history.unshift(newSession);
      localStorage.setItem(`history_${user.id}`, JSON.stringify(history));

      onProcessed(newSession);
    } catch (err: any) {
      setError(err.message || 'Failed to process material. Check your API key.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      setInputText(text);
    };
    reader.readAsText(file);
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-orbitron font-bold mb-4">Focus Station</h2>
          <p className="text-slate-400">Paste your lecture notes, textbook chapters, or articles to begin.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-dark rounded-[32px] p-8 border border-white/10 shadow-3xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 blur-[100px] -z-10" />
          
          <div className="flex flex-col gap-6">
            <div className="relative">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Drop your study material here..."
                className="w-full h-80 bg-white/5 border border-white/10 rounded-2xl p-6 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all resize-none"
              />
              
              <div className="absolute bottom-4 right-4 flex items-center gap-2">
                <label className="p-3 bg-white/5 hover:bg-white/10 rounded-xl cursor-pointer transition-all border border-white/10 group">
                  <Upload size={20} className="text-slate-400 group-hover:text-purple-400" />
                  <input type="file" className="hidden" accept=".txt,.md" onChange={handleFileUpload} />
                </label>
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
                {error}
              </div>
            )}

            <button
              onClick={handleProcess}
              disabled={isLoading || !inputText.trim()}
              className={`w-full py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all ${
                isLoading || !inputText.trim() 
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:shadow-[0_0_40px_rgba(168,85,247,0.4)] text-white'
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={24} />
                  Gemini is thinking...
                </>
              ) : (
                <>
                  <Sparkles size={24} />
                  Analyze Material
                </>
              )}
            </button>
          </div>
        </motion.div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <FeatureBadge icon={<FileText className="text-emerald-400" />} label="Smart Summary" />
          <FeatureBadge icon={<Sparkles className="text-yellow-400" />} label="Exam Questions" />
          <FeatureBadge icon={<Send className="text-blue-400" />} label="Speech AI" />
        </div>
      </div>
    </div>
  );
};

const FeatureBadge: React.FC<{ icon: React.ReactNode; label: string }> = ({ icon, label }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="p-4 glass rounded-2xl border border-white/10 flex items-center gap-3"
  >
    <div className="p-2 bg-white/5 rounded-lg">{icon}</div>
    <span className="text-sm font-semibold">{label}</span>
  </motion.div>
);

export default DashboardPage;
