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
    praises: [
      {
        id: 'mtn-p1',
        user: 'Adebayo O.',
        userTitle: 'Enterprise Architect',
        content: 'MTN’s 5G rollout in Lagos and Abuja has completely transformed remote working capabilities. Network stability has reached a professional tier.',
        date: 'May 14, 2026',
        votes: 142,
        sentiment: 'positive',
      },
      {
        id: 'mtn-p2',
        user: 'Chioma A.',
        userTitle: 'Tech Lead',
        content: 'Customer service responsiveness through official WhatsApp channels is outstanding. Resolution times have reduced dramatically.',
        date: 'May 20, 2026',
        votes: 89,
        sentiment: 'positive',
      },
    ],
    suggestions: [
      {
        id: 'mtn-s1',
        user: 'Tunde B.',
        userTitle: 'SME Lead',
        content: 'Introduce specialized micro-business bandwidth tiers with guaranteed speeds at optimized price points to support small local offices.',
        date: 'May 25, 2026',
        votes: 215,
        sentiment: 'suggestion',
      },
      {
        id: 'mtn-s2',
        user: 'Nkechi E.',
        userTitle: 'Developer Advocate',
        content: 'Simplify the subscription renewal flow in the mobile application. The current process requires too many taps and redirects.',
        date: 'May 27, 2026',
        votes: 94,
        sentiment: 'insight',
      },
    ],
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
    praises: [
      {
        id: 'dan-p1',
        user: 'Ibrahim K.',
        userTitle: 'Trade Analyst',
        content: 'The scale-up of localized fuel refining represents a historical milestone for macroeconomic independence across the West African region.',
        date: 'May 12, 2026',
        votes: 310,
        sentiment: 'positive',
      },
      {
        id: 'dan-p2',
        user: 'Musa A.',
        userTitle: 'Supply Manager',
        content: 'Highly secure cement supply logistics. They remain highly dependable during critical construction timelines across multiple states.',
        date: 'May 18, 2026',
        votes: 125,
        sentiment: 'positive',
      },
    ],
    suggestions: [
      {
        id: 'dan-s1',
        user: 'Etim O.',
        userTitle: 'Logistics Lead',
        content: 'Establish direct digital wholesale trading portals for standard retailers to bypass secondary market inflation chains.',
        date: 'May 22, 2026',
        votes: 184,
        sentiment: 'suggestion',
      },
      {
        id: 'dan-s2',
        user: 'Sophia J.',
        userTitle: 'Sustainability Auditor',
        content: 'Increase direct public disclosures on community eco-restoration projects surrounding major manufacturing facilities.',
        date: 'May 24, 2026',
        votes: 72,
        sentiment: 'insight',
      },
    ],
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
    praises: [
      {
        id: 'bur-p1',
        user: 'Kojo M.',
        userTitle: 'Music Producer',
        content: 'The orchestration and instrumentation in recent live performances have set a completely new standard for modern dynamic live sets globally.',
        date: 'May 15, 2026',
        votes: 412,
        sentiment: 'positive',
      },
      {
        id: 'bur-p2',
        user: 'Yemi D.',
        userTitle: 'Creative Director',
        content: 'Refusing to compromise on standard Pan-African themes has given contemporary African youth a global visual and sonic voice.',
        date: 'May 19, 2026',
        votes: 245,
        sentiment: 'positive',
      },
    ],
    suggestions: [
      {
        id: 'bur-s1',
        user: 'Fola S.',
        userTitle: 'Culture Writer',
        content: 'Structured collaboration with domestic art academies to set up masterclasses for aspiring sound engineers and local multi-instrumentalists.',
        date: 'May 23, 2026',
        votes: 388,
        sentiment: 'suggestion',
      },
      {
        id: 'bur-s2',
        user: 'Lamin J.',
        userTitle: 'Live Event Coordinator',
        content: 'Advocate for dynamic pricing models for live African stadium events, ensuring local grassroots listeners can afford floor tiers.',
        date: 'May 26, 2026',
        votes: 199,
        sentiment: 'insight',
      },
    ],
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
    praises: [
      {
        id: 'flu-p1',
        user: 'Zola N.',
        userTitle: 'E-commerce Founder',
        content: 'The single-integration API supporting mobile money across Kenya, credit cards in Nigeria, and EFT in South Africa saved us a full year of developer hours.',
        date: 'May 10, 2026',
        votes: 198,
        sentiment: 'positive',
      },
      {
        id: 'flu-p2',
        user: 'Ekow B.',
        userTitle: 'Fintech product Manager',
        content: 'Checkout layout remains standard-setting. The conversion rate of our mobile shoppers shot up by 18% instantly upon switching.',
        date: 'May 16, 2026',
        votes: 112,
        sentiment: 'positive',
      },
    ],
    suggestions: [
      {
        id: 'flu-s1',
        user: 'Temitope L.',
        userTitle: 'Online Merchant',
        content: 'Reduce chargeback processing resolution backlogs. Waiting up to 14 business days for dispute resolution impacts operating cash flow.',
        date: 'May 21, 2026',
        votes: 212,
        sentiment: 'suggestion',
      },
      {
        id: 'flu-s2',
        user: 'Agnes C.',
        userTitle: 'SaaS Developer',
        content: 'Offer a more granular sandbox environment for multi-currency automated testing, particularly for mobile money failure modes.',
        date: 'May 25, 2026',
        votes: 83,
        sentiment: 'insight',
      },
    ],
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
    praises: [
      {
        id: 'ch-p1',
        user: 'Kemi Y.',
        userTitle: 'Human Resources Lead',
        content: 'The brand’s ability to maintain high core taste standards and provide a highly nutritious, affordable meal package amidst high inflation is admirable.',
        date: 'May 11, 2026',
        votes: 274,
        sentiment: 'positive',
      },
      {
        id: 'ch-p2',
        user: 'Chinedu O.',
        userTitle: 'Operations Coordinator',
        content: 'Clean, cheerful outlet aesthetics. The training and friendliness of frontline hospitality staff across multiple Lagos venues is consistent.',
        date: 'May 17, 2026',
        votes: 119,
        sentiment: 'positive',
      },
    ],
    suggestions: [
      {
        id: 'ch-s1',
        user: 'Amara P.',
        userTitle: 'Environmental Consultant',
        content: 'Favourably transition from non-biodegradable packaging items to premium pressed agricultural fiber boxes to mitigate local city plastic pollution.',
        date: 'May 22, 2026',
        votes: 164,
        sentiment: 'suggestion',
      },
      {
        id: 'ch-s2',
        user: 'Sola G.',
        userTitle: 'Marketing Specialist',
        content: 'Improve order queuing layouts in physical high-density outlets during Friday lunch rushes, maybe with standalone self-checkout columns.',
        date: 'May 26, 2026',
        votes: 104,
        sentiment: 'insight',
      },
    ],
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
    praises: [
      {
        id: 'saf-p1',
        user: 'Wanjiku N.',
        userTitle: 'Agricultural Tech Lead',
        content: 'M-PESA continues to serve as the absolute circulatory system of the East African digital ecosystem. It is incredibly robust.',
        date: 'May 08, 2026',
        votes: 320,
        sentiment: 'positive',
      },
      {
        id: 'saf-p2',
        user: 'David M.',
        userTitle: 'Product Designer',
        content: 'The new Super App dashboard is simplified and highly visual, letting elders manage savings and payments seamlessly.',
        date: 'May 15, 2026',
        votes: 148,
        sentiment: 'positive',
      },
    ],
    suggestions: [
      {
        id: 'saf-s1',
        user: 'Ken O.',
        userTitle: 'Fintech Engineer',
        content: 'Simplify the automated client credentials onboarding process for the M-PESA G2 API. Developers shouldn’t have to submit physical corporate documents for sandboxes.',
        date: 'May 20, 2026',
        votes: 219,
        sentiment: 'suggestion',
      },
      {
        id: 'saf-s2',
        user: 'Elsa T.',
        userTitle: 'Retail Merchant',
        content: 'Create zero-fee merchant transfers for local neighborhood kiosks whose total monthly gross revenues sit below high enterprise brackets.',
        date: 'May 24, 2026',
        votes: 132,
        sentiment: 'insight',
      },
    ],
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
    praises: [
      {
        id: 'pig-p1',
        user: 'Yemisi B.',
        userTitle: 'Graduate Assistant',
        content: 'I saved my entire tuition fee installment plan on PiggyVest with absolute ease of mind. The automated lock feature saved me from impulse spending.',
        date: 'May 09, 2026',
        votes: 184,
        sentiment: 'positive',
      },
      {
        id: 'pig-p2',
        user: 'Chidi N.',
        userTitle: 'Content Creator',
        content: 'Six successive years of punctually paying interest on savings down to the precise millisecond. Outstanding operations and liquidity discipline.',
        date: 'May 16, 2026',
        votes: 139,
        sentiment: 'positive',
      },
    ],
    suggestions: [
      {
        id: 'pig-s1',
        user: 'Suleiman M.',
        userTitle: 'Investment Officer',
        content: 'Introduce direct dollar-denominated fractional global index index options backed by institutional custodians, protecting purchasing power.',
        date: 'May 19, 2026',
        votes: 172,
        sentiment: 'suggestion',
      },
      {
        id: 'pig-s2',
        user: 'Farida A.',
        userTitle: 'Clinical Dietitian',
        content: 'Create a grace-period feature for monthly automated savings cycles. Real-time bank notification alerts can sometimes trigger during dry cashflow dates.',
        date: 'May 25, 2026',
        votes: 93,
        sentiment: 'insight',
      },
    ],
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
    praises: [
      {
        id: `cust-p1-${hashCode}`,
        user: 'Kwame A.',
        userTitle: 'Brand Designer',
        content: `Outstanding cultural branding execution. ${capitalized} communicates with absolute confidence and has earned quick adoption among young professionals.`,
        date: 'May 28, 2026',
        votes: 42,
        sentiment: 'positive',
      },
      {
        id: `cust-p2-${hashCode}`,
        user: 'Lydia O.',
        userTitle: 'Early Adopter',
        content: 'Product packaging is highly tactile and elegant. They understand modern presentation and premium quality extremely well.',
        date: 'May 29, 2026',
        votes: 18,
        sentiment: 'positive',
      }
    ],
    suggestions: [
      {
        id: `cust-s1-${hashCode}`,
        user: 'Marcus G.',
        userTitle: 'Operations Auditor',
        content: 'Expand regional physical support locations. Relying entirely on social media responses can feel slightly disconnected during transaction issues.',
        date: 'May 29, 2026',
        votes: 31,
        sentiment: 'suggestion',
      },
      {
        id: `cust-s2-${hashCode}`,
        user: 'Zainab U.',
        userTitle: 'SME Lead',
        content: `Introduce loyalty benefit tiers or bulk discounts for dedicated corporate purchase clients to optimize enterprise utilization.`,
        date: 'May 29, 2026',
        votes: 11,
        sentiment: 'insight',
      }
    ],
  };
}
