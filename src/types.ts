export interface MonthlySentiment {
  month: string;
  score: number;
}

export interface PublicFeedback {
  id: string;
  user: string;
  userTitle?: string;
  content: string;
  date: string;
  votes: number;
  sentiment: 'positive' | 'suggestion' | 'insight';
}

export interface BrandPerception {
  id: string;
  name: string;
  sector: string;
  country: string;
  logoChar: string;
  overallScore: number;
  sentimentLabel: 'Highly Positive' | 'Steady' | 'Improving' | 'Mixed' | 'Insufficient Data';
  metrics: {
    trust: number;
    responsiveness: number;
    innovation: number;
    socialResponsibility: number;
  };
  traits: string[];
  aiSummary: string;
  trendData: MonthlySentiment[];
  praises: PublicFeedback[];
  suggestions: PublicFeedback[];
}
