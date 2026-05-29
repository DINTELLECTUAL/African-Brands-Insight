import React, { useState } from 'react';
import { Sparkles, ArrowRight, Check, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function EarlyAccessCTA() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    // Simulate high-fidelity network indexing
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setEmail('');
    }, 1000);
  };

  return (
    <section id="early-access" className="w-full py-28 bg-[#0D2C22] text-[#FBF9F4] relative overflow-hidden border-t-2 border-[#C49A45]/20">
      {/* Structural layout fine grids inside the dark box */}
      <div className="absolute inset-0 bg-[radial-gradient(#FBF9F4_0.5px,transparent_0.5px)] [background-size:20px_20px] pointer-events-none opacity-5" />
      
      {/* Abstract light sphere overlay on back left */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-[#C49A45]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10 flex flex-col items-center">
        
        {/* Sparkle emblem */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="w-10 h-10 rounded-full bg-[#FBF9F4]/10 border border-[#FBF9F4]/10 flex items-center justify-center mb-6"
        >
          <Sparkles className="w-5 h-5 text-[#C49A45]" />
        </motion.div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#FBF9F4]">
          Help Shape Better African Brands.
        </h2>

        <p className="text-sm sm:text-base md:text-lg text-[#FBF9F4]/75 font-light font-sans max-w-2xl mt-4 leading-relaxed">
          Celebrate localized engineering excellence. Surface context-mapped feedback. Drive standard-setting market growth across the continent.
        </p>

        {/* Email Collector Form */}
        <div className="w-full max-w-lg mt-10">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col sm:flex-row gap-3 bg-[#164032]/80 border border-[#FBF9F4]/15 p-2 rounded-2xl shadow-xl"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your professional email..."
                  className="w-full bg-transparent px-4 py-3 text-sm text-[#FBF9F4] focus:outline-none placeholder:text-[#FBF9F4]/45 font-sans"
                />
                
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 cursor-pointer rounded-xl text-xs md:text-sm font-semibold text-[#0D2C22] bg-[#FBF9F4] hover:bg-[#F3ECE0] border border-[#0D2C22]/10 shadow flex items-center justify-center gap-1.5 transition-all duration-300 transform active:scale-95 whitespace-nowrap"
                >
                  {loading ? (
                    <span className="w-4 h-4 border-2 border-[#0D2C22] border-dashed rounded-full animate-spin" />
                  ) : (
                    <>
                      Join Early Access
                      <ArrowRight className="w-4 h-4 text-[#C49A45]" />
                    </>
                  )}
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#164032] border border-[#C49A45]/30 rounded-2xl p-5 md:p-6 shadow-xl flex flex-col items-center gap-2 max-w-md mx-auto"
              >
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-[#C49A45] flex items-center justify-center border border-emerald-500/20">
                  <Check className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-[#FBF9F4] mt-1">Verification Request Mapped</h4>
                <p className="text-xs text-[#FBF9F4]/70 leading-relaxed font-sans">
                  Your entry has been placed on our VIP waitlist. We will dispatch the private sandbox details once your regional block opens.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* System Trust details */}
        <div className="flex items-center gap-2 mt-8 text-[11px] font-mono text-[#FBF9F4]/40 uppercase tracking-widest">
          <ShieldCheck className="w-4 h-4 text-[#C49A45]" />
          Secured Sandbox Protocol • Day-1 Ready
        </div>

      </div>
    </section>
  );
}
