import { useState } from 'react';
import { Sparkles, Brain, Code, Network, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function AIPresentation() {
  const [activeTab, setActiveTab] = useState(0);

  const pillars = [
    {
      icon: <Brain className="w-4.5 h-4.5 text-[#C49A45]" />,
      title: 'Contextual Sifting',
      badge: 'LLM Synthesizer',
      narrative: 'By passing large-scale text inputs through our fine-tuned semantic translation layers, we eliminate typical internet toxicity and convert generic complains into structured, actionable business feature wishlists.',
      bullets: [
        'Advanced local slang & context parsing',
        'Toxicity and gossip mitigation filters',
        'SME-centric feature request grouping API'
      ]
    },
    {
      icon: <Network className="w-4.5 h-4.5 text-[#C49A45]" />,
      title: 'Pre-Incident Alerting',
      badge: 'Trend Spotter',
      narrative: 'Spot minor customer satisfaction dips, operational network crashes, or distribution blockages on the ground hours before they hit major traditional media avenues or financial sentiment boards.',
      bullets: [
        'Hourly velocity scoring on user reports',
        'Localized regional sector indexing',
        'Sentiment volatility alerts for subscribers'
      ]
    },
    {
      icon: <Code className="w-4.5 h-4.5 text-[#C49A45]" />,
      title: 'Sovereign-Scale APIs',
      badge: 'System Integration',
      narrative: 'Directly plug our processed sentiment datasets, public scores, and user suggestions into your compliance dashboards, Salesforce pipelines, or investor evaluation pipelines.',
      bullets: [
        'Secure low-overhead JSON REST responses',
        'Automated monthly sector reports',
        'Historical curve comparison modules'
      ]
    }
  ];

  return (
    <section id="ai-presentation" className="w-full py-24 border-t border-[#0D2C22]/5 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Alignment Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Text Detail */}
          <div className="lg:col-span-5">
            <span className="text-[10px] md:text-xs font-mono uppercase font-bold tracking-widest text-[#0D2C22]/50 flex items-center gap-1.5 mb-3">
              <Sparkles className="w-4 h-4 text-[#C49A45]" />
              AI + PAN-AFRICA
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0D2C22] tracking-tight leading-tight">
              AI-Powered Insight for Sovereign Macro Growth.
            </h2>
            <p className="text-sm text-[#0D2C22]/70 leading-relaxed font-light mt-4">
              Structured consumer data is the missing catalytic asset across modern African supply-chains. We leverage language synthesis tools to organize consumer signals into transparent, dependable decision-grade parameters of value.
            </p>

            {/* Premium Selector Pills */}
            <div className="flex flex-col gap-3 mt-8">
              {pillars.map((item, id) => {
                const isActive = activeTab === id;
                return (
                  <button
                    key={id}
                    onClick={() => setActiveTab(id)}
                    className={`p-4 rounded-xl text-left border cursor-pointer transition-all duration-300 flex items-center justify-between ${
                      isActive
                        ? 'bg-[#0D2C22] text-[#FBF9F4] border-[#0D2C22] shadow-md'
                        : 'bg-[#FDFBF7] text-[#0D2C22]/70 border-[#0D2C22]/10 hover:border-[#0D2C22]/20'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-1.5 rounded-lg ${isActive ? 'bg-[#FBF9F4]/10' : 'bg-[#0D2C22]/5'}`}>
                        {item.icon}
                      </div>
                      <span className="text-sm font-bold tracking-tight">{item.title}</span>
                    </div>
                    <span className={`text-[10px] font-mono uppercase tracking-wide px-2 py-0.5 rounded-md ${
                      isActive ? 'bg-[#FBF9F4]/15 text-[#C49A45]' : 'bg-[#0D2C22]/5 text-[#0D2C22]/50'
                    }`}>
                      {item.badge}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Presentation Board */}
          <div className="lg:col-span-7 bg-[#FDFBF7] border border-[#0D2C22]/10 rounded-3xl p-6 md:p-10 shadow-lg min-h-[380px] flex flex-col justify-between relative overflow-hidden">
            
            {/* Soft backdrop decorative gradient representing AI precision lines */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#C49A45]/5 blur-3xl rounded-full" />
            <div className="absolute top-4 left-6 text-[9px] font-mono text-[#0D2C22]/30 uppercase tracking-widest">
              Synthesizer Console / M-Node V0.9
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3 }}
                className="pt-4"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[10px] font-mono bg-[#0D2C22]/5 text-[#C49A45] font-semibold border border-[#0D2C22]/5 px-2.5 py-1 rounded">
                    {pillars[activeTab].badge}
                  </span>
                  <span className="text-xs text-[#0D2C22]/40 font-mono">Status: Standard Operations</span>
                </div>

                <h3 className="text-lg font-bold text-[#0D2C22] mb-3">
                  How We Organize {pillars[activeTab].title}
                </h3>
                
                <p className="text-xs md:text-[13px] text-[#0D2C22]/75 leading-relaxed font-light font-sans">
                  {pillars[activeTab].narrative}
                </p>

                {/* Bullets grid */}
                <div className="mt-6 pt-5 border-t border-[#0D2C22]/5 flex flex-col gap-3">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#0D2C22]/40 font-mono">Engine Directives</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {pillars[activeTab].bullets.map((bullet, bId) => (
                      <div key={bId} className="flex items-center gap-2 text-xs text-[#0D2C22]/80">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C49A45] flex-shrink-0" />
                        <span className="font-sans font-light">{bullet}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 pt-6 border-t border-[#0D2C22]/5 flex items-center justify-between text-[11px] font-mono text-[#0D2C22]/45">
              <span>African Brands Insight Project © 2026</span>
              <a href="#dashboard" className="text-[#C49A45] flex items-center gap-1 font-bold hover:underline">
                Query Core Hub
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
