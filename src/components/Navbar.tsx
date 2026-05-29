import { Compass, Link2 } from 'lucide-react';
import { motion } from 'motion/react';
import { isSupabaseConfigured } from '../lib/supabase';

interface NavbarProps {
  currentBrandSlug: string;
  onBackToHome: () => void;
  onOpenSupabaseModal: () => void;
}

export function Navbar({ currentBrandSlug, onBackToHome, onOpenSupabaseModal }: NavbarProps) {
  return (
    <motion.header
      id="navbar"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 inset-x-0 z-50 bg-[#FAF8F2]/95 backdrop-blur-md py-4 border-b-2 border-[#E6A71B]/30 shadow-[0_4px_20px_rgba(8,45,32,0.06)]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">
        {/* Brand Logo & Title */}
        <button
          onClick={onBackToHome}
          className="flex items-center justify-center gap-3 group text-center sm:text-left cursor-pointer mx-auto sm:mx-0"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#082D20] to-[#0D4130] flex items-center justify-center text-[#E6A71B] font-black text-sm border-2 border-[#E6A71B] relative overflow-hidden shrink-0 shadow-[0_2px_8px_rgba(8,45,32,0.15)] font-mono">
            <span className="relative z-10">A</span>
            <div className="absolute inset-0 bg-[#E6A71B]/20 translate-y-8 group-hover:translate-y-0 transition-transform duration-300" />
          </div>
          <span className="text-base font-extrabold tracking-tight text-[#082D20] flex items-center gap-1.5 font-display whitespace-nowrap">
            African Brands Insight
            <span className="w-2 h-2 rounded-full bg-[#E6A71B] shadow-[0_0_10px_rgba(230,167,27,0.95)] animate-pulse" />
          </span>
        </button>

        {/* Dynamic Action Area */}
        <div className="flex items-center justify-center sm:justify-end gap-3.5 w-full sm:w-auto">
          {currentBrandSlug ? (
            <button
              id="back-to-search-btn"
              onClick={onBackToHome}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-[#082D20] bg-[#E6A71B]/15 hover:bg-[#E6A71B]/25 border-2 border-[#E6A71B]/40 hover:border-[#E6A71B] transition-all duration-300 cursor-pointer whitespace-nowrap shadow-xs active:scale-95"
            >
              ← Back to Platform Search
            </button>
          ) : (
            <button
              onClick={onOpenSupabaseModal}
              className="hidden sm:flex items-center gap-3 px-3 py-1.5 rounded-full bg-[#E6A71B]/10 border border-[#E6A71B]/20 shadow-xs cursor-pointer text-left hover:bg-[#E6A71B]/20 transition-all font-mono"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] uppercase tracking-widest text-[#B8810E] font-extrabold">
                Registry Active
              </span>
            </button>
          )}
        </div>
      </div>
    </motion.header>
  );
}
