import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Mic, ArrowLeft, Sparkles, Bell, TrendingUp, Calendar, Lightbulb, X } from 'lucide-react';
import type { ServiceResult } from '../App';
import { FaceAuthModal } from './FaceAuthModal';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
}

interface ProactiveNotification {
  id: string;
  type: 'discount' | 'calendar' | 'learning';
  title: string;
  content: string;
  action: string;
  icon: typeof Bell;
}

interface ServicePageProps {
  onComplete: (result: ServiceResult) => void;
  onBack: () => void;
}

interface UserAuth {
  isAuthenticated: boolean;
  userName: string;
  gender: 'male' | 'female' | null;
  lastActivityTime: number;
}

const quickActions = [
  '帮我看看这个月花了多少',
  '我想开始存钱买房',
  '分析一下我的投资组合',
  '制定一个旅行储蓄计划'
];

const proactiveNotifications: ProactiveNotification[] = [
  {
    id: '1',
    type: 'discount',
    title: '发现优惠机会',
    content: '检测到你常去的星巴克在打折，办会员卡可省¥200/年。要帮你计算收益吗？',
    action: '帮我算算',
    icon: TrendingUp
  },
  {
    id: '2',
    type: 'calendar',
    title: '行程财务规划',
    content: '你日历上下周四有去上海的行程，我注意到你还没预订酒店。要不要我帮你规划差旅预算？',
    action: '开始规划',
    icon: Calendar
  },
  {
    id: '3',
    type: 'learning',
    title: '为你准备的内容',
    content: '我注意到你最近经常问投资的问题，基于你的风险偏好，我为你准备了一份《稳健投资入门指南》',
    action: '查看指南',
    icon: Lightbulb
  }
];

