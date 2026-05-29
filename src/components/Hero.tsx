import React, { useState } from 'react';
import { Sparkles, ShieldCheck, ArrowUpRight, HelpCircle, Terminal, Search, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BrandPerception } from '../types';

interface HeroProps {
  onSearchAndRedirect: (query: string, category: string) => void;
  existingBrands?: BrandPerception[];
}

export function Hero({ onSearchAndRedirect, existingBrands = [] }: HeroProps) {
  const [searchValue, setSearchValue] = useState('');
  const [category, setCategory] = useState('Brand');
  const [errorText, setErrorText] = useState('');
  const [inputHasFocus, setInputHasFocus] = useState(false);

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

  // Live matching logic for incompletely or completely typed queries
  const trimmedQuery = searchValue.toLowerCase().trim();
  const matchedBrands = trimmedQuery && existingBrands
    ? existingBrands.filter(b => 
        b.name.toLowerCase().includes(trimmedQuery) || 
        b.sector.toLowerCase().includes(trimmedQuery)
      ).slice(0, 4)
    : [];

  return (
    <section id="hero" className="w-full relative min-h-screen flex flex-col justify-center pt-32 pb-24 bg-[#FAF8F2] overflow-hidden">
      {/* Visual Alignment Lines - Extremely quiet, sovereign-scale background */}
      <div className="absolute inset-x-0 top-0 h-[650px] pointer-events-none opacity-25">
        <div className="w-full h-full bg-[radial-gradient(#082D20_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,#000_70%,transparent_100%)]" />
      </div>

      <div className="max-w-5xl mx-auto px-6 md:px-12 w-full relative z-10 text-center flex flex-col items-center">
        {/* Authoritative System Tagline */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6A71B]/12 border border-[#E6A71B]/40 mb-8 shadow-xs"
        >
          <div className="w-2 h-2 rounded-full bg-[#E6A71B] shadow-[0_0_10px_rgba(230,167,27,0.9)] animate-pulse" />
          <span className="text-[10px] font-mono tracking-widest text-[#082D20] uppercase font-black">
            Africa's Sovereign Public Insight Infrastructure
          </span>
        </motion.div>

        {/* Hero Title - Highly confident size, impeccable line height */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-3xl sm:text-4xl md:text-[52px] font-extrabold text-[#082D20] tracking-tight leading-[1.1] max-w-3xl font-display"
        >
          Africa’s <span className="text-[#E6A71B] drop-shadow-[0_2px_12px_rgba(230,167,27,0.15)]">Public Insight</span> Layer
        </motion.h1>

        {/* Hero Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
          className="text-[#082D20]/80 text-base sm:text-lg font-medium max-w-2xl mt-4 leading-relaxed font-sans"
        >
          Submit meaningful insights, commendations, and improvement suggestions for African brands, creators, businesses, and public figures.
        </motion.p>

        {/* Visually Dominant Advanced Search & Creation Input Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
          className="w-full max-w-2xl mt-10 mb-4 relative z-40"
        >
          {/* Live Ecosystem Sovereign Aura - very subtle slow breathing blur */}
          <motion.div
            className="absolute -inset-2 bg-gradient-to-r from-[#E6A71B]/15 via-[#0D4130]/10 to-[#E6A71B]/15 rounded-3xl blur-xl pointer-events-none -z-10"
            animate={{
              opacity: [0.4, 0.85, 0.4],
              scale: [0.97, 1.03, 0.97],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          <form
            onSubmit={handleSubmit}
            className="p-3 bg-white rounded-2xl border-2 border-[#0D4130]/15 hover:border-[#E6A71B]/55 shadow-[0_12px_44px_rgba(8,45,32,0.06)] focus-within:ring-2 focus-within:ring-[#E6A71B]/35 focus-within:border-[#E6A71B] transition-all duration-500 relative z-10"
          >
            <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center">
              {/* Primary Search Input field */}
              <div className="flex-1 flex items-center min-w-0">
                <input
                  type="text"
                  value={searchValue}
                  onFocus={() => setInputHasFocus(true)}
                  onBlur={() => setTimeout(() => setInputHasFocus(false), 200)} // slight delay to allow tap/clicks on matched brands
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Enter a brand, business, creator or Celebrity..."
                  className="w-full bg-transparent px-2.5 py-3 text-[#082D20] text-xs sm:text-sm md:text-base font-bold placeholder:text-[11px] sm:placeholder:text-sm md:placeholder:text-base placeholder:text-[#082D20]/40 placeholder:font-semibold focus:outline-none"
                  aria-label="Brand or person query"
                />
              </div>

              {/* Category Dropdown */}
              <div className="flex items-center border-[#082D20]/10 border-t sm:border-t-0 sm:border-l px-3 py-1 sm:py-0">
                <span className="text-[10px] font-mono uppercase text-[#082D20]/50 mr-1.5 font-black">
                  As:
                </span>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="bg-transparent text-[#082D20] text-xs font-bold select-none focus:outline-none cursor-pointer pr-3 py-1.5"
                  aria-label="Entity type"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat} className="bg-white text-[#082D20] font-sans font-bold text-xs">
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Large premium CTA button */}
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-[#082D20] to-[#0D4130] hover:from-[#0D4130] hover:to-[#082D20] text-[#FAF8F2] font-extrabold text-xs rounded-xl tracking-tight transition-all duration-300 cursor-pointer flex items-center justify-center gap-1.5 select-none font-sans border border-[#E6A71B]/30 hover:border-[#E6A71B] relative overflow-hidden group/btn"
              >
                <span className="relative z-10">Submit Insight</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#E6A71B] relative z-10 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-200" />
                <motion.div 
                  className="absolute inset-0 bg-white/5 opacity-0 group-hover/btn:opacity-100 transition-opacity"
                  animate={{
                    opacity: [0, 0.15, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
              </button>
            </div>
          </form>

          {/* Prompted Existing Match Matches list container */}
          <AnimatePresence>
            {inputHasFocus && matchedBrands.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.99 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.99 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="absolute left-0 right-0 mt-3 bg-[#FAF8F2]/95 backdrop-blur-md rounded-2xl border-2 border-[#E6A71B]/30 shadow-[0_16px_50px_rgba(8,45,32,0.16)] p-4 max-h-[350px] overflow-y-auto text-left z-50 overflow-hidden"
              >
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#082D20]/10">
                  <span className="text-[9px] font-mono font-black text-[#B8810E] uppercase tracking-widest flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse" />
                    REGISTERED PROFILES MATCHING ({matchedBrands.length})
                  </span>
                  <span className="text-[9px] font-mono font-bold text-[#082D20]/45">
                    Tap to view or contribute insights
                  </span>
                </div>

                <div className="space-y-1.5">
                  {matchedBrands.map((brand) => (
                    <button
                      key={brand.id}
                      type="button"
                      onClick={() => {
                        onSearchAndRedirect(brand.name, brand.sector);
                        setSearchValue('');
                      }}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-[#E6A71B]/12 border border-transparent hover:border-[#E6A71B]/30 flex items-center justify-between gap-3 transition-all duration-200 cursor-pointer group/item bg-white/55"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#082D20] to-[#0D4130] text-[#E6A71B] border-2 border-[#E6A71B]/20 flex items-center justify-center font-black text-xs shrink-0 select-none group-hover/item:border-[#E6A71B] transition-colors shadow-2xs">
                          {brand.logoChar}
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs sm:text-sm font-bold text-[#082D20] truncate group-hover/item:text-[#E6A71B] transition-colors">
                            {brand.name}
                          </p>
                          <p className="text-[10px] font-mono font-bold text-[#082D20]/50 uppercase tracking-tight truncate">
                            {brand.sector} • {brand.country}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[10px] sm:text-xs font-mono font-black text-[#E6A71B] bg-[#082D20] px-2 py-0.5 rounded-lg border border-[#E6A71B]/30 select-none shadow-3xs">
                          {brand.overallScore}%
                        </span>
                        <span className="text-[10px] font-mono font-extrabold text-[#082D20]/45 group-hover/item:text-[#082D20] group-hover/item:translate-x-0.5 transition-all">
                          Select →
                        </span>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="mt-3 pt-2 border-t border-[#082D20]/5 flex items-center gap-2 text-[9px] font-mono text-[#082D20]/60">
                  <span className="font-extrabold uppercase text-[#B8810E]">Tip:</span>
                  <span>Can't see yours? Continue typing to dynamically register a sovereign new registry!</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

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
          className="w-full max-w-4xl mt-16 text-left border-t-2 border-[#082D20]/10 pt-12 self-center"
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
                  <span className="text-xs font-mono font-black text-[#E6A71B]">0{index + 1} //</span>
                  <h3 className="text-sm font-extrabold uppercase tracking-wider text-[#082D20] font-display">
                    {col.title}
                  </h3>
                </div>
                <p className="text-[#082D20]/80 text-xs leading-relaxed font-sans font-medium">
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
          className="w-full max-w-4xl mt-16 bg-gradient-to-br from-[#082D20] to-[#041A13] text-[#FAF8F2] p-6 sm:p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden border-2 border-[#E6A71B]/30 shadow-xl shadow-[#082D20]/15"
        >
          <div className="absolute inset-x-0 bottom-0 top-0 pointer-events-none opacity-20">
            <div className="w-full h-full bg-[radial-gradient(#FAF8F2_0.8px,transparent_0.8px)] [background-size:20px_20px]" />
          </div>

          <div className="flex items-center gap-4 relative z-10">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-[#FAF8F2]/10 shrink-0">
              <ShieldCheck className="w-5 h-5 text-[#E6A71B]" />
            </div>
            <div className="text-left">
              <h4 className="text-xs font-black uppercase tracking-widest text-[#FAF8F2] font-display">
                Unbiased Verification Protocol
              </h4>
              <p className="text-[#FAF8F2]/75 text-[10px] font-mono leading-relaxed mt-0.5">
                Every feedback point undergoes algorithmic integrity classification to filter toxic or malicious submissions.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-10 relative z-10 w-full md:w-auto border-t md:border-t-0 border-white/10 pt-4 md:pt-0 justify-around sm:justify-start">
            <div>
              <span className="text-lg font-black block font-mono text-[#E6A71B]">100% SECURE</span>
              <span className="text-[9px] uppercase tracking-wider text-[#FAF8F2]/60 font-mono block">Zero Tracking</span>
            </div>
            <div className="h-6 w-px bg-white/20 hidden sm:block" />
            <div>
              <span className="text-lg font-black block font-mono text-[#E6A71B]">PAN-AFRICAN</span>
              <span className="text-[9px] uppercase tracking-wider text-[#FAF8F2]/60 font-mono block">Sovereign Focus</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
