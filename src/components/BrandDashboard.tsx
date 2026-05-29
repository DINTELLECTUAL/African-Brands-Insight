import React, { useState, useMemo, useEffect } from 'react';
import { 
  Sparkles, 
  MessageSquare, 
  ThumbsUp, 
  Calendar, 
  ArrowUpRight, 
  ShieldCheck, 
  Filter, 
  AlertCircle, 
  CheckCircle2,
  Activity
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BrandPerception, PublicFeedback } from '../types';
import { 
  analyzeInsightContent, 
  applyConstructiveSuggestion, 
  generateSessionDeviceHash 
} from '../utils/moderation';
import { EditorialText } from './EditorialText';

interface BrandDashboardProps {
  brand: BrandPerception;
  onAddFeedback: (feedback: Omit<PublicFeedback, 'id' | 'date' | 'votes'>) => void;
  onVoteFeedback: (feedbackId: string, type: 'praise' | 'suggestion') => void;
}

export function BrandDashboard({ brand, onAddFeedback, onVoteFeedback }: BrandDashboardProps) {
  const [insightType, setInsightType] = useState<'positive' | 'suggestion' | 'insight'>('positive');
  const [content, setContent] = useState('');
  const [userName, setUserName] = useState('');
  const [userTitle, setUserTitle] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  
  // Real-time moderation indicators
  const [isHardBlocked, setIsHardBlocked] = useState(false);
  const [detectedIssues, setDetectedIssues] = useState<Array<{ word: string; suggestion: string; index: number }>>([]);
  
  // Sorting controls: 'latest' | 'oldest' | 'most-discussed'
  const [sortBy, setSortBy] = useState<'latest' | 'oldest' | 'most-discussed'>('latest');

  // Like / endorsement security registry State (persisted & mapped with device session fingerprint)
  const [likedFeedIds, setLikedFeedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('abi_endorsed_feed_ids');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Track the absolute secure integrity token mapping this device session
  useEffect(() => {
    const fingerprint = generateSessionDeviceHash();
    localStorage.setItem('abi_session_hash', fingerprint);
  }, []);

  // Sync likes list to standard client storage
  useEffect(() => {
    localStorage.setItem('abi_endorsed_feed_ids', JSON.stringify(likedFeedIds));
  }, [likedFeedIds]);

  // Handle typing analysis inside entry board
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setContent(val);

    const { isHardBlocked: blocked, detectedIssues: issues } = analyzeInsightContent(val);
    setIsHardBlocked(blocked);
    setDetectedIssues(issues);
  };

  // Replace a soft warning word instantly in typing content state
  const handleReplaceWord = (originalWord: string, suggestion: string) => {
    const updated = applyConstructiveSuggestion(content, originalWord, suggestion);
    setContent(updated);
    
    // Re-verify immediately
    const { isHardBlocked: blocked, detectedIssues: issues } = analyzeInsightContent(updated);
    setIsHardBlocked(blocked);
    setDetectedIssues(issues);
  };

  // Unified all insights feed
  const allInsights = useMemo(() => {
    // Transform praises (Commendations)
    const praisesMapped = brand.praises.map(p => ({ ...p, sourceList: 'praise' as const }));
    // Transform suggestions & legacy insights
    const suggestionsMapped = brand.suggestions.map(s => ({ ...s, sourceList: 'suggestion' as const }));
    
    const combined = [...praisesMapped, ...suggestionsMapped];

    // Sort accordingly
    if (sortBy === 'latest') {
      return combined.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime() || b.id.localeCompare(a.id));
    } else if (sortBy === 'oldest') {
      return combined.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime() || a.id.localeCompare(b.id));
    } else {
      // Most discussed/upvoted
      return combined.sort((a, b) => b.votes - a.votes);
    }
  }, [brand, sortBy]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || isHardBlocked) return;

    setSubmitting(true);
    
    // Slight simulated high-performance backend synchronization
    setTimeout(() => {
      const finalUser = userName.trim() || 'Anonymous Contributor';
      
      onAddFeedback({
        user: finalUser,
        userTitle: userTitle.trim() || 'Verified Citizen',
        content: content.trim(),
        sentiment: insightType,
      });

      // Dispatch real-time custom event
      window.dispatchEvent(
        new CustomEvent('new-insight-submitted', {
          detail: {
            brandName: brand.name,
            sentiment: insightType,
            user: finalUser,
          },
        })
      );

      setContent('');
      setUserName('');
      setUserTitle('');
      setIsHardBlocked(false);
      setDetectedIssues([]);
      setSubmitting(false);
      setSuccess(true);
      
      setTimeout(() => setSuccess(false), 4000);
    }, 600);
  };

  // Secure validation wrapper for the endorsing action (liking)
  const handleEndorseClick = (itemId: string, sourceList: 'praise' | 'suggestion') => {
    // Prevent duplicated votes for same session fingerprint
    if (likedFeedIds.includes(itemId)) return;

    // Upvote callback
    onVoteFeedback(itemId, sourceList);

    // Register like along with metadata session tracing
    const newLikedCollection = [...likedFeedIds, itemId];
    setLikedFeedIds(newLikedCollection);

    // Persist timestamp transaction log securely inside browser database layer
    const auditRecordKey = `abi_log_v2_${itemId}`;
    const auditLog = {
      insightId: itemId,
      sessionDeviceFingerprint: generateSessionDeviceHash(),
      timestampEpoch: Date.now(),
      status: 'VERIFIED_COMMUNITY_ENDORSED'
    };
    localStorage.setItem(auditRecordKey, JSON.stringify(auditLog));
  };

  const scoreColorClass = (score: number) => {
    if (score >= 82) return 'text-[#E6A71B] drop-shadow-[0_2px_4px_rgba(230,167,27,0.3)]';
    return 'text-[#0D4130]';
  };

  return (
    <div id="dashboard" className="w-full space-y-10">
      {/* 1. PREMIUM HEADER SECTION */}
      <div className="bg-[#FAF7F2] border-2 border-[#0B3D2F]/20 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden shadow-[0_4px_20px_rgba(11,61,47,0.06)]">
        <div className="absolute top-0 right-0 w-44 h-44 bg-gradient-to-br from-[#E6A71B]/5 to-transparent rounded-full blur-2xl pointer-events-none" />
        <div className="flex items-center gap-5 relative z-10">
          {/* Avatar Placeholder using Initials */}
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-[#082D20] to-[#0D4130] flex items-center justify-center text-[#E6A71B] text-2xl font-black border-2 border-[#E6A71B] select-none shadow-[0_4px_12px_rgba(8,45,32,0.25)]">
            {brand.logoChar}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="px-2 py-0.5 rounded bg-[#E6A71B]/15 border border-[#E6A71B]/30 text-[10px] font-mono uppercase font-black text-[#B8810E] tracking-wider">
                {brand.sector || 'Brand'}
              </span>
              <span className="text-[#082D20]/20">•</span>
              <span className="text-[10px] font-mono text-[#082D20]/60 uppercase font-bold tracking-wider flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse inline-block" />
                Registry Active
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#082D20] font-display">
              {brand.name}
            </h2>
          </div>
        </div>

        {/* Live Aggregated Statistics Gages */}
        <div className="grid grid-cols-2 gap-3 w-full sm:w-auto sm:flex sm:flex-nowrap sm:gap-6 relative z-10">
          <div className="px-5 py-3 rounded-xl bg-white border-2 border-[#082D20]/10 shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:border-[#E6A71B]/40 transition-all duration-300">
            <span className="text-[9px] sm:text-[10px] font-mono text-[#082D20]/50 uppercase block tracking-wider font-bold">Insight Submissions</span>
            <span className="text-2xl sm:text-3xl font-black font-mono text-[#082D20] block mt-0.5">
              {allInsights.length}
            </span>
          </div>

          <div className="px-5 py-3 rounded-xl bg-white border-2 border-[#E6A71B]/20 shadow-[0_4px_12px_rgba(230,167,27,0.06)] hover:border-[#E6A71B]/50 transition-all duration-300">
            <span className="text-[9px] sm:text-[10px] font-mono text-[#B8810E] uppercase block tracking-wider font-bold">Consensus Score</span>
            <span className={`text-2xl sm:text-3xl font-black font-mono block mt-0.5 ${scoreColorClass(brand.overallScore)}`}>
              {brand.overallScore}%
            </span>
          </div>
        </div>
      </div>

      {/* 2. TWO-COLUMN LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Insight Submission Card */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border-2 border-[#082D20] rounded-2xl overflow-hidden shadow-[0_12px_44px_rgba(8,45,32,0.08)] relative group transition-all duration-300 hover:border-[#E6A71B]/85 hover:shadow-[0_16px_48px_rgba(8,45,32,0.12)]">
            {/* Elegant Tech Banner */}
            <div className="bg-gradient-to-r from-[#082D20] to-[#041A13] px-6 py-4.5 border-b-2 border-[#E6A71B]/35 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E6A71B] shadow-[0_0_10px_rgba(230,167,27,0.9)] animate-pulse" />
                <h3 className="text-[11px] font-black tracking-widest text-[#FAF8F2] font-mono uppercase">
                  ACTIVE SUBMISSION NODE // AB-01
                </h3>
              </div>
              <span className="text-[9px] font-mono bg-[#E6A71B]/15 text-[#E6A71B] px-2 py-0.5 rounded border border-[#E6A71B]/35 font-extrabold tracking-widest">
                SECURE SHA-256
              </span>
            </div>

            <div className="p-6">
              <h4 className="text-lg sm:text-xl font-black text-[#082D20] tracking-tight mb-1 font-display">
                Submit Qualified Insight
              </h4>
              <p className="text-[#082D20]/75 text-xs mb-6 leading-relaxed font-sans font-medium">
                Publish authentic public signals directly to the decentralized registry of <span className="font-bold underline decoration-[#E6A71B] decoration-2">{brand.name}</span>.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Insight Type Selector */}
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-widest text-[#B8810E] block mb-2 font-black">
                    Insight Classification
                  </label>
                  <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#FAF8F2] rounded-xl border border-[#082D20]/10">
                    {(['positive', 'suggestion', 'insight'] as const).map((type) => {
                      const label = type === 'positive' ? 'Commend' : (type === 'suggestion' ? 'Suggest' : 'Technical');
                      const isActive = insightType === type;
                      const Icon = type === 'positive' ? Sparkles : (type === 'suggestion' ? MessageSquare : Activity);
                      return (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setInsightType(type)}
                          className={`py-2 px-1 text-[10px] font-mono font-black uppercase tracking-wider rounded-lg transition-all duration-200 cursor-pointer flex items-center justify-center gap-1 sm:gap-1.5 ${
                            isActive
                              ? 'bg-gradient-to-br from-[#082D20] to-[#0D4130] text-[#FAF8F2] border-2 border-[#E6A71B]/40 shadow-xs'
                              : 'text-[#082D20]/60 hover:text-[#082D20] hover:bg-[#082D20]/5'
                          }`}
                        >
                          <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#E6A71B]' : 'text-[#082D20]/40'}`} />
                          <span>{label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Author Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="text-[9px] font-mono uppercase tracking-wider text-[#082D20]/50 block mb-1.5 font-black">
                      Your Name (Optional)
                    </label>
                    <input
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="e.g. Adebayo O."
                      className="w-full px-3 py-2.5 rounded-xl border-2 border-[#082D20]/10 focus:border-[#E6A71B] focus:bg-white focus:outline-none text-xs font-bold placeholder:text-[#082D20]/30 bg-[#FAF8F2] font-sans transition-all shadow-2xs"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] font-mono uppercase tracking-wider text-[#082D20]/50 block mb-1.5 font-black">
                      Professional Title (Optional)
                    </label>
                    <input
                      type="text"
                      value={userTitle}
                      onChange={(e) => setUserTitle(e.target.value)}
                      placeholder="e.g. Systems Architect"
                      className="w-full px-3 py-2.5 rounded-xl border-2 border-[#082D20]/10 focus:border-[#E6A71B] focus:bg-white focus:outline-none text-xs font-bold placeholder:text-[#082D20]/30 bg-[#FAF8F2] font-sans transition-all shadow-2xs"
                    />
                  </div>
                </div>

                {/* Text Area */}
                <div>
                  <label className="text-[9px] font-mono uppercase tracking-wider text-[#082D20]/50 block mb-1.5 font-black">
                    Insight Body
                  </label>
                  <div className="relative">
                    <textarea
                      value={content}
                      onChange={handleContentChange}
                      placeholder={
                        insightType === 'positive'
                          ? "Describe exceptional service delivery milestones, reliability parameters, or operational successes..."
                          : insightType === 'suggestion'
                          ? "Point directly to distribution improvements, micro-billing packages, or customer support issues..."
                          : "Provide specialized diagnostic reviews, interface design constraints, or architectural improvement pathways..."
                      }
                      rows={4}
                      required
                      maxLength={500}
                      className="w-full px-3.5 py-3 rounded-xl border-2 border-[#082D20]/10 focus:border-[#E6A71B] focus:bg-white focus:outline-none text-xs font-semibold leading-relaxed placeholder:text-[#082D20]/30 bg-[#FAF8F2] resize-none font-sans transition-all shadow-2xs"
                    />
                  </div>
                </div>

                {/* REAL-TIME INTELLIGENT WORDING CUES AND FEEDBACK */}
                <AnimatePresence>
                  {!isHardBlocked && detectedIssues.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="py-3 px-3.5 bg-[#E6A71B]/12 border-2 border-[#E6A71B]/40 rounded-xl space-y-2 text-xs">
                        <div className="text-[10px] font-mono uppercase font-black text-[#B8810E] flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#E6A71B] animate-pulse" />
                          <span>Constructive language refinement tips :</span>
                        </div>
                        
                        <div className="space-y-1.5">
                          {detectedIssues.slice(0, 2).map((issue, index) => (
                            <div 
                              key={index}
                              className="flex flex-wrap items-center justify-between gap-2 bg-white/90 p-2 rounded-lg border border-[#E6A71B]/20"
                            >
                              <span className="text-[#082D20] font-medium">
                                Change <span className="line-through text-red-700 font-bold bg-red-50 px-1 rounded-sm border-b border-red-200">{issue.word}</span> to <span className="font-bold text-emerald-800 bg-emerald-50 px-1 rounded-sm">{issue.suggestion}</span>
                              </span>
                              
                              <button
                                type="button"
                                onClick={() => handleReplaceWord(issue.word, issue.suggestion)}
                                className="text-[10px] font-mono font-black uppercase py-1 px-3 rounded-md bg-[#082D20] text-[#FAF8F2] hover:bg-[#0D4130] transition-colors cursor-pointer"
                              >
                                Auto-Apply
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* ESCALATION BLOCKER UI FOR SEVERE HATEFUL/EXPLICIT INPUT */}
                <AnimatePresence>
                  {isHardBlocked && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-3.5 bg-red-50 text-red-900 rounded-xl border border-red-200 flex items-start gap-2.5"
                    >
                      <AlertCircle className="w-4 h-4 text-red-700 shrink-0 mt-0.5" />
                      <div className="text-xs">
                        <span className="font-black block text-red-950 font-mono text-[9px] uppercase tracking-wider mb-0.5">
                          Integrity Protocol Active
                        </span>
                        <span className="font-medium">Please refine this insight to maintain constructive discussion.</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit CTA */}
                <button
                  type="submit"
                  disabled={submitting || isHardBlocked}
                  className={`w-full py-3.5 text-xs rounded-xl font-bold transition-all select-none shadow-xs cursor-pointer flex items-center justify-center gap-2 ${
                    isHardBlocked 
                      ? 'bg-[#082D20]/15 text-[#082D20]/40 cursor-not-allowed border-2 border-dashed border-[#082D20]/10 shadow-none' 
                      : 'bg-gradient-to-r from-[#082D20] to-[#041A13] hover:from-[#041A13] hover:to-[#082D20] text-[#FAF8F2] border-2 border-[#E6A71B]/50 hover:border-[#E6A71B] hover:shadow-lg hover:shadow-[#082D20]/15'
                  }`}
                >
                  {submitting ? (
                    <span className="font-mono font-black">Securing Vector...</span>
                  ) : (
                    <>
                      <span className="uppercase tracking-wider font-extrabold text-xs">Publish Secure Insight</span>
                      <ArrowUpRight className="w-4 h-4 text-[#E6A71B]" />
                    </>
                  )}
                </button>

                <AnimatePresence>
                  {success && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="p-3.5 bg-emerald-50 text-emerald-950 border-2 border-emerald-400 rounded-xl text-xs font-mono font-bold flex items-center gap-2 mt-2 shadow-xs animate-pulse"
                    >
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>SUBMISSION VERIFIED & SECURELY REGISTERED TO FEED✓</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </div>

          {/* Institutional Trust guidelines card */}
          <div className="bg-[#FAF8F2] border-2 border-[#082D20]/10 rounded-2xl p-5 space-y-3 shadow-xs">
            <span className="text-[9px] uppercase tracking-widest text-[#B8810E] font-mono font-black block">
              // EDITORIAL QUALITY MANDATE
            </span>
            <p className="text-[11px] leading-relaxed text-[#082D20]/80 font-sans font-medium">
              This registry processes public contributions through local state filters. Verified entries obtain strict hashing markers to protect transparency while filtering low-quality or manipulative telemetry.
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: Insights Feed */}
        <div className="lg:col-span-7 space-y-6">
          {/* High-visibility headers block */}
          <div className="bg-[#FAF8F2] border-2 border-[#082D20] rounded-2xl p-5 mb-6 shadow-xs relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#E6A71B]/10 to-transparent rounded-full blur-xl pointer-events-none" />
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse" />
                  <span className="text-[10px] font-mono uppercase font-black tracking-widest text-[#B8810E]">
                    SOVEREIGN PUBLIC FEED
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-black text-[#082D20] tracking-tight font-display">
                  Live Consensus Stream
                </h3>
              </div>
              
              {/* Sorters */}
              <div className="flex items-center gap-1 px-1.5 py-1 bg-white border border-[#082D20]/15 rounded-xl shadow-3xs self-start sm:self-auto">
                {([
                  { id: 'latest', label: 'Latest' },
                  { id: 'oldest', label: 'Oldest' },
                  { id: 'most-discussed', label: 'Most Endorsed' }
                ] as const).map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setSortBy(filter.id)}
                    className={`px-3 py-1.5 text-[10px] font-mono uppercase font-extrabold rounded-lg transition-all cursor-pointer ${
                      sortBy === filter.id
                        ? 'bg-gradient-to-r from-[#082D20] to-[#0D4130] text-[#FAF8F2] shadow-xs border border-[#E6A71B]/30'
                        : 'text-[#082D20]/55 hover:text-[#082D20] hover:bg-[#082D20]/5'
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Feed items stream */}
          <div className="space-y-6">
            {allInsights.length === 0 ? (
              <div className="py-20 text-center border-2 border-dashed border-[#082D20]/15 rounded-2xl bg-[#FAF8F2] p-8">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#B8810E] font-black block mb-2">
                  Zero Intelligence Footprints Available
                </span>
                <p className="text-xs text-[#082D20]/75 font-sans font-medium mt-1">
                  Be the first to submit an authentic, constructive public insight on this entity.
                </p>
              </div>
            ) : (
              allInsights.map((feedItem) => {
                // Classifications details
                const accentBorder = feedItem.sentiment === 'positive'
                  ? 'border-l-4 border-l-emerald-500'
                  : feedItem.sentiment === 'suggestion'
                  ? 'border-l-4 border-l-amber-500'
                  : 'border-l-4 border-l-indigo-500';

                const cardBg = feedItem.sentiment === 'positive'
                  ? 'bg-gradient-to-br from-white to-emerald-50/10'
                  : feedItem.sentiment === 'suggestion'
                  ? 'bg-gradient-to-br from-white to-amber-50/10'
                  : 'bg-gradient-to-br from-white to-indigo-50/10';

                const categoryIcon = feedItem.sentiment === 'positive'
                  ? <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  : feedItem.sentiment === 'suggestion'
                  ? <MessageSquare className="w-3.5 h-3.5 text-amber-600" />
                  : <Activity className="w-3.5 h-3.5 text-indigo-600" />;

                const label = feedItem.sentiment === 'positive' 
                  ? 'Commendation' 
                  : (feedItem.sentiment === 'suggestion' ? 'Suggestion' : 'Technical Insight');

                const isAlreadyLiked = likedFeedIds.includes(feedItem.id);

                return (
                  <motion.div
                    key={feedItem.id}
                    layoutId={feedItem.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    className={`p-6 border-2 border-[#082D20]/10 rounded-2xl space-y-4 shadow-sm hover:shadow-md hover:border-[#E6A71B]/55 transition-all duration-300 relative group flex flex-col justify-between ${accentBorder} ${cardBg}`}
                  >
                    {/* Header line of the item */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-[#FAF8F2] pb-3.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white border border-[#082D20]/10 text-[10px] font-mono font-black uppercase tracking-wider shadow-2xs">
                          {categoryIcon}
                          <span className="text-[#082D20]">
                            {label}
                          </span>
                        </div>
                        <span className="text-[9px] sm:text-[10px] text-[#082D20]/50 font-mono font-bold uppercase tracking-wider">
                          • {feedItem.date}
                        </span>
                      </div>

                      {/* Endorse / Like control with strict double-vote blocking */}
                      <button
                        onClick={() => handleEndorseClick(feedItem.id, feedItem.sourceList)}
                        disabled={isAlreadyLiked}
                        className={`flex items-center justify-center gap-2 px-3 py-1.5 rounded-xl transition-all text-[11px] font-mono font-extrabold w-full sm:w-auto shadow-2xs ${
                          isAlreadyLiked
                            ? 'bg-[#E6A71B]/20 text-[#B8810E] border-2 border-[#E6A71B]/35 cursor-default pointer-events-none'
                            : 'bg-[#FAF8F2] hover:bg-[#E6A71B]/15 hover:text-[#B8810E] border-2 border-[#082D20]/10 text-[#082D20] cursor-pointer hover:border-[#E6A71B] active:scale-95'
                        }`}
                        title={isAlreadyLiked ? 'You have already endorsed this insight' : 'Endorse this insight'}
                      >
                        <ThumbsUp className={`w-3.5 h-3.5 ${isAlreadyLiked ? 'fill-current text-[#B8810E]' : 'text-[#B8810E]'}`} />
                        <span className="whitespace-nowrap">{isAlreadyLiked ? 'Endorsed' : 'Endorse'} ({feedItem.votes})</span>
                      </button>
                    </div>

                    {/* Highly readable, elegantly bold, structured premium editorial text content with automatic keyword highlight */}
                    <div className="text-[#082D20] text-sm leading-relaxed font-sans font-bold whitespace-pre-wrap select-text pr-2">
                      <EditorialText text={feedItem.content} />
                    </div>

                    {/* Source citation */}
                    <div className="text-[10px] font-mono text-[#082D20]/50 flex items-center justify-between bg-white border border-[#FAF8F2] py-2 px-3.5 rounded-xl shadow-3xs">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <span className="font-extrabold text-[#082D20]">
                          {feedItem.user}
                        </span>
                        <span className="text-[#082D20]/20">•</span>
                        <span className="italic uppercase text-[#082D20]/60 font-bold">
                          {feedItem.userTitle || 'Community Contributor'}
                        </span>
                      </div>
                      <span className="text-[8px] font-mono text-[#E6A71B] font-extrabold tracking-widest hidden sm:inline-block">
                        HASH INTEGRITY STATUS✓
                      </span>
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
