import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Activity, MessageSquare, Flame } from 'lucide-react';

interface ActivityItem {
  id: string;
  category: 'Commendation' | 'Suggestion' | 'Technical' | 'Perception';
  text: string;
  timeLabel: string;
}

export function LiveActivityPerception() {
  const [activeItem, setActiveItem] = useState<ActivityItem | null>(null);
  const displayTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Helper to trigger a new user-contributed activity indicator
  const triggerNextActivity = (item: Omit<ActivityItem, 'id'>) => {
    // Clear active timers
    if (displayTimerRef.current) {
      clearTimeout(displayTimerRef.current);
    }

    // Dismiss active panel
    setActiveItem(null);

    // Minor delay before showing next contribution for screen pacing
    setTimeout(() => {
      setActiveItem({
        ...item,
        id: `${Date.now()}-${Math.random()}`,
      });

      // Close automatically in 8 seconds
      displayTimerRef.current = setTimeout(() => {
        setActiveItem(null);
      }, 8000);
    }, 400);
  };

  useEffect(() => {
    // Elegant system coupling: listen strictly to real-time events on window
    const handleNewLiveSubmission = (e: Event) => {
      const customEvent = e as CustomEvent<{ brandName: string; sentiment: string; user: string }>;
      if (customEvent.detail) {
        const { brandName, sentiment, user } = customEvent.detail;
        
        let category: ActivityItem['category'] = 'Technical';
        let actionWord = 'submitted an insight for';
        
        if (sentiment === 'positive') {
          category = 'Commendation';
          actionWord = 'submitted a commendation for';
        } else if (sentiment === 'suggestion') {
          category = 'Suggestion';
          actionWord = 'shared a suggestion for';
        }

        const username = user || 'A verified citizen';
        const activityText = `${username} ${actionWord} ${brandName || 'a brand'}`;
        
        triggerNextActivity({
          category,
          text: activityText,
          timeLabel: 'just now',
        });
      }
    };

    window.addEventListener('new-insight-submitted', handleNewLiveSubmission);

    return () => {
      if (displayTimerRef.current) clearTimeout(displayTimerRef.current);
      window.removeEventListener('new-insight-submitted', handleNewLiveSubmission);
    };
  }, []);

  // Icon mapping helper
  const renderCategoryIcon = (category: ActivityItem['category']) => {
    switch (category) {
      case 'Commendation':
        return <Sparkles className="w-3.5 h-3.5 text-[#E6A71B]" />;
      case 'Suggestion':
        return <MessageSquare className="w-3.5 h-3.5 text-[#E6A71B]" />;
      case 'Technical':
        return <Activity className="w-3.5 h-3.5 text-[#E6A71B]" />;
      default:
        return <Flame className="w-3.5 h-3.5 text-[#E6A71B]" />;
    }
  };

  return (
    <div 
      className="fixed z-50 pointer-events-none md:bottom-6 bottom-20 md:left-6 left-4 right-4 sm:right-auto md:max-w-sm max-w-[340px]"
      aria-live="polite"
    >
      <AnimatePresence mode="wait">
        {activeItem && (
          <motion.div
            key={activeItem.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto w-full p-3 sm:p-3.5 bg-[#FAF8F2]/95 backdrop-blur-md rounded-xl border-2 border-[#E6A71B]/35 shadow-[0_4px_24px_rgba(8,45,32,0.12)] hover:border-[#E6A71B]/70 hover:shadow-[0_6px_32px_rgba(8,45,32,0.18)] transition-all duration-300 flex items-start gap-3 select-none"
          >
            {/* Visual Icon with relative pulse dot container */}
            <div className="relative flex items-center justify-center p-2 rounded-lg bg-[#082D20]/5 border border-[#E6A71B]/20 shrink-0">
              {renderCategoryIcon(activeItem.category)}
              <span className="absolute -top-1 -right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.8)]"></span>
              </span>
            </div>

            {/* Core message text details */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="text-[9px] font-mono uppercase font-black tracking-wider text-[#B8810E]">
                  {activeItem.category}
                </span>
                <span className="text-[#082D20]/20 text-[9px] font-mono">•</span>
                <span className="text-[9px] font-mono font-bold text-[#082D20]/55 whitespace-nowrap lowercase">
                  {activeItem.timeLabel}
                </span>
              </div>
              <p className="text-[#082D20] text-xs sm:text-[12.5px] font-bold font-sans tracking-tight leading-normal mb-0.5 max-sm:line-clamp-2 truncate sm:whitespace-normal">
                {activeItem.text}
              </p>
            </div>
            
            <button 
              onClick={() => setActiveItem(null)}
              className="text-[#082D20]/30 hover:text-[#082D20]/60 p-0.5 text-[10px] sm:text-xs font-bold leading-none cursor-pointer select-none border border-transparent hover:border-[#E6A71B]/15 rounded transition-all"
              aria-label="Dismiss notification"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
