import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

const comparisons = [
  { past: '你找银行', future: '银行找你' },
  { past: '你学银行的规则', future: '银行适应你的方式' },
  { past: '你填表格', future: '你说话' },
  { past: '你等结果', future: '你得到解释' },
  { past: '你是用户', future: '你是伙伴' }
];

export function ComparisonSection() {
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
          不是更聪明的APP
        </h2>
        <p className="text-2xl md:text-3xl text-indigo-400">
          是一种新的关系
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 border border-slate-700/50 rounded-2xl p-8 md:p-12 backdrop-blur-sm mb-12"
      >
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="text-center">
            <h3 className="text-2xl mb-6 text-slate-400">过去</h3>
          </div>
          <div className="text-center">
            <h3 className="text-2xl mb-6 text-indigo-400">未来</h3>
          </div>
        </div>

        <div className="space-y-6">
          {comparisons.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-4 items-center"
            >
              <div className="text-slate-400 text-center md:text-right p-4 rounded-lg bg-slate-800/30">
                {item.past}
              </div>
              <div className="hidden md:flex justify-center">
                <ArrowRight className="w-6 h-6 text-indigo-400" />
              </div>
              <div className="md:hidden flex justify-center">
                <ArrowRight className="w-6 h-6 text-indigo-400 rotate-90" />
              </div>
              <div className="text-indigo-300 text-center md:text-left p-4 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
                {item.future}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 pt-12 border-t border-slate-700/50 text-center space-y-4"
        >
          <p className="text-xl md:text-2xl text-indigo-400 mb-4">
            Neura 不是工具
          </p>
          <p className="text-lg text-slate-300">
            是和你一起成长的伙伴
          </p>
          <div className="space-y-2 text-slate-400 max-w-md mx-auto">
            <p>它会记住你的偏好</p>
            <p>理解你的处境</p>
            <p>尊重你的选择</p>
            <p>守护你的未来</p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
