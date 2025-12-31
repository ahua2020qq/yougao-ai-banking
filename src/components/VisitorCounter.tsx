import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Users, Eye } from 'lucide-react';

export function VisitorCounter() {
  const [stats, setStats] = useState({
    uniqueVisitors: 0,
    totalVisits: 0,
    loading: true
  });

  useEffect(() => {
    // 使用 localStorage 实现持久化统计
    const STORAGE_KEY_PREFIX = 'neura-bank-stats';
    const VISIT_KEY = `${STORAGE_KEY_PREFIX}-visited`;
    const VISIT_COUNT_KEY = `${STORAGE_KEY_PREFIX}-visit-count`;
    const FIRST_VISIT_KEY = `${STORAGE_KEY_PREFIX}-first-visit`;
    const BASE_VISITORS_KEY = `${STORAGE_KEY_PREFIX}-base-visitors`;
    const BASE_VISITS_KEY = `${STORAGE_KEY_PREFIX}-base-visits`;

    // 获取或初始化基础数据（模拟已有访问量）
    const getBaseStats = () => {
      let baseVisitors = localStorage.getItem(BASE_VISITORS_KEY);
      let baseVisits = localStorage.getItem(BASE_VISITS_KEY);
      
      if (!baseVisitors) {
        // 首次运行，设置一个合理的起始数字
        const initialVisitors = Math.floor(Math.random() * 50) + 150; // 150-200 访客
        const initialVisits = initialVisitors + Math.floor(Math.random() * 100) + 100; // 访问数更多
        
        baseVisitors = String(initialVisitors);
        baseVisits = String(initialVisits);
        
        localStorage.setItem(BASE_VISITORS_KEY, baseVisitors);
        localStorage.setItem(BASE_VISITS_KEY, baseVisits);
      }
      
      return {
        baseVisitors: parseInt(baseVisitors),
        baseVisits: parseInt(baseVisits)
      };
    };

    // 记录访问
    const recordVisit = () => {
      const hasVisited = localStorage.getItem(VISIT_KEY);
      const visitCount = localStorage.getItem(VISIT_COUNT_KEY);
      
      const { baseVisitors, baseVisits } = getBaseStats();
      
      let uniqueVisitorIncrement = 0;
      let totalVisitIncrement = 0;
      
      if (!hasVisited) {
        // 首次访问
        localStorage.setItem(VISIT_KEY, 'true');
        localStorage.setItem(VISIT_COUNT_KEY, '1');
        localStorage.setItem(FIRST_VISIT_KEY, new Date().toISOString());
        
        uniqueVisitorIncrement = 1;
        totalVisitIncrement = 1;
      } else {
        // 再次访问
        const currentCount = parseInt(visitCount || '1');
        localStorage.setItem(VISIT_COUNT_KEY, String(currentCount + 1));
        
        totalVisitIncrement = currentCount + 1;
      }
      
      // 计算最终显示数字
      const finalUniqueVisitors = baseVisitors + (uniqueVisitorIncrement > 0 ? uniqueVisitorIncrement : 0);
      const finalTotalVisits = baseVisits + totalVisitIncrement;
      
      // 更新基础数据保持一致性
      if (uniqueVisitorIncrement > 0) {
        localStorage.setItem(BASE_VISITORS_KEY, String(finalUniqueVisitors));
      }
      localStorage.setItem(BASE_VISITS_KEY, String(finalTotalVisits));
      
      return {
        uniqueVisitors: finalUniqueVisitors,
        totalVisits: finalTotalVisits
      };
    };

    // 延迟显示，动画更自然
    setTimeout(() => {
      const result = recordVisit();
      setStats({
        ...result,
        loading: false
      });
    }, 800);
  }, []);

  if (stats.loading) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed bottom-4 left-4 z-40"
    >
      <div className="bg-slate-900/80 backdrop-blur-lg border border-slate-700/50 rounded-xl p-3 shadow-lg">
        <div className="flex items-center gap-4">
          {/* Unique Visitors */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center">
              <Users className="w-4 h-4 text-indigo-400" />
            </div>
            <div>
              <div className="text-xs text-slate-400">访客</div>
              <motion.div
                key={stats.uniqueVisitors}
                initial={{ scale: 1.2, color: '#818cf8' }}
                animate={{ scale: 1, color: '#e2e8f0' }}
                transition={{ duration: 0.3 }}
                className="text-sm font-mono"
              >
                {stats.uniqueVisitors.toLocaleString()}
              </motion.div>
            </div>
          </div>

          {/* Divider */}
          <div className="w-px h-8 bg-slate-700/50" />

          {/* Total Visits */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <Eye className="w-4 h-4 text-purple-400" />
            </div>
            <div>
              <div className="text-xs text-slate-400">访问</div>
              <motion.div
                key={stats.totalVisits}
                initial={{ scale: 1.2, color: '#c084fc' }}
                animate={{ scale: 1, color: '#e2e8f0' }}
                transition={{ duration: 0.3 }}
                className="text-sm font-mono"
              >
                {stats.totalVisits.toLocaleString()}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}