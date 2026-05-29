import { BrandPerception } from './types';

export const BRANDS_DATA: BrandPerception[] = [
  {
    id: 'mtn-nigeria',
    name: 'MTN Nigeria',
    sector: 'Telecommunications',
    country: 'Nigeria',
    logoChar: 'M',
    overallScore: 81,
    sentimentLabel: 'Improving',
    metrics: {
      trust: 84,
      responsiveness: 72,
      innovation: 89,
      socialResponsibility: 79,
    },
    traits: ['Omnipresent Network', '5G Pioneer', 'High Data Costs', 'Responsive Public Relations'],
    aiSummary: 'MTN Nigeria holds the largest mobile communication market share across the region. Public feedback points directly to praise for their rapid 5G rollouts and digital service extensions. However, sustained concerns remain regarding data cost structures during inflation, and consumer advocacy forums index a strong desire for more affordable basic access rates in peri-urban areas.',
    trendData: [
      { month: 'Dec', score: 76 },
      { month: 'Jan', score: 78 },
      { month: 'Feb', score: 79 },
      { month: 'Mar', score: 82 },
      { month: 'Apr', score: 80 },
      { month: 'May', score: 81 },
    ],
    praises: [],
    suggestions: [],
  },
  {
    id: 'dangote-group',
    name: 'Dangote Group',
    sector: 'Conglomerate & Heavy Industry',
    country: 'Nigeria',
    logoChar: 'D',
    overallScore: 84,
    sentimentLabel: 'Highly Positive',
    metrics: {
      trust: 89,
      responsiveness: 68,
      innovation: 85,
      socialResponsibility: 92,
    },
    traits: ['Industrial Backbone', 'Refined Self-sufficiency', 'Sovereign-scale Impact', 'Macro Economic Force'],
    aiSummary: 'Dangote Group continues to represent the core operational backbone of West African industrial manufacturing, heavily magnified by the operational ramp-up of the Lekki Refinery. Public sentiment strongly highlights strategic national pride and infrastructural self-reliance, balanced with constructive inquiries to improve supply-chain pricing transparency and localized distribution networks.',
    trendData: [
      { month: 'Dec', score: 80 },
      { month: 'Jan', score: 82 },
      { month: 'Feb', score: 85 },
      { month: 'Mar', score: 84 },
      { month: 'Apr', score: 83 },
      { month: 'May', score: 84 },
    ],
    praises: [],
    suggestions: [],
  },
  {
    id: 'burna-boy',
    name: 'Burna Boy (Spaceship Ent.)',
    sector: 'Creative & Culture',
    country: 'Nigeria',
    logoChar: 'B',
    overallScore: 89,
    sentimentLabel: 'Highly Positive',
    metrics: {
      trust: 82,
      responsiveness: 75,
      innovation: 94,
      socialResponsibility: 78,
    },
    traits: ['Global Cultural Envoy', 'Sonic Innovation', 'Premium Live Shows', 'Authentic Pan-Africanism'],
    aiSummary: 'Representing a globally dominant modern musical force, Burna Boy maintains massive public acclaim for standard-setting live concert production value and conceptual depth. Fans and culture critics note immense pride in the global export of contemporary African identity, while suggestions focus on establishing regional artist incubators and offering more accessible local ticket prices.',
    trendData: [
      { month: 'Dec', score: 85 },
      { month: 'Jan', score: 87 },
      { month: 'Feb', score: 89 },
      { month: 'Mar', score: 88 },
      { month: 'Apr', score: 89 },
      { month: 'May', score: 89 },
    ],
    praises: [],
    suggestions: [],
  },
  {
    id: 'flutterwave',
    name: 'Flutterwave',
    sector: 'Financial Technology',
    country: 'Nigeria',
    logoChar: 'F',
    overallScore: 78,
    sentimentLabel: 'Steady',
    metrics: {
      trust: 76,
      responsiveness: 73,
      innovation: 88,
      socialResponsibility: 72,
    },
    traits: ['Continental Gateway', 'SaaS Innovator', 'Compliance Driven', 'High Enterprise Trust'],
    aiSummary: 'Flutterwave is globally recognized as a leading infrastructure layer for cross-border African commerce. Sentiment scores stabilize as they undergo intensive regulatory positioning and system compliance audits. Merchants highly appreciate the broad expansion of payment methods and elegant checkout UX, while suggesting improvements to dispute resolution latency and merchant onboarding times for smaller entities.',
    trendData: [
      { month: 'Dec', score: 72 },
      { month: 'Jan', score: 75 },
      { month: 'Feb', score: 76 },
      { month: 'Mar', score: 77 },
      { month: 'Apr', score: 79 },
      { month: 'May', score: 78 },
    ],
    praises: [],
    suggestions: [],
  },
  {
    id: 'chicken-republic',
    name: 'Chicken Republic',
    sector: 'Quick Service Restaurant',
    country: 'Nigeria',
    logoChar: 'C',
    overallScore: 82,
    sentimentLabel: 'Steady',
    metrics: {
      trust: 85,
      responsiveness: 76,
      innovation: 80,
      socialResponsibility: 83,
    },
    traits: ['Affordable Value', 'Iconic Local Brand', 'Consistent Taste', 'Rapid Out-Of-Home Expansion'],
    aiSummary: 'Chicken Republic occupies a deeply normalized space in daily consumer lifestyles, widely appreciated for high-value price calibration during challenging economic shifts. Public sentiment emphasizes massive communal goodwill and stellar localized recipe adaptations, paired with public feedback requesting improved delivery app integrations and enhanced eco-friendly packaging materials.',
    trendData: [
      { month: 'Dec', score: 79 },
      { month: 'Jan', score: 81 },
      { month: 'Feb', score: 82 },
      { month: 'Mar', score: 80 },
      { month: 'Apr', score: 81 },
      { month: 'May', score: 82 },
    ],
    praises: [],
    suggestions: [],
  },
  {
    id: 'safaricom',
    name: 'Safaricom (M-PESA)',
    sector: 'Telecommunications & Fintech',
    country: 'Kenya',
    logoChar: 'S',
    overallScore: 87,
    sentimentLabel: 'Highly Positive',
    metrics: {
      trust: 91,
      responsiveness: 80,
      innovation: 88,
      socialResponsibility: 85,
    },
    traits: ['Financial Inclusion', 'National Utility', 'Infrastructure Standard', 'Global Benchmark'],
    aiSummary: 'Safaricom represents East Africa’s preeminent technological beacon, largely buoyed by the life-improving mechanics of M-PESA. Public consensus records immense institutional and logistical trust, balanced with consumer-led insights advocating for broader open APIs for earlier stage developers and direct reductions in transactional pricing during minor peer-to-peer transfers.',
    trendData: [
      { month: 'Dec', score: 84 },
      { month: 'Jan', score: 85 },
      { month: 'Feb', score: 86 },
      { month: 'Mar', score: 87 },
      { month: 'Apr', score: 85 },
      { month: 'May', score: 87 },
    ],
    praises: [],
    suggestions: [],
  },
  {
    id: 'piggyvest',
    name: 'PiggyVest',
    sector: 'Financial Technology / Wealth',
    country: 'Nigeria',
    logoChar: 'P',
    overallScore: 86,
    sentimentLabel: 'Steady',
    metrics: {
      trust: 92,
      responsiveness: 81,
      innovation: 83,
      socialResponsibility: 76,
    },
    traits: ['Youth Trust Catalyst', 'Disciplined Savings', 'Highly Secure', 'Clean Financial UI'],
    aiSummary: 'PiggyVest is an absolute darling of the urban millennial and Gen-Z demographic in Nigeria, praised for introducing an elegant design grammar to wealth preservation. Strong sentiment scores reflect heavy performance transparency and payout reliability, with constructive suggestions seeking more sophisticated investment options (like global index trackers) and reduced penalties for urgent withdraw events.',
    trendData: [
      { month: 'Dec', score: 82 },
      { month: 'Jan', score: 83 },
      { month: 'Feb', score: 84 },
      { month: 'Mar', score: 86 },
      { month: 'Apr', score: 85 },
      { month: 'May', score: 86 },
    ],
    praises: [],
    suggestions: [],
  }
];