const mockResponses: Record<string, ServiceResult> = {
  default: {
    query: '帮我看看这个月花了多少',
    analysis: '根据你的账户分析，本月（12月1日-10日）已支出 ¥3,247元，比上月同期减少12%。主要支出集中在餐饮(¥1,247)和交通(¥856)。',
    suggestions: [
      '餐饮支出较高，建议尝试每周2-3次自己做饭，预计每月可节省¥400',
      '你的周末聚餐频率较高，考虑与朋友AA制或选择性价比更高的餐厅',
      '交通费用合理，但发现你常打车，建议高峰期使用地铁可节省30%'
    ],
    actions: [
      {
        title: '自动记账已开启',
        description: '我会持续追踪你的支出，每周为你生成消费报告',
        status: 'completed'
      },
      {
        title: '预算提醒',
        description: '本月剩余预算 ¥4,753，按当前速���可以放心消费',
        status: 'completed'
      },
      {
        title: '储蓄建议',
        description: '建议本月预留 ¥1,500 转入储蓄账户',
        status: 'recommended'
      }
    ]
  },
  saving: {
    query: '我想开始存钱买房',
    analysis: '根据你目前的收入和支出情况，我为你规划了一个现实可行的购房储蓄计划。假设目标房价200万，首付60万（30%），建议储蓄周期为5年。',
    suggestions: [
      '每月固定储蓄 ¥8,000，其中 ¥5,000 存入定期，¥3,000 投入稳健型基金',
      '减少非必要支出：控制每月娱乐支出在 ¥1,000 以内',
      '增加收入来源：利用周末时间做兼职或发展副业，目标月增收 ¥2,000'
    ],
    actions: [
      {
        title: '购房基金账户已创建',
        description: '专属储蓄账户，自动每月10号转入 ¥8,000',
        status: 'completed'
      },
      {
        title: '投资组合配置',
        description: '已为你匹配3支低风险基金，预期年化收益5-7%',
        status: 'pending'
      },
      {
        title: '房价监控',
        description: '持续追踪目标区域房价变化，适时提醒你调整计划',
        status: 'completed'
      }
    ]
  },
  investment: {
    query: '分析一下我的投资组合',
    analysis: '你当前持有3支基金，总市值 ¥45,680，近30天收益率 +2.3%。整体风险等级中等，但存在行业集中度过高的问题（科技板块占比68%）。',
    suggestions: [
      '建议降低科技板块占比至50%，增配消费和医药板块以分散风险',
      '你的债券类资产为0，建议配置15-20%的债券基金提高组合稳定性',
      '当前市场处于震荡期，建议采用定投策略，每月固定投入 ¥2,000'
    ],
    actions: [
      {
        title: '风险评估报告',
        description: '你的投资风险承受能力为"中等偏高"，当前组合匹配度85%',
        status: 'completed'
      },
      {
        title: '再平衡建议',
        description: '建议卖出科技基金¥8,000，买入消费+医药各¥4,000',
        status: 'recommended'
      },
      {
        title: '定投计划',
        description: '为你设置了智能定投，每月15号自动投入¥2,000',
        status: 'pending'
      }
    ]
  },
  travel: {
    query: '制定一个旅行储蓄计划',
    analysis: '很高兴看到你想给自己一个假期！根据你的旅行目标和预算偏好，我建议准备 ¥12,000 的旅行基金，足够支持一次舒适的国内深度游或周边国家游。',
    suggestions: [
      '设定6个月储蓄期，每月存入 ¥2,000 到旅行专用账户',
      '关注航空公司会员日和旅游平台大促，机票和酒店可节省30%',
      '推荐目的地：云南（预算¥8,000）、日本（预算¥12,000）、新疆（预算¥10,000）'
    ],
    actions: [
      {
        title: '旅行基金已创建',
        description: '专属账户"梦想之旅"，每月1号自动转入 ¥2,000',
        status: 'completed'
      },
      {
        title: '价格监控',
        description: '已为你监控心仪目的地的机票和酒店价格变动',
        status: 'completed'
      },
      {
        title: '旅行保险',
        description: '出发前记得购买旅行保险，预算约 ¥200-300',
        status: 'recommended'
      }
    ]
  },
  // V2 主动智能场景的完整响应
  discount: {
    query: '帮我算算星巴克会员卡的收益',
    analysis: '基于你过去3个月的消费数据，你平均每周去星巴克3次，每次消费约¥35。当前星巴克会员日活动：办理会员卡¥299/年，享受全年饮品9折+每月赠送3张买一送一券。',
    suggestions: [
      '按你的消费频率，会员卡全年可节省约¥520（9折优惠¥420 + 券价值¥100）',
      '净收益 ¥221/年，投资回报率74%，相当于一个月免费喝咖啡',
      '建议立即办理，活动仅剩2天，我可以帮你在线完成申请'
    ],
    actions: [
      {
        title: '消费分析完成',
        description: '已分析你在星巴克的消费习惯和频次',
        status: 'completed'
      },
      {
        title: '优惠监控',
        description: '已为你添加"星巴克会员日"提醒，下次活动时通知你',
        status: 'completed'
      },
      {
        title: '一键办理',
        description: '点击确认即可自动完成会员卡申请并支付',
        status: 'recommended'
      }
    ]
  },
  calendar: {
    query: '帮我规划去上海的差旅预算',
    analysis: '你的日历显示12月18日（下周四）10:00在上海有会议，但我注意到你还没有预订交通和住宿。基于你的消费习惯和差旅偏好，我为你规划了一个舒适且性价比高的方案。',
    suggestions: [
      '高铁：建议12月18日早7:00出发（二等座¥553），当天22:00返回，总计¥1,106',
      '酒店：会议地点附近有3家高分酒店，商务大床房¥380-450/晚，推荐提前预订',
      '餐饮+交通：预留¥300，总预算约¥1,800（已考虑10%意外支出）'
    ],
    actions: [
      {
        title: '日程同步完成',
        description: '已关联你的日历，自动识别差旅需求',
        status: 'completed'
      },
      {
        title: '预算账户已创建',
        description: '专项"上海差旅"账户，已预留¥2,000',
        status: 'completed'
      },
      {
        title: '一键预订',
        description: '确认后可自动完成高铁+酒店预订，优先使用积分抵扣',
        status: 'recommended'
      }
    ]
  },
  learning: {
    query: '查看《稳健投资入门指南》',
    analysis: '基于你最近7天的咨询记录，我发现你对投资很感兴趣，但对风险把控比较谨慎。我为你准备了一份个性化的入门指南，专注于适合你的稳健型投资策略。',
    suggestions: [
      '建议从指数基金定投开始，沪深300+中证500组合，月投¥2,000起',
      '债券基金配置20%作为安全垫，推荐3支高信用等级债基',
      '设置止盈点15%，单次投入不超过总资产的10%，严控风险'
    ],
    actions: [
      {
        title: '个性化指南已生成',
        description: '基于你的风险承受能力（中等偏低）定制的30页PDF报告',
        status: 'completed'
      },
      {
        title: '模拟投资组合',
        description: '为你创建了一个虚拟账户，可以先模拟练习3个月',
        status: 'completed'
      },
      {
        title: '学习计划',
        description: '建议每周阅读1章（共6章），我会在每周一推送学习提醒',
        status: 'recommended'
      }
    ]
  }
};

