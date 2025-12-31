import { motion } from 'motion/react';
import { Brain, MessageSquare, Users, Eye, Globe, Heart } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'AI原生思维',
    line1: '不是给旧银行加AI',
    line2: '而是用AI重新想象',
    line3: '银行该有的样子'
  },
  {
    icon: MessageSquare,
    title: '自然语言交互',
    line1: '不是点击菜单',
    line2: '而是自然对话',
    line3: '像和朋友聊天'
  },
  {
    icon: Users,
    title: '人机共生',
    line1: '不是替代人类',
    line2: '而是增强人类',
    line3: '让每个人更强大'
  },
  {
    icon: Eye,
    title: '预见性服务',
    line1: '不是等你找我',
    line2: '而是主动感知',
    line3: '在你需要时出现'
  },
  {
    icon: Globe,
    title: '无界连接',
    line1: '不是孤立系统',
    line2: '而是开放生态',
    line3: '与你的生活融合'
  },
  {
    icon: Heart,
    title: '普惠金融',
    line1: '不是服务少数人',
    line2: '而是让金融智慧',
    line3: '触达每一个人'
  }
];

export function RedefineSection() {
  return (
    <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-5xl mb-4">
          重新定义银行
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-xl p-6 backdrop-blur-sm hover:border-indigo-500/50 transition-all cursor-pointer"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-indigo-500/10 flex items-center justify-center mb-4">
                <feature.icon className="w-8 h-8 text-indigo-400" />
              </div>
              <h3 className="text-xl mb-4">{feature.title}</h3>
              <div className="space-y-2 text-slate-400 text-sm">
                <p>{feature.line1}</p>
                <p>{feature.line2}</p>
                <p>{feature.line3}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
