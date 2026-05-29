import { 
  Users, 
  TrendingUp, 
  Lightbulb, 
  ArrowUpRight 
} from 'lucide-react';
import { motion } from 'motion/react';

export function WhyItMatters() {
  return (
    <section id="why-it-matters" className="w-full py-24 border-t border-[#0D2C22]/5 bg-[#FBF9F4]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Context Narrative */}
          <div className="flex flex-col gap-6">
            <span className="text-[10px] md:text-xs font-mono uppercase font-bold tracking-widest text-[#0D2C22]/50 flex items-center gap-1.5 ">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C49A45]" />
              Strategic Context
            </span>
            
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-[#0D2C22] tracking-tight leading-tight">
              Bridging the Insight Gap in Africa's Fastest Growing Markets.
            </h2>
            
            <p className="text-sm md:text-base text-[#0D2C22]/70 leading-relaxed font-light mt-2">
              For too long, public consensus regarding African startups, institutions, and creators was scattered across chaotic social networks, or completely locked behind expensive private enterprise consulting firms.
            </p>

            {/* Core Pillars */}
            <div className="flex flex-col gap-5 mt-4">
              {[
                {
                  icon: <Users className="w-4 h-4 text-[#C49A45]" />,
                  title: 'An Authentic Unified Consumer Voice',
                  desc: 'Giving citizens a structured, respectful platform to commend leading business builders, while framing constructive desires.'
                },
                {
                  icon: <TrendingUp className="w-4 h-4 text-[#C49A45]" />,
                  title: 'Data-Backed Brand Trajectories',
                  desc: 'Helping regional and global executives bypass loud internet noise to assess real, longitudinal sentiment curves.'
                },
                {
                  icon: <Lightbulb className="w-4 h-4 text-[#C49A45]" />,
                  title: 'Decentralized Market Intelligence',
                  desc: 'Providing early-stage startups with localized market validation data, supporting healthy, investable customer alignment.'
                }
              ].map((pill, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-lg bg-[#0D2C22]/5 border border-[#0D2C22]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    {pill.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#0D2C22]">{pill.title}</h4>
                    <p className="text-xs text-[#0D2C22]/65 mt-1 font-sans leading-relaxed">
                      {pill.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Premium CSS Visual Flow Blueprint */}
          <div className="relative bg-[#FAF7F2] border border-[#0D2C22]/10 rounded-3xl p-8 md:p-10 shadow overflow-hidden flex flex-col justify-center min-h-[420px] lg:min-h-[460px]">
            {/* Soft decorative background dots */}
            <div className="absolute inset-0 bg-[radial-gradient(#0D2C22_0.6px,transparent_0.6px)] [background-size:16px_16px] pointer-events-none opacity-25" />
            
            {/* Visual Node Diagram */}
            <div className="relative z-10 flex flex-col items-center gap-6 w-full">
              
              {/* Outer Consumer Node Layer */}
              <div className="flex justify-between w-full max-w-sm">
                {['@LagosConsumer', '@NairobiSME'].map((item, id) => (
                  <motion.div
                    key={id}
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 4, repeat: Infinity, delay: id * 2, ease: 'easeInOut' }}
                    className="bg-[#FDFBF7] border border-[#0D2C22]/15 rounded-xl px-3 py-1.5 shadow-sm text-[10px] font-mono font-medium text-[#0D2C22]/70 flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    {item}
                  </motion.div>
                ))}
              </div>

              {/* Connector lines group with flowing pulse */}
              <div className="w-full max-w-[280px] h-12 relative flex justify-between">
                <svg className="absolute inset-0 w-full h-full text-[#0D2C22]/10" fill="none">
                  {/* Left Diagonal */}
                  <line x1="10%" y1="0%" x2="45%" y2="100%" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
                  {/* Right Diagonal */}
                  <line x1="90%" y1="0%" x2="55%" y2="100%" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
                </svg>
                {/* Micro flowing dot indicators */}
                <motion.div
                  animate={{ top: ['0%', '100%'], left: ['10%', '45%'], opacity: [0, 1, 0] }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: 'linear' }}
                  className="absolute w-1.5 h-1.5 rounded-full bg-[#C49A45] -translate-x-1/2 -translate-y-1/2"
                />
                <motion.div
                  animate={{ top: ['0%', '100%'], left: ['90%', '55%'], opacity: [0, 1, 0] }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: 'linear', delay: 1.4 }}
                  className="absolute w-1.5 h-1.5 rounded-full bg-[#C49A45] -translate-x-1/2 -translate-y-1/2"
                />
              </div>

              {/* Central Compiler Node ABI */}
              <div className="bg-[#0D2C22] border border-[#0D2C22]/30 text-[#FBF9F4] rounded-2xl px-6 py-4 shadow-lg text-center relative z-20 w-full max-w-[200px]">
                <div className="absolute inset-x-0 -top-1.5 h-[3px] bg-gradient-to-r from-transparent via-[#C49A45] to-transparent animate-pulse" />
                <span className="text-[10px] font-mono tracking-wider opacity-60">ABI CORE HUB</span>
                <span className="text-sm font-bold block mt-1 tracking-tight flex items-center justify-center gap-1.5">
                  Insight Compiler
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C49A45]" />
                </span>
                <div className="text-[9px] font-mono text-[#FBF9F4]/40 mt-1 uppercase">Parsing Multi-Sentiment</div>
              </div>

              {/* Lower radiating logic schemas */}
              <div className="w-full max-w-[340px] h-14 relative flex justify-between">
                <svg className="absolute inset-0 w-full h-full text-[#0D2C22]/10" fill="none">
                  {/* Core Left */}
                  <line x1="50%" y1="0%" x2="15%" y2="100%" stroke="currentColor" strokeWidth="1.5" />
                  {/* Center Vertical */}
                  <line x1="50%" y1="0%" x2="50%" y2="100%" stroke="currentColor" strokeWidth="1.5" />
                  {/* Core Right */}
                  <line x1="50%" y1="0%" x2="85%" y2="100%" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </div>

              <div className="flex justify-between w-full max-w-sm relative -mt-3 gap-2">
                {[
                  { tag: 'Praise Schema', label: 'Commend' },
                  { tag: 'Wish Protocol', label: 'Refine' },
                  { tag: 'Core Analytics', label: 'Track' }
                ].map((item, id) => (
                  <div
                    key={id}
                    className="flex-1 bg-[#FDFBF7] border border-[#0D2C22]/10 rounded-xl py-2 px-1 text-center shadow-xs"
                  >
                    <span className="text-[9px] font-mono text-[#0D2C22]/40 block uppercase">{item.tag}</span>
                    <span className="text-[11px] font-bold text-[#0D2C22] block mt-0.5">{item.label}</span>
                  </div>
                ))}
              </div>

            </div>

            {/* Micro blueprint identifier label bottom right */}
            <div className="absolute bottom-4 right-6 text-[9px] font-mono text-[#0D2C22]/35 uppercase tracking-widest">
              Security Vector Standard ABI-V1
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
