import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface CTASectionProps {
  onStartService: () => void;
}

export function CTASection({ onStartService }: CTASectionProps) {
  return (
    <section className="py-20 px-4 md:px-8 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-5xl mb-4">
          一起创造未来
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/30 rounded-2xl p-8 md:p-12 backdrop-blur-sm"
      >
        <div className="space-y-6 text-center text-slate-300 mb-8">
          <p className="text-lg">
            Neura 还在成长。
          </p>
          <p className="text-lg">
            每一次你和它的对话，都在让它变得更聪明、更懂你。
          </p>
          <p className="text-lg">
            我们相信，最好的产品是和用户一起创造的。
          </p>
          <p className="text-lg">
            如果你也相信金融可以更智能、更普惠、更有温度——
          </p>
          <p className="text-lg">
            加入我们，成为未来的共创者。
          </p>
        </div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex justify-center"
        >
          <button
            onClick={onStartService}
            className="group relative px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full text-lg overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              <span>开始体验 Neura</span>
            </div>
          </button>
        </motion.div>
      </motion.div>

      {/* Decorative infinity symbol */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        viewport={{ once: true }}
        className="mt-16 text-center"
      >
        <div className="inline-block">
          <svg viewBox="0 0 100 50" className="w-24 h-12 md:w-32 md:h-16">
            <defs>
              <linearGradient id="infinityGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#818cf8" />
                <stop offset="50%" stopColor="#c084fc" />
                <stop offset="100%" stopColor="#818cf8" />
              </linearGradient>
            </defs>
            <path
              d="M 20,25 C 20,15 30,15 35,25 C 40,35 50,35 50,25 C 50,15 60,15 65,25 C 70,35 80,35 80,25"
              fill="none"
              stroke="url(#infinityGradient)"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </motion.div>
    </section>
  );
}