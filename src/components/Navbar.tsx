import { Compass } from 'lucide-react';
import { motion } from 'motion/react';

interface NavbarProps {
  currentBrandSlug: string;
  onBackToHome: () => void;
}

export function Navbar({ currentBrandSlug, onBackToHome }: NavbarProps) {
  return (
    <motion.header
      id="navbar"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 inset-x-0 z-50 bg-[#F8F6F1]/95 backdrop-blur-md py-4 border-b border-[#0F3D2E]/10"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">
        {/* Brand Logo & Title */}
        <button
          onClick={onBackToHome}
          className="flex items-center justify-center gap-3 group text-center sm:text-left cursor-pointer mx-auto sm:mx-0"
        >
          <div className="w-8 h-8 rounded-lg bg-[#0F3D2E] flex items-center justify-center text-[#F8F6F1] font-medium text-sm border border-[#0F3D2E]/20 relative overflow-hidden shrink-0">
            <span className="relative z-10 font-bold">A</span>
            <div className="absolute inset-0 bg-[#C49A45]/20 translate-y-8 group-hover:translate-y-0 transition-transform duration-300" />
          </div>
          <span className="text-base font-semibold tracking-tight text-[#0F3D2E] flex items-center gap-1.5 font-display whitespace-nowrap">
            African Brands Insight
            <span className="w-1.5 h-1.5 rounded-full bg-[#C49A45] shadow-[0_0_8px_rgba(196,154,69,0.8)]" />
          </span>
        </button>

        {/* Dynamic Action Area */}
        <div className="flex items-center justify-center sm:justify-end gap-4 w-full sm:w-auto">
          {currentBrandSlug ? (
            <button
              id="back-to-search-btn"
              onClick={onBackToHome}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-[#0F3D2E] bg-[#0F3D2E]/5 hover:bg-[#0F3D2E]/10 border border-[#0F3D2E]/10 transition-all duration-300 cursor-pointer whitespace-nowrap"
            >
              ← Back to Platform Search
            </button>
          ) : (
            <div className="hidden sm:flex items-center gap-3 px-3 py-1.5 rounded-full bg-[#0F3D2E]/5 border border-[#0F3D2E]/5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C49A45] animate-pulse" />
              <span className="text-[10px] uppercase tracking-widest text-[#0F3D2E]/70 font-mono font-bold">
                Public Infrastructure Layer
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.header>
  );
}
