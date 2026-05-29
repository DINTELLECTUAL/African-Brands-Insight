import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BrandDashboard } from './components/BrandDashboard';
import { LiveActivityPerception } from './components/LiveActivityPerception';
import { SupabaseInfoModal } from './components/SupabaseInfoModal';

import { BRANDS_DATA, findOrCreateBrand, calculateDynamicMetrics } from './brandsData';
import { BrandPerception, PublicFeedback } from './types';
import { isSupabaseConfigured, getSupabaseBrands, saveSupabaseBrand, syncAllBrandsToSupabase } from './lib/supabase';

export default function App() {
  const [isSupabaseModalOpen, setIsSupabaseModalOpen] = useState(false);

  // Live states for dynamic feedback preservation and active state list (persisted to LocalStorage)
  const [brands, setBrands] = useState<BrandPerception[]>(() => {
    const saved = localStorage.getItem('abi_sovereign_brands_v2');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed.map((b: BrandPerception) => {
            const hasMTNName = b.id === 'mtn-nigeria' || b.name?.toLowerCase().trim() === 'mtn nigeria';
            const hasBurnaName = b.id === 'burna-boy' || b.id?.includes('burna') || b.name?.toLowerCase().includes('burna boy');
            
            if (hasMTNName) {
              return {
                id: 'mtn-nigeria',
                name: 'MTN Nigeria',
                sector: 'Telecom',
                country: 'Pan-African',
                logoChar: 'M',
                overallScore: 0,
                sentimentLabel: 'Insufficient Data',
                metrics: {
                  trust: 0,
                  responsiveness: 0,
                  innovation: 0,
                  socialResponsibility: 0
                },
                traits: [],
                aiSummary: "No public insights have been submitted for this entity yet. Submit a commendation, suggestion, or technical insight below to initialize systemic indexing.",
                trendData: [],
                praises: [],
                suggestions: []
              };
            }

            if (hasBurnaName) {
              return {
                id: b.id || 'burna-boy',
                name: b.name || 'Burna Boy (Spaceship Ent.)',
                sector: b.sector || 'Entertainment',
                country: 'Pan-African',
                logoChar: 'B',
                overallScore: 0,
                sentimentLabel: 'Insufficient Data',
                metrics: {
                  trust: 0,
                  responsiveness: 0,
                  innovation: 0,
                  socialResponsibility: 0
                },
                traits: [],
                aiSummary: "No public insights have been submitted for this entity yet. Submit a commendation, suggestion, or technical insight below to initialize systemic indexing.",
                trendData: [],
                praises: [],
                suggestions: []
              };
            }

            return b;
          });
        }
      } catch (e) {
        console.error("Local registry read failure, fallback to BRANDS_DATA", e);
      }
    }
    return BRANDS_DATA;
  });

  // Fetch real-time synchronized data from Supabase on start if configured
  useEffect(() => {
    async function loadSupabaseData() {
      if (isSupabaseConfigured) {
        try {
          const dbBrands = await getSupabaseBrands();
          if (dbBrands && dbBrands.length > 0) {
            setBrands(dbBrands);
          } else if (dbBrands) {
            // First time database is active but empty: seed baseline BRANDS_DATA
            await syncAllBrandsToSupabase(BRANDS_DATA);
            setBrands(BRANDS_DATA);
          }
        } catch (error) {
          console.error("Failed to fetch records from Supabase:", error);
        }
      }
    }
    loadSupabaseData();
  }, []);

  // Keep LocalStorage in sync
  useEffect(() => {
    localStorage.setItem('abi_sovereign_brands_v2', JSON.stringify(brands));
  }, [brands]);

  // Read routing based on secure URL hashes to allow sharing & refreshes
  const [currentBrandSlug, setCurrentBrandSlug] = useState<string>(() => {
    const hash = window.location.hash;
    if (hash && hash.startsWith('#/brand/')) {
      return hash.replace('#/brand/', '');
    }
    return '';
  });

  // Listen to hash change events from browser routing actions
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash && hash.startsWith('#/brand/')) {
        setCurrentBrandSlug(hash.replace('#/brand/', ''));
      } else {
        setCurrentBrandSlug('');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Back to landing search page
  const handleBackToHome = () => {
    window.location.hash = '';
    setCurrentBrandSlug('');
  };

  // Find corresponding brand data by matching active slug
  const activeBrand = brands.find(b => b.id === currentBrandSlug);

  // Search/Create action flow
  const handleSearchAndRedirect = (query: string, category: string) => {
    const normalizedQuery = query.toLowerCase().trim();
    if (!normalizedQuery) return;

    // Create unique slug
    const targetSlug = normalizedQuery
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    if (!targetSlug) return;

    // Search state list for match
    const foundIdx = brands.findIndex(b => b.id === targetSlug || b.name.toLowerCase() === normalizedQuery);

    if (foundIdx !== -1) {
      // Redirect to existing page
      window.location.hash = `#/brand/${brands[foundIdx].id}`;
    } else {
      // Automatically generate a clean professional profile page
      const createdBrand = findOrCreateBrand(query, category);
      
      // Update local state list to guarantee persistence
      setBrands((prev) => {
        const updated = [...prev, createdBrand];
        if (isSupabaseConfigured) {
          saveSupabaseBrand(createdBrand);
        }
        return updated;
      });
      
      // Redirect immediately
      window.location.hash = `#/brand/${createdBrand.id}`;
    }
  };

  // Handle addition of verified user insights with 100% real dynamic calculation
  const handleAddFeedback = (feedbackInput: Omit<PublicFeedback, 'id' | 'date' | 'votes'>) => {
    const feedbackType = feedbackInput.sentiment;
    const todayStr = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });

    const populatedFeedback: PublicFeedback = {
      id: `live-feed-${Math.random()}`,
      votes: 1, // Undergoes standard initial peer endorsement count
      date: todayStr,
      ...feedbackInput
    };

    setBrands((currentBrands) => {
      const updated = currentBrands.map((b) => {
        if (b.id !== currentBrandSlug) return b;

        // Route to proper type registry for back-compat compatibility, and overall calculation
        const updatedPraises = feedbackType === 'positive' 
          ? [populatedFeedback, ...b.praises] 
          : b.praises;

        const updatedSuggestions = feedbackType !== 'positive' 
          ? [populatedFeedback, ...b.suggestions] 
          : b.suggestions;

        const dynamicMetrics = calculateDynamicMetrics(updatedPraises, updatedSuggestions);

        // Update traits dynamically based on the balance of feedback
        const updatedTraits = [];
        if (updatedPraises.length > 0) updatedTraits.push('Community Praised');
        if (updatedSuggestions.some(s => s.sentiment === 'insight')) updatedTraits.push('Sought Diagnostic');
        if (updatedSuggestions.some(s => s.sentiment === 'suggestion')) updatedTraits.push('Active Customer Loop');
        if (dynamicMetrics.overallScore >= 80) updatedTraits.push('High Trust Index');

        // Compile cognitive AI Summary dynamically based on actual comments
        let updatedAiSummary = b.aiSummary;
        if (updatedPraises.length > 0 || updatedSuggestions.length > 0) {
          const praisesHighlights = updatedPraises.slice(0, 2).map(p => `"${p.content.slice(0, 45)}..."`).join(' and ');
          const suggestionsHighlights = updatedSuggestions.slice(0, 2).map(s => `"${s.content.slice(0, 45)}..."`).join(' and ');
          
          updatedAiSummary = `Our consensus engine has analyzed ${updatedPraises.length + updatedSuggestions.length} real user-generated public submissions for ${b.name}. `;
          if (updatedPraises.length > 0) {
            updatedAiSummary += `Commendations highlight positive feedback such as ${praisesHighlights}. `;
          }
          if (updatedSuggestions.length > 0) {
            updatedAiSummary += `Constructive insights focus on potential growth areas, including ${suggestionsHighlights}. `;
          }
          updatedAiSummary += `This profile is dynamically updated with a live consensus score of ${dynamicMetrics.overallScore}%.`;
        }

        const updatedBrand = {
          ...b,
          ...dynamicMetrics,
          traits: updatedTraits,
          aiSummary: updatedAiSummary,
          praises: updatedPraises,
          suggestions: updatedSuggestions,
        };

        if (isSupabaseConfigured) {
          saveSupabaseBrand(updatedBrand);
        }

        return updatedBrand;
      });
      return updated;
    });
  };

  // Upvoting/endorsing insights
  const handleVoteFeedback = (feedbackId: string, listType: 'praise' | 'suggestion') => {
    setBrands((currentBrands) => {
      const updated = currentBrands.map((b) => {
        if (b.id !== currentBrandSlug) return b;

        let updatedBrand = { ...b };
        if (listType === 'praise') {
          updatedBrand = {
            ...b,
            praises: b.praises.map(p => p.id === feedbackId ? { ...p, votes: p.votes + 1 } : p)
          };
        } else {
          updatedBrand = {
            ...b,
            suggestions: b.suggestions.map(s => s.id === feedbackId ? { ...s, votes: s.votes + 1 } : s)
          };
        }

        if (isSupabaseConfigured) {
          saveSupabaseBrand(updatedBrand);
        }

        return updatedBrand;
      });
      return updated;
    });
  };

  return (
    <div className="min-h-screen bg-[#FAF8F2] text-[#082D20] font-sans selection:bg-[#E6A71B]/20 selection:text-[#082D20] select-none relative overflow-x-hidden">
      {/* Premium minimal header navbar */}
      <Navbar 
        currentBrandSlug={currentBrandSlug} 
        onBackToHome={handleBackToHome} 
        onOpenSupabaseModal={() => setIsSupabaseModalOpen(true)}
      />

      {/* Primary view content area dynamically rendered based on routing */}
      {currentBrandSlug && activeBrand ? (
        <main className="max-w-6xl mx-auto px-6 md:px-12 pt-32 pb-24 z-10 relative">
          <BrandDashboard 
            brand={activeBrand}
            allBrands={brands}
            onAddFeedback={handleAddFeedback}
            onVoteFeedback={handleVoteFeedback}
          />
        </main>
      ) : (
        <main>
          <Hero onSearchAndRedirect={handleSearchAndRedirect} existingBrands={brands} />
        </main>
      )}

      {/* Sovereign signpost metadata watermark - extremely minimal bottom row */}
      <div className="w-full bg-[#FAF8F2] border-t-2 border-[#E6A71B]/15 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] text-[#082D20]/50 font-mono">
          <span className="font-bold tracking-tight">African Brands Insight Registry • sovereign sandbox access</span>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse" />
            <span className="font-bold">INTEGRITY NODES ACTIVE</span>
          </div>
        </div>
      </div>

      {/* Subtle Liveliness Tracker / Platform Pulse Indicator */}
      <LiveActivityPerception />

      {/* Supabase connection guide & setup instructions */}
      <SupabaseInfoModal 
        isOpen={isSupabaseModalOpen} 
        onClose={() => setIsSupabaseModalOpen(false)} 
      />
    </div>
  );
}
