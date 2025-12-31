import { motion } from 'motion/react';
import { Sun, Coffee, Moon } from 'lucide-react';

const stories = [
  {
    icon: Sun,
    time: '07:00 早晨',
    conversations: [
      { user: true, text: '早安' },
      { 
        user: false, 
        text: '早安！昨晚你的基金涨了1.2%，另外，你上周设的旅行储蓄目标已经完成87%了，按这个节奏，下个月就能去云南啦。今天有两笔账单到期，我已经准备好了，需要现在处理吗？' 
      },
      { user: true, text: '帮我处理吧' },
      { user: false, text: '好的，已完成。祝你今天好心情～' }
    ]
  },
  {
    icon: Coffee,
    time: '12:30 午餐',
    conversations: [
      { user: true, text: '刚才吃饭花了58块，有点贵' },
      { 
        user: false, 
        text: '这个月餐饮支出1,847元，比上月多了15%。不过你这个月加班比较多，心疼自己一点也没关系。如果想控制一下，我可以帮你找找附近性价比高的餐厅？' 
      },
      { user: true, text: '算了，努力工作值得吃好点' },
      { user: false, text: '这话我爱听 😊' }
    ]
  },
  {
    icon: Moon,
    time: '21:00 晚间',
    conversations: [
      { user: true, text: '我在想要不要买辆车，但不知道自己养不养得起' },
      { 
        user: false, 
        text: '这是个大决定，我帮你算了一下：\n\n以15万的车为例，月供约2,800元（3年期），加上保险、油费、停车、保养，每月总支出约4,500元。\n\n按你目前的收支情况，买车后每月还能结余约2,000元。可行，但会比较紧。\n\n我的建议是：如果不是刚需，可以再攒半年，届时首付提高，月供压力会小很多。要不要我帮你做个攒钱计划？' 
      },
      { user: true, text: '好的，帮我规划一下' },
      { 
        user: false, 
        text: '已创建"购车基金"，每月自动存入1,500元，6个月后你将有9,000元额外首付。我会在这期间帮你关注车价和贷款利率变化，有好时机第一时间告诉你。' 
      },
      { user: true, text: '谢谢你，Neura' },
      { user: false, text: '晚安，梦里开新车 🚗' }
    ]
  }
];

export function StorySection() {
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
          一天的故事
        </h2>
        <p className="text-xl text-slate-300">
          看看 Neura 如何陪伴一个普通人的一天
        </p>
      </motion.div>

      <div className="space-y-12">
        {stories.map((story, storyIndex) => (
          <motion.div
            key={storyIndex}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: storyIndex * 0.2 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 border border-slate-700/50 rounded-2xl p-6 md:p-8 backdrop-blur-sm"
          >
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-700/50">
              <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center">
                <story.icon className="w-5 h-5 text-indigo-400" />
              </div>
              <h3 className="text-xl">{story.time}</h3>
            </div>

            <div className="space-y-4">
              {story.conversations.map((conv, convIndex) => (
                <motion.div
                  key={convIndex}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: storyIndex * 0.2 + convIndex * 0.1 }}
                  viewport={{ once: true }}
                  className={`flex ${conv.user ? 'justify-start' : 'justify-start'}`}
                >
                  <div className="flex items-start gap-3 max-w-[85%]">
                    <div className="text-lg flex-shrink-0 mt-1">
                      {conv.user ? '👤' : '🤖'}
                    </div>
                    <div 
                      className={`rounded-2xl p-4 ${
                        conv.user 
                          ? 'bg-slate-700/50' 
                          : 'bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20'
                      }`}
                    >
                      <p className="text-slate-200 whitespace-pre-line">{conv.text}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
