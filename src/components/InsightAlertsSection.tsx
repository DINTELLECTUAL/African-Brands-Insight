import React, { useState, useEffect } from 'react';
import { Mail, ArrowRight, ShieldCheck, FileText, ChevronDown, ChevronUp, Bell, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BrandPerception } from '../types';
import { subscribeToInsightAlerts } from '../lib/supabase';

interface InsightAlertsSectionProps {
  brands: BrandPerception[];
}

interface SimulatedAlert {
  id: string;
  brandName: string;
  triggerType: 'sentiment_shift' | 'perception_improvement' | 'engagement_surge' | 'sector_shift';
  triggerLabel: string;
  subject: string;
  summary: string;
  trend: 'improving' | 'stable' | 'declining';
  explanation: string;
  aiSummary: string;
}

export function InsightAlertsSection({ brands }: InsightAlertsSectionProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null);
  const [successMode, setSuccessMode] = useState<'supabase' | 'local'>('local');
  const [activeAlerts, setActiveAlerts] = useState<SimulatedAlert[]>([]);
  const [isAlertsPaneOpen, setIsAlertsPaneOpen] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState<SimulatedAlert | null>(null);

  // Compile alerts dynamically based on the current live state of regional brands
  useEffect(() => {
    const alertsList: SimulatedAlert[] = [];

    brands.forEach((b) => {
      const liveFeedbackCount = b.praises.length + b.suggestions.length;
      
      // Rule 1: Surge in insights (engagement spikes)
      if (liveFeedbackCount >= 1) {
        let pctScore = b.overallScore;

        // Rule 2: Perception improvement is detected
        const hasPraises = b.praises.length > 0;
        const triggerType = pctScore > 75 
          ? 'perception_improvement' 
          : (liveFeedbackCount >= 3 ? 'engagement_surge' : 'sentiment_shift');

        let triggerLabel = 'Notable surge in insights';
        if (triggerType === 'perception_improvement') {
          triggerLabel = 'Brand perception improvement detected';
        } else if (triggerType === 'sentiment_shift') {
          triggerLabel = 'Significant sentiment change occurs';
        }

        const praisesHighlights = b.praises.slice(0, 2).map(p => `"${p.content.slice(0, 50)}..."`).join(' & ');
        const suggestionsHighlights = b.suggestions.slice(0, 2).map(s => `"${s.content.slice(0, 50)}..."`).join(' & ');

        const trend: 'improving' | 'stable' | 'declining' = 
          pctScore > 70 ? 'improving' : (pctScore >= 45 ? 'stable' : 'declining');

        const activeComments = [...b.praises, ...b.suggestions]
          .sort((x, y) => y.votes - x.votes)
          .slice(0, 2);

        alertsList.push({
          id: `alert-${b.id}`,
          brandName: b.name,
          triggerType,
          triggerLabel,
          subject: `Perception Shift Report: ${b.name}`,
          summary: `Analysis of user-contributed feedback indicates standard-setting movement in public confidence. Compiled dynamic score sits at ${pctScore}%.`,
          trend,
          explanation: `This alert was systemically triggered because ${b.praises.length} commendation(s) and ${b.suggestions.length} technical diagnostics have been fed into our regional consensus registry. Active public peer endorsements have validated this threshold change.`,
          aiSummary: `Consensus engine analyzed ${liveFeedbackCount} user-generated submissions. ${
            hasPraises 
              ? `Positive sentiment emphasizes commendations including: ${praisesHighlights || 'localized service efficiency'}.` 
              : ''
          } ${
            b.suggestions.length > 0 
              ? `Constructive diagnostics cite customer suggestions such as: ${suggestionsHighlights || 'supply chain or structural adjustments'}.` 
              : ''
          } Current trend is determined as ${trend.toUpperCase()} with an aggregated index of ${pctScore}/100.`
        });
      }
    });

    // Rule 3: Industry level trend shift (aggregated changes across telecom sector)
    const telecomBrands = brands.filter(b => b.sector.toLowerCase() === 'telecom');
    const hasTelecomFeedback = telecomBrands.some(b => (b.praises.length + b.suggestions.length) >= 2);
    if (hasTelecomFeedback) {
      alertsList.push({
        id: 'sector-telecom-alert',
        brandName: 'Telecom Sector (Pan-African)',
        triggerType: 'sector_shift',
        triggerLabel: 'Industry-level trend shift detected',
        subject: 'Significant Sentiment Change Detected in Telecom Sector',
        summary: 'Aggregated analytics across Pan-African telecom benchmarks indicate major shifts in modern consumer responsiveness expectations.',
        trend: 'stable',
        explanation: 'This high-signal intelligence alert represents a multi-brand index threshold crossing. When multiple key actors (such as MTN Nigeria) in a matching sector cross indexing baselines, the sector benchmark is automatically re-weighted.',
        aiSummary: 'Sector-wide metadata signals a re-calibration of expected trust and responsiveness constants. Combined consumer feedback loops call for standard-setting service guarantees and transparent regional routing.'
      });
    }

    setActiveAlerts(alertsList);
  }, [brands]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const targetEmail = email.trim();
    if (!targetEmail) return;

    setIsSubmitting(true);
    
    // Slight human delay to simulate heavy multi-region cryptographic mapping
    setTimeout(async () => {
      const result = await subscribeToInsightAlerts(targetEmail);
      setIsSubmitting(false);
      setSubmittedEmail(targetEmail);
      setSuccessMode(result.mode);
      setEmail('');
    }, 900);
  };

  const trendStyles = {
    improving: 'text-emerald-700 bg-emerald-50 border-emerald-300',
    stable: 'text-amber-700 bg-amber-50 border-amber-300',
    declining: 'text-rose-700 bg-rose-50 border-rose-300',
  };

  return (
    <section id="insight-alerts" className="w-full py-24 bg-[#FAF8F2] border-t-2 border-[#000]/5 text-[#082D20]">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Core Layout containing title and form */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-12 pb-16 border-b border-[#082D20]/10">
          
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
                    Registered email: {submittedEmail} {successMode === 'supabase' ? '• SUPABASE CLOUD SYNCED' : '• LOCAL SANDBOX INDEXED'}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Intelligence Signal Feed / Briefing simulator section */}
        <div className="mt-12 text-left space-y-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setIsAlertsPaneOpen(!isAlertsPaneOpen)}
              className="inline-flex items-center gap-2 text-xs font-mono font-black text-[#E6A71B] hover:text-[#B8810E] transition-colors py-1 cursor-pointer select-none"
            >
              <span>{isAlertsPaneOpen ? '[-] HIDE ACTIVE SIGNAL LOGS' : '[+] EXPLORE ACTIVE INTELLIGENCE SIGNALS'}</span>
              <span className="text-[10px] text-[#082D20]/50 bg-[#082D20]/5 px-2 py-0.5 rounded-full">
                {activeAlerts.length} Tracked Changes
              </span>
            </button>
            <span className="text-[9px] font-mono text-[#082D20]/45 font-semibold">
              Live Threshold Scanner
            </span>
          </div>

          <AnimatePresence>
            {isAlertsPaneOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden space-y-4"
              >
                {activeAlerts.length === 0 ? (
                  <div className="bg-[#082D20]/5 rounded-xl p-6 border border-[#082D20]/10 text-center space-y-2">
                    <p className="text-xs font-semibold text-[#082D20]/60">
                      No High-Signal Events Compiled Yet
                    </p>
                    <p className="text-[10px] font-mono text-[#082D20]/45 leading-relaxed max-w-lg mx-auto">
                      "If no meaningful events exist: do NOT send emails, do NOT fabricate alerts, system remains silent." Submit comments, commendations, or diagnostic suggestions to any brand above to cross sentiment or engagement thresholds and simulate live briefs instantly.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {activeAlerts.map((alert) => (
                      <div
                        key={alert.id}
                        className="bg-white border border-[#082D20]/10 rounded-xl p-4 flex flex-col justify-between hover:border-[#E6A71B]/40 hover:shadow-xs transition-all space-y-3"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[9px] font-mono font-bold bg-[#E6A71B]/10 text-[#B8810E] px-2 py-0.5 rounded-md border border-[#E6A71B]/20">
                              {alert.triggerLabel}
                            </span>
                            <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 border rounded-sm tracking-tight capitalize ${trendStyles[alert.trend]}`}>
                              {alert.trend} trend
                            </span>
                          </div>

                          <h4 className="text-xs font-black text-[#082D20] tracking-tight uppercase">
                            {alert.subject}
                          </h4>
                          <p className="text-[11px] text-[#082D20]/75 leading-relaxed font-sans">
                            {alert.summary}
                          </p>
                        </div>

                        <button
                          onClick={() => setSelectedAlert(alert)}
                          className="self-start text-[10px] font-mono font-black text-[#082D20] hover:text-[#E6A71B] flex items-center gap-1 cursor-pointer"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          View Analytical Briefing Document →
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>

      {/* Bloomberg-Style Analytical Briefing Modal */}
      <AnimatePresence>
        {selectedAlert && (
          <div className="fixed inset-0 bg-[#082D20]/45 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 12 }}
              transition={{ duration: 0.3 }}
              className="bg-[#FAF8F2] w-full max-w-2xl rounded-2xl border-2 border-[#082D20] shadow-[0_24px_60px_rgba(8,45,32,0.35)] overflow-hidden flex flex-col max-h-[85vh]"
            >
              {/* Report Header Band */}
              <div className="bg-[#082D20] text-[#FAF8F2] px-6 py-4 border-b-2 border-[#E6A71B]/30 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#E6A71B] animate-pulse" />
                  <span className="text-[10px] font-mono font-extrabold tracking-widest text-[#E6A71B] uppercase">
                    AFRICAN PUBLIC PERCEPTION INTELLIGENCE BRIEFING
                  </span>
                </div>
                <button
                  onClick={() => setSelectedAlert(null)}
                  className="text-white/60 hover:text-white font-mono text-xs cursor-pointer px-2 py-1 rounded hover:bg-white/5 transition-colors"
                >
                  [CLOSE REPORT]
                </button>
              </div>

              {/* Printable Bloomberg Report Layout */}
              <div className="p-6 sm:p-8 space-y-6 overflow-y-auto font-sans text-[#082D20]">
                {/* Meta block */}
                <div className="border-b border-[#082D20]/15 pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-[10px] font-mono text-[#082D20]/50 uppercase tracking-wider font-semibold">
                  <div>DISPATCH ID: {selectedAlert.id.toUpperCase()}</div>
                  <div>SECURITY STATUS: DECLASSIFIED / PUBLIC FEED</div>
                  <div>TREND DIRECTION: {selectedAlert.trend.toUpperCase()}</div>
                </div>

                {/* Brand title */}
                <div className="space-y-1.5">
                  <span className="text-[9px] font-mono uppercase font-black tracking-widest text-[#B8810E] block">
                    ENTITY REGISTRY GROUP //
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black uppercase text-[#082D20] tracking-tight">
                    {selectedAlert.brandName}
                  </h3>
                </div>

                {/* Summary Section */}
                <div className="space-y-2">
                  <h5 className="text-[10px] font-mono uppercase font-extrabold tracking-widest text-[#082D20]/60">
                    I. SUMMARY OF PERCEPTION CHANGE
                  </h5>
                  <p className="text-xs sm:text-sm font-medium leading-relaxed bg-[#082D20]/5 border-l-2 border-l-[#E6A71B] p-4 rounded-r-lg font-sans">
                    {selectedAlert.summary}
                  </p>
                </div>

                {/* Explanation Details */}
                <div className="space-y-2">
                  <h5 className="text-[10px] font-mono uppercase font-extrabold tracking-widest text-[#082D20]/60">
                    II. CONTEXTUAL INTELLIGENCE ANALYSIS
                  </h5>
                  <p className="text-xs leading-relaxed text-[#082D20]/80 font-medium">
                    {selectedAlert.explanation}
                  </p>
                </div>

                {/* Optional AI-Generated summary */}
                <div className="space-y-2 bg-white border border-[#E6A71B]/20 rounded-xl p-4">
                  <div className="flex items-center gap-1.5 pb-2 mb-2 border-b border-[#082D20]/5">
                    <Sparkles className="w-3.5 h-3.5 text-[#E6A71B]" />
                    <span className="text-[9px] font-mono font-black text-[#B8810E] uppercase tracking-wider">
                      CONCENTRIC consensus ANALYSIS (NEUTRAL CALM TONE)
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed italic text-[#082D20]/80 font-medium">
                    {selectedAlert.aiSummary}
                  </p>
                </div>

                {/* Footer disclaimer */}
                <div className="border-t border-[#082D20]/10 pt-4 text-[9px] font-mono text-[#082D20]/45 leading-relaxed text-center">
                  Notice: This analytical briefing is prepared strictly on real-time public submissions in the consensus registry database. Unsubscribe from this notification group instantly inside any future alerts dispatch.
                </div>
              </div>

              {/* Report Footer Band */}
              <div className="bg-[#082D20]/5 border-t border-[#082D20]/10 px-6 py-4 flex items-center justify-between shrink-0">
                <span className="text-[9px] font-mono text-[#082D20]/60">
                  African Brands Insight Infrastructure • Alert System v1.2
                </span>
                <button
                  onClick={() => setSelectedAlert(null)}
                  className="bg-[#082D20] text-[#FAF8F2] px-4 py-2 hover:bg-[#114030] rounded-lg text-[10px] font-mono font-bold tracking-tight transition-colors cursor-pointer"
                >
                  Acknowledge Report
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
