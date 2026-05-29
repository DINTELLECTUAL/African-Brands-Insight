import { motion } from 'motion/react';
import { MonthlySentiment } from '../types';

interface SentimentChartProps {
  data: MonthlySentiment[];
}

export function SentimentChart({ data }: SentimentChartProps) {
  const height = 140;
  const width = 480;
  const padding = { top: 20, right: 30, bottom: 25, left: 35 };

  const minScore = 60; // Base score cutoff for higher visibility on variations
  const maxScore = 100;

  // Coordinate Calculations
  const getX = (index: number) => {
    const step = (width - padding.left - padding.right) / (data.length - 1);
    return padding.left + index * step;
  };

  const getY = (score: number) => {
    const range = maxScore - minScore;
    const graphHeight = height - padding.top - padding.bottom;
    const percentage = (score - minScore) / range;
    return height - padding.bottom - percentage * graphHeight;
  };

  // Build the SVG path string
  let pathD = '';
  data.forEach((point, i) => {
    const x = getX(i);
    const y = getY(point.score);
    if (i === 0) {
      pathD += `M ${x} ${y}`;
    } else {
      // Build curve control points for elegant spline layout
      const prevX = getX(i - 1);
      const prevY = getY(data[i - 1].score);
      const cpX1 = prevX + (x - prevX) / 2;
      const cpY1 = prevY;
      const cpX2 = prevX + (x - prevX) / 2;
      const cpY2 = y;
      pathD += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${x} ${y}`;
    }
  });

  // Build area path string to create subtle soft green glowing base under the line
  const startX = getX(0);
  const startY = getY(minScore);
  const endX = getX(data.length - 1);
  const areaD = `${pathD} L ${endX} ${height - padding.bottom} L ${startX} ${height - padding.bottom} Z`;

  return (
    <div className="w-full relative bg-[#FDFBF7]/60 rounded-xl p-4 border border-[#0D2C22]/5 shadow-sm overflow-hidden flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-[10px] uppercase font-semibold letter-spacing tracking-wider text-[#0D2C22]/40 block">Historical Vector</span>
          <h4 className="text-xs font-bold text-[#0D2C22] flex items-center gap-1.5">
            Public Sentiment Stability
            <span className="inline-flex w-1.5 h-1.5 rounded-full bg-emerald-500" />
          </h4>
        </div>
        <div className="text-right">
          <span className="text-[11px] font-mono text-[#0D2C22]/50">Range: {minScore}% - {maxScore}%</span>
        </div>
      </div>

      <div className="w-full h-32 relative">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
          <defs>
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0D2C22" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#0D2C22" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((p, idx) => {
            const h = height - padding.bottom - p * (height - padding.top - padding.bottom);
            return (
              <g key={idx}>
                <line
                  x1={padding.left}
                  y1={h}
                  x2={width - padding.right}
                  y2={h}
                  stroke="#0D2C22"
                  strokeOpacity="0.04"
                  strokeWidth="1"
                  strokeDasharray={idx === 0 || idx === 4 ? '0' : '4 4'}
                />
                <text
                  x={padding.left - 8}
                  y={h + 3}
                  textAnchor="end"
                  fontSize="8"
                  fill="#0D2C22"
                  fillOpacity="0.35"
                  className="font-mono"
                >
                  {Math.round(minScore + p * (maxScore - minScore))}%
                </text>
              </g>
            );
          })}

          {/* Area under curve */}
          <path d={areaD} fill="url(#chartGradient)" />

          {/* Spline sentiment line */}
          <motion.path
            d={pathD}
            fill="none"
            stroke="#0D2C22"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />

          {/* Highlight Circles */}
          {data.map((point, i) => {
            const x = getX(i);
            const y = getY(point.score);

            return (
              <g key={i} className="group cursor-pointer">
                {/* Micro hover pulse */}
                <circle
                  cx={x}
                  cy={y}
                  r="6"
                  fill="#C49A45"
                  fillOpacity="0"
                  className="group-hover:fill-opacity-20 transition-all duration-300"
                />
                
                {/* Exact center dot */}
                <circle
                  cx={x}
                  cy={y}
                  r="3"
                  fill={i === data.length - 1 ? '#C49A45' : '#0D2C22'}
                  stroke="#FBF9F4"
                  strokeWidth="1"
                />

                {/* Micro tooltip text shown during SVG inspect / absolute clean look */}
                <title>{point.month}: {point.score}%</title>
              </g>
            );
          })}

          {/* Months labels */}
          {data.map((point, i) => (
            <text
              key={i}
              x={getX(i)}
              y={height - 6}
              fontSize="9"
              fill="#0D2C22"
              fillOpacity="0.4"
              textAnchor="middle"
              className="font-mono"
            >
              {point.month}
            </text>
          ))}
        </svg>
      </div>
    </div>
  );
}
