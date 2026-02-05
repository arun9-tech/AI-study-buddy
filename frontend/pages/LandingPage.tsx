
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Brain, Speaker } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden pt-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center z-10"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-purple-500/30 text-purple-400 text-sm font-medium mb-8">
          <Sparkles size={16} />
          <span>Next Generation Learning</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-orbitron font-black mb-6 leading-tight">
          STUDY SMARTER,<br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-blue-400 to-emerald-400">
            NOT HARDER.
          </span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-slate-400 text-lg md:text-xl mb-10 leading-relaxed">
          Transform dense documents into clear summaries, simplified explanations, 
          and interactive audio lessons powered by Gemini AI.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={onGetStarted}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl font-bold text-lg hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-all flex items-center justify-center gap-2"
          >
            Start Learning Now
            <ArrowRight size={20} />
          </button>
          <button className="px-8 py-4 glass rounded-2xl font-bold text-lg hover:bg-white/5 transition-all">
            See how it works
          </button>
        </div>
      </motion.div>

      {/* Floating Elements */}
      <FloatingCard 
        delay={0} 
        icon={<Brain className="text-blue-400" />} 
        title="AI Summaries" 
        className="top-[20%] left-[10%] hidden lg:flex"
      />
      <FloatingCard 
        delay={1} 
        icon={<Speaker className="text-purple-400" />} 
        title="Speech Mode" 
        className="bottom-[25%] right-[10%] hidden lg:flex"
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 blur-[150px] -z-10 rounded-full" />
    </div>
  );
};

const FloatingCard: React.FC<{ icon: React.ReactNode; title: string; delay: number; className?: string }> = ({ icon, title, delay, className }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ 
      opacity: 1,
      y: [0, -20, 0],
    }}
    transition={{ 
      opacity: { duration: 1 },
      y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: delay } 
    }}
    className={`absolute p-6 glass rounded-3xl border border-white/10 flex items-center gap-4 glow-purple ${className}`}
  >
    <div className="p-3 bg-white/5 rounded-2xl">{icon}</div>
    <span className="font-bold text-lg">{title}</span>
  </motion.div>
);

export default LandingPage;
