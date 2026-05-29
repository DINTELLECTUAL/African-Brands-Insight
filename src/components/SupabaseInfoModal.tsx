import { useState } from 'react';
import { Database, AlertCircle, CheckCircle2, Copy, Check, ExternalLink, HelpCircle } from 'lucide-react';
import { isSupabaseConfigured, SUPABASE_SQL_SETUP } from '../lib/supabase';

interface SupabaseInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SupabaseInfoModal({ isOpen, onClose }: SupabaseInfoModalProps) {
  const [copiedSql, setCopiedSql] = useState(false);
  const [copiedEnv, setCopiedEnv] = useState(false);

  if (!isOpen) return null;

  const handleCopySql = () => {
    navigator.clipboard.writeText(SUPABASE_SQL_SETUP);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2000);
  };

  const envSample = `# For Vite Live Builds (use these if your repo builds with Vite):
VITE_SUPABASE_URL="https://your-project-id.supabase.co"
VITE_SUPABASE_ANON_KEY="your-anon-key"

# For Next.js Live Builds (use these if your live Vercel repo builds with Next.js):
NEXT_PUBLIC_SUPABASE_URL="https://your-project-id.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"`;

  const handleCopyEnv = () => {
    navigator.clipboard.writeText(envSample);
    setCopiedEnv(true);
    setTimeout(() => setCopiedEnv(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-[#082D20]/80 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Box */}
      <div id="supabase-modal" className="relative w-full max-w-2xl bg-white border-2 border-[#082D20] rounded-3xl shadow-[0_20px_50px_rgba(8,45,32,0.3)] overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Fancy Top Bar */}
        <div className="bg-[#082D20] text-white px-6 py-4 border-b-2 border-[#E6A71B]/35 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <Database className="w-5 h-5 text-[#E6A71B]" />
            <span className="font-mono text-xs uppercase font-extrabold tracking-wider text-[#E6A71B]">
              DATABASE PERSISTENCE ENGINE
            </span>
          </div>
          <button 
            type="button"
            onClick={onClose}
            className="text-white/60 hover:text-white font-mono text-sm leading-none p-1 cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Content Body - Scrollable */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Active Connection Status Banner */}
          <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#FAF8F2] border border-[#082D20]/10">
            {isSupabaseConfigured ? (
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-100 rounded-full text-emerald-600">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-[#082D20] flex items-center gap-1.5 font-sans">
                    Supabase Connected Successfully
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[9px] font-medium bg-emerald-100 text-emerald-800 font-mono">
                      LIVE
                    </span>
                  </h3>
                  <p className="text-xs text-[#082D20]/75 mt-0.5">
                    Data is synced globally in real-time across your dev sandboxes and live Vercel deployments.
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-3">
                <div className="p-2 bg-[#E6A71B]/10 rounded-full text-[#B8810E] shrink-0">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-[#082D20] flex items-center gap-1.5 font-sans">
                    Local Sandbox Mode (Supabase Offline)
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[9px] font-medium bg-[#E6A71B]/15 text-[#B8810E] font-mono">
                      SANDBOX
                    </span>
                  </h3>
                  <p className="text-xs text-[#082D20]/75 mt-0.5 leading-relaxed">
                    Data is stored in your private browser's LocalStorage. To make ratings and feed insights persist globally across Vercel and your shared live link, connect your own Supabase project below.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Setup steps / guides */}
          <div className="space-y-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-[#B8810E] font-mono flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4" /> Three Steps To Persist Real-Time Data Globally
            </h3>

            {/* Step 1 */}
            <div className="space-y-2">
              <div className="flex items-start gap-2 text-xs text-[#082D20]">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#082D20] text-white text-[10px] font-mono shrink-0">1</span>
                <div>
                  <span className="font-extrabold">Generate Database Table</span>
                  <p className="text-[11px] text-[#082D20]/65">
                    Go to your Supabase Dashboard, click <strong>SQL Editor</strong>, and run this code to construct the optimized <code>brands</code> table instantly.
                  </p>
                </div>
              </div>

              {/* SQL box */}
              <div className="relative">
                <pre className="bg-[#082D20]/5 border-2 border-[#082D20]/10 rounded-xl p-3 text-[10px] font-mono text-[#082D20]/90 overflow-x-auto max-h-36 max-w-full">
                  {SUPABASE_SQL_SETUP}
                </pre>
                <button
                  type="button"
                  onClick={handleCopySql}
                  className="absolute top-2.5 right-2.5 p-1.5 rounded-lg bg-white border border-[#082D20]/15 hover:border-[#E6A71B] hover:bg-[#FAF8F2] text-[#082D20] transition-all cursor-pointer flex items-center gap-1 text-[10px] font-bold"
                >
                  {copiedSql ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Copy SQL
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Step 2 */}
            <div className="space-y-2 pt-2">
              <div className="flex items-start gap-2 text-xs text-[#082D20]">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#082D20] text-white text-[10px] font-mono shrink-0">2</span>
                <div>
                  <span className="font-extrabold">Expose Environment Variables</span>
                  <p className="text-[11px] text-[#082D20]/65">
                    Add these variables to your <strong>Vercel Project Settings</strong> (under Environment Variables), as well as your local configuration.
                  </p>
                </div>
              </div>

              {/* ENV box */}
              <div className="relative">
                <pre className="bg-[#082D20]/5 border-2 border-[#082D20]/10 rounded-xl p-3 text-[10px] font-mono text-[#082D20]/90 overflow-x-auto">
                  {envSample}
                </pre>
                <button
                  type="button"
                  onClick={handleCopyEnv}
                  className="absolute top-2.5 right-2.5 p-1.5 rounded-lg bg-white border border-[#082D20]/15 hover:border-[#E6A71B] hover:bg-[#FAF8F2] text-[#082D20] transition-all cursor-pointer flex items-center gap-1 text-[10px] font-bold"
                >
                  {copiedEnv ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Copy Environment Block
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Step 3 */}
            <div className="pt-2">
              <div className="flex items-start gap-2 text-xs text-[#082D20]">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#082D20] text-white text-[10px] font-mono shrink-0">3</span>
                <div>
                  <span className="font-extrabold">Redeploy / Refresh Your App</span>
                  <p className="text-[11px] text-[#082D20]/65">
                    Once the environment variables are configured on Vercel and redeployed, the application will automatically connect directly to your Supabase tables. Every citizen submission, score upvote, and new business catalog entry is updated in genuine, real-time shared database consensus!
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Notice area */}
          <div className="p-4 bg-emerald-50 border-2 border-emerald-500/20 rounded-2xl flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse" />
            <p className="text-[11px] text-emerald-900 font-sans font-medium">
              We have built complete support for your Supabase backend. When environments transition from Dev Sandbox to Live Vercel, the App automatically connects to your database with 100% data fidelity.
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-[#FAF8F2] px-6 py-4.5 border-t border-[#082D20]/10 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <a
            href="https://supabase.com/dashboard" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#082D20] hover:text-[#B8810E] font-mono transition-colors"
          >
            Open Supabase Dashboard <ExternalLink className="w-3 h-3" />
          </a>
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 bg-[#082D20] hover:bg-[#0D4130] text-[#FAF8F2] font-mono text-[10px] uppercase font-bold rounded-xl border border-[#E6A71B]/30 hover:border-[#E6A71B]/70 hover:shadow-md transition-all cursor-pointer"
          >
            I Understand, Return to Registry
          </button>
        </div>

      </div>
    </div>
  );
}
