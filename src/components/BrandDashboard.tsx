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
  CheckCircle2 
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
      onAddFeedback({
        user: userName.trim() || 'Anonymous Contributor',
        userTitle: userTitle.trim() || 'Verified Citizen',
        content: content.trim(),
        sentiment: insightType,
      });

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
    if (score >= 82) return 'text-[#C49A45]';
    return 'text-[#164C3B]';
  };

  return (
    <div id="dashboard" className="w-full space-y-10">
      {/* 1. PREMIUM HEADER SECTION */}
      <div className="bg-[#FAF7F2] border border-[#0F3D2E]/10 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          {/* Avatar Placeholder using Initials */}
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#0F3D2E] flex items-center justify-center text-[#F8F6F1] text-xl font-bold border border-[#0F3D2E]/20 select-none shadow-sm shadow-[#0F3D2E]/10">
            {brand.logoChar}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="px-2 py-0.5 rounded bg-[#0F3D2E]/5 border border-[#0F3D2E]/10 text-[10px] font-mono uppercase font-bold text-[#0F3D2E]/70">
                {brand.sector || 'Brand'}
              </span>
              <span className="text-[#0F3D2E]/20">•</span>
              <span className="text-[10px] font-mono text-[#0F3D2E]/50 uppercase font-medium">
                Registry Active
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#0F3D2E] font-display">
              {brand.name}
            </h2>
          </div>
        </div>

        {/* Live Aggregated Statistics Gages */}
        <div className="grid grid-cols-2 gap-3 w-full sm:w-auto sm:flex sm:flex-nowrap sm:gap-6">
          <div className="px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl bg-white/70 border border-[#0F3D2E]/5">
            <span className="text-[9px] sm:text-[10px] font-mono text-[#0F3D2E]/40 uppercase block tracking-tight">Insight Submissions</span>
            <span className="text-xl sm:text-2xl font-bold font-mono text-[#000000] block mt-0.5">
              {allInsights.length}
            </span>
          </div>

          <div className="px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl bg-white/70 border border-[#0F3D2E]/5">
            <span className="text-[9px] sm:text-[10px] font-mono text-[#0F3D2E]/40 uppercase block tracking-tight">Consensus Score</span>
            <span className={`text-xl sm:text-2xl font-bold font-mono block mt-0.5 ${scoreColorClass(brand.overallScore)}`}>
              {brand.overallScore}%
            </span>
          </div>
        </div>
      </div>

      {/* 2. TWO-COLUMN LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Insight Submission Card */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-[#0F3D2E]/12 rounded-2xl p-6 shadow-xs">
            <h3 className="text-base sm:text-lg font-semibold text-[#0F3D2E] tracking-tight mb-1 font-display">
              Submit Qualified Insight
            </h3>
            <p className="text-[#0F3D2E]/65 text-xs mb-6 leading-relaxed font-sans">
              Publish structured feedback to shape the sovereign public signal of {brand.name}.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Insight Type Selector */}
              <div>
                <label className="text-[10px] font-mono uppercase tracking-wider text-[#0F3D2E]/50 block mb-2">
                  Insight Classification
                </label>
                <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#F8F6F1] rounded-xl border border-[#0F3D2E]/10">
                  {(['positive', 'suggestion', 'insight'] as const).map((type) => {
                    const label = type === 'positive' ? 'Commend' : (type === 'suggestion' ? 'Suggest' : 'Technical');
                    const isActive = insightType === type;
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setInsightType(type)}
                        className={`py-2 text-[11px] font-mono font-bold uppercase tracking-wider rounded-lg transition-all duration-150 cursor-pointer ${
                          isActive
                            ? 'bg-[#0F3D2E] text-[#F8F6F1]'
                            : 'text-[#0F3D2E]/60 hover:text-[#0F3D2E]'
                        }`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Author Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="text-[9px] font-mono uppercase tracking-wider text-[#0F3D2E]/50 block mb-1.5 font-bold">
                    Your Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="e.g. Adebayo O."
                    className="w-full px-3 py-2.5 rounded-xl border border-[#0F3D2E]/12 focus:border-[#0F3D2E] focus:outline-none text-xs font-medium placeholder:text-[#0F3D2E]/35 bg-[#F8F6F1]/20 font-sans"
                  />
                </div>
                <div>
                  <label className="text-[9px] font-mono uppercase tracking-wider text-[#0F3D2E]/50 block mb-1.5 font-bold">
                    Professional Title (Optional)
                  </label>
                  <input
                    type="text"
                    value={userTitle}
                    onChange={(e) => setUserTitle(e.target.value)}
                    placeholder="e.g. Systems Architect"
                    className="w-full px-3 py-2.5 rounded-xl border border-[#0F3D2E]/12 focus:border-[#0F3D2E] focus:outline-none text-xs font-medium placeholder:text-[#0F3D2E]/35 bg-[#F8F6F1]/20 font-sans"
                  />
                </div>
              </div>

              {/* Text Area */}
              <div>
                <label className="text-[9px] font-mono uppercase tracking-wider text-[#0F3D2E]/50 block mb-1.5 font-bold">
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
                    className="w-full px-3 py-2.5 rounded-xl border border-[#0F3D2E]/12 focus:border-[#0F3D2E] focus:outline-none text-xs leading-relaxed placeholder:text-[#0F3D2E]/35 bg-[#F8F6F1]/20 resize-none font-sans"
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
                    <div className="py-2.5 px-3.5 bg-[#F8F6F1] border border-[#C49A45]/30 rounded-xl space-y-2 text-xs">
                      <div className="text-[10px] font-mono uppercase font-bold text-[#C49A45] flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C49A45] animate-pulse" />
                        <span>Constructive language refinement tips :</span>
                      </div>
                      
                      <div className="space-y-1.5">
                        {detectedIssues.slice(0, 2).map((issue, index) => (
                          <div 
                            key={index}
                            className="flex flex-wrap items-center justify-between gap-2 bg-white/70 px-2 py-1.5 rounded-lg border border-[#0F3D2E]/5"
                          >
                            <span className="text-[#0F3D2E]/85">
                              Change <span className="line-through text-red-700 font-semibold bg-red-50 px-1 rounded-sm border-b border-red-200">{issue.word}</span> to <span className="font-semibold text-emerald-800 bg-emerald-50 px-1 rounded-sm">{issue.suggestion}</span>
                            </span>
                            
                            <button
                              type="button"
                              onClick={() => handleReplaceWord(issue.word, issue.suggestion)}
                              className="text-[10px] font-mono font-bold uppercase py-0.5 px-2 rounded-md bg-[#0F3D2E] text-white hover:bg-[#164C3B] transition-colors cursor-pointer"
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
                      <span className="font-bold block text-red-950 font-mono text-[9px] uppercase tracking-wider mb-0.5">
                        Integrity Protocol Active
                      </span>
                      <span>Please refine this insight to maintain constructive discussion.</span>
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
                    ? 'bg-[#0F3D2E]/20 text-[#0F3D2E]/40 cursor-not-allowed border border-[#0F3D2E]/5 shadow-none' 
                    : 'bg-[#0F3D2E] hover:bg-[#164C3B] text-[#F8F6F1] hover:shadow-md'
                }`}
              >
                {submitting ? (
                  <span>Securing Vector...</span>
                ) : (
                  <>
                    <span>Publish Insight</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#C49A45]" />
                  </>
                )}
              </button>

              <AnimatePresence>
                {success && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-3 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200 text-xs font-mono font-bold flex items-center gap-2 mt-2"
                  >
                    <ShieldCheck className="w-4 h-4 text-[#C49A45]" />
                    <span>Submission broadcast securely to sovereign public feed.</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>

          {/* Institutional Trust guidelines card */}
          <div className="bg-[#FAF7F2] border border-[#0F3D2E]/10 rounded-xl p-5 space-y-3.5">
            <span className="text-[9px] uppercase tracking-wider text-[#C49A45] font-mono font-bold block">
              // Editorial Standard
            </span>
            <p className="text-[11px] leading-relaxed text-[#0F3D2E]/70 font-sans font-light">
              This registry is completely isolated from normal commercial marketing parameters. Standard citizens maintain individual encryption hashes for security and data privacy.
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: Insights Feed */}
        <div className="lg:col-span-7 space-y-6">
          {/* Feed Filter controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#0F3D2E]/10 pb-4">
            <div className="flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-[#0F3D2E]/40" />
              <span className="text-xs font-mono font-bold text-[#0F3D2E]/60 uppercase">
                Filter Stream
              </span>
            </div>

            {/* Sorters */}
            <div className="flex items-center gap-1.5 p-1 bg-white/40 border border-[#0F3D2E]/10 rounded-lg">
              {([
                { id: 'latest', label: 'Latest' },
                { id: 'oldest', label: 'Oldest' },
                { id: 'most-discussed', label: 'Most Endorsed' }
              ] as const).map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setSortBy(filter.id)}
                  className={`px-3 py-1.5 text-[10px] font-mono uppercase font-semibold rounded-md transition-all cursor-pointer ${
                    sortBy === filter.id
                      ? 'bg-[#0F3D2E] text-white shadow-xs font-bold'
                      : 'text-[#0F3D2E]/50 hover:text-[#0F3D2E]'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* Feed items stream */}
          <div className="space-y-5">
            {allInsights.length === 0 ? (
              <div className="py-16 text-center border-2 border-dashed border-[#0F3D2E]/10 rounded-2xl bg-[#F8F6F1]/30">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#0F3D2E]/40 block">
                  Zero Intelligence Footprints Available
                </span>
                <p className="text-xs text-[#0F3D2E]/50 font-sans mt-2">
                  Be the first to submit a constructive insight on this profile entity.
                </p>
              </div>
            ) : (
              allInsights.map((feedItem) => {
                // Parse feedback colors
                const badgeColor = feedItem.sentiment === 'positive'
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-100'
                  : feedItem.sentiment === 'suggestion'
                  ? 'bg-amber-50 text-amber-800 border-amber-100'
                  : 'bg-indigo-50 text-indigo-800 border-indigo-100';

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
                    className="p-6 bg-white border border-[#0F3D2E]/12 rounded-xl space-y-4 shadow-xs hover:border-[#0F3D2E]/30 transition-all relative group flex flex-col justify-between"
                  >
                    {/* Header line of the item */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F8F6F1] pb-3">
                      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase tracking-tight border shrink-0 ${badgeColor}`}>
                          {label}
                        </span>
                        <span className="text-[9px] sm:text-[10px] text-[#0F3D2E]/40 font-mono whitespace-nowrap">
                          • Verified Entry • {feedItem.date}
                        </span>
                      </div>

                      {/* Endorse / Like control with strict double-vote blocking */}
                      <button
                        onClick={() => handleEndorseClick(feedItem.id, feedItem.sourceList)}
                        disabled={isAlreadyLiked}
                        className={`flex items-center justify-center gap-1.5 px-3 py-1.5 rounded transition-all text-[10px] font-mono font-bold w-full sm:w-auto ${
                          isAlreadyLiked
                            ? 'bg-[#C49A45]/15 text-[#A37A2F] border border-[#C49A45]/20 cursor-default pointer-events-none'
                            : 'bg-[#F8F6F1] hover:bg-[#C49A45]/10 hover:text-[#C49A45] border border-[#0F3D2E]/5 text-[#0F3D2E]/70 cursor-pointer active:scale-95'
                        }`}
                        title={isAlreadyLiked ? 'You have already endorsed this insight' : 'Endorse this insight'}
                      >
                        <ThumbsUp className={`w-3 h-3 ${isAlreadyLiked ? 'fill-current text-[#C49A45]' : 'text-[#C49A45]'}`} />
                        <span className="whitespace-nowrap">{isAlreadyLiked ? 'Endorsed' : 'Endorse'} ({feedItem.votes})</span>
                      </button>
                    </div>

                    {/* Highly readable, elegantly bold, structured premium editorial text content with automatic keyword highlight */}
                    <div className="text-[#0F3D2E] text-sm leading-relaxed font-sans font-normal whitespace-pre-wrap select-text pr-2">
                      <EditorialText text={feedItem.content} />
                    </div>

                    {/* Source citation */}
                    <div className="text-[10px] font-mono text-[#0F3D2E]/40 flex items-center gap-2 bg-[#F8F6F1]/30 py-2 px-3 rounded-lg border border-[#0F3D2E]/5">
                      <span className="font-bold text-[#0F3D2E]/65 uppercase">
                        {feedItem.user}
                      </span>
                      <span>—</span>
                      <span className="italic uppercase text-[#0F3D2E]/50">
                        {feedItem.userTitle || 'Community Contributor'}
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
