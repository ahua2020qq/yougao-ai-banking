import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Users, Eye, TrendingUp } from 'lucide-react';

interface GoatCounterStatsProps {
  siteCode: string; // 你的 GoatCounter 站点代码，比如 'neura-bank'
}

export function GoatCounterStats({ siteCode }: GoatCounterStatsProps) {
  const [stats, setStats] = useState({
    totalVisits: 0,
    uniqueVisitors: 0,
    loading: true,
    error: false
  });

  useEffect(() => {
    // 加载 GoatCounter 统计脚本
    const script = document.createElement('script');
    script.src = 'https://gc.zgo.at/count.js';
    script.async = true;
    script.setAttribute('data-goatcounter', `https://${siteCode}.goatcounter.com/count`);
    document.head.appendChild(script);

    // 尝试从 GoatCounter API 获取统计数据
    const fetchStats = async () => {
      try {
        // GoatCounter 的公开 API 端点
        // 注意：需要在 GoatCounter 设置中启用 "公开统计"
        const response = await fetch(`https://${siteCode}.goatcounter.com/counter/${encodeURIComponent('/')}.json`);
        
        if (response.ok) {
          const data = await response.json();
          setStats({
            totalVisits: data.count || 0,
            uniqueVisitors: data.count_unique || 0,
            loading: false,
            error: false
          });
        } else {
          throw new Error('Failed to fetch stats');
        }
      } catch (error) {
        console.log('GoatCounter API not available, using fallback display');
        // 如果 API 不可用，显示基础信息
        setStats({
          totalVisits: 0,
          uniqueVisitors: 0,
          loading: false,
          error: true
        });
      }
    };

    // 延迟获取数据
    setTimeout(fetchStats, 1000);

    return () => {
      // 清理脚本
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [siteCode]);

  // 如果加载中，不显示
  if (stats.loading) {
    return null;
  }

  // 如果出错，显示简化版本
  if (stats.error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed bottom-4 left-4 z-40"
      >
        <div className="bg-slate-900/80 backdrop-blur-lg border border-slate-700/50 rounded-xl p-3 shadow-lg">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-indigo-400" />
            </div>
            <div>
              <div className="text-xs text-slate-400">Analytics Enabled</div>
              <div className="text-xs text-slate-500">GoatCounter Active</div>
            </div>
          </div>
        </div>
      </motion.div>
    );
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
