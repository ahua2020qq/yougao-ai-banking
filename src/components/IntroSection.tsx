import { motion } from 'motion/react';
import { MessageCircle, TrendingUp, PiggyBank, Heart, Mic } from 'lucide-react';

interface IntroSectionProps {
  onStartService: () => void;
}

export function IntroSection({ onStartService }: IntroSectionProps) {
  return (
    <section className="py-20 px-4 md:px-8 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-5xl mb-6">
          你好，我是 <span className="text-indigo-400">Neura</span>
        </h2>
        <p className="text-xl md:text-2xl text-slate-300">
          不只是银行，是你的金融智能伙伴
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
        className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-2xl p-8 md:p-12 mb-12 backdrop-blur-sm"
      >
        <div className="flex items-start gap-4 mb-8">
          <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center flex-shrink-0 mt-1">
            <div className="w-3 h-3 rounded-full bg-indigo-400" />
          </div>
          <div className="flex-1">
            <p className="text-lg md:text-xl text-slate-200 mb-6">
              我能听懂你的话，理解你的需求，感知你的情绪。
            </p>
            <p className="text-lg md:text-xl text-slate-300 mb-6">
              无论你想——
            </p>
            <ul className="space-y-3 mb-6">
              {[
                { icon: PiggyBank, text: '规划一次旅行的财务' },
                { icon: TrendingUp, text: '分析一笔投资的风险' },
                { icon: MessageCircle, text: '解决一个复杂的资金问题' },
                { icon: Heart, text: '或只是聊聊你的财务困惑' }
              ].map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 text-slate-300"
                >
                  <item.icon className="w-5 h-5 text-indigo-400" />
                  <span>{item.text}</span>
                </motion.li>
              ))}
            </ul>
            <p className="text-lg md:text-xl text-slate-200">
              只需对我说话，像朋友一样。
            </p>
          </div>
        </div>
      </motion.div>

      {/* Interactive Chat Input Demo */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto"
      >
        <div 
          onClick={onStartService}
          className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 backdrop-blur-sm cursor-pointer hover:border-indigo-500/50 transition-all"
        >
          <div className="flex items-center gap-3">
            <MessageCircle className="w-5 h-5 text-slate-400" />
            <div className="flex-1 text-slate-500">
              说点什么，或者问我任何问题...
            </div>
            <button className="w-10 h-10 rounded-full bg-indigo-500/20 hover:bg-indigo-500/30 flex items-center justify-center transition-colors">
              <Mic className="w-5 h-5 text-indigo-400" />
            </button>
          </div>
        </div>
        <p className="text-center text-slate-400 mt-4 text-sm">
          ✨ 试试说："帮我看看这个月花了多少"
        </p>
      </motion.div>
    </section>
  );
}