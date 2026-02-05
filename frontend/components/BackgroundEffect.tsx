
import React from 'react';
import { motion } from 'framer-motion';

const BackgroundEffect: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-0 overflow-hidden bg-[#020617]">
      {/* Animated Gradients */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, 100, 0],
          y: [0, -50, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute -top-1/4 -left-1/4 w-full h-full bg-purple-900/20 blur-[120px] rounded-full"
      />
      <motion.div 
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
          x: [0, -80, 0],
          y: [0, 60, 0]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-1/4 -right-1/4 w-full h-full bg-blue-900/20 blur-[120px] rounded-full"
      />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
    </div>
  );
};

export default BackgroundEffect;
