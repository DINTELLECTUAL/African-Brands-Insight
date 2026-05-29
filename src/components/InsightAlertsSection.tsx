import React, { useState } from 'react';
import { Mail, ArrowRight, ShieldCheck, Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BrandPerception } from '../types';
import { subscribeToInsightAlerts } from '../lib/supabase';

interface InsightAlertsSectionProps {
  brands: BrandPerception[];
}

export function InsightAlertsSection({ brands }: InsightAlertsSectionProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null);
  const [successMode, setSuccessMode] = useState<'supabase' | 'local'>('local');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const targetEmail = email.trim();
    if (!targetEmail) return;

    setIsSubmitting(true);
    
    // Minimal delay to simulate secure registry synchronization
    setTimeout(async () => {
      const result = await subscribeToInsightAlerts(targetEmail);
      setIsSubmitting(false);
      setSubmittedEmail(targetEmail);
      setSuccessMode(result.mode);
      setEmail('');
    }, 850);
  };

  return (
    <section id="insight-alerts" className="w-full py-24 bg-[#FAF8F2] border-t-2 border-[#000]/5 text-[#082D20]">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Core Layout containing title and form */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-12">
          
          {/* Main Title Block */}
          <div className="max-w-md space-y-3.5 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#082D20]/5 rounded-full border border-[#082D20]/10">
              <Bell className="w-3.5 h-3.5 text-[#E6A71B]" />
              <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-[#082D20]/70">
                Sovereign Telemetry Feed
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#082D20]">
              Stay Informed with Insight Alerts
            </h2>
            <p className="text-xs sm:text-sm text-[#082D20]/75 font-medium leading-relaxed font-sans mt-1">
              Receive only meaningful updates when public perception of African brands, creators, or businesses changes significantly.
            </p>
          </div>

          {/* Action Subscription Form Block */}
          <div className="w-full max-w-sm mt-2 md:mt-12">
            <AnimatePresence mode="wait">
              {!submittedEmail ? (
                <motion.form
                  key="subscribe-form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-3 text-left"
                >
                  <div className="relative flex items-center bg-white border-2 border-[#082D20]/15 rounded-xl overflow-hidden focus-within:border-[#E6A71B]/60 focus-within:shadow-[0_0_12px_rgba(230,167,27,0.1)] transition-all">
                    <div className="pl-4 text-[#082D20]/45">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email for insight updates"
                      className="w-full bg-transparent px-3 py-3.5 text-xs sm:text-sm text-[#082D20] focus:outline-none placeholder:text-[#082D20]/40 font-medium font-sans"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-xl text-xs font-bold text-white bg-[#082D20] hover:bg-[#114030] tracking-wide shadow flex items-center justify-center gap-2 transition-all cursor-pointer transform active:scale-98"
                  >
                    {isSubmitting ? (
                      <span className="w-4 h-4 border-2 border-white border-dashed rounded-full animate-spin" />
                    ) : (
                      <>
                        Join Insight Alerts
                        <ArrowRight className="w-3.5 h-3.5 text-[#E6A71B]" />
                      </>
                    )}
                  </button>

                  <div className="flex items-center gap-2.5 px-1 pt-1.5 text-[9px] font-mono text-[#082D20]/50 uppercase tracking-wider font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    Bloomberg-style precision • Subscriptions are completely offline-validated
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="subscribe-success"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white border-2 border-[#082D20]/15 rounded-xl p-5 text-left space-y-3 shadow-md border-l-4 border-l-emerald-600"
                >
                  <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs sm:text-sm">
                    <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-800 flex items-center justify-center border border-emerald-200">
                      ✓
                    </div>
                    <span>Intelligence Network Active</span>
                  </div>
                  
                  <p className="text-xs text-[#082D20]/80 leading-relaxed font-sans font-medium">
                    You’re now part of the Insight Alerts network. We’ll notify you only when meaningful perception changes occur across African brands and creators.
                  </p>
                  
                  <div className="text-[9px] font-mono font-bold text-[#E6A71B] uppercase tracking-wide bg-[#082D20]/5 p-2 rounded-lg border border-[#E6A71B]/20">
                    {successMode === 'supabase' ? 'SUPABASE CLOUD SYNCED' : 'LOCAL SANDBOX INDEXED'}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
}