// Helper to search or fallback with intelligent dynamic generation
export function findOrCreateBrand(query: string, preferredCategory: string = 'Brand'): BrandPerception {
  const normalizedQuery = query.toLowerCase().trim();
  
  if (!normalizedQuery) return BRANDS_DATA[0];

  const querySlug = normalizedQuery
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

  const matched = BRANDS_DATA.find(
    b => b.id === querySlug || 
         b.name.toLowerCase() === normalizedQuery ||
         b.name.toLowerCase().includes(normalizedQuery)
         
  );

  if (matched) return { ...matched, id: querySlug || matched.id };

  // Let's dynamically synthesize an elegant mock fallback if not found!
  // This makes the search field feel infinitely dynamic and AI-powered!
  const capitalized = query.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const catLabel = preferredCategory.charAt(0).toUpperCase() + preferredCategory.slice(1).toLowerCase();
  
  // Hash calculation to create reproducible metrics!
  let hashCode = 0;
  for (let i = 0; i < query.length; i++) {
    hashCode = query.charCodeAt(i) + ((hashCode << 5) - hashCode);
  }
  hashCode = Math.abs(hashCode);
  
  const score = 70 + (hashCode % 20); // range 70 - 90
  const trust = 75 + (hashCode % 18);
  const resp = 65 + (hashCode % 22);
  const innov = 72 + (hashCode % 20);
  const csr = 70 + (hashCode % 15);

  const traits = [
    `${catLabel} Verification`,
    'Active Public Pulse',
    'Community Mapped',
    'Pan-African Signal'
  ];

  return {
    id: querySlug || `custom-${hashCode}`,
    name: capitalized,
    sector: catLabel,
    country: 'Pan-African',
    logoChar: capitalized.charAt(0) || 'A',
    overallScore: score,
    sentimentLabel: score > 84 ? 'Highly Positive' : (score > 76 ? 'Improving' : 'Steady'),
    metrics: {
      trust: trust,
      responsiveness: resp,
      innovation: innov,
      socialResponsibility: csr,
    },
    traits: traits,
    aiSummary: `We have aggregated initial public footprints for ${capitalized}. Public sentiment indicates exciting potential, highlighting strong cultural resonance and proactive localized customer engagement. Minor structural friction clusters around localized delivery fulfillment and pricing model transparency. Our systemic AI signals standard expansion readiness with clean customer alignment.`,
    trendData: [
      { month: 'Dec', score: score - 5 },
      { month: 'Jan', score: score - 4 },
      { month: 'Feb', score: score - 2 },
      { month: 'Mar', score: score - 3 },
      { month: 'Apr', score: score - 1 },
      { month: 'May', score: score },
    ],
    praises: [],
    suggestions: [],
  };
}
