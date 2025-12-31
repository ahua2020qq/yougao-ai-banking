import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface HeroProps {
  scrollY: number;
  onStartService: () => void;
}

export function Hero({ scrollY, onStartService }: HeroProps) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-indigo-900/20 via-transparent to-transparent opacity-50" />
      
      {/* Diamond/Gem Icon */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5, rotateY: 0 }}
        animate={{ opacity: 1, scale: 1, rotateY: 360 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="relative mb-12"
        style={{ transform: `translateY(${scrollY * 0.5}px)` }}
      >
        <div className="relative w-32 h-32 md:w-40 md:h-40">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {/* Diamond shape with gradient */}
            <defs>
              <linearGradient id="diamondGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#818cf8" />
                <stop offset="50%" stopColor="#c084fc" />
                <stop offset="100%" stopColor="#818cf8" />
              </linearGradient>
            </defs>
            
            {/* Outer diamond */}
            <polygon
              points="50,10 70,30 70,50 50,70 30,50 30,30"
              fill="none"
              stroke="url(#diamondGradient)"
              strokeWidth="0.5"
              className="opacity-50"
            />
            
            {/* Middle diamond */}
            <polygon
              points="50,20 65,35 65,50 50,65 35,50 35,35"
              fill="none"
              stroke="url(#diamondGradient)"
              strokeWidth="1"
              className="opacity-75"
            />
            
            {/* Inner diamond */}
            <polygon
              points="50,30 60,40 60,50 50,60 40,50 40,40"
              fill="url(#diamondGradient)"
              className="opacity-40"
            />
            
            {/* Center infinity symbol */}
            <text
              x="50"
              y="55"
              textAnchor="middle"
              fontSize="20"
              fill="white"
              className="font-light"
            >
              ∞
            </text>
          </svg>
          
          {/* Glow effect */}
          <div className="absolute inset-0 bg-indigo-500/20 blur-3xl rounded-full" />
        </div>
      </motion.div>

      {/* Brand Name */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="text-5xl md:text-7xl tracking-[0.2em] mb-4 bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
          NEURA
        </h1>
        <p className="text-xl md:text-2xl text-slate-300 tracking-wider mb-2">
          N E U R A  &nbsp; B A N K
        </p>
        <p className="text-base md:text-lg text-slate-400">
          — 思考的银行，懂你的伙伴 —
        </p>
      </motion.div>

      {/* Quote */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="max-w-2xl mx-auto text-center mb-12"
      >
        <div className="border border-slate-700/50 rounded-lg p-8 md:p-12 bg-slate-900/30 backdrop-blur-sm">
          <p className="text-lg md:text-xl text-slate-300 italic mb-4">
            "未来已来，只是尚未均匀分布。"
          </p>
          <p className="text-sm md:text-base text-slate-400">
            —— 威廉·吉布森
          </p>
        </div>
      </motion.div>

      {/* CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2 }}
      >
        <motion.button
          onClick={onStartService}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group relative px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full text-lg overflow-hidden mb-16"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            <span>开始体验 Neura</span>
          </div>
        </motion.button>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2, repeat: Infinity, repeatType: "reverse" }}
        className="absolute bottom-8"
      >
        <div className="w-6 h-10 border-2 border-slate-600 rounded-full flex items-start justify-center p-2">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-indigo-400 rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}