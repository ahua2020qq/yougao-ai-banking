import { motion } from 'motion/react';

export function Footer() {
  return (
    <footer className="py-12 px-4 md:px-8 border-t border-slate-800/50">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto"
      >
        <div className="text-center space-y-6">
          <div className="text-2xl tracking-[0.2em] bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
            NEURA
          </div>
          <p className="text-slate-400 text-sm">
            思考的银行，懂你的伙伴
          </p>
          
          {/* Copyright and Version Info */}
          <div className="pt-4 space-y-3">
            <p className="text-slate-500 text-xs">
              &copy; 2025 Neura Bank. 未来已来。
            </p>
            <p className="text-slate-600 text-xs">
              当前版本：V2 主动智能 | 更新时间：2025年12月
            </p>
            
            {/* Legal Disclaimer */}
            <div className="pt-6 max-w-2xl mx-auto space-y-2 border-t border-slate-800/30 mt-6">
              <p className="text-slate-600 text-[10px] leading-relaxed">
                <span className="text-slate-500">⚖️ 版��声明：</span>
                Neura Bank 概念、设计及实现版权所有 © 2024-2025。创建日期：2024年12月。
              </p>
              <p className="text-slate-600 text-[10px] leading-relaxed">
                <span className="text-slate-500">💭 创作初心：</span>
                这是未来银行大脑——金融大脑的入口。本项目为概念原型演示，展现对AI原生金融服务的美好憧憬。
                它很简洁，它很美，它会越来越智能。所有功能均为模拟演示，不涉及真实金融交易。
              </p>
              <p className="text-slate-600 text-[10px]">
                <span className="text-slate-500">🚀 致未来：</span>
                终有一天，有心人会发现——我们很早就在这里，埋下了通往未来的种子。
              </p>
              <p className="text-slate-700 text-[10px] pt-2 opacity-50">
                <span className="text-slate-600">🧠 深入探索：</span>
                <span className="text-slate-700">金融大脑 — 即将到来</span>
              </p>
              <p className="text-slate-700 text-[10px] pt-2">
                <span className="text-slate-600">💬 交流探讨：</span>
                <a 
                  href="mailto:ahua2020@qq.com" 
                  className="text-slate-600 hover:text-slate-400 transition-colors underline decoration-slate-800 underline-offset-2"
                >
                  ahua2020@qq.com
                </a>
                <span className="text-slate-700"> — 欢迎与我交流探讨关于未来AI原生银行的构想</span>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}