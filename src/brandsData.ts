import { BrandPerception, PublicFeedback, MonthlySentiment } from './types';

// Production-clean baseline. No seeded/demo brands, completely empty list.
export const BRANDS_DATA: BrandPerception[] = [];

// Helper to calculate dynamic metrics strictly from real user-contributed feedback
export function calculateDynamicMetrics(praises: PublicFeedback[] = [], suggestions: PublicFeedback[] = []) {
  const totalPraises = praises.length;
  const totalSuggestions = suggestions.filter(s => s.sentiment === 'suggestion').length;
  const totalInsights = suggestions.filter(s => s.sentiment === 'insight').length;
  const totalFeedbacks = totalPraises + totalSuggestions + totalInsights;

  if (totalFeedbacks === 0) {
    return {
      overallScore: 0,
      sentimentLabel: 'Insufficient Data',
      metrics: {
        trust: 0,
        responsiveness: 0,
        innovation: 0,
        socialResponsibility: 0
      },
      trendData: []
    };
  }

  // Pure mathematical dynamic metrics from user inputs
  const trustValue = Math.round((totalPraises / totalFeedbacks) * 100);
  const responsivenessValue = Math.round(
    ((totalPraises * 0.8) + (totalInsights * 0.6) + (totalSuggestions * 0.4)) / totalFeedbacks * 100
  );
  const innovationValue = Math.min(
    100,
    Math.round(((totalInsights * 1.5) + (totalPraises * 0.6)) / totalFeedbacks * 100)
  );
  const socialValue = Math.round(
    ((totalPraises * 0.7) + (totalSuggestions * 0.5)) / totalFeedbacks * 100
  );

  const overallScoreVal = Math.round(
    (trustValue + responsivenessValue + innovationValue + socialValue) / 4
  );

  // Sentiment text labeling
  let label = 'Steady';
  if (overallScoreVal >= 83) {
    label = 'Highly Positive';
  } else if (overallScoreVal >= 75) {
    label = 'Improving';
  } else if (overallScoreVal > 0) {
    label = 'Steady';
  } else {
    label = 'Insufficient Data';
  }

  // Monthly trends calculated dynamically from actual dates
  const monthsOrder = ['Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May'];
  const allInputs = [
    ...praises.map(p => ({ ...p, type: 'praise' })),
    ...suggestions.map(s => ({ ...s, type: 'suggestion' }))
  ];

  const getSubScore = (subPraises: any[], subSuggestions: any[]) => {
    const pCount = subPraises.length;
    const sCount = subSuggestions.filter(s => s.sentiment === 'suggestion').length;
    const iCount = subSuggestions.filter(s => s.sentiment === 'insight').length;
    const total = pCount + sCount + iCount;
    if (total === 0) return 0;
    const tr = Math.round((pCount / total) * 100);
    const re = Math.round(((pCount * 0.8) + (iCount * 0.6) + (sCount * 0.4)) / total * 100);
    const inn = Math.min(100, Math.round(((iCount * 1.5) + (pCount * 0.6)) / total * 100));
    const soc = Math.round(((pCount * 0.7) + (sCount * 0.5)) / total * 100);
    return Math.round((tr + re + inn + soc) / 4);
  };

  const dynamicTrend: MonthlySentiment[] = [];
  
  // Find chronologically active months with recorded feedback
  let firstActiveIndex = -1;
  monthsOrder.forEach((m, idx) => {
    const hasSubInMonth = allInputs.some(item => {
      const dateParts = item.date.split(' ');
      return dateParts[0] === m || (m === 'Dec' && item.date.toLowerCase().includes('dec'));
    });
    if (hasSubInMonth && firstActiveIndex === -1) {
      firstActiveIndex = idx;
    }
  });

  if (firstActiveIndex !== -1) {
    // Fill trend array from first active month up to May
    for (let idx = firstActiveIndex; idx < monthsOrder.length; idx++) {
      const targetMonth = monthsOrder[idx];
      const allowedMonths = monthsOrder.slice(0, idx + 1);
      const subInputs = allInputs.filter(item => {
        const itemMonth = item.date.split(' ')[0];
        return allowedMonths.includes(itemMonth) || (itemMonth.toLowerCase().startsWith('dec') && allowedMonths.includes('Dec'));
      });
      const subPraises = subInputs.filter(item => item.type === 'praise');
      const subSuggestions = subInputs.filter(item => item.type === 'suggestion');
      const scoreForMonth = getSubScore(subPraises, subSuggestions);
      
      dynamicTrend.push({
        month: targetMonth,
        score: scoreForMonth
      });
    }
  }

  return {
    overallScore: overallScoreVal,
    sentimentLabel: label,
    metrics: {
      trust: trustValue,
      responsiveness: responsivenessValue,
      innovation: innovationValue,
      socialResponsibility: socialValue
    },
    trendData: dynamicTrend
  };
}

// Dynamically registers pristine profile parameters on searching/adding a new brand query
export function findOrCreateBrand(query: string, preferredCategory: string = 'Brand'): BrandPerception {
  const normalizedQuery = query.toLowerCase().trim();
  
  const querySlug = normalizedQuery
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

  const capitalized = query.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const catLabel = preferredCategory.charAt(0).toUpperCase() + preferredCategory.slice(1).toLowerCase();

  return {
    id: querySlug || `custom-${Date.now()}`,
    name: capitalized,
    sector: catLabel,
    country: 'Pan-African',
    logoChar: capitalized.charAt(0) || 'A',
    overallScore: 0,
    sentimentLabel: 'Insufficient Data',
    metrics: {
      trust: 0,
      responsiveness: 0,
      innovation: 0,
      socialResponsibility: 0,
    },
    traits: [],
    aiSummary: "No public insights have been submitted for this entity yet. Submit a commendation, suggestion, or technical insight below to initialize systemic indexing.",
    trendData: [],
    praises: [],
    suggestions: [],
  };
}
