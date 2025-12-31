import { motion } from 'motion/react';
import { GraduationCap, Users, User, Store, Globe } from 'lucide-react';

const personas = [
  {
    icon: GraduationCap,
    title: '给初入社会的你',
    description: '不懂理财没关系，Neura会从最基础的记账开始，陪你建立第一个储蓄习惯，看着你从月光到有了第一笔应急金，为你的每一步成长感到骄傲。'
  },
  {
    icon: Users,
    title: '给养育家庭的你',
    description: '房贷、教育、养老，压力我懂。Neura会帮你看清全局，在纷繁的账单中找到平衡，让你在照顾家人的同时，也别忘了照顾自己。'
  },
  {
    icon: User,
    title: '给安享晚年的你',
    description: '不需要学习复杂的APP操作，只要对Neura说话就好。它会用你习惯的方式，守护你一辈子积攒的财富，让你安心、放心。'
  },
  {
    icon: Store,
    title: '给小本经营的你',
    description: '没有财务团队也没关系。Neura就是你的CFO，帮你管账、帮你融资、帮你分析，让小生意也能有大智慧。'
  },
  {
    icon: Globe,
    title: '给每一个相信未来的你',
    description: '金融从来不应该是少数人的游戏。Neura要做的，是让金融智慧像阳光和空气一样，触达每一个人。'
  }
];

export function ForEveryoneSection() {
  return (
    <section className="py-20 px-4 md:px-8 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-5xl mb-4">
          为每一个人
        </h2>
      </motion.div>

      <div className="space-y-8">
        {personas.map((persona, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 border border-slate-700/50 rounded-xl p-6 md:p-8 backdrop-blur-sm hover:border-indigo-500/50 transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-indigo-500/10 flex items-center justify-center flex-shrink-0">
                <persona.icon className="w-6 h-6 text-indigo-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl mb-3 border-b border-slate-700/50 pb-3">
                  {persona.title}
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  {persona.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
