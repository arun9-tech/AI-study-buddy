
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { StudySession } from '../types';
import { 
  ChevronLeft, Copy, Download, Play, 
  Pause, RefreshCw, Star, Clock, 
  ShieldAlert, Volume2, BookOpen, 
  CheckCircle2, AlertCircle
} from 'lucide-react';
import { generateStudySpeech, decodeAudioData, decodeBase64 } from '../services/gemini';

interface ResultsPageProps {
  session: StudySession;
  onBack: () => void;
}

const ResultsPage: React.FC<ResultsPageProps> = ({ session, onBack }) => {
  const [activeTab, setActiveTab] = useState<'summary' | 'simple' | 'questions'>('summary');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isTtsLoading, setIsTtsLoading] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const handleTTS = async () => {
    if (isSpeaking) {
      sourceRef.current?.stop();
      setIsSpeaking(false);
      return;
    }

    setIsTtsLoading(true);
    try {
      const base64 = await generateStudySpeech(session.summary);
      
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      
      const pcmData = decodeBase64(base64);
      const audioBuffer = await decodeAudioData(pcmData, audioContextRef.current);
      
      const source = audioContextRef.current.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContextRef.current.destination);
      source.onended = () => setIsSpeaking(false);
      
      sourceRef.current = source;
      source.start();
      setIsSpeaking(true);
    } catch (err) {
      console.error(err);
      alert('Failed to generate speech. Audio device might be busy.');
    } finally {
      setIsTtsLoading(false);
    }
  };

  const currentContent = 
    activeTab === 'summary' ? session.summary : 
    activeTab === 'simple' ? session.simpleExplanation : 
    session.questions;

  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
        
        {/* Sidebar Info */}
        <aside className="w-full lg:w-80 flex flex-col gap-6">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={onBack}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-all w-fit"
          >
            <ChevronLeft size={20} />
            Back to Dashboard
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass p-6 rounded-3xl border border-white/10 glow-purple"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-orbitron font-bold text-sm text-purple-400 uppercase tracking-widest">Analytics</h3>
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <Star size={18} className="text-purple-400" />
              </div>
            </div>

            <div className="space-y-6">
              <StatItem 
                icon={<Clock size={16} />} 
                label="Reading Time" 
                value={session.readingTime} 
              />
              <StatItem 
                icon={<ShieldAlert size={16} />} 
                label="Difficulty" 
                value={session.difficulty} 
                color={session.difficulty === 'Hard' ? 'text-red-400' : session.difficulty === 'Medium' ? 'text-yellow-400' : 'text-emerald-400'}
              />
              
              <div className="pt-4 border-t border-white/5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-slate-400">Speech Quality Score</span>
                  <span className="text-lg font-bold text-blue-400">{session.speechScore}%</span>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${session.speechScore}%` }}
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500" 
                  />
                </div>
                <p className="text-[10px] text-slate-500 mt-2 leading-tight italic">
                  "{session.speechFeedback}"
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass p-6 rounded-3xl border border-white/10"
          >
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Keywords</h3>
            <div className="flex flex-wrap gap-2">
              {session.keywords.map((word, i) => (
                <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-slate-300">
                  #{word}
                </span>
              ))}
            </div>
          </motion.div>
        </aside>

        {/* Main Content Area */}
        <section className="flex-1 flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass rounded-[32px] p-1 border border-white/10 flex items-center gap-1"
          >
            <TabBtn active={activeTab === 'summary'} onClick={() => setActiveTab('summary')} icon={<BookOpen size={16}/>} label="Summary" />
            <TabBtn active={activeTab === 'simple'} onClick={() => setActiveTab('simple')} icon={<CheckCircle2 size={16}/>} label="Simple Version" />
            <TabBtn active={activeTab === 'questions'} onClick={() => setActiveTab('questions')} icon={<AlertCircle size={16}/>} label="Key Questions" />
          </motion.div>

          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-dark min-h-[500px] rounded-[40px] p-10 border border-white/10 relative overflow-hidden"
          >
             <div className="flex items-center justify-between mb-8">
               <h2 className="text-2xl font-bold capitalize">{activeTab}</h2>
               <div className="flex items-center gap-2">
                  <button 
                    onClick={() => handleCopy(currentContent)}
                    className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-all border border-white/10" 
                    title="Copy Text"
                  >
                    <Copy size={20} className="text-slate-400" />
                  </button>
                  <button className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-all border border-white/10" title="Download PDF">
                    <Download size={20} className="text-slate-400" />
                  </button>
               </div>
             </div>

             <div className="prose prose-invert max-w-none text-slate-300 leading-relaxed whitespace-pre-wrap text-lg">
               {currentContent}
             </div>

             {/* TTS Bar */}
             <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full max-w-sm px-4">
                <button 
                  onClick={handleTTS}
                  disabled={isTtsLoading}
                  className="w-full glass py-4 px-6 rounded-2xl border border-white/10 shadow-2xl flex items-center justify-between hover:bg-white/5 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl ${isSpeaking ? 'bg-purple-500 animate-pulse' : 'bg-white/10 group-hover:bg-purple-500/20'}`}>
                      {isTtsLoading ? <RefreshCw size={18} className="animate-spin text-purple-400" /> : isSpeaking ? <Pause size={18} className="text-white" /> : <Play size={18} className="text-slate-300" />}
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="text-sm font-bold">{isSpeaking ? 'Now Reading...' : 'Listen to Summary'}</span>
                      <span className="text-[10px] text-slate-500 uppercase">Interactive Speech AI</span>
                    </div>
                  </div>
                  <Volume2 size={20} className={isSpeaking ? 'text-purple-400 animate-bounce' : 'text-slate-600'} />
                </button>
             </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
};

const StatItem: React.FC<{ icon: React.ReactNode; label: string; value: string; color?: string }> = ({ icon, label, value, color = "text-white" }) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-2 text-slate-400">
      {icon}
      <span className="text-xs">{label}</span>
    </div>
    <span className={`text-sm font-bold ${color}`}>{value}</span>
  </div>
);

const TabBtn: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode; label: string }> = ({ active, onClick, icon, label }) => (
  <button
    onClick={onClick}
    className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-[28px] text-sm font-bold transition-all ${
      active ? 'bg-white/10 text-white shadow-xl' : 'text-slate-500 hover:text-slate-300'
    }`}
  >
    {icon}
    {label}
  </button>
);

export default ResultsPage;
