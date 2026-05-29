import { 
  TrendingUp, 
  Lightbulb, 
  Award, 
  Sparkles, 
  Activity, 
  Users 
} from 'lucide-react';
import { motion } from 'motion/react';

export function SaaSFeatureSection() {
  const features = [
    {
      icon: <TrendingUp className="w-5 h-5 text-[#C49A45]" />,
      title: 'Public Sentiment Tracking',
      desc: 'Audit the live cultural temperature of your brand across multiple demographics. Track multi-month movements in alignment and public sentiment.'
    },
    {
      icon: <Lightbulb className="w-5 h-5 text-[#C49A45]" />,
      title: 'Structured Suggestions',
      desc: 'Convert standard complaints into cataloged consumer wishes. Ensure feedback is presented constructly to assist builders with real product roadmaps.'
    },
    {
      icon: <Award className="w-5 h-5 text-[#C49A45]" />,
      title: 'Praise & Recognition',
      desc: 'Praise and highlight businesses, founders, and cultural leaders maintaining exceptional service hygiene. Promote authentic continent-wide benchmarks.'
    },
    {
      icon: <Sparkles className="w-5 h-5 text-[#C49A45]" />,
      title: 'AI Insight Summaries',
      desc: 'Automatically synthesize unstructured public commentary and focus group discussions into actionable, high-density perception summaries.'
    },
    {
      icon: <Activity className="w-5 h-5 text-[#C49A45]" />,
      title: 'Brand Perception Monitoring',
      desc: 'Establish multi-dimensional ratings across essential vectors like Service Dependability, Corporate Transparency, and Socio-Economic Impact.'
    },
    {
      icon: <Users className="w-5 h-5 text-[#C49A45]" />,
      title: 'Audience Insight Maps',
      desc: 'Evaluate the resonance and brand safety parameters of local creators and ambassadors before committing to critical long-term partnerships.'
    }
  ];

  return (
    <section id="features" className="w-full py-24 border-t border-[#0D2C22]/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 text-left">
          <span className="text-[10px] md:text-xs font-mono uppercase font-bold tracking-widest text-[#0D2C22]/50 flex items-center gap-1.5 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C49A45]" />
            Operational Capabilities
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[#0D2C22]">
            Modern Sentiment Intelligence
          </h2>
          <p className="text-sm md:text-base text-[#0D2C22]/70 mt-4 leading-relaxed max-w-2xl font-light">
            Providing unstructured community sentiment with rigorous structure. We enable investors, builders, and observers to understand the actual layers of public consensus.
          </p>
        </div>

        {/* Feature Grid with Bento Layout styling */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              className="group bg-[#FDFBF7] border border-[#0D2C22]/10 rounded-2xl p-6 md:p-8 flex flex-col justify-between transition-all duration-300 hover:border-[#0D2C22]/35 shadow-xs hover:shadow-md cursor-pointer"
            >
              <div>
                {/* Icon wrapper */}
                <div className="w-10 h-10 rounded-xl bg-[#0D2C22]/5 flex items-center justify-center mb-6 group-hover:bg-[#0D2C22]/10 transition-colors">
                  {feat.icon}
                </div>
                <h3 className="text-base md:text-lg font-bold text-[#0D2C22] group-hover:text-[#164032] transition-colors">
                  {feat.title}
                </h3>
                <p className="text-xs md:text-[13px] text-[#0D2C22]/65 leading-relaxed mt-3.5 font-light">
                  {feat.desc}
                </p>
              </div>

              {/* Read Info Arrow */}
              <div className="mt-8 pt-4 border-t border-[#0D2C22]/5 flex items-center justify-between text-[11px] font-mono tracking-wide text-[#0D2C22]/40 group-hover:text-[#0D2C22] transition-colors">
                <span>SYSTEM MATURED</span>
                <span className="font-bold transform group-hover:translate-x-1.5 transition-transform duration-300">→</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
