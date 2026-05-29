import { createClient } from '@supabase/supabase-js';
import { BrandPerception } from '../types';

// Read configuration from Vite or Next.js environment variables helper safely
function getEnv(key: string): string {
  if (typeof import.meta !== 'undefined' && (import.meta as any).env) {
    if ((import.meta as any).env[key]) {
      return (import.meta as any).env[key];
    }
  }
  if (typeof process !== 'undefined' && (process as any).env) {
    if ((process as any).env[key]) {
      return (process as any).env[key];
    }
  }
  return '';
}

const SUPABASE_URL = 
  getEnv('VITE_SUPABASE_URL') || 
  getEnv('NEXT_PUBLIC_SUPABASE_URL') || 
  '';

const SUPABASE_ANON_KEY = 
  getEnv('VITE_SUPABASE_ANON_KEY') || 
  getEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY') || 
  '';

export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

// Create client if configured, otherwise null
export const supabase = isSupabaseConfigured
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

// SQL snippet for easy copy-pasting
export const SUPABASE_SQL_SETUP = `-- Copy and paste this into your Supabase SQL Editor to create the correct table schema:

CREATE TABLE IF NOT EXISTS public.brands (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    sector TEXT,
    country TEXT,
    logo_char TEXT,
    overall_score NUMERIC,
    sentiment_label TEXT,
    metrics JSONB,
    traits JSONB,
    ai_summary TEXT,
    trend_data JSONB,
    praises JSONB,
    suggestions JSONB,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.brands ENABLE ROW LEVEL SECURITY;

-- Create Policies to allow public read & write access so anyone can view & submit reviews
CREATE POLICY "Allow public read access" ON public.brands FOR SELECT USING (true);
CREATE POLICY "Allow public insert access" ON public.brands FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update access" ON public.brands FOR UPDATE USING (true);
CREATE POLICY "Allow public delete access" ON public.brands FOR DELETE USING (true);
`;

/**
 * Maps DB model (snake_case) to our application's React model (camelCase).
 */
function mapFromDB(row: any): BrandPerception {
  return {
    id: row.id,
    name: row.name,
    sector: row.sector || 'Brand',
    country: row.country || 'Pan-African',
    logoChar: row.logo_char || row.name?.charAt(0) || 'A',
    overallScore: Number(row.overall_score ?? 0),
    sentimentLabel: row.sentiment_label || 'Insufficient Data',
    metrics: row.metrics || {
      trust: 0,
      responsiveness: 0,
      innovation: 0,
      socialResponsibility: 0
    },
    traits: Array.isArray(row.traits) ? row.traits : [],
    aiSummary: row.ai_summary || "No public insights have been submitted for this entity yet.",
    trendData: Array.isArray(row.trend_data) ? row.trend_data : [],
    praises: Array.isArray(row.praises) ? row.praises : [],
    suggestions: Array.isArray(row.suggestions) ? row.suggestions : []
  };
}

/**
 * Maps React model (camelCase) to DB model (snake_case).
 */
function mapToDB(brand: BrandPerception) {
  return {
    id: brand.id,
    name: brand.name,
    sector: brand.sector,
    country: brand.country,
    logo_char: brand.logoChar,
    overall_score: brand.overallScore,
    sentiment_label: brand.sentimentLabel,
    metrics: brand.metrics,
    traits: brand.traits,
    ai_summary: brand.aiSummary,
    trend_data: brand.trendData,
    praises: brand.praises,
    suggestions: brand.suggestions,
    updated_at: new Date().toISOString()
  };
}

/**
 * Fetch all brands from Supabase.
 * Returns null if Supabase is not configured or if fetching fails.
 */
export async function getSupabaseBrands(): Promise<BrandPerception[] | null> {
  if (!supabase) return null;

  try {
    const { data, error } = await supabase
      .from('brands')
      .select('*')
      .order('name', { ascending: true });

    if (error) {
      console.warn('Supabase fetch failed:', error);
      return null;
    }

    if (data) {
      return data.map(mapFromDB);
    }
    return [];
  } catch (err) {
    console.error('Supabase getBrands error:', err);
    return null;
  }
}

/**
 * Save / Upsert a brand to Supabase to keep state in sync immediately.
 */
export async function saveSupabaseBrand(brand: BrandPerception): Promise<boolean> {
  if (!supabase) return false;

  try {
    const dbRow = mapToDB(brand);
    const { error } = await supabase
      .from('brands')
      .upsert(dbRow, { onConflict: 'id' });

    if (error) {
      console.error('Supabase save failed:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Supabase saveBrand exception:', err);
    return false;
  }
}

/**
 * Sync entire local state into Supabase (bulk migration helper).
 */
export async function syncAllBrandsToSupabase(brands: BrandPerception[]): Promise<boolean> {
  if (!supabase || brands.length === 0) return false;

  try {
    const rows = brands.map(mapToDB);
    const { error } = await supabase
      .from('brands')
      .upsert(rows, { onConflict: 'id' });

    if (error) {
      console.error('Bulk sync failed:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Bulk sync exception:', err);
    return false;
  }
}

/**
 * Subscribe to real-time updates for the 'brands' table in Supabase.
 * Whenever a record is inserted or updated in the database, triggers the callback.
 */
export function subscribeToSupabaseBrands(
  onUpdate: (updatedBrand: BrandPerception) => void
) {
  if (!supabase) return null;

  const channel = supabase
    .channel('realtime:public:brands')
    .on(
      'postgres_changes',
      {
        event: '*', // Listen to INSERT, UPDATE, DELETE
        schema: 'public',
        table: 'brands'
      },
      (payload) => {
        if (payload.eventType === 'INSERT' || payload.eventType === 'UPDATE') {
          if (payload.new) {
            const mapped = mapFromDB(payload.new);
            onUpdate(mapped);
          }
        }
      }
    )
    .subscribe();

  return channel;
}