export function ServicePage({ onComplete, onBack }: ServicePageProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: '你好！我是 Neura，你的智能金融伙伴 ✨\n\n今天想聊些什么？你可以问我任何关于财务的问题，或者试试下面的快捷选项。',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [notifications, setNotifications] = useState<ProactiveNotification[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [dismissedNotifications, setDismissedNotifications] = useState<Set<string>>(new Set());
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [userAuth, setUserAuth] = useState<UserAuth>({
    isAuthenticated: false,
    userName: '',
    gender: null,
    lastActivityTime: Date.now()
  });
  const [pendingAction, setPendingAction] = useState<(() => void) | ''>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Show proactive notifications after a delay
  useEffect(() => {
    const timer1 = setTimeout(() => {
      if (!dismissedNotifications.has('1')) {
        setNotifications([proactiveNotifications[0]]);
        setShowNotifications(true);
      }
    }, 3000);

    const timer2 = setTimeout(() => {
      if (!dismissedNotifications.has('2')) {
        setNotifications(prev => [...prev, proactiveNotifications[1]]);
      }
    }, 8000);

    const timer3 = setTimeout(() => {
      if (!dismissedNotifications.has('3')) {
        setNotifications(prev => [...prev, proactiveNotifications[2]]);
      }
    }, 13000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [dismissedNotifications]);

  // Check if authentication is needed (60 seconds timeout)
  const needsReAuth = () => {
    if (!userAuth.isAuthenticated) return true;
    const timeSinceLastActivity = Date.now() - userAuth.lastActivityTime;
    return timeSinceLastActivity > 60000; // 60 seconds
  };

  const updateLastActivity = () => {
    setUserAuth(prev => ({
      ...prev,
      lastActivityTime: Date.now()
    }));
  };

  const handleAuthComplete = (userName: string, gender: 'male' | 'female') => {
    setUserAuth({
      isAuthenticated: true,
      userName,
      gender,
      lastActivityTime: Date.now()
    });
    setShowAuthModal(false);

    // Update welcome message with user name
    setMessages(prev => {
      const updatedMessages = [...prev];
      if (updatedMessages[0].id === '1') {
        updatedMessages[0] = {
          ...updatedMessages[0],
          content: `你好，${userName}！我是 Neura，你的智能金融伙伴 ✨\n\n今天想聊些什么？你可以问我任何关于财务的问题，或者试试下面的快捷选项。`
        };
      }
      return updatedMessages;
    });

    // Process pending action
    if (pendingAction) {
      pendingAction();
      setPendingAction('');
    }
  };

  const handleDismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    setDismissedNotifications(prev => new Set(prev).add(id));
  };

  const handleNotificationAction = (notification: ProactiveNotification) => {
    // Check if authentication is needed before processing notification
    if (!userAuth.isAuthenticated || needsReAuth()) {
      // Store the pending notification action
      setPendingAction(() => () => {
        // Execute the actual notification action after authentication
        executeNotificationAction(notification);
      });
      setShowAuthModal(true);
      return;
    }
    
    // If already authenticated, execute directly
    executeNotificationAction(notification);
  };

  const executeNotificationAction = (notification: ProactiveNotification) => {
    handleDismissNotification(notification.id);
    
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: notification.action,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsProcessing(true);
    
    // AI thinking
    const thinkingMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: 'ai',
      content: '正在为你分析...',
      timestamp: new Date(),
      isTyping: true
    };

    setTimeout(() => {
      setMessages(prev => [...prev, thinkingMessage]);
    }, 500);
    
    // Complete analysis and jump to feedback page
    setTimeout(() => {
      setMessages(prev => prev.filter(m => !m.isTyping));
      
      const responseMessage: Message = {
        id: (Date.now() + 2).toString(),
        type: 'ai',
        content: `好的！让我为你详细分析\"${notification.title}\"...`,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, responseMessage]);

      // Navigate to feedback page with the appropriate result
      setTimeout(() => {
        let resultKey: keyof typeof mockResponses = 'default';
        if (notification.type === 'discount') {
          resultKey = 'discount';
        } else if (notification.type === 'calendar') {
          resultKey = 'calendar';
        } else if (notification.type === 'learning') {
          resultKey = 'learning';
        }

        onComplete(mockResponses[resultKey]);
      }, 2000);
    }, 2000);
  };

  const processSendMessage = (text: string) => {
    if (!text.trim() || isProcessing) return;

    updateLastActivity();

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsProcessing(true);

    // Simulate AI thinking
    const thinkingMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: 'ai',
      content: '思考中...',
      timestamp: new Date(),
      isTyping: true
    };

    setTimeout(() => {
      setMessages(prev => [...prev, thinkingMessage]);
    }, 500);

    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => prev.filter(m => !m.isTyping));
      
      const greeting = userAuth.isAuthenticated ? `好的，${userAuth.userName}！` : '好的！';
      const responseMessage: Message = {
        id: (Date.now() + 2).toString(),
        type: 'ai',
        content: `${greeting}让我为你分析一下... 我需要查看你的账户数据和消费记录，这可能需要几秒钟。`,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, responseMessage]);

      // Navigate to feedback page
      setTimeout(() => {
        let resultKey: keyof typeof mockResponses = 'default';
        if (text.includes('存钱') || text.includes('买房')) {
          resultKey = 'saving';
        } else if (text.includes('投资')) {
          resultKey = 'investment';
        } else if (text.includes('旅行')) {
          resultKey = 'travel';
        } else if (text.includes('星巴克')) {
          resultKey = 'discount';
        } else if (text.includes('上海')) {
          resultKey = 'calendar';
        } else if (text.includes('学习')) {
          resultKey = 'learning';
        }

        onComplete(mockResponses[resultKey]);
      }, 2000);
    }, 2000);
  };

  const handleSendMessage = (text: string) => {
    // Check authentication before processing
    if (needsReAuth()) {
      setPendingAction(() => () => {
        processSendMessage(text);
      });
      setShowAuthModal(true);
      return;
    }

    processSendMessage(text);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Face Authentication Modal */}
      <FaceAuthModal 
        isOpen={showAuthModal}
        onComplete={handleAuthComplete}
      />

      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-lg border-b border-slate-800/50"
      >
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>返回首页</span>
          </button>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="text-lg">Neura</span>
            {userAuth.isAuthenticated && (
              <span className="text-sm text-slate-400">· {userAuth.userName}</span>
            )}
          </div>

          <div className="w-20" /> {/* Spacer for alignment */}
        </div>
      </motion.header>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className="flex items-start gap-3 max-w-[80%] md:max-w-[70%]">
                  {message.type === 'ai' && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-4 h-4" />
                    </div>
                  )}
                  
                  <div
                    className={`rounded-2xl p-4 ${
                      message.type === 'user'
                        ? 'bg-indigo-500 text-white'
                        : 'bg-slate-800/50 border border-slate-700/50'
                    }`}
                  >
                    {message.isTyping ? (
                      <div className="flex gap-1">
                        <motion.div
                          animate={{ opacity: [0.4, 1, 0.4] }}
                          transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                          className="w-2 h-2 bg-indigo-400 rounded-full"
                        />
                        <motion.div
                          animate={{ opacity: [0.4, 1, 0.4] }}
                          transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                          className="w-2 h-2 bg-indigo-400 rounded-full"
                        />
                        <motion.div
                          animate={{ opacity: [0.4, 1, 0.4] }}
                          transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                          className="w-2 h-2 bg-indigo-400 rounded-full"
                        />
                      </div>
                    ) : (
                      <p className="whitespace-pre-line">{message.content}</p>
                    )}
                  </div>

                  {message.type === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm">👤</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {/* Proactive Notifications - Compact style */}
          <AnimatePresence>
            {notifications.map((notification, index) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ type: 'spring', damping: 20 }}
                className="flex justify-end"
              >
                <div className="max-w-[90%] md:max-w-[400px]">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-br from-amber-500/5 to-orange-500/5 border border-amber-500/20 rounded-xl p-3 backdrop-blur-sm shadow-lg"
                  >
                    <div className="flex items-start gap-2">
                      <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                        <notification.icon className="w-4 h-4 text-amber-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-1">
                          <h4 className="text-sm font-medium text-amber-200">{notification.title}</h4>
                          <button
                            onClick={() => handleDismissNotification(notification.id)}
                            className="text-slate-500 hover:text-slate-300 transition-colors ml-2"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-xs text-slate-400 mb-2 line-clamp-2">{notification.content}</p>
                        <div className="flex items-center gap-2">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleNotificationAction(notification)}
                            className="px-3 py-1.5 bg-gradient-to-r from-amber-500/80 to-orange-500/80 rounded-lg text-xs hover:shadow-md transition-shadow"
                          >
                            {notification.action}
                          </motion.button>
                          <span className="text-[10px] text-amber-400/40 flex items-center gap-1">
                            <Sparkles className="w-2.5 h-2.5" />
                            <span>AI主动发现</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Quick Actions - Always visible at bottom */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="px-4 pb-4 bg-gradient-to-t from-slate-900 via-slate-900 to-transparent pt-8"
      >
        <div className="max-w-4xl mx-auto">
          <p className="text-slate-400 text-sm mb-3 text-center">💡 试试这些问题：</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {quickActions.map((action, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSendMessage(action)}
                disabled={isProcessing}
                className="px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-full text-sm hover:border-indigo-500/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {action}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>
      
      {/* Input Area */}
      <div className="sticky bottom-0 bg-slate-900/80 backdrop-blur-lg border-t border-slate-800/50 px-4 py-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 bg-slate-800/50 border border-slate-700/50 rounded-2xl p-3">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
              placeholder="输入你的问题..."
              disabled={isProcessing}
              className="flex-1 bg-transparent border-none outline-none text-white placeholder-slate-500 disabled:opacity-50"
            />
            
            <button
              onClick={() => {}}
              disabled={isProcessing}
              className="w-10 h-10 rounded-full bg-slate-700/50 hover:bg-slate-700 flex items-center justify-center transition-colors disabled:opacity-50"
            >
              <Mic className="w-5 h-5 text-slate-400" />
            </button>
            
            <button
              onClick={() => handleSendMessage(inputValue)}
              disabled={!inputValue.trim() || isProcessing}
              className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110 transition-transform"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}