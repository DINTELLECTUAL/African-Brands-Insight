/**
 * Premium Intelligent Moderation & Editorial Helpers
 * African Brands Insight Platform
 */

// Contextual Replacement Registry for soft suggestions
export interface ReplacementSuggestion {
  original: string;
  suggested: string;
}

export const SOFT_WARNINGS_MAPPING: Record<string, string> = {
  trash: 'poorly executed',
  stupid: 'unconvincing',
  hate: 'dislike',
  awful: 'disappointing',
  nonsense: 'unclear',
  useless: 'inefficient',
  terrible: 'disappointing',
  idiot: 'creator',
  hell: 'extremely',
  horrible: 'substandard',
  sucks: 'underperforms',
  crap: 'poor quality',
  garbage: 'inelegant execution',
  fraud: 'discrepancy',
  scam: 'unsubstantiated',
  liar: 'inaccurate',
  fool: 'uninformed',
  dumb: 'unwise',
  bad: 'suboptimal',
  waste: 'underutilized potential',
  sex: 'intimate parameters',
  knack: 'engagement',
  penis: 'anatomy',
  bumbum: 'posterior',
  yansh: 'posterior',
  terrorists: 'unlawful hostiles',
  kidnappers: 'abductors',
  smoke: 'combust',
};

// Sensitive triggers that warrant escalation (hard block on immediate submission)
export const HARD_BLOCK_KEYWORDS = [
  'kill', 'murder', 'abuse', 'rape', 'asshole', 'bitch', 'fuck', 'dick',
  'porn', 'shit', 'threaten', 'scumbag', 'die', 'bastard', 'cunt', 'pussy',
  'nigger', 'faggot', 'retard', 'scammer', 'fraudster', 'charlatan', 'violence',
  'kill yourself', 'kys', 'motherfucker', 'cocksucker', 'wanker', 'whore', 'slut',
  'steal', 'stole', 'thief', 'corrupt as hell', 'stolen'
];

// High-interest editorial keywords to auto-highlight inside insight feeds
export const SYSTEM_EDITORIAL_KEYWORDS = [
  'product', 'service', 'customer support', 'customer experience', 'innovation',
  'delivery', 'support', 'music', 'performance', 'quality', 'pricing', 'branding',
  'technology', 'payment', 'clean', 'design', 'code', 'speed', 'delay', 'infrastructure',
  'fee', 'rate', 'reliability', 'mobile', 'web', 'portal', 'app', 'database', 'security',
  'execution', 'pan-african', 'scale', 'governance', 'accessibility', 'hardware', 'software',
  'fintech', 'transaction', 'trust', 'integrity', 'growth', 'milestones', 'supply chain'
];

/**
 * Parses user insight content for toxic wordings and returns replacement suggestions
 */
export function analyzeInsightContent(text: string): {
  isHardBlocked: boolean;
  detectedIssues: Array<{ word: string; suggestion: string; index: number }>;
} {
  const normalized = text.toLowerCase();
  
  // 1. Check Hard Blocks
  let isHardBlocked = false;
  for (const trigger of HARD_BLOCK_KEYWORDS) {
    // Match whole words or phrases strictly
    const regex = new RegExp(`\\b${trigger}\\b`, 'i');
    if (regex.test(normalized)) {
      isHardBlocked = true;
      break;
    }
  }

  // 2. Locate Soft suggestions
  const detectedIssues: Array<{ word: string; suggestion: string; index: number }> = [];
  const words = text.split(/(\s+|,|\.|\!|\?)/);

  let charOffset = 0;
  for (const part of words) {
    const cleanWord = part.toLowerCase().replace(/[^a-z]/g, '');
    if (cleanWord && SOFT_WARNINGS_MAPPING[cleanWord]) {
      detectedIssues.push({
        word: part, // Keep original casing
        suggestion: SOFT_WARNINGS_MAPPING[cleanWord],
        index: charOffset,
      });
    }
    charOffset += part.length;
  }

  return {
    isHardBlocked,
    detectedIssues,
  };
}

/**
 * Helper to dynamically execute replacement of a marked word with suggestion
 */
export function applyConstructiveSuggestion(text: string, originalWord: string, replacement: string): string {
  const regex = new RegExp(`\\b${originalWord}\\b`, 'gi');
  return text.replace(regex, replacement);
}

/**
 * Generates a mock but consistent device/session fingerprint hash for logging/audit tracking
 */
export function generateSessionDeviceHash(): string {
  if (typeof window === 'undefined') return 'ssr-server-agent';
  const nav = typeof navigator !== 'undefined' ? navigator : {} as any;
  const userAgent = nav.userAgent || 'unknown-agent';
  const scr = typeof window !== 'undefined' && window.screen ? window.screen : {} as any;
  const width = scr.width || 0;
  const height = scr.height || 0;
  const languages = (nav.languages || []).join(',');
  const components = `${userAgent}|${width}x${height}|${languages}`;
  
  let hash = 0;
  for (let i = 0; i < components.length; i++) {
    const char = components.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  
  return `sha256-node-${Math.abs(hash).toString(16)}`;
}
