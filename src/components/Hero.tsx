import React, { useState } from 'react';
import { Sparkles, ShieldCheck, ArrowUpRight, HelpCircle, Terminal } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onSearchAndRedirect: (query: string, category: string) => void;
}

export function Hero({ onSearchAndRedirect }: HeroProps) {
  const [searchValue, setSearchValue] = useState('');
  const [category, setCategory] = useState('Brand');
  const [errorText, setErrorText] = useState('');

  const categories = [
    'Brand',
    'Business',
    'Creator',
    'Celebrity',
    'Startup',
    'Institution'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchValue.trim()) {
      setErrorText('Please enter a valid name to continue.');
      return;
    }
    setErrorText('');
    onSearchAndRedirect(searchValue, category);
  };

  return (
    <section id="hero" className="w-full relative min-h-screen flex flex-col justify-center pt-32 pb-24 bg-[#F8F6F1] overflow-hidden">
      {/* Visual Alignment Lines - Extremely quiet, sovereign-scale background */}
      <div className="absolute inset-x-0 top-0 h-[650px] pointer-events-none opacity-20">
        <div className="w-full h-full bg-[radial-gradient(#0F3D2E_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,#000_70%,transparent_100%)]" />
      </div>

      <div className="max-w-5xl mx-auto px-6 md:px-12 w-full relative z-10 text-center flex flex-col items-center">
        {/* Authoritative System Tagline */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0F3D2E]/5 border border-[#0F3D2E]/10 mb-8"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-[#C49A45] animate-pulse" />
          <span className="text-[10px] font-mono tracking-widest text-[#0F3D2E]/70 uppercase font-bold">
            Africa's Sovereign Public Insight Infrastructure
          </span>
        </motion.div>

        {/* Hero Title - Highly confident size, impeccable line height */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-3xl sm:text-4xl md:text-[52px] font-semibold text-[#0F3D2E] tracking-tight leading-[1.1] max-w-3xl font-display"
        >
          Africa’s Public Insight Layer
        </motion.h1>

        {/* Hero Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
          className="text-[#0F3D2E]/70 text-base sm:text-lg font-normal max-w-2xl mt-4 leading-relaxed font-sans"
        >
          Submit meaningful insights, commendations, and improvement suggestions for African brands, creators, businesses, and public figures.
        </motion.p>

        {/* Visually Dominant Advanced Search & Creation Input Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
          className="w-full max-w-2xl mt-10 mb-4"
        >
          <form
            onSubmit={handleSubmit}
            className="p-2.5 bg-[#FCFAF5] rounded-2xl border border-[#0F3D2E]/15 hover:border-[#0F3D2E]/30 shadow-[0_8px_30px_rgba(15,61,46,0.04)] focus-within:ring-1 focus-within:ring-[#0F3D2E]/10 focus-within:border-[#0F3D2E] transition-all duration-300"
          >
            <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center">
              {/* Primary Search Input field */}
              <div className="flex-1 flex items-center min-w-0">
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Enter a brand, business, creator, or public figure"
                  className="w-full bg-transparent px-3 py-3 text-[#0F3D2E] text-sm md:text-base font-medium placeholder:text-[#0F3D2E]/35 focus:outline-none"
                  aria-label="Brand or person query"
                />
              </div>

              {/* Category Dropdown */}
              <div className="flex items-center border-[#0F3D2E]/10 border-t sm:border-t-0 sm:border-l px-3 py-1 sm:py-0">
                <span className="text-[10px] font-mono uppercase text-[#0F3D2E]/40 mr-1.5 font-bold">
                  As:
                </span>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="bg-transparent text-[#0F3D2E] text-xs font-semibold select-none focus:outline-none cursor-pointer pr-3 py-1.5"
                  aria-label="Entity type"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat} className="bg-[#FCFAF5] text-[#0F3D2E] font-sans font-medium text-xs">
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Large premium CTA button */}
              <button
                type="submit"
                className="px-6 py-3 bg-[#0F3D2E] hover:bg-[#164C3B] text-[#F8F6F1] font-medium text-xs rounded-xl tracking-tight transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 select-none font-sans"
              >
                <span>Submit Insight</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#C49A45]" />
              </button>
            </div>
          </form>
          {errorText && (
            <p className="text-red-700 text-xs font-mono mt-2.5 text-left ml-4 font-bold">
              ● {errorText}
            </p>
          )}
        </motion.div>

        {/* Explaining What Insight Means */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-full max-w-4xl mt-16 text-left border-t border-[#0F3D2E]/10 pt-12 self-center"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {[
              {
                title: 'Commendations',
                desc: 'Acknowledge stellar service quality, reliability, dynamic scaling milestones, and excellent local resonance.'
              },
              {
                title: 'Suggestions',
                desc: 'Outline constructive friction points in regional supply chain, pricing models, accessibility, or feature requests.'
              },
              {
                title: 'Technical Insights',
                desc: 'Contribute highly qualified technical audit details, operational parameters, or architectural feedback.'
              }
            ].map((col, index) => (
              <div key={index} className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-[#C49A45]">0{index + 1} //</span>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#0F3D2E]">
                    {col.title}
                  </h3>
                </div>
                <p className="text-[#0F3D2E]/70 text-xs leading-relaxed font-sans font-light">
                  {col.desc}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Trust & Authority Feel Metrics */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="w-full max-w-4xl mt-16 bg-[#0F3D2E] text-[#F8F6F1] p-6 sm:p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden"
        >
          <div className="absolute inset-x-0 bottom-0 top-0 pointer-events-none opacity-25">
            <div className="w-full h-full bg-[radial-gradient(#F8F6F1_0.8px,transparent_0.8px)] [background-size:20px_20px]" />
          </div>

          <div className="flex items-center gap-4 relative z-10">
            <div className="w-10 h-10 rounded-xl bg-[#F8F6F1]/10 flex items-center justify-center border border-[#F8F6F1]/10">
              <ShieldCheck className="w-5 h-5 text-[#C49A45]" />
            </div>
            <div className="text-left">
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#F8F6F1]">
                Unbiased Verification Protocol
              </h4>
              <p className="text-[#F8F6F1]/65 text-[10px] font-mono leading-relaxed mt-0.5">
                Every feedback point undergoes algorithmic integrity classification to filter toxic or malicious submissions.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-10 relative z-10 w-full md:w-auto border-t md:border-t-0 border-[#F8F6F1]/10 pt-4 md:pt-0 justify-around sm:justify-start">
            <div>
              <span className="text-lg font-bold block font-mono">100% SECURE</span>
              <span className="text-[9px] uppercase tracking-wider text-[#F8F6F1]/50 font-mono block">Zero Tracking</span>
            </div>
            <div className="h-6 w-px bg-[#F8F6F1]/20 hidden sm:block" />
            <div>
              <span className="text-lg font-bold block font-mono">PAN-AFRICAN</span>
              <span className="text-[9px] uppercase tracking-wider text-[#F8F6F1]/50 font-mono block">Sovereign Focus</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
