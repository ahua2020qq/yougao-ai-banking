import { motion } from 'motion/react';
import { Lock, Search, Bot } from 'lucide-react';

const promises = [
  {
    icon: Lock,
    title: '你的数据，只属于你',
    points: [
      '我们不出售你的数据',
      '我们不用你的数据投喂广告',
      '你可以随时导出、删除所有数据'
    ]
  },
  {
    icon: Search,
    title: '透明，是信任的基础',
    points: [
      '每一笔费用，清晰告知',
      '每一个建议，说明理由',
      '每一次决策，你有最终选择权'
    ]
  },
  {
    icon: Bot,
    title: 'AI有边界，人有尊严',
    points: [
      'AI提供建议，但不替你决策',
      'AI追求效率，但不牺牲温度',
      'AI不断进化，但始终服务于人'
    ]
  }
];

export function PromiseSection() {
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
          我们的承诺
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8">
        {promises.map((promise, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 border border-slate-700/50 rounded-xl p-6 md:p-8 backdrop-blur-sm text-center hover:border-indigo-500/50 transition-all"
          >
            <div className="w-16 h-16 rounded-full bg-indigo-500/10 flex items-center justify-center mx-auto mb-6">
              <promise.icon className="w-8 h-8 text-indigo-400" />
            </div>
            <h3 className="text-xl mb-6">{promise.title}</h3>
            <ul className="space-y-3 text-slate-300">
              {promise.points.map((point, pointIndex) => (
                <li key={pointIndex} className="text-sm">
                  {point}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
