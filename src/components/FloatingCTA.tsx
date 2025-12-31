import { motion } from 'motion/react';
import { MessageCircle } from 'lucide-react';

interface FloatingCTAProps {
  onClick: () => void;
}

export function FloatingCTA({ onClick }: FloatingCTAProps) {
  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full shadow-2xl flex items-center justify-center group"
    >
      <MessageCircle className="w-7 h-7 text-white group-hover:scale-110 transition-transform" />
      
      {/* Pulse effect */}
      <span className="absolute inset-0 rounded-full bg-indigo-500 animate-ping opacity-20" />
      
      {/* Tooltip */}
      <div className="absolute right-full mr-4 px-4 py-2 bg-slate-800 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <p className="text-sm">开始体验 Neura</p>
      </div>
    </motion.button>
  );
}
