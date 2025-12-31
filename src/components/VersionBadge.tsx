import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface VersionBadgeProps {
  version: 'v1' | 'v2';
}

export function VersionBadge({ version }: VersionBadgeProps) {
  const isV2 = version === 'v2';
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed top-4 left-4 z-50"
    >
      <div className={`px-4 py-2 rounded-full backdrop-blur-sm border ${
        isV2 
          ? 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-amber-500/50' 
          : 'bg-slate-800/50 border-slate-700/50'
      }`}>
        <div className="flex items-center gap-2">
          {isV2 && <Sparkles className="w-4 h-4 text-amber-400" />}
          <span className={`text-sm ${isV2 ? 'text-amber-300' : 'text-slate-400'}`}>
            {isV2 ? 'V2 主动智能' : 'V1 基础版本'}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
