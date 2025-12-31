import { motion, AnimatePresence } from 'motion/react';
import { Scan, CheckCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

interface FaceAuthModalProps {
  isOpen: boolean;
  onComplete: (userName: string, gender: 'male' | 'female') => void;
}

// Mock user data
const mockUsers = [
  { name: '张先生', gender: 'male' as const },
  { name: '王女士', gender: 'female' as const },
  { name: '李先生', gender: 'male' as const },
  { name: '刘女士', gender: 'female' as const }
];

export function FaceAuthModal({ isOpen, onComplete }: FaceAuthModalProps) {
  const [stage, setStage] = useState<'scanning' | 'success'>('scanning');
  const [selectedUser] = useState(mockUsers[Math.floor(Math.random() * mockUsers.length)]);

  useEffect(() => {
    if (isOpen) {
      setStage('scanning');
      
      // Simulate face recognition (0.5-1 second)
      const authTime = 500 + Math.random() * 500;
      const timer = setTimeout(() => {
        setStage('success');
        
        // Complete authentication after showing success
        setTimeout(() => {
          onComplete(selectedUser.name, selectedUser.gender);
        }, 800);
      }, authTime);

      return () => clearTimeout(timer);
    }
  }, [isOpen, onComplete, selectedUser]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-slate-900 border border-slate-700 rounded-2xl p-8 max-w-md mx-4"
          >
            <div className="text-center">
              {stage === 'scanning' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6"
                >
                  {/* Scanning Animation */}
                  <div className="relative w-32 h-32 mx-auto">
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0.8, 0.5]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 blur-xl"
                    />
                    <div className="relative w-32 h-32 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
                      <Scan className="w-16 h-16 text-white" />
                    </div>
                    
                    {/* Scanning Lines */}
                    <motion.div
                      animate={{ y: [0, 128, 0] }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                      className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent"
                      style={{ top: 0 }}
                    />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl">人脸识别中</h3>
                    <p className="text-slate-400 text-sm">
                      请保持面部正对摄像头
                    </p>
                  </div>

                  {/* Progress dots */}
                  <div className="flex justify-center gap-2">
                    <motion.div
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                      className="w-2 h-2 rounded-full bg-indigo-400"
                    />
                    <motion.div
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                      className="w-2 h-2 rounded-full bg-indigo-400"
                    />
                    <motion.div
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                      className="w-2 h-2 rounded-full bg-indigo-400"
                    />
                  </div>
                </motion.div>
              )}

              {stage === 'success' && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', duration: 0.5 }}
                  className="space-y-6"
                >
                  {/* Success Icon */}
                  <div className="relative w-32 h-32 mx-auto">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', delay: 0.2 }}
                      className="absolute inset-0 rounded-full bg-green-500/20 blur-xl"
                    />
                    <div className="relative w-32 h-32 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                      <CheckCircle className="w-16 h-16 text-white" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <motion.h3
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-xl text-green-400"
                    >
                      认证成功
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-slate-300"
                    >
                      欢迎回来，{selectedUser.name}
                    </motion.p>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
