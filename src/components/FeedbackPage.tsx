import { motion } from 'motion/react';
import { ArrowLeft, Home, MessageCircle, CheckCircle, Clock, Lightbulb, TrendingUp, Download, Share2 } from 'lucide-react';
import type { ServiceResult } from '../App';

interface FeedbackPageProps {
  result: ServiceResult;
  onBackToHome: () => void;
  onNewService: () => void;
}

export function FeedbackPage({ result, onBackToHome, onNewService }: FeedbackPageProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-400" />;
      case 'recommended':
        return <Lightbulb className="w-5 h-5 text-indigo-400" />;
      default:
        return <CheckCircle className="w-5 h-5 text-slate-400" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return '已完成';
      case 'pending':
        return '等待确认';
      case 'recommended':
        return '建议';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-lg border-b border-slate-800/50"
      >
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={onBackToHome}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            <Home className="w-5 h-5" />
            <span>返回首页</span>
          </button>
          
          <h1 className="text-lg">服务完成</h1>

          <button
            onClick={onNewService}
            className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            <span>继续对话</span>
          </button>
        </div>
      </motion.header>

      {/* Content */}
      <div className="px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Success Animation */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', duration: 0.6 }}
            className="flex flex-col items-center justify-center py-8"
          >
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center mb-4">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl text-center mb-2">分析完成！</h2>
            <p className="text-slate-400 text-center">已为你准备好详细的分析报告</p>
          </motion.div>

          {/* Query Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 border border-slate-700/50 rounded-2xl p-6"
          >
            <div className="flex items-start gap-3 mb-4">
              <MessageCircle className="w-5 h-5 text-indigo-400 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-lg mb-2">你的问题</h3>
                <p className="text-slate-300">{result.query}</p>
              </div>
            </div>
          </motion.div>

          {/* Analysis */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/30 rounded-2xl p-6"
          >
            <div className="flex items-start gap-3 mb-4">
              <TrendingUp className="w-5 h-5 text-indigo-400 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-lg mb-3">智能分析</h3>
                <p className="text-slate-200 leading-relaxed whitespace-pre-line">{result.analysis}</p>
              </div>
            </div>
          </motion.div>

          {/* Suggestions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 border border-slate-700/50 rounded-2xl p-6"
          >
            <div className="flex items-start gap-3 mb-4">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0" />
              <h3 className="text-lg">个性化建议</h3>
            </div>
            <ul className="space-y-3">
              {result.suggestions.map((suggestion, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-start gap-3 p-3 bg-slate-800/30 rounded-lg"
                >
                  <div className="w-6 h-6 rounded-full bg-yellow-400/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-yellow-400 text-sm">{index + 1}</span>
                  </div>
                  <p className="text-slate-300 flex-1">{suggestion}</p>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 border border-slate-700/50 rounded-2xl p-6"
          >
            <h3 className="text-lg mb-4">已为你采取的行动</h3>
            <div className="space-y-3">
              {result.actions.map((action, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="flex items-start gap-3 p-4 bg-slate-800/30 rounded-lg border border-slate-700/30"
                >
                  <div className="mt-1">
                    {getStatusIcon(action.status)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium">{action.title}</h4>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-slate-700/50 text-slate-400">
                        {getStatusText(action.status)}
                      </span>
                    </div>
                    <p className="text-sm text-slate-400">{action.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-3 pt-4"
          >
            <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl hover:border-indigo-500/50 transition-colors">
              <Download className="w-5 h-5" />
              <span>下载报告</span>
            </button>
            
            <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl hover:border-indigo-500/50 transition-colors">
              <Share2 className="w-5 h-5" />
              <span>分享结果</span>
            </button>
            
            <button
              onClick={onNewService}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl hover:scale-105 transition-transform"
            >
              <MessageCircle className="w-5 h-5" />
              <span>继续咨询</span>
            </button>
          </motion.div>

          {/* Satisfaction Survey (Optional) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-center py-8 border-t border-slate-800/50"
          >
            <p className="text-slate-400 mb-4">这次服务对你有帮助吗？</p>
            <div className="flex justify-center gap-2">
              {['😞', '😐', '🙂', '😊', '🤩'].map((emoji, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 rounded-full bg-slate-800/50 hover:bg-slate-800 flex items-center justify-center text-2xl transition-colors"
                >
                  {emoji}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
